
"""
EMUNA 2.0 - Core Intelligence Engine Prototype
This script simulates the 'Cognitive Alchemist' functionality using OpenAI API.
(Currently using Mocks for MVP safety until API Key is provided)
"""

import os
# import openai  # Uncomment when API key is ready

class AlchemistEngine:
    def __init__(self):
        self.system_prompt = """
        You are 'The Anchor', a specialized CBT AI for schizophrenia support.
        Your Mission: Reframe paranoid thoughts into grounded reality checks.
        
        Protocol:
        1. Validate the emotion (fear/anxiety), never the delusion.
        2. Offer a dull, logical explanation (The "Boring Truth").
        3. End with a physical grounding command.
        
        Tone: Calm, authoritative, concise.
        """
        print("🔵 Emuna 2.0 Core System: ONLINE")
    
    def process_thought(self, user_input):
        print(f"🔻 INPUT TRIGGER: {user_input}")
        print("... Alchemy Processing ...")
        
        # MOCK RESPONSE (For Safety & Speed)
        # In production, this would call openai.ChatCompletion.create
        
        if "פורצים" in user_input or "שומע" in user_input:
            response = "אני שומע שהרעש בחוץ מלחיץ אותך, יהונתן. סביר להניח שהשכנים פשוט מדברים בקול רם או רואים טלוויזיה, הם עסוקים בעניינים שלהם ולא בך. קח נשימה עמוקה ותסתכל על הידיים שלך – הן כאן והחדר נעול ובטוח."
        elif "מסתכלים" in user_input:
            response = "יהונתן, זה רעש רקע. תנשום. הם לא מסתכלים עליך, הם בטלפון. אתה בלתי נראה ובטוח."
        else:
            response = "אני מבין שאתה בלחץ. המערכת איתך. תנשום עמוק ותחזיק את הכיסא שאתה יושב עליו. זה אמיתי."
            
        return response

if __name__ == "__main__":
    # Simulation
    engine = AlchemistEngine()
    
    # Test Case 1
    thought = "אני שומע את השכנים, הם אומרים שהם יפרצו לי לחדר עוד מעט."
    result = engine.process_thought(thought)
    print(f"🟢 OUTPUT (The Anchor): {result}")
