
import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, Car, Hourglass, Siren, Phone, MessageCircle, 
  UserPlus, ChevronDown, ChevronUp, ShieldAlert, Heart, 
  LifeBuoy, AlertTriangle, AlertCircle, X, Send, User, 
  Clock, ShieldCheck, Info, Search, MapPin, Share2
} from 'lucide-react';

const PROTOCOL_STEPS = [
  {
    id: 1,
    title: 'הסוס הטרויאני (The Trojan Horse)',
    subtitle: 'עקיפת התנגדות דרך הגוף',
    icon: Stethoscope,
    content: 'עוקפים את ההתנגדות דרך הגוף. הם סובלים פיזית (שינה, כאב). קובעים תור לרופא משפחה רגיל לחלוטין.',
    action: 'תגידו לו: "הולכים לבדוק למה אתה עייף". אל תדברו על הנפש.',
    color: 'blue'
  },
  {
    id: 2,
    title: 'לקחת את ההגה (Taking the Wheel)',
    subtitle: 'קביעת עובדות בשטח',
    icon: Car,
    content: 'מתייחסים אליו זמנית כמי שאיבד הכרה. לא שואלים לדעתו, קובעים עובדות.',
    action: 'המשפט המנצח: "קבעתי תור ל-17:00, אני בא לקחת אותך. תעשה את זה בשבילי".',
    color: 'teal'
  },
  {
    id: 3,
    title: 'לתת לכימיה לעבוד (Biology First)',
    subtitle: 'סבלנות לשינוי הביולוגי',
    icon: Hourglass,
    content: 'הציפייה היחידה: לבלוע את הכדור. לוקח 3-6 שבועות לשינוי משמעותי במוליכים העצביים. התפקיד היחיד כרגע הוא לשרוד.',
    action: 'אל תדרשו ממנו "לחשוב חיובי" כרגע. רק שיקח את הטיפול.',
    color: 'purple'
  },
  {
    id: 4,
    title: 'התערבות בחירום (Emergency)',
    subtitle: 'כשאין ברירה אחרת',
    icon: Siren,
    content: 'אם יש סכנת חיים או הזנחה קיצונית - פנייה לפסיכיאטר המחוזי. זה מוצא אחרון, אבל מציל חיים.',
    action: 'במקרה של סכנה מיידית, פנו לחדר המיון הקרוב או הזעיקו משטרה/מד"א.',
    color: 'red'
  }
];

const SaharChatOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0);
  const [messages, setMessages] = useState<Array<{ text: string, sender: 'bot' | 'user' | 'volunteer' }>>([
    { text: 'סה"ר - מענה אוטומטי\nתודה על פנייתך לשירות הווטסאפ האישי של סה"ר.\nכאן להקשיב לכל מה שעולה לך.', sender: 'bot' },
    { text: 'שימוש בשירות הווטסאפ של סה"ר מהווה הסכמה מצידך לתנאי תקנון הצ\'אט.', sender: 'bot' },
    { text: 'באיזה שם או כינוי לקרוא לך?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMsgs = [...messages, { text: inputValue, sender: 'user' as const }];
    setMessages(newMsgs);
    const userVal = inputValue;
    setInputValue('');

    setTimeout(() => {
      if (step === 0) {
        setMessages(prev => [...prev, { text: 'חשוב לנו שהמענה יהיה מותאם, מהו גילך? (בספרות בלבד)', sender: 'bot' }]);
        setStep(1);
      } else if (step === 1) {
        setMessages(prev => [...prev, 
          { text: 'השיחות מוגבלות ל-30-40 דקות.', sender: 'bot' },
          { text: 'איתך בקרוב', sender: 'bot' }
        ]);
        setStep(2);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { text: 'מתנדבת סה"ר\nכאן איתך...מקשיבה למה שתבחר.י להביא...', sender: 'volunteer' }]);
        }, 2000);
      } else {
        setMessages(prev => [...prev, { text: `מתנדבת סה"ר\nאני איתך... שומעת כמה זה כבד. את/ה לא לבד בזה.`, sender: 'volunteer' }]);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-white flex flex-col animate-in slide-in-from-bottom duration-500">
      <header className="bg-emerald-600 p-4 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle size={20} />
          </div>
          <div>
            <h3 className="font-black leading-none text-sm">סה"ר - סיוע והקשבה</h3>
            <p className="text-[10px] opacity-80">WhatsApp Support Line</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ddd5] custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-3 rounded-xl shadow-sm text-xs font-medium whitespace-pre-wrap ${
              msg.sender === 'user' ? 'bg-[#dcf8c6] text-slate-800 rounded-tl-none ml-1' : 
              msg.sender === 'volunteer' ? 'bg-white text-purple-900 border-r-4 border-purple-500 rounded-tr-none mr-1' :
              'bg-white text-slate-700 rounded-tr-none mr-1'
            }`}>
              {msg.text}
              <div className="text-[8px] opacity-40 text-left mt-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t border-slate-200 bg-[#f0f0f0] flex gap-2">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="הקלד/י הודעה..."
          className="flex-1 bg-white border-none rounded-full px-5 py-3 text-sm focus:ring-0 outline-none shadow-sm"
        />
        <button onClick={handleSend} className="bg-emerald-600 text-white p-3 rounded-full shadow-lg active:scale-95 transition-all">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const CaregiverDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const contacts = [
    { name: 'ד"ר אפרת (ניהול מחלקה)', role: 'קשר רפואי ישיר', ext: '500', status: 'זמין' },
    { name: 'עדי שרון (אחות אחראית)', role: 'מעקב תרופתי', ext: '202', status: 'במשמרת' },
    { name: 'עו"ס ענת', role: 'ליווי סוציאלי וביטוח לאומי', ext: '108', status: 'זמין' },
    { name: 'מזכירות קבלה', role: 'בירוקרטיה ואישורים', ext: '101', status: 'זמין' },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-700">
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חפש איש קשר במחלקה..."
          className="w-full bg-white border border-slate-100 rounded-2xl py-4 pr-12 pl-4 text-sm font-bold shadow-sm focus:border-blue-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        {contacts.map((contact, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-800 leading-none mb-1">{contact.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold">{contact.role}</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xl font-black text-blue-600">{contact.ext}</p>
              <p className="text-[8px] font-black uppercase text-green-500">{contact.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FamilyCrisisGuide: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  return (
    <div className="flex-1 p-6 space-y-6 animate-in fade-in duration-700">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-orange-200 shadow-sm">
          <ShieldAlert size={12} />
          ניהול משבר למלווים
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
          המדריך למלווה: <br/>כשאין שיתוף פעולה
        </h2>
        <p className="text-slate-500 font-bold text-sm max-w-[280px] mx-auto italic">
          "הוא לא יכול לעזור לעצמו עכשיו. זה הזמן שלכם לקחת פיקוד."
        </p>
      </div>

      <div className="space-y-4">
        {PROTOCOL_STEPS.map((step) => {
          const Icon = step.icon;
          const isExpanded = expandedStep === step.id;
          const isEmergency = step.id === 4;

          return (
            <div 
              key={step.id} 
              className={`overflow-hidden rounded-[2.5rem] border-2 transition-all duration-500 ${
                isEmergency 
                  ? 'border-red-500 bg-red-50 shadow-[0_10px_30px_rgba(239,68,68,0.1)]' 
                  : isExpanded ? 'border-blue-400 bg-white shadow-2xl scale-[1.02]' : 'border-slate-100 bg-white'
              }`}
            >
              <button 
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className="w-full p-7 flex items-center justify-between text-right outline-none"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all shadow-inner ${
                    isEmergency ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 className={`font-black text-xl leading-none mb-1 ${isEmergency ? 'text-red-700' : 'text-slate-800'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isEmergency ? 'text-red-500' : 'text-slate-400'}`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-slate-300" /> : <ChevronDown className="text-slate-300" />}
              </button>

              {isExpanded && (
                <div className="px-8 pb-8 space-y-6 animate-in slide-in-from-top duration-500">
                  <div className="h-px bg-slate-100 w-full opacity-50" />
                  <p className="text-slate-600 leading-relaxed text-base font-medium">
                    {step.content}
                  </p>
                  <div className={`p-6 rounded-3xl border-2 flex items-start gap-4 ${
                    isEmergency ? 'bg-red-100 border-red-200 text-red-900' : 'bg-blue-50 border-blue-100 text-blue-900'
                  }`}>
                    <AlertCircle size={20} className="shrink-0 mt-0.5 opacity-40" />
                    <div>
                        <p className="text-[10px] font-black uppercase mb-1 tracking-wider opacity-60">הוראת ביצוע (Action Item):</p>
                        <p className="text-md font-black leading-tight">"{step.action}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden mt-12 border border-white/5">
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-500/20 rounded-2xl">
                <Heart className="text-blue-400" fill="currentColor" size={24} />
             </div>
             <h4 className="text-2xl font-black tracking-tight leading-none italic">אתם לא לבד <br/>במערכה.</h4>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed font-medium">
            הליווי של אדם במצוקה נפשית הוא ריצת מרתון בתוך סערה. זכרו שגם לכם מגיע לקבל תמיכה ולהטעין כוחות.
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

const CaregiverApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'directory'>('guide');
  const [showSaharChat, setShowSaharChat] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen shadow-2xl flex flex-col font-sans overflow-hidden border-x border-slate-200 pb-40" dir="rtl">
      {/* Header */}
      <header className="p-6 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-blue-950 tracking-tighter leading-none">שלוותה <span className="text-orange-500 italic font-light tracking-normal">Care</span></h1>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">פורטל מלווים ובני משפחה</span>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => setActiveTab('directory')} className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${activeTab === 'directory' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
              <UserPlus size={20} />
           </button>
           <button onClick={() => setActiveTab('guide')} className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${activeTab === 'guide' ? 'bg-orange-500 text-white border-orange-500 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
              <ShieldAlert size={20} />
           </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50">
        {activeTab === 'guide' ? <FamilyCrisisGuide /> : <CaregiverDirectory />}
      </div>

      {showSaharChat && <SaharChatOverlay onClose={() => setShowSaharChat(false)} />}

      {/* Emergency Action Bar (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-t border-slate-100 p-6 z-50 shadow-[0_-15px_50px_rgba(0,0,0,0.12)]">
        <p className="text-[10px] font-black text-slate-400 text-center mb-4 uppercase tracking-[0.2em]">סיוע מיידי וקווי חירום</p>
        <div className="grid grid-cols-3 gap-3">
           <a href="tel:1201" className="flex flex-col items-center justify-center p-4 bg-red-600 text-white rounded-[2rem] shadow-[0_8px_20px_rgba(220,38,38,0.3)] active:scale-95 transition-all group">
              <Phone size={24} className="mb-2 group-hover:rotate-12 transition-transform" />
              <span className="text-[11px] font-black leading-none">1201 (ער"ן)</span>
           </a>
           <button onClick={() => setShowSaharChat(true)} className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-[2rem] shadow-[0_8px_20px_rgba(37,99,235,0.3)] active:scale-95 transition-all group">
              <MessageCircle size={24} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black leading-none">צ'אט סה"ר</span>
           </button>
           <button onClick={() => setActiveTab('directory')} className="flex flex-col items-center justify-center p-4 bg-slate-900 text-white rounded-[2rem] shadow-[0_8px_20px_rgba(15,23,42,0.3)] active:scale-95 transition-all group">
              <UserPlus size={24} className="mb-2 group-hover:-translate-y-1 transition-transform" />
              <span className="text-[11px] font-black leading-none">אנשי קשר</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default CaregiverApp;
