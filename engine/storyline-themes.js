/**
 * Event System 2.0 - Storyline Themes
 * 
 * Visual theming for storylines in the frontend
 */

/**
 * Storyline theme definitions
 */
const STORYLINE_THEMES = {
    "war-invasion": {
        icon: "⚔️",
        label: "War",
        color: "#8B0000",
        gradient: "linear-gradient(135deg, #2b0505 0%, #5e0a0a 100%)",
        borderColor: "#ff4444"
    },
    "sanctions-spiral": {
        icon: "🚫",
        label: "Sanctions",
        color: "#4A5568",
        gradient: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
        borderColor: "#a0aec0"
    },
    "oligarch-rivalry": {
        icon: "👑",
        label: "Intrigue",
        color: "#7B2CBF",
        gradient: "linear-gradient(135deg, #240046 0%, #3c096c 100%)",
        borderColor: "#9d4edd"
    },
    "succession-crisis": {
        icon: "🗡️",
        label: "Succession",
        color: "#C1121F",
        gradient: "linear-gradient(135deg, #4a0404 0%, #780000 100%)",
        borderColor: "#c1121f"
    },
    "popular-uprising": {
        icon: "🔥",
        label: "Uprising",
        color: "#E63946",
        gradient: "linear-gradient(135deg, #370617 0%, #6a040f 100%)",
        borderColor: "#ff0a54"
    },
    "domestic-crisis": {
        icon: "🏛️",
        label: "Crisis",
        color: "#F77F00",
        gradient: "linear-gradient(135deg, #5d2e00 0%, #914200 100%)",
        borderColor: "#ff9100"
    },
    "energy-politics": {
        icon: "⚡",
        label: "Energy",
        color: "#FFB627",
        gradient: "linear-gradient(135deg, #422a00 0%, #7a5200 100%)",
        borderColor: "#ffcc00"
    },
    "shadow-war": {
        icon: "🕵️",
        label: "Shadow War",
        color: "#000000",
        gradient: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        borderColor: "#444444"
    },
    "religious-revival": {
        icon: "⛪",
        label: "Orthodoxy",
        color: "#FFD700",
        gradient: "linear-gradient(135deg, #3d2b00 0%, #664d00 100%)",
        borderColor: "#ffd700"
    },
    "cultural-purge": {
        icon: "🎭",
        label: "Culture",
        color: "#FF69B4",
        gradient: "linear-gradient(135deg, #8b0046 0%, #c71585 100%)",
        borderColor: "#ff69b4"
    },
    "ai-dictator": {
        icon: "🤖",
        label: "Cyber",
        color: "#00FFFF",
        gradient: "linear-gradient(135deg, #003333 0%, #005555 100%)",
        borderColor: "#00ffff"
    }
};

/**
 * Gets theme for a storyline
 * @param {string} storylineId - Storyline ID
 * @returns {Object|null} - Theme object or null
 */
function getStorylineTheme(storylineId) {
    return STORYLINE_THEMES[storylineId] || null;
}

/**
 * Gets themes for multiple storylines
 * @param {string[]} storylineIds - Array of storyline IDs
 * @returns {Object[]} - Array of theme objects
 */
function getStorylineThemes(storylineIds) {
    if (!Array.isArray(storylineIds) || storylineIds.length === 0) {
        return [];
    }

    return storylineIds
        .map(id => getStorylineTheme(id))
        .filter(theme => theme !== null);
}

/**
 * Gets primary theme (first storyline)
 * @param {string[]} storylineIds - Array of storyline IDs
 * @returns {Object|null} - Primary theme or null
 */
function getPrimaryTheme(storylineIds) {
    if (!Array.isArray(storylineIds) || storylineIds.length === 0) {
        return null;
    }

    return getStorylineTheme(storylineIds[0]);
}

/**
 * Formats storyline badges for display
 * @param {string[]} storylineIds - Array of storyline IDs
 * @returns {string} - HTML string with badges
 */
function formatStorylineBadges(storylineIds) {
    if (!Array.isArray(storylineIds) || storylineIds.length === 0) {
        return '';
    }

    const themes = getStorylineThemes(storylineIds);
    if (themes.length === 0) {
        return '';
    }

    const primary = themes[0];
    const secondary = themes.slice(1);

    let html = `<span class="storyline-badge primary" style="background: ${primary.color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; margin-right: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${primary.icon} ${primary.label}</span>`;

    secondary.forEach(theme => {
        html += `<span class="storyline-badge secondary" style="background: rgba(255,255,255,0.1); color: ${theme.color}; padding: 2px 6px; border-radius: 3px; font-size: 0.75em; margin-right: 4px; border: 1px solid ${theme.color};">${theme.icon} ${theme.label}</span>`;
    });

    return html;
}

export {
    STORYLINE_THEMES,
    getStorylineTheme,
    getStorylineThemes,
    getPrimaryTheme,
    formatStorylineBadges
};
