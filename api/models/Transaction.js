/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'transactions',
  attributes: {
    accountId: {
      model: 'account'
    },
    category: {
      type: 'string',
      required: true,
    },
    transactionType: {
      type: 'string',
      isIn: ['Debit', 'Credit'],
      required: true,
    },
    amount: {
      type: 'number',
      required: true,
    },
    source: {
      type: 'string',
      required: true,
    },
    datetime: {
      type: 'string',
      required: true,
    },
    paymentMethod: {
      type: 'string',
      required: true,
    },
    recipientName: {
      type: 'string',
      required: true,
    },
  }
};