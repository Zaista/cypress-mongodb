import { Document, MongoClient, ObjectId } from 'mongodb';
import { MongoDetails } from '../index';

export async function insertOne(args: MongoDetails) {
  destringify(args.pipeline);
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const res = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .insertOne(args.pipeline!);
      client.close();
      return res.insertedId;
    } catch (err) {
      client.close();
      throw err;
    }
  });
}

export async function insertMany(args: MongoDetails) {
  destringify(args.pipeline);
  return MongoClient.connect(args.uri).then(async (client) => {
    args.pipeline!.forEach((document: Document, index: number) => {
      if (isNaN(document._id) && ObjectId.isValid(document._id)) {
        (args.pipeline as Document[])[index]!._id = new ObjectId(
          (args.pipeline as Document[])[index]!._id
        );
      }
    });

    try {
      const res = await client
        .db(args.options.database)
        .collection(args.options.collection as string)
        .insertMany(args.pipeline! as Document[]);
      client.close();
      return res.insertedIds;
    } catch (err) {
      client.close();
      throw err;
    }
  });
}

function destringify(o: any) {
  Object.keys(o).forEach(function (k) {
    if (
      o[k] !== null &&
      typeof o[k] === 'object' &&
      o[k].stringifiedFrom === undefined
    ) {
      destringify(o[k]);
      return;
    }
    if (
      o[k] !== null &&
      typeof o[k] === 'string' &&
      o[k].includes('stringifiedFrom')
    ) {
      const jsonObject = JSON.parse(o[k]);
      if (jsonObject.stringifiedFrom === 'Date')
        o[k] = new Date(jsonObject.stringifiedValue);
      else if (jsonObject.stringifiedFrom === 'ObjectId')
        o[k] = new ObjectId(jsonObject.stringifiedValue);
      else throw new Error('Stringification not supported');
    }
  });
}
