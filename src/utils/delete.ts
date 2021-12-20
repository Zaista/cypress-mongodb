import {MongoClient} from "mongodb";

export async function deleteOne(args: MongoDetails) {
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
        return client.db(args.database).collection(args.collection as string).deleteOne(args.pipeline!).then(res => {
            client.close();
            return res.deletedCount + ' document deleted';
        }).catch(err => {
            client.close();
            throw err;
        });
    });
}

export async function deleteMany(args: MongoDetails) {
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
        return client.db(args.database).collection(args.collection as string).deleteMany(args.pipeline!).then(res => {
            client.close();
            return res.deletedCount + ' documents deleted';
        }).catch(err => {
            client.close();
            throw err;
        });
    });
}