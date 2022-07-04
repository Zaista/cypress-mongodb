import { Document, MongoClient, ObjectId } from 'mongodb';
import { MongoDetails } from '../index';
import { deserialize } from 'bson';

export async function insertOne(args: MongoDetails) {
  args.pipeline = deserialize(Buffer.from(args.pipeline as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const res = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .insertOne(args.pipeline!);
      await client.close();
      return res.insertedId;
    } catch (err) {
      await client.close();
      throw err;
    }
  });
}

export async function insertMany(args: MongoDetails) {
  args.pipeline = deserialize(Buffer.from(args.pipeline as Buffer));
  args.pipeline = Object.values(args.pipeline);
  return MongoClient.connect(args.uri).then(async (client) => {
    args.pipeline!.forEach((document: Document, index: number) => {
      if (isNaN(document._id) && ObjectId.isValid(document._id)) {
        (args.pipeline as Document[])[index]!._id = new ObjectId(
          (args.pipeline as Document[])[index]!._id
        );
      }
    });

    try {
      const result = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .insertMany(args.pipeline! as Document[]);
      await client.close();
      return result.insertedIds;
    } catch (err) {
      await client.close();
      throw err;
    }
  });
}
