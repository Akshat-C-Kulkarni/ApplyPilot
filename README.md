# ApplyPilot

ApplyPilot is an automated job application platform designed to streamline the recruitment process for both job seekers and recruiters. It features intelligent agentic workflows, role-based access control, and PDF generation capabilities.

## Key Features

### 👥 Dual Role System
- **Job Seeker**: Dedicated dashboard for managing profile, preferences, and tracking applications.
- **Recruiter**: Dashboard for posting jobs and managing candidates.

### 🚀 Job Seeker Tools
- **Preferences Setup**: Customizable job preferences form.
- **Resume Management**: Upload and confirmation workflow for resumes.
- **Monitoring Dashboard**: Real-time tracking of agent activities (Monitoring, Paused, Applying, Completed).
- **Application Results**: View summary of application outcomes.

### 💼 Recruiter Tools
- **Job Posting**: Interface to create and manage job listings.
- **Candidate Overview**: (Planned) View and manage incoming applications.

### 🔒 Security & Architecture
- **Authentication**: Secure login system with role-based routing (Job Seeker vs. Recruiter).
- **Protected Routes**: Ensures users can only access pages relevant to their role and current state.
- **Modern Stack**: Built with React, Vite, and Firebase.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **PDF Handling**: `jspdf` and `pdfjs-dist` for resume generation and processing.
- **Icons**: Lucide React
- **Linting**: ESLint

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akshat-C-Kulkarni/ApplyPilot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd applypilot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── context/         # React Context (AppContext for state/auth)
├── pages/           # Application pages (Dashboards, Forms, Auth)
│   ├── WelcomePage.jsx
│   ├── LoginPage.jsx
│   ├── JobSeekerDashboardPage.jsx
│   ├── RecruiterDashboardPage.jsx
│   └── ...
├── utils/           # Utility functions
├── App.jsx          # Main application component with Routing
└── main.jsx         # Entry point
```
