# Public API Integration Guide

This guide documents the public (unauthenticated) API endpoints intended for the public homepage.
All public endpoints are served under:

```
https://<your-domain>/api/public/
```

## General Notes
- No authentication required.
- JSON responses.
- Datetimes are ISO-8601; server timezone is Asia/Manila.
- Media fields (logo, photo, etc.) return URL strings or null.
- Public submit endpoints may be rate-limited (429).

## Endpoints

### 1) Public Settings (branding/contact/about)
```
GET /api/public/settings/
```
Response (object):
```
{
  "app_name": "SBCC Management",
  "church_name": "Santa Cruz Bible Christian Church",
  "tagline": "...",
  "logo": "https://...",
  "login_background": "https://...",
  "mission": "...",
  "vision": "...",
  "history": "...",
  "statement_of_faith": "...",
  "address": "...",
  "phone": "...",
  "email": "...",
  "facebook_url": "...",
  "youtube_url": "...",
  "instagram_url": "...",
  "service_schedule": "..."
}
```

### 2) Public Team
```
GET /api/public/team/
```
Response (array):
```
[
  {
    "id": 1,
    "name": "Jane Doe",
    "role": "pastor",
    "role_display": "Pastor",
    "title": "Senior Pastor",
    "bio": "...",
    "photo": "https://..."
  }
]
```

### 3) Public Announcements
```
GET /api/public/announcements/?limit=10&ministry=<id>
```
Query params:
- limit (int, default 10, max 50)
- ministry (int, optional)

Behavior:
- If ministry is omitted, only audience="all" is returned.
- If ministry is provided, returns audience="all" and the specified ministry.

Response:
```
{
  "count": 2,
  "results": [
    {
      "id": 10,
      "title": "Sunday Service",
      "body": "Join us...",
      "photo": "https://...",
      "audience": "all",
      "ministry_name": null,
      "publish_at": "2026-01-31T08:00:00+08:00",
      "expire_at": null,
      "created_at": "2026-01-30T12:00:00+08:00"
    }
  ]
}
```

### 4) Public Events
```
GET /api/public/events/?time_filter=upcoming&event_type=service&ministry=<id>&limit=10
```
Query params:
- time_filter: upcoming | past | all (default all)
- event_type: service, bible_study, prayer_meeting, fellowship, outreach, other
- ministry (int, optional)
- limit (int, default 10, max 50)

Response:
```
{
  "count": 1,
  "results": [
    {
      "id": 7,
      "title": "Youth Fellowship",
      "description": "...",
      "event_type": "fellowship",
      "date": "2026-02-02T18:00:00+08:00",
      "end_date": "2026-02-02T20:00:00+08:00",
      "location": "Main Hall",
      "ministry_name": "Youth Ministry",
      "organizer_name": "John Smith",
      "max_attendees": 50,
      "registered_count": 12,
      "available_slots": 38,
      "is_full": false
    }
  ]
}
```

### 5) Public Prayer Request Submission
```
POST /api/public/prayer-requests/submit/
Content-Type: application/json
```
Body:
```
{
  "title": "Prayer for healing",
  "description": "Please pray for...",
  "category": "health",
  "requester_name": "Maria Cruz",
  "requester_email": "maria@example.com",
  "requester_phone": "0917...",
  "is_anonymous": false
}
```
Validation:
- title, description are required.
- requester_name is required unless is_anonymous=true.

Response:
```
{
  "message": "Prayer request submitted successfully.",
  "id": 123,
  "title": "Prayer for healing",
  "status": "pending"
}
```

## Caching Guidance for Public Homepage
Caching improves speed and reliability for visitors. The trade-off is that updates may appear with a small delay.

Recommended TTLs:
- Announcements/events: 30 to 120 seconds
- Settings/team: 5 to 30 minutes

Visitor impact:
- Faster load times and fewer API errors.
- New announcements/events may appear up to the TTL delay.

## Error Handling Notes
- 429 indicates rate limiting (public submit endpoints). Show a friendly retry message.
- 400 indicates validation errors (e.g., missing name when not anonymous).

