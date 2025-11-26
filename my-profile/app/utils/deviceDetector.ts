interface BrandConfig {
  patterns: RegExp[];
  modelPatterns?: RegExp[];
  prefix: string;
  fallback: string;
}

const BRAND_CONFIGS: Record<string, BrandConfig> = {
  samsung: {
    patterns: [/Samsung/i, /SM-[A-Z]\d+/i, /GT-[A-Z]\d+/i],
    modelPatterns: [/SM-[A-Z]\d+\w*/i, /GT-[A-Z]\d+\w*/i],
    prefix: "Samsung",
    fallback: "Samsung Device"
  },
  xiaomi: {
    patterns: [/Xiaomi/i, /Redmi/i, /POCO/i, /\bMi\s/i, /M\d{4}[A-Z]\d+/i, /2\d{3}[A-Z]\d+[A-Z]/i],
    modelPatterns: [/Redmi[\s\w\-]+/i, /POCO[\s\w\-]+/i, /Mi\s[\w\-]+/i, /M\d{4}\w+/i],
    prefix: "Xiaomi",
    fallback: "Xiaomi Device"
  },
  realme: {
    patterns: [/Realme/i, /RMX\d+/i],
    modelPatterns: [/Realme[\s\w\-]+/i, /RMX\d+/i],
    prefix: "Realme",
    fallback: "Realme Device"
  },
  oppo: {
    patterns: [/OPPO/i, /CPH\d+/i],
    modelPatterns: [/OPPO[\s]?[\w\s\-]+/i, /CPH\d+/i, /A\d+[sx]? /i],
    prefix: "Oppo",
    fallback: "Oppo Device"
  },
  vivo: {
    patterns: [/vivo/i, /V\d{4}/i],
    modelPatterns: [/vivo[\s\w\-]+/i, /V\d{4}\w*/i],
    prefix: "Vivo",
    fallback: "Vivo Device"
  },
  oneplus: {
    patterns: [/OnePlus/i, /ONEPLUS/i, /IN\d{4}/i],
    modelPatterns: [/OnePlus[\s\w\-]+/i],
    prefix: "OnePlus",
    fallback: "OnePlus Device"
  },
  huawei: {
    patterns: [/Huawei/i, /Honor/i, /HRY/i, /STK/i, /JKM/i, /MAR/i, /AQM/i, /VOG/i, /ELE/i],
    modelPatterns: [/Huawei[\s\w\-]+/i, /Honor[\s\w\-]+/i],
    prefix: "Huawei",
    fallback: "Huawei Device"
  },
  honor: {
    patterns: [/^Honor/i],
    modelPatterns: [/Honor[\s\w\-]+/i],
    prefix: "Honor",
    fallback: "Honor Device"
  },
  google: {
    patterns: [/Pixel/i],
    modelPatterns: [/Pixel[\s\w\-]+/i],
    prefix: "Google",
    fallback: "Google Pixel"
  },
  motorola: {
    patterns: [/Moto[\s]/i, /Motorola/i, /XT\d+/i],
    modelPatterns: [/Moto[\s][\w\+]+/i, /Motorola[\s\w\-]+/i],
    prefix: "Motorola",
    fallback: "Motorola Device"
  },
  nokia: {
    patterns: [/Nokia/i, /TA-\d+/i],
    modelPatterns: [/Nokia[\s\w\-\. ]+/i],
    prefix: "Nokia",
    fallback: "Nokia Device"
  },
  asus: {
    patterns: [/ASUS/i, /ZenFone/i, /ROG/i, /ASUS_/i],
    modelPatterns: [/ZenFone[\s\w\-]+/i, /ROG[\s\w\-]+/i, /ASUS[\s_][\w\-]+/i],
    prefix: "Asus",
    fallback: "Asus Device"
  },
  sony: {
    patterns: [/Sony/i, /Xperia/i],
    modelPatterns: [/Xperia[\s\w\-]+/i],
    prefix: "Sony",
    fallback: "Sony Device"
  },
  lg: {
    patterns: [/LG[\s\-]/i, /LM-/i],
    modelPatterns: [/LG[\s\-][\w\-]+/i, /LM-[\w]+/i],
    prefix: "LG",
    fallback: "LG Device"
  },
  lenovo: {
    patterns: [/Lenovo/i, /TB-/i, /Tab[\s]?[PM]/i],
    modelPatterns: [/Lenovo[\s\w\-]+/i, /TB-[\w]+/i],
    prefix: "Lenovo",
    fallback: "Lenovo Device"
  },
  zte: {
    patterns: [/ZTE/i],
    modelPatterns: [/ZTE[\s\w\-]+/i],
    prefix: "ZTE",
    fallback: "ZTE Device"
  },
  htc: {
    patterns: [/HTC/i],
    modelPatterns: [/HTC[\s\w\-]+/i],
    prefix: "HTC",
    fallback: "HTC Device"
  },

  tecno: {
    patterns: [/Tecno/i, /TECNO/i],
    modelPatterns: [/Tecno[\s\w\-]+/i],
    prefix: "Tecno",
    fallback: "Tecno Device"
  },
  infinix: {
    patterns: [/Infinix/i],
    modelPatterns: [/Infinix[\s\w\-]+/i],
    prefix: "Infinix",
    fallback: "Infinix Device"
  },
  itel: {
    patterns: [/itel/i],
    modelPatterns: [/itel[\s\w\-]+/i],
    prefix: "Itel",
    fallback: "Itel Device"
  },
  symphony: {
    patterns: [/Symphony/i],
    modelPatterns: [/Symphony[\s\w\-]+/i],
    prefix: "Symphony",
    fallback: "Symphony Device"
  },
  walton: {
    patterns: [/Walton/i, /Primo/i],
    modelPatterns: [/Walton[\s\w\-]+/i, /Primo[\s\w\-]+/i],
    prefix: "Walton",
    fallback: "Walton Device"
  },
  lava: {
    patterns: [/Lava/i],
    modelPatterns: [/Lava[\s\w\-]+/i],
    prefix: "Lava",
    fallback: "Lava Device"
  },
  micromax: {
    patterns: [/Micromax/i],
    modelPatterns: [/Micromax[\s\w\-]+/i],
    prefix: "Micromax",
    fallback: "Micromax Device"
  },
  karbonn: {
    patterns: [/Karbonn/i],
    modelPatterns: [/Karbonn[\s\w\-]+/i],
    prefix: "Karbonn",
    fallback: "Karbonn Device"
  },

  blackshark: {
    patterns: [/Black[\s]? Shark/i, /SHARK/i],
    modelPatterns: [/Black[\s]?Shark[\s\w\-]+/i],
    prefix: "Black Shark",
    fallback: "Black Shark Device"
  },
  nubia: {
    patterns: [/Nubia/i, /RedMagic/i, /NX\d+/i],
    modelPatterns: [/RedMagic[\s\w\-]+/i, /Nubia[\s\w\-]+/i],
    prefix: "Nubia",
    fallback: "Nubia Device"
  },
  iqoo: {
    patterns: [/iQOO/i],
    modelPatterns: [/iQOO[\s\w\-]+/i],
    prefix: "iQOO",
    fallback: "iQOO Device"
  },
  nothing: {
    patterns: [/Nothing/i, /A063/i],
    modelPatterns: [/Nothing[\s\w\-]+/i],
    prefix: "Nothing",
    fallback: "Nothing Phone"
  }
};

