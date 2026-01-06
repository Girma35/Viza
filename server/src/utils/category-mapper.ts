// Map enum values to user-friendly display names
export const CategoryDisplay = {
    TECH_NEWS: "Tech news",
    LEARNING: "Learning",
    ROAD_MAPS: "Road maps",
    SAAS: "SaaS",
} as const;

// Reverse mapping: display name to enum value
export const CategoryEnum = {
    "Tech news": "TECH_NEWS",
    "Learning": "LEARNING",
    "Road maps": "ROAD_MAPS",
    "SaaS": "SAAS",
} as const;

// Helper function: enum → display name
export function getCategoryDisplayName(enumValue: keyof typeof CategoryDisplay): string {
    return CategoryDisplay[enumValue];
}

// Helper function: display name → enum
export function getCategoryEnumValue(displayName: keyof typeof CategoryEnum): string {
    return CategoryEnum[displayName];
}

// Get all categories for dropdowns/filters
export const allCategories = [
    { enum: "TECH_NEWS", display: "Tech news" },
    { enum: "LEARNING", display: "Learning" },
    { enum: "ROAD_MAPS", display: "Road maps" },
    { enum: "SAAS", display: "SaaS" },
] as const;
