import { MongoClient } from 'mongodb';

export async function createCollection(args: any) {
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
        if (args.options.failSilently) {
          return err;
        } else {
          throw err;
        }
      });
  });
}

export async function dropCollection(args: any) {
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
        if (args.options.failSilently) {
          return err;
        } else {
          throw err;
        }
      });
  });
}
