# Learning Notifier

A NestJS application that sends daily learning topics to registered users via email using AI-generated content.

## Features

- **Modern Home Page**: Beautiful, responsive UI showcasing the product with animations and modern design
- **User Registration**: Register users with email and name
- **Admin Authentication**: Admin-only operations protected with admin code
- **Protected API Documentation**: Swagger UI protected with admin code authentication
- **AI-Generated Content**: Uses Google Gemini AI to generate unique daily learning topics
- **Content Storage**: Prevents duplicate content generation by storing previous topics
- **Automated Notifications**: Sends daily emails at 9 AM using cron jobs
- **RESTful API**: Complete CRUD operations for user management
- **Swagger Documentation**: Interactive API documentation with authentication
- **Modern Email Design**: Beautiful, responsive HTML email templates
- **MongoDB Integration**: Persistent user data and content storage
- **Topic Focus**: Covers React, System Design, Core JavaScript, Backend Development, and Interview Prep

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini AI
- **Scheduling**: @nestjs/schedule
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Email**: Custom email service

## API Endpoints

### Home
- `GET /` - Beautiful home page with modern UI and product showcase

### Registration
- `GET /register` - Get all users (requires admin code)
- `POST /register` - Register new user (admin code required for admin users)
- `GET /register/:id` - Get user by ID
- `PUT /register/:id` - Update user (admin code required for admin operations)
- `DELETE /register/:id` - Delete user (requires admin code)

### Notifications
- `POST /notify/test` - Send test notification
- `POST /notify/trigger` - Manually trigger daily notifications

### Swagger Authentication
- `GET /swagger-auth/verify` - Verify admin code for Swagger access

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/learning-notifier

# Application Configuration
PORT=3000

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
EMAIL=your_email@example.com

# Admin Configuration
ADMIN_CODE=ADMIN123
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see above)

4. Start the application:
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## Usage

1. **Home Page**: Visit `http://localhost:3000/` to see the beautiful home page with product showcase
2. **Register Users**: Use the `/register` endpoint to add users
   - For admin users: Include `adminCode` and set `isAdmin: true`
   - Default admin code: `ADMIN123` (configurable via `ADMIN_CODE` env var)
3. **Admin Operations**: Use admin code for user management operations
4. **Automatic Notifications**: The app automatically sends daily learning topics at 9 AM
5. **Content Uniqueness**: System prevents duplicate content by storing previous topics
6. **Test Notifications**: Use `/notify/test` to send test emails
7. **API Documentation**: Visit `http://localhost:3000/api` for Swagger docs (requires admin code)

## Project Structure

```
src/
├── app.module.ts              # Main application module
├── main.ts                    # Application bootstrap
├── auth/
│   ├── admin-auth.service.ts  # Admin authentication service
│   ├── admin-auth.module.ts   # Admin auth module
│   ├── swagger-auth.service.ts # Swagger authentication service
│   ├── swagger-auth.controller.ts # Swagger auth endpoints
│   └── swagger-auth.middleware.ts # Swagger protection middleware
├── constants/
│   └── prompt.ts              # AI prompt templates
├── content/
│   ├── schemas/
│   │   └── content.schema.ts  # Content storage schema
│   ├── content.service.ts     # Content management service
│   └── content.module.ts      # Content module
├── email/
│   ├── email.service.ts       # Email sending service
│   └── email.module.ts        # Email module
├── home/
│   ├── home.controller.ts     # Home page controller
│   └── home.module.ts         # Home module
├── notify/
│   ├── notify.service.ts      # Notification logic
│   ├── notify.controller.ts   # Notification endpoints
│   └── notify.module.ts       # Notification module
├── register/
│   ├── dto/
│   │   └── user.dto.ts        # User data transfer objects
│   ├── schemas/
│   │   └── user.schema.ts     # MongoDB user schema
│   ├── register.service.ts    # User management service
│   ├── register.controller.ts # User endpoints
│   └── register.module.ts     # Registration module
└── topics/
    ├── topics.service.ts      # AI content generation
    └── topics.module.ts       # Topics module
```

## Development

- **Linting**: `npm run lint`
- **Testing**: `npm run test`
- **Build**: `npm run build`

## License

This project is licensed under the UNLICENSED license.