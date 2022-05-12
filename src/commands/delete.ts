import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';

export function deleteOne(filter: Document, options: MongoOptions): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    pipeline: filter,
  };

  validate(args);

  if (!filter) {
    throw new Error('Filter must be specified');
  } else if (typeof filter !== 'object' || Array.isArray(filter)) {
    throw new Error('Filter must be an object');
  }

  return cy.task('deleteOne', args).then((result: any) => {
    return result;
  });
}

export function deleteMany(
  filter: Document[],
  options: MongoOptions
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    pipeline: filter,
  };

  validate(args);

  if (!filter) {
    throw new Error('Filter must be specified');
  } else if (typeof filter !== 'object' || Array.isArray(filter)) {
    throw new Error('Filter must be an object');
  }

  return cy.task('deleteMany', args).then((result: any) => {
    return result;
  });
}
