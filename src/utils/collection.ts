import { MongoClient } from 'mongodb';

export function createCollection(args: any) {
  return MongoClient.connect(args.uri).then(async (client) => {
    const database = client.db(args.database);

    // delete not-default mongodb fields
    const failSilently = args.options?.failSilently;
    if (args.options) {
      delete args.options.database;
      delete args.options.failSilently;
    }

    try {
      const result = await database.createCollection(
        args.collection as string,
        args.options
      );
      client.close();
      return 'Collection created';
    } catch (error) {
      if (failSilently) return error;
      else throw error;
    }
  });
}

export function dropCollection(args: any) {
  return MongoClient.connect(args.uri).then(async (client) => {
    const database = client.db(args.database);

    // delete not-default mongodb fields
    const failSilently = args.options?.failSilently;
    if (args.options) delete args.options.failSilently; // since failSilently is not part of default mongodb options, delete it

    try {
      const result = await database.dropCollection(
        args.collection as string,
        args.options
      );
      client.close();
      return 'Collection dropped';
    } catch (error) {
      if (failSilently) return error;
      else throw error;
    }
  });
}
