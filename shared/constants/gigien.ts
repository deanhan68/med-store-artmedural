


export const mapGigienVolue = {
    20 : '0.5 л.',
    30: '1 л.',
    40: '2 л.',
} as const;


export const mapGigienType = {
    1: 'Cтерильно',
    2: 'Не стерильно',
} as const;


export const gigienVolues = Object.entries(mapGigienVolue).map(([value, name]) => ({
    name,
    value,
}));

export const gigienTypes = Object.entries(mapGigienType).map(([value, name]) => ({
    name,
    value,
}));

export type GigienVolue = keyof typeof mapGigienVolue;
export type GigienType = keyof typeof mapGigienType;

