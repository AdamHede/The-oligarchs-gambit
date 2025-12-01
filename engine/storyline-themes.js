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
        gradient: "linear-gradient(135deg, #1a0000 0%, #3d0000 100%)"
    },
    "sanctions-spiral": {
        icon: "🚫",
        label: "Sanctions",
        color: "#4A5568",
        gradient: "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)"
    },
    "oligarch-rivalry": {
        icon: "👑",
        label: "Intrigue",
        color: "#7B2CBF",
        gradient: "linear-gradient(135deg, #3d1a5f 0%, #5a189a 100%)"
    },
    "succession-crisis": {
        icon: "🗡️",
        label: "Succession",
        color: "#C1121F",
        gradient: "linear-gradient(135deg, #6b0f1a 0%, #8b0e1f 100%)"
    },
    "popular-uprising": {
        icon: "🔥",
        label: "Uprising",
        color: "#E63946",
        gradient: "linear-gradient(135deg, #8b1e2a 0%, #c1121f 100%)"
    },
    "domestic-crisis": {
        icon: "🏛️",
        label: "Crisis",
        color: "#F77F00",
        gradient: "linear-gradient(135deg, #8b4a00 0%, #c66300 100%)"
    },
    "energy-politics": {
        icon: "⚡",
        label: "Energy",
        color: "#FFB627",
        gradient: "linear-gradient(135deg, #8b5f00 0%, #c68a00 100%)"
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

    let html = `<span class="storyline-badge primary" style="background: ${primary.gradient}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; margin-right: 4px;">${primary.icon} ${primary.label}</span>`;

    secondary.forEach(theme => {
        html += `<span class="storyline-badge secondary" style="background: rgba(255,255,255,0.1); color: ${theme.color}; padding: 2px 6px; border-radius: 3px; font-size: 0.75em; margin-right: 4px; border: 1px solid ${theme.color};">${theme.icon} ${theme.label}</span>`;
    });

    return html;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STORYLINE_THEMES,
        getStorylineTheme,
        getStorylineThemes,
        getPrimaryTheme,
        formatStorylineBadges
    };
}

