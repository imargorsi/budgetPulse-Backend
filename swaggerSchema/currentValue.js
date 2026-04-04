module.exports = {
  type: 'object',
  required: ['fundId', 'current_value', 'date'],
  properties: {
    fundId: {
      type: 'integer',
      example: 1,
    },
    current_value: {
      type: 'number',
      example: 15000.5,
    },
    date: {
      type: 'string',
      format: 'date',
      example: '2024-01-01',
    },
  },
};
