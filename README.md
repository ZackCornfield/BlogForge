# **Blog API with JWT Authentication**

This project is a **RESTful Blog API** built with **Express.js and Prisma**, featuring **JWT-based authentication**. It provides endpoints for managing **blog posts, comments, and user authentication**. The API is designed to be consumed by two front-end applications:  
1. **A public blog site** for reading and commenting on posts.  
2. **An admin dashboard** for creating, editing, and managing posts.

---

## **Preview**

<p>
  <img src="https://github.com/ZackCornfield/BlogForge/blob/main/screenshot_1.png" width="600">
</p>

<p>
  <img src="https://github.com/ZackCornfield/BlogForge/blob/main/screenshot_2.png" width="600">
</p>

<p>
  <img src="https://github.com/ZackCornfield/BlogForge/blob/main/screenshot_3.png" width="600">
</p>

**Video**

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/800eXupbENI/0.jpg)](https://www.youtube.com/watch?v=800eXupbENI)

---

## **Features**
✅ **User Authentication**: Secure login/logout system using **JWT tokens** stored in headers.  
✅ **Blog Posts**: Create, update, publish/unpublish, and delete blog posts.  
✅ **Comments**: Users can leave comments on posts.  
✅ **Authorization**: Only authenticated users can create/edit posts; guests can only read and comment.  
✅ **RESTful API**: Clean and structured API endpoints following REST principles.  
✅ **Database with Prisma ORM**: Simplifies database interactions with a clear schema.  

---

## **Tech Stack**
### **Backend**
- **Node.js & Express.js** - Backend framework  
- **Prisma** - ORM for database interactions  
- **PostgreSQL** - Database  
- **jsonwebtoken (JWT)** - Authentication  
- **bcryptjs** - Password hashing  
- **dotenv** - Environment variables  
- **CORS** - Handles cross-origin requests  

### **Frontend**
- **Client App (Blog Reader)** - Public-facing website for reading and commenting on posts.  
- **Admin App (Post Editor)** - Admin panel for managing blog posts and comments.  

## **API Endpoints**
### **Authentication**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| `POST` | `/api/auth/login` | Logs in a user and returns a JWT token. |
| `POST` | `/api/auth/logout` | Logs out a user (client must delete token). |
| `GET` | `/api/auth/check-login` | Checks if the user is authenticated. |

### **Blog Posts**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| `GET` | `/api/posts` | Fetch all published blog posts. |
| `GET` | `/api/posts/:id` | Fetch a specific blog post. |
| `POST` | `/api/posts` | Create a new blog post (requires authentication). |
| `PUT` | `/api/posts/:id` | Edit an existing post (requires authentication). |
| `DELETE` | `/api/posts/:id` | Delete a post (requires authentication). |

### **Comments**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| `GET` | `/api/posts/:id/comments` | Get comments for a specific post. |
| `POST` | `/api/posts/:id/comments` | Add a comment to a post. |
| `DELETE` | `/api/comments/:id` | Delete a comment (admin only). |

---

## **Authentication & Authorization**
- **JWT Token**: Users receive a **JWT token** upon logging in, which must be included in all **protected routes**.
- **Authorization Header**: Attach the token to requests:
  ```
  Authorization: Bearer YOUR_TOKEN_HERE
  ```
- **Access Control**:
  - **Guests**: Can read posts and leave comments.
  - **Authenticated Users**: Can create/edit their own posts.
  - **Admins**: Can manage all posts and delete comments.
