const http = require('http');
const { execSync } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                
                if (data.isInitializationError) {
                    console.error("\n=== INITIALIZATION ERROR ===");
                    console.error(`Error: ${data.error}`);
                    console.error(`File: ${data.filename}:${data.lineno}:${data.colno}`);
                    if (data.stack) console.error(`Stack: ${data.stack}`);
                    console.error("============================\n");
                    res.writeHead(200);
                    res.end('OK');
                    
                    const fs = require('fs');
                    fs.writeFileSync('scratch/results.json', JSON.stringify({
                        passed: 0,
                        failed: 0,
                        total: 0,
                        error: data.error,
                        results: []
                    }, null, 2));
                    
                    setTimeout(() => process.exit(1), 500);
                    return;
                }
                
                res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
                res.end('OK');
                
                const results = data;
                const fs = require('fs');
                fs.writeFileSync('scratch/results.json', JSON.stringify(results, null, 2));
                
                console.log(`\nTest Results: ${results.passed}/${results.total} passed, ${results.failed} failed`);
                
                if (results.failures && results.failures.length > 0) {
                    console.log("\n=== FAILURES ===");
                    results.failures.forEach(f => {
                        console.log(`\n  FAIL ${f.name}`);
                        console.log(`    Expected: ${f.expected}`);
                        console.log(`    Got:      ${f.got}`);
                    });
                }
                
                setTimeout(() => process.exit(results.failed > 0 ? 1 : 0), 500);
            } catch (e) {
                res.writeHead(400);
                res.end('Bad JSON');
            }
        });
    } else if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(9999, () => {
    console.log('Test result server listening on port 9999...');
});
