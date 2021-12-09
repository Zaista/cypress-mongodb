"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMany = exports.deleteOne = void 0;
function deleteOne(pipeline, collection, database) {
    var args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };
    if (!pipeline) {
        throw new Error('Pipeline must be specified');
    }
    if (collection) {
        args.collection = collection;
    }
    else if (!args.collection) {
        throw new Error('Collection not specified');
    }
    if (database) {
        args.database = database;
    }
    else if (!args.database) {
        throw new Error('Database not specified');
    }
    return cy.task('deleteOne', {
        uri: args.uri,
        pipeline: pipeline,
        collection: args.collection,
        database: args.database,
    }).then(function (result) {
        return result;
    });
}
exports.deleteOne = deleteOne;
function deleteMany(pipeline, collection, database) {
    var args = {
        uri: Cypress.env('MONGODB_URI'),
        database: Cypress.env('MONGODB_DATABASE'),
        collection: Cypress.env('MONGODB_COLLECTION'),
        pipeline: []
    };
    if (!pipeline) {
        throw new Error('Pipeline must be specified');
    }
    if (collection) {
        args.collection = collection;
    }
    else if (!args.collection) {
        throw new Error('Collection not specified');
    }
    if (database) {
        args.database = database;
    }
    else if (!args.database) {
        throw new Error('Database not specified');
    }
    return cy.task('deleteMany', {
        uri: args.uri,
        pipeline: pipeline,
        collection: args.collection,
        database: args.database,
    }).then(function (result) {
        return result;
    });
}
exports.deleteMany = deleteMany;
