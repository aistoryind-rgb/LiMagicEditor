$template = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\app_template.js"
$vehicles = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\vehicles.json"
$clothing = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\clothing.json"
$items = Get-Content -Raw -Encoding UTF8 -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\items.json"
$timestamp = (Get-Date).ToString("yyyy MMM dd HH:mm:ss")
$timestampShort = (Get-Date).ToString("MMM dd HH:mm")
$compiled = $template.Replace("__VEHICLES_JSON__", $vehicles).Replace("__CLOTHING_JSON__", $clothing).Replace("__ITEMS_JSON__", $items).Replace("__BUILD_TIMESTAMP__", $timestamp).Replace("__BUILD_TIMESTAMP_SHORT__", $timestampShort)
Set-Content -Path "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\app.js" -Value $compiled -Encoding UTF8
Write-Output "App.js compiled successfully!"
