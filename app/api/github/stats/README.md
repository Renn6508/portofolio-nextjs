# GitHub Stats API

This API route fetches GitHub statistics including repositories, followers, and language breakdown.

## Setup

1. (Optional) Get a GitHub Personal Access Token from: https://github.com/settings/tokens
   - This increases your rate limit from 60 to 5000 requests/hour
   - No special scopes needed for public data
   
2. Add to your `.env.local` file:
   ```
   GITHUB_TOKEN=ghp_your_token_here
   NEXT_PUBLIC_GITHUB_USERNAME=your_username
   ```

## Authentication

- Without token: 60 requests/hour (usually sufficient)
- With token: 5000 requests/hour
- Token is kept server-side for security

## Endpoint

`GET /api/github/stats`

## Response Format

```json
{
  "publicRepos": 42,
  "followers": 150,
  "following": 80,
  "totalStars": 320,
  "topLanguages": [
    {
      "name": "TypeScript",
      "percentage": 45
    }
  ],
  "recentRepos": [
    {
      "name": "my-project",
      "description": "A cool project",
      "stars": 25,
      "forks": 5,
      "language": "TypeScript",
      "url": "https://github.com/username/my-project",
      "updatedAt": "Mar 5, 2026"
    }
  ]
}
```

## Caching

The API response is cached for 1 hour (3600 seconds) using Next.js revalidation.

## Troubleshooting

If you get a 403 error:
- You've hit the rate limit (60 requests/hour without token)
- Add a GitHub token to increase the limit
- Wait for the rate limit to reset (check headers for reset time)

If you get a 401 error:
- Your GitHub token is invalid or expired
- Generate a new token from GitHub settings
- Restart your development server after updating `.env.local`
