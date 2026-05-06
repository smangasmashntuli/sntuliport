# Simangaliso Ntuli - Portfolio

A modern, responsive portfolio website built with React.js and Bootstrap, showcasing my skills, projects, and professional experience.

## Features

- 🎨 Modern and eye-catching design with gradient effects
- ⚡ Built with React.js and Vite for optimal performance
- 📱 Fully responsive design for all devices
- 🎭 Smooth animations and transitions
- 🎯 Interactive particle background effects
- 📊 Dynamic skills visualization with progress bars
- 🖼️ Project filtering and showcase
- 📧 Contact form with validation
- 🔗 Social media integration

## Screenshots

![Portfolio Preview](./public/images/portfolio-preview.png)

*A snapshot of the portfolio showcasing the modern interface and design with gradient effects*

## Live Demo

Visit the portfolio at: [https://smangasmashntuli.github.io/sntuliport](https://smangasmashntuli.github.io/sntuliport)

## Technologies Used

- **Frontend:** React.js, Bootstrap, React Bootstrap
- **Styling:** Custom CSS with modern effects
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Smooth Scrolling:** React Scroll
- **Typing Effect:** Typed.js
- **Build Tool:** Vite

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/smangasmashntuli/portfolio-react.git
   cd portfolio-react
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Build for Production

To create an optimized production build:

```bash
npm run build
```

The build files will be generated in the `dist` folder.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Key Sections

### 1. **Navigation**
   - Smooth scrolling navigation bar
   - Responsive mobile menu
   - Quick links to all sections
   - CV download button

### 2. **Hero Section**
   - Eye-catching introduction
   - Typing animation effect
   - Call-to-action buttons
   - Parallax background effects

### 3. **About**
   - Personal introduction
   - Key statistics
   - Contact information

### 4. **Education**
   - Academic qualifications
   - University details
   - Years of study

### 5. **Work Experience**
   - Professional journey
   - Internships and positions
   -ustomization

### Colors & Themes
The portfolio uses CSS variables defined in `src/index.css` for easy customization:

```css
:root {
  --ink: #0d0d0f;
  --deep: #111218;
  --surface: #16171f;
  --gold: #c9a84c;
  --gold-light: #e8c97a;
  --cream: #f0ead8;
  /* ... more variables */
}
```

### Adding New Projects
1. Create a new project component in `src/projects/`
2. Add project details to the `Projects` component
3. Update navigation routes in `App.jsx`

## Performance Optimizations

- Lazy loading of images
- Code splitting with React Router
- Optimized animations using GSAP
- Smooth scroll behavior with Lenis
- Responsive images and media queries

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Contact

- **Email:** smangasmashntuli@gmail.com
- **Phone:** (+27) 71 271 9018
- **GitHub:** [github.com/smangasmashntuli](https://github.com/smangasmashntuli)
- **LinkedIn:** [linkedin.com/in/simangaliso-mazweni-ntuli-1784a62b6](https://www.linkedin.com/in/simangaliso-mazweni-ntuli-1784a62b6)

## License

This project is open source and available under the MIT License. See the LICENSE file for more details.

---

**Made with ❤️ by Simangaliso Ntuli**ologies used

### 7. **Contact**
   - Contact form
   - Email validation
   - Direct communication options

## Project Structure

```
portfolio-react/
├── public/
│   └── images/                    # Project and profile images
├── src/
│   ├── components/                # React components
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── BackToTop.jsx
│   │   ├── BackToTop.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Education.jsx
│   │   ├── Education.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── Loader.jsx
│   │   ├── Loader.css
│   │   ├── Navigation.jsx
│   │   ├── Navigation.css
│   │   ├── ParallaxBackground.jsx
│   │   ├── Projects.jsx
│   │   ├── Projects.css
│   │   ├── WorkExperience.jsx
│   │   └── WorkExperience.css
│   ├── hooks/
│   │   └── useAnimations.js       # Custom animation hooks
│   ├── projects/                  # Individual project components
│   │   ├── CarVoting/
│   │   ├── ChickenLicken/
│   │   ├── HealthChatbot/
│   │   └── MphembaMatrix/
│   ├── App.jsx                    # Main App component
│   ├── App.css                    # App styles
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles & CSS variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Contact

- **Email:** smangasmashntuli@gmail.com
- **Phone:** (+27) 71 271 9018
- **GitHub:** [github.com/smangasmashntuli](https://github.com/smangasmashntuli)
- **LinkedIn:** [linkedin.com/in/simangaliso-mazweni-ntuli-1784a62b6](https://www.linkedin.com/in/simangaliso-mazweni-ntuli-1784a62b6)

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Simangaliso Ntuli
