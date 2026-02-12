import { VoltCategory, PredefinedItem, RequestItem } from '../src/types';

// Predefined items catalog
export const VOLT_CATEGORIES: VoltCategory[] = [
    {
        id: 'food_drinks',
        name: 'אוכל ושתייה',
        icon: 'Utensils',
        color: 'from-orange-500 to-red-500',
        allowCustom: true,
        requiresApproval: true,
        items: [
            { id: 'cola', name: 'קולה/זירו', emoji: '🥤' },
            { id: 'juice', name: 'מיץ', emoji: '🧃' },
            { id: 'bamba', name: 'במבה', emoji: '🥜' },
            { id: 'bissli', name: 'ביסלי', emoji: '🌾' },
            { id: 'chocolate', name: 'שוקולד', emoji: '🍫' },
            { id: 'cookies', name: 'עוגיות', emoji: '🍪' },
            { id: 'schnitzel', name: 'שניצל של אמא', emoji: '🍗' },
            { id: 'soup', name: 'מרק עוף', emoji: '🍜' },
            { id: 'crackers', name: 'קרקרים', emoji: '🍘' },
        ]
    },
    {
        id: 'clothing',
        name: 'בגדים וטקסטיל',
        icon: 'Shirt',
        color: 'from-blue-500 to-cyan-500',
        allowCustom: true,
        items: [
            { id: 'underwear', name: 'תחתונים', emoji: '👙' },
            { id: 'socks', name: 'גרביים', emoji: '🧦' },
            { id: 'pajamas', name: 'פיג\'מה', emoji: '👔' },
            { id: 'sweatpants', name: 'טרנינג', emoji: '👖' },
            { id: 'pillow', name: 'כרית מהבית', emoji: '🛏️' },
            { id: 'blanket', name: 'שמיכה', emoji: '🧶' },
            { id: 'towel', name: 'מגבת גדולה', emoji: '🧴' },
        ]
    },
    {
        id: 'tech',
        name: 'טכנולוגיה ובידור',
        icon: 'Smartphone',
        color: 'from-purple-500 to-pink-500',
        allowCustom: true,
        items: [
            { id: 'charger_iphone', name: 'מטען אייפון', emoji: '🔌' },
            { id: 'charger_android', name: 'מטען אנדרואיד', emoji: '🔌' },
            { id: 'headphones', name: 'אוזניות', emoji: '🎧' },
            { id: 'ipad', name: 'אייפד/לפטופ', emoji: '💻' },
            { id: 'extension', name: 'כבל מאריך', emoji: '🔌' },
            { id: 'book', name: 'ספר קריאה', emoji: '📚' },
            { id: 'coloring', name: 'חוברת צביעה', emoji: '🎨' },
            { id: 'cards', name: 'קלפים/משחק קופסה', emoji: '🃏' },
        ]
    },
    {
        id: 'hygiene',
        name: 'היגיינה ות טיפוח',
        icon: 'Droplet',
        color: 'from-teal-500 to-emerald-500',
        allowCustom: true,
        items: [
            { id: 'shampoo', name: 'שמפו/מרכך', emoji: '🧴' },
            { id: 'deodorant', name: 'דאודורנט', emoji: '💨' },
            { id: 'toothbrush', name: 'מברשת שיניים', emoji: '🪥' },
            { id: 'toothpaste', name: 'משחת שיניים', emoji: '🦷' },
            { id: 'lotion', name: 'קרם גוף', emoji: '🧴' },
            { id: 'hairtie', name: 'גומיות לשיער', emoji: '💇' },
            { id: 'comb', name: 'מסרק', emoji: '💆' },
        ]
    },
    {
        id: 'entertainment',
        name: 'בידור ופנאי',
        icon: 'Gamepad2',
        color: 'from-indigo-500 to-violet-500',
        allowCustom: true,
        items: [
            { id: 'console', name: 'קונסולת משחקים', emoji: '🎮' },
            { id: 'notebook', name: 'מחברת ועטים', emoji: '📓' },
            { id: 'puzzle', name: 'פזל', emoji: '🧩' },
            { id: 'lego', name: 'לגו', emoji: '🧱' },
            { id: 'photos', name: 'תמונות מהבית', emoji: '📸' },
            { id: 'stuffed', name: 'בובה אהובה', emoji: '🧸' },
        ]
    },
    {
        id: 'spiritual',
        name: 'רוחניות ותקווה',
        icon: 'Heart',
        color: 'from-rose-500 to-pink-500',
        allowCustom: true,
        items: [
            { id: 'siddur', name: 'סידור/תהילים', emoji: '📖' },
            { id: 'bracelet', name: 'צמיד/תליון מהבית', emoji: '📿' },
            { id: 'letter', name: 'מכתב מהמשפחה', emoji: '💌' },
            { id: 'drawing', name: 'ציור מאח/אחות', emoji: '🎨' },
        ]
    },
];

// Mock requests for demo
export const MOCK_REQUESTS: RequestItem[] = [
    {
        id: 'r1',
        category: 'food_drinks',
        name: 'שניצל של אמא',
        priority: 'high',
        status: 'approved',
        requestedAt: new Date('2026-02-07T10:00:00'),
        updatedAt: new Date('2026-02-07T12:30:00'),
        notes: 'עם קטשופ וממש פריך',
        imageUrl: 'https://images.unsplash.com/photo-1562967916-eb12341fb315?w=400',
    },
    {
        id: 'r2',
        category: 'tech',
        name: 'מטען אייפון',
        priority: 'urgent',
        status: 'in_transit',
        requestedAt: new Date('2026-02-07T14:00:00'),
        updatedAt: new Date('2026-02-07T16:45:00'),
        notes: 'הסוללה גוססת!',
    },
    {
        id: 'r3',
        category: 'clothing',
        name: 'כרית מהבית',
        priority: 'medium',
        status: 'pending',
        requestedAt: new Date('2026-02-07T18:00:00'),
        updatedAt: new Date('2026-02-07T18:00:00'),
        notes: 'הכחולה עם הכוכבים',
    },
    {
        id: 'r4',
        category: 'entertainment',
        name: 'בובת דובי',
        priority: 'low',
        status: 'delivered',
        requestedAt: new Date('2026-02-06T09:00:00'),
        updatedAt: new Date('2026-02-06T18:30:00'),
    },
    {
        id: 'r5',
        category: 'hygiene',
        name: 'שמפו של הבית',
        priority: 'medium',
        status: 'seen',
        requestedAt: new Date('2026-02-07T11:00:00'),
        updatedAt: new Date('2026-02-07T13:00:00'),
        notes: 'לא אוהבת את הסבון פה',
    },
];
