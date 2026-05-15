import Chainable = Cypress.Chainable;
import { validate } from '../utils/validator';

export function createCollection(collection: string, options?: any): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: collection,
      options: options,
    };

    validate(args);

    return cy.task('createCollection', args).then((result: any) => {
      return result;
    });
  });
}

export function dropCollection(collection: string, options?: any): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: collection,
      options: options,
    };

    validate(args);

    return cy.task('dropCollection', args).then((result: any) => {
      return result;
    });
  });
}
