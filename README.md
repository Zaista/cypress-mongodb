# Introduction

Plugin that allows interaction with MongoDB server using Cypress commands.

# Installation

run `npm install cypress-mongodb`

profit

# Usage

```
cy.createCollection('new_collection', 'new_database'); // creates both collection and database

const oneDocument = {document: 1};
cy.insertOne(oneDocument, 'some_collection', 'some_database').then(res => {
    cy.log(res); // print the id of inserted document
});

const manyDocuments = [{document: 1}, {document: 2}];
cy.insertMany(manyDocuments, 'some_other_collection');

cy.deleteOne(oneDocument, 'new_collection', 'some_database');

cy.deleteMany(manyDocuments); // defaults to collection and database from env variables

const pipeline = []; // any kind of aggregation
cy.aggregate(pipeline).then(res => {
    cy.log(res); // print the result of the aggregation
});

cy.dropCollection('start_new').then(res => {
    cy.log(res);
});
```

# Environment setup

Add the following `env` properties in your `cypress.json` file:
```
  "env": {
    "MONGODB_URI": "mongodb://localhost:27017",
    "MONGODB_DATABASE": "database_name",
    "MONGODB_COLLECTION": "collection_name"
  }
```

<b>Note:</b> only `MONGODB_URI` is mandatory, you can always override/set database and collection names in each cypress mongodb command. You can set both local and remote urls.

# Plugin configuration - JavaScript

In your `cypress/plugins/index.js` add the following:

```
const mongo = require('cypress-mongodb');

module.exports = (on, config) => {
  mongo.setConfig(on);
}
```

In your `cypress/index/index.js` add the following:

```
const mongo = require('cypress-mongodb');
mongo.setupMongoDB();
```


# Plugin configuration - TypeScript

In your `cypress/plugins/index.ts` add the following:

```
import * as mongo from 'cypress-mongodb';

/**
 * @type {Cypress.PluginConfig}
 */
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    getCompareSnapshotsPlugin(on, config);
    mongo.setConfig(on);
}
```

In your `cypress/index/index.ts` add the following:

```
import * as mongo from "cypress-mongodb";
mongo.setupMongoDB();
```

# Future development & support

Support for fixture files planned.<br>
Please create feature requests for things you'd like to see.<br>
Please raise issues for any problems you encounter.