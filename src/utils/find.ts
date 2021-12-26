import { Document, MongoClient } from 'mongodb';
import { MongoDetails } from '../index';

export async function findOne(args: MongoDetails) {
  if (!args.uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  } else if (!args.database) {
    throw new Error('Database not specified');
  } else if (!args.collection) {
    throw new Error('Collection not specified');
  } else if (
    !args.pipeline ||
    typeof args.pipeline !== 'object' ||
    Array.isArray(args.pipeline)
  ) {
    throw new Error('Query not specified');
  }

  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.database)
      .collection(args.collection as string)
      .findOne(args.pipeline!)
      .then((res) => {
        client.close();
        return res;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}

export async function findMany(args: MongoDetails) {
  if (!args.uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  } else if (!args.database) {
    throw new Error('Database not specified');
  } else if (!args.collection) {
    throw new Error('Collection not specified');
  } else if (
    !args.pipeline ||
    typeof args.pipeline !== 'object' ||
    Array.isArray(args.pipeline)
  ) {
    throw new Error('Query not specified');
  }

  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.database)
      .collection(args.collection as string)
      .find(args.pipeline! as Document[])
      .toArray()
      .then((res) => {
        client.close();
        return res;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
