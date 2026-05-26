$templatePath = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\app_template.js"
$jsPagesPath = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\policy_pages_js.txt"

$template = Get-Content -Raw -Encoding UTF8 -Path $templatePath
$jsPages = Get-Content -Raw -Encoding UTF8 -Path $jsPagesPath

# Let's find the start and end of the POLICY_PAGES definition
# Since POLICY_PAGES is defined between:
# const POLICY_PAGES = [
# ...
# ];
# let currentPolicySpread = 0;

$regex = "(?s)const POLICY_PAGES = \[.*?\n\];"
if ($template -match $regex) {
    # Replace the matched section with the new array
    $newTemplate = [regex]::Replace($template, $regex, $jsPages)
    Set-Content -Path $templatePath -Value $newTemplate -Encoding UTF8
    Write-Output "Successfully updated app_template.js with 51 policy pages!"
} else {
    Write-Output "Could not find POLICY_PAGES array pattern in app_template.js"
}
