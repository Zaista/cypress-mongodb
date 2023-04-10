import { Document, MongoClient } from 'mongodb';
import { deserialize } from 'bson';

export async function insertOne(args: any) {
  args.document = deserialize(Buffer.from(args.document as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const res = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .insertOne(args.document!);
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
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .insertMany(args.documents! as Document[])
      .then((result) => {
        client.close();
        return result.insertedIds;
      })
      .catch((err: any) => {
        client.close();
        throw err;
      });
  });
}
