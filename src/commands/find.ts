import { Document, ObjectId } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';

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
    pipeline: query,
  };

  validate(args);

  if (!query) {
    throw new Error('Query must be specified');
  } else if (typeof query !== 'object' || Array.isArray(query)) {
    throw new Error('Query must be a valid mongodb query object');
  }

  return cy.task('findOne', args).then((result: any) => {
    destringify(result);
    return result;
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
    pipeline: query,
  };

  validate(args);

  if (!query) {
    throw new Error('Query must be specified');
  } else if (typeof query !== 'object' || Array.isArray(query)) {
    throw new Error('Query must be a valid mongodb query object');
  }

  return cy.task('findMany', args).then((result: any) => {
    destringify(result);
    return result;
  });
}

function destringify(o: any) {
  if (o !== null) {
    Object.keys(o).forEach(function (k) {
      if (o[k] !== null && typeof o[k] === 'object') {
        destringify(o[k]);
        return;
      }
      if (typeof o[k] === 'string' && o[k].includes('stringifiedFrom')) {
        const jsonObject = JSON.parse(o[k]);
        if (jsonObject.stringifiedFrom === 'Date')
          o[k] = new Date(jsonObject.stringifiedValue);
        else if (jsonObject.stringifiedFrom === 'ObjectId')
          o[k] = new ObjectId(jsonObject.stringifiedValue);
        else throw new Error('Stringification not supported');
      }
    });
  }
}
