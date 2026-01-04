## SBCC Homepage (Seperate Repository)

### Overview

The Public Homepage is a standalone website intended for church members, visitors, and the general public. It is separate from the SBCC Management System dashboard and serves as the church's primary online presence. The homepage provides access to public-facing features such as announcements, ministries, contact information, and prayer request submissions.

This project will be stored in a separate GitHub repository.

| Component  | Stack                                 |
| ---------- | ------------------------------------- |
| Frontend   | React (Vite), Tailwind CSS, Shadcn/UI |
| Deployment | Cloudflare                            |

### Objectives

- Provide a modern, accessible, welcoming homepage for SBCC
- Give members access to announcements and updates
- Allow visitors to submit prayer requests and inquire about ministries
- Redirect leaders/members to the internal Management System
- Improve the church's online presence and communication

### Core Features

#### Public Announcements

- Fetch and display announcements from SBCCMS Public API
- Display announcement cards with:
  - Title
  - Date
  - Description snippet
- "Read more" modal or expanded view

#### Online Prayer Request Submission

- Public form allowing members and visitors to submit prayer requests
- Fields:
  - Name (optional)
  - Email (optional)
  - Prayer Request (required)
  - Category (Healing, Guidance, Family, Thanksgiving, etc.)
  - "Submit Anonymously" toggle
- Sends request to SBCCMS via: `POST /public/prayer-request/`
- Show success confirmation

#### About the Church

- Church mission & vision
- Church history
- Statement of faith
- Pastoral & leadership team
- Generated imagery of church themes

#### Contact Page

- Phone numbers
- Email addresses
- Church location map
- Facebook and social media links
- Contact form (optional)

#### Events & Calendar (Optional / After Phase 4)

- Public version of the SBCCMS events module
- Display upcoming events
- Filters for worship, outreach, fellowships, etc.

#### Online Giving Page (Optional / After Phase 4)

- GCash and bank transfer details
- Instructions
- Disclaimer message

#### Navigation Elements

- CTA: Access the Management System
- Navbar
- Hero section
- Footer

### Design & Development Requirements

- Built using React (Vite)
- Styled with Tailwind CSS + shadcn/ui components
- Fully responsive (mobile-first)
- SEO optimized
- Modular folder structure
- Lazy loading for images
- Smooth animations
- ARIA & a11y compliance
- Clean and well-structured React components

### Public APIs (Provided by SBCCMS Backend)

| Endpoint                  | Method | Purpose                   |
| ------------------------- | ------ | ------------------------- |
| `/public/announcements/`  | GET    | Announcements             |
| `/public/prayer-request/` | POST   | Prayer Request Submission |
| `/public/events/`         | GET    | Events (optional)         |
