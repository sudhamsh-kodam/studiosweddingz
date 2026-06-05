#!/bin/bash
# ─────────────────────────────────────────────────────────
# STUDIOSWEDDINGZ — Add New Couple to Portfolio
# ─────────────────────────────────────────────────────────
# Usage:
#   ./add-couple.sh "/path/to/Couple Name Folder"
#
# Example:
#   ./add-couple.sh "/Users/deepika/Downloads/Ravi & Priya"
#
# This script will:
#   1. Copy photos to portfolio-photos/couples/<slug>/
#   2. Generate 800px thumbnails in portfolio-photos/thumbs/<slug>/
#   3. Auto-update public/portfolio/data.json
# ─────────────────────────────────────────────────────────

set -e

# Check arguments
if [ -z "$1" ]; then
  echo ""
  echo "  📸 STUDIOSWEDDINGZ — Add New Couple"
  echo "  ─────────────────────────────────────"
  echo ""
  echo "  Usage: ./add-couple.sh \"/path/to/Couple Name Folder\""
  echo ""
  echo "  Example:"
  echo "    ./add-couple.sh \"/Users/deepika/Downloads/Ravi & Priya\""
  echo ""
  exit 1
fi

FOLDER="$1"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Validate folder exists
if [ ! -d "$FOLDER" ]; then
  echo "❌ Folder not found: $FOLDER"
  exit 1
fi

# Extract couple name from folder name
COUPLE_NAME=$(basename "$FOLDER")
echo ""
echo "  📸 Adding couple: $COUPLE_NAME"
echo "  ─────────────────────────────────────"

# Generate slug (lowercase, hyphens)
SLUG=$(echo "$COUPLE_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
echo "  📂 Slug: $SLUG"

# Create directories
COUPLES_DIR="$PROJECT_DIR/portfolio-photos/couples/$SLUG"
THUMBS_DIR="$PROJECT_DIR/portfolio-photos/thumbs/$SLUG"
mkdir -p "$COUPLES_DIR" "$THUMBS_DIR"

# Count photos
PHOTO_COUNT=$(find "$FOLDER" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | wc -l | tr -d ' ')
echo "  📷 Found $PHOTO_COUNT photos"

if [ "$PHOTO_COUNT" -eq 0 ]; then
  echo "❌ No photos found in folder (looking for .jpg, .jpeg, .png, .webp)"
  exit 1
fi

# Step 1: Copy photos
echo ""
echo "  ⏳ Step 1/3: Copying photos..."
cp "$FOLDER"/*.jpg "$COUPLES_DIR/" 2>/dev/null || true
cp "$FOLDER"/*.jpeg "$COUPLES_DIR/" 2>/dev/null || true
cp "$FOLDER"/*.png "$COUPLES_DIR/" 2>/dev/null || true
cp "$FOLDER"/*.webp "$COUPLES_DIR/" 2>/dev/null || true
echo "  ✅ Photos copied to portfolio-photos/couples/$SLUG/"

# Step 2: Generate thumbnails (800px)
echo ""
echo "  ⏳ Step 2/3: Generating thumbnails (800px)..."
THUMB_COUNT=0
for f in "$COUPLES_DIR"/*.{jpg,jpeg,png,webp}; do
  [ -f "$f" ] || continue
  FILENAME=$(basename "$f")
  sips -Z 800 "$f" --out "$THUMBS_DIR/$FILENAME" > /dev/null 2>&1
  THUMB_COUNT=$((THUMB_COUNT + 1))
  # Progress indicator
  if [ $((THUMB_COUNT % 10)) -eq 0 ]; then
    echo "    ... $THUMB_COUNT / $PHOTO_COUNT"
  fi
done
echo "  ✅ Generated $THUMB_COUNT thumbnails in portfolio-photos/thumbs/$SLUG/"

# Step 3: Update data.json
echo ""
echo "  ⏳ Step 3/3: Updating data.json..."

node -e "
const fs = require('fs');
const path = require('path');

const dataPath = '$PROJECT_DIR/public/portfolio/data.json';
const thumbsDir = '$THUMBS_DIR';
const slug = '$SLUG';
const coupleName = '$COUPLE_NAME';

// Load existing data
let data = { couples: [] };
try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch(e) {}

// Check if couple already exists
const existing = data.couples.findIndex(c => c.id === slug);
if (existing !== -1) {
  console.log('  ⚠️  Couple already exists, updating photos...');
  data.couples.splice(existing, 1);
}

// Get photo files
const photos = fs.readdirSync(thumbsDir)
  .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .map(f => ({
    thumb: '/portfolio/thumbs/' + slug + '/' + encodeURIComponent(f),
    full: '/portfolio/couples/' + slug + '/' + encodeURIComponent(f)
  }));

// Add new couple
data.couples.push({
  id: slug,
  names: coupleName,
  date: '',
  location: '',
  thumbnail: photos[0] ? photos[0].thumb : '',
  events: [{ name: 'Wedding', photos: photos }]
});

// Save
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('  ✅ data.json updated with ' + photos.length + ' photos');
"

echo ""
echo "  ─────────────────────────────────────"
echo "  ✅ Done! $COUPLE_NAME added to portfolio."
echo ""
echo "  📋 Summary:"
echo "     Photos: $COUPLES_DIR/"
echo "     Thumbs: $THUMBS_DIR/"
echo "     Data:   $PROJECT_DIR/public/portfolio/data.json"
echo ""
echo "  🌐 Refresh your browser to see the changes!"
echo "     (If dev server isn't running: npm run dev)"
echo ""
