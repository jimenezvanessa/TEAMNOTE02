const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../auth');
const User = require('../../models/User');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes - Response Format', () => {
  
  test('POST /api/auth/register should return token and user object', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'member',
      });

    // Verify response structure matches frontend expectations
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    
    const { user } = response.body;
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('role');
    
    // Verify values
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('member');
    
    // Token should be a valid JWT string
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.split('.').length).toBe(3); // JWT has 3 parts
  });

  test('POST /api/auth/login should return correct user object', async () => {
    // Create a user first
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Login Test',
        email: 'login@test.com',
        password: 'password123',
        role: 'leader',
      });

    // Login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@test.com',
        password: 'password123',
      });

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    
    const { user } = response.body;
    expect(user.email).toBe('login@test.com');
    expect(user.role).toBe('leader');
    expect(user).not.toHaveProperty('password'); // Password should never be returned
  });

  test('User response should NOT include password field', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'No Password User',
        email: 'nopass@test.com',
        password: 'secret123',
        role: 'member',
      });

    expect(response.body.user).not.toHaveProperty('password');
  });

  test('Login should fail with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@test.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body).toHaveProperty('error');
  });
});
