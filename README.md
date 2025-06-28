# EM Tools Frontend

A comprehensive React + TypeScript dashboard for managing incubation projects, hiring pipelines, and AI-assisted analytics.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will run on `http://localhost:3000`

## Project Structure

```
src/
├── projects/           # Project management components
│   ├── Overview.tsx    # Executive dashboard
│   ├── Project.tsx     # Individual project details
│   ├── Data.tsx        # Editable project data table
│   └── FunnelChart.tsx # Reusable chart component
├── hiring/             # Hiring pipeline components
│   ├── Overview.tsx    # Hiring metrics dashboard
│   ├── Requisition.tsx # Individual requisition tracking
│   └── Data.tsx        # Editable candidate data table
├── Projects.tsx        # Main projects page with tabs
├── Ask.tsx             # AI chatbot interface
├── Hiring.tsx          # Main hiring page with tabs
└── App.tsx             # Main application layout
```

## Features

### 🚀 Projects Management
- **Overview Dashboard**: Executive-level metrics for incubation projects
  - Active projects count and completion times
  - Time to prototype and graduation decision metrics
  - Projects by stage distribution (Discovery → Prototype → Validation → Graduation)
  - Success factors and performance insights
- **Project Details**: Individual project tracking with dropdown selection
  - Business problem and target output definition
  - Key questions the prototype needs to answer
  - Progress tracking with timeline visualization
  - Team composition and budget oversight
- **Data Management**: Fully editable project data table
  - Inline editing with dropdowns for stages and status
  - Project lifecycle tracking
  - Comprehensive project metadata management

### 👥 Hiring Pipeline
- **Overview Dashboard**: Hiring metrics and KPIs
  - Open requisitions and average time to fill
  - Conversion rates and pipeline efficiency
  - Time to decision metrics
  - Recent graduations tracking
- **Requisition Management**: Individual requisition tracking
  - Detailed requisition information with dropdown selection
  - Hiring funnel visualization for each role
  - Stage conversion rates and timeline tracking
  - Go/no-go decision metrics
- **Candidate Data**: Editable hiring data table
  - Candidate pipeline management with inline editing
  - Stage progression tracking (Applied → Phone Screen → Technical → Onsite → Offer)
  - Source attribution and status management

### 🤖 AI Assistant
- **Conversational Interface**: ChatGPT-style chat experience
  - Real-time messaging with typing indicators
  - Context-aware responses about projects and hiring data
  - Message history and chat management
  - Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- **Business Intelligence**: Simulated AI-powered insights
  - Project performance analysis
  - Hiring pipeline optimization suggestions
  - Data-driven recommendations

## Technology Stack

- **React 18** with TypeScript for type safety
- **Ant Design** for comprehensive UI component library
- **Nivo** for interactive data visualizations and charts
- **CSS-in-JS** with custom theming and responsive design

## Key Components

### Layout & Navigation
- **App.tsx**: Main application with sidebar navigation and theming
- **ConfigProvider**: Custom theme configuration with brand colors

### Data Visualization
- **FunnelChart**: Reusable horizontal funnel chart component
- **Progress Charts**: Various progress and metric visualizations
- **Timeline Components**: Project and hiring timeline tracking

### Interactive Tables
- **Editable Tables**: Inline editing with Ant Design Table components
- **Dropdown Selectors**: Stage, status, and category management
- **Real-time Updates**: Immediate state updates without page refresh

## Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (irreversible)

### Code Organization
- **Component-based architecture** with clear separation of concerns
- **TypeScript interfaces** for type safety and better developer experience
- **Modular folder structure** organized by feature domains
- **Reusable components** for charts, forms, and data display

### Styling & Theming
- **Ant Design ConfigProvider** for global theme customization
- **Custom color scheme** with brand-specific colors
- **Responsive design** principles throughout the application
- **Consistent spacing and typography** following design system

## Backend Integration

This frontend is designed to work with the EM Tools FastAPI backend. Key integration points:

- **State Management API**: Store and retrieve application state
- **Funnel Data API**: Save and load hiring funnel metrics
- **Future AI Integration**: Ready for real AI API connections

## Environment Variables

Create a `.env.local` file for development:
```
REACT_APP_API_URL=http://localhost:8001
REACT_APP_AI_API_KEY=your_openai_api_key
```

## Deployment

### Build for Production
```bash
npm run build
```

The `build` folder contains optimized static files ready for deployment.

### Deployment Options
- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: Static site hosting with continuous deployment
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerized deployment

## Future Enhancements

- [ ] Real AI/LLM integration for the assistant
- [ ] Advanced data export functionality (PDF, Excel)
- [ ] Real-time notifications and updates
- [ ] Enhanced mobile responsiveness
- [ ] User authentication and role-based access
- [ ] Advanced analytics and custom dashboards
- [ ] Drag-and-drop interface improvements
- [ ] Keyboard navigation and accessibility enhancements

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new components
3. Maintain consistent styling with Ant Design components
4. Add proper error handling and loading states
5. Test components thoroughly before committing