/// <reference types="jest" />
import request from 'supertest';
import express, { Express } from 'express';
import * as backend from '../index';

describe('Backend API Tests', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.get('/tasks', backend.doGetTask);

    jest.mock('@google-cloud/firestore', () => ({
      firestore: () => ({
        collection: () => ({
          get: jest.fn().mockResolvedValueOnce({
            docs: [{
              id: '1',
              data: () => ({
                title: 'Task 1',
                column: 'to-start',
                type: 'Type 1',
                created_at: '2023-01-01T00:00:00.000Z',
                priority: 1,
              }),
            }],
          }),
        }),
      }),
    }));
  });

  test('GET /tasks', async () => {
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      tasks: [
        {
          id: '1',
          data: {
            title: 'Task 1',
            column: 'to-start',
            type: 'Type 1',
            created_at: '2023-01-01T00:00:00.000Z',
            priority: 1,
          },
        },
      ],
      now: expect.any(String),
    });
  });
});
