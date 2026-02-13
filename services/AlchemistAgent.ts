// AlchemistAgent.ts - AI-powered thought analysis service

interface ThoughtAnalysis {
    response: string;
    isIntrusiveThought: boolean;
    severity: 'low' | 'medium' | 'high';
}

export function analyzeThought(input: string): ThoughtAnalysis {
    // Temporary mock implementation until we integrate with Gemini API
    const lowerInput = input.toLowerCase();

    // Check for intrusive thought patterns
    const intrusivePatterns = [
        'לפגוע', 'להרוג', 'מסוכן', 'רע', 'צוחקים', 'מסתכלים',
        'שונא', 'פחד', 'בהלה', 'חרדה'
    ];

    const isIntrusive = intrusivePatterns.some(pattern => lowerInput.includes(pattern));

    if (isIntrusive) {
        return {
            response: 'נחמן, אני שומע אותך. המחשבה הזו היא לא אתה - היא החרדה שמדברת. העובדה שאתה מפחד ממנה מוכיחה כמה אתה אדם טוב ושומר חוק. בוא ניקח נשימה עמוקה ביחד.',
            isIntrusiveThought: true,
            severity: 'high'
        };
    }

    return {
        response: 'אני כאן איתך. ספר לי עוד על מה שאתה מרגיש.',
        isIntrusiveThought: false,
        severity: 'low'
    };
}
