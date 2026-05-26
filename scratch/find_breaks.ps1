$html = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\doc.html"
Write-Output "HTML length: $($html.Length)"

# Let's search for tags or styles that might indicate pagination
$matches = [regex]::Matches($html, "page-break")
Write-Output "page-break matches: $($matches.Count)"

$hrMatches = [regex]::Matches($html, "<hr")
Write-Output "hr matches: $($hrMatches.Count)"

$divMatches = [regex]::Matches($html, "<div")
Write-Output "div matches: $($divMatches.Count)"

# Let's inspect style block
if ($html -match "<style[^>]*>(.*?)</style>") {
    $styleContent = $Matches[1]
    Write-Output "Style length: $($styleContent.Length)"
    # Write style content to a temp file to read
    Set-Content -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\style_temp.css" -Value $styleContent -Encoding UTF8
}
