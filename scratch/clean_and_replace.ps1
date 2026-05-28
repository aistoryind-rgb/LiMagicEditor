$appJsPath = "app.js"
$extractedPath = "scratch/extracted_policy.txt"
$cleanupsPath = "scratch/cleanups.json"

Write-Host "Reading files..."
$policyText = [System.IO.File]::ReadAllText($extractedPath, [System.Text.Encoding]::UTF8)
$appJsText = [System.IO.File]::ReadAllText($appJsPath, [System.Text.Encoding]::UTF8)
$cleanupsJson = [System.IO.File]::ReadAllText($cleanupsPath, [System.Text.Encoding]::UTF8)

$cleanups = ConvertFrom-Json $cleanupsJson

Write-Host "Cleaning policy text..."
foreach ($c in $cleanups) {
    $policyText = $policyText.Replace($c.find, $c.replace)
}

# Find index of const POLICY_PAGES = [
$startIndex = $appJsText.IndexOf("const POLICY_PAGES = [")
if ($startIndex -eq -1) {
    Write-Error "Could not find POLICY_PAGES start"
    exit 1
}

$spreadIndex = $appJsText.IndexOf("let currentPolicySpread = 0;")
if ($spreadIndex -eq -1) {
    Write-Error "Could not find currentPolicySpread"
    exit 1
}

# Find closing ]; before currentPolicySpread
$closingIndex = $appJsText.LastIndexOf("];", $spreadIndex)
if ($closingIndex -eq -1 -or $closingIndex -lt $startIndex) {
    Write-Error "Could not find closing ];"
    exit 1
}

$endIndex = $closingIndex + 2

Write-Host "Replacing POLICY_PAGES..."
$updatedAppJs = $appJsText.Substring(0, $startIndex) + $policyText + $appJsText.Substring($endIndex)

[System.IO.File]::WriteAllText($appJsPath, $updatedAppJs, [System.Text.Encoding]::UTF8)
Write-Host "Successfully updated app.js!"
