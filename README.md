# Introduction

Plugin that allows interaction with MongoDB server using Cypress commands.

# Installation

run `npm install cypress-mongodb`<br>
configure (see below)<br>
profit

# Supported and tested system versions

|                        | Versions                 |
|------------------------|--------------------------|
| MongoDB                | `4.4`, `5.0`, `6.0`      |
| Node                   | `16.20`, `18.16`, `19.9` |
| MongoDB Node.js Driver | `4.10.0`                 |

### important

If you use mongodb dependency in your project, it hast to be version <=4.10.0, otherwise you'll get a Webpack
compilation error

# Usage

## Collection commands

### > syntax
```TypeScript
cy.createCollection(collectionName);
cy.createCollection(collectionName, options);

cy.dropCollection(collectionName);
cy.dropCollection(collectionName, options);
```

### > arguments
| Arguments      | Type              | Description                            |
|----------------|-------------------|----------------------------------------|
| collectionName | String (required) | Name of the collection to create/drop  |
| options        | Object (optional) | Provide additional options (see below) |


### > options
| Options      | Default                                               | Description                                                        |
|--------------|-------------------------------------------------------|--------------------------------------------------------------------|
| database     | Value specified in the `mongodb` environment variable | Database on top of which the command will be executed              |
| failSilently | `false`                                               | Control if the command will fail or if the collection is not found |

### > examples
```TypeScript
cy.createCollection('someCollection'); // collection with name `someCollection` will be created

cy.createCollection('someOtherCollection', { database: 'someDatabase', failSilently: 'true' }).then(res => {
    cy.log(res); // Will return 'Collection created' or the error object if collection already exists. Will not fail the test 
});

cy.dropCollection('someCollection'); // collection will be droped

cy.dropCollection('nonexistentCollection', { database: 'someDatabase', failSilently: 'true' }).then(res => {
    cy.log(res); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
});
```

## Insert commands
### > syntax
```TypeScript
cy.insertOne(document);
cy.insertOne(document, options);

cy.insertMany(documents);
cy.insertMany(documents, options);
```

### > arguments
| Arguments   | Type                | Description                                        |
|-------------|---------------------|----------------------------------------------------|
| document    | Object (required)   | A Document object that will be inserted            |
| documents   | Object[] (required) | An array of Document objects that will be inserted |
| options     | Object (optional)   | Provide additional options (see below)             |


### > options
| Options      | Default                                               | Description                                             |
|--------------|-------------------------------------------------------|---------------------------------------------------------|
| collection   | Value specified in the `mongodb` environment variable | Database on top of which the command will be executed   |
| database     | Value specified in the `mongodb` environment variable | Collection on top of which the command will be executed |

### > examples
```TypeScript
cy.insertOne({document: 1}; // will insert the provided document in mongodb

cy.insertOne({document: 1}, {collection: 'someCollection', database: 'someDatabase'}).then(result => {
    cy.log(result); // prints the _id of inserted document
});

cy.insertMany([{document: 1}, {document: 2}]); // will insert provided documents in mongodb

cy.insertMany([{document: 1}, {document: 2}], {collection: 'some_other_collection'}).then(result => {
    console.log(result); // prints the key-value pairs of the inserted ids
});
```

## Find commands
### > syntax
```TypeScript

const documentWithObjectId = {_id: new ObjectId();}; // don't forget import { ObjectId } from 'mongodb';
cy.findOne(documentWithObjectId).then(res => {
    cy.log(res); // prints the document with the _id (if found)
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
