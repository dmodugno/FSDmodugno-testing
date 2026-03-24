#!/usr/bin/env node

/**
 * Token Generator for AuthGuard
 *
 * This script generates secure access tokens and their SHA-256 hashes.
 *
 * Usage:
 *   node generate-token.js
 *
 * The script will:
 * 1. Generate a secure random token
 * 2. Create its SHA-256 hash
 * 3. Display both the token and hash
 *
 * To add a new access token:
 * 1. Run this script
 * 2. Copy the HASH and add it to VALID_TOKENS array in src/components/AuthGuard.jsx
 * 3. Share the TOKEN (not the hash!) with your manager as part of the URL
 */

const crypto = require('crypto');

function generateToken() {
  // Generate 32 random bytes = 64 hex characters
  return crypto.randomBytes(32).toString('hex');
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Generate a new token
const token = generateToken();
const hash = hashToken(token);

console.log('\n' + '='.repeat(80));
console.log('NEW ACCESS TOKEN GENERATED');
console.log('='.repeat(80));
console.log('\n📋 TOKEN (share this with your manager):');
console.log('-'.repeat(80));
console.log(token);
console.log('-'.repeat(80));

console.log('\n🔐 HASH (add this to AuthGuard.jsx VALID_TOKENS array):');
console.log('-'.repeat(80));
console.log(hash);
console.log('-'.repeat(80));

console.log('\n🔗 SHARE THIS URL WITH YOUR MANAGER:');
console.log('-'.repeat(80));
const exampleUrl = `https://your-github-pages-url.github.io/your-repo/?access=${token}`;
console.log(exampleUrl);
console.log('-'.repeat(80));

console.log('\n📝 STEPS TO ACTIVATE THIS TOKEN:');
console.log('1. Copy the HASH above');
console.log('2. Open: src/components/AuthGuard.jsx');
console.log('3. Add the hash to the VALID_TOKENS array');
console.log('4. Commit and deploy your changes');
console.log('5. Share the URL (with token) with your manager');
console.log('\n' + '='.repeat(80) + '\n');
