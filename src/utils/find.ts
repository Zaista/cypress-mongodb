import { Document, MongoClient } from 'mongodb';
import { MongoDetails } from '../index';

export async function findOne(args: MongoDetails) {
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const res = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .findOne(args.pipeline!);
      client.close();
      stringify(res);
      return res;
    } catch (err) {
      client.close();
      throw err;
    }
  });
}

export async function findMany(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .find(args.pipeline! as Document[])
      .toArray()
      .then((res) => {
        client.close();
        stringify(res);
        return res;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
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
