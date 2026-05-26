$pdfPath = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\doc.pdf"
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Let's search for count tags
$matches = [regex]::Matches($text, "/Count\s+(\d+)")
foreach ($m in $matches) {
    Write-Output "Count match: $($m.Value)"
}

# Let's also look at how many pages it has by searching for /Page objects
$pageMatches = [regex]::Matches($text, "/Type\s*/Page\b")
Write-Output "Total /Page objects: $($pageMatches.Count)"
