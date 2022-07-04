import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';
import { deserialize, serialize } from 'bson';

export function aggregate(
  pipeline: Document[] | Buffer,
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    pipeline: pipeline,
  };

  validate(args);

  if (!pipeline) {
    throw new Error('Pipeline must be specified');
  } else if (typeof pipeline !== 'object' || !Array.isArray(pipeline)) {
    throw new Error('Pipeline must be a valid mongodb aggregation');
  }

  args.pipeline = serialize(args.pipeline);

  return cy.task('aggregate', args).then((result: any) => {
    return Object.values(deserialize(Buffer.from(result)));
  });
}
