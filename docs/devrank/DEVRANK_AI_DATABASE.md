# DevRank AI — Database Schema

## Tables

### `users`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| username | VARCHAR(100) | Unique GitHub username |
| display_name | VARCHAR(200) | Display name |
| avatar_url | TEXT | Profile image URL |
| bio | TEXT | User biography |
| email | VARCHAR(255) | Email address |
| created_at | TIMESTAMP | Account creation |
| updated_at | TIMESTAMP | Last update |
| github_id | BIGINT | GitHub user ID |
| github_token | TEXT | OAuth token (encrypted) |

### `developer_profiles`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| college | VARCHAR(200) | College/University |
| community | VARCHAR(200) | Developer community |
| organization | VARCHAR(200) | Company/Org |
| country | VARCHAR(100) | Country |
| city | VARCHAR(100) | City |
| score | INTEGER | DevRank score |
| tier | VARCHAR(20) | Bronze → Elite |
| rank | INTEGER | Current rank |
| streak | INTEGER | Contribution streak |
| joined_at | TIMESTAMP | Platform join date |
| languages | TEXT[] | Programming languages |
| tech_stack | TEXT[] | Technologies used |

### `contributions`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| date | DATE | Contribution date |
| count | INTEGER | Contribution count |
| type | VARCHAR(50) | commit/pr/issue/review |
| repository | VARCHAR(200) | Repo name |

### `repositories`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| name | VARCHAR(200) | Repo name |
| full_name | VARCHAR(400) | Full repo path |
| description | TEXT | Repo description |
| stars | INTEGER | Star count |
| forks | INTEGER | Fork count |
| language | VARCHAR(50) | Primary language |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last push |

### `pull_requests`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| repository | VARCHAR(200) | Repo name |
| title | TEXT | PR title |
| state | VARCHAR(20) | open/merged/closed |
| created_at | TIMESTAMP | PR creation |
| merged_at | TIMESTAMP | Merge date |

### `achievements`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| badge_id | VARCHAR(50) | Badge identifier |
| unlocked_at | TIMESTAMP | When unlocked |
| metadata | JSONB | Additional data |

### `badges`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(50) | Primary key |
| name | VARCHAR(200) | Badge name |
| description | TEXT | Badge description |
| icon | VARCHAR(50) | Icon identifier |
| category | VARCHAR(50) | contribution/achievement/community/skill/hackathon |
| condition | TEXT | Unlock condition |

### `colleges`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | College name |
| location | VARCHAR(200) | Location |
| country | VARCHAR(100) | Country |
| student_count | INTEGER | Total students |
| contributor_count | INTEGER | Active contributors |
| total_score | BIGINT | Combined score |
| rank | INTEGER | Current rank |

### `communities`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Community name |
| type | VARCHAR(50) | GDSC/MLSA/AWS/GDG/etc |
| description | TEXT | Description |
| member_count | INTEGER | Total members |
| total_score | BIGINT | Combined score |
| rank | INTEGER | Current rank |

### `hackathons`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(200) | Event name |
| date | DATE | Event date |
| location | VARCHAR(200) | Location |
| type | VARCHAR(20) | Online/In-Person/Hybrid |
| participant_count | INTEGER | Participants |
| winner | VARCHAR(200) | Winner name |

### `analytics`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| metric_type | VARCHAR(50) | Metric identifier |
| value | DECIMAL | Metric value |
| recorded_at | TIMESTAMP | Recording time |

### `activity_logs`
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | FK to users |
| action | VARCHAR(100) | Action type |
| metadata | JSONB | Action data |
| created_at | TIMESTAMP | Log time |

## Indexes
- `users_username_idx` on users(username)
- `developer_profiles_score_idx` on developer_profiles(score DESC)
- `developer_profiles_tier_idx` on developer_profiles(tier)
- `contributions_user_date_idx` on contributions(user_id, date)
- `rankings_period_idx` on rankings(period, rank)
