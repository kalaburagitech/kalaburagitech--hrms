$files = Get-ChildItem -Path "src" -Recurse -File -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Backgrounds
    $content = $content -replace 'bg-slate-950/80', 'bg-background/80'
    $content = $content -replace 'bg-slate-950/70', 'bg-background/70'
    $content = $content -replace 'bg-slate-950/60', 'bg-background/60'
    $content = $content -replace 'bg-slate-950/50', 'bg-background/50'
    $content = $content -replace 'bg-slate-950', 'bg-background'

    $content = $content -replace 'bg-slate-900/80', 'bg-card/80'
    $content = $content -replace 'bg-slate-900/70', 'bg-card/70'
    $content = $content -replace 'bg-slate-900/60', 'bg-card/60'
    $content = $content -replace 'bg-slate-900/50', 'bg-card/50'
    $content = $content -replace 'bg-slate-900/40', 'bg-card/40'
    $content = $content -replace 'bg-slate-900', 'bg-card'
    
    $content = $content -replace 'bg-slate-800', 'bg-muted'
    
    # Texts
    $content = $content -replace 'text-white', 'text-foreground'
    $content = $content -replace 'text-slate-100', 'text-foreground'
    $content = $content -replace 'text-slate-200', 'text-foreground'
    $content = $content -replace 'text-slate-300', 'text-muted-foreground'
    $content = $content -replace 'text-slate-400', 'text-muted-foreground'
    $content = $content -replace 'text-slate-500', 'text-muted-foreground'
    
    # Borders
    $content = $content -replace 'border-white/10', 'border-border'
    $content = $content -replace 'border-white/5', 'border-border'
    $content = $content -replace 'border-slate-800', 'border-border'
    $content = $content -replace 'border-slate-700', 'border-border'

    # Special buttons / interactions
    $content = $content -replace 'hover:bg-slate-900/80', 'hover:bg-muted/80'
    $content = $content -replace 'hover:bg-slate-800', 'hover:bg-muted'
    $content = $content -replace 'hover:text-white', 'hover:text-foreground'
    $content = $content -replace 'hover:bg-white/10', 'hover:bg-accent hover:text-accent-foreground'
    $content = $content -replace 'hover:bg-white/5', 'hover:bg-accent/50'

    Set-Content $file.FullName -Value $content
}

Write-Host "Refactoring complete."
