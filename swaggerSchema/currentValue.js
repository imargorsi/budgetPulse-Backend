module.exports = {
  type: 'object',
  required: ['fundId', 'current_value'],
  properties: {
    fundId: {
      type: 'integer',
      example: 1,
    },
    current_value: {
      type: 'number',
      example: 15000.5,
    },
  },
};
