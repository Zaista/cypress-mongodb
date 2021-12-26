import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;

export function insertOne(
  document: Document,
  collection?: string,
  database?: string
): Chainable {
  let args = {
    uri: Cypress.env('MONGODB_URI'),
    database: Cypress.env('MONGODB_DATABASE'),
    collection: Cypress.env('MONGODB_COLLECTION'),
    pipeline: [],
  };

  if (!document) {
    throw new Error('Document must be specified');
  }

  if (collection) {
    args.collection = collection;
  } else if (!args.collection) {
    throw new Error('Collection not specified');
  }

  if (database) {
    args.database = database;
  } else if (!args.database) {
    throw new Error('Database not specified');
  }

  return cy
    .task('insertOne', {
      uri: args.uri,
      document: document,
      collection: args.collection,
      database: args.database,
    })
    .then((result: any) => {
      return result;
    });
}

export function insertMany(
  documents: Document[],
  collection?: string,
  database?: string
): Chainable {
  let args = {
    uri: Cypress.env('MONGODB_URI'),
    database: Cypress.env('MONGODB_DATABASE'),
    collection: Cypress.env('MONGODB_COLLECTION'),
    pipeline: [],
  };

  if (!documents) {
    throw new Error('Documents must be specified');
  }

  if (collection) {
    args.collection = collection;
  } else if (!args.collection) {
    throw new Error('Collection not specified');
  }

  if (database) {
    args.database = database;
  } else if (!args.database) {
    throw new Error('Database not specified');
  }

  return cy
    .task('insertMany', {
      uri: args.uri,
      pipeline: documents,
      collection: args.collection,
      database: args.database,
    })
    .then((result: any) => {
      return result;
    });
}
