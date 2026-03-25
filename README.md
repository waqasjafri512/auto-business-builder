# Auto Business Builder 🚀

Auto Business Builder is a high-end, AI-driven platform designed to transform business ideas into comprehensive startup kits. It leverages cutting-edge LLMs (Llama 3.3 via Groq) to generate full business strategies, marketing plans, and ready-to-use landing page content.

## 🏗️ Architecture

The project follows a modular 3-tier architecture:

1.  **Frontend**: A modern, responsive React application with a premium "Glassmorphism" aesthetic.
2.  **Core Backend**: A robust NestJS application handling user authentication, organization management, and project persistence.
3.  **AI Service**: A specialized Express service that interfaces with Groq AI to generate structured business data.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS (Premium Glassmorphism Design System)
- **Animations**: Framer Motion
- **Routing**: React Router 7
- **Feedback**: React Hot Toast

### Core Backend
- **Framework**: NestJS 11
- **Database**: MongoDB (via Mongoose 9)
- **Security**: Passport.js + JWT Authentication
- **Payments**: Stripe Integration (Planned/Partial)
- **Communication**: Axios (for AI Service integration)

### AI Service
- **Framework**: Express 5
- **AI Engine**: Groq (Llama-3.3-70b-versatile)
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v22.0.0 or higher
- **MongoDB**: A running instance (local or Atlas)
- **API Keys**: Groq API Key, JWT Secret

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd auto-business-builder
    ```

2.  **Configure Environment Variables**:
    Create `.env` files in each service directory based on the following templates:

    **`backend/.env`**:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/autobiz
    JWT_SECRET=your_secret_key
    AI_SERVICE_URL=http://localhost:3001
    ```

    **`ai-service/.env`**:
    ```env
    PORT=3001
    GROK_API_KEY=your_groq_api_key
    ```

3.  **Install Dependencies**:
    Run `npm install` in all three directories: `frontend`, `backend`, and `ai-service`.

4.  **Running the Project**:
    Open three terminals and run the following in each:

    - **AI Service**: `cd ai-service && npm run dev`
    - **Backend**: `cd backend && npm run start:dev`
    - **Frontend**: `cd frontend && npm run dev`

## ✨ Core Features

- **AI Strategy Generator**: Converts a simple text idea into a multi-section business plan.
- **Organization Support**: Built-in multi-tenancy for business teams.
- **Premium UI**: Dark-themed, glass-morphic interface designed for a high-end experience.
- **Project Tracking**: Save and manage multiple business ideas in one dashboard.

## 📁 Project Structure

```text
/
├── ai-service/     # AI processing & Groq integration
├── backend/        # Core business logic & API
├── frontend/       # User interface & dashboard
└── shared/         # Common TypeScript types
```
