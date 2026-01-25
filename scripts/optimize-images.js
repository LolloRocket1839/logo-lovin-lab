/**
 * Image Optimization Script
 * Converts images to WebP format with target <100KB
 * Run: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1920;
const QUALITY = 75;
const TARGET_SIZE_KB = 100;

// Image extensions to process
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.avif'];

async function getImageFiles(dir) {
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });
}

async function optimizeImage(inputPath, outputPath) {
  const inputStats = fs.statSync(inputPath);
  const inputSizeKB = inputStats.size / 1024;
  
  let quality = QUALITY;
  let outputBuffer;
  
  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  const needsResize = metadata.width > MAX_WIDTH;
  
  // Start with base quality and reduce if needed
  do {
    let pipeline = sharp(inputPath);
    
    // Resize if wider than MAX_WIDTH
    if (needsResize) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Convert to WebP
    outputBuffer = await pipeline
      .webp({ quality, effort: 6 })
      .toBuffer();
    
    const outputSizeKB = outputBuffer.length / 1024;
    
    // If under target, we're done
    if (outputSizeKB <= TARGET_SIZE_KB || quality <= 50) {
      break;
    }
    
    // Reduce quality and try again
    quality -= 5;
  } while (quality > 50);
  
  // Write the optimized image
  fs.writeFileSync(outputPath, outputBuffer);
  
  const outputSizeKB = outputBuffer.length / 1024;
  
  return {
    input: inputPath,
    output: outputPath,
    inputSizeKB: inputSizeKB.toFixed(1),
    outputSizeKB: outputSizeKB.toFixed(1),
    reduction: ((1 - outputBuffer.length / inputStats.size) * 100).toFixed(1),
    quality,
    resized: needsResize
  };
}

async function main() {
  console.log('\n🖼️  Image Optimization Script\n');
  console.log(`📁 Input directory: ${INPUT_DIR}`);
  console.log(`📏 Max width: ${MAX_WIDTH}px`);
  console.log(`🎯 Target size: <${TARGET_SIZE_KB}KB\n`);
  
  const imageFiles = await getImageFiles(INPUT_DIR);
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  const results = [];
  let totalInputKB = 0;
  let totalOutputKB = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(INPUT_DIR, `${baseName}.webp`);
    
    try {
      const result = await optimizeImage(inputPath, outputPath);
      results.push(result);
      
      totalInputKB += parseFloat(result.inputSizeKB);
      totalOutputKB += parseFloat(result.outputSizeKB);
      
      const status = parseFloat(result.outputSizeKB) <= TARGET_SIZE_KB ? '✅' : '⚠️';
      console.log(`${status} ${file} → ${baseName}.webp`);
      console.log(`   ${result.inputSizeKB}KB → ${result.outputSizeKB}KB (-${result.reduction}%) Q${result.quality}${result.resized ? ' [resized]' : ''}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary');
  console.log('='.repeat(50));
  console.log(`Total images: ${results.length}`);
  console.log(`Total input size: ${totalInputKB.toFixed(1)}KB (${(totalInputKB / 1024).toFixed(2)}MB)`);
  console.log(`Total output size: ${totalOutputKB.toFixed(1)}KB (${(totalOutputKB / 1024).toFixed(2)}MB)`);
  console.log(`Total reduction: ${((1 - totalOutputKB / totalInputKB) * 100).toFixed(1)}%`);
  
  const underTarget = results.filter(r => parseFloat(r.outputSizeKB) <= TARGET_SIZE_KB).length;
  console.log(`Under ${TARGET_SIZE_KB}KB: ${underTarget}/${results.length} (${((underTarget / results.length) * 100).toFixed(0)}%)`);
  
  // List files over target
  const overTarget = results.filter(r => parseFloat(r.outputSizeKB) > TARGET_SIZE_KB);
  if (overTarget.length > 0) {
    console.log(`\n⚠️  Files over ${TARGET_SIZE_KB}KB target:`);
    overTarget.forEach(r => {
      console.log(`   - ${path.basename(r.output)}: ${r.outputSizeKB}KB`);
    });
  }
  
  console.log('\n✨ Done!\n');
}

main().catch(console.error);
