$files = @(
    "c:\Soham-data\self-learn\mern-projects\codelens\src\features\code-compare\CodeCompareFeature.tsx",
    "c:\Soham-data\self-learn\mern-projects\codelens\src\features\json-compare\JsonCompareFeature.tsx"
)

foreach ($file in $files) {
    $content = Get-Content -Path $file -Raw
    
    # Check if we need to add the import
    if ($content -notmatch 'import \{ useTheme \} from "next-themes"') {
        $content = $content -replace '(import React, \{ [^}]+\} from "react";)', "$1`nimport { useTheme } from `"next-themes`";"
    }
    
    # Replace editorTheme state with useTheme hook
    $content = $content -replace 'const \[editorTheme, setEditorTheme\] = useState<"vs" \| "vs-dark">\(.*?\);', 'const { theme } = useTheme();'
    
    # Remove the Moon/Sun import if it's unused after removing the button
    # Actually, it's safer to just remove the button block
    
    # Remove the Button block entirely
    $content = $content -replace '(?s)<Button\s+variant="ghost"\s+size="sm"\s+onClick=\{\(\) => setEditorTheme.*?Light"\}\s+</Button>', ''
    
    # Replace theme={editorTheme} with theme={theme === "dark" ? "vs-dark" : "vs"}
    $content = $content -replace 'theme=\{editorTheme\}', 'theme={theme === "dark" ? "vs-dark" : "vs"}'
    
    Set-Content -Path $file -Value $content
    Write-Host "Updated $file"
}
