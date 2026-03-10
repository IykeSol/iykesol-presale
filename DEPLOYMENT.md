# Deployment Guide

Follow these exact steps to host your site on Vercel using GitHub.

### 1. Upload to GitHub

Open your terminal in this folder and run these commands one by one:

```bash
# 1. Initialize Git
git init

# 2. Add all your files
git add .

# 3. Create your first commit
git commit -m "Initial commit - iykesol premium"

# 4. Create a NEW Repository on GitHub.com (don't add README/License)
# Then copy the 'remote' command from GitHub. It looks like this:
git remote add origin https://github.com/YOUR_USERNAME/crypto-presale.git

# 5. Push your code
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Find your **"crypto-presale"** repository and click **"Import"**.
4. **IMPORTANT (Framework Preset):**
   - Vercel will see your `package.json` and might try to run build commands.
   - If you want it to be a simple static site, change the **Framework Preset** to **"Other"**.
   - Ensure the **Output Directory** is empty or set to `.` (Current Directory).
5. Click **"Deploy"**.

**Your site will be live at a `.vercel.app` URL!**
