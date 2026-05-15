import { faker } from '@faker-js/faker';

describe('Missing configuration: collection tests', () => {
  it('Should fail with missing collection name error - aggregate', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const pipeline = [{ $match: { id: 1 } }];
    cy.aggregate(pipeline).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - create', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    // @ts-ignore
    cy.createCollection().then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - drop', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    // @ts-ignore
    cy.dropCollection().then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - findOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const query = { id: 1 };
    cy.findOne(query).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - findMany', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const query = { id: 1 };
    cy.findMany(query).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - deleteOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const filter = { id: 1 };
    cy.deleteOne(filter).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - deleteMany', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const filter = { id: 1 };
    cy.deleteMany(filter).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - insertOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const document = { id: 1 };
    cy.insertOne(document).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });

  it('Should fail with missing collection name error - insertMany', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Collection not specified')) return;
      throw error;
    });
    const documents = [{ id: 1 }];
    cy.insertMany(documents).then(() => {
      throw new Error('Should fail with missing collection name error');
    });
  });
});

describe('Missing configuration: collection options', () => {
  it('Should work with provided options - create', () => {
    cy.createCollection(faker.word.sample()).then((result) => {
      assert.equal('Collection created', result);
    });
  });
  it('Should work with provided options - aggregate', () => {
    const pipeline = [{ $match: { id: 1 } }];
    cy.aggregate(pipeline, {
      collection: 'collection',
    });
  });

  it('Should work with provided options - findOne', () => {
    const query = { id: 1 };
    cy.findOne(query, {
      collection: 'collection',
    });
  });

  it('Should work with provided options - findMany', () => {
    const query = { id: 1 };
    cy.findMany(query, {
      collection: 'collection',
    });
  });

  it('Should work with provided options - deleteOne', () => {
    const filter = { id: 1 };
    cy.deleteOne(filter, {
      collection: 'collection',
    });
  });

  it('Should work with provided options - deleteMany', () => {
    const filter = { id: 1 };
    cy.deleteMany(filter, {
      collection: 'collection',
    });
  });

  it('Should work with provided options - insertOne', () => {
    const document = { id: 1 };
    cy.insertOne(document, {
      collection: 'collection',
    });
  });

  it('Should work with provided options - insertMany', () => {
    const documents = [{ id: 1 }];
    cy.insertMany(documents, {
      collection: 'collection',
    });
  });
  it('Should work with provided options - drop', () => {
    cy.dropCollection('collection');
  });
});
