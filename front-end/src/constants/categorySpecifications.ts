export interface CategorySpec {
  label: string;
  placeholder?: string;
}

// Smartphones specifications
export const SMARTPHONE_SPECS: CategorySpec[] = [
  { label: "Processor", placeholder: "e.g., Snapdragon 8 Gen 3" },
  { label: "RAM", placeholder: "e.g., 8GB" },
  { label: "ROM / Storage", placeholder: "e.g., 256GB" },
  { label: "Display Size", placeholder: "e.g., 6.7 inches" },
  { label: "Display Type", placeholder: "e.g., AMOLED" },
  { label: "Resolution", placeholder: "e.g., 1080 x 2400 pixels" },
  { label: "Refresh Rate", placeholder: "e.g., 120Hz" },
  { label: "Camera (Rear)", placeholder: "e.g., 50MP + 12MP + 8MP" },
  { label: "Camera (Front)", placeholder: "e.g., 32MP" },
  { label: "Battery Capacity", placeholder: "e.g., 5000mAh" },
  { label: "Charging Speed", placeholder: "e.g., 67W Fast Charging" },
  { label: "Operating System", placeholder: "e.g., Android 14" },
  { label: "5G Support", placeholder: "e.g., Yes" },
  { label: "Connectivity", placeholder: "e.g., Wi-Fi 6, Bluetooth 5.3" },
  { label: "Water Resistance (IP Rating)", placeholder: "e.g., IP68" },
  { label: "Weight", placeholder: "e.g., 195g" },
  { label: "Dimensions", placeholder: "e.g., 163 x 75 x 8.5 mm" },
];

// Laptops specifications
export const LAPTOP_SPECS: CategorySpec[] = [
  { label: "Processor", placeholder: "e.g., Intel Core i7-13700H" },
  { label: "RAM", placeholder: "e.g., 16GB DDR5" },
  { label: "Storage", placeholder: "e.g., 512GB SSD" },
  { label: "Display Size", placeholder: "e.g., 15.6 inches" },
  { label: "Display Type", placeholder: "e.g., IPS, FHD" },
  { label: "Resolution", placeholder: "e.g., 1920 x 1080" },
  { label: "Refresh Rate", placeholder: "e.g., 144Hz" },
  { label: "GPU", placeholder: "e.g., NVIDIA RTX 4060" },
  { label: "Operating System", placeholder: "e.g., Windows 11 Pro" },
  { label: "Battery Capacity", placeholder: "e.g., 80Wh" },
  { label: "Charging Speed", placeholder: "e.g., 150W Adapter" },
  { label: "Weight", placeholder: "e.g., 2.2kg" },
  { label: "Connectivity", placeholder: "e.g., Wi-Fi 6E, Bluetooth 5.2" },
  { label: "USB Type", placeholder: "e.g., 3x USB-C, 2x USB-A" },
  { label: "Build Material", placeholder: "e.g., Aluminum Chassis" },
];

// Smart Watches specifications
export const SMARTWATCH_SPECS: CategorySpec[] = [
  { label: "Display Type", placeholder: "e.g., AMOLED" },
  { label: "Display Size", placeholder: "e.g., 1.43 inches" },
  { label: "Resolution", placeholder: "e.g., 466 x 466 pixels" },
  { label: "Battery Capacity", placeholder: "e.g., 500mAh" },
  { label: "Battery Type", placeholder: "e.g., Up to 14 days" },
  { label: "Connectivity", placeholder: "e.g., Bluetooth 5.3, Wi-Fi" },
  { label: "Water Resistance (IP Rating)", placeholder: "e.g., 5ATM" },
  { label: "Operating System", placeholder: "e.g., WearOS, Proprietary" },
  { label: "Weight", placeholder: "e.g., 45g" },
  { label: "GPS", placeholder: "e.g., Yes, Dual-band" },
  { label: "NFC", placeholder: "e.g., Yes" },
];

// Headphones specifications
export const HEADPHONE_SPECS: CategorySpec[] = [
  { label: "Speaker Type", placeholder: "e.g., Over-Ear, On-Ear" },
  { label: "Connectivity", placeholder: "e.g., Bluetooth 5.3, Wired" },
  { label: "Battery Capacity", placeholder: "e.g., Up to 30 hours" },
  { label: "Charging", placeholder: "e.g., USB-C, Fast Charging" },
  { label: "Audio Jack", placeholder: "e.g., 3.5mm" },
  { label: "Dolby Support", placeholder: "e.g., Dolby Atmos" },
  { label: "Weight", placeholder: "e.g., 250g" },
  { label: "Water Resistance", placeholder: "e.g., IPX4" },
];

// Earbuds specifications
export const EARBUDS_SPECS: CategorySpec[] = [
  { label: "Battery Capacity", placeholder: "e.g., 6hrs (30hrs with case)" },
  { label: "Connectivity", placeholder: "e.g., Bluetooth 5.3" },
  { label: "Charging", placeholder: "e.g., USB-C, Wireless" },
  { label: "Water Resistance", placeholder: "e.g., IPX5" },
  { label: "Weight", placeholder: "e.g., 5g per earbud" },
];

