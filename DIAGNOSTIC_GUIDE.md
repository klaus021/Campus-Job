# 🔍 Data Storage Issue - Complete Diagnostic & Fix Guide

## Status Check Summary
✅ **Backend** is working (confirmed with direct PHP test)
✅ **Data files** are created and writable  
✅ **XAMPP Apache** is running  
⚠️ **Frontend API calls** need verification

---

## Problem Analysis

The backend PHP is working perfectly. The issue is most likely in the frontend → backend communication. Your Vite dev server needs to properly proxy API requests to the XAMPP backend.

---

## Step-by-Step Testing & Fix

### **STEP 1: Kill All Servers**
```powershell
taskkill /F /IM node.exe
taskkill /F /IM php.exe
# Give them 2 seconds to close
Start-Sleep -Seconds 2
```

### **STEP 2: Start XAMPP Apache (if not already running)**
- Open XAMPP Control Panel
- Click "Start" next to Apache
- Verify you see: `Apache... running` (with green indicator)

### **STEP 3: Test Backend Directly (No Vite)**
Visit in browser: **`http://localhost/university-gig-marketplace-clone/backend/direct-test.php`**

You should see JSON like:
```json
{
  "test": "Backend Direct Test",
  "timestamp": "2026-02-08 05:06:57",
  "users_count": 4,
  "gigs_count": 1,
  "status": "success",
  "created_gig": { ... }
}
```

✅ If this works, the backend is fine.  
❌ If this fails, there's a backend issue (check XAMPP logs)

### **STEP 4: Run Comprehensive Diagnostics**
Visit: **`http://localhost/university-gig-marketplace-clone/backend/diagnostic.html`**

Click buttons in this order:
1. **Test Health Check** - Tests direct backend
2. **Check Gigs.json** - Tests file reading
3. **Test File Access** - Tests all data files

⚠️ DON'T run the proxy tests yet (those require Vite)

### **STEP 5: Start Vite Dev Server**
```powershell
cd C:\xampp\htdocs\university-gig-marketplace-clone
npm run dev
```

Wait for it to show:
```
  VITE v7.2.4  ready in ### ms
  ➜  Local:   http://localhost:5173/
```

### **STEP 6: Test Proxy Communication**
Go to: **`http://localhost:5173`** (your frontend)

Open **Browser Developer Console** (F12 or Ctrl+Shift+I)

Then in the console, paste and run:
```javascript
fetch('/api/health').then(r => r.json()).then(d => console.log('✅ Proxy works!', d)).catch(e => console.error('❌ Proxy failed:', e));
```

If you see `✅ Proxy works!` - your frontend can talk to backend!

### **STEP 7: Test Creating Data**
In the application:
1. Login with: `john@ugv.edu` / `123456`
2. Click **Create Gig**
3. Fill in the form and submit
4. **Open browser console (F12)** and look for messages like:
   - `🚀 Creating gig:` - means form was submitted
   - `📡 API Response Status: 200` - means backend received it
   - `✅ Gig created successfully:` - means it was saved!

### **STEP 8: Verify Data Was Saved**
After creating a gig, visit:
**`http://localhost/university-gig-marketplace-clone/backend/data/gigs.json`**

You should see your gig in the JSON file!

---

## Troubleshooting

### Problem: "Proxy works" test shows ❌ error

**Solution:**
- Make sure both servers are running:
  - Apache in XAMPP (green indicator)
  - Vite dev server (shows "ready")
- Check Vite config was saved correctly:
  ```powershell
  cat vite.config.ts | grep -A 3 "server:"
  ```
  Should show:
  ```
  target: 'http://localhost/university-gig-marketplace-clone/backend'
  changeOrigin: true,
  ```

### Problem: Browser console shows ⚠️ Falling back to local creation

**Meaning:** The API call failed, so data is stored locally in browser memory (lost on refresh)

**Solution:** Check why API call failed:
- Is Apache running? (Check XAMPP)
- Is the URL correct? (Check browser Network tab in F12)
- Are there PHP errors? (Check `C:\xampp\apache\logs\error.log`)

### Problem: Data appears in React app but not in gigs.json file

**Meaning:** Fallback mode is active (API failed silently)

**Solution:**
1. Open browser F12 (Developer Tools)
2. Go to Network tab
3. Create a gig and watch the network requests
4. Click on the `/api/gigs` request
5. Check the "Response" tab - what does it show?
   - Empty or error? → Backend issue
   - `{"id": "g..."}` ? → Should have saved (check file)

---

## Expected Behavior

### ✅ Correct Flow:
1. User creates gig in React form
2. Browser console shows: `🚀 Creating gig: {...}`
3. Browser sends POST to `/api/gigs`
4. Vite proxy forwards to `http://localhost/.../backend/api/gigs`
5. PHP backend creates gig and saves to file
6. Browser console shows: `✅ Gig created successfully: {...}`
7. File `backend/data/gigs.json` is updated immediately

### ❌ Fallback Flow (BAD):
1. Same as above (1-2)
3. API call fails (network error, timeout, etc.)
4. Browser console shows: `⚠️ Falling back to local creation`
5. Data stores only in React state (browser memory)
6. Data is LOST on page refresh!

---

## Quick Summary of Files Modified

| File | Change |
|------|--------|
| `vite.config.ts` | Fixed proxy target & removed bad rewrite |
| `backend/index.php` | Improved path parsing, added debug comments |
| `backend/db.php` | Added save/create functions for all data types |
| `src/store/index.ts` | Made functions async and call backend API |
| `src/components/CreatePages.tsx` | Made form handlers await async functions |
| `src/components/EditProfilePage.tsx` | Made form handlers await async functions |
| `src/components/GigDetailPage.tsx` | Made placeOrder await async function |
| `src/components/MessagesPage.tsx` | Made sendMessage await async function |
| `src/components/OrdersPage.tsx` | Made handleReview await async function |

---

## Next Steps

1. **Follow Steps 1-7 above** to test everything
2. **Report which step fails** (if any)
3. **Check browser console** (F12) for error messages
4. **Check `C:\xampp\apache\logs\error.log`** for PHP errors

Once you confirm the "✅ Proxy works!" test passes, data persistence should work!
