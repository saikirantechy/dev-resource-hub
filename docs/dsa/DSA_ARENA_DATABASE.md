# DSA Arena — Database Schema

## Collections

### users
- `id`: UUID (PK)
- `username`: string (unique)
- `displayName`: string
- `avatar`: string (URL)
- `email`: string (unique)
- `college`: string
- `country`: string
- `createdAt`: timestamp

### dsa_profiles
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `totalPoints`: number
- `globalRank`: number
- `tier`: enum (Bronze → Legend)
- `currentStreak`: number
- `problemsSolved`: number
- `successRate`: number
- `firstPlaceRate`: number
- `secondPlaceRate`: number
- `thirdPlaceRate`: number

### dsa_rooms
- `id`: UUID (PK)
- `name`: string
- `hostId`: UUID (FK → users)
- `topic`: string
- `difficulty`: enum
- `language`: enum
- `maxParticipants`: number
- `isPrivate`: boolean
- `roomKey`: string
- `status`: enum (Active/Upcoming/Ended)
- `startTime`: timestamp
- `duration`: number (minutes)

### dsa_submissions
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `roomId`: UUID (FK → dsa_rooms, nullable)
- `challengeId`: string
- `code`: text
- `language`: enum
- `status`: enum (Passed/Failed/Partial)
- `score`: number
- `timeComplexity`: string
- `spaceComplexity`: string
- `submittedAt`: timestamp

### dsa_rankings
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `points`: number
- `wins`: number
- `totalMatches`: number
- `tier`: enum
- `period`: enum (Weekly/Monthly/AllTime)
- `updatedAt`: timestamp

### dsa_achievements
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `achievementId`: string
- `unlockedAt`: timestamp

### dsa_notes
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `topicId`: string
- `content`: text
- `createdAt`: timestamp
- `updatedAt`: timestamp

### dsa_roadmaps
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `roadmapTemplateId`: string
- `progress`: number
- `completedTopics`: string[]
- `startedAt`: timestamp
- `completedAt`: timestamp

### dsa_sessions
- `id`: UUID (PK)
- `userId`: UUID (FK → users)
- `type`: enum (Tutor/Assessment/Arena)
- `duration`: number (seconds)
- `score`: number
- `metadata`: JSON
- `createdAt`: timestamp
