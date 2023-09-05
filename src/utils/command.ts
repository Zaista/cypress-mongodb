import {CommandOperationOptions, MongoClient} from 'mongodb';

export async function runCommand(args: any) {
  let client = await MongoClient.connect(args.uri);
  const database = client.db(args.database);
  if (args.options) {
    delete args.options.database;
    delete args.options.collection;
  }
  try {
    const result = await database.command(
      args.command,
      args.options as CommandOperationOptions
    );
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
}
