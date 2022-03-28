import { Document, MongoClient, ObjectId } from 'mongodb';
import { MongoDetails } from '../index';

export async function insertOne(args: MongoDetails) {
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
    throw new Error('Pipeline must be an object');
  }

  if (isNaN(args.pipeline._id) && ObjectId.isValid(args.pipeline._id)) {
    args.pipeline._id = new ObjectId(args.pipeline._id);
  }

  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.database)
      .collection(args.collection as string)
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
  if (!args.uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  } else if (!args.database) {
    throw new Error('Database not specified');
  } else if (!args.collection) {
    throw new Error('Collection not specified');
  } else if (!args.pipeline || !Array.isArray(args.pipeline)) {
    throw new Error('Pipeline must be an array');
  }

  return MongoClient.connect(args.uri).then((client) => {
    args.pipeline!.forEach((document: Document, index: number) => {
      if (isNaN(document._id) && ObjectId.isValid(document._id)) {
        (args.pipeline as Document[])[index]!._id = new ObjectId(
          (args.pipeline as Document[])[index]!._id
        );
      }
    });

    return client
      .db(args.database)
      .collection(args.collection as string)
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
