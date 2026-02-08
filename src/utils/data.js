// University data and configuration
// Said Abdelaziz - University Application Tracker

export const universities = [
    {
        id: 1,
        name: "University of Salford",
        city: "Manchester",
        program: "MSc Entrepreneurship & Innovation",
        fees: "£16,980",
        ielts: "6.0",
        link: "https://www.salford.ac.uk/courses/postgraduate/entrepreneurship-and-innovation",
        status: "not_applied",
        notes: "Part of Greater Manchester. Strong business connections.",
        documents: []
    },
    {
        id: 2,
        name: "Leeds Beckett University",
        city: "Leeds",
        program: "MSc Entrepreneurship and Business Development",
        fees: "£18,440",
        ielts: "6.0",
        link: "https://www.leedsbeckett.ac.uk/courses/entrepreneurship-business-development-msc/",
        status: "not_applied",
        notes: "Leeds is major UK business hub. Good retail opportunities.",
        documents: []
    },
    {
        id: 3,
        name: "Leeds Trinity University",
        city: "Leeds",
        program: "MBA",
        fees: "£15,250",
        ielts: "6.0",
        link: "https://www.leedstrinity.ac.uk/courses/postgraduate/mba/",
        status: "not_applied",
        notes: "Accepts Duolingo 105 as alternative to IELTS.",
        documents: []
    },
    {
        id: 4,
        name: "Birmingham City University",
        city: "Birmingham",
        program: "MSc Management and Entrepreneurship",
        fees: "£18,970",
        ielts: "6.0",
        link: "https://www.bcu.ac.uk/courses/management-and-entrepreneurship-msc-2026-27",
        status: "not_applied",
        notes: "Second largest UK city. Diverse retail market.",
        documents: []
    },
    {
        id: 5,
        name: "University College Birmingham",
        city: "Birmingham",
        program: "MSc Enterprise Management",
        fees: "£17,500",
        ielts: "6.0",
        link: "https://www.ucb.ac.uk/university/postgraduate/courses/enterprise-management-msc-pgdip/",
        status: "not_applied",
        notes: "Focused on practical enterprise skills.",
        documents: []
    },
    {
        id: 6,
        name: "Sheffield Hallam University",
        city: "Sheffield",
        program: "MSc Entrepreneurship & Innovation Management",
        fees: "£18,600",
        ielts: "6.0",
        link: "https://www.shu.ac.uk/courses/business-and-management/msc-international-business-management/",
        status: "not_applied",
        notes: "Triple Crown accredited business school.",
        documents: []
    },
    {
        id: 7,
        name: "De Montfort University",
        city: "Leicester",
        program: "MSc International Business & Entrepreneurship",
        fees: "£19,000",
        ielts: "6.0",
        link: "https://www.dmu.ac.uk/study/courses/postgraduate-courses/international-business-and-management-msc-degree/international-business-and-management-msc.aspx",
        status: "not_applied",
        notes: "⭐ TOP CHOICE - The Crucible incubator, £1,000 seed funding, free office space. Innovation Centre support.",
        documents: []
    },
    {
        id: 8,
        name: "Cardiff Metropolitan University",
        city: "Cardiff",
        program: "MSc Entrepreneurship & Innovation Management",
        fees: "£15,000",
        ielts: "6.0",
        link: "https://www.cardiffmet.ac.uk/courses/postgraduate/msc-entrepreneurship-and-innovation-management/",
        status: "not_applied",
        notes: "Welsh capital. Lower living costs than England.",
        documents: []
    },
    {
        id: 9,
        name: "University of West of Scotland",
        city: "Glasgow",
        program: "MBA / International Management",
        fees: "£15,250",
        ielts: "6.0",
        link: "https://www.uws.ac.uk/study/postgraduate/postgraduate-course-search/master-of-business-administration-mba-with-enterprise/",
        status: "not_applied",
        notes: "Scotland's largest city. Good for retail.",
        documents: []
    },
    {
        id: 10,
        name: "Wrexham University",
        city: "Wrexham",
        program: "MBA Master of Business Administration",
        fees: "£11,000",
        ielts: "6.0",
        link: "https://wrexham.ac.uk/courses/postgraduate-courses/mba/",
        status: "not_applied",
        notes: "💰 MOST AFFORDABLE - Small city in Wales. Low living costs.",
        documents: []
    }
];

export const documentTypes = [
    "Secondary School Certificate",
    "Secondary School Transcripts",
    "Relevé de Notes Bac",
    "Relevé de Notes Licence (3 years)",
    "BSc Degree Certificate",
    "BSc Transcript",
    "Certificate of Bac (Optional)",
    "Certificate of Experience (Optional)",
    "CV",
    "International Passport",
    "Personal Statement (If available)",
    "Recommendation Letter (If available)"
];

export const statusOptions = {
    not_applied: { 
        label: "Not Applied", 
        color: "bg-gray-600", 
        icon: "○",
        description: "Research phase - not yet submitted"
    },
    documents_pending: { 
        label: "Documents Pending", 
        color: "bg-yellow-600", 
        icon: "◐",
        description: "Gathering required documents"
    },
    submitted: { 
        label: "Submitted", 
        color: "bg-blue-600", 
        icon: "◔",
        description: "Application sent to university"
    },
    accepted: { 
        label: "Accepted", 
        color: "bg-green-600", 
        icon: "✓",
        description: "Offer received from university"
    },
    rejected: { 
        label: "Rejected", 
        color: "bg-red-600", 
        icon: "✗",
        description: "Application declined"
    }
};

export const communicationTypes = {
    note: { label: "Note", icon: "📝", color: "bg-blue-900/30" },
    email: { label: "Email", icon: "📧", color: "bg-purple-900/30" },
    whatsapp: { label: "WhatsApp", icon: "💬", color: "bg-green-900/30" },
    call: { label: "Call", icon: "📞", color: "bg-yellow-900/30" },
    meeting: { label: "Meeting", icon: "🤝", color: "bg-indigo-900/30" }
};

// Helper function to calculate application deadline
export const calculateDeadline = (intakeMonth = 'September', year = 2026) => {
    // Most UK universities: 6-8 months before intake
    const deadlineMap = {
        'September': 'March 31, 2026',
        'January': 'September 30, 2025'
    };
    return deadlineMap[intakeMonth] || 'Check university website';
};

// Helper to format currency
export const formatFees = (fees) => {
    return fees.replace('£', '£ ').replace(',', ',');
};