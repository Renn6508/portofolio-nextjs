# WakaTime API Integration

This API route fetches coding statistics from WakaTime for the last 7 days.

## Setup

1. Get your WakaTime API key from: https://wakatime.com/settings/api-key
2. Add it to your `.env.local` file:
   ```
   WAKATIME_API_KEY=waka_your_api_key_here
   NEXT_PUBLIC_WAKATIME_USERNAME=your_username
   ```

## Authentication

WakaTime uses Bearer token authentication. The API key is kept server-side for security.

## Endpoint

`GET /api/wakatime`

## Response Format

```json
{
  "totalSeconds": 123456,
  "dailyAverage": 17636,
  "languages": [
    {
      "name": "TypeScript",
      "percent": 45.5,
      "text": "5 hrs 30 mins",
      "totalSeconds": 19800
    }
  ],
  "editors": [
    {
      "name": "VS Code",
      "percent": 98.5,
      "text": "12 hrs 15 mins"
    }
  ],
  "bestDay": {
    "date": "2026-03-04",
    "text": "8 hrs 45 mins"
  }
}
```

## Caching

The API response is cached for 1 hour (3600 seconds) using Next.js revalidation.

## Troubleshooting

If you get a 401 error:
- Verify your API key is correct in `.env.local`
- Make sure the key starts with `waka_`
- Restart your development server after changing environment variables

If you get a 403 error:
- Check that your WakaTime account has data
- Ensure your profile is not set to private
