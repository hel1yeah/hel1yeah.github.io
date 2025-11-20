# PWA Icons Guide

## Required Icons for Web Manifest

To complete the PWA setup, you need to create the following icon files in this directory:

### Standard PWA Icons (for site.webmanifest)
- `icon-72x72.png` - 72x72px
- `icon-96x96.png` - 96x96px
- `icon-128x128.png` - 128x128px
- `icon-144x144.png` - 144x144px
- `icon-152x152.png` - 152x152px
- `icon-192x192.png` - 192x192px (maskable)
- `icon-384x384.png` - 384x384px
- `icon-512x512.png` - 512x512px (maskable)

### Apple Touch Icons
- `apple-touch-icon.png` - 180x180px

### Favicons
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px

### Microsoft Tiles (for browserconfig.xml)
- `mstile-70x70.png` - 70x70px
- `mstile-150x150.png` - 150x150px
- `mstile-310x150.png` - 310x150px (wide)
- `mstile-310x310.png` - 310x310px

### Shortcut Icons (optional)
- `shortcut-about.png` - 96x96px
- `shortcut-works.png` - 96x96px
- `shortcut-cv.png` - 96x96px

## How to Generate Icons

### Option 1: Online Tools
1. **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
   - Upload your logo (minimum 512x512px recommended)
   - Download all generated icons

2. **Favicon Generator**: https://realfavicongenerator.net/
   - Upload your logo
   - Customize for each platform
   - Download the package

3. **PWA Manifest Generator**: https://tools.crawlink.com/tools/pwa-icon-generator/
   - Upload base image
   - Generate all sizes

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
brew install imagemagick  # macOS
# or
sudo apt-get install imagemagick  # Linux

# Convert from your source logo (replace logo.png with your file)
convert logo.png -resize 72x72 icon-72x72.png
convert logo.png -resize 96x96 icon-96x96.png
convert logo.png -resize 128x128 icon-128x128.png
convert logo.png -resize 144x144 icon-144x144.png
convert logo.png -resize 152x152 icon-152x152.png
convert logo.png -resize 192x192 icon-192x192.png
convert logo.png -resize 384x384 icon-384x384.png
convert logo.png -resize 512x512 icon-512x512.png
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 16x16 favicon-16x16.png
```

### Option 3: Using Sharp (Node.js)
Create a script `generate-icons.js`:
```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512];
const inputFile = 'logo.png'; // Your source logo

sizes.forEach(size => {
  sharp(inputFile)
    .resize(size, size)
    .toFile(`public/icons/icon-${size}x${size}.png`)
    .then(() => console.log(`Generated ${size}x${size}`));
});
```

## Design Recommendations

1. **Logo/Icon Design**:
   - Use a simple, recognizable design
   - Ensure good contrast against both light and dark backgrounds
   - Leave safe zone (10% padding) for maskable icons
   - Test at smallest size (16x16) for clarity

2. **Color Scheme**:
   - Primary: `#7e3eff` (purple - for dark theme)
   - Secondary: `#ff5526` (orange - for light theme)
   - Background: Use transparent or `#0c0a16` (dark) / `#ffffff` (light)

3. **Maskable Icons** (192x192 and 512x512):
   - Must have safe zone (40% of icon size)
   - Icon should work when cropped to different shapes (circle, square, rounded)
   - Test at: https://maskable.app/

4. **Testing**:
   - Test PWA installation on Chrome/Edge
   - Check iOS home screen appearance
   - Verify Windows tile appearance
   - Use Lighthouse PWA audit

## Quick Start

If you already have a logo file (e.g., `AppLogo.vue` SVG component), you can:
1. Export it as PNG (512x512 minimum)
2. Use one of the online generators above
3. Place all generated files in this directory

## Notes

- The manifest and browserconfig files are already configured
- Icons are referenced in `nuxt.config.ts`
- Make sure all icon paths match the manifest configuration
