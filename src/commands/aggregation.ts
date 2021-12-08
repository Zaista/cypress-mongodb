import {Document} from "mongodb";
import Chainable = Cypress.Chainable;

export function aggregate(pipeline: Document[], database?: string, collection?: string): Chainable {

    let args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };

    if (database) {
        args.database = database;
    } else if (!args.database) {
        throw new Error('Database not specified')
    }

    if (collection) {
        args.collection = collection;
    } else if (!args.collection) {
        throw new Error('Collection not specified')
    }

    return cy.task('aggregate', {
        uri: args.uri,
        database: args.database,
        collection: args.collection,
        pipeline: pipeline
    }).then((result: any) => {
        return result;
    });
}