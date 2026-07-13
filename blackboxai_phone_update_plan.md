# Edit Plan: Update hero phone images

## Information Gathered
- `src/components/landing/hero-section.tsx` renders the phone “hero” mock with an array named `appScreenshots`.
- Those screenshots are currently remote URLs (Vercel blob links).
- The app expects static assets under the Vite public path using URLs like `/images/...`.
- `dist/images/phone` does not appear available in the current workspace at `c:/xampp/htdocs/fitiva web/dist/images/phone` (tool reported none).
- Existing local landing assets are under `public/images/landing/` (e.g., `hero-bg.png`).

## Plan
1. Locate the new phone images in the existing workspace or copy them into a Vite-public directory.
   - Preferred: put them under `public/images/phone/` so they can be referenced as `/images/phone/<file>`.
2. Update `src/components/landing/hero-section.tsx`:
   - Replace `appScreenshots` remote URLs with local URLs: `/images/phone/<filename>`.
   - Keep same number of frames as the new images (or map all discovered names).
3. (If needed) Add a deterministic naming convention mapping.
4. Build / run to verify:
   - hero section loads and cycles through the new images without 404s.

## Dependent Files to be edited
- `src/components/landing/hero-section.tsx`
- (Potentially) add/copy images into `public/images/phone/`.

## Followup steps
- Run `npm run build` (or start dev server) and verify network tab for `/images/phone/` 200 responses.

<ask_followup_question>
Confirm whether the new images from `C:\xampp\htdocs\fitiva web\dist\images\phone` are currently present in your project folder (and what their filenames are), or should I copy them into `public/images/phone/` first.
</ask_follow_followup_question>

