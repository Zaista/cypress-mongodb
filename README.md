# Introduction

Plugin that allows interaction with MongoDB server using Cypress commands.

# Installation

run `npm install cypress-mongodb`<br>
configure (see below)<br>
profit

# Supported and tested system versions

|                        | Versions                 |
| ---------------------- | ------------------------ |
| MongoDB                | `4.4`, `5.0`, `6.0`      |
| Node                   | `16.20`, `18.16`, `20.5` |
| MongoDB Node.js Driver | `4.10.0`                 |

### known issues

If you use mongodb dependency in your project, it hast to be version <=4.10.0, otherwise you'll get a Webpack
compilation error

# Plugin configuration

In your `cypress.config.js` file, make the following changes:

1. Add the necessary `mongodb` environment variables under `env` block
2. Import and load the plugin under `e2e` block

```JavaScript
import { configurePlugin } from 'cypress-mongodb';

module.exports = defineConfig({
    env: {
        mongodb: {
            uri: 'mongodb://localhost:27017',
            database: 'database_name',
            collection: 'collection_name'
        }
    },
    e2e: {
        setupNodeEvents(on, config) {
            configurePlugin(on);
        }
    }
});
```

<b>Note:</b> only `mongodb.uri` is mandatory, you can always override/set database and collection names in each cypress
mongodb command using options. You can set both local and remote urls.

Finally, in your `cypress/support/e2e.js` add the following:

```JavaScript
import { addCommands } from 'cypress-mongodb/dist/index-browser';
addCommands();
```

# Documentation

## Collection commands

### > syntax

```TypeScript
cy.createCollection(name);
cy.createCollection(name, options);

cy.dropCollection(name);
cy.dropCollection(name, options);
```

### > arguments

| Arguments | Type              | Description                            |
| --------- | ----------------- | -------------------------------------- |
| name      | String (required) | Name of the collection to create/drop  |
| options   | Object (optional) | Provide additional options (see below) |

### > examples

```TypeScript
cy.createCollection('someCollection'); // collection with name `someCollection` will be created

cy.createCollection('someOtherCollection', { database: 'someDatabase', failSilently: 'true' }).then(result => {
    cy.log(result); // Will return 'Collection created' or the error object if collection already exists. Will not fail the test
});

cy.dropCollection('someCollection'); // collection will be droped

cy.dropCollection('nonexistentCollection', { database: 'someDatabase', failSilently: 'true' }).then(result => {
    cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
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

| Arguments | Type                | Description                                        |
| --------- | ------------------- | -------------------------------------------------- |
| document  | Object (required)   | A Document object that will be inserted            |
| documents | Object[] (required) | An array of Document objects that will be inserted |
| options   | Object (optional)   | Provide additional options (see below)             |

### > examples

```TypeScript
cy.insertOne({document: 1}); // will insert the provided document in mongodb

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
cy.findOne(query);
cy.findOne(query, options);

cy.findMany(query);
cy.findMany(query, options);

cy.findOneAndUpdate(filter);
cy.findOneAndUpdate(filter, options);

cy.findOneAndDelete(filter);
cy.findOneAndDelete(filter, options);
```

### > arguments

| Arguments | Type              | Description                                              |
| --------- | ----------------- | -------------------------------------------------------- |
| query     | Object (required) | Specifies query selection criteria using query operators |
| filter    | Object (required) | The selection criteria for the deletion                  |
| options   | Object (optional) | Provide additional options (see below)                   |

### > examples

```TypeScript
import { ObjectId } from 'mongodb';
cy.findOne({_id: new ObjectId()}).then(result => {
    cy.log(result); // prints the document with the _id if found, otherwise null
});

cy.findMany({document: 1}).then(result => {
    cy.log(result); // prints the array of documents if any matched, or empty array
});

cy.findOneAndUpdate({ document: 2 }, { $set: { document: 3 }}).then(result => {
  cy.log(result); // prints the original document with value 2
});
cy.findOneAndUpdate({ document: 3 }, { $set: { document: 4 }}, {upsert: true, returnDocument: 'after'}).then((result: any) => {
  cy.log(result); // prints the updated document with the value 4, will create (upsert) a new document if none are found
});
```

## Update commands

### > syntax

```TypeScript
cy.updateOne(filter, update);
cy.updateOne(filter, update, options);

