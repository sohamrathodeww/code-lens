$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\features", "c:\Soham-data\self-learn\mern-projects\codelens\src\components" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Ensure we don't duplicate dark: classes
    $content = $content -replace " dark:text-white", ""
    $content = $content -replace " dark:text-slate-100", ""
    $content = $content -replace " dark:text-slate-300", ""
    $content = $content -replace " dark:text-slate-400", ""
    $content = $content -replace " dark:bg-slate-900/90", ""
    $content = $content -replace " dark:bg-slate-800/80", ""
    $content = $content -replace " dark:bg-slate-800/50", ""
    $content = $content -replace " dark:bg-slate-900", ""
    $content = $content -replace " dark:bg-slate-800", ""
    $content = $content -replace " dark:border-slate-700/80", ""
    $content = $content -replace " dark:border-slate-700/50", ""
    $content = $content -replace " dark:border-slate-700", ""
    
    # Text colors
    $content = $content -replace "text-slate-950", "text-slate-950 dark:text-white"
    $content = $content -replace "text-slate-900", "text-slate-900 dark:text-slate-100"
    $content = $content -replace "text-slate-700", "text-slate-700 dark:text-slate-300"
    $content = $content -replace "text-slate-600", "text-slate-600 dark:text-slate-400"
    
    # Backgrounds
    $content = $content -replace "bg-white/90", "bg-white/90 dark:bg-slate-900/90"
    $content = $content -replace "bg-white/80", "bg-white/80 dark:bg-slate-800/80"
    $content = $content -replace "bg-white/50", "bg-white/50 dark:bg-slate-800/50"
    $content = $content -replace "bg-white(?!\/)", "bg-white dark:bg-slate-900"
    $content = $content -replace "bg-slate-50(?!\/)", "bg-slate-50 dark:bg-slate-800/50"
    $content = $content -replace "bg-slate-100", "bg-slate-100 dark:bg-slate-800"
    
    # Borders
    $content = $content -replace "border-white/80", "border-white/80 dark:border-slate-700/80"
    $content = $content -replace "border-white(?!\/)", "border-white dark:border-slate-700"
    $content = $content -replace "border-slate-200/80", "border-slate-200/80 dark:border-slate-700/80"
    $content = $content -replace "border-slate-200(?!\/)", "border-slate-200 dark:border-slate-700"
    $content = $content -replace "border-slate-100", "border-slate-100 dark:border-slate-700/50"
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
