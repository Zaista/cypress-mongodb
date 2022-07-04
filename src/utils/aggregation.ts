import { Document, MongoClient } from 'mongodb';
import { MongoDetails } from '../index';
import { serialize } from 'bson';

export async function aggregate(args: MongoDetails) {
  const client = new MongoClient(args.uri);
  await client.connect();

  try {
    const result = await client
      .db(args.options.database)
      .collection(<string>args.options.collection)
      .aggregate(args.pipeline as Document[])
      .toArray();
    return serialize(result);
  } catch (err: any) {
    throw new Error('Error connecting: ' + err.stack);
  } finally {
    await client.close();
  }
}
