import { z } from "zod";
export type SupportedLang = "en" | "ar";

export const translations: Record<SupportedLang, Record<string, string>> = {
  en: {
    // ----- Header / Landing / Success / Submissions -----
    "header.title": "Care Fund",
    "landing.badge": "Simple • Private • Fast",
    "landing.hero.title": "Apply for financial assistance quickly and securely",
    "landing.hero.subtitle":
      "Streamlined form, instant local saving, and clear next steps. No accounts required.",
    "landing.start.application": "Start Application",
    "landing.view.submissions": "View Submissions",
    "landing.why.choose": "Why choose Care Fund?",
    "landing.why.subtitle":
      "We focus on clarity, speed, and your privacy—so you can focus on what matters.",
    "landing.feature.secure.title": "Secure by design",
    "landing.feature.secure.desc":
      "Your data is stored locally in your browser until you submit.",
    "landing.feature.quick.title": "Quick process",
    "landing.feature.quick.desc":
      "Finish in minutes with a focused, mobile-friendly form.",
    "landing.feature.support.title": "Human support",
    "landing.feature.support.desc":
      "We point you to the right resources when you need help.",
    "landing.feature.care.title": "Built with care",
    "landing.feature.care.desc":
      "Clear language, accessible components, low friction.",
    "landing.cta.title": "Ready to complete your application?",
    "landing.cta.subtitle":
      "You can pause anytime—your progress is saved in this browser.",
    "landing.apply.now": "Apply Now",

    "app.title": "Assistance Application",
    "app.subtitle": "Fill in your details below to submit your request.",

    "success.applicationSubmitted": "Application submitted",
    "success.redirecting": "Taking you to your submissions...",

    "submissions.backToHome": "Back to Home",
    "submissions.title": "Submissions",
    "submissions.subtitle": "All applications saved in this browser.",
    "submissions.noSubmissions": "No submissions yet",
    "submissions.getStarted":
      "Start your first application to see it listed here.",
    "submissions.newApplication": "New Application",
    "submissions.table.id": "ID",
    "submissions.table.name": "Name",
    "submissions.table.nationalId": "National ID",
    "submissions.table.reason": "Reason",
    "submissions.table.submittedAt": "Submitted At",

    // ---------------------- App steps ----------------------
    "app.step1.title": "Personal Information",
    "app.step2.title": "Family & Financial Details",
    "app.step3.title": "Situation Description",
    "app.back": "Back",
    "app.next": "Next",
    "app.submit": "Submit Application",

    // ---------------------- Common ----------------------
    "common.requiredMark": "*",
    "common.helpWrite": "Help me write",
    "toast.generated.title": "Text Generated",
    "toast.generated.desc":
      "Suggested text has been added. Feel free to modify it.",

    // ---------------------- Step 1 ----------------------
    "step1.name.label": "Full Name",
    "step1.name.placeholder": "Enter your full name",
    "step1.nationalId.label": "National ID",
    "step1.nationalId.placeholder": "Enter your national ID",
    "step1.dateOfBirth.label": "Date of Birth",
    "step1.gender.label": "Gender",
    "step1.gender.placeholder": "Select gender",
    "step1.gender.male": "Male",
    "step1.gender.female": "Female",
    "step1.gender.other": "Other",
    "step1.address.label": "Address",
    "step1.address.placeholder": "Street and number",
    "step1.city.label": "City",
    "step1.city.placeholder": "Enter city",
    "step1.state.label": "State/Province",
    "step1.state.placeholder": "Enter state/province",
    "step1.country.label": "Country",
    "step1.country.placeholder": "Enter country",
    "step1.phone.label": "Phone",
    "step1.phone.placeholder": "Enter phone number",
    "step1.email.label": "Email",
    "step1.email.placeholder": "Enter email address",

    // ---------------------- Step 2 ----------------------
    "step2.maritalStatus.label": "Marital Status",
    "step2.maritalStatus.placeholder": "Select marital status",
    "step2.maritalStatus.single": "Single",
    "step2.maritalStatus.married": "Married",
    "step2.maritalStatus.divorced": "Divorced",
    "step2.maritalStatus.widowed": "Widowed",
    "step2.maritalStatus.separated": "Separated",
    "step2.dependents.label": "Dependents",
    "step2.dependents.placeholder": "Number of dependents",
    "step2.employmentStatus.label": "Employment Status",
    "step2.employmentStatus.placeholder": "Select employment status",
    "step2.employmentStatus.employedFull": "Employed (full-time)",
    "step2.employmentStatus.employedPart": "Employed (part-time)",
    "step2.employmentStatus.selfEmployed": "Self-employed",
    "step2.employmentStatus.unemployed": "Unemployed",
    "step2.employmentStatus.retired": "Retired",
    "step2.employmentStatus.student": "Student",
    "step2.employmentStatus.disabled": "Disabled",
    "step2.employmentStatus.other": "Other",
    "step2.monthlyIncome.label": "Monthly Income",
    "step2.monthlyIncome.placeholder": "Enter monthly income",
    "step2.housingStatus.label": "Housing Status",
    "step2.housingStatus.placeholder": "Select housing status",
    "step2.housingStatus.ownHome": "Own home",
    "step2.housingStatus.rent": "Rent",
    "step2.housingStatus.livingWithFamily": "Living with family",
    "step2.housingStatus.temporaryHousing": "Temporary housing",
    "step2.housingStatus.homeless": "Homeless",
    "step2.housingStatus.other": "Other",

    // ---------------------- Step 3 ----------------------
    "step3.financialSituation.label": "Current Financial Situation",
    "step3.financialSituation.placeholder":
      "Describe your current financial situation and why you need assistance...",
    "step3.financialSituation.suggested":
      "I am currently facing financial difficulties due to unexpected circumstances. My income has been reduced and I am struggling to meet my basic needs including housing, food, and healthcare expenses. I have explored other options but require additional assistance to stabilize my situation.",
    "step3.employmentCircumstance.label": "Employment Circumstances",
    "step3.employmentCircumstance.placeholder":
      "Describe your employment situation and any relevant circumstances...",
    "step3.employmentCircumstance.suggested":
      "My current employment situation has been affected by recent changes in the job market. I am actively seeking stable employment opportunities while managing my existing responsibilities. I am committed to improving my employment status and would benefit from temporary financial support during this transition period.",
    "step3.reasonForApplying.label": "Reason for Applying",
    "step3.reasonForApplying.placeholder":
      "Explain why you are applying for this assistance and how it will help...",
    "step3.reasonForApplying.suggested":
      "I am applying for financial assistance to help bridge the gap during this challenging period in my life. This support would enable me to maintain stability while I work towards improving my circumstances. I am committed to using this assistance responsibly and working towards self-sufficiency.",

    // ---------- Ai (FIXED KEYS)
    "assist.help": "Help me write",
    "assist.generating": "Generating…",
    "assist.insert": "Insert",
    "assist.edit": "Edit",
    "assist.done": "Done",
    "assist.discard": "Discard",
    "assist.regenerate": "Regenerate",
    "assist.suggestion": "Suggestion",
    "assist.error": "Could not generate a suggestion.",
  },

  ar: {
    // ----- Header / Landing / Success / Submissions -----
    "header.title": "صندوق الرعاية",
    "landing.badge": "بسيط • خاص • سريع",
    "landing.hero.title": "قدّم طلب المساعدة المالية بسرعة وبأمان",
    "landing.hero.subtitle":
      "نموذج مبسّط، حفظ محلي فوري، وخطوات لاحقة واضحة. لا حاجة لحساب.",
    "landing.start.application": "ابدأ الطلب",
    "landing.view.submissions": "عرض الطلبات",
    "landing.why.choose": "لماذا تختار صندوق الرعاية؟",
    "landing.why.subtitle":
      "نمنح الأولوية للوضوح والسرعة والخصوصية—لتُركّز على ما يهمك.",
    "landing.feature.secure.title": "آمن بالتصميم",
    "landing.feature.secure.desc":
      "تُحفَظ بياناتك محليًا في متصفحك حتى تقوم بالإرسال.",
    "landing.feature.quick.title": "إجراءات سريعة",
    "landing.feature.quick.desc":
      "أكمِل الطلب خلال دقائق عبر نموذج بسيط يعمل على الهاتف.",
    "landing.feature.support.title": "دعم بشري",
    "landing.feature.support.desc":
      "نوجّهك للجهات المناسبة عندما تحتاج للمساعدة.",
    "landing.feature.care.title": "مصمم بعناية",
    "landing.feature.care.desc":
      "لغة واضحة، ومكوّنات يسهل الوصول إليها، واحتكاك أقل.",
    "landing.cta.title": "جاهز لإكمال طلبك؟",
    "landing.cta.subtitle":
      "يمكنك التوقّف في أي وقت—يُحفَظ تقدّمك في هذا المتصفح.",
    "landing.apply.now": "قدّم الآن",

    "app.title": "طلب المساعدة",
    "app.subtitle": "املأ بياناتك أدناه لإرسال الطلب.",

    "success.applicationSubmitted": "تم إرسال الطلب",
    "success.redirecting": "جارٍ تحويلك إلى صفحة الطلبات...",

    "submissions.backToHome": "العودة للرئيسية",
    "submissions.title": "الطلبات",
    "submissions.subtitle": "كل الطلبات المحفوظة في هذا المتصفح.",
    "submissions.noSubmissions": "لا توجد طلبات بعد",
    "submissions.getStarted": "ابدأ أوّل طلب لتظهر القائمة هنا.",
    "submissions.newApplication": "طلب جديد",
    "submissions.table.id": "المعرّف",
    "submissions.table.name": "الاسم",
    "submissions.table.nationalId": "الهوية الوطنية",
    "submissions.table.reason": "السبب",
    "submissions.table.submittedAt": "تاريخ الإرسال",

    // ---------------------- App steps ----------------------
    "app.step1.title": "المعلومات الشخصية",
    "app.step2.title": "العائلة والبيانات المالية",
    "app.step3.title": "وصف الحالة",
    "app.back": "رجوع",
    "app.next": "التالي",
    "app.submit": "إرسال الطلب",

    // ---------------------- Common ----------------------
    "common.requiredMark": "*",
    "common.helpWrite": "ساعدني في الكتابة",
    "toast.generated.title": "تم إنشاء نص",
    "toast.generated.desc": "أضفنا نصًا مقترحًا. عدّلْه ليعكس وضعك.",

    // ---------------------- Step 1 ----------------------
    "step1.name.label": "الاسم الكامل",
    "step1.name.placeholder": "اكتب اسمك الكامل",
    "step1.nationalId.label": "الهوية الوطنية",
    "step1.nationalId.placeholder": "اكتب رقم الهوية الوطنية",
    "step1.dateOfBirth.label": "تاريخ الميلاد",
    "step1.gender.label": "النوع",
    "step1.gender.placeholder": "اختر النوع",
    "step1.gender.male": "ذكر",
    "step1.gender.female": "أنثى",
    "step1.gender.other": "آخر",
    "step1.address.label": "العنوان",
    "step1.address.placeholder": "الشارع ورقم المبنى",
    "step1.city.label": "المدينة",
    "step1.city.placeholder": "اكتب المدينة",
    "step1.state.label": "المنطقة/المحافظة",
    "step1.state.placeholder": "اكتب المنطقة/المحافظة",
    "step1.country.label": "الدولة",
    "step1.country.placeholder": "اكتب الدولة",
    "step1.phone.label": "الهاتف",
    "step1.phone.placeholder": "اكتب رقم الهاتف",
    "step1.email.label": "البريد الإلكتروني",
    "step1.email.placeholder": "اكتب بريدك الإلكتروني",

    // ---------------------- Step 2 ----------------------
    "step2.maritalStatus.label": "الحالة الاجتماعية",
    "step2.maritalStatus.placeholder": "اختر الحالة الاجتماعية",
    "step2.maritalStatus.single": "أعزب/عزباء",
    "step2.maritalStatus.married": "متزوج/متزوجة",
    "step2.maritalStatus.divorced": "مطلّق/مطلّقة",
    "step2.maritalStatus.widowed": "أرمل/أرملة",
    "step2.maritalStatus.separated": "منفصل/منفصلة",
    "step2.dependents.label": "المعالون",
    "step2.dependents.placeholder": "عدد المعالين",
    "step2.employmentStatus.label": "الوضع الوظيفي",
    "step2.employmentStatus.placeholder": "اختر الوضع الوظيفي",
    "step2.employmentStatus.employedFull": "موظّف (دوام كامل)",
    "step2.employmentStatus.employedPart": "موظّف (دوام جزئي)",
    "step2.employmentStatus.selfEmployed": "عمل حر",
    "step2.employmentStatus.unemployed": "عاطل عن العمل",
    "step2.employmentStatus.retired": "متقاعد",
    "step2.employmentStatus.student": "طالب/طالبة",
    "step2.employmentStatus.disabled": "ذو إعاقة",
    "step2.employmentStatus.other": "أخرى",
    "step2.monthlyIncome.label": "الدخل الشهري",
    "step2.monthlyIncome.placeholder": "اكتب الدخل الشهري",
    "step2.housingStatus.label": "وضع السكن",
    "step2.housingStatus.placeholder": "اختر وضع السكن",
    "step2.housingStatus.ownHome": "منزل مملوك",
    "step2.housingStatus.rent": "إيجار",
    "step2.housingStatus.livingWithFamily": "السكن مع العائلة",
    "step2.housingStatus.temporaryHousing": "سكن مؤقت",
    "step2.housingStatus.homeless": "بدون سكن",
    "step2.housingStatus.other": "أخرى",

    // ---------------------- Step 3 ----------------------
    "step3.financialSituation.label": "الوضع المالي الحالي",
    "step3.financialSituation.placeholder":
      "صفْ وضعك المالي الحالي وسبب حاجتك للمساعدة...",
    "step3.financialSituation.suggested":
      "أواجه حاليًا صعوبات مالية بسبب ظروف غير متوقعة. انخفض دخلي وأجد صعوبة في تلبية الاحتياجات الأساسية بما في ذلك السكن والطعام والرعاية الصحية. لقد استكشفت بدائل أخرى لكني أحتاج دعمًا إضافيًا لاستقرار وضعي.",
    "step3.employmentCircumstance.label": "الظروف الوظيفية",
    "step3.employmentCircumstance.placeholder":
      "اشرح وضعك الوظيفي وأي ظروف ذات صلة...",
    "step3.employmentCircumstance.suggested":
      "تأثر وضعي الوظيفي بالتغيّرات الأخيرة في سوق العمل. أبحث بنشاط عن فرص عمل مستقرة مع إدارة مسؤولياتي الحالية. أنا ملتزم بتحسين وضعي الوظيفي وأستفيد من دعم مالي مؤقت خلال هذه الفترة.",
    "step3.reasonForApplying.label": "سبب التقديم",
    "step3.reasonForApplying.placeholder":
      "اشرح سبب تقديمك لهذه المساعدة وكيف ستفيدك...",
    "step3.reasonForApplying.suggested":
      "أتقدم بطلب مساعدة مالية لسد الفجوة خلال هذه الفترة الصعبة من حياتي. سيساعدني هذا الدعم على الحفاظ على الاستقرار بينما أعمل على تحسين ظروفي. سأستخدم هذه المساعدة بمسؤولية وأسعى نحو الاعتماد على الذات.",

    // ---------- Ai (FIXED KEYS)
    "assist.help": "ساعدني في الكتابة",
    "assist.generating": "جارٍ الإنشاء…",
    "assist.insert": "إدراج",
    "assist.edit": "تعديل",
    "assist.done": "تم",
    "assist.discard": "إلغاء",
    "assist.regenerate": "إعادة الإنشاء",
    "assist.suggestion": "اقتراح",
    "assist.error": "تعذّر إنشاء اقتراح.",
  },
};
const validationMessages: Record<SupportedLang, Record<string, string>> = {
  en: {
    "error.name.min": "Name must be at least {min} characters long",
    "error.nationalId.min":
      "National ID must be at least {min} characters long",
    "error.dateOfBirth.required": "Date of birth is required",
    "error.gender.required": "Gender is required",
    "error.address.min": "Address must be at least {min} characters long",
    "error.city.min": "City must be at least {min} characters long",
    "error.state.min": "State must be at least {min} characters long",
    "error.country.min": "Country must be at least {min} characters long",
    "error.phone.minDigits": "Phone number must be at least {min} digits",
    "error.email.invalid": "Please enter a valid email address",

    "error.maritalStatus.required": "Marital status is required",
    "error.dependents.number": "Number of dependents must be a valid number",
    "error.employmentStatus.required": "Employment status is required",
    "error.monthlyIncome.number": "Monthly income must be a valid number",
    "error.housingStatus.required": "Housing status is required",

    "error.financialSituation.min":
      "Please provide at least {min} characters describing your financial situation",
    "error.employmentCircumstance.min":
      "Please provide at least {min} characters describing your employment circumstances",
    "error.reasonForApplying.min":
      "Please provide at least {min} characters explaining your reason for applying",
  },
  ar: {
    "error.name.min": "يجب أن يكون الاسم على الأقل {min} أحرف",
    "error.nationalId.min": "يجب أن يكون رقم الهوية على الأقل {min} أحرف",
    "error.dateOfBirth.required": "تاريخ الميلاد مطلوب",
    "error.gender.required": "النوع مطلوب",
    "error.address.min": "يجب أن يكون العنوان على الأقل {min} أحرف",
    "error.city.min": "يجب أن تكون المدينة على الأقل {min} أحرف",
    "error.state.min": "يجب أن تكون المنطقة على الأقل {min} أحرف",
    "error.country.min": "يجب أن تكون الدولة على الأقل {min} أحرف",
    "error.phone.minDigits":
      "يجب أن يحتوي رقم الهاتف على {min} أرقام على الأقل",
    "error.email.invalid": "يرجى إدخال بريد إلكتروني صالح",

    "error.maritalStatus.required": "الحالة الاجتماعية مطلوبة",
    "error.dependents.number": "عدد المعالين يجب أن يكون رقمًا صالحًا",
    "error.employmentStatus.required": "الوضع الوظيفي مطلوب",
    "error.monthlyIncome.number": "الدخل الشهري يجب أن يكون رقمًا صالحًا",
    "error.housingStatus.required": "وضع السكن مطلوب",

    "error.financialSituation.min":
      "يرجى إدخال وصف لا يقل عن {min} أحرف لوضعك المالي",
    "error.employmentCircumstance.min":
      "يرجى إدخال وصف لا يقل عن {min} أحرف لظروفك الوظيفية",
    "error.reasonForApplying.min":
      "يرجى إدخال سبب لا يقل عن {min} أحرف للتقديم",
  },
};
const t =
  (lang: SupportedLang) =>
  (key: string, params?: Record<string, string | number>): string => {
    const raw =
      translations[lang]?.[key] ??
      validationMessages[lang]?.[key] ??
      validationMessages.en[key] ??
      key;

    if (!params) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, k: string) =>
      params[k] !== undefined ? String(params[k]) : `{${k}}`
    );
  };
