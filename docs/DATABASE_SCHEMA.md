# Emuna 2.0 (Reality OS) - Database Schema Design

מסמך זה מתאר את סכמת הנתונים עבור מערכת Emuna 2.0, מבוססת על הדרישות שעלו ב-MRD.
הסכמה מתוכננת להיות גמישה (JSON-based בחלקה) אך סטריקטית בליבה כדי לאפשר סנכרון ל-EHR (תיק רפואי).

## 1. Core Users & Identities (השחקנים)

### `users`
הטבלה המרכזית לניהול זהויות.
*   `id` (UUID): מזהה ייחודי.
*   `full_name` (String): שם מלא.
*   `role` (Enum): 'PATIENT', 'STAFF', 'FAMILY', 'ADMIN'.
*   `unit_id` (UUID): קישור למחלקה (רלוונטי למטופלים וצוות).
*   `avatar_config` (JSON): הגדרות הדמות (עבור ה'ביו-ריאקטור' והממשק).
*   `created_at` (Timestamp).

### `patients_profile` (Extension for Patients)
הרחבה לפרופיל המטופל.
*   `user_id` (FK): קישור לטבלת users.
*   `admission_date` (Date): תאריך קבלה.
*   `primary_diagnosis` (String): אבחנה ראשית (ICD-10 code if needed).
*   `risk_level` (Enum): 'LOW', 'MEDIUM', 'HIGH', 'SUICIDAL'.
*   `sovereignty_points` (Integer): מטבעות הריבונות שנצברו.
*   `medication_adherence_rate` (Float): אחוז היענות נוכחי (מחושב).

## 2. The Living Timeline (מגדל הפיקוח)

### `timeline_events`
כל אירוע שקורה בלו"ז של המטופל.
*   `id` (UUID).
*   `patient_id` (FK).
*   `title` (String): שם הפעילות (למשל: "ריפוי בעיסוק", "ארוחת צהריים").
*   `start_time` (Timestamp).
*   `end_time` (Timestamp).
*   `status` (Enum): 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'MISSED', 'CHECKED_IN'.
*   `location_tag` (String): תיוג מיקום (למשל: "ROOM_102", "GARDEN").
*   `is_mandatory` (Boolean).

## 3. Operations & Logistics (וולט בית חולים)

### `supply_requests` (VoltKid)
בקשות ציוד ומזון.
*   `id` (UUID).
*   `requester_id` (FK): המטופל (או הורה עבור ילד).
*   `handler_id` (FK): מי מטפל בבקשה (הורה/צוות).
*   `item_type` (Enum): 'FOOD', 'CLOTHING', 'HYGIENE', 'TECH'.
*   `item_details` (String): פירוט (למשל: "קולה זירו וגרביים").
*   `status` (Enum): 'PENDING', 'APPROVED', 'ON_THE_WAY', 'DELIVERED', 'REJECTED'.
*   `created_at` (Timestamp).

### `missions` (לוגיסטיקת ריבונות)
משימות שהמטופל מבצע עבור המחלקה.
*   `id` (UUID).
*   `assigned_to` (FK): המטופל המבצע.
*   `title` (String): "איסוף כביסה", "סידור ספרייה".
*   `reward_points` (Integer): כמה "מטבעות ריבונות" זה שווה.
*   `status` (Enum): 'OPEN', 'IN_PROGRESS', 'VERIFIED_BY_STAFF'.

## 4. Clinical Features (הליבה הרפואית)

### `medications` (הביו-ריאקטור)
*   `id` (UUID).
*   `patient_id` (FK).
*   `drug_name` (String).
*   `dosage` (String).
*   `scheduled_time` (Time).
*   `visual_shape` (Enum): 'PILL_BLUE', 'CAPSULE_RED' (לאייקונים ב-UI).
*   `instructions` (String).

### `medication_logs` (vDOT)
תיעוד נטילה בפועל.
*   `id` (UUID).
*   `medication_id` (FK).
*   `taken_at` (Timestamp).
*   `validation_method` (Enum): 'SELF_REPORT', 'VIDEO_VERIFIED', 'NURSE_SIGNED'.
*   `mood_reported` (String): דיווח מצב רוח בעת הנטילה.

### `reality_checks` (AR Logs)
תיעוד השימוש ב"עדשת האמת".
*   `id` (UUID).
*   `patient_id` (FK).
*   `timestamp` (Timestamp).
*   `location_detected` (String).
*   `threat_level_reported` (Integer): 1-10 (רמת החרדה לפני הבדיקה).
*   `relief_level_reported` (Integer): 1-10 (רמת הרגיעה אחרי הבדיקה).
*   `duration_seconds` (Integer): כמה זמן ארכה הסריקה.

## 5. Ledger & Blockchain (ספר הניצחונות)

### `immutable_ledger`
היומן הבלתי מחיק של ההצלחות.
*   `id` (UUID).
*   `user_id` (FK).
*   `entry_type` (Enum): 'VICTORY', 'INSIGHT', 'STAFF_KUDOS'.
*   `content_hash` (String): חתימה דיגיטלית של התוכן (לצורך אימות עתידי).
*   `data_payload` (JSON): התוכן עצמו (טקסט, תמונה).
*   `timestamp` (Timestamp).
*   `is_public` (Boolean): האם המטופל הרשה לשתף את זה.

---

## הערות ארכיטקטורה
1.  **Offline First:** האפליקציה חייבת לשמור את הנתונים ב-Local Storage (SQLite/AsyncStorage) ולסנכרן כשיש רשת, כדי שפיצ'ר ה-AR וה-SOS יעבדו תמיד.
2.  **Privacy:** כל המידע הרפואי (patients_profile, medications) חייב להיות מוצפן במכשיר וב-DB.
3.  **Real-time:** טבלאות `timeline_events` ו-`supply_requests` דורשות מנגנון (כמו WebSockets או Firestore Snapshots) לעדכון חי.
