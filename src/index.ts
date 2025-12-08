import * as aggregate_util from './utils/aggregation';
import * as collection_util from './utils/collection';
import * as insert_util from './utils/insert';
import * as delete_util from './utils/delete';
import * as find_util from './utils/find';
import * as update_util from './utils/update';
import * as command_util from './utils/command';
import webpackPreprocessor from '@cypress/webpack-batteries-included-preprocessor';

function getWebpackOptions() {
  const options = webpackPreprocessor.getFullWebpackOptions();
  options.resolve.fallback.crypto = require.resolve('crypto-browserify');
  options.resolve.fallback.util = require.resolve('util');
  options.resolve.fallback.zlib = require.resolve('browserify-zlib');
  return options;
}

export function configurePlugin(on: Cypress.PluginEvents) {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      typescript: 'typescript',
      webpackOptions: getWebpackOptions(),
    }),
  );
  on('task', {
    async aggregate(args) {
      return await aggregate_util.aggregate(args);
    },

    async createCollection(args) {
      return await collection_util.createCollection(args);
    },

    async dropCollection(args) {
      return await collection_util.dropCollection(args);
    },

    async insertOne(args) {
      return await insert_util.insertOne(args);
    },

    async insertMany(args) {
      return await insert_util.insertMany(args);
    },

    async deleteOne(args) {
      return await delete_util.deleteOne(args);
    },

    async deleteMany(args) {
      return await delete_util.deleteMany(args);
    },

    async findOne(args) {
      return await find_util.findOne(args);
    },

    async findOneAndUpdate(args) {
      return await find_util.findOneAndUpdate(args);
    },

    async findOneAndDelete(args) {
      return await find_util.findOneAndDelete(args);
    },

    async findMany(args) {
      return await find_util.findMany(args);
    },

    async updateOne(args) {
      return await update_util.updateOne(args);
    },

    async updateMany(args) {
      return await update_util.updateMany(args);
    },

    async runCommand(args) {
      return await command_util.runCommand(args);
    },
  });
}
