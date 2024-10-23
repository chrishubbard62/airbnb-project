'use strict';

const { addHours } = require('date-fns')

const {Booking} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
  {
    spotId: 1,
    userId: 3,
    startDate: addHours(new Date('2024-10-01'), 14),
    endDate: addHours(new Date('2024-10-05'), 14)
  },
  {
    spotId: 2,
    userId: 1,
    startDate: addHours(new Date('2024-11-20'), 14),
    endDate: addHours(new Date('2024-11-26'), 14)
  },
  {
    spotId: 3,
    userId: 2,
    startDate: addHours(new Date('2024-11-15'), 14),
    endDate: addHours(new Date('2024-11-19'), 14)
  },
  {
    spotId: 2,
    userId: 1,
    startDate: addHours(new Date('2024-11-11'), 14),
    endDate: addHours(new Date('2024-11-16'), 14)
  },
  {
    spotId: 2,
    userId: 1,
    startDate: addHours(new Date('2025-11-02'), 14),
    endDate: addHours(new Date('2025-11-07'), 14)
  },
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
