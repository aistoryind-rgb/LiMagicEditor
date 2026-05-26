$content = Get-Content -Raw -Encoding UTF8 -Path "C:\Users\Max\.gemini\antigravity\brain\7efcc824-b053-4fca-8dab-9cae3ea02c0d\.system_generated\steps\10876\content.md"
# The fetched file has metadata headers like:
# Title: Live Content
# ...
# ---
# and then the content. Let's find the content.
$cleanText = ""
$idx = $content.IndexOf("---")
if ($idx -ne -1) {
    $cleanText = $content.Substring($idx + 3).Trim()
} else {
    $cleanText = $content.Trim()
}

# Remove any leading UTF8 BOM or garbage
if ($cleanText.StartsWith("`u{feff}")) {
    $cleanText = $cleanText.Substring(1)
}

$cleanText = $cleanText.Trim()
Set-Content -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\clean_policy_text.txt" -Value $cleanText -Encoding UTF8
Write-Output "Cleaned text length: $($cleanText.Length) characters"
