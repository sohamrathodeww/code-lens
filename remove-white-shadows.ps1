$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Remove all aggressive inset white shadows that break dark mode
    $content = $content -replace "shadow-\[inset_0_1\.5px_2px_#ffffff,0_8px_20px_rgba\([^\]]+\)\]\s*", ""
    $content = $content -replace "shadow-\[inset_0_1\.5px_2px_#ffffff\]\s*", ""
    $content = $content -replace "shadow-\[inset_0_1px_2px_#ffffff\]\s*", ""
    $content = $content -replace "shadow-\[inset_0_1px_1\.5px_#ffffff\]\s*", ""
    $content = $content -replace "shadow-\[inset_0_2px_3px_#ffffff\]\s*", ""
    
    # Clean up any leftover empty class attributes if necessary
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
