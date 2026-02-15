
export enum SystemMode {
  DISARMED = 'DISARMED',
  ARMED_AWAY = 'ARMED AWAY',
  ARMED_HOME = 'ARMED HOME',
  SOS = 'EMERGENCY',
  LOG = 'LOG VIEW',
  SETTINGS = 'SETTINGS'
}

export interface WeatherData {
  current: number;
  min: number;
  max: number;
  condition: 'SUNNY' | 'CLOUDY' | 'RAINY' | 'SNOWY';
}

export interface StatusIndicators {
  battery: number;
  isCharging: boolean;
  wifiStrength: number;
  lteStrength: number;
}
