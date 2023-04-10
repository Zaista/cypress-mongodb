import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';
import { serialize, deserialize } from 'bson';

export function findOne(
  query: Document,
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    query: query,
  };

  validate(args);

  if (!query) {
    throw new Error('Query must be specified');
  } else if (typeof query !== 'object' || Array.isArray(query)) {
    throw new Error('Query must be a valid mongodb query object');
  }

  args.query = serialize(args.query);

  return cy.task('findOne', args).then((result: any) => {
    if (result !== null) return deserialize(Buffer.from(result));
    else return null;
  });
}

export function findOneAndUpdate(
  filter: Document,
  document: Document,
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
      upsert: options?.upsert,
      returnDocument: options?.returnDocument,
      returnNewDocument: options?.returnNewDocument,
    },
    filter: filter,
    document: document,
  };

  validate(args);

  if (!filter) {
    throw new Error('Filter must be specified');
  } else if (typeof filter !== 'object' || Array.isArray(filter)) {
    throw new Error('Filter must be an object');
  }

  if (!document) {
    throw new Error('Document must be specified');
  } else if (typeof document !== 'object' || Array.isArray(document)) {
    throw new Error('Document must be an object');
  }

  args.filter = serialize(args.filter);
  args.document = serialize(args.document);

  return cy.task('findOneAndUpdate', args).then((result: any) => {
    if (result !== null) return deserialize(Buffer.from(result)).value;
    else return null;
  });
}

export function findOneAndDelete(
  filter: Document,
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    filter: filter,
  };

  validate(args);

  if (!filter) {
    throw new Error('Filter must be specified');
  } else if (typeof filter !== 'object' || Array.isArray(filter)) {
    throw new Error('Filter must be an object');
  }

  args.filter = serialize(args.filter);

  return cy.task('findOneAndDelete', args).then((result: any) => {
    if (result !== null) return deserialize(Buffer.from(result)).value;
    else return null;
  });
}

export function findMany(
  query: Document,
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    query: query,
  };

  validate(args);

  if (!query) {
    throw new Error('Query must be specified');
  } else if (typeof query !== 'object' || Array.isArray(query)) {
    throw new Error('Query must be a valid mongodb query object');
  }

  args.query = serialize(args.query);

  return cy.task('findMany', args).then((result: any) => {
    return Object.values(deserialize(Buffer.from(result)));
  });
}
