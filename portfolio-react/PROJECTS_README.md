# Portfolio React - Projects Documentation

## Overview
This portfolio contains 4 fully functional React applications showcasing different aspects of web development:

1. **Mphemba Matrix** - E-Commerce Platform
2. **Car Voting App** - Interactive Voting Application
3. **Health Aid Chatbot** - AI-Powered Health Assistant
4. **Chicken Licken Clone** - Restaurant Website

## Project Structure
```
portfolio-react/
├── src/
│   ├── components/          # Main portfolio components
│   ├── projects/            # Individual project applications
│   │   ├── MphembaMatrix/
│   │   │   ├── MphembaMatrix.jsx
│   │   │   └── MphembaMatrix.css
│   │   ├── CarVoting/
│   │   │   ├── CarVoting.jsx
│   │   │   └── CarVoting.css
│   │   ├── HealthChatbot/
│   │   │   ├── HealthChatbot.jsx
│   │   │   └── HealthChatbot.css
│   │   └── ChickenLicken/
│   │       ├── ChickenLicken.jsx
│   │       └── ChickenLicken.css
│   ├── App.jsx              # Main app with routing
│   └── main.jsx
├── .env                     # Environment variables (not in git)
├── .env.example             # Example env file
└── package.json
```

## Environment Variables

### Health Chatbot API Key
The Health Chatbot uses Google's Gemini AI API. Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_API_VERSION=v1beta
VITE_MODEL_NAME=gemini-1.5-flash-latest
```

**Important:** The `.env` file is git-ignored for security. Use `.env.example` as a template.

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps
1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Google Gemini API key

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Routes

- `/` - Main portfolio page
- `/projects/mphemba-matrix` - Mphemba Matrix E-Commerce
- `/projects/car-voting` - Car Voting Application
- `/projects/health-chatbot` - Health Aid Chatbot
- `/projects/chicken-licken` - Chicken Licken Restaurant

## Features by Project

### 1. Mphemba Matrix (E-Commerce)
- Product catalog with filtering
- Shopping cart functionality
- Category-based navigation
- Responsive design
- Add to cart with quantity management
- Real-time cart total calculation

**Technologies:** React, React Icons, CSS3

### 2. Car Voting App
- Interactive voting system
- Real-time vote counting
- Chart.js data visualization (Bar & Pie charts)
- Leaderboard with rankings
- Local storage persistence
- Auto-rotating carousel
- Responsive design

**Technologies:** React, Chart.js, React-Chartjs-2, CSS3

### 3. Health Aid Chatbot
- AI-powered health information
- Gemini AI integration
- Conversation history management
- Suggested questions
- Real-time typing indicators
- Message persistence
- Responsive chat interface

**Technologies:** React, Google Gemini AI, CSS3

**API:** Requires Gemini API key in `.env` file

### 4. Chicken Licken Clone
- Menu showcase with filtering
- Auto-rotating promotional carousel
- Modal popup for meal details
- Responsive grid layout
- Order functionality simulation

**Technologies:** React, React Icons, CSS3

## Dependencies

### Core
- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.x

### UI & Styling
- Bootstrap 5.3.2
- React Bootstrap 2.9.2
- React Icons 4.12.0

### Data Visualization
- Chart.js 4.x
- React-Chartjs-2 5.x

### Animation
- Framer Motion 10.16.16
- React Scroll 1.9.0
- Typed.js 2.1.0

### Build Tool
- Vite 5.0.8

## Development Notes

### Adding New Projects
1. Create a new folder in `src/projects/[ProjectName]`
2. Add `[ProjectName].jsx` and `[ProjectName].css`
3. Update `src/App.jsx` to add the route
4. Update `src/components/Projects.jsx` to add project details

### Environment Variables in Vite
- Use `import.meta.env.VITE_` prefix for all env variables
- Access with `import.meta.env.VITE_VARIABLE_NAME`

### Routing
- Internal project routes use React Router's `Link` component
- External links use standard anchor tags with `target="_blank"`
- `isInternal` flag in project data determines routing method

## Security Notes

1. **API Keys:** Never commit `.env` file to version control
2. **Git Ignore:** Ensure `.env` is in `.gitignore`
3. **Environment Variables:** Use `.env.example` to document required variables
4. **Client-Side API:** Be aware that Vite environment variables are exposed to the client

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Lazy loading images
- Code splitting with React Router
- CSS optimization
- Vite's fast build process
- Local storage for data persistence

## Troubleshooting

### Module Not Found Errors
```bash
npm install --legacy-peer-deps
```

### API Key Not Working
1. Check `.env` file exists in root directory
2. Verify API key is correct
3. Ensure variable name starts with `VITE_`
4. Restart dev server after adding env variables

### Chart.js Not Rendering
Ensure Chart.js components are registered:
```javascript
import { Chart as ChartJS } from 'chart.js';
ChartJS.register(...);
```

### Router Not Working
Verify `BrowserRouter` is wrapping your app in `App.jsx`

## Future Enhancements
- [ ] Backend API integration for Mphemba Matrix
- [ ] User authentication system
- [ ] Database integration for data persistence
- [ ] Payment gateway integration
- [ ] More AI models for the chatbot
- [ ] Real-time order tracking for restaurant
- [ ] Admin dashboard for managing content

## License
This project is for portfolio purposes. Individual components may have their own licenses.

## Author
**Simangaliso Mazweni Ntuli**  
Front-End Developer

---

For questions or issues, please open an issue on GitHub or contact the developer directly.
