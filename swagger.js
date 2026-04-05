const swaggerJSDoc = require('swagger-jsdoc');
const fundsSchema = require('./swaggerSchema/funds');
const investmentsSchema = require('./swaggerSchema/investments');
const currentValueSchema = require('./swaggerSchema/currentValue');

const userSchema = require('./swaggerSchema/user');
const loginSchema = require('./swaggerSchema/login');

const deployedServerUrl = process.env.BACKEND_URL || 'https://budgetpulse-backend.onrender.com';

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
        url: deployedServerUrl,
      },
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
    securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
      schemas: {
        Fund: fundsSchema,
        Investment: investmentsSchema,
        CurrentValue: currentValueSchema,
        User: userSchema,
        Login: loginSchema,
        },
    },
    tags: [
      {
        name: 'Funds',
        description: 'Funds management APIs',
      },
      {
        name: 'Investments',
        description: 'Investment management APIs',
      },
      {
        name: 'CurrentValues',
        description: 'Current value management APIs',
      },
      {
        name: 'Auth',
        description: 'Authentication APIs',
      },
    ],
  },

  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;