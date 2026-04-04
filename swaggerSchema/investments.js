module.exports = {
  type: 'object',
  required: ['fundId', 'amount', 'date'],
  properties: {
    fundId: {
      type: 'integer',
      example: 1,
    },
    amount: {
      type: 'number',
      example: 10000,
    },
    date: {
      type: 'string',
      format: 'date',
      example: '2024-01-01',
    },
  },
};
