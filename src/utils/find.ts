import { Document, MongoClient } from 'mongodb';
import { MongoDetails } from '../index';

export async function findOne(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .findOne(args.pipeline!)
      .then((res) => {
        client.close();
        console.log(res!._id);
        return res;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
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
        return res;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
