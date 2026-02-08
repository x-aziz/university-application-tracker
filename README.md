# 🎓 University Application Tracker

**Professional React application for tracking UK university applications through AIMS Education**

Built by: **Said Abdelaziz**  
Tech Stack: **React 18 + Vite**  
Purpose: **Demonstrate technical competence & entrepreneurial problem-solving**

---

## 🚀 Features

### ✅ Dashboard
- Track 10 UK universities grouped by city
- Live application status updates (Not Applied → Documents Pending → Submitted → Accepted/Rejected)
- Visual statistics bar showing progress
- Direct links to university websites
- Add/remove universities dynamically

### ✅ Documents Manager
- Complete checklist of required documents
- Visual progress tracking
- Mark documents as completed
- Real-time completion percentage
- Persistent storage (data never lost)

### ✅ Communications Log
- Record all AIMS Education conversations
- Timestamped entries
- Track questions, answers, and updates
- Full conversation history
- Delete old entries

### ✅ Technical Excellence
- **React 18** - Modern component architecture
- **LocalStorage persistence** - Data survives browser restarts
- **Responsive design** - Works on all devices
- **Professional UI** - Glass morphism effects
- **Zero backend** - Runs entirely in browser
- **Production-ready** - Clean, documented code

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

```bash
# 1. Navigate to project directory
cd university-tracker-react

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to:
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

Build output goes to `dist/` folder - ready to deploy!

---

## 📁 Project Structure

```
university-tracker-react/
├── package.json            # Dependencies
├── vite.config.js          # Build config
├── index.html              # Entry point
├── README.md               # This file
├── HOW-TO-RUN.txt         # Beginner instructions
│
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component
│   │
│   ├── data/
│   │   └── database.js     # All data + storage
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── StatsBar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── UniversityGroup.jsx
│   │   ├── UniversityCard.jsx
│   │   ├── Documents.jsx
│   │   └── Communications.jsx
│   │
│   └── styles/
│       └── App.css         # All styling
│
└── public/
    └── universities/       # Logo images
```

---

## 🎓 Universities Tracked

| City | University | Fees | IELTS |
|------|-----------|------|-------|
| **Manchester** | University of Salford | £16,980 | 6.0 |
| **Leeds** | Leeds Beckett University | £18,440 | 6.0 |
| **Leeds** | Leeds Trinity University | £15,250 | 6.0 |
| **Birmingham** | Birmingham City University | £18,970 | 6.0 |
| **Birmingham** | University College Birmingham | £17,500 | 6.0 |
| **Sheffield** | Sheffield Hallam University | £18,600 | 6.0 |
| **Leicester** | De Montfort University | £19,000 | 6.0 |
| **Cardiff** | Cardiff Metropolitan University | £15,000 | 6.0 |
| **Glasgow** | University of West of Scotland | £15,250 | 6.0 |
| **Wrexham** | Wrexham University | £11,000 💰 | 6.0 |

---

## 💡 Why This Impresses AIMS Education

**This application demonstrates:**

1. ✅ **Technical Competence** - Professional React development
2. ✅ **Problem-Solving** - Identified application tracking pain point
3. ✅ **Entrepreneurial Thinking** - Built solution before being asked
4. ✅ **Initiative** - Went beyond typical student expectations
5. ✅ **Portfolio Quality** - Production-ready deliverable

**Message to AIMS:**  
*"This student didn't just fill forms. He built infrastructure to solve a real problem. If he can do this as a junior developer in Algeria, imagine what he'll create after studying Entrepreneurship & Innovation in the UK."*

---

## 🛠️ Customization

### Add New University
Edit `src/data/database.js`:
```javascript
{
  id: 11,
  name: "Your University",
  city: "City Name",
  specialty: "MSc Program",
  fees: "£15,000",
  ielts: "6.0",
  link: "https://university.ac.uk",
  status: "not-applied"
}
```

### Add New Document Type
Edit `DOCUMENT_TYPES` in `src/data/database.js`

### Change Colors/Design
Edit `src/styles/App.css`

---

## 📤 Deployment Options

### Option 1: Static Hosting (Easiest)
1. Run `npm run build`
2. Upload `dist/` folder to:
   - **Netlify** (drag & drop)
   - **Vercel** (GitHub integration)
   - **GitHub Pages**
   - **Cloudflare Pages**

### Option 2: Share as File
1. Run `npm run build`
2. Open `dist/index.html` in browser
3. Save as complete webpage
4. Send to AIMS Education

---

## 🔒 Data Privacy

- All data stored **locally in browser**
- No external servers or databases
- No data leaves your computer
- AIMS Education can only see data you share

---

## 📧 Contact

**Developer:** Said Abdelaziz  
**Email:** said.abd.el.aziz.cs@gmail.com  
**Portfolio:** https://abdelaziz-portfolio-vercel.vercel.app/  
**Agency:** AIMS Education (aimseducation.gh)

---

## 📜 License

MIT License - Free to use, modify, and distribute

---

## 🎯 Next Steps for You

1. ✅ Download all files
2. ✅ Run `npm install`
3. ✅ Test the application (`npm run dev`)
4. ✅ Update a few university statuses
5. ✅ Check off some documents
6. ✅ Add a communication log entry
7. ✅ Take screenshots
8. ✅ Send to AIMS Education with explanation
9. ✅ Await their amazed reaction 🚀

**You're not just a student applying to universities.**  
**You're an entrepreneur demonstrating value before arrival.**

Good luck! 🎓