import { Document, MongoClient } from 'mongodb';
import { deserialize, serialize } from 'bson';

export async function aggregate(args: any) {
  const deserializedPipeline = deserialize(
    Buffer.from(args.pipeline as Buffer)
  );
  args.pipeline = Object.values(deserializedPipeline);

  const client = new MongoClient(args.uri);
  await client.connect();

  try {
    const result = await client
      .db(args.database)
      .collection(args.collection)
      .aggregate(args.pipeline as Document[], args.options)
      .toArray();
    return serialize(result);
  } catch (err: any) {
    throw new Error('Error connecting: ' + err.stack);
  } finally {
    await client.close();
  }
}
