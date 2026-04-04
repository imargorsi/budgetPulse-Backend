module.exports = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      example: 'Equity Fund',
    },
    description: {
      type: 'string',
      example: 'Long term investment fund',
    },
  },
};