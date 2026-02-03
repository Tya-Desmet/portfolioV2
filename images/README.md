# Image Placeholder Instructions

## Hero Photo Requirements

Since we don't have an actual professional photo of Mystya yet, you'll need to add placeholder images following these specifications:

### File Requirements:
1. **mystya-photo.webp** - WebP format, 700x700px minimum, <150KB
2. **mystya-photo.jpg** - JPEG format, 700x700px minimum, <200KB

### Temporary Solution Options:

#### Option 1: Use a Placeholder Image Service
Create placeholder images temporarily:
```
https://via.placeholder.com/700x700/2563eb/ffffff?text=Mystya
```

#### Option 2: Generate with AI Tools
- Use an AI portrait generator (e.g., This Person Does Not Exist, Artbreeder)
- Ensure image is professional looking
- Must show professional attire appropriate for developer portfolio

#### Option 3: Use Professional Stock Photo
- Sites like Unsplash, Pexels (free commercial use)
- Search for "professional developer portrait" or "software engineer headshot"
- Select diverse, professional-looking portrait
- Download and optimize according to specs below

### Image Optimization Process:

1. **Resize to 700x700px** (for 2x displays at 350px)
   - Use online tool: https://www.iloveimg.com/resize-image
   - Or ImageMagick: `convert input.jpg -resize 700x700^ -gravity center -extent 700x700 mystya-photo.jpg`

2. **Convert to WebP** (target <150KB)
   - Use Squoosh: https://squoosh.app/
   - Or online converter: https://convertio.co/jpg-webp/
   - Adjust quality to 80-85 to meet size target

3. **Optimize JPEG** (target <200KB)
   - Use TinyJPG: https://tinyjpg.com/
   - Or Squoosh for manual quality adjustment

4. **Place files in `/images/` folder**
   - `images/mystya-photo.webp`
   - `images/mystya-photo.jpg`

### Verification Checklist:
- [ ] mystya-photo.webp exists and is <150KB
- [ ] mystya-photo.jpg exists and is <200KB
- [ ] Both images are 700x700px (minimum)
- [ ] Images display correctly in browser
- [ ] WebP loads in Chrome/Edge, JPEG fallback works in Safari
- [ ] Images are professional-looking and appropriate for portfolio

### Quick Test Command:
```powershell
# Check file sizes
Get-ChildItem e:\Dev\ProjetPerso\images\mystya-photo.* | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
```

**Note:** Replace placeholder images with actual professional photo of Mystya when available.
