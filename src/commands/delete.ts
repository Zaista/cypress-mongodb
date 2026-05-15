import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { validate } from '../utils/validator';
import { serialize } from 'bson';

export function deleteOne(filter: Document, options?: any): Chainable {
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
    return cy.task('deleteOne', args).then((result: any) => {
      return result;
    });
  });
}

export function deleteMany(filter: Document, options?: any): Chainable {
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
    return cy.task('deleteMany', args).then((result: any) => {
      return result;
    });
  });
}
