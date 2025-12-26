# Visual Design Document: Event & Storyline Imagery

## 1. Objective
Enhance the visual immersion of *The Oligarch's Gambit* by implementing a consistent visual style for event cards. This involves creating unique, high-quality images for each key "Early Game Agenda" event and ensuring every major storyline has a distinct, thematic visual identity.

## 2. Visual Style Guide

*   **Aesthetic:** Dark, gritty, contemporary political thriller. High contrast, cinematic lighting.
*   **Tone:** Serious, consequential, slightly cynical.
*   **Color Palette:** Muted, desaturated tones with strong, specific accent colors corresponding to the storyline themes (e.g., Gold for Oligarchs, Red for War, Cold Blue for Tech).
*   **Composition:**
    *   **Format:** Vertical rectangular (Card Portrait).
    *   **Focus:** Center-weighted or Rule of Thirds. Clear silhouette even at smaller sizes.
    *   **Subject Matter:** Political figures in shadow (faces often obscured or generic), monumental architecture (Brutalist/Neo-Classical), symbolic objects (briefcases, phones, military hardware), crowds seen from a distance. Avoid cartoonish exaggeration; aim for "concept art" realism.

## 3. Asset Requirements

### A. Early Game Agenda Events (Unique Art)
These events set the stage for the entire game and require unique, specific imagery.

| Event ID | Title | Visual Concept | Tone |
| :--- | :--- | :--- | :--- |
| `dacha_summit` | **The Dacha Summit** | A roaring fireplace in a dim, wood-paneled room. Leather armchairs, a crystal decanter of vodka, cigar smoke. Faces in shadow. | Conspiratorial, Elite |
| `first_big_move` | **The First Big Move** | A large tactical map table in a war room. Hands pointing at a map. Generals and advisors in blurred background. | Decisive, Tense |
| `inaugural_address` | **The Inaugural Address** | View from *behind* a podium looking out at a massive, blurred crowd or a grand hall. Microphone in foreground. | Grandiose, Public |
| `aluminum_king_introduction` | **The Aluminum King** | A close-up of a handshake, or a luxury watch (Patek Philippe style) resting on a mahogany desk next to a file. | Transactional, Wealthy |
| `five_year_plan` | **The Five-Year Plan** | A split composition or double exposure: a factory silhouette and a microchip/server rack. Or a graph trending sharply in one direction. | Industrial, Strategic |

### B. Storyline Thematic Images
Each storyline needs a fallback image that captures its core theme.

| Storyline ID | Current Asset (to map) | New Concept (if needed) |
| :--- | :--- | :--- |
| `special-operation` | `war-invasion.png` | Soldiers in winter gear, tanks in snow. |
| `golden-circle` | `oligarch-rivalry.png` | Superyacht at night, or a bank vault door. |
| `dissident` | `popular-uprising.png` | Riot police shield wall facing flares/smoke. |
| `holy-alliance` | `religious-revival.png` | Gold Orthodox domes against a grey sky, or a priest's robes. |
| `succession` | `succession-crisis.png` | A vacant throne or an empty presidential desk. |
| `loyalty-apparatus` | `shadow-war.png` | Surveillance cameras, redacted documents, or a man in a trench coat. |
| `economic-vision` | `sanctions-spiral.png` | Stock ticker crashing, or a pipeline valve. |
| `early-game-agenda` | *New Needed* | A presidential seal, a pen signing a decree. |
| `common` | *New Needed* | A bleak city skyline, Soviet-era apartment blocks. |

## 4. Technical Implementation Plan

### Updates to `index.html`
1.  **Event-Specific Lookup:** Modify `createEventTexture` to check for a specific image file based on `event.id` *before* checking for the storyline image.
    *   Path: `assets/images/events/{event.id}.png`
2.  **Storyline ID Mapping:** Update the `storylineImages` object to map the *actual* storyline IDs (from `storylines/index.js`) to the existing (and new) filenames.
    *   Map `special-operation` -> `war-invasion.png`
    *   Map `golden-circle` -> `oligarch-rivalry.png`
    *   etc.

### File Structure
*   Keep general storyline images in `assets/images/`.
*   Keep specific event images in `assets/images/events/`.

## 5. Summary of Work
*   **Total New Images Needed:** 5 (Events) + 2 (Storylines: Common, Early Game) = **7 Images**.
*   **Code Changes:** Minor logic update in `index.html` to support the new mapping and event-specific overrides.

