# Visual Design Document: The Oligarch's Gambit

## 1. Art Direction & Style
**Theme:** "Gilded Decay"
The visual style should reflect the themes of extreme wealth, paranoia, and political decline. It should feel expensive but slightly "off"—like a luxury hotel room where a crime has just been committed.

*   **Genre:** Political Thriller / Satire / Noir.
*   **Technique:** Digital painting with a texture of oil on canvas or heavy grain. Not photorealistic, but "heightened reality."
*   **Color Palette:**
    *   **Gold (#D4AF37):** Used for wealth, success, and the UI accents.
    *   **Deep Red (#8B0000):** For war, anger, and crisis.
    *   **Slate/Midnight Blue (#0F172A):** The background, representing the shadows and the unknown.
    *   **Concrete Grey:** For the brutalist architecture and state apparatus.
*   **Lighting:** Chiaroscuro—strong contrasts between light and dark. Faces often half-shadowed.

## 2. Technical Specifications
*   **Card Aspect Ratio:** Vertical Portrait (~5:7 ratio).
*   **Canvas Resolution:** 512px (width) x 716px (height).
*   **File Format:** `.png` (preferred for quality) or `.webp` (for performance).
*   **File Naming Convention:**
    *   Storylines: `assets/images/storylines/{storyline-id}.png`
    *   Events: `assets/images/events/{event-id}.png`

## 3. Asset Plan

### A. Storyline Cover Images (10 Assets)
These serve as the default fallback for any event within a storyline that lacks a specific image. They establish the mood of that narrative arc.

| Storyline ID | Description | Visual Concept |
| :--- | :--- | :--- |
| **common** | Everyday governance | A view of the Kremlin/Palace from a distance, snowy weather. |
| **early-game-agenda** | Setting the stage | A heavy mahogany desk with a single red phone and a ticking clock. |
| **special-operation** | War and Hubris | Tanks moving through a muddy field at dusk; smoke on the horizon. |
| **dissident** | Internal opposition | A lone figure standing before a line of riot police; flare light. |
| **holy-alliance** | Church & State | Gold Orthodox domes shining against a dark, stormy sky. |
| **golden-circle** | Oligarch Wealth | A superyacht docked in a Mediterranean harbor; champagne on a table. |
| **succession** | Dynasty | Shadows of three figures arguing behind a frosted glass door. |
| **loyalty-apparatus** | Paranoia | A security camera feed or a dimly lit interrogation room. |
| **economic-vision** | Future Planning | A brutalist factory or a futuristic server farm in a snowy field. |
| **stubs** | Dev/Test | A blueprint or construction site. |

### B. Early Event Cards (16 Assets)
Unique images for the specific cards that appear in the first few turns (Year 1).

**From `early-game-agenda.storyline.js` (5 Events):**
| Event ID | Title | Visual Concept |
| :--- | :--- | :--- |
| `dacha_summit` | The Dacha Summit | A fireplace, four armchairs, glasses of vodka/whiskey. Intimate but tense. |
| `first_big_move` | The First Big Move | A hand hovering over a large map or a document ready to be signed. |
| `inaugural_address` | The Inaugural Address | View from behind the podium looking out at a sea of cameras/microphones. |
| `five_year_plan` | The Five-Year Plan | Technocrats arguing over a chart; an oligarch checking his watch. |
| `aluminum_king_introduction` | The Aluminum King | Close up of a luxury watch (Patek) being slid across a desk. |

**From `common.storyline.js` (11 Events):**
| Event ID | Title | Visual Concept |
| :--- | :--- | :--- |
| `tax_haven_crackdown` | Offshore Crackdown | A bank vault door closing or documents being shredded. |
| `brain_drain` | The Exodus | A departure gate at an airport, crowded with young professionals. |
| `university_protests` | Student Unrest | Students holding signs; OMON (riot police) helmets in foreground. |
| `arms_deal_opportunity` | The African Market | Crates of Kalashnikovs being loaded onto a cargo plane. |
| `infrastructure_project` | The New Highway | Construction cranes against a sunset; a half-finished bridge. |
| `official_residence` | Renovations | Blueprints of a palace with gold leaf samples overlaying them. |
| `quiet_quarter` | A Quiet Quarter | A peaceful view of a birch forest through a rain-streaked window. |
| `state_media_puff_piece` | The Interview | A TV camera lens focused on the President (player), makeup being applied. |
| `corruption_investigation_leak` | Leaked Investigation | A YouTube/video player interface showing a drone shot of a mansion. |
| `diplomatic_incident_minor` | Embassy Spat | A diplomat being handed a passport/stamped document; tense faces. |
| `birthday_celebration` | Your Birthday | A lavish cake with too many candles; elderly men clapping. |

## 4. Implementation Status
*   **Rendering Code:** `index.html` already contains the logic to render these images (`createEventTexture`).
*   **Logic:**
    1.  Checks `event.image` property.
    2.  Checks `assets/images/events/{id}.png`.
    3.  Checks Storyline fallback map.
    4.  Falls back to `palace.png`.
*   **Action Item:** We need to generate/source these 26 images and place them in `assets/images/events/` and update the `storylineImages` map in `index.html` to point to the new storyline covers.


