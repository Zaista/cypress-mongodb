import {Document} from "mongodb";
import * as aggregate_util from "./utils/aggregation";
import * as aggregate_commands from './commands/aggregation';
import * as collection_util from "./utils/collection";
import * as collection_commands from './commands/collection';
import * as insert_util from "./utils/insert";
import * as insert_commands from './commands/insert';
import * as delete_util from "./utils/delete";
import * as delete_commands from './commands/delete';

declare global {

    var Cypress: any;
    var cy: any;

    interface Connection {
        uri: string,
        database?: string,
        collection?: string,
        pipeline?: Document | Document[]
    }

    namespace Cypress {
        interface Chainable<Subject = any> {
            aggregate(pipeline: Document[], database?: string, collection?: string): Chainable<Subject>
            createCollection(collection: string, database?: string): Chainable<Subject>
            dropCollection(collection: string, database?: string): Chainable<Subject>
            insertOne(document: Document, collection?: string, database?: string): Chainable<Subject>
            insertMany(documents: Document[], collection?: string, database?: string): Chainable<Subject>
            deleteOne(filter: Document, collection?: string, database?: string): Chainable<Subject>
            deleteMany(filter: Document, collection?: string, database?: string): Chainable<Subject>
        }
    }
}

export const setConfig = async (on: any) => {

    on('task', {
        aggregate(args: Connection) {
            return aggregate_util.aggregate(args).then(result => {
                return result;
            });
        },
    });

    on('task', {
        createCollection(args: Connection) {
            return collection_util.createCollection(args).then(result => {
                return result;
            });
        },
    });

    on('task', {
        dropCollection(args: Connection) {
            return collection_util.dropCollection(args).then(result => {
                return result;
            });
        },
    });

    on('task', {
        insertOne(args: Connection) {
            return insert_util.insertOne(args).then(result => {
                return result;
            });
        },
    });

    on('task', {
        insertMany(args: Connection) {
            return insert_util.insertMany(args).then(result => {
                return result;
            });
        },
    });

    on('task', {
        deleteOne(args: Connection) {
            return delete_util.deleteOne(args).then(result => {
                return result;
            });
        },
    });

    on('task', {
        deleteMany(args: Connection) {
            return delete_util.deleteMany(args).then(result => {
                return result;
            });
        },
    });
}

export const setupMongoDB = async () => {

    Cypress.Commands.add(
        'aggregate',
        aggregate_commands.aggregate
    );

    Cypress.Commands.add(
        'createCollection',
        collection_commands.createCollection
    );

    Cypress.Commands.add(
        'dropCollection',
        collection_commands.dropCollection
    );

    Cypress.Commands.add(
        'insertOne',
        insert_commands.insertOne
    );

    Cypress.Commands.add(
        'insertMany',
        insert_commands.insertMany
    );

    Cypress.Commands.add(
        'deleteOne',
        delete_commands.deleteOne
    );

    Cypress.Commands.add(
        'deleteMany',
        delete_commands.deleteMany
    );

    console.log('MongoDB plugin configured');
}