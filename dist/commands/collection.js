"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropCollection = exports.createCollection = void 0;
function createCollection(collection, database) {
    var args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };
    if (!collection) {
        throw new Error('Collection not specified');
    }
    if (database) {
        args.database = database;
    }
    else if (!args.database) {
        throw new Error('Database not specified');
    }
    return cy.task('createCollection', {
        uri: args.uri,
        collection: collection,
        database: args.database,
    }).then(function (result) {
        return result;
    });
}
exports.createCollection = createCollection;
function dropCollection(collection, database) {
    var args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };
    process.env.TR;
    if (!collection) {
        throw new Error('Collection not specified');
    }
    if (database) {
        args.database = database;
    }
    else if (!args.database) {
        throw new Error('Database not specified');
    }
    return cy.task('dropCollection', {
        uri: args.uri,
        collection: collection,
        database: args.database,
    }).then(function (result) {
        return result;
    });
}
exports.dropCollection = dropCollection;
