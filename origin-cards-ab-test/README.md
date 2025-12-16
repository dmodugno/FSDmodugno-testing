# FamilySearch Culturalized Homepage - React App

This project has been converted to a React application using Vite as the build tool.

## Prerequisites

You need Node.js installed to run this React app. Install it from:
- **Official site**: https://nodejs.org/ (download LTS version)
- **Via Homebrew** (if you have it): `brew install node`

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top navigation and test country selector
│   ├── Hero.jsx            # Hero section with rotating images
│   ├── CountryChips.jsx    # Country selection chips with overlay
│   ├── OriginCards.jsx     # Dynamic origin cards (1/2/3 column layouts)
│   └── RecordCollections.jsx  # Carousel of record collection cards
├── App.jsx                 # Main application component
├── main.jsx               # React entry point
├── index.css              # Global styles and animations
└── data.js                # Country lists and collections data

assets/                     # Static assets (images, SVGs)
colors.css                 # Custom color palette
vite.config.js            # Vite configuration
package.json              # Dependencies and scripts
```

## Features

- **Dynamic Country Selection**: Chips that append new countries before "More..." button
- **Responsive Carousel**: Horizontal scroll with navigation arrows on mobile
- **Hero Image Rotation**: Auto-rotating hero images with fade transitions
- **Conditional Rendering**: Cambodia shows limited cards, Philippines shows special layout
- **Keyboard Navigation**: Full accessibility support with arrow keys
- **Chip Animation**: Fade-in animation for newly added country chips

## Installation & Running

Once Node.js is installed:

\`\`\`bash
# Install dependencies
npm install

# Start development server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Development Server

After running `npm run dev`, the app will be available at:
- **Local**: http://localhost:5173
- **Network**: Check terminal output for network URL

## Key React Patterns Used

- **useState** for country selection, carousel state, overlay visibility
- **useEffect** for hero image rotation, carousel button updates, responsive behavior
- **useRef** for DOM manipulation (carousel scrolling)
- **Prop drilling** for passing state and callbacks between components
- **Conditional rendering** for country-specific layouts

## Customization

### Adding a New Country

1. **Add to data arrays** in `src/data.js`:
   - Add to `defaultCountries` or `phCountries` arrays
   - Add to `overlayCountries` if selectable from overlay

2. **Add collection data** in `src/data.js`:
   \`\`\`javascript
   'New Country': [
     { title: '...', desc: '...', link: '#', icon: '<svg>...</svg>' }
   ]
   \`\`\`

3. **Optional**: Add custom layout in `src/components/OriginCards.jsx`

### Changing Hero Images

Update image paths in `src/components/Hero.jsx`:
\`\`\`javascript
const defaultImages = ['/Country=US.png', '/Country=Mexico.png', '/Country=UK.png'];
const philippinesImages = ['/Country=Philippines.png', '/Country=Korea.png', '/Country=Cambodia.png'];
\`\`\`

## Browser Support

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)

## Legacy Vanilla JS Version

The original vanilla JavaScript version is preserved in:
- `index.html` (original)
- `assets/main.js`, `carousel.js`, `chips.js`, `hero.js`, `origins.js` (original modules)

## Migration Notes

All vanilla JS functionality has been converted to React:
- ✅ Country chip selection with append-only behavior
- ✅ Overlay modal for additional countries
- ✅ Hero image rotation with fade transitions
- ✅ Dynamic search form (Philippines vs. default)
- ✅ Responsive carousel with arrow visibility logic
- ✅ Conditional origin card rendering
- ✅ Keyboard navigation and accessibility

## Troubleshooting

**Port already in use**: Change port in `vite.config.js` or kill the process using port 5173

**Tailwind styles not working**: Ensure `<script src="https://cdn.tailwindcss.com"></script>` is in index-react.html

**Images not loading**: Check that image files are in the `assets/` folder (Vite's public directory)

## License

Proprietary - Church of Jesus Christ of Latter-day Saints
