# DevRank AI — API Documentation

## Public API Endpoints

### Rankings

#### GET /api/rankings
Returns global developer rankings.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| period | string | "all-time" | Daily, Weekly, Monthly, Yearly, All-Time |
| country | string | "" | Filter by country |
| language | string | "" | Filter by programming language |
| college | string | "" | Filter by college |
| community | string | "" | Filter by community |
| page | integer | 1 | Page number |
| limit | integer | 50 | Results per page |

**Response:**
```json
{
  "rankings": [
    {
      "rank": 1,
      "username": "alexchen",
      "displayName": "Alex Chen",
      "avatar": "...",
      "score": 9850,
      "tier": "Elite",
      "prs": 342,
      "stars": 15200,
      "college": "MIT",
      "country": "USA"
    }
  ],
  "total": 12450,
  "page": 1,
  "pages": 249
}
```

### Developers

#### GET /api/developers
Search and list developers.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| q | string | "" | Search query |
| country | string | "" | Filter by country |
| language | string | "" | Filter by language |
| page | integer | 1 | Page number |
| limit | integer | 50 | Results per page |

#### GET /api/profile/:username
Get detailed developer profile.

**Response:**
```json
{
  "username": "alexchen",
  "displayName": "Alex Chen",
  "bio": "Full-stack developer...",
  "score": 9850,
  "tier": "Elite",
  "rank": 1,
  "statistics": {
    "commits": 2840,
    "prs": 342,
    "mergedPrs": 298,
    "stars": 15200,
    "followers": 8430,
    "repos": 87,
    "streak": 45
  },
  "languages": ["TypeScript", "Rust", "Python", "Go"],
  "badges": ["top-contributor", "open-source-champion"],
  "insights": [...]
}
```

### Colleges

#### GET /api/colleges
Get college rankings.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| country | string | "" | Filter by country |
| sort | string | "score" | Score, Growth, Students |
| page | integer | 1 | Page number |

### Communities

#### GET /api/communities
Get community rankings.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| type | string | "" | GDSC, MLSA, AWS, etc. |
| page | integer | 1 | Page number |

### Badges

#### GET /api/badges
Get all available badges.

#### GET /api/badges/:username
Get badges for a specific user.

### Analytics

#### GET /api/analytics/:username
Get detailed analytics for a developer.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| period | string | "year" | Month, Quarter, Year, All |

### Badge SVG Generation

#### GET /badge/:username.svg
Generate an SVG badge for a developer.

#### GET /badge/:type.svg
Generate a category badge (open-source, community, etc.)

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Authentication
- Optional API key for higher rate limits
- OAuth2 with GitHub for user profiles
