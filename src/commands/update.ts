import {Document} from 'mongodb';
import Chainable = Cypress.Chainable;
import {MongoOptions} from '../index';
import {validate} from '../utils/validator';
import {deserialize, serialize} from 'bson';

export function updateOne(
    filter: Document,
    document: Document,
    options?: MongoOptions
): Chainable {
    const args: any = {
        uri: Cypress.env('mongodb').uri,
        options: {
            database: options?.database || Cypress.env('mongodb').database,
            collection: options?.collection || Cypress.env('mongodb').collection,
        },
        filter: filter,
        pipeline: document,
    };

    validate(args);

    if (!filter) {
        throw new Error('Filter must be specified');
    } else if (typeof filter !== 'object' || Array.isArray(filter)) {
        throw new Error('Filter must be an object');
    }

    if (!document) {
        throw new Error('Document must be specified');
    } else if (typeof document !== 'object' || Array.isArray(document)) {
        throw new Error('Document must be an object');
    }

    args.filter = serialize(args.filter);
    args.pipeline = serialize(args.pipeline);

    return cy.task('updateOne', args).then((result: any) => {
        return deserialize(Buffer.from(result));
    });
}

export function updateMany(
    filter: Document,
    document: Document,
    options: MongoOptions | undefined
): Chainable {
    const args: any = {
        uri: Cypress.env('mongodb').uri,
        options: {
            database: options?.database || Cypress.env('mongodb').database,
            collection: options?.collection || Cypress.env('mongodb').collection,
        },
        filter: filter,
        pipeline: document,
    };

    validate(args);

    if (!filter) {
        throw new Error('Filter must be specified');
    } else if (typeof filter !== 'object' || Array.isArray(filter)) {
        throw new Error('Filter must be an object');
    }

    if (!document) {
        throw new Error('Document must be specified');
    } else if (typeof document !== 'object' || Array.isArray(document)) {
        throw new Error('Document must be an object');
    }

    args.filter = serialize(args.filter);
    args.pipeline = serialize(args.pipeline);

    return cy.task('updateMany', args).then((result: any) => {
        return deserialize(Buffer.from(result));
    });
}
