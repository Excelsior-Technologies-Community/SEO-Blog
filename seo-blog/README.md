# SEO Blog

## Features

- **Modern UI**: Clean, professional design with pure CSS (no Tailwind)
- **Admin Authentication**: Secure login system with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **Image Upload**: Upload featured images for blog posts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Professional Styling**: Custom CSS with smooth animations and hover effects
- **Protected Routes**: Admin-only access for content management

## Screenshots

### Homepage

![Blog Homepage](./frontend/public/ProjetImages/Screenshot%202025-12-05%20115735.png)

### Blog Posts Listing

![Blog Posts](./frontend/public/ProjetImages/Screenshot%202025-12-05%20115750.png)

### Post Detail Page

![Post Detail](./frontend/public/ProjetImages/Screenshot%202025-12-05%20115829.png)

### Admin Dashboard & Post Management

![Admin Features](./frontend/public/ProjetImages/Screenshot%202025-12-05%20115846.png)

## Tech Stack

### Frontend

- **React 18** - UI library
- **Vite 5** - Fast build tool and dev server
- **React Router 6** - Client-side routing
- **Pure CSS** - Custom styling without frameworks

### Backend

- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Multer** - File upload handling
- **JWT** - Authentication tokens

## Admin Credentials

**Email:** `admin@gmail.com`  
**Password:** `12345678`

> **Important:** Change these credentials in production!

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection URI)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd seo-blog
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create `.env` file in the `backend` folder:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/seo-blog
   JWT_SECRET=your_jwt_secret_key
   ```

   Create `.env` file in the `frontend` folder:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**

   ```bash
   # Windows
   net start MongoDB

   # Or run mongod directly
   mongod
   ```

6. **Start Backend Server**

   ```bash
   cd backend
   npm start
   ```

7. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Public Access

- View all blog posts
- Read individual posts
- Browse by latest posts

### Admin Access

1. Navigate to http://localhost:3000/login
2. Login with admin credentials
3. Create new posts with images
4. Edit existing posts
5. Delete posts

## Project Structure

```
seo-blog/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & upload middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Database connection
│   │   └── app.js           # Express app setup
│   ├── uploads/             # Uploaded images
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/           # React page components
    │   ├── components/      # Reusable React components
    │   ├── context/         # Auth context
    │   ├── lib/             # API utilities
    │   └── styles/          # CSS files
    ├── index.html           # HTML entry point
    └── package.json
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get post by slug
- `POST /api/posts` - Create post (Admin only)
- `PUT /api/posts/:id` - Update post (Admin only)
- `DELETE /api/posts/:id` - Delete post (Admin only)

### Static Files

- `GET /uploads/:filename` - Access uploaded images

## Features in Detail

### Image Upload

- Supports JPG, PNG, GIF, WebP formats
- 5MB file size limit
- Automatic file validation
- Preview before upload
- Stored locally in `backend/uploads/`

### Authentication

- JWT-based authentication
- Token stored in localStorage
- Protected routes on backend
- Conditional UI rendering on frontend

### Styling

- Pure CSS (no frameworks)
- CSS variables for theming
- Responsive grid system
- Smooth transitions and animations
- Custom scrollbar

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Build for Production

```bash
# Frontend
cd frontend
npm run build  # Creates dist/ folder
npm run preview  # Preview production build

# Backend
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.

---

**Built with React.js and Express.js**
