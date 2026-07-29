const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS_DIR = path.join(__dirname, "src", "assets");
const SRC_DIR = path.join(__dirname, "src");
const IMAGE_EXT = /\.(jpe?g|png)$/i;

function walk(dir, exts, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      walk(full, exts, files);
    } else if (exts.some((e) => entry.name.toLowerCase().endsWith(e))) {
      files.push(full);
    }
  }
  return files;
}

async function convertImages() {
  const images = fs.readdirSync(ASSETS_DIR).filter((f) => IMAGE_EXT.test(f));
  const renameMap = {};

  console.log(`Found ${images.length} images to convert...\n`);

  for (const file of images) {
    const inputPath = path.join(ASSETS_DIR, file);
    const outputName = file.replace(IMAGE_EXT, ".webp");
    const outputPath = path.join(ASSETS_DIR, outputName);

    try {
      await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
      fs.unlinkSync(inputPath);
      renameMap[file] = outputName;
      console.log(`✔ ${file}  →  ${outputName}`);
    } catch (err) {
      console.error(`✘ Failed to convert ${file}:`, err.message);
    }
  }

  return renameMap;
}

function updateCodeReferences(renameMap) {
  const codeFiles = walk(SRC_DIR, [".tsx", ".ts"]);
  let totalReplacements = 0;
  let filesChanged = 0;

  for (const filePath of codeFiles) {
    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    for (const [oldName, newName] of Object.entries(renameMap)) {
      const escaped = oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "g");
      if (regex.test(content)) {
        content = content.replace(regex, newName);
        changed = true;
        totalReplacements++;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, "utf8");
      filesChanged++;
      console.log(`Updated references in: ${path.relative(__dirname, filePath)}`);
    }
  }

  console.log(`\n${totalReplacements} reference(s) updated across ${filesChanged} file(s).`);
}

(async () => {
  console.log("=== Step 1: Converting images to WebP ===\n");
  const renameMap = await convertImages();

  console.log("\n=== Step 2: Updating code references ===\n");
  updateCodeReferences(renameMap);

  console.log("\nDone! Restart your dev server (npm run dev) to see the changes.");
})();