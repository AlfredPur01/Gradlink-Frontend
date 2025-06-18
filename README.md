# 🎓 GradLink - Alumni Registration Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer" alt="Framer Motion" />
</div>

<div align="center">
  <h3>🌟 Connecting Alumni Across Generations 🌟</h3>
  <p>A comprehensive platform for alumni networking, events, and professional development</p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo Accounts](#-demo-accounts)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

GradLink is a modern, full-featured alumni registration and networking platform designed to connect graduates from tertiary institutions and secondary schools across Nigeria. The platform facilitates meaningful professional relationships, career development, and community building among alumni.

### 🎯 Mission
To create a unified platform where alumni can reconnect, share opportunities, mentor each other, and build lasting professional networks that transcend graduation years and geographical boundaries.

## ✨ Features

### 👥 **User Management**
- **Multi-step Registration**: Comprehensive onboarding with educational history
- **Profile Management**: Complete profile with verification system
- **Role-based Access**: User, Institution Admin, and Super Admin roles
- **Profile Completion Tracking**: Gamified profile completion with progress indicators

### 💬 **Communication & Networking**
- **Real-time Chat**: Direct messaging and group conversations
- **Video Conferencing**: Built-in video calling with screen sharing
- **Community Groups**: Join and create alumni communities by institution, profession, or interest
- **Networking Events**: Discover and attend virtual and in-person events

### 🏛️ **Institution Management**
- **Alumni Verification**: Streamlined approval process for new registrations
- **Event Creation**: Organize homecomings, career fairs, and networking events
- **Bulk Communications**: Send announcements and newsletters to alumni
- **Analytics Dashboard**: Track engagement and alumni activity

### 🛡️ **Administrative Features**
- **Platform Oversight**: Comprehensive admin dashboard for platform management
- **User Moderation**: Report handling and user management tools
- **Institution Onboarding**: Manage institutional partnerships and verification
- **Analytics & Reporting**: Platform-wide insights and performance metrics

### 📱 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Adaptive theming for user preference
- **Smooth Animations**: Enhanced UX with Framer Motion
- **Progressive Web App**: App-like experience in the browser

## 🔐 Demo Accounts

Test the platform with these pre-configured demo accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Alumni User** | `demo@gradlink.ng` | `password123` | Standard user features |
| **Institution Admin** | `institution@gradlink.ng` | `inst123` | Institution management |
| **Super Admin** | `admin@gradlink.ng` | `admin123` | Full platform access |

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **shadcn/ui** - Modern UI component library

### **Backend & Data**
- **Next.js API Routes** - Serverless API endpoints
- **Context API** - State management
- **Local Storage** - Demo data persistence

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/gradlink-platform.git
   cd gradlink-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Setup

Create a `.env.local` file in the root directory:

\`\`\`env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GradLink

# Database (for production)
DATABASE_URL=your_database_url

# Authentication (for production)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email Service (for production)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=noreply@gradlink.ng
\`\`\`

## 📁 Project Structure

\`\`\`
gradlink-platform/
├── app/                          # Next.js App Router
│   ├── admin/                    # Super admin dashboard
│   ├── chat/                     # Real-time messaging
│   ├── communities/              # Alumni groups & communities
│   ├── dashboard/                # User dashboard
│   ├── events/                   # Event management
│   ├── institution/              # Institution admin panel
│   ├── login/                    # Authentication
│   ├── register/                 # Multi-step registration
│   ├── video/                    # Video conferencing
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   └── navbar.tsx                # Navigation component
├── contexts/                     # React Context providers
│   └── auth-context.tsx          # Authentication context
├── lib/                          # Utility functions
├── public/                       # Static assets
├── types/                        # TypeScript type definitions
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Project dependencies
\`\`\`

## 🔑 Key Features

### 🎯 **Multi-Role Dashboard System**

#### Alumni User Dashboard
- Profile completion tracking with gamification
- Connection management and networking tools
- Event discovery and registration
- Group participation and messaging
- Career opportunity sharing

#### Institution Admin Dashboard
- Alumni verification and approval workflow
- Event creation and management tools
- Bulk communication system for announcements
- Analytics for alumni engagement
- Department-wise alumni organization

#### Super Admin Dashboard
- Platform-wide user and institution management
- Content moderation and report handling
- System analytics and performance monitoring
- Institution onboarding and verification
- Platform configuration and settings

### 💬 **Advanced Communication System**

#### Real-time Chat
- Direct messaging between alumni
- Group conversations for communities
- Online status indicators
- Message read receipts
- File sharing capabilities
- Emoji and reaction support

#### Video Conferencing
- HD video calling with multiple participants
- Screen sharing for presentations
- Gallery and speaker view modes
- Meeting recording capabilities
- Integrated chat during calls
- Hand raising and participant management

### 🏛️ **Institution Integration**

#### Verification System
- Multi-step alumni verification process
- Document upload and validation
- Institutional admin approval workflow
- Automated verification for recognized institutions
- Manual review for edge cases

#### Event Management
- Create virtual and in-person events
- Registration and attendance tracking
- Event promotion and marketing tools
- Integration with video conferencing
- Post-event feedback and analytics

### 🌐 **Community Building**

#### Alumni Groups
- Institution-based communities
- Professional interest groups
- Regional and location-based groups
- Class year and graduation cohorts
- Special interest and hobby groups

#### Networking Features
- Alumni directory with advanced search
- Mentorship program matching
- Job opportunity sharing
- Professional skill endorsements
- Industry-specific networking

## 📸 Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing-page.png)
*Modern, responsive landing page with animated statistics and testimonials*

### User Dashboard
![User Dashboard](docs/screenshots/user-dashboard.png)
*Comprehensive dashboard with profile completion, quick actions, and activity feed*

### Chat Interface
![Chat Interface](docs/screenshots/chat-interface.png)
*Real-time messaging with contacts and groups, featuring modern UI design*

### Video Conferencing
![Video Conferencing](docs/screenshots/video-conference.png)
*Full-featured video calling with participant management and screen sharing*

### Event Management
![Event Management](docs/screenshots/events-page.png)
*Event discovery and registration with filtering and categorization*

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
*Comprehensive administrative interface for platform management*

## 📚 API Documentation

### Authentication Endpoints

\`\`\`typescript
// Login
POST /api/auth/login
Body: { email: string, password: string }
Response: { user: User, token: string }

// Register
POST /api/auth/register
Body: { userData: RegistrationData }
Response: { user: User, token: string }

// Logout
POST /api/auth/logout
Response: { success: boolean }
\`\`\`

### User Management

\`\`\`typescript
// Get user profile
GET /api/users/profile
Headers: { Authorization: Bearer <token> }
Response: { user: User }

// Update profile
PUT /api/users/profile
Body: { userData: Partial<User> }
Response: { user: User }

// Get connections
GET /api/users/connections
Response: { connections: User[] }
\`\`\`

### Events

\`\`\`typescript
// Get events
GET /api/events
Query: { category?, type?, search? }
Response: { events: Event[] }

// Create event
POST /api/events
Body: { eventData: EventData }
Response: { event: Event }

// Register for event
POST /api/events/:id/register
Response: { success: boolean }
\`\`\`

### Communities

\`\`\`typescript
// Get communities
GET /api/communities
Query: { category?, search? }
Response: { communities: Community[] }

// Join community
POST /api/communities/:id/join
Response: { success: boolean }

// Create community
POST /api/communities
Body: { communityData: CommunityData }
Response: { community: Community }
\`\`\`

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

### Development Workflow

1. **Fork the repository**
   \`\`\`bash
   git fork https://github.com/your-username/gradlink-platform.git
   \`\`\`

2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`

5. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`

6. **Open a Pull Request**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add proper error handling
- Include JSDoc comments for functions
- Write meaningful commit messages

### Testing

\`\`\`bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
\`\`\`

## 🐛 Bug Reports

Found a bug? Please create an issue with:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, etc.)

## 💡 Feature Requests

Have an idea for improvement? We'd love to hear it! Please:

- Check existing issues first
- Provide detailed description
- Explain the use case
- Consider implementation complexity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Vercel** for hosting and deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide React** for the icon library

## 📞 Support

Need help? Reach out to us:

- **Email**: support@gradlink.ng
- **Documentation**: [docs.gradlink.ng](https://docs.gradlink.ng)
- **Community Forum**: [community.gradlink.ng](https://community.gradlink.ng)
- **GitHub Issues**: [Create an issue](https://github.com/your-username/gradlink-platform/issues)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** with automatic CI/CD

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# Start the production server
npm run start
\`\`\`

### Docker Deployment

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

---

<div align="center">
  <p>Made with ❤️ by the GradLink Team</p>
  <p>© 2024 GradLink. All rights reserved.</p>
</div>
