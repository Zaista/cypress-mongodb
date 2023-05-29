export function validate(args: any) {
  if (!args.uri) {
    throw new Error('Missing mongodb.uri environment variable');
  }

  if (!args.collection) {
    throw new Error('Collection not specified');
  }

  if (!args.database) {
    throw new Error('Database not specified');
  }
}
