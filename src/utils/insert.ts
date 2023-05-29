import { Document, MongoClient, InsertManyResult } from 'mongodb';
import { deserialize } from 'bson';

export async function insertOne(args: any) {
  args.document = deserialize(Buffer.from(args.document as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const res: any = await client
        .db(args.database)
        .collection(args.collection as string)
        .insertOne(args.document, args.options);
      await client.close();
      return res.insertedId;
    } catch (err) {
      await client.close();
      throw err;
    }
  });
}

export async function insertMany(args: any) {
  args.documents = deserialize(Buffer.from(args.documents as Buffer));
  args.documents = Object.values(args.documents);
  return MongoClient.connect(args.uri).then(async (client) => {
    const collection = client.db(args.database).collection(args.collection);
    const result: any = await collection.insertMany(
      args.documents! as Document[],
      args.options
    );
    client.close();
    return result.insertedIds;
  });
}
