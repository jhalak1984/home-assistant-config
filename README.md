# Jhalak Rai website v3 — Cloudflare Pages

This package includes the original JR banner and logo, Jhalak Rai's original unedited portrait, portfolio, homelab, six searchable blog articles with copyable snippets, 10 client-side IT tools, live DNS lookups, GitHub integration, SEO files, and a privacy-conscious contact form.

## Deploy / update
The Cloudflare Pages project `jhalakrai-website` is connected to `jhalak1984/jhalakrai-website`, builds from `main`, uses `.` as its output directory, and has automatic deployments enabled. Push changes to `main` to publish them, then verify the latest production deployment and visit `https://jhalakrai.com`.

Do not use dashboard asset-only uploads for changes that include `/functions`; static uploads do not deploy Pages Functions. The `functions/api/` directory provides `/api/dns` and `/api/contact` and must be included in a Git-connected or Wrangler deployment.

## GitHub integration
`site-config.js` is configured for the public GitHub account `jhalak1984`. Public repositories are fetched from GitHub's public API in visitors' browsers; no token is needed. Rate limits apply. Do not put secrets or employer projects on public GitHub.

The GitHub section loads all public repositories owned by this account, including forks, in pages of 100 and displays them with the most recently updated first. Private repositories are excluded.

## Live DNS
`functions/api/dns.js` provides public DNS queries via Cloudflare DNS-over-HTTPS. It validates domains, restricts record types and limits responses. Requires Pages Functions deployment.

## Contact form (not live until configured)
1. Create a Cloudflare Turnstile widget for `jhalakrai.com` and paste its **public site key** into `site-config.js` as `turnstileSiteKey`.
2. In Cloudflare Pages project → Settings → Variables and Secrets add these as **encrypted secrets** (not to your website files): `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`.
3. Add `CONTACT_TO_EMAIL` (your private inbox) and `CONTACT_FROM_EMAIL` (a verified sender on a domain configured with Resend). Resend requires verified sending-domain DNS records. These are server-side Pages environment variables.
4. Redeploy after configuring variables. Test by sending a message. If a message fails, check Pages Functions logs.
5. Cloudflare Turnstile blocks most automated spam but does not replace rate limiting. Consider Cloudflare WAF rate limiting for `/api/contact` and `/api/dns`.
6. Add a proper privacy policy before accepting public messages. Name, email and message are processed by Cloudflare and Resend to deliver the email. The site itself does not store submissions in a database.

## Visitor analytics
In Cloudflare dashboard → **Web Analytics** → add `jhalakrai.com`. If Cloudflare does not auto-inject analytics for your Pages deployment, copy the provided JavaScript beacon snippet into `index.html` before `</body>`. Do not invent a site token; use the real token Cloudflare issues. Verify visits in Cloudflare's Web Analytics dashboard.

## SEO
`robots.txt`, `sitemap.xml`, canonical metadata and Open Graph metadata are included. The sitemap lists the homepage and `hamro-patro.html`; hash fragments are not independent crawlable URLs. To rank blog posts individually, later convert each article to its own HTML path and add those URLs to the sitemap. Submit `https://jhalakrai.com/sitemap.xml` in Google Search Console once ownership is verified.

## Privacy and publishing
Your portrait is included unchanged. The homelab page omits private IPs and management endpoints. Do not upload secrets to client-side code. Confirm that you want your portrait and general professional information publicly accessible before deploying.


## New homepage redesign
The homepage now matches the requested dark/cyan two-column portfolio style, with the original Jhalak Rai photograph in a circular glowing frame. All other site sections remain. To publish, upload this ZIP to your existing Cloudflare Pages project as a production deployment.


This revision reduces the homepage circular portrait to a maximum 430px diameter on desktop, while keeping the original photograph and all site sections.


This edition uses the user-supplied cartoon avatar (`jhalak-rai-avatar.png`) in a centered hero layout.
