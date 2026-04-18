# Gnotro Deployment Guide

This guide will help you deploy your Gnotro social blogging platform to production.

## Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. **Prepare Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Connect your GitHub repository
   - Select the `frontend` folder
   - Add environment variables:
     - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.railway.app`)
   - Click "Deploy"

#### Backend Deployment (Railway)

1. **Prepare Backend**
   - Ensure `Procfile` exists in backend folder
   - Update `CLIENT_URL` in `.env` to your Vercel URL

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Connect your GitHub repository
   - Select the `backend` folder
   - Add environment variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secure_jwt_secret
     CLIENT_URL=https://your-frontend-domain.vercel.app
     ```
   - Click "Deploy"

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### Frontend Deployment (Netlify)

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository for continuous deployment

#### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   heroku create your-app-name
   heroku config:set PORT=5000
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_secure_jwt_secret
   heroku config:set CLIENT_URL=https://your-frontend-domain.netlify.app
   git push heroku main
   ```

### Option 3: Render (Full Stack)

1. **Go to [render.com](https://render.com)**
2. **Create Web Service for Backend**
   - Connect GitHub repository
   - Select `backend` folder
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add environment variables

3. **Create Static Site for Frontend**
   - Connect same repository
   - Select `frontend` folder
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## Environment Variables Setup

### Required Environment Variables

For Backend:

```env
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=your_frontend_domain_url
```

For Frontend (Vercel/Netlify):

```env
VITE_API_URL=your_backend_domain_url
```

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Get connection string
4. Add to environment variables

#### Option 2: Railway MongoDB
1. Add MongoDB service in Railway
2. Use provided connection string

#### Option 3: DigitalOcean
1. Create MongoDB cluster
2. Get connection string

## Domain Configuration

### Custom Domain Setup

#### Vercel
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records

#### Railway
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records

#### Netlify
1. Go to Site settings
2. Click "Domain management"
3. Add custom domain
4. Update DNS records

## SSL/HTTPS

All recommended platforms (Vercel, Railway, Netlify, Render) provide free SSL certificates automatically.

## Testing Deployment

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

2. **Frontend Access**
   - Open your frontend URL
   - Test signup/login functionality
   - Create articles and posts
   - Test all features

3. **API Testing**
   ```bash
   # Test articles endpoint
   curl https://your-backend-url.railway.app/api/articles
   
   # Test auth endpoint
   curl -X POST https://your-backend-url.railway.app/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test User","username":"testuser","email":"test@example.com","password":"password123"}'
   ```

## Performance Optimization

### Frontend
- Enable gzip compression (handled by Vercel/Netlify)
- Optimize images
- Use CDN for static assets

### Backend
- Enable database indexing
- Implement caching
- Use CDN for static files

## Monitoring and Logs

### Vercel
- Built-in analytics and logs
- Performance metrics
- Error tracking

### Railway
- Application logs
- Performance metrics
- Error tracking

### Netlify
- Build logs
- Function logs
- Form submissions

## Troubleshooting

### Common Issues

#### CORS Errors
- Ensure `CLIENT_URL` is set correctly in backend
- Check frontend API URL in environment variables

#### Database Connection
- Verify MongoDB connection string
- Check network access
- Ensure database user has correct permissions

#### Build Failures
- Check package.json scripts
- Verify all dependencies are installed
- Check for syntax errors

#### Environment Variables
- Ensure all required variables are set
- Check for typos in variable names
- Verify variable values are correct

### Debugging Steps

1. **Check Logs**
   - Vercel: Dashboard > Functions
   - Railway: Logs tab
   - Netlify: Site > Overview

2. **Test API Endpoints**
   - Use Postman or curl
   - Check response codes and messages

3. **Verify Environment Variables**
   - Print environment variables in logs
   - Check platform dashboard

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive data
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use MongoDB Atlas security features
   - Enable authentication
   - Use network whitelisting

3. **API Security**
   - Implement rate limiting
   - Validate input data
   - Use HTTPS only

## Backup Strategy

1. **Database Backup**
   - MongoDB Atlas automatic backups
   - Manual backups before major changes

2. **Code Backup**
   - GitHub repository
   - Tag releases

## Scaling

### When to Scale
- High traffic
- Slow response times
- Resource utilization

### Scaling Options
- Vertical scaling (more resources)
- Horizontal scaling (multiple instances)
- Database scaling

## Cost Optimization

### Free Tier Limits
- Vercel: 100GB bandwidth/month
- Railway: $5/month after free trial
- Netlify: 100GB bandwidth/month
- MongoDB Atlas: 512MB free

### Optimization Tips
- Optimize images and assets
- Implement caching
- Monitor resource usage
- Clean up unused resources

---

## Quick Deployment Checklist

- [ ] Create GitHub repository
- [ ] Set up MongoDB Atlas
- [ ] Configure environment variables
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Update CORS settings
- [ ] Test all functionality
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring
- [ ] Set up backups

Your Gnotro platform is now live!
