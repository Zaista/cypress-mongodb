import { MongoClient } from 'mongodb';
import { deserialize } from 'bson';

export function deleteOne(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    const collection = client
      .db(args.database)
      .collection(args.collection as string);
    const result: any = await collection.deleteOne(args.filter, args.options);
    client.close();
    return result.deletedCount + ' document deleted';
  });
}

export function deleteMany(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    const collection = client
      .db(args.database)
      .collection(args.collection as string);
    const result: any = await collection.deleteMany(args.filter, args.options);
    client.close();
    return result.deletedCount + ' documents deleted';
  });
}
