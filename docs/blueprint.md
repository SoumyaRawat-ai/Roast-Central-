# **App Name**: Roast Central

## Core Features:

- Profile Creation: Implement a user-friendly interface for uploading photos or writing bios.
- AI Roast Generation: Integrate an AI model to generate funny and edgy roasts based on user inputs, ensuring the roasts are never cruel.
- Roast Feed Display: Design a simple feed to display roasts with reactions (😂/🤬/🔥/🗑️) and sharing options.
- AI Voice Roasting: Use an AI tool (like ElevenLabs or Google TTS) to generate voice roasts in various styles (sarcastic guy, rude grandma, etc.).
- User Profile: Implement a profile page to show received roasts, given roasts, and basic user stats.

## Style Guidelines:

- Dark mode as the primary theme to give an edgy and stylish feel.
- Accent color: Flame Orange (#FF5733) to highlight interactive elements and calls to action.
- Use rounded cards for content display to provide a modern look.
- Implement subtle animations for toast-style reactions when roasts are revealed.
- Use custom emoji for reactions to enhance user engagement.

## Original User Request:
🔥 App Name: RoastMe – Get Roasted or Roast Back!
🎯 Core Concept
A fun, social app where users can upload a photo or write a short bio, and get roasted by:

AI (funny, edgy, but never cruel)

Real users

Voice roasts (AI-generated or user-uploaded)

Users can share their roasts on social media, challenge friends, and climb roast leaderboards.

🧱 Full Feature List
👤 User Onboarding
Sign in: Google, Apple, Email

Set username, profile pic

Age verification (13+ with AI moderation)

📸 Upload or Create Profile to Get Roasted
Upload photo OR write a short bio

Pick roast mode:

AI Roast (default)

User Roast (gets added to community queue)

Voice Roast (AI TTS or real users)

Optional: select roast level:

Light 🔥 / Medium 🔥🔥 / Savage 🔥🔥🔥

😂 Roast Feed (Explore Section)
Infinite scroll of top roasts

Tap to expand roast + image or profile

React: 😂 / 🤬 / 🔥 / 🗑️

Share button → saves as video or meme

✍️ Roast Others
Scroll “waiting for roast” feed

Tap to write a roast or record a voice roast

Earn roast points & climb leaderboard

Users can upvote or downvote roasts

🏆 Leaderboard & Gamification
Top Roasters of the Day / Week

Roast Points earned for:

Upvotes on your roast

Number of roasts submitted

Sharing content

Badges: Roast King, Meme Master, AI Whisperer

🔊 Voice Roasts
AI voice roasting: Pick from voices (sarcastic guy, rude grandma, British villain, etc.)

TTS powered by ElevenLabs or Google TTS

Option for users to upload 10s voice roasts

🎛️ Profile Page
Your received roasts

Roasts you've given

Follower count & badges

Settings (privacy, block users, report, etc.)

💸 Monetization (Ad-First Focus)
Ad Types:
🔁 Interstitial ads after each roast

🎁 Rewarded video ads to unlock premium voices or extra AI roasts

📦 Banner ads on scroll pages

💳 In-app purchases:

Premium subscription = ad-free + bonus AI voices + early access to features

Buy Roast Credits to request top roasters

🎨 UI/UX Design (Professional Look)
🧪 Design Language:
Dark mode by default (edgy & stylish)

Neon color accents (purple 🔮, flame orange 🔥)

Rounded cards, smooth animations

Toast-style reactions for roast reveal

Custom emoji for reactions

📱 Key Screens:
Splash Screen: Animated flame logo with glitch text effect

Home Feed: Card-based roast explorer with image, roast, and reaction buttons

Upload Flow: Step-by-step UI: upload → choose roast mode → roast level

Roast Submission: Large text input / voice record button, preview before post

Leaderboard: Gamified UI with avatars, roast stats, flame animations

Profile: Scrollable timeline of received roasts, your top contributions, and followers

Settings: Minimal but clean, with toggles for notifications, privacy, etc.

🛠️ Tech Stack (Cross-Platform + Scalable)
Frontend (Mobile):
Framework: Flutter (fast, beautiful, Android + iOS)

Design: Figma → FlutterFlow or custom Flutter widgets

State Management: Riverpod or Bloc

Backend:
Authentication: Firebase Auth

Storage: Firebase Storage (images, audio)

Database: Firestore (user data, roast metadata)

AI Roast Gen:

OpenAI for roast generation (chat/gpt-4-turbo, with roast prompt tuning)

Voice TTS:

ElevenLabs API or Google Cloud Text-to-Speech

Moderation:

Hive AI or AWS Rekognition for image & text safety

Notifications:

Firebase Cloud Messaging

Admin Panel:
Monitor flagged roasts

Control leaderboard manipulation

Ban/report handling

🚀 Launch Strategy
Soft Launch: Target university campuses, meme pages, TikTok creators

Social Campaign: “Challenge your friend to a roast battle” reels + Twitter memes

UGC Boost: Make it easy to share roasts as memes or reels

Influencer Partnerships: Give creators custom AI voices

Daily Roast Streaks: Push notifications to get people back daily

📆 MVP Development Timeline (8–10 Weeks)

Week	Task
1–2	UI/UX design + branding + Figma prototypes
3–4	Firebase setup, photo upload, AI roast gen
5–6	Feed, reactions, user profile
7–8	Leaderboard, voice roast, ad integration
9–10	Testing, security, moderation, deployment
Want me to:

Start building the Figma UI design?

Write the AI prompts for roasting?

Generate a pitch deck for investors?

Help with Flutter codebase architecture?
  