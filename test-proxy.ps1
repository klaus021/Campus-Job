# Test Vite Proxy Connection
# Run this after starting Vite dev server to verify proxy is working

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Testing Vite Proxy Connection" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Direct Backend
Write-Host "TEST 1: Direct Backend (Apache)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost/university-gig-marketplace-clone/backend/direct-test.php" -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ Backend works: Created $($data.'gigs_after_create') gigs" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: Via Vite Proxy
Write-Host "TEST 2: Via Vite Proxy (http://localhost:5173)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173/api/health" -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ Proxy works! Status: $($data.status)" -ForegroundColor Green
    Write-Host "   Backend returned: $(($data | ConvertTo-Json -Compress))" -ForegroundColor Green
} catch {
    Write-Host "❌ Proxy failed: $_" -ForegroundColor Red
    Write-Host "   Make sure Vite dev server is running: npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Get Users
Write-Host "TEST 3: Get Users via Proxy" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173/api/users" -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ Got $($data.Count) users from proxy" -ForegroundColor Green
    Write-Host "   Users: $($data | ForEach-Object { $_.name } | Join-String -Separator ', ')" -ForegroundColor Green
} catch {
    Write-Host "❌ Get users failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 4: Create Gig (Test API)
Write-Host "TEST 4: Create Gig via Proxy" -ForegroundColor Yellow
try {
    $gigData = @{
        sellerId = "u999"
        title = "PowerShell Test Gig $(Get-Date -Format 'HH:mm:ss')"
        description = "Testing from PowerShell script"
        department = "CSE"
        price = 9999
        deliveryDays = 1
        tags = @("test", "powershell")
        image = "https://example.com/test.jpg"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:5173/api/gigs" `
        -Method POST `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $gigData `
        -ErrorAction Stop
    
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ Gig created successfully!" -ForegroundColor Green
    Write-Host "   ID: $($data.id)" -ForegroundColor Green
    Write-Host "   Title: $($data.title)" -ForegroundColor Green
} catch {
    Write-Host "❌ Create gig failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Test Complete" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
