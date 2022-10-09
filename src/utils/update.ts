import {MongoClient} from 'mongodb';
import {deserialize, serialize} from 'bson';

export async function updateOne(args: any) {
    args.filter = deserialize(Buffer.from(args.filter as Buffer));
    args.pipeline = deserialize(Buffer.from(args.pipeline as Buffer));
    return MongoClient.connect(args.uri).then(async (client) => {
        try {
            const database = client.db(args.options.database);
            const collection = database.collection(args.options.collection);
            const result = await collection.updateOne(args.filter, args.pipeline);
            await client.close();
            if (result !== null) return serialize(result);
            return null;
        } catch (err) {
            await client.close();
            throw err;
        }
    });
}

export async function updateMany(args: any) {
    args.filter = deserialize(Buffer.from(args.filter as Buffer));
    args.pipeline = deserialize(Buffer.from(args.pipeline as Buffer));
    return MongoClient.connect(args.uri).then(async (client) => {
        try {
            return client
                .db(args.options.database)
                .collection(args.options.collection as string)
                .updateMany(args.filter, args.pipeline)
                .then((result) => {
                    client.close();
                    return serialize(result);
                });
        } catch (err) {
            await client.close();
            throw err;
        }
    });
}
