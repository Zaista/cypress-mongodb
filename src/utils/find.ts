import { Document, MongoClient } from 'mongodb';
import { deserialize, serialize } from 'bson';

export async function findOne(args: any) {
  args.query = deserialize(Buffer.from(args.query as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const result: any = await client
        .db(args.database)
        .collection(args.collection as string)
        .findOne(args.query, args.options);
      if (result !== null) return serialize(result);
      return null;
    } finally {
      await client.close();
    }
  });
}

export async function findOneAndUpdate(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  args.document = deserialize(Buffer.from(args.document as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const result: any = await client
        .db(args.database)
        .collection(args.collection as string)
        .findOneAndUpdate(args.filter, args.document, args.options);
      if (result !== null) return serialize(result);
      return null;
    } finally {
      await client.close();
    }
  });
}

export async function findOneAndDelete(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  args.options = deserialize(Buffer.from(args.options as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const result: any = await client
        .db(args.database)
        .collection(args.collection as string)
        .findOneAndDelete(args.filter, args.options);
      if (result !== null) return serialize(result);
      return null;
    } finally {
      await client.close();
    }
  });
}

export async function findMany(args: any) {
  args.query = deserialize(Buffer.from(args.query as Buffer));
  return MongoClient.connect(args.uri).then(async (client) => {
    try {
      const result = await client
        .db(args.database)
        .collection(args.collection as string)
        .find(args.query as Document[], args.options)
        .toArray();
      return serialize(Object.fromEntries(result.entries()));
    } finally {
      await client.close();
    }
  });
}
