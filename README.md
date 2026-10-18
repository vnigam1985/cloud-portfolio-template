# Cloud Portfolio Template

A clean, black and white portfolio for **Cloud, DevOps, SRE, and Platform engineers**.
Free to use. Live on GitHub Pages in about 15 minutes.

![Preview](docs/preview.png)

**What you get**

- **Talking hero.** You, standing center screen, with your name huge behind you.
- **Flipping ID badge** on a lanyard. Tap to flip, drag to swing.
- **Periodic table of your tools.** Filter by Cloud, IaC, Containers, CI/CD, and more.
- **Certifications, projects, and "proud moments"** that scroll sideways.
- Smooth scrolling, phone friendly, and fast.
- **One file to edit.** Every word on the site lives in `src/portfolio.config.ts`.

Built with React, Vite, Tailwind CSS, Framer Motion, and Lenis.

---

## Get it live in 4 steps (no coding needed)

### 1. Make your copy
Click the green **Use this template** button at the top of this page, then **Create a new repository**.

Name it `your-github-username.github.io` and your site will live at
`https://your-github-username.github.io`.
Any other name works too. Your site will be at `https://your-github-username.github.io/repo-name/`.

### 2. Turn on GitHub Pages
In your new repo: **Settings > Pages > Source > GitHub Actions**. That's it.

### 3. Add your details
- Open `src/portfolio.config.ts` and click the pencil icon to edit it right on GitHub.
- Replace every example with your own info. Titles accept `*word*` to make a word italic serif.
- Upload your photos: open `public/media`, then **Add file > Upload files**.
  - `hero.png`: you, background removed. See [docs/HERO-VIDEO.md](docs/HERO-VIDEO.md).
  - `headshot.jpg`: a square headshot for the badge.
  - `resume.pdf`: optional.
- Point the config at them, for example `poster: 'media/hero.png'`.

### 4. Commit
Click **Commit changes**. Open the **Actions** tab and wait for the green tick (about 2 minutes).
Your site is live.

---

## Want the talking video?
Follow [docs/HERO-VIDEO.md](docs/HERO-VIDEO.md). It has the exact AI prompt to turn your photo into a talking intro, and how to keep the file small.

## Run it on your computer (optional)
You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the link it prints. Every save to the config updates the page instantly.

## Deploy to Azure instead (optional)
Good practice if you're building your Azure portfolio.

1. Azure Portal > **Create a resource > Static Web App** (the Free plan is enough).
2. Source: **GitHub**. Pick your repo and the `main` branch.
3. Build presets: **Custom**. App location: `/`. Output location: `dist`.
4. Azure adds its own workflow file to your repo and deploys.

If you use Azure only, delete `.github/workflows/deploy.yml` so GitHub Pages doesn't also try to run.

## Customize

| I want to... | Do this in `portfolio.config.ts` |
|---|---|
| Change the accent color | `site.accent` |
| Hide certifications | `certifications: []` |
| Add a skill column | add to `skills.groups`, then add elements with that `group` |
| Remove the footer credit | `site.showCredit: false` |

Want deeper changes? Each section is its own file in `src/components`.

---

## Credits
Template by **Vishal Nigam**, Azure SME and mentor for cloud engineers.
[LinkedIn](https://www.linkedin.com/in/nigam-vishal) · [Instagram @thrivewithvishal](https://www.instagram.com/thrivewithvishal/)

The footer link back here is optional. If this helped you, keeping it is a nice thank-you.

Released under the MIT License. Use it, change it, ship it.
