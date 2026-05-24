# PowerShell Static File Web Server
# Serves the LifeInvader Ad Editor locally and opens it in the browser.

$port = 8080
$baseDir = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD"

# Ensure the listener prefix handles localhost
while ($true) {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    try {
        $listener.Start()
        break
    } catch {
        Write-Host "Port $port is in use, trying port $($port + 1)..." -ForegroundColor Yellow
        $port++
    }
}

Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "  Static Web Server Running on Localhost" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host "URL:          http://localhost:$port/" -ForegroundColor Cyan
Write-Host "Directory:    $baseDir" -ForegroundColor Cyan
Write-Host "Press Ctrl+C in the terminal to stop the server." -ForegroundColor White
Write-Host "==================================================`n" -ForegroundColor Green

# Open the site in the default browser
Start-Process "http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }

        # Resolve physical path
        $cleanedPath = $urlPath.Replace("/", "\").TrimStart("\")
        $localPath = Join-Path $baseDir $cleanedPath

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $mimeType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }

            $response.ContentType = $mimeType
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[200 OK] Served: $urlPath ($mimeType)" -ForegroundColor Gray
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            Write-Host "[404 Not Found] Request: $urlPath" -ForegroundColor Red
        }
        $response.Close()
    }
} catch {
    Write-Host "`nStopping server..." -ForegroundColor Yellow
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Green
}
