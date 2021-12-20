import {MongoClient} from "mongodb";

export async function createCollection(args: Connection) {
    if (!args.uri) {
        throw new Error('Missing MONGODB_URI environment variable')
    } else if (!args.database) {
        throw new Error('Database not specified')
    } else if (!args.collection) {
        throw new Error('Collection not specified')
    }

    return MongoClient.connect(args.uri).then(client => {
        return client.db(args.database).createCollection(args.collection as string).then( () => {
            client.close();
            return 'Collection created';
        }).catch(err => {
            client.close();
            throw err;
        });
    });
}

export async function dropCollection(args: Connection) {
    if (!args.uri) {
        throw new Error('Missing MONGODB_URI environment variable')
    } else if (!args.database) {
        throw new Error('Database not specified')
    } else if (!args.collection) {
        throw new Error('Collection not specified')
    }

    return MongoClient.connect(args.uri).then(client => {
        return client.db(args.database).collection(args.collection as string).drop().then( () => {
            client.close();
            return 'Collection dropped';
        }).catch(err => {
            client.close();
            throw err;
        });
    });
}