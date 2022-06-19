import { Document, MongoClient, ObjectId } from 'mongodb';
import { MongoDetails } from '../index';

export async function aggregate(args: MongoDetails) {
  const client = new MongoClient(args.uri);
  await client.connect();

  try {
    const result = await client
      .db(args.options.database)
      .collection(<string>args.options.collection)
      .aggregate(args.pipeline as Document[])
      .toArray();
    stringify(result);
    return result;
  } catch (err: any) {
    throw new Error('Error connecting: ' + err.stack);
  } finally {
    await client.close();
  }
}

function stringify(o: any) {
  if (o !== null) {
    Object.keys(o).forEach(function (k) {
      if (
        o[k] !== null &&
        typeof o[k] === 'object' &&
        typeof o[k].getTimestamp === 'undefined'
      ) {
        stringify(o[k]);
        return;
      } else if (
        o[k] !== null &&
        typeof o[k] === 'object' &&
        typeof o[k].getTimestamp !== 'undefined'
      ) {
        o[k] = `{"stringifiedValue": "${o[
          k
        ].toString()}", "stringifiedFrom": "ObjectId"}`;
      }
    });
  }
}
