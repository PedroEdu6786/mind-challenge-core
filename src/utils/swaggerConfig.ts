import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions: any = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mind challenge',
      version: '1.0.0',
      description: 'Describing a RESTful API with Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.routes.ts'],
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions)
