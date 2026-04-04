const swaggerJSDoc = require('swagger-jsdoc');
const currentValue = require('./models/definations/currentValue');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BudgetPulse API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  components: {
      schemas: {
        Fund: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { 
              type: 'string',
              example: 'Equity Fund',
            },
            description: {
              type: 'string',
              example: 'Long term investment fund'
            },
          }
        },
        Investment: {
          type: 'object',
          required: ['fundId', 'amount', 'date', "name"],
            properties: {
              fundId: {
                type: 'integer',
                example: 1
              },
              name: {
                type: 'string',
                example: 'Investment in Equity Fund'
              },
              amount: {
                type: 'number',
                example: 10000
              },
                date: {
                type: 'string',
                format: 'date',
                example: '2024-01-01'
                },
            }
          },
        CurrentValue: {
          type: 'object',
          required: ['fundId', 'current_value', 'date'],
          properties: {
            fundId: {
                type: 'integer',
                example: 1
              },
           current_value: {
                type: 'float',
                example: '15000.50'
              },
                date: {
                type: 'string',
                format: 'date',
                example: '2024-01-01'
                },
          }
            }

        },
    },
    tags: [
      {
        name: 'Funds',
        description: 'Funds management APIs',
      },
    ],
    tags: [
      {
        name: 'Investments',
        description: 'Investment management APIs',
      },
    ],
    currentValue: [
        {
            name: 'CurrentValue',
            description: 'Current value management APIs',
        }
    ]
  },

  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;