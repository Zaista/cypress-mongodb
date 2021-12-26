import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;

export function findOne(
  query: Document,
  collection?: string,
  database?: string
): Chainable {
  let args = {
    uri: Cypress.env('MONGODB_URI'),
    database: Cypress.env('MONGODB_DATABASE'),
    collection: Cypress.env('MONGODB_COLLECTION'),
    pipeline: [],
  };

  if (!query) {
    throw new Error('Query must be specified');
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
    .task('findOne', {
      uri: args.uri,
      pipeline: query,
      collection: args.collection,
      database: args.database,
    })
    .then((result: any) => {
      return result;
    });
}

export function findMany(
  query: Document,
  collection?: string,
  database?: string
): Chainable {
  let args = {
    uri: Cypress.env('MONGODB_URI'),
    database: Cypress.env('MONGODB_DATABASE'),
    collection: Cypress.env('MONGODB_COLLECTION'),
    pipeline: [],
  };

  if (!query) {
    throw new Error('Query must be specified');
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
    .task('findMany', {
      uri: args.uri,
      pipeline: query,
      collection: args.collection,
      database: args.database,
    })
    .then((result: any) => {
      return result;
    });
}
