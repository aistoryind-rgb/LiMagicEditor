# Headless Chrome test runner
$baseDir = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tempDir = Join-Path $baseDir "scratch\chrome_test"

# Cleanup
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Create a modified test page that writes results to a file via console
$testContent = Get-Content -Raw -Encoding UTF8 (Join-Path $baseDir "test.html")

# Run Chrome headless with the test page
# Chrome headless can print console output and dump DOM
$serverUrl = "http://localhost:8080/test.html"

# Use Chrome headless with --dump-dom to get the page output
$chromeArgs = @(
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-extensions",
    "--disable-software-rasterizer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=10000",
    "--dump-dom",
    $serverUrl
)

Write-Host "Running tests in headless Chrome..."
$output = & $chrome @chromeArgs 2>$null

# The output will contain the test.html DOM with results in the <pre> tag
if ($output -match '"total":\s*(\d+)') {
    # Extract the JSON from the <pre> tag
    $combined = $output -join "`n"
    if ($combined -match '(?s)<pre[^>]*>(.*?)</pre>') {
        $jsonText = $matches[1].Trim()
        $parsed = $jsonText | ConvertFrom-Json
        
        Write-Host "`nTest Results: $($parsed.passed)/$($parsed.total) passed, $($parsed.failed) failed"
        
        if ($parsed.failed -gt 0) {
            Write-Host "`n=== FAILURES ==="
            foreach ($r in $parsed.results) {
                if (-not $r.passed) {
                    Write-Host "`n  FAIL: $($r.name)"
                    Write-Host "    Expected: $($r.expected)"
                    Write-Host "    Got:      $($r.got)"
                }
            }
        } else {
            Write-Host "`nAll tests passed!"
        }
        
        # Save results
        $jsonText | Out-File -FilePath (Join-Path $baseDir "scratch\results.json") -Encoding UTF8
        Write-Host "Results saved to scratch\results.json"
    } else {
        Write-Host "Could not parse test output from DOM"
        Write-Host $combined.Substring(0, [Math]::Min(1000, $combined.Length))
    }
} else {
    $combined = $output -join "`n"
    Write-Host "No test results found in output."
    Write-Host "Output length: $($combined.Length)"
    if ($combined.Length -gt 0) {
        Write-Host $combined.Substring(0, [Math]::Min(2000, $combined.Length))
    }
}

# Cleanup
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue }
