# Access Token Authentication

This project uses **secure URL tokens** for authentication when deployed to GitHub Pages.

## How It Works

- Users need a special URL with an access token to view the site
- The token is checked and hashed client-side (SHA-256)
- Valid sessions last 8 hours
- No passwords to remember - just share the URL

## Quick Start

### 1. Generate a New Access Token

```bash
node generate-token.js
```

This will output:
- A **TOKEN** (64 random characters) - share this with your manager
- A **HASH** - add this to your code
- A ready-to-share **URL**

### 2. Add the Hash to Your Code

Open `src/components/AuthGuard.jsx` and add the hash to the `VALID_TOKENS` array:

```javascript
const VALID_TOKENS = [
  'f8e7d6c5b4a3928170695847362514039281706958473625140392817069584736', // Example
  'YOUR_NEW_HASH_HERE', // Add your new hash here
];
```

### 3. Deploy Your Changes

```bash
npm run build
git add .
git commit -m "Add new access token"
git push
```

### 4. Share the URL

Share this URL with your manager:
```
https://yourusername.github.io/your-repo/?access=YOUR_TOKEN_HERE
```

They just click the link - no password prompt, instant access!

## Features

- ✅ **Zero friction**: Users just click a link
- ✅ **Secure**: 256-bit random tokens (2^256 possibilities)
- ✅ **Multiple users**: Generate different tokens for different people
- ✅ **Session-based**: Token stored securely in sessionStorage
- ✅ **Auto-expiration**: Sessions expire after 8 hours
- ✅ **Revocable**: Remove hash from code to revoke access

## Security Notes

- **Never commit tokens** (the 64-char random string) to your repo
- **Only commit hashes** to the VALID_TOKENS array
- Tokens are removed from the URL bar after authentication
- Sessions are browser-specific and expire automatically
- To revoke access, remove the hash and redeploy

## Generating Tokens Manually

If you don't want to use the script, you can generate tokens manually:

### Using OpenSSL (Terminal)
```bash
# Generate token
TOKEN=$(openssl rand -hex 32)
echo "Token: $TOKEN"

# Generate hash
echo -n "$TOKEN" | openssl dgst -sha256
```

### Using Browser Console
```javascript
// Generate token
const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
  .map(b => b.toString(16).padStart(2, '0')).join('');
console.log('Token:', token);

// Generate hash
const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
console.log('Hash:', Array.from(new Uint8Array(hash))
  .map(b => b.toString(16).padStart(2, '0')).join(''));
```

## Troubleshooting

**User sees "Access Required" page:**
- Check that the token hash is in VALID_TOKENS array
- Verify the site has been rebuilt and deployed
- Make sure the URL includes `?access=TOKEN`

**Session expires too quickly/slowly:**
- Edit `SESSION_DURATION` in `src/components/AuthGuard.jsx`
- Current: 8 hours (8 * 60 * 60 * 1000)

**Want to support different URL parameters:**
- The system accepts `?access=`, `?key=`, or `?token=`
- Edit `getTokenFromURL()` to add more parameters

## Example Workflow

1. Manager asks for access
2. You run: `node generate-token.js`
3. You add hash to `AuthGuard.jsx`
4. You deploy: `npm run build && git push`
5. You share URL: `https://site.com/?access=abc123...`
6. Manager clicks link → instant access!
7. After 8 hours, session expires (they just click link again)

## Multiple Tokens Example

```javascript
const VALID_TOKENS = [
  'hash1...', // Manager token
  'hash2...', // Stakeholder token
  'hash3...', // Client token
];
```

Each person gets their own unique URL. You can track who has access and revoke individually.
