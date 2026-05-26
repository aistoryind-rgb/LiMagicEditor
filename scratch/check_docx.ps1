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

    Write-Output "XML Text length: $($xmlText.Length)"
    
    $xml = [xml]$xmlText
    $ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    
    $paragraphs = $xml.SelectNodes("//w:p", $ns)
    Write-Output "Total paragraphs: $($paragraphs.Count)"
    
    $brPageCount = $xml.SelectNodes("//w:br[@w:type='page']", $ns).Count
    $lastBreakCount = $xml.SelectNodes("//w:lastRenderedPageBreak", $ns).Count
    
    Write-Output "w:br page count: $brPageCount"
    Write-Output "lastRenderedPageBreak count: $lastBreakCount"
} else {
    Write-Output "word/document.xml not found"
}
$zip.Dispose()
