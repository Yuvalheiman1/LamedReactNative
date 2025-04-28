import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'he' | 'en' | 'ar';
type Direction = 'rtl' | 'ltr';

// Define translation keys
interface Translations {
    mainTitle: string;
    mainDescription: string;
    studyMode: string;
    studyModeDescription: string;
    startStudying: string;
    simulationMode: string;
    simulationModeDescription: string;
    primumCourse: string;
    primumCourseDescription: string;
    primumZone: string;
    startSimulation: string;
    learningTip: string;
    learningTipContent: string;
    categories: string;
    chooseCategory: string;
    allCategories: string;
    studyAllQuestions: string;
    studyOnlyCategory: string;
    studyDescription: string;
    question: string;
    of: string;
    previous: string;
    next: string;
    finish: string;
    correct: string;
    incorrect: string;
    explanation: string;
    yourScore: string;
    passed: string;
    failed: string;
    youAnswered: string;
    needToPass: string;
    timeTaken: string;
    tryAgain: string;
    backToHome: string;
    incorrectAnswers: string;
    showAnswer: string;
    hideAnswer: string;
    shuffleQuestions: string;
    originalOrder: string;
    questionNumber: string;
    testResults: string;
    congratulations: string;
    testFailed: string;
    startTest: string;
    testInstructions: string;
    minutes: string;
    seconds: string;
    jumpToQuestion: string;
    selectVehicle: string;
    chooseVehicleType: string;
    carLicense: string;
    truckLicense: string;
    typeB: string;
    typeC: string;
    vehicleTypeDescription: string;
    carDescription: string;
    truckDescription: string;
    noQuestionsAvailable: string;
    roadSigns: string;
    trafficRules: string;
    vehicleControl: string;
    safety: string;
  // (rest of your keys stay the same)
}

