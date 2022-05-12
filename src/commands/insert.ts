import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';

export function insertOne(
  document: Document,
  options: { database: string; collection: string; forceObjectId: boolean }
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
      forceObjectId: false,
    },
    pipeline: document,
  };

  validate(args);

  if (!document) {
    throw new Error('Document must be specified');
  } else if (typeof document !== 'object' || Array.isArray(document)) {
    throw new Error('Document must be an object');
  }

  if (options?.forceObjectId)
    args.options.forceObjectId = options.forceObjectId;

  return cy.task('insertOne', args).then((result: any) => {
    return result;
  });
}

export function insertMany(
  documents: Document[],
  options: { database: string; collection: string; forceObjectId: boolean }
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
      forceObjectId: false,
    },
    pipeline: documents,
  };

  validate(args);

  if (!documents) {
    throw new Error('Documents must be specified');
  } else if (!Array.isArray(documents)) {
    throw new Error('Documents must be an array');
  }

  if (options?.forceObjectId)
    args.options.forceObjectId = options.forceObjectId;

  return cy.task('insertMany', args).then((result: any) => {
    return result;
  });
}
