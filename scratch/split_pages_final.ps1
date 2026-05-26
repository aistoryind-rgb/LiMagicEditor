$text = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\clean_policy_text.txt"
$text = $text.Replace("`r`n", "`n")

# Split text into paragraphs (lines separated by one or more empty lines)
$paragraphs = $text -split "\n{2,}"

$titles = @(
    "Internal Policy Overview",
    "Buying & Selling Formats",
    "Dating & Party Examples",
    "Restricted Content Guidelines",
    "Banned Content & Locations",
    "Common Rejection Reasons",
    "Categories & Real Estate",
    "Business Categories",
    "Dating & Services Categories",
    "General Ad Editing Rules",
    "Abbreviations & Configs",
    "Ad Examples - Part 1",
    "Ad Examples - Part 2",
    "Real Estate Rules",
    "Real Estate Order of Features",
    "Real Estate Examples",
    "Property Rental Rules",
    "Apartment Complexes",
    "Dating Category Rules",
    "Dating Ad Verification",
    "Banned Dating Content",
    "Work Category Rules",
    "Construction Sites",
    "Construction Site Bonuses",
    "Construction Site Roles",
    "Work Category Professions",
    "Work Category Examples",
    "Business Names & Categories",
    "Business Trading Rules",
    "Business Ad Examples",
    "Business Shares",
    "Services Category",
    "Office Template Examples",
    "Discounts Category",
    "Other Category Items",
    "Party Locations",
    "Other Services & Dice Bet",
    "Alliance & Business Owners",
    "Other Category Replacements",
    "Automatic Tools & Inventories",
    "Pets, Canisters & Chargers",
    "Christmas & New Year Gifts",
    "Drawings & Statues",
    "Clothing Features & Order",
    "Containers & Dice",
    "Fish & Fishing Rods",
    "Fruits, Vegetables & Fireworks",
    "Juices, SIM Cards & Solar Panels",
    "Tuning Parts & Shoulder Pets",
    "Caged Pets Rules",
    "Editors & Credits"
)

# Target pages count is 51
$targetPagesCount = 51

# Force split by paragraph distribution:
$pages = @()
$paragraphsPerPage = [Math]::Floor($paragraphs.Count / $targetPagesCount)
$extra = $paragraphs.Count % $targetPagesCount

$pIdx = 0
for ($i = 0; $i -lt $targetPagesCount; $i++) {
    $count = $paragraphsPerPage
    if ($i -lt $extra) { $count++ }
    $pageParagraphs = @()
    for ($j = 0; $j -lt $count; $j++) {
        $pageParagraphs += $paragraphs[$pIdx]
        $pIdx++
    }
    $pages += ,$pageParagraphs
}

$jsPages = @()
for ($i = 0; $i -lt $pages.Count; $i++) {
    $pageParagraphs = $pages[$i]
    $htmlContent = ""
    foreach ($p in $pageParagraphs) {
        $lines = $p -split "\n"
        $inList = $false
        $listHtml = ""
        
        foreach ($line in $lines) {
            $lineTrim = $line.Trim()
            if ($lineTrim.Length -eq 0) { continue }
            
            # Check if line is a bullet point
            if ($lineTrim -like "* *" -and ($lineTrim.StartsWith("*") -or $lineTrim.StartsWith("-") -or $lineTrim.StartsWith("●"))) {
                if (-not $inList) {
                    $inList = $true
                    $listHtml = "<ul class=`"policy-list-bullets`">"
                }
                $itemText = $lineTrim -replace "^[\*\-●]\s*", ""
                $listHtml += "<li>$itemText</li>"
            } else {
                if ($inList) {
                    $inList = $false
                    $listHtml += "</ul>"
                    $htmlContent += $listHtml
                }
                
                # Check if it looks like a heading
                if ($lineTrim.EndsWith(":") -or $lineTrim.StartsWith("Looking/") -or $lineTrim.StartsWith("Illegal Items") -or $lineTrim.StartsWith("Things We Cannot") -or $lineTrim.StartsWith("Places We Do Not") -or $lineTrim.StartsWith("Rejection Reasons") -or $lineTrim.StartsWith("Common Rejection") -or $lineTrim.StartsWith("Categories") -or $lineTrim.StartsWith("Real Estate") -or $lineTrim.StartsWith("Auto:") -or $lineTrim.StartsWith("Business:") -or $lineTrim.StartsWith("Services:") -or $lineTrim.StartsWith("Discounts:") -or $lineTrim.StartsWith("Work:") -or $lineTrim.StartsWith("Dating:") -or $lineTrim.StartsWith("Other:") -or $lineTrim.StartsWith("Terms to change:") -or $lineTrim.StartsWith("Things to take note")) {
                    # If it's a heading
                    $htmlContent += "<h4 class=`"policy-subtitle`">$lineTrim</h4>"
                } else {
                    $htmlContent += "<p>$lineTrim</p>"
                }
            }
        }
        if ($inList) {
            $listHtml += "</ul>"
            $htmlContent += $listHtml
        }
    }
    
    $jsPages += @{
        title = $titles[$i]
        content = "<div class=`"policy-section`">$htmlContent</div>"
    }
}

# Convert $jsPages to Javascript array representation
$jsArrayText = "const POLICY_PAGES = [`n"
for ($i = 0; $i -lt $jsPages.Count; $i++) {
    $p = $jsPages[$i]
    $tEscaped = $p.title.Replace("\", "\\").Replace("`"", "\`"").Replace("`'", "\`'")
    $cEscaped = $p.content.Replace("\", "\\").Replace("`"", "\`"").Replace("`'", "\`'").Replace("`n", "\n")
    # Replace any multiple spaces or tabs
    $cEscaped = [regex]::Replace($cEscaped, "\s+", " ")
    $jsArrayText += "    {`n        title: `"$tEscaped`",`n        content: `"$cEscaped`"`n    }"
    if ($i -lt $jsPages.Count - 1) {
        $jsArrayText += ",`n"
    } else {
        $jsArrayText += "`n"
    }
}
$jsArrayText += "];"

Set-Content -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\policy_pages_js.txt" -Value $jsArrayText -Encoding UTF8
Write-Output "Successfully wrote 51 pages to scratch/policy_pages_js.txt"
