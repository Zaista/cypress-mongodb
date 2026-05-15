import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { validate } from '../utils/validator';
import { serialize, deserialize } from 'bson';

export function findOne(query: Document, options?: any): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: options?.collection || mongodb.collection,
      options: options,
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
  });
}

export function findOneAndUpdate(
  filter: Document,
  document: Document,
  options?: any,
): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: options?.collection || mongodb.collection,
      options: options,
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
      if (result !== null) return deserialize(Buffer.from(result));
      else return null;
    });
  });
}

export function findOneAndDelete(filter: Document, options?: any): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: options?.collection || mongodb.collection,
      options: options,
      filter: filter,
    };

    validate(args);

    if (!filter) {
      throw new Error('Filter must be specified');
    } else if (typeof filter !== 'object' || Array.isArray(filter)) {
      throw new Error('Filter must be an object');
    }

    args.filter = serialize(args.filter);
    args.options = serialize(args.options as Document);

    return cy.task('findOneAndDelete', args).then((result: any) => {
      if (result !== null) return deserialize(Buffer.from(result));
      else return null;
    });
  });
}

export function findMany(query: Document, options?: any): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: options?.collection || mongodb.collection,
      options: options,
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
  });
}
