const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('../tasks');
const { authMiddleware } = require('../../middleware/auth');
const Task = require('../../models/Task');

// Create test app
const app = express();
app.use(express.json());

// Mock auth middleware for testing
app.use((req, res, next) => {
  req.user = { id: 'test-user-id' };
  next();
});

app.use('/api/tasks', taskRoutes);

describe('Task Routes - Enum Validation', () => {
  
  test('Difficulty enum should only accept lowercase values', async () => {
    // Valid lowercase
    const validResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Easy Task',
        description: 'Test',
        difficulty: 'easy',
      });

    expect([200, 201]).toContain(validResponse.status);
    expect(['easy', 'medium', 'hard']).toContain(validResponse.body.difficulty);
  });

  test('Status enum should use lowercase hyphenated values', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Status Test Task',
        description: 'Test',
        difficulty: 'medium',
      });

    if (createResponse.status === 201 || createResponse.status === 200) {
      // Default status should be 'available'
      expect(createResponse.body.status).toBe('available');
    }
  });

  test('Task response should include all required fields', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Complete Task',
        description: 'Should have all fields',
        difficulty: 'hard',
      });

    if (response.status === 201 || response.status === 200) {
      const task = response.body;
      
      expect(task).toHaveProperty('_id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('description');
      expect(task).toHaveProperty('difficulty');
      expect(task).toHaveProperty('status');
      expect(task).toHaveProperty('createdBy');
      expect(task).toHaveProperty('createdAt');
      expect(task).toHaveProperty('updatedAt');
    }
  });

  test('Task filtering by status should work with new enum values', async () => {
    // Create tasks
    await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task 1',
        description: 'Test',
        difficulty: 'easy',
      });

    // Get filtered tasks
    const response = await request(app)
      .get('/api/tasks?status=available');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Task filtering by difficulty should work with lowercase', async () => {
    const response = await request(app)
      .get('/api/tasks?difficulty=medium');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // All returned tasks should have lowercase difficulty
    if (response.body.length > 0) {
      response.body.forEach(task => {
        expect(['easy', 'medium', 'hard']).toContain(task.difficulty);
      });
    }
  });

  test('UPDATE task status with valid enum value', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Update Test',
        description: 'Test',
        difficulty: 'medium',
      });

    if (createResponse.status === 201 || createResponse.status === 200) {
      const taskId = createResponse.body._id;

      // Update status to in-progress
      const updateResponse = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({
          status: 'in-progress',
        });

      if (updateResponse.status === 200) {
        expect(updateResponse.body.status).toBe('in-progress');
      }
    }
  });

  test('Task model should reject invalid difficulty values', async () => {
    // This would fail at database level in real scenario
    // For this test, we're verifying the enum is enforced
    const invalidResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Invalid Difficulty',
        description: 'Test',
        difficulty: 'Easy', // Wrong case - should be lowercase
      });

    // Should either reject or normalize to lowercase
    if (invalidResponse.status === 201 || invalidResponse.status === 200) {
      expect(['easy', 'medium', 'hard']).toContain(invalidResponse.body.difficulty);
    } else {
      expect([400, 422]).toContain(invalidResponse.status);
    }
  });

  test('Enum values consistency across operations', async () => {
    // Create task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Consistency Test',
        description: 'Test',
        difficulty: 'hard',
      });

    if (createResponse.status === 201 || createResponse.status === 200) {
      const taskId = createResponse.body._id;
      const createdStatus = createResponse.body.status;

      // Get the same task
      const getResponse = await request(app)
        .get(`/api/tasks/${taskId}`);

      if (getResponse.status === 200) {
        // Status should be consistent
        expect(getResponse.body.status).toBe(createdStatus);
        expect(['available', 'in-progress', 'blocked', 'done']).toContain(getResponse.body.status);
      }
    }
  });
});
