$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\app" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Replace bg-[#fbfcfd] text-slate-900
    $content = $content -replace "bg-\[#fbfcfd\] text-slate-900", "bg-[#fbfcfd] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    
    # Replace bg-[#f8fafc] text-slate-900
    $content = $content -replace "bg-\[#f8fafc\] text-slate-900", "bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300"
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
