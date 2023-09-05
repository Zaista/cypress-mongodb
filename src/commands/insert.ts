import { Document } from 'mongodb';
import Chainable = Cypress.Chainable;
import { validate } from '../utils/validator';
import { serialize } from 'bson';

export function insertOne(document: Document, options?: any): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    database: options?.database || Cypress.env('mongodb').database,
    collection: options?.collection || Cypress.env('mongodb').collection,
    options: options,
    document: document,
  };

  validate(args);

  if (!document) {
    throw new Error('Document must be specified');
  } else if (typeof document !== 'object' || Array.isArray(document)) {
    throw new Error('Document must be an object');
  }

  args.document = serialize(args.document);

  return cy.task('insertOne', args).then((result: any) => {
    return result;
  });
}

export function insertMany(documents: Document[], options?: any): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    database: options?.database || Cypress.env('mongodb').database,
    collection: options?.collection || Cypress.env('mongodb').collection,
    options: options,
    documents: documents,
  };

  validate(args);

  if (!documents) {
    throw new Error('Documents must be specified');
  } else if (!Array.isArray(documents)) {
    throw new Error('Documents must be an array');
  }

  args.documents = serialize(
    Object.fromEntries(args.documents.entries()),
  ) as any;

  return cy.task('insertMany', args).then((result: any) => {
    return result;
  });
}