// Speakers specifications
export const SPEAKER_SPECS: CategorySpec[] = [
  { label: "Speaker Type", placeholder: "e.g., Portable, Smart Speaker" },
  { label: "Connectivity", placeholder: "e.g., Bluetooth 5.0, Wi-Fi" },
  { label: "Battery Capacity", placeholder: "e.g., Up to 12 hours" },
  { label: "Charging", placeholder: "e.g., USB-C" },
  { label: "Water Resistance", placeholder: "e.g., IP67" },
  { label: "Weight", placeholder: "e.g., 650g" },
  { label: "Dolby Support", placeholder: "e.g., Yes" },
];

// Cameras specifications
export const CAMERA_SPECS: CategorySpec[] = [
  { label: "Resolution", placeholder: "e.g., 24.2 MP" },
  { label: "Video Recording", placeholder: "e.g., 4K @ 60fps" },
  { label: "Aperture", placeholder: "e.g., f/1.8 - f/22" },
  { label: "Optical Zoom", placeholder: "e.g., 10x" },
  { label: "Display Size", placeholder: "e.g., 3.2 inches" },
  { label: "Display Type", placeholder: "e.g., Touchscreen LCD" },
  { label: "Connectivity", placeholder: "e.g., Wi-Fi, Bluetooth" },
  { label: "Battery Type", placeholder: "e.g., 400 shots per charge" },
  { label: "Weight", placeholder: "e.g., 580g" },
];

// Gaming specifications
export const GAMING_SPECS: CategorySpec[] = [
  { label: "Processor", placeholder: "e.g., AMD Ryzen 9 7900X" },
  { label: "RAM", placeholder: "e.g., 32GB DDR5" },
  { label: "Storage", placeholder: "e.g., 1TB NVMe SSD" },
  { label: "GPU", placeholder: "e.g., NVIDIA RTX 4080" },
  { label: "Display Size", placeholder: "e.g., 27 inches" },
  { label: "Refresh Rate", placeholder: "e.g., 240Hz" },
  { label: "Resolution", placeholder: "e.g., 2560 x 1440" },
  { label: "Connectivity", placeholder: "e.g., Wi-Fi 6E, Ethernet" },
];

// Tablets specifications
export const TABLET_SPECS: CategorySpec[] = [
  { label: "Processor", placeholder: "e.g., Apple M2, Snapdragon 8" },
  { label: "RAM", placeholder: "e.g., 8GB" },
  { label: "Storage", placeholder: "e.g., 256GB" },
  { label: "Display Size", placeholder: "e.g., 11 inches" },
  { label: "Display Type", placeholder: "e.g., LCD, OLED" },
  { label: "Resolution", placeholder: "e.g., 2388 x 1668" },
  { label: "Battery Capacity", placeholder: "e.g., Up to 10 hours" },
  { label: "Operating System", placeholder: "e.g., iPadOS 17" },
  { label: "Connectivity", placeholder: "e.g., Wi-Fi 6, 5G" },
  { label: "Weight", placeholder: "e.g., 466g" },
];

// Smart Home specifications
export const SMARTHOME_SPECS: CategorySpec[] = [
  { label: "Connectivity", placeholder: "e.g., Wi-Fi, Zigbee, Thread" },
  { label: "Operating System", placeholder: "e.g., Compatible with Alexa, Google Home" },
  { label: "Power", placeholder: "e.g., Battery, Wired" },
  { label: "Dimensions", placeholder: "e.g., 100 x 50 x 30 mm" },
];

// Printers specifications
export const PRINTER_SPECS: CategorySpec[] = [
  { label: "Connectivity", placeholder: "e.g., Wi-Fi, USB, Ethernet" },
  { label: "Resolution", placeholder: "e.g., 4800 x 1200 dpi" },
  { label: "Dimensions", placeholder: "e.g., 425 x 340 x 145 mm" },
  { label: "Weight", placeholder: "e.g., 5.5kg" },
];

// Accessories specifications (generic)
export const ACCESSORIES_SPECS: CategorySpec[] = [
  { label: "Connectivity", placeholder: "e.g., USB-C, Wireless" },
  { label: "Dimensions", placeholder: "e.g., 150 x 80 x 20 mm" },
  { label: "Weight", placeholder: "e.g., 100g" },
  { label: "Build Material", placeholder: "e.g., Aluminum, Plastic" },
];

// Main mapping object
export const CATEGORY_SPECIFICATIONS: Record<string, CategorySpec[]> = {
  "Smartphones": SMARTPHONE_SPECS,
  "Laptops": LAPTOP_SPECS,
  "Smart Watches": SMARTWATCH_SPECS,
  "Headphones": HEADPHONE_SPECS,
  "Earbuds": EARBUDS_SPECS,
  "Speakers": SPEAKER_SPECS,
  "Cameras": CAMERA_SPECS,
  "Gaming": GAMING_SPECS,
  "Tablets": TABLET_SPECS,
  "Smart Home": SMARTHOME_SPECS,
  "Printers": PRINTER_SPECS,
  "Accessories": ACCESSORIES_SPECS,
};

// Helper function to get specifications for a category
export const getSpecificationsByCategory = (category: string): CategorySpec[] => {
  return CATEGORY_SPECIFICATIONS[category] || ACCESSORIES_SPECS;
};

// Get all available specification labels (for backward compatibility)
export const getAllSpecificationLabels = (): string[] => {
  const allSpecs = new Set<string>();
  Object.values(CATEGORY_SPECIFICATIONS).forEach(specs => {
    specs.forEach(spec => allSpecs.add(spec.label));
  });
  return Array.from(allSpecs).sort();
};