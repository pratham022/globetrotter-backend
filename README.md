

# 🏆 The Globetrotter Challenge - Backend  

This is the **backend** of the "The Globetrotter Challenge" game, handling game logic, user authentication, and score management.  

## 🚀 Tech Stack  
- **Backend Framework:** Node.js + Express.js  
- **Database:** MongoDB (Hosted on MongoDB Atlas)  
- **Storage:** MongoDB Collections (Users, Invites, Scores)  
- **Deployment:** Render

## 🎯 Features
✅ We have seeded data for over 100 different cities across the globe. So users can get enough random cities as they play the game. 

✅ Create & validate invite links

✅ Store & update user scores

✅ Guest mode & logged-in user support

## 🚀 Deployment
Hosted on Render: https://globetrotter-frontend.onrender.com/

## 📡 API Endpoints

- GET /api/destinations/quiz - Returns a random quiz question
- POST /api/destinations/quiz/validate - Checks if the user choice is correct for the given question
- POST /api/invite – Generate invite link
- GET /api/invite/:inviteCode – Fetch invite details
- POST /api/users/update-score – Update user score
- POST /api/users/register – Registers / logs in the user

## Why we chose MongoDB (Database)?

#### Schema Flexibility:
The game requires storing user scores, invites, and session details without a rigid schema. The structure of game-related data might evolve over time (e.g., adding new game modes or metadata fields). MongoDB allows dynamic schema updates without affecting existing data.

#### Performance & Speed (Read/Write Operations):
Since each user/game session is independent, MongoDB’s document-based structure allows quick retrieval. No need for expensive JOIN operations, as related data (e.g., user profile & scores) is stored within one document. MongoDB’s indexing and sharding improve performance under high traffic.

### Scalability & Horizontal Scaling
MongoDB supports horizontal scaling (distributing data across multiple servers) using sharding. Useful for handling high concurrent traffic (e.g., many players playing at once). Example: If our game grows to millions of players, we can distribute load across multiple nodes.

### Cloud Integration (MongoDB Atlas):
We deployed MongoDB on Atlas, which provides automatic backups, scaling, and security.

## Why MERN?
- Express.js:	Lightweight, efficient REST API framework
- Node.js:	Asynchronous, fast, uses JavaScript throughout
- React.js:	Component-based, fast UI updates, reusable code

## Frontend
The frontend repository is here: https://github.com/pratham022/globetrotter-frontend/tree/main

