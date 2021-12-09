import { Document } from "mongodb";
declare global {
    interface Connection {
        uri: string;
        database?: string;
        collection?: string;
        pipeline?: Document | Document[];
    }
    namespace Cypress {
        interface Chainable<Subject = any> {
            aggregate(pipeline: Document[], database?: string, collection?: string): Chainable<Subject>;
            createCollection(collection: string, database?: string): Chainable<Subject>;
            dropCollection(collection: string, database?: string): Chainable<Subject>;
            insertOne(pipeline: Document | Document[], collection?: string, database?: string): Chainable<Subject>;
            insertMany(pipeline: Document | Document[], collection?: string, database?: string): Chainable<Subject>;
            deleteOne(pipeline: Document, collection?: string, database?: string): Chainable<Subject>;
            deleteMany(pipeline: Document, collection?: string, database?: string): Chainable<Subject>;
        }
    }
}
export declare const setConfig: (on: any) => Promise<void>;
export declare const setupMongoDB: () => Promise<void>;
