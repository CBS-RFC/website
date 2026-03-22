# Design System Strategy: Collegiate Kineticism

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Elite Editorial."** 

This system rejects the "standard athletic template" in favor of a high-end, bespoke digital experience that merges the raw, intimidating power of the All Blacks with the refined, institutional prestige of Columbia Business School. We achieve this through **Kinetic Precision**: a layout strategy that uses intentional asymmetry, oversized typography, and a "No-Line" philosophy to create a sense of forward motion and professional authority. 

Instead of rigid grids, we use layered surfaces and "breathing" white space to guide the eye. Every element should feel like it was placed with the intent of a strategic rugby play—precise, impactful, and confident.

---

## 2. Colors & Tonal Depth
Our palette is rooted in heritage but executed with modern depth. We avoid flat, "MS Paint" style fills by using a sophisticated hierarchy of surfaces.

### The Palette
- **Primary Tier:** `primary` (#002241) and `primary_container` (#003865). These represent the "Deep Navy" of the elite blazer.
- **Action Tier:** `tertiary_container` (#C9A84C) and `tertiary` (#755B00). This Warm Gold is reserved strictly for conversion and "winning" moments.
- **Surface Tier:** `surface` (#FCF8F8) through `surface_container_highest` (#E5E2E1).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. High-end design conveys structure through tonal shifts. 
- To separate a "Match Report" from the "Latest News," transition the background from `surface` to `surface_container_low`. 
- Use the `surface_container` tiers to create "zones" of content. This creates a more immersive, editorial feel than "boxing" content in.

### Signature Textures & Glass
To elevate the "All Blacks" aesthetic in hero sections (Near-black #0A0A0A):
- **The Glass Rule:** For navigation bars or floating stat cards over imagery, use `surface_container_lowest` at 60% opacity with a `backdrop-blur` of 20px. 
- **The Kinetic Gradient:** Use a subtle linear gradient from `primary` to `primary_container` (135 degrees) on large buttons and hero overlays to add "soul" and dimension.

---

## 3. Typography
Typography is our primary tool for "Athletic Energy." We use high-contrast scales to mirror the intensity of the pitch.

- **Display (Bebas Neue):** Used for "Impact Moments"—hero headlines, massive scorelines, and call-to-action headers. It must always be All-Caps. 
  - *Token:* `display-lg` (3.5rem). Use tight letter-spacing (-0.02em) to increase the "gravity" of the words.
- **Headings (Barlow Condensed):** Used for sub-navigation and section titles. It provides the "Professional Credibility" link. 
  - *Token:* `headline-md` (1.75rem). Use SemiBold to Bold weights.
- **Body & Labels (DM Sans/Manrope):** These are our workhorses for readability.
  - *Token:* `body-lg` (1rem). Ensure a line-height of 1.6 to balance the density of the bold display fonts.

**Hierarchy Tip:** Never place two "Bebas Neue" elements of similar size near each other. Use "Barlow Condensed" as the bridge to create a clear, authoritative path for the reader.

---

## 4. Elevation & Depth
We move away from the "Material 1.0" shadow-heavy look. Depth is achieved through **Tonal Layering**.

- **The Layering Principle:** Treat the UI as stacked sheets of premium cardstock. 
  - Base level: `surface`
  - Content containers: `surface_container_low`
  - Interactive cards: `surface_container_lowest`
- **Ambient Shadows:** Shadows are rare. When used (e.g., a floating "Join the Club" CTA), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 34, 65, 0.08)`. This uses a tint of our `primary` navy rather than grey, making the shadow feel like a natural reflection of the brand.
- **The "Ghost Border":** If a container sits on a background of the same color, use a 1px border with `outline_variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** High-contrast `tertiary_container` (Gold) with `on_tertiary_container` (Deep Navy) text. Sharp corners (`radius: 0px`) to communicate precision.
- **Secondary:** `primary` background with `on_primary` text. Use for secondary actions like "View Schedule."
- **States:** On hover, primary buttons should shift 2px up with an ambient shadow, mimicking an athlete "coiling" for a spring.

### Cards & Lists
- **The Anti-Divider Rule:** Forbid the use of line dividers in lists. Use `spacing-8` (1.75rem) to create separation.
- **Athlete/Player Cards:** Use a `surface_container_high` background. Images should be clipped with a sharp 0px radius. Use "Bebas Neue" for the player's number in a large, low-opacity (10%) background overlay.

### Input Fields
- Underline-only or subtle "Ghost Border" containers. Use `surface_variant` for the fill. When focused, the bottom border should animate to `secondary` (Columbia Blue).

### Editorial Stats Component (Signature)
- Large `display-lg` numbers in `primary` Navy. 
- Accompanying label in `label-md` Barlow Condensed, All-Caps, tracked out (letter-spacing: 0.1em).

---

## 6. Do’s and Don’ts

### Do:
- **Use Intentional Asymmetry:** Let an image bleed off the right edge of the screen while text is centered left. It feels kinetic.
- **Embrace White Space:** High-end brands aren't afraid of "empty" space. Use the `spacing-24` token between major sections.
- **Maintain High Contrast:** Ensure `on_primary` text always sits on its designated container. Legibility is non-negotiable for professional credibility.

### Don’t:
- **No Rounded Corners:** This design system uses `0px` radius for everything. Rounded corners feel "friendly/consumer," whereas sharp corners feel "elite/architectural."
- **No Default Drop Shadows:** Never use `rgba(0,0,0,0.5)`. It looks cheap and dated. 
- **No Generic Icons:** Avoid thin, wispy icons. Use thick, geometric icons that match the weight of the Barlow Condensed typeface.