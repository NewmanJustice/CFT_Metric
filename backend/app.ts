import * as express from 'express';
import * as cors from 'cors';
import type { Request, Response } from 'express';
import { generateMetrics } from '../src/utils/metricsGenerator';
import rateLimit from 'express-rate-limit';
import Joi from 'joi';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = (express as any).default ? (express as any).default() : (express as any)();

app.use((cors as any).default ? (cors as any).default() : (cors as any)());
app.use(app.json ? app.json() : (express as any).json());

// Rate limiting: 30 requests per minute per IP
app.use('/api/generate', rateLimit({ windowMs: 60 * 1000, max: 30 }));

// Validation schema
const generateSchema = Joi.object({
  metrics: Joi.array().items(Joi.string().valid('dora', 'space')).min(1).required(),
  count: Joi.number().integer().min(1).max(100).required(),
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).required(),
  teams: Joi.array().items(Joi.string()).min(1).required()
});

app.post('/api/generate', (req: Request, res: Response) => {
  const { error } = generateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { metrics, count, month, teams } = req.body;
  let data: any = {};
  if (metrics.includes('dora')) {
    data.dora = generateMetrics('dora', count, month, teams);
  }
  if (metrics.includes('space')) {
    data.space = generateMetrics('space', count, month, teams);
  }
  res.json(data);
});

/**
 * @openapi
 * /api/generate:
 *   post:
 *     summary: Generate DORA and/or SPACE metrics dummy data
 *     description: Generates dummy DORA and/or SPACE metrics for selected teams and month.
 *     tags:
 *       - Metrics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - metrics
 *               - count
 *               - month
 *               - teams
 *             properties:
 *               metrics:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [dora, space]
 *                 description: Metrics to generate (DORA, SPACE, or both)
 *               count:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 description: Number of records to generate
 *               month:
 *                 type: string
 *                 pattern: ^\\d{4}-\\d{2}$
 *                 description: Month in YYYY-MM format
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of team names
 *     responses:
 *       200:
 *         description: Generated metrics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dora:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DoraMetric'
 *                 space:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SpaceMetric'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DORA/SPACE Metrics API',
      version: '1.0.0',
      description: 'API for generating DORA and SPACE metrics.'
    }
  },
  apis: ['./backend/app.ts']
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
