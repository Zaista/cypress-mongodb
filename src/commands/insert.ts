import { Document, ObjectId } from 'mongodb';
import Chainable = Cypress.Chainable;
import { MongoOptions } from '../index';
import { validate } from '../utils/validator';

Date.prototype.toJSON = function () {
  return `{"stringifiedValue": "${this.toISOString()}", "stringifiedFrom": "Date"}`;
};

// TODO figure out how below could/should work
// ObjectId.prototype.toJSON = function () {
//   return `{"stringifiedValue": "${this.toString()}", "stringifiedFrom": "ObjectId"}`;
// }

export function insertOne(
  document: Document,
  options: MongoOptions | undefined
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: options?.collection || Cypress.env('mongodb').collection,
    },
    pipeline: document,
  };

  validate(args);

  if (!document) {
    throw new Error('Document must be specified');
  } else if (typeof document !== 'object' || Array.isArray(document)) {
    throw new Error('Document must be an object');
  }

  const pipelineCopy = Cypress._.cloneDeep(args.pipeline);
  stringify(pipelineCopy);
  args.pipeline = pipelineCopy;

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
    pipeline: documents,
  };

  validate(args);

  if (!documents) {
    throw new Error('Documents must be specified');
  } else if (!Array.isArray(documents)) {
    throw new Error('Documents must be an array');
  }

  const pipelineCopy = Cypress._.cloneDeep(args.pipeline);
  stringify(pipelineCopy);
  args.pipeline = pipelineCopy;

  return cy.task('insertMany', args).then((result: any) => {
    return result;
  });
}

function stringify(o: any) {
  Object.keys(o).forEach(function (k) {
    if (
      o[k] !== null &&
      typeof o[k] === 'object' &&
      typeof o[k].getTimestamp === 'undefined'
    ) {
      stringify(o[k]);
      return;
    } else if (
      o[k] !== null &&
      typeof o[k] === 'object' &&
      typeof o[k].getTimestamp !== 'undefined'
    ) {
      o[k] = `{"stringifiedValue": "${o[
        k
      ].toString()}", "stringifiedFrom": "ObjectId"}`;
    }
  });
}
