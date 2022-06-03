# Introduction

Plugin that allows interaction with MongoDB server using Cypress commands.

# Installation

run `npm install cypress-mongodb`<br>
configure (see below)<br>
profit

# Supported and tested MongoDB versions

4.0, 4.2, 4.4, 5.0

# Usage

```
cy.createCollection('new_collection', { database: 'new_database' }); // creates both collection and database

const oneDocument = {document: 1};
cy.insertOne(oneDocument, { collection: 'some_collection', database: 'some_database' }).then(res => {
    cy.log(res); // print the id of inserted document
});

const manyDocuments = [{document: 1}, {document: 2}];
cy.insertMany(manyDocuments, { collection: 'some_other_collection' }).then(res => { // defaults to database from env variable
    console.log(res); // print object with inserted ids
});

const deleteClause = {document: 1};
cy.deleteOne(oneDocument, { collection: 'new_collection', database: 'some_database' }).then(res => {
    cy.log(res); // prints 1 (or 0) document deleted
});

cy.deleteMany(deleteClause).then(res => { // defaults to collection and database from env variables
    cy.log(res); // prints '# documents deleted'
});

const pipeline = []; // any kind of aggregation
cy.aggregate(pipeline).then(res => {
    cy.log(res); // print the result of the aggregation
});

cy.dropCollection('start_new').then(res => {
    cy.log(res); // prints 'Collection dropped'
});
```

`createCollection` and `dropCollection` have the option to `failSilently`.

```
cy.createCollection('existing_collection', { failSilently: true}).then(res => {
    cy.log(res); // Error object if collection already exists
});

cy.dropCollection('nonexistent_collection', { failSilently: true}).then(res => {
    cy.log(res); // Error object if collection doesn’t exist
});
```

# Environment setup

Add the following `env` properties in your `cypress.json` file:

```
  "env": {
    mongodb: {
      "uri": "mongodb://localhost:27017",
      "database": "database_name",
      "collection": "collection_name"
    }
  }
```

<b>Note:</b> only `mongodb.uri` is mandatory, you can always override/set database and collection names in each cypress mongodb command using options. You can set both local and remote urls.

# Plugin configuration - JavaScript

In your `cypress/plugins/index.js` add the following:

```
const mongo = require('cypress-mongodb');

module.exports = (on, config) => {
  mongo.configurePlugin(on);
}
```

In your `cypress/support/index.js` add the following:

```
const mongo = require('cypress-mongodb');
mongo.addCommands();
```

# Plugin configuration - TypeScript

In your `cypress/plugins/index.ts` add the following:

```
import * as mongo from 'cypress-mongodb';

/**
 * @type {Cypress.PluginConfig}
 */
export default (on, config) => {
    mongo.configurePlugin(on);
}
```

In your `cypress/support/index.ts` add the following:

```
import * as mongo from "cypress-mongodb";
mongo.addCommands();
```

# Future development & support

Update command support.<br>
Explicit support for fixture files planned.<br>
Please create feature requests for things you'd like to see.<br>
Please raise issues for any problems you encounter.
