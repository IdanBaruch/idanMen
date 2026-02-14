import { VoltCategory, PredefinedItem, RequestItem } from '../src/types';

// Predefined items catalog
export const VOLT_CATEGORIES: VoltCategory[] = [
    {
        id: 'food_drinks',
        name: '╫É╫ò╫¢╫£ ╫ò╫⌐╫¬╫Ö╫Ö╫ö',
        icon: 'Utensils',
        color: 'from-orange-500 to-red-500',
        allowCustom: true,
        requiresApproval: true,
        items: [
            { id: 'cola', name: '╫º╫ò╫£╫ö/╫û╫Ö╫¿╫ò', emoji: '≡ƒÑñ' },
            { id: 'juice', name: '╫₧╫Ö╫Ñ', emoji: '≡ƒºâ' },
            { id: 'bamba', name: '╫æ╫₧╫æ╫ö', emoji: '≡ƒÑ£' },
            { id: 'bissli', name: '╫æ╫Ö╫í╫£╫Ö', emoji: '≡ƒî╛' },
            { id: 'chocolate', name: '╫⌐╫ò╫º╫ò╫£╫ô', emoji: '≡ƒì½' },
            { id: 'cookies', name: '╫ó╫ò╫Æ╫Ö╫ò╫¬', emoji: '≡ƒì¬' },
            { id: 'schnitzel', name: '╫⌐╫á╫Ö╫ª╫£ ╫⌐╫£ ╫É╫₧╫É', emoji: '≡ƒìù' },
            { id: 'soup', name: '╫₧╫¿╫º ╫ó╫ò╫ú', emoji: '≡ƒì£' },
            { id: 'crackers', name: '╫º╫¿╫º╫¿╫Ö╫¥', emoji: '≡ƒìÿ' },
        ]
    },
    {
        id: 'clothing',
        name: '╫æ╫Æ╫ô╫Ö╫¥ ╫ò╫ÿ╫º╫í╫ÿ╫Ö╫£',
        icon: 'Shirt',
        color: 'from-blue-500 to-cyan-500',
        allowCustom: true,
        items: [
            { id: 'underwear', name: '╫¬╫ù╫¬╫ò╫á╫Ö╫¥', emoji: '≡ƒæÖ' },
            { id: 'socks', name: '╫Æ╫¿╫æ╫Ö╫Ö╫¥', emoji: '≡ƒºª' },
            { id: 'pajamas', name: '╫ñ╫Ö╫Æ\'╫₧╫ö', emoji: '≡ƒæö' },
            { id: 'sweatpants', name: '╫ÿ╫¿╫á╫Ö╫á╫Æ', emoji: '≡ƒæû' },
            { id: 'pillow', name: '╫¢╫¿╫Ö╫¬ ╫₧╫ö╫æ╫Ö╫¬', emoji: '≡ƒ¢Å∩╕Å' },
            { id: 'blanket', name: '╫⌐╫₧╫Ö╫¢╫ö', emoji: '≡ƒº╢' },
            { id: 'towel', name: '╫₧╫Æ╫æ╫¬ ╫Æ╫ô╫ò╫£╫ö', emoji: '≡ƒº┤' },
        ]
    },
    {
        id: 'tech',
        name: '╫ÿ╫¢╫á╫ò╫£╫ò╫Æ╫Ö╫ö ╫ò╫æ╫Ö╫ô╫ò╫¿',
        icon: 'Smartphone',
        color: 'from-purple-500 to-pink-500',
        allowCustom: true,
        items: [
            { id: 'charger_iphone', name: '╫₧╫ÿ╫ó╫ƒ ╫É╫Ö╫Ö╫ñ╫ò╫ƒ', emoji: '≡ƒöî' },
            { id: 'charger_android', name: '╫₧╫ÿ╫ó╫ƒ ╫É╫á╫ô╫¿╫ò╫É╫Ö╫ô', emoji: '≡ƒöî' },
            { id: 'headphones', name: '╫É╫ò╫û╫á╫Ö╫ò╫¬', emoji: '≡ƒÄº' },
            { id: 'ipad', name: '╫É╫Ö╫Ö╫ñ╫ô/╫£╫ñ╫ÿ╫ò╫ñ', emoji: '≡ƒÆ╗' },
            { id: 'extension', name: '╫¢╫æ╫£ ╫₧╫É╫¿╫Ö╫Ü', emoji: '≡ƒöî' },
            { id: 'book', name: '╫í╫ñ╫¿ ╫º╫¿╫Ö╫É╫ö', emoji: '≡ƒôÜ' },
            { id: 'coloring', name: '╫ù╫ò╫æ╫¿╫¬ ╫ª╫æ╫Ö╫ó╫ö', emoji: '≡ƒÄ¿' },
            { id: 'cards', name: '╫º╫£╫ñ╫Ö╫¥/╫₧╫⌐╫ù╫º ╫º╫ò╫ñ╫í╫ö', emoji: '≡ƒâÅ' },
        ]
    },
    {
        id: 'hygiene',
        name: '╫ö╫Ö╫Æ╫Ö╫Ö╫á╫ö ╫ò╫¬ ╫ÿ╫Ö╫ñ╫ò╫ù',
        icon: 'Droplet',
        color: 'from-teal-500 to-emerald-500',
        allowCustom: true,
        items: [
            { id: 'shampoo', name: '╫⌐╫₧╫ñ╫ò/╫₧╫¿╫¢╫Ü', emoji: '≡ƒº┤' },
            { id: 'deodorant', name: '╫ô╫É╫ò╫ô╫ò╫¿╫á╫ÿ', emoji: '≡ƒÆ¿' },
            { id: 'toothbrush', name: '╫₧╫æ╫¿╫⌐╫¬ ╫⌐╫Ö╫á╫Ö╫Ö╫¥', emoji: '≡ƒ¬Ñ' },
            { id: 'toothpaste', name: '╫₧╫⌐╫ù╫¬ ╫⌐╫Ö╫á╫Ö╫Ö╫¥', emoji: '≡ƒª╖' },
            { id: 'lotion', name: '╫º╫¿╫¥ ╫Æ╫ò╫ú', emoji: '≡ƒº┤' },
            { id: 'hairtie', name: '╫Æ╫ò╫₧╫Ö╫ò╫¬ ╫£╫⌐╫Ö╫ó╫¿', emoji: '≡ƒÆç' },
            { id: 'comb', name: '╫₧╫í╫¿╫º', emoji: '≡ƒÆå' },
        ]
    },
    {
        id: 'entertainment',
        name: '╫æ╫Ö╫ô╫ò╫¿ ╫ò╫ñ╫á╫É╫Ö',
        icon: 'Gamepad2',
        color: 'from-indigo-500 to-violet-500',
        allowCustom: true,
        items: [
            { id: 'console', name: '╫º╫ò╫á╫í╫ò╫£╫¬ ╫₧╫⌐╫ù╫º╫Ö╫¥', emoji: '≡ƒÄ«' },
            { id: 'notebook', name: '╫₧╫ù╫æ╫¿╫¬ ╫ò╫ó╫ÿ╫Ö╫¥', emoji: '≡ƒôô' },
            { id: 'puzzle', name: '╫ñ╫û╫£', emoji: '≡ƒº⌐' },
            { id: 'lego', name: '╫£╫Æ╫ò', emoji: '≡ƒº▒' },
            { id: 'photos', name: '╫¬╫₧╫ò╫á╫ò╫¬ ╫₧╫ö╫æ╫Ö╫¬', emoji: '≡ƒô╕' },
            { id: 'stuffed', name: '╫æ╫ò╫æ╫ö ╫É╫ö╫ò╫æ╫ö', emoji: '≡ƒº╕' },
        ]
    },
    {
        id: 'spiritual',
        name: '╫¿╫ò╫ù╫á╫Ö╫ò╫¬ ╫ò╫¬╫º╫ò╫ò╫ö',
        icon: 'Heart',
        color: 'from-rose-500 to-pink-500',
        allowCustom: true,
        items: [
            { id: 'siddur', name: '╫í╫Ö╫ô╫ò╫¿/╫¬╫ö╫Ö╫£╫Ö╫¥', emoji: '≡ƒôû' },
            { id: 'bracelet', name: '╫ª╫₧╫Ö╫ô/╫¬╫£╫Ö╫ò╫ƒ ╫₧╫ö╫æ╫Ö╫¬', emoji: '≡ƒô┐' },
            { id: 'letter', name: '╫₧╫¢╫¬╫æ ╫₧╫ö╫₧╫⌐╫ñ╫ù╫ö', emoji: '≡ƒÆî' },
            { id: 'drawing', name: '╫ª╫Ö╫ò╫¿ ╫₧╫É╫ù/╫É╫ù╫ò╫¬', emoji: '≡ƒÄ¿' },
        ]
    },
];

