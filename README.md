# Gnotro - Modern Social Blogging Platform

A full-stack social blogging platform where users can create articles, engage in discussions, like, comment, and interact with content in a modern, responsive interface.

## Features

### Core Functionality
- **User Authentication**: Sign up, login, logout with full name support
- **Article Management**: Create, read, and manage articles with cover images
- **Discussion System**: Create and participate in discussions
- **Social Interactions**: Like, repost, save, and comment on content
- **Profile Management**: Edit profiles with image upload support
- **Search Functionality**: Search articles and content by title, content, or author

### Technical Features
- **Database Persistence**: All content persists across sessions and logins
- **Real-time Updates**: Interactive UI with immediate feedback
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Toggle between light and dark modes
- **Modern UI**: Glassmorphism effects and smooth animations

## Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **CSS Variables** - Theme management
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Socket.io** - Real-time messaging

## Project Structure

```
gnotro-project/
|
|--- frontend/                 # React frontend
|   |--- src/
|   |   |--- components/       # Reusable UI components
|   |   |--- pages/           # Page components
|   |   |--- context/         # React contexts
|   |   |--- services/        # API service layer
|   |   |--- utils/           # Utility functions
|   |   |--- styles/          # CSS and styling
|   |   |--- App.jsx          # Main app component
|   |   |--- main.jsx         # App entry point
|   |--- public/              # Static assets
|   |--- package.json         # Frontend dependencies
|
|--- backend/                  # Node.js backend
|   |--- models/              # Database models (User, Article, Post)
|   |--- routes/              # API routes (auth, articles, posts)
|   |--- middleware/          # Custom middleware
|   |--- server.js            # Main server file
|   |--- package.json         # Backend dependencies
|   |--- .env                 # Environment variables
|
|--- README.md                # Project documentation
|--- .gitignore               # Git ignore file
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/gnotro-project.git
cd gnotro-project
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gnotro
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5174
```

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm start
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5174
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id/like` - Like/unlike article
- `POST /api/articles/:id/comment` - Comment on article
- `GET /api/articles/search/:query` - Search articles

### Posts/Discussions
- `GET /api/posts` - Get all posts/discussions
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Like/unlike post
- `PUT /api/posts/:id/repost` - Repost/unrepost
- `PUT /api/posts/:id/save` - Save/unsave post
- `POST /api/posts/:id/comment` - Comment on post
- `DELETE /api/posts/:id` - Delete post

## Database Schema

### User Model
```javascript
{
  fullName: String (required),
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  profilePicture: String,
  followers: [ObjectId],
  following: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Article Model
```javascript
{
  author: ObjectId (ref: 'User'),
  title: String (required),
  content: String (required),
  coverImage: String,
  likes: [ObjectId],
  comments: [Comment],
  saves: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  author: ObjectId (ref: 'User'),
  title: String (required),
  content: String (required),
  type: String (discussion/post),
  likes: [ObjectId],
  reposts: [ObjectId],
  comments: [Comment],
  saves: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Deploy the backend folder
3. Update `CLIENT_URL` in production environment variables

### Environment Variables for Production
```env
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=your_frontend_domain_url
```

## Features in Detail

### User Authentication
- Full name and username support
- Secure password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies for security

### Content Management
- Rich text articles with cover images
- Discussion posts with engagement metrics
- Real-time like, comment, and save functionality
- Content search with full-text search

### Social Features
- User profiles with customizable information
- Follow/follower system (ready for implementation)
- Content saves for later reading
- Real-time notifications (Socket.io ready)

### UI/UX
- Responsive design for all screen sizes
- Dark/light theme toggle
- Glassmorphism effects and modern aesthetics
- Smooth animations and transitions
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

- Your Name - [@yourusername](https://github.com/yourusername)

## Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database
- All contributors and users of Gnotro

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] User messaging system
- [ ] Content moderation tools
- [ ] Analytics dashboard
- [ ] Mobile app development
- [ ] Content recommendation engine
- [ ] Multi-language support

---

**Gnotro** - Where ideas meet community!
