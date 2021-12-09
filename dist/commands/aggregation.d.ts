import { Document } from "mongodb";
import Chainable = Cypress.Chainable;
export declare function aggregate(pipeline: Document[], database?: string, collection?: string): Chainable;
