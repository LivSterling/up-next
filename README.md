# UpNext  
Document. Transform. Inspire.  
A fashion upcycling community powered by AI and creativity.

---

## Overview

**UpNext** is a full-stack, community-driven platform where fashion lovers—from seasoned DIYers to curious beginners—can document their clothing upcycles, get AI-powered suggestions, and inspire others through shared creativity.

Every year, 92 million tons of textile waste end up in landfills. UpNext aims to reduce that number by helping people reimagine what they already own.

---

## Features

- Before & After Posts — Upload upcycling projects with captions, tags, and images  
- Comment & Like System — Interact with other creatives in the feed  
- AI Assistant — Suggests creative ways to upcycle garments based on uploaded photos  
- Authentication — Secure user login with Passport.js  
- User Profiles — View your own uploads and track your projects  

---

## Live App

Coming soon — to be hosted on Render.

---

## Tech Stack

- **Frontend:** EJS templates, DaisyUI (Tailwind), Vanilla JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MongoDB with Mongoose  
- **Authentication:** Passport.js (Local Strategy)  
- **File Uploads:** Cloudinary  
- **AI Integration:** GPT-4.1 Mini (via custom assistant and image suggestion routes)  
- **Deployment:** Render  

---

## Installation & Setup

1. Clone the repository  
   `git clone https://github.com/your-username/upnext.git`

2. Navigate into the project folder  
   `cd upnext`

3. Install dependencies  
   `npm install`

4. Create a `.env` file inside the `config/` folder with the following:

PORT=2121
DB_STRING=your_mongodb_uri
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

5. Start the development server  
`npm start`

---

## Lessons Learned

Throughout building UpNext, I developed key skills in:

- RESTful routing and MVC architecture  
- Working with MongoDB and Mongoose for full CRUD functionality  
- Handling file uploads and cloud storage via Cloudinary  
- Structuring Express middleware and controller logic  
- Integrating AI tools into full-stack applications  
- Creating responsive, clean UIs with DaisyUI  
- Building secure login systems with Passport  

---

## Future Improvements

The following features are currently being developed or planned:


- Search and filtering by tags or categories  
- User dashboard for saved and drafted projects  
- Responsive mobile-first design refinements  

---
