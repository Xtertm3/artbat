$base = "c:\Users\ANKIT TIWARI\Desktop\artbat\lssm-frontend\src"

$dirs = @(
    "types", "config", "lib", "hooks", "store", "services",
    "styles",
    "components\common",
    "components\layout",
    "components\auth",
    "components\course",
    "components\student",
    "components\instructor",
    "components\admin",
    "components\payment",
    "components\notifications",
    "pages\public",
    "pages\auth",
    "pages\student",
    "pages\instructor",
    "pages\admin",
    "pages\payment",
    "pages\errors"
)

foreach ($d in $dirs) {
    $path = Join-Path -Path $base -ChildPath $d
    if (-not (Test-Path -Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Created: $path"
    } else {
        Write-Host "Already exists: $path"
    }
}

Write-Host ""
Write-Host "ALL DONE - Listing src directory contents:"
Get-ChildItem -Path $base -Name
