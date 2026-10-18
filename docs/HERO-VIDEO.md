# Make your talking hero video

The hero shows you standing in the middle of the page, with your name huge behind you.
You have three options. Start with A, upgrade later.

| Option | Time | Cost | Look |
|---|---|---|---|
| A. Still photo | 10 min | Free | Your cut-out photo, gently floating |
| B. Animated you (recommended) | 30 min | About $1 to $5 | A 3D cartoon of you that waves and talks in your voice |
| C. Real video of you | 30 min | Varies | Photoreal. Many AI video tools refuse real-person photos, so B is easier |

---

## Option A: Still photo

1. Take a photo standing, waist-up or full body, against a plain wall.
2. Remove the background (remove.bg or Canva's background remover). Download as **PNG**.
3. Save it as `public/media/hero.png`.
4. In `src/portfolio.config.ts`, set `poster: 'media/hero.png'`.

---

## Option B: Animated you, talking in your voice

This is how the demo site was made. All three tools below have pay-as-you-go plans.
Prices change, so check each site before you start.

### Step 1. Turn your photo into a 3D character
Use any AI image editor that accepts a reference photo (for example Nano Banana Pro on fal.ai, or ChatGPT image editing).
Upload one full-body photo and one clear headshot, then use this prompt:

```
Turn the person in the first photo into a stylized 3D animated character, like a modern
animated feature film. Keep the likeness clearly recognizable: same face shape, hairline,
skin tone and expression. Same outfit: [describe your outfit].
Full body, standing upright, centered, facing the camera, relaxed confident pose,
hands loosely in pockets. Slightly stylized, soft clean shading, professional, not childish.
Background: plain pure white (#FFFFFF), seamless, no floor line, no shadow on the background.
No text, no logos, no props. Portrait 3:4.
```

Generate 2 to 4 options and pick the one that looks most like you.

### Step 2. Record your voice line
Keep it to about 8 seconds:

```
Hi, I'm [Name]. I build [what you build]. Scroll down, let me show you.
```

Record it on your phone, or use a voice clone (ElevenLabs works well).
Save it as an MP3.

### Step 3. Make the character talk
Use a talking-avatar model that takes an image plus audio and lip-syncs them.
The demo used **Kling AI Avatar v2 Pro** on fal.ai (about $1 for 8 seconds).
Upload your character image and your MP3, with this prompt:

```
The animated character stands centered on a pure white background and talks warmly to the
camera. Small friendly wave at the start, then relaxed natural hand gestures.
Static camera, no zoom, no cuts. Background stays pure white.
```

### Step 4. Prepare the files for the site
You need [ffmpeg](https://ffmpeg.org) installed. Run these from the project folder.
Replace `input.mp4` with your downloaded video.

**Solid version (works everywhere, required).** This turns the white background into the page colour, `#F7F6F2`:

```bash
ffmpeg -i input.mp4 -vf "colorlevels=rimax=0.965:gimax=0.965:bimax=0.965,lutrgb=r='if(gt(val,250),247,val)':g='if(gt(val,250),246,val)':b='if(gt(val,250),242,val)',scale=-2:1280,format=yuv420p" -c:v libx264 -crf 25 -c:a aac -movflags +faststart public/media/hero.mp4
```

**Transparent version (optional, recommended).** Chrome, Edge, Firefox and Android use this,
so your name shows around you. Safari and iPhone automatically use the solid version:

```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]colorlevels=rimax=0.965:gimax=0.965:bimax=0.965,scale=-2:1280,format=rgba,colorkey=0xFFFFFF:0.10:0.08,format=yuva420p[v]" -map "[v]" -map 0:a -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 34 -auto-alt-ref 0 -c:a libopus public/media/hero.webm
```

**Poster frames** (shown while the video loads):

```bash
ffmpeg -i public/media/hero.mp4 -frames:v 1 public/media/hero-poster.jpg
```

### Step 5. Turn it on
In `src/portfolio.config.ts`:

```ts
video: 'media/hero.mp4',
poster: 'media/hero-poster.jpg',
videoTransparent: 'media/hero.webm',   // optional
posterTransparent: '',                 // optional, a transparent .webp or .png
```

Save. Done. Visitors can tap "Tap for sound" to hear your voice.

---

## Troubleshooting

- **A box shows around me:** your video background is not pure white. Re-generate it, or raise the `colorkey` similarity from `0.10` to `0.15`.
- **Grey or white halo around my hair:** lower the `colorkey` similarity to `0.06`.
- **The video won't autoplay on iPhone:** it must start muted. The site already does this.
- **The file is large:** raise `-crf` (for example 28 for MP4, 38 for WebM). Aim for under 2 MB.
