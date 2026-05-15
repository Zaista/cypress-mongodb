import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { validate } from '../utils/validator';
import { deserialize, serialize } from 'bson';

export function updateOne(
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

    return cy.task('updateOne', args).then((result: any) => {
      return deserialize(Buffer.from(result));
    });
  });
}

export function updateMany(
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

    return cy.task('updateMany', args).then((result: any) => {
      return deserialize(Buffer.from(result));
    });
  });
}