// Windows version mapping
const WINDOWS_VERSIONS: Record<string, string> = {
  "10.0": "Windows 10/11",
  "6.3": "Windows 8. 1",
  "6.2": "Windows 8",
  "6.1": "Windows 7",
  "6.0": "Windows Vista",
  "5.2": "Windows XP x64",
  "5.1": "Windows XP",
};


export interface DeviceInfo {
  name: string;
  brand: string | null;
  model: string | null;
  os: string;
  osVersion: string | null;
  deviceType: "mobile" | "tablet" | "desktop" | "tv" | "unknown";
  browser: string | null;
  browserVersion: string | null;
  isBot: boolean;
  isTouchDevice: boolean;
  screenResolution: string | null;
  pixelRatio: number | null;
}


function detectBrowser(ua: string): { name: string | null; version: string | null } {
  const browsers: [RegExp, string][] = [
    [/Edg\/([\d\.]+)/i, "Edge"],
    [/OPR\/([\d\.]+)/i, "Opera"],
    [/Opera\/([\d\.]+)/i, "Opera"],
    [/YaBrowser\/([\d\.]+)/i, "Yandex"],
    [/SamsungBrowser\/([\d\.]+)/i, "Samsung Internet"],
    [/UCBrowser\/([\d\.]+)/i, "UC Browser"],
    [/MiuiBrowser\/([\d\.]+)/i, "Mi Browser"],
    [/Firefox\/([\d\. ]+)/i, "Firefox"],
    [/Chrome\/([\d\.]+)/i, "Chrome"],
    [/Safari\/([\d\.]+)/i, "Safari"],
  ];

  for (const [pattern, name] of browsers) {
    const match = ua.match(pattern);
    if (match) {
      return { name, version: match[1] };
    }
  }

  return { name: null, version: null };
}

