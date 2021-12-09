import { Document } from "mongodb";
import Chainable = Cypress.Chainable;
export declare function deleteOne(pipeline: Document, collection?: string, database?: string): Chainable;
export declare function deleteMany(pipeline: Document[], collection?: string, database?: string): Chainable;
