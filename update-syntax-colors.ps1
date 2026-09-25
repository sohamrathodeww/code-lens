$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\features" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Clean up first to avoid duplicates
    $content = $content -replace " dark:text-emerald-400", ""
    $content = $content -replace " dark:text-emerald-300", ""
    $content = $content -replace " dark:text-amber-400", ""
    $content = $content -replace " dark:text-purple-400", ""
    $content = $content -replace " dark:text-rose-400", ""
    $content = $content -replace " dark:text-indigo-400", ""
    $content = $content -replace " dark:text-indigo-300", ""
    $content = $content -replace " dark:text-cyan-400", ""
    $content = $content -replace " dark:text-violet-400", ""
    
    # Replace
    $content = $content -replace "text-emerald-700", "text-emerald-700 dark:text-emerald-400"
    $content = $content -replace "text-emerald-800", "text-emerald-800 dark:text-emerald-300"
    
    $content = $content -replace "text-amber-700", "text-amber-700 dark:text-amber-400"
    $content = $content -replace "text-amber-600", "text-amber-600 dark:text-amber-400"
    
    $content = $content -replace "text-purple-700", "text-purple-700 dark:text-purple-400"
    $content = $content -replace "text-purple-600", "text-purple-600 dark:text-purple-400"
    
    $content = $content -replace "text-rose-700", "text-rose-700 dark:text-rose-400"
    $content = $content -replace "text-rose-600", "text-rose-600 dark:text-rose-400"
    
    $content = $content -replace "text-indigo-700", "text-indigo-700 dark:text-indigo-300"
    $content = $content -replace "text-indigo-600", "text-indigo-600 dark:text-indigo-400"
    
    $content = $content -replace "text-cyan-700", "text-cyan-700 dark:text-cyan-400"
    $content = $content -replace "text-cyan-600", "text-cyan-600 dark:text-cyan-400"
    
    $content = $content -replace "text-violet-700", "text-violet-700 dark:text-violet-400"
    $content = $content -replace "text-violet-600", "text-violet-600 dark:text-violet-400"
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
