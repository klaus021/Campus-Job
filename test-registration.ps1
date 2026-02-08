# Test registration via API
$testUser = @{
    name = "Test User $(Get-Random)"
    email = "testuser$(Get-Random)@test.com"
    password = "TestPassword123"
    department = "CSE"
    bio = "Test bio"
    skills = @("Skill1", "Skill2")
    university = "Test University"
} | ConvertTo-Json

Write-Host "=== Testing Registration ===" -ForegroundColor Green
Write-Host "Request body:" -ForegroundColor Cyan
Write-Host $testUser

Write-Host "`n=== Sending request to backend ===" -ForegroundColor Green

try {
    $response = Invoke-WebRequest `
        -Uri 'http://localhost/university-gig-marketplace-clone/backend/index.php' `
        -Method POST `
        -ContentType 'application/json' `
        -Body $testUser `
        -ErrorAction Stop
    
    Write-Host "✅ Response Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "`n=== Response Body ===" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        Write-Host "`nResponse Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = [System.IO.StreamReader]::new($errorStream)
        Write-Host "Response content: $($reader.ReadToEnd())" -ForegroundColor Red
    }
}

Write-Host "`n=== Checking users.json ===" -ForegroundColor Green
$usersFile = "c:\xampp\htdocs\university-gig-marketplace-clone\backend\data\users.json"
if (Test-Path $usersFile) {
    $users = Get-Content $usersFile | ConvertFrom-Json
    Write-Host "✅ Total users in database: $($users.Count)" -ForegroundColor Green
    Write-Host "`nLatest user:" -ForegroundColor Cyan
    $users[-1] | ConvertTo-Json
} else {
    Write-Host "❌ users.json not found!" -ForegroundColor Red
}
