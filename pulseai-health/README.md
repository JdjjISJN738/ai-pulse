# PulseAI Health Monitoring Platform

A comprehensive real-time AI health monitoring system built with Next.js and Tailwind CSS.

## Quick Start

### Option 1: Using the Batch Files (Recommended)

**Windows:**
```bash
# Double-click or run:
run.bat
```

**Mac/Linux:**
```bash
# Make executable and run:
chmod +x run.sh
./run.sh
```

### Option 2: Manual Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Open Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
pulseai-health/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page with live data
│   │   ├── dashboard/          # Interactive monitoring dashboard
│   │   ├── patients/           # Patient management with search/filter
│   │   ├── alerts/             # Alert management system
│   │   └── features/          # Feature showcase with filtering
│   ├── components/             # Reusable React components
│   │   ├── Layout.tsx         # Main layout with navigation
│   │   ├── Navbar.tsx         # Navigation component
│   │   └── Footer.tsx         # Footer component
│   └── lib/                   # Utilities and services
│       ├── health-types.ts     # Type definitions
│       └── health-service.ts   # Mock health monitoring service
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
├── run.bat                   # Windows batch file
└── run.sh                    # Unix shell script
```

## Features

### 🏠 **Multi-Page Application**
- **Home**: Live dashboard with animated statistics
- **Dashboard**: Real-time patient monitoring with charts
- **Patients**: Search, filter, and sort patient records
- **Alerts**: Manage and resolve health alerts
- **Features**: Interactive feature showcase

### 📊 **Health Monitoring System**
- **Real-time vital tracking** (heart rate, SpO2, temperature, blood pressure)
- **Automatic risk scoring** with 4 levels (stable, observe, warning, critical)
- **Smart alert generation** based on health thresholds
- **Live data simulation** updating every 3-5 seconds

### 🎨 **Modern UI/UX**
- **Smooth animations** with Framer Motion
- **Responsive design** for all devices
- **Interactive components** with hover states
- **Professional healthcare theme**

### 🔧 **Technical Stack**
- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel

## Available Pages

1. **Home** (`/`) - Landing page with live statistics
2. **Dashboard** (`/dashboard`) - Main monitoring interface
3. **Patients** (`/patients`) - Patient management
4. **Alerts** (`/alerts`) - Alert management
5. **Features** (`/features`) - Platform features

## Health Monitoring Logic

### Thresholds
- **Heart Rate**: 45-120 bpm
- **SpO2**: Below 92%
- **Temperature**: Above 38.5°C (101.3°F)
- **Blood Pressure**: Above 140/90 mmHg

### Risk Levels
- **Stable** (0-25): Normal monitoring
- **Observe** (26-50): Monitor closely
- **Warning** (51-75): Review patient status
- **Critical** (76-100): Immediate attention required

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Automatic deployment on push

### Manual Deployment
```bash
npm run build
# Deploy the `out` folder to your hosting provider
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile responsive

## Support

For issues or questions:
- Check the console for error messages
- Ensure all dependencies are installed
- Verify Node.js version 18+

---

**Built with ❤️ for modern healthcare teams**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
