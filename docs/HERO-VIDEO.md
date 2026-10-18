# Make your talking hero video

The hero shows you standing in the middle of the page, with your name huge behind you.
The site makes any **white** in your video blend into the page. So the one rule is:
**your video must be on a pure white background.**

You can skip the video and use a still photo first. The site gently animates it.

---

## Option A: Still photo (10 minutes)

1. Take a photo standing, waist-up or full body, against a plain wall.
2. Remove the background. Free options: remove.bg or Canva's background remover.
3. Download it as a **PNG** (transparent background).
4. Save it as `public/media/hero.png`.
5. In `src/portfolio.config.ts`, set `poster: 'media/hero.png'`.

## Option B: Talking video (30 to 60 minutes)

### Step 1. Prepare your photo
- Remove the background and put yourself on **pure white** (`#FFFFFF`).
- If your photo cuts off at the waist and you want full body, extend it first with an AI "expand" tool (Canva Magic Expand, or similar).

### Step 2. Generate the video
Use any AI image-to-video tool. Popular ones include Kling, Google Veo, Runway, and HeyGen (HeyGen is best if you want your lips to match a script). Features and pricing change often, so check their sites.

Upload your white-background photo and use this prompt. Replace the parts in [brackets].

```
Use the attached photo as the exact person. Keep the face, hairstyle, skin tone,
and clothing ([describe your outfit]) exactly the same.

Shot: medium-full shot, person standing centered, facing the camera.
Background: pure white seamless studio background (#FFFFFF), soft even lighting,
no shadows on the background, no floor line.

Action: the person smiles, gives a small friendly wave, then talks naturally to
the camera with relaxed hand gestures, as if introducing themselves.

Camera: static, locked off. No zoom, no pan, no cuts.
Length: 8 seconds. End in the same pose as the start so it loops smoothly.
Style: photorealistic. No text, no logos, no captions.
```

If your tool supports a script for lip sync, keep it short:

```
Hi, I'm [Name]. I build [what you build]. Scroll down, let me show you.
```

### Step 3. Shrink the file
Keep the video under about 5 MB so the page loads fast on phones.
If you have ffmpeg installed:

```bash
ffmpeg -i input.mp4 -vf "scale=-2:1280" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/media/hero.mp4
```

Remove `-an` if you want to keep the audio. Visitors can tap "Tap for sound".

No ffmpeg? HandBrake (free app) works too. Pick the "Web" preset.

### Step 4. Turn it on
In `src/portfolio.config.ts`:

```ts
video: 'media/hero.mp4',
poster: 'media/hero.png', // optional, shows while the video loads
```

Save. Done.

---

**Troubleshooting**

- *Grey box around me:* your background is not pure white. Re-generate, or color-correct the white to `#FFFFFF`.
- *I look cut off at the bottom:* that's on purpose. The bottom of the hero fades into the page.
- *Video won't autoplay on iPhone:* it must be muted to autoplay. The site already does this.
