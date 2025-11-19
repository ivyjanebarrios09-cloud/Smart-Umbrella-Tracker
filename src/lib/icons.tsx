import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudLightning, SunSnow, Cloudy, type LucideProps } from 'lucide-react';
import type React from 'react';

interface WeatherIconProps extends LucideProps {
    condition: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, ...props }) => {
    switch (condition.toLowerCase()) {
        case 'sunny':
        case 'clear':
            return <Sun {...props} color="#FDB813" />;
        case 'cloudy':
            return <Cloudy {...props} color="#B0BEC5" />;
        case 'clouds':
            return <Cloud {...props} color="#B0BEC5" />;
        case 'rain':
        case 'drizzle':
        case 'showers':
            return <CloudRain {...props} color="#4A90E2" />;
        case 'snow':
            return <CloudSnow {...props} />;
        case 'windy':
            return <Wind {...props} />;
        case 'thunderstorm':
            return <CloudLightning {...props} />;
        case 'sunny with snow':
            return <SunSnow {...props} />;
        default:
            return <Sun {...props} color="#FDB813" />;
    }
};
