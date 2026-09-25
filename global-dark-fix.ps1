$files = Get-ChildItem -Path "c:\Soham-data\self-learn\mern-projects\codelens\src\features" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # 1. White and Slate Backgrounds
    # Match bg-white or bg-white/xx that DO NOT already have a dark:bg immediately following
    $content = [regex]::Replace($content, 'bg-white(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:bg-)', '$0 dark:bg-slate-900$1')
    $content = [regex]::Replace($content, 'bg-slate-50(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:bg-)', '$0 dark:bg-slate-800$1')
    $content = [regex]::Replace($content, 'bg-slate-100(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:bg-)', '$0 dark:bg-slate-800$1')
    
    # 2. Border fixes
    $content = [regex]::Replace($content, 'border-white(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:border-)', '$0 dark:border-slate-700$1')
    $content = [regex]::Replace($content, 'border-slate-100(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:border-)', '$0 dark:border-slate-700$1')
    $content = [regex]::Replace($content, 'border-slate-200(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:border-)', '$0 dark:border-slate-700$1')
    $content = [regex]::Replace($content, 'border-slate-300(/(10|20|30|40|50|60|70|80|90|100))?(?!\s+dark:border-)', '$0 dark:border-slate-600$1')

    # 3. Text colors
    # Ensure slate text has dark mode overrides
    $content = [regex]::Replace($content, 'text-slate-500(?!\s+dark:text-)', '$0 dark:text-slate-400')
    $content = [regex]::Replace($content, 'text-slate-600(?!\s+dark:text-)', '$0 dark:text-slate-300')
    $content = [regex]::Replace($content, 'text-slate-700(?!\s+dark:text-)', '$0 dark:text-slate-200')
    $content = [regex]::Replace($content, 'text-slate-800(?!\s+dark:text-)', '$0 dark:text-slate-100')
    $content = [regex]::Replace($content, 'text-slate-900(?!\s+dark:text-)', '$0 dark:text-slate-50')

    # Ensure indigo text has dark mode overrides
    $content = [regex]::Replace($content, 'text-indigo-600(?!\s+dark:text-)', '$0 dark:text-indigo-300')
    $content = [regex]::Replace($content, 'text-indigo-700(?!\s+dark:text-)', '$0 dark:text-indigo-200')
    $content = [regex]::Replace($content, 'text-indigo-800(?!\s+dark:text-)', '$0 dark:text-indigo-100')
    $content = [regex]::Replace($content, 'text-indigo-900(?!\s+dark:text-)', '$0 dark:text-indigo-50')
    
    # 4. Clean up any weird duplications that might have occurred in previous attempts
    $content = $content -replace "dark:bg-slate-900/100", "dark:bg-slate-900"
    $content = $content -replace "dark:bg-slate-800/100", "dark:bg-slate-800"

    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Patched $($file.Name)"
    }
}