// Mock requests for demo
export const MOCK_REQUESTS: RequestItem[] = [
    {
        id: 'r1',
        category: 'food_drinks',
        name: '╫⌐╫á╫Ö╫ª╫£ ╫⌐╫£ ╫É╫₧╫É',
        priority: 'high',
        status: 'approved',
        requestedAt: new Date('2026-02-07T10:00:00'),
        updatedAt: new Date('2026-02-07T12:30:00'),
        notes: '╫ó╫¥ ╫º╫ÿ╫⌐╫ò╫ñ ╫ò╫₧╫₧╫⌐ ╫ñ╫¿╫Ö╫Ü',
        imageUrl: 'https://images.unsplash.com/photo-1562967916-eb12341fb315?w=400',
    },
    {
        id: 'r2',
        category: 'tech',
        name: '╫₧╫ÿ╫ó╫ƒ ╫É╫Ö╫Ö╫ñ╫ò╫ƒ',
        priority: 'urgent',
        status: 'in_transit',
        requestedAt: new Date('2026-02-07T14:00:00'),
        updatedAt: new Date('2026-02-07T16:45:00'),
        notes: '╫ö╫í╫ò╫£╫£╫ö ╫Æ╫ò╫í╫í╫¬!',
    },
    {
        id: 'r3',
        category: 'clothing',
        name: '╫¢╫¿╫Ö╫¬ ╫₧╫ö╫æ╫Ö╫¬',
        priority: 'medium',
        status: 'pending',
        requestedAt: new Date('2026-02-07T18:00:00'),
        updatedAt: new Date('2026-02-07T18:00:00'),
        notes: '╫ö╫¢╫ù╫ò╫£╫ö ╫ó╫¥ ╫ö╫¢╫ò╫¢╫æ╫Ö╫¥',
    },
    {
        id: 'r4',
        category: 'entertainment',
        name: '╫æ╫ò╫æ╫¬ ╫ô╫ò╫æ╫Ö',
        priority: 'low',
        status: 'delivered',
        requestedAt: new Date('2026-02-06T09:00:00'),
        updatedAt: new Date('2026-02-06T18:30:00'),
    },
    {
        id: 'r5',
        category: 'hygiene',
        name: '╫⌐╫₧╫ñ╫ò ╫⌐╫£ ╫ö╫æ╫Ö╫¬',
        priority: 'medium',
        status: 'seen',
        requestedAt: new Date('2026-02-07T11:00:00'),
        updatedAt: new Date('2026-02-07T13:00:00'),
        notes: '╫£╫É ╫É╫ò╫ö╫æ╫¬ ╫É╫¬ ╫ö╫í╫æ╫ò╫ƒ ╫ñ╫ö',
    },
];
