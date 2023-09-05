import { Document, MongoClient } from 'mongodb';
import { deserialize, serialize } from 'bson';

export async function aggregate(args: any) {
  const deserializedPipeline = deserialize(
    Buffer.from(args.pipeline as Buffer),
  );
  args.pipeline = Object.values(deserializedPipeline);
  const client = await MongoClient.connect(args.uri);

  try {
    const result = await client
      .db(args.database)
      .collection(args.collection)
      .aggregate(args.pipeline as Document[], args.options)
      .toArray();
    return serialize(Object.fromEntries(result.entries()));
  } catch (err: any) {
    throw new Error('Error connecting: ' + err.stack);
  } finally {
    await client.close();
  }
}
