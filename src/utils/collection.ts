import { MongoClient } from 'mongodb';
import { MongoDetails } from '../index';

export async function createCollection(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .createCollection(args.options.collection as string)
      .then(() => {
        client.close();
        return 'Collection created';
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}

export async function dropCollection(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .drop()
      .then(() => {
        client.close();
        return 'Collection dropped';
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
