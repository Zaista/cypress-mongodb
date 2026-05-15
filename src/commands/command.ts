import Chainable = Cypress.Chainable;
import { Document } from 'mongodb';

export function runCommand(command: Document, options?: any): Chainable {
  return cy.env(['mongodb']).then(({ mongodb }) => {
    const args = {
      uri: mongodb.uri,
      database: options?.database || mongodb.database,
      collection: options?.collection || mongodb.collection,
      options: options,
      command: command,
    };

    return cy.task('runCommand', args).then((result: any) => {
      return result;
    });
  });
}
