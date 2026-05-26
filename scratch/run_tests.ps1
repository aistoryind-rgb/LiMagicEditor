$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:9999/")
$listener.Start()

Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--headless=new", "--disable-gpu", "--no-sandbox", "file:///C:/Users/Max/Documents/Anti_Gravity_02/AI%20BUILD/test.html"

$body = $null
while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    
    if ($request.HttpMethod -eq "POST") {
        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        $reader.Close()
        
        $response = $context.Response
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.StatusCode = 200
        $response.Close()
        break
    } else {
        # Handle CORS OPTIONS preflight
        $response = $context.Response
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $response.StatusCode = 200
        $response.Close()
    }
}

$listener.Stop()

$scratchDir = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch"
if (!(Test-Path $scratchDir)) {
    New-Item -ItemType Directory -Force -Path $scratchDir | Out-Null
}

Set-Content -Path (Join-Path $scratchDir "results.json") -Value $body -Encoding UTF8
Write-Output "Results written successfully to scratch/results.json"
