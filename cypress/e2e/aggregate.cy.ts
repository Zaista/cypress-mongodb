import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

const aggregation_data = {
  uri: 'mongodb://localhost:27017',
  collection: 'aggregation_collection',
  database: 'aggregation_database',
  pipeline: [
    { id: 1, aggregation: 'aggregation_result' },
    { id: 2 },
    { id: 3 },
  ],
};

describe(
  'Aggregation tests',
  {
    env: {
      mongodb: {
        uri: aggregation_data.uri,
        database: aggregation_data.database,
        collection: aggregation_data.collection,
      },
    },
  },
  () => {
    before(() => {
      cy.insertMany(aggregation_data.pipeline);
    });

    it('Should match all documents', () => {
      cy.aggregate([]).then((result: any) => {
        assert.notEqual(result, undefined);
        assert.isAtLeast(result.length, 3);
      });
    });

    it('Should match specific documents', () => {
      const pipeline = [{ $match: { id: 1 } }];
      cy.aggregate(pipeline).then((result: any) => {
        assert.notEqual(result[0], undefined);
        assert.strictEqual(result[0].aggregation, 'aggregation_result');
      });
    });

    it('Should return correct data types', () => {
      const document = {
        _id: new ObjectId(),
        string: faker.string.uuid(),
        date: new Date(),
        boolean: faker.datatype.boolean(),
        float: faker.number.float(),
      };
      cy.insertOne(document);
      const pipeline = [
        {
          $match: {
            $and: [
              {
                _id: {
                  $eq: document._id,
                },
              },
              {
                string: {
                  $eq: document.string,
                },
              },
              {
                date: {
                  $eq: document.date,
                },
              },
              {
                boolean: {
                  $eq: document.boolean,
                },
              },
              {
                float: {
                  $eq: document.float,
                },
              },
            ],
          },
        },
      ];
      cy.aggregate(pipeline).then((result: any) => {
        assert.strictEqual(result[0]._id.toString(), document._id.toString());
        assert.strictEqual(result[0].string, document.string);
        assert.strictEqual(
          result[0].date.toISOString(),
          document.date.toISOString(),
        );
        assert.strictEqual(result[0]._id._bsontype, 'ObjectID');
        assert.strictEqual(result[0].boolean, document.boolean);
        assert.strictEqual(result[0].float, document.float);
        assert.strictEqual(result.length, 1);
      });
    });

    it('Should fail aggregating - incorrect pipeline', () => {
      cy.on('fail', (error) => {
        if (
          error.message.includes('Pipeline must be a valid mongodb aggregation')
        )
          return;
        throw error;
      });
      const pipeline = { id: 2 };
      // @ts-ignore
      cy.aggregate(pipeline).then(() => {
        throw new Error('Should fail with pipeline must be an array error');
      });
    });

    it('Should fail aggregating - missing pipeline', () => {
      cy.on('fail', (error) => {
        if (error.message.includes('Pipeline must be specified')) return;
        throw error;
      });
      // @ts-ignore
      cy.aggregate().then(() => {
        throw new Error('Should fail with pipeline must be specified error');
      });
    });
  },
);
