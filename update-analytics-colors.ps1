$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\features" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Text colors
    $content = $content -replace "text-slate-700", "text-slate-700 dark:text-slate-300"
    $content = $content -replace "text-slate-600", "text-slate-600 dark:text-slate-400"
    $content = $content -replace "text-slate-500", "text-slate-500 dark:text-slate-400"
    
    # Ensure no duplicates if they were already there
    $content = $content -replace " dark:text-slate-300 dark:text-slate-300", " dark:text-slate-300"
    $content = $content -replace " dark:text-slate-400 dark:text-slate-400", " dark:text-slate-400"
    
    # Analytics Box Backgrounds
    $content = $content -replace "bg-indigo-50/70", "bg-indigo-50/70 dark:bg-indigo-500/10"
    $content = $content -replace "border-indigo-200/80", "border-indigo-200/80 dark:border-indigo-500/20"
    
    $content = $content -replace "bg-cyan-50/70", "bg-cyan-50/70 dark:bg-cyan-500/10"
    $content = $content -replace "border-cyan-200/80", "border-cyan-200/80 dark:border-cyan-500/20"
    
    $content = $content -replace "bg-emerald-50/70", "bg-emerald-50/70 dark:bg-emerald-500/10"
    $content = $content -replace "border-emerald-200/80", "border-emerald-200/80 dark:border-emerald-500/20"
    
    $content = $content -replace "bg-violet-50/70", "bg-violet-50/70 dark:bg-violet-500/10"
    $content = $content -replace "border-violet-200/80", "border-violet-200/80 dark:border-violet-500/20"
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    }
}
