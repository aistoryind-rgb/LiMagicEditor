# Raw TCP Web Server in PowerShell
$port = 8080
$address = [System.Net.IPAddress]::Loopback
$listener = $null
$started = $false

# Loop to find a free TCP port
while (-not $started -and $port -lt 8200) {
    try {
        $listener = New-Object System.Net.Sockets.TcpListener($address, $port)
        $listener.Start()
        $started = $true
    } catch {
        $port++
    }
}

if (-not $started) {
    Write-Error "Could not start TCP listener on any port."
    exit 1
}

Write-Host "TCP Web Server successfully listening on http://127.0.0.1:$port/"
Write-Host "Press Ctrl+C in this terminal to stop the server."

$buffer = New-Object Byte[] 4096

try {
    while ($listener.Active -or $true) {
        try {
            $client = $listener.AcceptTcpClient()
        } catch {
            break
        }
        
        $stream = $client.GetStream()
        
        # Read the request
        $readCount = $stream.Read($buffer, 0, $buffer.Length)
        if ($readCount -gt 0) {
            $requestStr = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $readCount)
            $requestLines = $requestStr -split "`r`n"
            if ($requestLines.Length -gt 0) {
                $firstLine = $requestLines[0]
                
                # Format: "GET /path HTTP/1.1"
                $parts = $firstLine -split " "
                if ($parts.Length -ge 2) {
                    $urlPath = $parts[1]
                    
                    # Strip query strings/cache busters
                    if ($urlPath.Contains("?")) {
                        $urlPath = $urlPath.Substring(0, $urlPath.IndexOf("?"))
                    }
                    if ($urlPath -eq "/") {
                        $urlPath = "/index.html"
                    }
                    
                    $cleanPath = $urlPath.TrimStart('/')
                    $filePath = Join-Path (Get-Location) $cleanPath
                    
                    if (Test-Path $filePath -PathType Leaf) {
                        try {
                            $bytes = [System.IO.File]::ReadAllBytes($filePath)
                            
                            # Content Type
                            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                            $contentType = "text/plain"
                            if ($ext -eq ".html" -or $ext -eq ".htm") { $contentType = "text/html; charset=utf-8" }
                            elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
                            elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
                            elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
                            elseif ($ext -eq ".png") { $contentType = "image/png" }
                            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
                            elseif ($ext -eq ".json") { $contentType = "application/json; charset=utf-8" }
                            
                            $header = "HTTP/1.1 200 OK`r`n" +
                                      "Content-Type: $contentType`r`n" +
                                      "Content-Length: $($bytes.Length)`r`n" +
                                      "Connection: close`r`n`r`n"
                            
                            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                            $stream.Write($headerBytes, 0, $headerBytes.Length)
                            $stream.Write($bytes, 0, $bytes.Length)
                        } catch {
                            $msg = "500 Internal Error"
                            $bytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
                            $header = "HTTP/1.1 500 Internal Error`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
                            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                            $stream.Write($headerBytes, 0, $headerBytes.Length)
                            $stream.Write($bytes, 0, $bytes.Length)
                        }
                    } else {
                        $msg = "404 Not Found"
                        $bytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
                        $header = "HTTP/1.1 404 Not Found`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($bytes, 0, $bytes.Length)
                    }
                }
            }
        }
        try {
            $client.Close()
        } catch {}
    }
} catch {
    Write-Error "TCP Server failed: $_"
} finally {
    if ($listener) {
        $listener.Stop()
        Write-Host "Server stopped."
    }
}
