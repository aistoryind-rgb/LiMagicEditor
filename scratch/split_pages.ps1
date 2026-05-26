$text = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\clean_policy_text.txt"

# Standardize line endings to \n and then split by double newlines or single newlines
# Let's clean up carriage returns
$text = $text.Replace("`r`n", "`n")

# Split text into paragraphs (lines separated by one or more empty lines)
$paragraphs = $text -split "\n{2,}"
Write-Output "Total paragraphs: $($paragraphs.Count)"

$pages = @()
$currentPage = @()
$currentLen = 0
$targetLen = 1250 # Adjust to hit exactly 51 pages

# We want to distribute paragraphs into 51 pages
# Let's run a loop adjusting $targetLen to get exactly 51 pages!
# Or we can do a simple distribution:
# Since we want exactly 51 pages, let's write a search loop for targetLen.
$found = $false
for ($testTarget = 500; $testTarget -lt 3000; $testTarget += 10) {
    $tempPages = @()
    $tempCurrentPage = @()
    $tempLen = 0
    foreach ($p in $paragraphs) {
        $pTrim = $p.Trim()
        if ($pTrim.Length -eq 0) { continue }
        if ($tempLen + $pTrim.Length -gt $testTarget -and $tempCurrentPage.Count -gt 0) {
            $tempPages += ,$tempCurrentPage
            $tempCurrentPage = @($pTrim)
            $tempLen = $pTrim.Length
        } else {
            $tempCurrentPage += $pTrim
            $tempLen += $pTrim.Length + 4 # approximation for separator
        }
    }
    if ($tempCurrentPage.Count -gt 0) {
        $tempPages += ,$tempCurrentPage
    }
    
    if ($tempPages.Count -eq 51) {
        $targetLen = $testTarget
        $pages = $tempPages
        $found = $true
        Write-Output "Found targetLen: $targetLen yields exactly 51 pages!"
        break
    }
}

if (-not $found) {
    Write-Output "Could not find targetLen yielding exactly 51 pages. Let's force-split into 51 pages."
    # Force split by paragraph distribution:
    $pages = @()
    $paragraphsPerPage = [Math]::Floor($paragraphs.Count / 51)
    $extra = $paragraphs.Count % 51
    
    $pIdx = 0
    for ($i = 0; $i -lt 51; $i++) {
        $count = $paragraphsPerPage
        if ($i -lt $extra) { $count++ }
        $pageParagraphs = @()
        for ($j = 0; $j -lt $count; $j++) {
            $pageParagraphs += $paragraphs[$pIdx]
            $pIdx++
        }
        $pages += ,$pageParagraphs
    }
}

# Output page preview
for ($i = 0; $i -lt $pages.Count; $i++) {
    $pageText = $pages[$i] -join "`n`n"
    Write-Output "Page $($i+1): length $($pageText.Length), starts with: $(if ($pageText.Length -gt 40) { $pageText.Substring(0, 40) } else { $pageText })"
}

# Save page structure to JS format
$jsPages = @()
for ($i = 0; $i -lt $pages.Count; $i++) {
    $pageParagraphs = $pages[$i]
    # Format each paragraph: convert markdown lists to HTML lists, and paragraphs to HTML paragraphs or <p> tags
    $htmlContent = ""
    foreach ($p in $pageParagraphs) {
        $lines = $p -split "\n"
        $inList = $false
        $listHtml = ""
        $pText = ""
        
        foreach ($line in $lines) {
            $lineTrim = $line.Trim()
            if ($lineTrim -like "* *" -and ($lineTrim.StartsWith("*") -or $lineTrim.StartsWith("-") -or $lineTrim.StartsWith("●"))) {
                if (-not $inList) {
                    $inList = $true
                    $listHtml = "<ul class=`"policy-list-bullets`">"
                }
                # Remove bullets
                $itemText = $lineTrim -replace "^[\*\-●]\s*", ""
                $listHtml += "<li>$itemText</li>"
            } else {
                if ($inList) {
                    $inList = $false
                    $listHtml += "</ul>"
                    $htmlContent += $listHtml
                }
                if ($lineTrim.Length -gt 0) {
                    # If it looks like a heading
                    if ($lineTrim.EndsWith(":") -or $lineTrim.StartsWith("Looking/") -or $lineTrim.StartsWith("Illegal Items") -or $lineTrim.StartsWith("Things We Cannot") -or $lineTrim.StartsWith("Places We Do Not") -or $lineTrim.StartsWith("Rejection Reasons") -or $lineTrim.StartsWith("Common Rejection") -or $lineTrim.StartsWith("Categories") -or $lineTrim.StartsWith("Real Estate") -or $lineTrim.StartsWith("Auto:") -or $lineTrim.StartsWith("Business:") -or $lineTrim.StartsWith("Services:") -or $lineTrim.StartsWith("Discounts:") -or $lineTrim.StartsWith("Work:") -or $lineTrim.StartsWith("Dating:") -or $lineTrim.StartsWith("Other:") -or $lineTrim.StartsWith("Terms to change:") -or $lineTrim.StartsWith("Things to take note")) {
                        $htmlContent += "<h4 class=`"policy-subtitle`">$lineTrim</h4>"
                    } else {
                        $htmlContent += "<p>$lineTrim</p>"
                    }
                }
            }
        }
        if ($inList) {
            $listHtml += "</ul>"
            $htmlContent += $listHtml
        }
    }
    
    # Let's extract a title for the page
    # Find the first heading or bold text, or first sentence
    $pageTitle = "Page $($i+1)"
    # If the first paragraph is short, use it as title
    if ($pageParagraphs[0].Length -lt 40 -and $pageParagraphs[0] -notlike "*Buying*" -and $pageParagraphs[0] -notlike "*Selling*") {
        $pageTitle = $pageParagraphs[0].Trim()
    } else {
        # Check if we can find a heading inside
        foreach ($p in $pageParagraphs) {
            if ($p.Length -lt 40 -and $p.EndsWith(":") -or $p -like "*Rules*" -or $p -like "*Category*") {
                $pageTitle = $p.Trim().TrimEnd(":")
                break
            }
        }
    }
    
    $jsPages += @{
        title = $pageTitle
        content = "<div class=`"policy-section`">$htmlContent</div>"
    }
}

# Convert $jsPages to Javascript array representation
$jsArrayText = "const POLICY_PAGES = [`n"
foreach ($p in $jsPages) {
    # Escape quotes and backslashes in title and content
    $tEscaped = $p.title.Replace("\", "\\").Replace("`"", "\`"").Replace("`'", "\`'")
    $cEscaped = $p.content.Replace("\", "\\").Replace("`"", "\`"").Replace("`'", "\`'").Replace("`n", "\n")
    # Replace any multiple spaces or tabs
    $cEscaped = [regex]::Replace($cEscaped, "\s+", " ")
    $jsArrayText += "    {`n        title: `"$tEscaped`",`n        content: `"$cEscaped`"`n    },`n"
}
$jsArrayText = $jsArrayText.TrimEnd(",`n") + "`n];"

Set-Content -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\policy_pages_js.txt" -Value $jsArrayText -Encoding UTF8
Write-Output "Successfully wrote 51 pages to scratch/policy_pages_js.txt"
