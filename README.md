# Qiskit Fall Fest 2026 — MPSTME

Event site for **IBM Qiskit Fall Fest 2026** hosted at Mukesh Patel School of
Technology Management & Engineering (SVKM's NMIMS), Mumbai, by the Department of
Information Technology in association with CSI@MPSTME.

**23 – 25 October 2026** · Free · Hybrid · Open to students across India

## What's here

```
index.html        the entire site — HTML, CSS and JS in one file
assets/           images referenced by index.html
```

No framework, no build step, no dependencies. Open `index.html` in a browser and
it works. The only external request is Google Fonts (Archivo, IBM Plex Sans,
IBM Plex Mono).

## Running it locally

```
python3 -m http.server 4321
```

Then open http://localhost:4321

## Deploying

It is a static site, so any static host works. Cloudflare Pages or GitHub Pages
are both free:

- **Cloudflare Pages** — connect this repo, leave the build command empty and set
  the output directory to `/`.
- **GitHub Pages** — Settings → Pages → deploy from branch `main`, folder `/root`.

## Assets

| File | Notes |
|---|---|
| `bird-*.png` | Bird illustrations taken from the official Qiskit Fall Fest 2026 poster |
| `venue-map.jpg` | Static map built from OpenStreetMap tiles. **The "© OpenStreetMap contributors" credit on the page is required by the ODbL licence — do not remove it.** |
| `logo-csi.png` | CSI@MPSTME logo |
| `og-image.png` | Social preview card (1200×630) |

## Still to do

- [ ] Replace the placeholder Qiskit Fall Fest badge in the hero with the official
      vector mark from IBM's Fall Fest host kit
- [ ] Swap the bird PNGs for vectors if the host kit provides them
- [ ] Fill in the Speakers section once the lineup is confirmed
- [ ] Confirm session times — the schedule is currently marked provisional
- [ ] Point `og:image` at an absolute URL once the domain is live

## Credits

Qiskit and Qiskit Fall Fest are IBM marks. This event is organised by CSI at MPSTME.
