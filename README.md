# Introduction

Plugin that allows interaction with MongoDB server using Cypress commands.

# Installation

run `npm install cypress-mongodb`<br>
configure (see below)<br>
profit

# Supported and tested MongoDB versions

4.4, 5.0, 6.0

# Usage

```TypeScript
cy.createCollection('new_collection', {database: 'new_database'}); // creates both collection and database

const oneDocument = {document: 1};
cy.insertOne(oneDocument, {collection: 'some_collection', database: 'some_database'}).then(res => {
    cy.log(res); // prints the id of inserted document
});

const manyDocuments = [{document: 1}, {document: 2}];
cy.insertMany(manyDocuments, {collection: 'some_other_collection'}).then(res => { // defaults to database from env variable
    console.log(res); // prints the key-value pairs with inserted ids
});

const deleteClause = {document: 1};
cy.deleteOne(oneDocument, {collection: 'new_collection', database: 'some_database'}).then(res => {
    cy.log(res); // prints 1 (or 0) document deleted
});

cy.deleteMany(deleteClause).then(res => { // defaults to collection and database from env variables
    cy.log(res); // prints '# documents deleted'
});

const pipeline = []; // any kind of aggregation
cy.aggregate(pipeline).then(res => {
    cy.log(res); // prints the result of the aggregation
});

cy.dropCollection('start_new').then(res => {
    cy.log(res); // prints 'Collection dropped'
});
```

`createCollection` and `dropCollection` have the option to `failSilently`.

```TypeScript
cy.createCollection('existing_collection', {failSilently: true}).then(res => {
    cy.log(res); // Error object if collection already exists
});

cy.dropCollection('nonexistent_collection', {failSilently: true}).then(res => {
    cy.log(res); // Error object if collection doesn’t exist
});
```

# Environment setup

Add the following `env` properties in your `cypress.config.js` file:

```JavaScript
{
    module.exports = defineConfig({
        "env": {
            "mongodb": {
                "uri": "mongodb://localhost:27017",
                "database": "database_name",
                "collection": "collection_name"
            }
        }
    });
}
```

<b>Note:</b> only `mongodb.uri` is mandatory, you can always override/set database and collection names in each cypress
mongodb command using options. You can set both local and remote urls.

# Plugin configuration - JavaScript

In your `cypress.config.js` add the following:

```JavaScript
const mongo = require('cypress-mongodb');

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            mongo.configurePlugin(on);
        }
    }
});
```

In your `cypress/support/e2e.js` add the following:

```JavaScript
const mongo = require('cypress-mongodb');
mongo.addCommands();
```

# Plugin configuration - TypeScript

In your `cypress.config.ts` add the following:

```TypeScript
import {defineConfig} from 'cypress'
import {configurePlugin} from 'cypress-mongodb';

/**
 * @type {Cypress.PluginConfig}
 */
export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
            configurePlugin(on);
        }
    }
});
```

In your `cypress/support/e2e.ts` add the following:

```TypeScript
import {addCommands} from "cypress-mongodb";

addCommands();
```

# Future development & support

Please create feature requests for things you'd like to see.<br>
Please raise issues for any problems you encounter.
