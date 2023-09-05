import { MongoClient } from 'mongodb';
import { deserialize } from 'bson';

export function deleteOne(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const collection = client
        .db(args.database)
        .collection(args.collection as string);
      const result: any = await collection.deleteOne(args.filter, args.options);
      return result.deletedCount + ' document deleted';
    } finally {
      await client.close();
    }
  });
}

export async function deleteMany(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  const client = await MongoClient.connect(args.uri);
  try {
    const collection = client
      .db(args.database)
      .collection(args.collection as string);
    const result: any = await collection.deleteMany(args.filter, args.options);
    return result.deletedCount + ' documents deleted';
  } finally {
    await client.close();
  }
}
