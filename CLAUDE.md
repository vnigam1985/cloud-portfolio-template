# Instructions for Claude

You are helping someone build their personal portfolio from this template.
Read this whole file before you change anything.

## The one rule about content

Every word on the site comes from **`src/portfolio.config.ts`**. The shape of that file is defined in `src/types.ts`.
Only edit the config, plus files in `public/media/`, unless the person asks for a design change.

## Job 1: Fill the site from a resume

The person's resume is in `resume/` (PDF, DOCX, TXT or MD). If it is not there, ask them to upload or paste it.

1. **Read the resume fully.** Also ask for anything a resume rarely has, in one short list:
   - LinkedIn, GitHub and any other links
   - 2 to 4 projects they are proud of, with a link if public
   - 3 to 6 numbers they are proud of, for the "Proud moments" section
   - Their first name as it should appear huge behind the hero
2. **Fill `src/portfolio.config.ts`** section by section:
   - `site`: title, description, logo (their name), keep `showCredit` as it is.
   - `hero`: an eyebrow with role and focus, a short title with one word in `*asterisks*`, a 1 to 2 sentence intro, and 2 quick facts.
   - `about`: a 3-paragraph story in first person, 4 to 5 facts, and badge text.
   - `experience`: every role from the last 10 to 12 years in `jobs`, newest first. Older roles go in `earlier`. Education goes in `education`.
   - `skills`: 5 to 7 groups, 20 to 32 elements. Use real tools from the resume only. Give the strongest ones a short `note`.
   - `certifications`, `projects`, `moments`, `contact`.
3. **Writing rules:**
   - Use only facts from the resume or from the person. Never invent employers, dates, numbers, certifications or results. If a number is missing, write the sentence without it.
   - Rewrite resume bullets into plain, active sentences. Lead with the result. One idea per bullet.
   - Keep each job to 2 to 6 highlights. Put the strongest first, because only 3 show before "Show more".
   - Do not put the person's phone number, home address, date of birth or ID numbers anywhere on the site.
   - If they worked for a client through a consultancy and want the client unnamed, describe it the way they do (for example "a Big 5 Canadian bank").
   - Element `symbol`s must be 1 or 2 characters and unique. Every element `group` must match a `groups[].id`.
4. **Check your work:** run `npm install` once, then `npm run build`. It must finish with no errors. Fix any type errors in the config.
5. **Show the person a short summary** of what you filled in and what you left as an example, so they can review it.

## Job 2: Create the animated hero (optional)

Ask which path they want. Both are explained for humans in `README.md`, section "Create your animated hero".

- **Path 1, animated image:** a 3D cartoon of them.
- **Path 2, talking video:** the cartoon, lip-synced to their voice.

If the person gives you a fal.ai key, you can run the models for them:

1. Put it in `.env` as `FAL_KEY=...`. `.env` is git-ignored. Never print the key, and never commit it.
2. **Cartoon:** call `fal-ai/nano-banana-pro/edit` with `image_urls` (full-body photo first, headshot second), the Path 1 prompt from the README, `aspect_ratio: "3:4"`, `resolution: "2K"`, `output_format: "jpeg"`, `num_images: 2`. Show both and let them pick. Save the pick as `public/media/hero.jpg`.
3. **Voice:** use a recording they give you, or, if they give you an ElevenLabs key and voice ID, generate the script with ElevenLabs text-to-speech.
4. **Talking video:** call `fal-ai/kling-video/ai-avatar/v2/pro` with `image_url` (the cartoon), `audio_url` (the voice) and the Path 2 prompt from the README. Save it as `public/media/hero.mp4`.
5. Optional, if `ffmpeg` is installed: shrink the MP4 and make the transparent WebM with the commands in the README, section "Optional extras for Path 2".
6. Set `hero.video` and `hero.poster` in the config.

Tell the person what each call will cost before you run it, and get a yes.
If a model refuses a real photo, make the cartoon first and animate the cartoon.

## Job 3: Publish

1. Commit with a clear message and push to `main`.
2. GitHub Pages must use **Settings > Pages > Source > GitHub Actions**. If you have the GitHub CLI and permission, you can set it with:
   `gh api -X POST repos/OWNER/REPO/pages -f build_type=workflow` (or `-X PUT` if Pages already exists).
   Otherwise, ask the person to change that setting. Without it, the site shows raw code.
3. Wait for the "Deploy to GitHub Pages" run to finish, then open the site and check it loads.

## Do not

- Do not commit anything from `resume/` except its README. It is git-ignored on purpose, because resumes hold phone numbers and addresses.
- Do not commit `.env` or any API key.
- Do not remove the MIT license or the credit in `README.md`. The footer credit on the site can be turned off with `site.showCredit: false`.
