$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\features" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Fix pastel backgrounds globally for dark mode
    $content = $content -replace "bg-emerald-50(?!\/)", "bg-emerald-50 dark:bg-emerald-500/10"
    $content = $content -replace "bg-rose-50(?!\/)", "bg-rose-50 dark:bg-rose-500/10"
    $content = $content -replace "bg-amber-50(?!\/)", "bg-amber-50 dark:bg-amber-500/10"
    $content = $content -replace "bg-indigo-50(?!\/)", "bg-indigo-50 dark:bg-indigo-500/10"
    $content = $content -replace "bg-cyan-50(?!\/)", "bg-cyan-50 dark:bg-cyan-500/10"
    $content = $content -replace "bg-violet-50(?!\/)", "bg-violet-50 dark:bg-violet-500/10"
    
    # Fix pastel borders globally for dark mode
    $content = $content -replace "border-emerald-200/60", "border-emerald-200/60 dark:border-emerald-500/20"
    $content = $content -replace "border-rose-200/60", "border-rose-200/60 dark:border-rose-500/20"
    $content = $content -replace "border-amber-200/60", "border-amber-200/60 dark:border-amber-500/20"
    
    # Text colors already handled mostly, but ensure:
    $content = $content -replace "text-emerald-700", "text-emerald-700 dark:text-emerald-400"
    $content = $content -replace "text-rose-700", "text-rose-700 dark:text-rose-400"
    $content = $content -replace "text-amber-700", "text-amber-700 dark:text-amber-400"
    
    # Clean duplicates
    $content = $content -replace " dark:text-emerald-400 dark:text-emerald-400", " dark:text-emerald-400"
    $content = $content -replace " dark:text-rose-400 dark:text-rose-400", " dark:text-rose-400"
    $content = $content -replace " dark:text-amber-400 dark:text-amber-400", " dark:text-amber-400"
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
