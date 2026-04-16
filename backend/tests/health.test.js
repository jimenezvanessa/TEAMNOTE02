const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../server');

let server;
let port;

function request(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: '127.0.0.1',
        port,
        path,
        method,
        headers: {
          Accept: 'application/json',
        },
      },
      res => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => {
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );

    req.on('error', reject);
    req.end();
  });
}

test.before(async () => {
  server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  port = server.address().port;
});

test.after(async () => {
  await new Promise(resolve => server.close(resolve));
});

test('GET /api/health returns OK payload', async () => {
  const response = await request('/api/health');
  assert.equal(response.statusCode, 200);

  const parsed = JSON.parse(response.body);
  assert.equal(parsed.status, 'OK');
  assert.equal(typeof parsed.timestamp, 'string');
});

test('unknown route returns 404', async () => {
  const response = await request('/this-route-does-not-exist');
  assert.equal(response.statusCode, 404);
});
