import { MongoClient } from 'mongodb';
import { MongoDetails } from '../index';

export async function deleteOne(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .deleteOne(args.pipeline!)
      .then((res) => {
        client.close();
        return res.deletedCount + ' document deleted';
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}

export async function deleteMany(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .deleteMany(args.pipeline!)
      .then((res) => {
        client.close();
        return res.deletedCount + ' documents deleted';
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