// Bot 
function isBot(ua: string): boolean {
  const botPatterns = [
    /bot/i, /crawl/i, /spider/i, /slurp/i, /mediapartners/i,
    /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
    /facebookexternalhit/i, /twitterbot/i, /rogerbot/i,
    /linkedinbot/i, /embedly/i, /quora link preview/i,
    /showyoubot/i, /outbrain/i, /pinterest/i, /slackbot/i,
    /vkShare/i, /W3C_Validator/i, /whatsapp/i, /flipboard/i,
    /tumblr/i, /bitlybot/i, /skypeuripreview/i, /nuzzel/i,
    /discordbot/i, /google page speed/i, /qwantify/i, /pinterestbot/i,
    /bitrix link preview/i, /xing-contenttabreceiver/i, /telegrambot/i
  ];

  return botPatterns.some(pattern => pattern. test(ua));
}


function detectDeviceType(ua: string): "mobile" | "tablet" | "desktop" | "tv" | "unknown" {
  // TV
  if (/SmartTV|GoogleTV|AppleTV|Roku|webOS|Tizen|BRAVIA|FireTV|AndroidTV/i.test(ua)) {
    return "tv";
  }

  // Tablet
  if (/iPad|Tab|Tablet|GT-P|SM-T|MediaPad|MatePad|Lenovo TB|Surface/i.test(ua)) {
    return "tablet";
  }

  // Mobile
  if (/Mobile|Android|iPhone|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(ua)) {
  
    if (/Android/i.test(ua) && !/Mobile/i.test(ua)) {
      return "tablet";
    }
    return "mobile";
  }

  // Desktop
  if (/Windows NT|Macintosh|Linux/i.test(ua)) {
    return "desktop";
  }

  return "unknown";
}


function extractAndroidDeviceName(ua: string): string {
  const buildMatch = ua.match(/;\s*([^)]+)\s*Build/i);
  return buildMatch ? buildMatch[1]. trim() : "";
}


function extractAndroidVersion(ua: string): string | null {
  const match = ua.match(/Android\s+([\d\.]+)/i);
  return match ? match[1] : null;
}


function detectAndroidBrand(ua: string, deviceName: string): { brand: string; model: string; name: string } | null {
  for (const [brandKey, config] of Object.entries(BRAND_CONFIGS)) {
    const isMatch = config.patterns.some(pattern => pattern.test(ua) || pattern.test(deviceName));
    
    if (isMatch) {
      let model = "";
      
 
      if (config.modelPatterns) {
        for (const modelPattern of config.modelPatterns) {
          const match = deviceName.match(modelPattern) || ua.match(modelPattern);
          if (match) {
            model = match[0]. trim();
            break;
          }
        }
      }

   
      if (!model && deviceName && !/Android|Linux|Unknown/i.test(deviceName)) {
        model = deviceName;
      }

      const name = model 
        ? (model.toLowerCase().startsWith(config.prefix. toLowerCase()) ? model : `${config. prefix} ${model}`)
        : config.fallback;

      return {
        brand: config.prefix,
        model: model || "Unknown",
        name: name. replace(/\s+/g, ' ').trim()
      };
    }
  }

  return null;
}

// iOS 
function detectiOSDevice(ua: string): { brand: string; model: string; name: string; osVersion: string | null } {
  const iosMatch = ua.match(/OS\s+([\d_]+)/i);
  const osVersion = iosMatch ? iosMatch[1]. replace(/_/g, '. ') : null;

  if (/iPhone/i.test(ua)) {
    return { brand: "Apple", model: "iPhone", name: `iPhone${osVersion ?  ` (iOS ${osVersion})` : ''}`, osVersion };
  }
  if (/iPad/i.test(ua)) {
    return { brand: "Apple", model: "iPad", name: `iPad${osVersion ?  ` (iPadOS ${osVersion})` : ''}`, osVersion };
  }
  if (/iPod/i.test(ua)) {
    return { brand: "Apple", model: "iPod", name: `iPod${osVersion ? ` (iOS ${osVersion})` : ''}`, osVersion };
  }

  return { brand: "Apple", model: "Unknown", name: "Apple Device", osVersion };
}

// Screen info 
function getScreenInfo(): { resolution: string | null; pixelRatio: number | null } {
  if (typeof window !== 'undefined' && window.screen) {
    const resolution = `${window.screen. width}x${window.screen.height}`;
    const pixelRatio = window.devicePixelRatio || null;
    return { resolution, pixelRatio };
  }
  return { resolution: null, pixelRatio: null };
}

// Touch support 
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}


