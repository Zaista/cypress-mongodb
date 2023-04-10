import { MongoClient } from 'mongodb';
import { deserialize } from 'bson';

export async function deleteOne(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .deleteOne(args.filter)
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

export async function deleteMany(args: any) {
  args.filter = deserialize(Buffer.from(args.filter as Buffer));
  return MongoClient.connect(args.uri).then((client) => {
    return client
      .db(args.options.database)
      .collection(args.options.collection as string)
      .deleteMany(args.filter)
      .then((result) => {
        client.close();
        return result.deletedCount + ' documents deleted';
      })
      .catch((err) => {
        client.close();
        throw err;
      });
  });
}
