import Chainable = Cypress.Chainable;

export function createCollection(collection: string, database?: string): Chainable {

    let args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };

    if (!collection) {
        throw new Error('Collection not specified')
    }

    if (database) {
        args.database = database;
    } else if (!args.database) {
        throw new Error('Database not specified')
    }

    return cy.task('createCollection', {
        uri: args.uri,
        collection: collection,
        database: args.database,
    }).then((result: any) => {
        return result;
    });
}

export function dropCollection(collection: string, database?: string): Chainable {

    let args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };

    if (!collection) {
        throw new Error('Collection not specified')
    }

    if (database) {
        args.database = database;
    } else if (!args.database) {
        throw new Error('Database not specified')
    }

    return cy.task('dropCollection', {
        uri: args.uri,
        collection: collection,
        database: args.database,
    }).then((result: any) => {
        return result;
    });
}