export function getDeviceInfo(): DeviceInfo {
  if (typeof navigator === 'undefined') {
    return {
      name: "Unknown Device",
      brand: null,
      model: null,
      os: "Unknown",
      osVersion: null,
      deviceType: "unknown",
      browser: null,
      browserVersion: null,
      isBot: false,
      isTouchDevice: false,
      screenResolution: null,
      pixelRatio: null
    };
  }

  const ua = navigator.userAgent;
  const browser = detectBrowser(ua);
  const screenInfo = getScreenInfo();
  const deviceType = detectDeviceType(ua);
  const botCheck = isBot(ua);

  let name = "Unknown Device";
  let brand: string | null = null;
  let model: string | null = null;
  let os = "Unknown";
  let osVersion: string | null = null;

  // Android
  if (/Android/i. test(ua)) {
    os = "Android";
    osVersion = extractAndroidVersion(ua);
    const deviceName = extractAndroidDeviceName(ua);
    
    const brandInfo = detectAndroidBrand(ua, deviceName);
    if (brandInfo) {
      brand = brandInfo.brand;
      model = brandInfo.model;
      name = brandInfo. name;
    } else if (deviceName && !/Android|Linux|Unknown/i. test(deviceName)) {
      name = osVersion ? `${deviceName} (Android ${osVersion})` : deviceName;
      model = deviceName;
    } else {
      name = osVersion ? `Android ${osVersion} Device` : "Android Device";
    }
  }
  // iOS
  else if (/iPhone|iPad|iPod/i.test(ua)) {
    const iosInfo = detectiOSDevice(ua);
    brand = iosInfo. brand;
    model = iosInfo. model;
    name = iosInfo. name;
    os = /iPad/i.test(ua) ? "iPadOS" : "iOS";
    osVersion = iosInfo. osVersion;
  }
  // Windows
  else if (/Windows NT/i.test(ua)) {
    os = "Windows";
    const versionMatch = ua. match(/Windows NT\s+([\d\. ]+)/i);
    if (versionMatch) {
      osVersion = versionMatch[1];
      name = WINDOWS_VERSIONS[versionMatch[1]] || `Windows NT ${versionMatch[1]}`;
    } else {
      name = "Windows PC";
    }
    brand = "Microsoft";
  }

  else if (/Macintosh/i.test(ua)) {
    os = "macOS";
    const osMatch = ua.match(/Mac OS X\s+([\d_\. ]+)/i);
    if (osMatch) {
      osVersion = osMatch[1]. replace(/_/g, '.');
      name = `Mac (macOS ${osVersion})`;
    } else {
      name = "Mac";
    }
    brand = "Apple";
  }
 
  else if (/CrOS/i. test(ua)) {
    os = "Chrome OS";
    name = "Chromebook";
    brand = "Google";
    const versionMatch = ua.match(/CrOS\s+\w+\s+([\d\.]+)/i);
    osVersion = versionMatch ? versionMatch[1] : null;
  }
 
  else if (/Linux/i. test(ua)) {
    os = "Linux";
    name = "Linux PC";

    if (/Ubuntu/i.test(ua)) name = "Ubuntu";
    else if (/Fedora/i.test(ua)) name = "Fedora";
    else if (/Debian/i.test(ua)) name = "Debian";
  }

  return {
    name,
    brand,
    model,
    os,
    osVersion,
    deviceType,
    browser: browser.name,
    browserVersion: browser.version,
    isBot: botCheck,
    isTouchDevice: isTouchDevice(),
    screenResolution: screenInfo.resolution,
    pixelRatio: screenInfo.pixelRatio
  };
}


export function getDeviceName(): string {
  return getDeviceInfo().name;
}


export function getDeviceSummary(): string {
  const info = getDeviceInfo();
  const parts: string[] = [];
  
  parts.push(info.name);
  
  if (info.browser) {
    parts.push(`${info.browser}${info.browserVersion ?  ` ${info.browserVersion}` : ''}`);
  }
  
  if (info.screenResolution) {
    parts.push(info.screenResolution);
  }
  
  return parts.join(' | ');
}

export function isMobile(): boolean {
  const info = getDeviceInfo();
  return info.deviceType === 'mobile';
}


export function isTablet(): boolean {
  const info = getDeviceInfo();
  return info.deviceType === 'tablet';
}


export function isDesktop(): boolean {
  const info = getDeviceInfo();
  return info.deviceType === 'desktop';
}


export function isIOS(): boolean {
  const info = getDeviceInfo();
  return info.os === 'iOS' || info.os === 'iPadOS';
}

export function isAndroid(): boolean {
  const info = getDeviceInfo();
  return info.os === 'Android';
}