cy.updateMany(filter, update);
cy.updateMany(filter, update, options);
```

### > arguments

| Arguments | Type                          | Description                            |
| --------- | ----------------------------- | -------------------------------------- |
| filter    | Object (required)             | The selection criteria for the update  |
| update    | Object or pipeline (required) | The modifications to apply             |
| options   | Object (optional)             | Provide additional options (see below) |

### > examples

```TypeScript
cy.updateOne({document: 1}, { $set: { document: 2 } }, { upsert: true }).then(result => {
    cy.log(result); // prints the object containing the update info: matchedCount, modifiedCount, upsertedCount, etc
});

cy.updateMany({document: 1}, { $set: { document: 2 } }, { upsert: true }).then(result => {
    cy.log(result); // prints the object containing the update info: matchedCount, modifiedCount, upsertedCount, etc
});
```

## Delete commands

### > syntax

```TypeScript
cy.deleteOne(filter);
cy.deleteOne(filter, options);

cy.deleteMany(filter);
cy.deleteMany(filter, options);
```

### > arguments

| Arguments | Type              | Description                                       |
| --------- | ----------------- | ------------------------------------------------- |
| filter    | Object (required) | Specifies deletion criteria using query operators |
| options   | Object (optional) | Provide additional options (see below)            |

### > examples

```TypeScript
cy.deleteOne({document: 1}); // will delete a first matched document

cy.deleteOne({document: 1}, {collection: 'new_collection', database: 'some_database'}).then(result => {
    cy.log(result); // prints 1 (or 0) document deleted
});

cy.deleteMany(deleteClause).then(res => {
    cy.log(result); // prints '# documents deleted'
});
```

## Aggregate commands

### > syntax

```TypeScript
cy.aggregate(pipeline);
cy.aggregate(pipeline, options);
```

### > arguments

| Arguments | Type                | Description                                                                         |
| --------- | ------------------- | ----------------------------------------------------------------------------------- |
| pipeline  | Object[] (required) | An array of object representing a sequence of data aggregation operations or stages |
| options   | Object (optional)   | Provide additional options (see below)                                              |

### > examples

```TypeScript
const pipeline = []; // any kind of aggregation
cy.aggregate(pipeline).then(result => {
    cy.log(result); // prints the result of the aggregation
});
```

## runCommand

### > syntax

```TypeScript
cy.runCommand(command);
cy.runCommand(command, options);
```

### > arguments

| Arguments | Type                | Description                                        |
| --------- | ------------------- | -------------------------------------------------- |
| command   | Document (required) | A document representing the mongodb command to run |
| options   | Object (optional)   | Provide additional options (see below)             |

### > examples

```TypeScript
const command = { listCollections: 1, nameOnly: true }; // any kind of command
cy.runCommand(command).then(result => {
    cy.log(result); // prints the result of the command
});
```

### > available options

| Options                    | Default                                               | Description                                                                                                                  |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| database                   | Value specified in the `mongodb` environment variable | Database on top of which the command will be executed                                                                        |
| collection                 | Value specified in the `mongodb` environment variable | Collection on top of which the command will be executed                                                                      |
| failSilently               | `false`                                               | Control if the command will fail or if the collection is not found                                                           |
| `createCollection` options | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/CreateCollectionOptions.html) |
| `dropCollection` options   | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/DropCollectionOptions.html)   |
| `insertOne` options        | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/InsertOneOptions.html)        |
| `insertMany` options       | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/BulkWriteOptions.html)        |
| `findOne` options          | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/FindOptions.html)             |
| `findMany` options         | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/FindOptions.html)             |
| `findOneAndUpdate` options | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/FindOneAndUpdateOptions.html) |
| `findOneAndDelete` options | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/FindOneAndDeleteOptions.html) |
| `updateOne` options        | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/UpdateOptions.html)           |
| `updateMany` options       | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/UpdateOptions.html)           |
| `deleteOne` options        | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/DeleteOptions.html)           |
| `deleteMany` options       | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/DeleteOptions.html)           |
| `aggregate` options        | _N/A_                                                 | Refer to official [documentation](https://mongodb.github.io/node-mongodb-native/6.0/interfaces/AggregateOptions.html)        |

# Reference

https://mongodb.github.io/node-mongodb-native/6.0/

# Future development & support

Please create feature requests for things you'd like to see.<br>
Please raise issues for any problems you encounter.
