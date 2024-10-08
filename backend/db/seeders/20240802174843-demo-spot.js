'use strict';

const {Spot} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Cozy Apartment',
        description: 'A lovely cozy apartment in the heart of the city.',
        price: 150.00,
      },
      {
        ownerId: 2,
        address: '456 Elm St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Modern Condo',
        description: 'A modern condo with all amenities included.',
        price: 250.00,
      },
      {
        ownerId: 3,
        address: '789 Oak St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Luxury Villa',
        description: 'A luxurious villa with a beautiful view.',
        price: 500.00,
      },
      {
        ownerId: 1,
        address: '222 Cherry St',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.7157,
        lng: -117.1611,
        name: 'Seaside Apartment',
        description: 'A cozy apartment with a beautiful seaside view.',
        price: 175.00,
      },
      {
        ownerId: 2,
        address: '333 Walnut St',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        lat: 42.3601,
        lng: -71.0589,
        name: 'Historic Brownstone',
        description: 'A historic brownstone in a charming neighborhood.',
        price: 275.00,
      },
      {
        ownerId: 3,
        address: '444 Cedar St',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 47.6062,
        lng: -122.3321,
        name: 'Modern Penthouse',
        description: 'A sleek penthouse with panoramic city views.',
        price: 450.00,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     *
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Luxury Villa', 'Modern Condo', 'Cozy Apartment']}
    }, {})
  }
};
