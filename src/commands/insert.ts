import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';
import { serialize } from 'bson';

export function insertOne(
  document: Document,
  options?: MongoOptions
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    document: document,
  };

  validate(args);

  if (!document) {
    throw new Error('Document must be specified');
  } else if (typeof document !== 'object' || Array.isArray(document)) {
    throw new Error('Document must be an object');
  }

  args.document = serialize(args.document);

  return cy.task('insertOne', args).then((result: any) => {
    return result;
  });
}

export function insertMany(
  documents: Document[],
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    documents: documents,
  };

  validate(args);

  if (!documents) {
    throw new Error('Documents must be specified');
  } else if (!Array.isArray(documents)) {
    throw new Error('Documents must be an array');
  }

  args.documents = serialize(args.documents) as any;

  return cy.task('insertMany', args).then((result: any) => {
    return result;
  });
}
