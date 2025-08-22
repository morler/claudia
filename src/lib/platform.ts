import { platform } from '@tauri-apps/plugin-os';

export type Platform = 'windows' | 'macos' | 'linux';

let cachedPlatform: Platform | null = null;

/**
 * Get current platform with caching
 */
export const getCurrentPlatform = async (): Promise<Platform> => {
  if (cachedPlatform) {
    return cachedPlatform;
  }

  const platformName = await platform();
  
  // Convert Tauri platform names to our internal types
  if (platformName.includes('win') || platformName === 'windows') {
    cachedPlatform = 'windows';
  } else if (platformName.includes('darwin') || platformName.includes('mac')) {
    cachedPlatform = 'macos';
  } else if (platformName.includes('linux')) {
    cachedPlatform = 'linux';
  } else {
    cachedPlatform = 'linux'; // fallback
  }
  
  return cachedPlatform;
};

/**
 * Check if current platform is Windows
 */
export const isWindows = async (): Promise<boolean> => {
  return (await getCurrentPlatform()) === 'windows';
};

/**
 * Check if current platform is macOS
 */
export const isMacOS = async (): Promise<boolean> => {
  return (await getCurrentPlatform()) === 'macos';
};

/**
 * Check if current platform is Linux
 */
export const isLinux = async (): Promise<boolean> => {
  return (await getCurrentPlatform()) === 'linux';
};

/**
 * Get platform-specific CSS classes
 */
export const getPlatformClasses = async (): Promise<string> => {
  const currentPlatform = await getCurrentPlatform();
  return `platform-${currentPlatform}`;
};