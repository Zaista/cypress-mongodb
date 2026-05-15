import { faker } from '@faker-js/faker';

describe('Configuration: missing database tests', () => {
  it('Should fail with missing database name error - aggregate', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const pipeline = [{ $match: { id: 1 } }];
    cy.aggregate(pipeline, { database: null }).then((res) => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - create', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    cy.createCollection(faker.word.sample()).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - drop', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    cy.dropCollection('collection').then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - findOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const query = { id: 1 };
    cy.findOne(query, { database: undefined }).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - findMany', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const query = { id: 1 };
    cy.findMany(query).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - deleteOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const filter = { id: 1 };
    cy.deleteOne(filter).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - deleteMany', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const filter = { id: 1 };
    cy.deleteMany(filter).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - insertOne', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const document = { id: 1 };
    cy.insertOne(document).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });

  it('Should fail with missing database name error - insertMany', () => {
    cy.on('fail', (error) => {
      if (error.message.includes('Database not specified')) return;
      throw error;
    });
    const documents = [{ id: 1 }];
    cy.insertMany(documents).then(() => {
      throw new Error('Should fail with missing database name error');
    });
  });
});

describe('Missing configuration: database options', () => {
  it('Should work with provided options - create', () => {
    cy.createCollection(faker.word.sample(), {
      database: 'database',
    }).then((result) => {
      assert.equal('Collection created', result);
    });
  });
  it('Should work with provided options - aggregate', () => {
    const pipeline = [{ $match: { id: 1 } }];
    cy.aggregate(pipeline, {
      database: 'database',
    });
  });

  it('Should work with provided options - findOne', () => {
    const query = { id: 1 };
    cy.findOne(query, {
      database: 'database',
    });
  });

  it('Should work with provided options - findMany', () => {
    const query = { id: 1 };
    cy.findMany(query, {
      database: 'database',
    });
  });

  it('Should work with provided options - deleteOne', () => {
    const filter = { id: 1 };
    cy.deleteOne(filter, {
      database: 'database',
    });
  });

  it('Should work with provided options - deleteMany', () => {
    const filter = { id: 1 };
    cy.deleteMany(filter, {
      database: 'database',
    });
  });

  it('Should work with provided options - insertOne', () => {
    const document = { id: 1 };
    cy.insertOne(document, {
      database: 'database',
    });
  });

  it('Should work with provided options - insertMany', () => {
    const documents = [{ id: 1 }];
    cy.insertMany(documents, {
      database: 'database',
    });
  });
  it('Should work with provided options - drop', () => {
    cy.dropCollection('collection', {
      database: 'database',
    });
  });
});
