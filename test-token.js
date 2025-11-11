// Test script to verify token generation
const http = require('http');

// Create a mock user context
const testUser = {
  id: 'test-user-123',
  email: 'demo@verizon.com',
  name: 'Demo User'
};

// Make a request to generate token
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/generate-auth-token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    
    // Try to parse the response
    try {
      const parsed = JSON.parse(data);
      console.log('\nParsed Response:');
      console.log('- Token generated:', !!parsed.token);
      console.log('- Token length:', parsed.token ? parsed.token.length : 0);
      console.log('- Expires at:', parsed.expiresAt);
    } catch (e) {
      console.log('Could not parse response as JSON');
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
