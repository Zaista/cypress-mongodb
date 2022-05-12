import { Document, MongoClient, ObjectId } from 'mongodb';
import { MongoDetails } from '../index';

export async function insertOne(args: MongoDetails) {
  if (args.options.forceObjectId && '_id' in args.pipeline!) {
    args.pipeline._id = new ObjectId(args.pipeline._id);
  }

  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .insertOne(args.pipeline!)
      .then((res) => {
        client.close();
        return res.insertedId;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}

export async function insertMany(args: MongoDetails) {
  return MongoClient.connect(args.uri).then((client) => {
    args.pipeline!.forEach((document: Document, index: number) => {
      if (isNaN(document._id) && ObjectId.isValid(document._id)) {
        (args.pipeline as Document[])[index]!._id = new ObjectId(
          (args.pipeline as Document[])[index]!._id
        );
      }
    });

    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .insertMany(args.pipeline! as Document[])
      .then((res) => {
        client.close();
        return res.insertedIds;
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
