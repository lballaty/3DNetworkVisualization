import { NetworkState } from '../store/networkStore';

const CONFIG_KEY = 'network-config';

export function saveConfig(config: Partial<NetworkState>) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save config:', error);
  }
}

export function loadConfig(): Partial<NetworkState> | null {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load config:', error);
    return null;
  }
}

export function clearConfig() {
  try {
    localStorage.removeItem(CONFIG_KEY);
  } catch (error) {
    console.error('Failed to clear config:', error);
  }
}