import { Document, MongoClient } from 'mongodb';
import { MongoDetails } from '../index';
import { deserialize, serialize } from 'bson';

export async function findOne(args: MongoDetails) {
  args.pipeline = deserialize(Buffer.from(args.pipeline as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const result: any = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .findOne(args.pipeline!);
      await client.close();
      if (result !== null) return serialize(result);
      return null;
    } catch (err) {
      await client.close();
      throw err;
    }
  });
}

export async function findMany(args: MongoDetails) {
  args.pipeline = deserialize(Buffer.from(args.pipeline as Buffer));
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .find(args.pipeline! as Document[])
      .toArray()
      .then((result) => {
        client.close();
        return serialize(result);
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
