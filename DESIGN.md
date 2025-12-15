# Design Document: Tombala World Championship v4

**Version:** 4.0  
**Date:** 2025-12-13  
**Status:** Live Implementation  

## 1. Project Overview
"Tombala World Championship v4" is a modern, web-based adaptation of the traditional Bingo game, reimagined with a World Cup-style tournament format. It features a festive Christmas/New Year theme, high-quality animations, and a competitive "Player vs Bot" mechanic progressed through a 32-team tournament bracket.

## 2. Technical Architecture

### 2.1 Technology Stack
*   **Core:** Vanilla JavaScript (ES6+ Modules)
*   **Structure:** Semantic HTML5
*   **Styling:** CSS3 with CSS Variables (Design Tokens), Flexbox/Grid
*   **Audio:** HTML5 Audio API
*   **Environment:** Static Web Server (Python `http.server`)

### 2.2 File Structure
```
/Tombala_World_Championship_v4
├── index.html              # Main entry point, single-page application structure
├── css/
│   └── style.css           # Global styles, animations, and responsive design
├── js/
│   ├── App.js              # Main application controller (UI, Events, logic coordination)
│   ├── GameEngine.js       # Core Tombala logic (drawing numbers, card management)
│   ├── TournamentEngine.js # Tournament logic (bracket generation, match simulation)
│   ├── Effects.js          # Visual effects (Snow, Confetti)
│   ├── Modal.js            # Custom modal/alert system
│   ├── countries.js        # Data file for 128 countries (Flags, Colors, Facts)
│   └── utils.js            # Helper functions (debounce, formatters)
└── assets/                 # Audio files and static images
```

## 3. UI/UX Design

### 3.1 Design Philosophy
*   **Theme:** "Festive Tournament" - Combining the warmth of New Year celebrations (Snow, Red/Gold/Green palette) with the excitement of a sports tournament (Brackets, Flags, Stats).
*   **Glassmorphism:** Extensive use of semi-transparent backgrounds with blurs (`backdrop-filter`) to create depth.
*   **Responsiveness:** Fluid layouts adapting to desktop and tablet viewports.

### 3.2 Design Tokens (CSS Variables)
*   **Primary Colors:** Red (`#d42426`), Green (`#165b33`), Gold (`#f8b229`)
*   **Background:** Dark Blue Gradient (`#0b1026`)
*   **Typography:** 
    *   Headings: 'Mountains of Christmas' (Festive)
    *   Body: 'Roboto' (Readable)

### 3.3 Screen Flow
1.  **Country Selection:** 
    *   Grid of 128 countries.
    *   "Quick Play" (Q key) automatically selects 32 random countries.
2.  **Continent Breakdown:**
    *   Displays selected countries grouped by continent (Avrupa, Asya, Afrika, Amerika, Okyanusya).
    *   Highlights the player's chosen country.
3.  **Tournament Bracket:**
    *   Interactive visual tree of matches (Round of 32 -> Final).
    *   Shows matchups, winners, and medals.
4.  **Gameplay Arena:**
    *   **Header:** Scoreboard, Timers, Music Controls.
    *   **Board:** 9-column Tombala board with 3D animated balls.
    *   **Cards:** Player vs Bot cards, styled with country-specific colors.
5.  **Match Result:**
    *   Immediate feedback on Win/Loss with statistics.
6.  **Podium (End Game):**
    *   Gold, Silver, Bronze medal presentation.

## 4. Game Mechanics

### 4.1 Tombala Rules
*   **Bag:** Numbers 1-90.
*   **Card:** 15 numbers randomly distributed across 3 rows (5 numbers per row).
*   **Drawing:** Automatic or manual drawing of numbers.
*   **Marking:** Auto-marking of numbers on cards.
*   **Winning Conditions:**
    *   **1. Çinko:** Completing first row.
    *   **2. Çinko:** Completing second row.
    *   **Tombala:** Completing all 15 numbers (Win).

### 4.2 Tournament Logic
*   **Structure:** Single Elimination Bracket (32 Teams).
*   **Seeding:** First match always includes the Player.
*   **Progression:** Winning advances to next round; Losing eliminates.
*   **Simulation:** Matches not involving the player are simulated instantly based on random probability.

### 4.3 Difficulty Scaling
*   **Bot Intelligence:** The bot moves at a fixed automatic pace. The challenge comes from the luck of the draw and the speed of the game settings (`GAME_CONFIG`).

## 5. Key Features

### 5.1 Visual Effects
*   **Snow:** Procedural canvas-based snow animation.
*   **Confetti:** Particle system for wins and celebrations.
*   **3D Balls:** Drawn numbers rendered as spherical balls with gradients and shadows (Billiard style colors).

### 5.2 Audio System
*   **Background Music:** 5-track playlist with shuffle and volume control.
*   **Sound Effects:** Distinct sounds for Draw, Mark, Win (Applause), and Click.

### 5.3 Data & Localization
*   **Countries:** Rich dataset including native names, flags, continent, and interesting facts.
*   **Localization:** Fully localized in Turkish (UI labels, Continent names, Messages).
