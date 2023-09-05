import { DropCollectionOptions, MongoClient } from 'mongodb';

export async function createCollection(args: any) {
  const client = await MongoClient.connect(args.uri);
  const database = client.db(args.database);
  const failSilently = args.options?.failSilently;
  if (args.options) {
    delete args.options.database;
    delete args.options.failSilently;
  }
  try {
    const result = await database.createCollection(
      args.collection as string,
      args.options,
    );
    if (result) {
      return 'Collection created';
    } else {
      return 'Error';
    }
  } catch (error) {
    if (failSilently) return error;
    else throw error;
  } finally {
    await client.close();
  }
}

export async function dropCollection(args: any) {
  const client = await MongoClient.connect(args.uri);
  const failSilently = args.options?.failSilently;
  if (args.options) delete args.options.failSilently;
  try {
    const database = client.db(args.database);
    const result = await database.dropCollection(
      args.collection as string,
      args.options as DropCollectionOptions,
    );
    if (result) {
      return 'Collection dropped';
    } else {
      return 'Error';
    }
  } catch (error) {
    if (failSilently) return error;
    else throw error;
  } finally {
    await client.close();
  }
}
