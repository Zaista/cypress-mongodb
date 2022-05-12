import Chainable = Cypress.Chainable;
import { validate } from '../utils/validator';

export function createCollection(
  collection: string,
  options: { database: string }
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: collection,
    },
  };

  validate(args);

  return cy.task('createCollection', args).then((result: any) => {
    return result;
  });
}

export function dropCollection(
  collection: string,
  options: { database: string }
): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    options: {
      database: options?.database || Cypress.env('mongodb').database,
      collection: collection,
    },
  };

  validate(args);

  return cy.task('dropCollection', args).then((result: any) => {
    return result;
  });
}
