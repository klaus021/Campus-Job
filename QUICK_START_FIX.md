# ⚡ QUICK START - Data Storage Fix

## 🔥 UPDATED ISSUE DIAGNOSIS

Your diagnostic found the exact problem:
- ❌ **Vite proxy returned 404** = Frontend cannot reach backend API
- ✅ Backend works perfectly (4 gigs saved successfully!)
- ✅ Files are writable

## 🚀 STEP-BY-STEP FIX (5 Minutes)

### **STEP 1: Stop Everything**
```powershell
taskkill /F /IM node.exe 2>$null
taskkill /F /IM php.exe 2>$null
Start-Sleep -Seconds 2
```

### **STEP 2: Restart Apache**
- Open XAMPP Control Panel
- Click "Stop" next to Apache (if running)
- Wait 3 seconds
- Click "Start" next to Apache
- Wait until you see "Apache ... Running" with green indicator

⚠️ **IMPORTANT:** This loads the new `.htaccess` file I created

### **STEP 3: Start Vite Dev Server**
```powershell
cd C:\xampp\htdocs\university-gig-marketplace-clone
npm run dev
```

Wait for:
```
  VITE v7.2.4  ready in ### ms
  ➜  Local:   http://localhost:5173/
```

### **STEP 4: Test the Proxy (Do This!)**

Open **a new PowerShell window** and run:
```powershell
# Test health endpoint
curl -s http://localhost:5173/api/health | ConvertFrom-Json | ConvertTo-Json
```

Expected output:
```json
{
  "status": "ok",
  "database": "connected",
  "path_received": "/api/health"
}
```

✅ If you see this, the proxy is working!  
❌ If you see an error, the proxy is still broken (continue to Troubleshoot section)

### **STEP 5: Test Creating Data from Frontend**

1. Go to: **`http://localhost:5173`** (NOT localhost/...)
2. Login with: `john@ugv.edu` / `123456`
3. Click **"Create Gig"** button
4. Fill form:
   - Title: "Test from Vite"
   - Department: Any
   - Price: 5000
   - Delivery Days: 3
   - Description: "Testing"
5. Click **Submit**

### **STEP 6: Check Browser Console**

Press **F12** to open Developer Tools, go to **Console** tab.

You should see messages like:
```
🚀 Creating gig: {sellerId: "u1", title: "Test from Vite", ...}
📡 API Response Status: 200
✅ Gig created successfully: {id: "g1770524...", sellerId: "u1", ...}
```

✅ If you see these = Data is being saved to backend!

### **STEP 7: Verify File Was Saved**

Visit: **`http://localhost/university-gig-marketplace-clone/backend/data/gigs.json`**

You should see your new gig in the JSON file!

---

## 🔧 TROUBLESHOOTING

### **Problem: Curl command returns 404 or error**

**Cause:** One of these is not running:
- Apache (check XAMPP Control Panel)
- Vite dev server (check terminal for "ready in")
- Or `.htaccess` not loaded

**Solution:**
```powershell
# 1. Check Apache error log
cat C:\xampp\apache\logs\error.log | tail -20

# 2. Check if mod_rewrite is enabled in Apache
# Look for lines with "mod_rewrite" in the log
```

### **Problem: Browser shows error in console**

**Check:** Open F12 Developer Tools and go to **Network** tab

1. Create a gig
2. Look for a request to `/api/gigs` (POST)
3. Click it
4. Check "Response" tab
   - If empty or error: Backend issue
   - If shows JSON: Backend works, check for ✅ in console

### **Problem: Data appears in React but not in gigs.json file**

This means the API call failed and fallback mode activated. Check:
1. Is Apache running? (green indicator in XAMPP)
2. Is Vite running? (shows "ready in" message)
3. What does the Network tab show? (click `/api/gigs` request)

---

## 📋 What Changed?

I made 3 critical changes:

| Change | File | Why |
|--------|------|-----|
| Created `.htaccess` | `backend/.htaccess` | Routes all requests to `index.php` |
| Enabled debug logs | `backend/index.php` | Shows you what requests backend receives |
| Added test pages | `backend/diagnostic.html` | Debug tool to verify everything |

---

## ⏱️ EXPECTED TIMELINE

- Restart Apache: **1 minute**
- Start Vite: **30 seconds**
- Test proxy: **1 minute**
- Create test gig: **2 minutes**
- **Total: ~5 minutes**

---

## 🎁 BONUS: Monitor Backend Requests

To see what requests the backend receives, check the error log:
```powershell
tail -f C:\xampp\apache\logs\error.log | grep "API Request"
```

This will show live:
```
[PHP Error] API Request - URI: /university-gig-marketplace-clone/backend/api/gigs | Path: /api/gigs | Method: POST
```

---

## ✅ SUCCESS CHECKLIST

- [ ] Apache restarted (green indicator in XAMPP)
- [ ] Vite dev server running (shows "ready in")
- [ ] Curl test passed (returned health JSON)
- [ ] Created gig from frontend
- [ ] Console shows ✅ messages
- [ ] Gig appears in gigs.json file

Once all ✅, your data storage is FIXED! 🎉
