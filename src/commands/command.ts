import Chainable = Cypress.Chainable;
import { Document } from 'mongodb';

export function runCommand(command: Document, options?: any): Chainable {
  const args = {
    uri: Cypress.env('mongodb').uri,
    database: options?.database || Cypress.env('mongodb').database,
    collection: options?.collection || Cypress.env('mongodb').collection,
    options: options,
    command: command,
  };

  return cy.task('runCommand', args).then((result: any) => {
    return result;
  });
}
