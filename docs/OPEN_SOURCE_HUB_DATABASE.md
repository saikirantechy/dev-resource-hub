# Open Source Opportunities Hub — Database Schema

## Collections

### users
```json
{
  "id": "uuid",
  "username": "string",
  "display_name": "string",
  "avatar_url": "string",
  "github_id": "string",
  "email": "string",
  "bio": "string",
  "skills": ["string"],
  "interests": ["string"],
  "xp": 0,
  "rank": "string",
  "streak": 0,
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### repositories
```json
{
  "id": "uuid",
  "github_id": 0,
  "name": "string",
  "full_name": "string",
  "description": "string",
  "url": "string",
  "language": "string",
  "topics": ["string"],
  "stars": 0,
  "forks": 0,
  "open_issues": 0,
  "maintainers": ["string"],
  "is_featured": false,
  "is_trending": false,
  "created_at": "timestamp"
}
```

### issues
```json
{
  "id": "uuid",
  "github_id": 0,
  "title": "string",
  "url": "string",
  "repository": "string",
  "labels": ["string"],
  "difficulty": "string",
  "body": "text",
  "state": "string",
  "comments": 0,
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "ai_summary": "text",
  "estimated_time": "string"
}
```

### bookmarks
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "resource_type": "string",
  "resource_id": "string",
  "created_at": "timestamp"
}
```

### contributions
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "type": "string",
  "repository": "string",
  "issue_url": "string",
  "pr_url": "string",
  "status": "string",
  "points": 0,
  "created_at": "timestamp"
}
```

### programs
```json
{
  "id": "uuid",
  "name": "string",
  "organization": "string",
  "description": "text",
  "url": "string",
  "tags": ["string"],
  "difficulty": "string",
  "benefits": ["string"],
  "timeline": {
    "applications": "string",
    "projectsStart": "string",
    "projectsEnd": "string"
  },
  "stats": {},
  "is_active": false,
  "is_featured": false
}
```

### achievements
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "icon": "string",
  "category": "string",
  "required_xp": 0
}
```

### leaderboard
```json
{
  "user_id": "uuid",
  "username": "string",
  "display_name": "string",
  "avatar": "string",
  "xp": 0,
  "rank": "string",
  "streak": 0,
  "contributions": {
    "workflows": 0,
    "prompts": 0,
    "articles": 0
  },
  "badges": ["string"]
}
```

## Relationships

- users → contributions (one-to-many)
- users → bookmarks (one-to-many)
- users → achievements (many-to-many via user_achievements)
- users → leaderboard (one-to-one)
- repositories → issues (one-to-many)
