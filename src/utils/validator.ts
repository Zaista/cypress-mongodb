export function validate(args: any) {
  if (!args.uri) {
    throw new Error('Missing mongodb.uri environment variable');
  }

  if (!args.options.collection) {
    throw new Error('Collection not specified');
  }

  if (!args.options.database) {
    throw new Error('Database not specified');
  }
}
