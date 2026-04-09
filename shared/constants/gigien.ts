


export const mapGigienVolue = {
    500 : '0.5 л.',
    1000: '1 л.',
    2000: '2 л.',
} as const;


export const mapGigienType = {
    1: 'Стерильный блок',
    2: 'Стандартная упаковка',
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

