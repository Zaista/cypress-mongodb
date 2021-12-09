import { Document } from "mongodb";
import Chainable = Cypress.Chainable;
export declare function insertOne(pipeline: Document, collection?: string, database?: string): Chainable;
export declare function insertMany(pipeline: Document[], collection?: string, database?: string): Chainable;
