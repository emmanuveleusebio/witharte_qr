# 🚀 Permanent Live QR Code (Never Expires)

> **Destination URL:** [`https://share.google/gZUSXx8DAtgWuPtb5`](https://share.google/gZUSXx8DAtgWuPtb5)  
> **Cost:** 100% Free Forever (Zero Subscriptions, Zero Credit Cards)  
> **Hosting:** Ready to deploy to **Vercel** in 1 click.

---

## ⚡ The Solution: Why This QR Code NEVER Expires

Commercial QR code generator websites (like `qr-code-generator.com`, `me-qr`, `beaconstac`) route your QR codes through their own proprietary domain names, give you a **14-day free trial**, and then disable your QR code until you pay **$15 – $35/month**.

This project solves that problem permanently through two 100% free options:

### Option 1: Direct Permanent QR Code (Mathematical Zero-Server)
* **How it works:** The QR code directly encodes `https://share.google/gZUSXx8DAtgWuPtb5` into the black-and-white pixel matrix.
* **Why it never expires:** Standard QR codes are an international standard (ISO/IEC 18004). They do **not** depend on any third-party company or middleman server. As long as Google's servers are online, this QR code will scan and open your link forever.
* **Pre-generated ready files:**
  * `qr-direct-hd.png` (2000×2000 px, Ultra-HD, 300 DPI ready for professional printing on flyers, banners, stickers)
  * `qr-direct.svg` (Scalable Vector Graphic, infinite resolution for Adobe Illustrator, Canva, Figma)
  * `qr-direct.png` (800×800 px, web-friendly)

### Option 2: Vercel Dynamic QR Code (Self-Hosted Redirect)
* **How it works:** The QR code points to your own free Vercel domain (e.g. `https://your-project.vercel.app/go`). Vercel's global Edge CDN redirects visitors to `https://share.google/gZUSXx8DAtgWuPtb5` in under 15 milliseconds.
* **Why it's powerful:** If you print 5,000 flyers or business cards, and 1 year later you want to change where the QR code points, you **don't need to reprint anything**. You just change 1 line of configuration on Vercel, and all existing printed QR codes now forward to your new destination!
* **Why it's free forever:** Vercel's Hobby Tier is free forever with 100GB monthly bandwidth and millions of edge invocations with no expiration date.

---

## 🚀 How to Deploy to Vercel for Free (Step-by-Step)

### Method A: Using GitHub & Vercel Dashboard (Easiest)

1. **Push this project to a GitHub repository:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of permanent QR redirect"
   # Create a free repository on https://github.com/new and run:
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   * Go to [https://vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
   * Click **Import** next to your new repository.
   * Leave all default settings as they are (Framework: *Other*, Root Directory: `./`).
   * Click **Deploy**.

3. **Done!**
   * Vercel will give you a free permanent live URL like `https://my-qr-link.vercel.app`.
   * Your dynamic scan link is: `https://my-qr-link.vercel.app/go`.

---

### Method B: Using Vercel CLI (Fastest from Terminal)

Run the following command directly in this folder:

```powershell
npx vercel
```

Follow the prompts (choose default options). It will give you a live production URL immediately!

---

## ⚙️ How to Change the Destination Link in the Future

If you use the Vercel Dynamic QR Code and ever want to update the destination URL without reprinting your QR codes, you have two simple choices:

### Choice 1: Via Vercel Environment Variable (No Code Edits)
1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Settings** > **Environment Variables**.
3. Add a new variable:
   * **Key:** `DESTINATION_URL`
   * **Value:** `https://your-new-link.com`
4. Click **Save** and trigger a redeploy. All scans will immediately redirect to the new link!

### Choice 2: Via `vercel.json`
Edit `vercel.json` in this project:
```json
{
  "redirects": [
    {
      "source": "/go",
      "destination": "https://your-new-link.com",
      "permanent": false
    }
  ]
}
```
Commit and push to GitHub. Vercel will auto-update in seconds.

---

## 💻 Local Testing & Generating Custom QR Codes

To view the interactive dashboard locally:
```powershell
npm start
```
Then open `http://localhost:3000` in your web browser.

To regenerate high-resolution print files:
```powershell
npm run generate
```

---

## 📂 Project Structure

```
├── api/
│   └── go.js               # Serverless edge function redirect with env var support
├── go/
│   └── index.html          # Static HTML fallback redirect
├── r/
│   └── index.html          # Short URL fallback redirect
├── index.html              # Interactive QR Hub & Customizer
├── vercel.json             # Vercel edge redirection rules & security headers
├── qr-direct-hd.png        # 2000x2000 Ultra-HD Print PNG
├── qr-direct.svg           # Infinite resolution vector SVG
├── qr-direct.png           # 800x800 Web PNG
├── generate-qr.js          # Generator script
├── qrcode.min.js           # Client-side QR engine (offline capable)
└── package.json
```
