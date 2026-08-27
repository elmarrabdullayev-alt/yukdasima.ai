const http = require('http');

// Valid small PNG base64
const samplePngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function testApi(imageCount) {
  const start = Date.now();
  const images = [];
  for (let i = 0; i < imageCount; i++) {
    images.push({
      base64: samplePngBase64,
      mimeType: 'image/png'
    });
  }

  const postData = JSON.stringify({ images, details: '1 ədəd divan və 1 stol' });

  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path: '/api/analyze-cargo',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 50000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          duration: Date.now() - start,
          body: data
        });
      });
    });

    req.on('error', (e) => {
      resolve({
        statusCode: 0,
        duration: Date.now() - start,
        error: e.message
      });
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('=== TEST 1 IMAGE ===');
  const res1 = await testApi(1);
  console.log('RES_1_STATUS=' + res1.statusCode);
  console.log('RES_1_TIME=' + res1.duration + 'ms');
  console.log('RES_1_BODY=' + res1.body);

  console.log('=== TEST 3 IMAGES ===');
  const res3 = await testApi(3);
  console.log('RES_3_STATUS=' + res3.statusCode);
  console.log('RES_3_TIME=' + res3.duration + 'ms');
  console.log('RES_3_BODY=' + res3.body);
}

run();
