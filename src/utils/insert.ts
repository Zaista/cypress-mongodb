import {Document, MongoClient} from "mongodb";

export async function insertOne(args: Connection) {
    if (!args.uri) {
        throw new Error('Missing MONGODB_URI environment variable');
    } else if (!args.database) {
        throw new Error('Database not specified');
    } else if (!args.collection) {
        throw new Error('Collection not specified');
    } else if (!args.pipeline || typeof args.pipeline !== 'object' || Array.isArray(args.pipeline)) {
        throw new Error('Pipeline must be an object');
    }

    return MongoClient.connect(args.uri).then(client => {
        return client.db(args.database).collection(args.collection as string).insertOne(args.pipeline!).then(res => {
            client.close();
            return '1 document inserted: ' + res.insertedId;
        }).catch(err => {
            client.close();
            throw err;
        });
    });
}

export async function insertMany(args: Connection) {
    if (!args.uri) {
        throw new Error('Missing MONGODB_URI environment variable');
    } else if (!args.database) {
        throw new Error('Database not specified');
    } else if (!args.collection) {
        throw new Error('Collection not specified');
    } else if (!args.pipeline || !Array.isArray(args.pipeline)) {
        throw new Error('Pipeline must be an array');
    }

    return MongoClient.connect(args.uri).then(client => {
        return client.db(args.database).collection(args.collection as string).insertMany(args.pipeline! as Document[]).then(res => {
            client.close();
            return res.insertedCount + ' documents inserted';
        }).catch(err => {
            client.close();
            throw err;
        });
    });
}