// Define translations (your translations object stays the same)
const translations: Record<Language, Translations> = {
    he: {
        mainTitle: 'לומדת נהיגה',
        mainDescription: 'התכונן למבחן התאוריה בדרך הטובה ביותר. לימוד ותרגול כל החומר הנדרש.',
        studyMode: 'מצב לימוד',
        studyModeDescription: 'למד את החומר על ידי עיון בשאלות ובתשובות הנכונות. חלוקה לפי נושאים שונים.',
        startStudying: 'התחל ללמוד',
        simulationMode: 'מצב סימולציה',
        simulationModeDescription: 'התנסה במבחן סימולציה הדומה למבחן האמיתי. 30 שאלות ב-30 דקות עם אחוז מעבר של 80%.',
        startSimulation: 'התחל סימולציה',
        primumCourse: 'קורס פרימיום (יעלה בקרוב!!!)',
        primumCourseDescription: 'קורס בתשלום כולל סרטונים מוקלטים לשיפור ההבנה והכנה טובה יותר למבחן',
        primumZone: 'אזור פרימיום',
        learningTip: 'טיפ ללומדים',
        learningTipContent: 'ככל שתתרגל יותר שאלות, כך תהיה מוכן יותר למבחן. מומלץ לעבור על כל השאלות במצב לימוד ולאחר מכן להתנסות במספר סימולציות.',
        categories: 'קטגוריות',
        chooseCategory: 'בחר קטגוריה ללימוד',
        allCategories: 'כל הקטגוריות',
        studyAllQuestions: 'לימוד של כל השאלות',
        studyOnlyCategory: 'ללמוד רק שאלות בקטגוריה זו',
        studyDescription: 'בחר קטגוריה כדי ללמוד שאלות ספציפיות או בחר בכל הקטגוריות כדי לכסות את כל החומר.',
        question: 'שאלה',
        of: 'מתוך',
        previous: 'קודם',
        next: 'הבא',
        finish: 'סיים מבחן',
        correct: 'נכון!',
        incorrect: 'לא נכון',
        explanation: 'הסבר:',
        yourScore: 'הציון שלך:',
        passed: 'עברת בהצלחה!',
        failed: 'נכשלת',
        youAnswered: 'ענית נכון על',
        needToPass: 'אתה צריך',
        timeTaken: 'זמן שלקח:',
        tryAgain: 'נסה שוב',
        backToHome: 'חזור לדף הבית',
        incorrectAnswers: 'תשובות שגויות',
        showAnswer: 'הצג תשובה',
        hideAnswer: 'הסתר תשובה',
        shuffleQuestions: 'ערבב שאלות',
        originalOrder: 'סדר מקורי',
        questionNumber: 'שאלה מספר',
        testResults: 'תוצאות מבחן',
        congratulations: 'כל הכבוד!',
        testFailed: 'לא עברת את המבחן.',
        startTest: 'התחל מבחן',
        testInstructions: 'יהיו לך {0} דקות לענות על {1} שאלות. אתה צריך {2} תשובות נכונות כדי לעבור.',
        minutes: 'דקות',
        seconds: 'שניות',
        jumpToQuestion: 'קפוץ לשאלה',
        selectVehicle: 'בחר סוג רישיון',
        chooseVehicleType: 'בחר את סוג הרישיון שברצונך ללמוד',
        carLicense: 'רישיון רכב פרטי',
        truckLicense: 'רישיון משאית',
        typeB: 'סוג B - רכב פרטי עד 3,500 ק"ג',
        typeC: 'סוג C - משאית מעל 3,500 ק"ג',
        vehicleTypeDescription: 'בחר את סוג הרישיון המתאים לך:',
        carDescription: 'מתאים לנהיגה ברכב פרטי עד 3,500 ק"ג, כולל תיאוריה ומבחן מעשי',
        truckDescription: 'מתאים לנהיגה במשאיות מעל 3,500 ק"ג, כולל תיאוריה מורחבת ומבחן מעשי',
        noQuestionsAvailable: 'אין שאלות זמינות',
        roadSigns: 'תמרורי דרך',
        trafficRules: 'חוקי תנועה',
        vehicleControl: 'שליטת רכב',
        safety: 'בטיחות',
      },
      en: {
        mainTitle: 'Driving Theory',
        mainDescription: 'Prepare for the theory test in the best way. Learn and practice all the required material.',
        studyMode: 'Study Mode',
        studyModeDescription: 'Learn the material by reviewing questions and correct answers. Divided by different topics.',
        startStudying: 'Start Studying',
        simulationMode: 'Simulation Mode',
        simulationModeDescription: 'Experience a simulation test similar to the real exam. 30 questions in 30 minutes with an 80% passing rate.',
        startSimulation: 'Start Simulation',
        primumCourse: 'Premium Course (Coming Soon!)',
        primumCourseDescription: 'Paid course including recorded videos to improve understanding and ensure better exam preparation',
        primumZone: 'Premium Zone',
        learningTip: 'Learning Tip',
        learningTipContent: 'The more questions you practice, the better prepared you will be for the exam. It is recommended to go through all the questions in study mode and then try several simulations.',
        categories: 'Categories',
        chooseCategory: 'Choose a category to study',
        allCategories: 'All Categories',
        studyAllQuestions: 'Study all questions',
        studyOnlyCategory: 'Study only questions in this category',
        studyDescription: 'Choose a category to study specific questions or select all categories to cover all material.',
        question: 'Question',
        of: 'of',
        previous: 'Previous',
        next: 'Next',
        finish: 'Finish Test',
        correct: 'Correct!',
        incorrect: 'Incorrect',
        explanation: 'Explanation:',
        yourScore: 'Your Score:',
        passed: 'You Passed!',
        failed: 'You Failed',
        youAnswered: 'You answered correctly',
        needToPass: 'You need',
        timeTaken: 'Time taken:',
        tryAgain: 'Try Again',
        backToHome: 'Back to Home',
        incorrectAnswers: 'Incorrect Answers',
        showAnswer: 'Show Answer',
        hideAnswer: 'Hide Answer',
        shuffleQuestions: 'Shuffle Questions',
        originalOrder: 'Original Order',
        questionNumber: 'Question Number',
        testResults: 'Test Results',
        congratulations: 'Congratulations!',
        testFailed: 'You did not pass the test.',
        startTest: 'Start Test',
        testInstructions: 'You will have {0} minutes to answer {1} questions. You need {2} correct answers to pass.',
        minutes: 'minutes',
        seconds: 'seconds',
        jumpToQuestion: 'Jump to Question',
        selectVehicle: 'Select License Type',
        chooseVehicleType: 'Choose the type of license you want to study for',
        carLicense: 'Private Car License',
        truckLicense: 'Truck License',
        typeB: 'Type B - Private vehicle up to 3,500kg',
        typeC: 'Type C - Truck over 3,500kg',
        vehicleTypeDescription: 'Select your preferred license type:',
        carDescription: 'Suitable for driving private vehicles up to 3,500kg, includes theory and practical test',
        truckDescription: 'Suitable for driving trucks over 3,500kg, includes extended theory and practical test',
        noQuestionsAvailable: 'No questions available',
        roadSigns: 'Road Signs',
        trafficRules: 'Traffic Rules',
        vehicleControl: 'Vehicle Control',
        safety: 'Safety',
      },
      ar: {
        mainTitle: 'نظرية القيادة',
        mainDescription: 'استعد لاختبار النظرية بأفضل طريقة. تعلم ومارس كل المواد المطلوبة.',
        studyMode: 'وضع الدراسة',
        studyModeDescription: 'تعلم المادة من خلال مراجعة الأسئلة والإجابات الصحيحة. مقسمة حسب مواضيع مختلفة.',
        startStudying: 'ابدأ الدراسة',
        simulationMode: 'وضع المحاكاة',
        simulationModeDescription: 'جرب اختبار محاكاة مشابه للامتحان الحقيقي. 30 سؤالاً في 30 دقيقة بنسبة نجاح 80٪.',
        startSimulation: 'بدء المحاكاة',
        primumCourse:  'دورة مدفوعة (ستكون متاحة قريبًا!)',
        primumCourseDescription: 'دورة مدفوعة تشمل فيديوهات مسجلة لتحسين الفهم وضمان استعداد أفضل للامتحان',
        primumZone: 'منطقة مدفوعة',
        learningTip: 'نصيحة للتعلم',
        learningTipContent: 'كلما تدربت على المزيد من الأسئلة، كلما كنت أكثر استعدادًا للامتحان. يوصى بمراجعة جميع الأسئلة في وضع الدراسة ثم تجربة عدة محاكاة.',
        categories: 'الفئات',
        chooseCategory: 'اختر فئة للدراسة',
        allCategories: 'كل الفئات',
        studyAllQuestions: 'دراسة جميع الأسئلة',
        studyOnlyCategory: 'دراسة الأسئلة في هذه الفئة فقط',
        studyDescription: 'اختر فئة لدراسة أسئلة محددة أو حدد جميع الفئات لتغطية جميع المواد.',
        question: 'سؤال',
        of: 'من',
        previous: 'السابق',
        next: 'التالي',
        finish: 'إنهاء الاختبار',
        correct: 'صحيح!',
        incorrect: 'غير صحيح',
        explanation: 'تفسير:',
        yourScore: 'نتيجتك:',
        passed: 'لقد نجحت!',
        failed: 'لقد فشلت',
        youAnswered: 'أجبت بشكل صحيح على',
        needToPass: 'تحتاج',
        timeTaken: 'الوقت المستغرق:',
        tryAgain: 'حاول مرة أخرى',
        backToHome: 'العودة إلى الصفحة الرئيسية',
        incorrectAnswers: 'إجابات خاطئة',
        showAnswer: 'إظهار الإجابة',
        hideAnswer: 'إخفاء الإجابة',
        shuffleQuestions: 'خلط الأسئلة',
        originalOrder: 'الترتيب الأصلي',
        questionNumber: 'سؤال رقم',
        testResults: 'نتائج الاختبار',
        congratulations: 'تهانينا!',
        testFailed: 'لم تجتز الاختبار.',
        startTest: 'بدء الاختبار',
        testInstructions: 'سيكون لديك {0} دقيقة للإجابة على {1} سؤالاً. تحتاج إلى {2} إجابة صحيحة للنجاح.',
        minutes: 'دقائق',
        seconds: 'ثواني',
        jumpToQuestion: 'انتقل إلى السؤال',
        selectVehicle: 'اختر نوع الرخصة',
        chooseVehicleType: 'اختر نوع الرخصة التي تريد دراستها',
        carLicense: 'رخصة سيارة خاصة',
        truckLicense: 'رخصة شاحنة',
        typeB: 'النوع B - مركبة خاصة حتى 3,500 كجم',
        typeC: 'النوع C - شاحنة أكثر من 3,500 كجم',
        vehicleTypeDescription: 'اختر نوع الرخصة المناسب لك:',
        carDescription: 'مناسبة لقيادة المركبات الخاصة حتى 3,500 كجم، تشمل النظري والاختبار العملي',
        truckDescription: 'مناسبة لقيادة الشاحنات أكثر من 3,500 كجم، تشمل النظري الموسع والاختبار العملي',
        noQuestionsAvailable: 'لا توجد أسئلة متاحة',
        roadSigns: 'علامات الطريق',
        trafficRules: 'قواعد المرور',
        vehicleControl: 'السيطرة على المركبة',
        safety: 'السلامة',
      }
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('he');

  const direction: Direction = language === 'en' ? 'ltr' : 'rtl';

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // (No document updates in RN)
  };

  const t = (key: keyof Translations): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
