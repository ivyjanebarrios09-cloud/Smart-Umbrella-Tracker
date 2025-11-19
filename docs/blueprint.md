# **App Name**: Smart Umbrella Tracker

## Core Features:

- User Authentication: Secure user authentication using Firebase Auth for email/password login and registration.
- Real-time Umbrella Tracking: Display the last known location of the umbrella on a map, with real-time updates from Firestore.
- Current Weather Monitoring: Display current weather conditions (temperature, condition icon, text label) fetched from Firestore, auto-refreshing every 30 seconds.
- 7-Day Weather Forecast: Display a 7-day weather forecast using horizontal scrolling cards showing date, icon, and max/min temperatures from data sourced in Firestore.
- Wind Speed Display: Show the current wind speed sourced from Firestore.
- Alert System: Implement a 'Send Alert' button that, when clicked, posts a message ('Umbrella marked as missing') to a Firestore collection, along with user ID and timestamp. Shows a confirmation toast after sending.
- Smart Alert Trigger: A generative AI tool monitors weather forecasts, location data, and user behavior to determine when to proactively suggest sending an umbrella missing alert to the user.

## Style Guidelines:

- Primary color: A calming blue (#64B5F6) to evoke trust and reliability, subtly reminiscent of clear skies but not literally representative of weather.
- Background color: A very light, desaturated blue (#E3F2FD), providing a clean and unobtrusive backdrop.
- Accent color: A vibrant purple (#BA68C8), for interactive elements, buttons and highlights to attract attention without overwhelming the interface.
- Body and headline font: 'Inter' for a modern and neutral feel, ensuring readability and a clean aesthetic across the application.
- Utilize the lucide-react library for consistent and clear weather icons, enhancing the user's understanding of the data.
- Employ a mobile-first, responsive design using TailwindCSS grid layouts and Shadcn UI cards to ensure optimal viewing and interaction across various devices.
- Implement smooth animations using Framer Motion to enhance the user experience when data is updated or when transitioning between different sections of the application.