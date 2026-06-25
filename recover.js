const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\UXDLAB\\.gemini\\antigravity-ide\\brain\\7af5d66d-c916-4230-bf98-5525b34f53d8\\.system_generated\\logs\\transcript_full.jsonl';
const outputPath = path.join(__dirname, 'src', 'App.tsx');

try {
  const content = fs.readFileSync(logPath, 'utf8');
  const lines = content.split('\n');
  
  let diffContent = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      // We look for step_index 33 or any step containing the App.tsx diff
      if (step.step_index === 33 && step.content) {
        diffContent = step.content;
        break;
      }
    } catch (e) {
      // Ignore JSON parse errors for incomplete lines
    }
  }

  if (!diffContent) {
    console.error('Diff content not found in step 33. Searching all steps...');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const step = JSON.parse(line);
        if (step.content && step.content.includes('diff --git a/src/App.tsx')) {
          diffContent = step.content;
          console.log('Found diff in step', step.step_index);
          break;
        }
      } catch (e) {}
    }
  }

  if (!diffContent) {
    throw new Error('Could not find the diff content in the logs.');
  }

  // Extract added lines from diff
  const diffLines = diffContent.split('\n');
  const appLines = [];
  
  let inDiff = false;
  for (let dLine of diffLines) {
    // Normalize line endings
    dLine = dLine.replace(/\r$/, '');
    
    if (dLine.startsWith('diff --git a/src/App.tsx')) {
      inDiff = true;
      continue;
    }
    
    if (inDiff) {
      if (dLine.startsWith('diff --git')) {
        // We reached the next file diff, stop
        break;
      }
      
      if (dLine.startsWith('+') && !dLine.startsWith('+++')) {
        appLines.push(dLine.slice(1));
      }
    }
  }

  if (appLines.length === 0) {
    throw new Error('No added lines extracted from the diff.');
  }

  fs.writeFileSync(outputPath, appLines.join('\n'), 'utf8');
  console.log(`Successfully recovered ${appLines.length} lines to ${outputPath}`);
} catch (err) {
  console.error('Error recovering file:', err);
}
