// Vercel Serverless Function to redirect dynamically
// Supports environment variable DESTINATION_URL if you ever want to change it via Vercel dashboard

export default function handler(req, res) {
  const targetUrl = process.env.DESTINATION_URL || 'https://share.google/gZUSXx8DAtgWuPtb5';
  
  // Set cache headers so edge caches for fast responses but revalidates
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  
  // 307 Temporary Redirect: ensures browsers do not permanently cache in case you change the destination later
  return res.redirect(307, targetUrl);
}
