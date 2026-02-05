# Script PowerShell pour mettre à jour le code de vérification Google Search Console
# Usage: .\update-gsc-verification.ps1 -VerificationCode "VOTRE_CODE_ICI"

param(
    [Parameter(Mandatory=$true)]
    [string]$VerificationCode
)

# Chemin du fichier index.html
$indexPath = Join-Path $PSScriptRoot "..\index.html"

# Vérifier que le fichier existe
if (-not (Test-Path $indexPath)) {
    Write-Error "❌ Fichier index.html introuvable: $indexPath"
    exit 1
}

# Lire le contenu du fichier
$content = Get-Content $indexPath -Raw

# Pattern pour trouver la ligne commentée
$pattern = '(?s)(<!-- Google Search Console Verification.*?-->)\s*<!-- <meta name="google-site-verification" content="YOUR_CODE" /> -->'

# Remplacement avec le code de vérification
$replacement = @"
<!-- Google Search Console Verification -->
    <meta name="google-site-verification" content="$VerificationCode" />
"@

# Vérifier si le pattern existe
if ($content -match $pattern) {
    # Remplacer
    $newContent = $content -replace $pattern, $replacement
    
    # Sauvegarder
    Set-Content -Path $indexPath -Value $newContent -NoNewline
    
    Write-Host "✅ Code de vérification Google Search Console mis à jour avec succès!" -ForegroundColor Green
    Write-Host "📝 Fichier modifié: $indexPath" -ForegroundColor Cyan
    Write-Host "🔑 Code de vérification: $VerificationCode" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Prochaines étapes:" -ForegroundColor Yellow
    Write-Host "  1. Déployer le fichier index.html sur Infomaniak"
    Write-Host "  2. Vérifier que le site est accessible: https://mystya.dev"
    Write-Host "  3. Vérifier la meta tag dans le source (Ctrl+U)"
    Write-Host "  4. Retourner sur Google Search Console et cliquer 'Verify'"
} else {
    Write-Error "❌ Pattern de vérification non trouvé dans index.html"
    Write-Host "Vérifier que le fichier contient bien:" -ForegroundColor Yellow
    Write-Host '  <!-- <meta name="google-site-verification" content="YOUR_CODE" /> -->'
    exit 1
}
