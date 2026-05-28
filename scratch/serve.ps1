# Simple PowerShell HTTP Server with 127.0.0.1 binding
$port = 8080
$listener = New-Object System.Net.HttpListener
$started = $false

# Loop to find an available port
while (-not $started -and $port -lt 8200) {
    try {
        $listener.Prefixes.Clear()
        $listener.Prefixes.Add("http://127.0.0.1:$port/")
        $listener.Start()
        $started = $true
    } catch {
        $port++
    }
}

if (-not $started) {
    Write-Error "Could not find an available port to start the server."
    exit 1
}

# Set up clean termination
$script:running = $true

Write-Host "Server successfully listening on http://127.0.0.1:$port/"
Write-Host "Press Ctrl+C in the terminal to stop the server."

try {
    while ($listener.IsListening -and $script:running) {
        try {
            $context = $listener.GetContext()
        } catch {
            break
        }
        
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }
        
        # Strip leading slash and join with current location
        $cleanPath = $urlPath.TrimStart('/')
        $filePath = Join-Path (Get-Location) $cleanPath
        
        if (Test-Path $filePath -PathType Leaf) {
            try {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                # Determine Content-Type header
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = "text/plain"
                if ($ext -eq ".html" -or $ext -eq ".htm") { $contentType = "text/html; charset=utf-8" }
                elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
                elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
                elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
                elseif ($ext -eq ".png") { $contentType = "image/png" }
                elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
                elseif ($ext -eq ".json") { $contentType = "application/json; charset=utf-8" }
                
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
                $response.StatusDescription = "Internal Server Error"
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("Error reading file: $_")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $response.StatusDescription = "Not Found"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found: $urlPath")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        
        try {
            $response.Close()
        } catch {}
    }
} catch {
    Write-Error "Failed to run server: $_"
} finally {
    if ($listener) {
        $listener.Stop()
        $listener.Close()
        Write-Host "Server stopped."
    }
}
