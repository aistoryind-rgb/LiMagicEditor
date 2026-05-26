Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\LifeInvader Ad's Internal Policy (EN3).docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
if ($entry) {
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xmlText = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    
    $xml = [xml]$xmlText
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    
    $paragraphs = $xml.SelectNodes("//w:p", $ns)
    $lines = @()
    foreach ($p in $paragraphs) {
        $text = ""
        # Get all text runs in this paragraph
        $runs = $p.SelectNodes(".//w:t", $ns)
        foreach ($r in $runs) {
            $text += $r.InnerText
        }
        $lines += $text
    }
    
    $outPath = "c:\Users\Max\Documents\Anti_Gravity_02\AI BUILD\scratch\extracted_text.txt"
    Set-Content -Path $outPath -Value $lines -Encoding UTF8
    Write-Output "Extracted $($lines.Count) paragraphs, saved to $outPath"
} else {
    Write-Output "word/document.xml not found"
}
$zip.Dispose()
