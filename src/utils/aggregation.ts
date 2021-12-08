import {MongoClient} from "mongodb";

export async function aggregate(args: Connection) {
    if (!args.uri) {
        throw new Error('Missing MONGODB_URI environment variable')
    } else if (!args.database) {
        throw new Error('Database not specified')
    } else if (!args.collection) {
        throw new Error('Collection not specified')
    }

    const client = new MongoClient(args.uri);
    await client.connect();

    try {
        return await client.db(args.database).collection(<string>args.collection).aggregate(args.pipeline as Document[]).toArray();
    } catch (err: any) {
        throw new Error('Error connecting: ' + err.stack)
    } finally {
        await client.close();
    }
}