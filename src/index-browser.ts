import * as aggregate_commands from './commands/aggregation';
import * as collection_commands from './commands/collection';
import * as insert_commands from './commands/insert';
import * as delete_commands from './commands/delete';
import * as find_commands from './commands/find';
import * as update_commands from './commands/update';
import * as command_commands from './commands/command';
import { Document } from 'mongodb';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Perform a mongodb aggregation
       * @example cy.aggregate([{ $match: { id: 1 } }]);
       */
      aggregate(pipeline: Document[], options?: any): Chainable<Subject>;
      /**
       * Create a new collection in mongodb
       */
      createCollection(collection: string, options?: any): Chainable<Subject>;
      /**
       * Drop an existing collection in mongodb
       */
      dropCollection(collection: string, options?: any): Chainable<Subject>;
      /**
       * Insert a single document in mongodb
       */
      insertOne(document: Document, options?: any): Chainable<Subject>;
      /**
       * Insert multiple documents in mongodb
       */
      insertMany(documents: Document[], options?: any): Chainable<Subject>;
      /**
       * Delete a single document from mongodb
       */
      deleteOne(filter: Document, options?: any): Chainable<Subject>;
      /**
       * Delete multiple documents from mongodb
       */
      deleteMany(filter: Document, options?: any): Chainable<Subject>;
      /**
       * Find a single document in mongodb
       */
      findOne(query: Document, options?: any): Chainable<Subject>;
      /**
       * Find and update a single document in mongodb
       */
      findOneAndUpdate(
        filter: Document,
        document: Document,
        options?: any,
      ): Chainable<Subject>;
      /**
       * Find and delete a single document in mongodb
       */
      findOneAndDelete(filter: Document, options?: any): Chainable<Subject>;
      /**
       * Find multiple documents in mongodb
       */
      findMany(query: Document, options?: any): Chainable<Subject>;
      /**
       * Update a single document in mongodb
       */
      updateOne(
        filter: Document,
        document: Document,
        options?: any,
      ): Chainable<Subject>;
      /**
       * Update multiple documents in mongodb
       */
      updateMany(
        filter: Document,
        document: Document,
        options?: any,
      ): Chainable<Subject>;
      /**
       * Run a custom command in mongodb
       */
      runCommand(command: Document, options?: any): Chainable<Subject>;
    }
  }
}

export function addCommands() {
  Cypress.Commands.add('aggregate', aggregate_commands.aggregate);

  Cypress.Commands.add(
    'createCollection',
    collection_commands.createCollection,
  );

  Cypress.Commands.add('dropCollection', collection_commands.dropCollection);

  Cypress.Commands.add('insertOne', insert_commands.insertOne);

  Cypress.Commands.add('insertMany', insert_commands.insertMany);

  Cypress.Commands.add('deleteOne', delete_commands.deleteOne);

  Cypress.Commands.add('deleteMany', delete_commands.deleteMany);

  Cypress.Commands.add('findOne', find_commands.findOne);

  Cypress.Commands.add('findOneAndUpdate', find_commands.findOneAndUpdate);

  Cypress.Commands.add('findOneAndDelete', find_commands.findOneAndDelete);

  Cypress.Commands.add('findMany', find_commands.findMany);

  Cypress.Commands.add('updateOne', update_commands.updateOne);

  Cypress.Commands.add('updateMany', update_commands.updateMany);

  Cypress.Commands.add('runCommand', command_commands.runCommand);

  console.log('MongoDB plugin configured');
}
