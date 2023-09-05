import { MongoClient } from 'mongodb';
import { deserialize, serialize } from 'bson';

export async function updateOne(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  args.document = deserialize(Buffer.from(args.document as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const result: any = await client
        .db(args.database)
        .collection(args.collection as string)
        .updateOne(args.filter, args.document, args.options);
      return result ? serialize(result) : null;
    } finally {
      await client.close();
    }
  });
}

export async function updateMany(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  args.document = deserialize(Buffer.from(args.document as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const database = client.db(args.database);
      const collection = database.collection(args.collection as string);
      const result: any = await collection.updateMany(
        args.filter,
        args.document,
        args.options,
      );
      return result ? serialize(result) : null;
    } finally {
      await client.close();
    }
  });
}
