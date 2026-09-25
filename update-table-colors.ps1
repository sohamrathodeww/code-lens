$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\features" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Clean up first to avoid duplicates
    $content = $content -replace " dark:text-slate-300", ""
    $content = $content -replace " dark:text-rose-300", ""
    $content = $content -replace " dark:bg-rose-900/30", ""
    $content = $content -replace " dark:bg-emerald-900/30", ""
    $content = $content -replace " dark:text-slate-200", ""
    
    # Replace
    $content = $content -replace "text-slate-800", "text-slate-800 dark:text-slate-300"
    $content = $content -replace "text-rose-800", "text-rose-800 dark:text-rose-300"
    
    # Optional: Fix boolean backgrounds
    $content = $content -replace "bg-rose-100", "bg-rose-100 dark:bg-rose-900/30"
    $content = $content -replace "bg-emerald-100", "bg-emerald-100 dark:bg-emerald-900/30"
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
