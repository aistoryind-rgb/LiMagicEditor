$html = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\doc.html"
$styleBlock = ""
if ($html -match "<style[^>]*>(.*?)</style>") {
    $styleBlock = $Matches[1]
}

# Find CSS classes that have page-break
$classes = @()
$lines = $styleBlock -split "\n"
foreach ($line in $lines) {
    if ($line -match "(\.[a-zA-Z0-9_-]+)\s*\{[^}]*page-break[^}]*\}") {
        Write-Output "Class match: $($m = $Matches[1]; $line)"
        $classes += $m.TrimStart(".")
    }
}

# If classes are found, search for their usages in the HTML
foreach ($c in $classes) {
    # Count occurrences
    $occurrences = [regex]::Matches($html, "class=\`"$c\`"").Count
    Write-Output "Class $c occurrences in HTML: $occurrences"
}
