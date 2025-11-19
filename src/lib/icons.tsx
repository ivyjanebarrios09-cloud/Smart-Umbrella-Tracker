import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudLightning, SunSnow, Cloudy, type LucideProps } from 'lucide-react';
import type React from 'react';

interface WeatherIconProps extends LucideProps {
    condition: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, ...props }) => {
    switch (condition.toLowerCase()) {
        case 'sunny':
        case 'clear':
            return <Sun {...props} />;
        case 'cloudy':
            return <Cloudy {...props} />;
        case 'clouds':
            return <Cloud {...props} />;
        case 'rain':
        case 'drizzle':
        case 'showers':
            return <CloudRain {...props} />;
        case 'snow':
            return <CloudSnow {...props} />;
        case 'windy':
            return <Wind {...props} />;
        case 'thunderstorm':
            return <CloudLightning {...props} />;
        case 'sunny with snow':
            return <SunSnow {...props} />;
        default:
            return <Sun {...props} />;
    }
};
