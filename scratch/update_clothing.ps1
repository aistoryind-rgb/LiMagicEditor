$path = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\clothing.json"
$data = Get-Content -Raw -Encoding UTF8 -Path $path | ConvertFrom-Json

$newAccessories = @(
    "accessory",
    "Ak-47 Chain",
    "black voron shoulder accessory",
    "Bracelet",
    "Chain",
    "Chain With Star Pendant",
    "Clown Chain",
    "Eagle Necklace",
    "El Primo Corazon Krawl On The Shoulder Accessory",
    "Fluorescent Cat Ears",
    "glowing nails",
    "Hamster On The Shoulder Accessory",
    "Leon Krawl On The Shoulder Accessory",
    "Lovely Bird Egg On The Shoulder Accessory",
    "Necklace",
    "Neon Rabbit Ears",
    "Owl On The Shoulder Accessory",
    "Scarf",
    "Six-Tailed Fox On The Shoulder Accessory",
    "Strong Chicken On The Shoulder Accessory",
    "Tie",
    "Toothless Dragon On The Shoulder Accessory",
    "beads accessory",
    "Onelove Chain"
)

function Add-Unique($list, $itemsToAdd) {
    $current = [System.Collections.Generic.List[string]]::new()
    if ($list) {
        foreach ($l in $list) {
            if (-not $current.Contains($l)) {
                [void]$current.Add($l)
            }
        }
    }
    foreach ($item in $itemsToAdd) {
        if (-not $current.Contains($item)) {
            [void]$current.Add($item)
        }
    }
    return $current.ToArray()
}

$data.female.ACCESSORY = Add-Unique $data.female.ACCESSORY $newAccessories
$data.male.ACCESSORY = Add-Unique $data.male.ACCESSORY $newAccessories

$json = ConvertTo-Json $data -Depth 100
Set-Content -Path $path -Value $json -Encoding UTF8
Write-Output "clothing.json updated successfully via PowerShell!"
