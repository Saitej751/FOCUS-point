import { useEffect, useRef, useState } from "react";
import './App.css';
import CalendarComponent from "./CalendarComponent";
import FocusBot from "./FocusBot";
import NotesApp from "./NotesApp";
import ChatBotFull from "./components/ChatBotFull";





//  Fixed Notifications Box component
function NotificationsBox({ notifications }) {
  const [open, setOpen] = useState(true);
  if (!notifications || notifications.length === 0) return null;
  return (
    <div className="notifications-box" style={{ padding: "15px", background: "#faf9f6ff", borderRadius: "8px" }}>
      <div className="notifications-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3> Notifications</h3>
        <button 
          onClick={() => setOpen(!open)} 
          className="toggle-btn"
          style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
        >
          {open ? "˄" : "˅"}
        </button>
      </div>
      {open && (
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
function App() {
  const contentContainerRef = useRef(null);
  const [step, setStep] = useState("auth");
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  // Ref to container for scrolling
  const contentRef = useRef(null);
  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  // Exams and sub-options data
  const exams = {
    "Civil Services": ["UPSC CSE", "State PSCs"],
    "Banking": ["IBPS PO", "SBI PO", "RBI Grade B"],
    "SSC": ["SSC CGL", "SSC CHSL"],
    "Defense": ["NDA", "CDS"],
    "PSU": ["GATE", "IES"],
    "Teaching": ["CTET", "State TETs"],
    "Railways/Insurance": ["RRB Exams", "LIC AAO", "FCI"],
    "GATE": ["DA", "CS", "Mech", "Civil", "EEE", "ECE", "Mathematics"],
    "Placement Training": ["Aptitude", "Reasoning", "Group Discussion", "HR Interview"],
    "Engineering Courses": {
      "Computer Science": ["ML", "DA", "IT"],
      "ECE": ["Digital", "Analog"],
      "EEE": ["Power", "Control"],
      "MECH": ["Thermo", "Design"],
      "CIVIL": ["Structure", "Hydraulics"],
      "CHEMICAL": ["Process", "Material"],
      "PETROLEUM": ["Refining", "Exploration"]
    }
  };
  // Notification messages per exam (trimmed for brevity here but you keep full list)
  const notificationsData = {
     "UPSC CSE": [
      "UPSC CSE 2025 Application Open",
      "Last Date: May 20, 2025",
      "UPSC CSE 2025 Exam Date Announced",
      "UPSC CSE 2025 Admit Card Released",
      "UPSC CSE 2025 Syllabus Updated",
      "UPSC CSE 2025 Prelims Answer Key Out",
      "UPSC CSE 2025 Mains Result Declared",
      "UPSC CSE 2025 Interview Schedule Released",
      "UPSC CSE 2025 Previous Year Papers Available",
      "UPSC CSE 2025 Cut Offs Released"
    ],
    "State PSCs": [
      "APPSC Group 1 Notification Released",
      "TSPSC 2025 Schedule Announced",
      "APPSC Group 2 Notification Open",
      "TSPSC Group 1 Exam Dates Released",
      "State PSCs Syllabus Updated",
      "APPSC Admit Cards Released",
      "TSPSC Result Declared",
      "State PSCs Exam Guidelines Published",
      "APPSC Previous Year Papers Available",
      "TSPSC Cut Offs Announced"
    ],
    "IBPS PO": [
      "IBPS PO Prelims Admit Card Out",
      "Exam on June 10, 2025",
      "IBPS PO Prelims Result Declared",
      "IBPS PO Mains Registration Open",
      "IBPS PO Mains Admit Card Released",
      "IBPS PO Mains Exam Date Announced",
      "IBPS PO Mains Result Out",
      "IBPS PO Interview Call Released",
      "IBPS PO Final Result Declared",
      "IBPS PO Syllabus & Exam Pattern Updated"
    ],
    "SBI PO": [
      "SBI PO Mains Result Declared",
      "SBI PO Prelims Result Out",
      "SBI PO Admit Card Released",
      "SBI PO 2025 Exam Date Announced",
      "SBI PO Syllabus Updated",
      "SBI PO Interview Schedule Released",
      "SBI PO Final Result Declared",
      "SBI PO Previous Year Papers Available",
      "SBI PO Cut Offs Released",
      "SBI PO Preparation Tips Published"
    ],
    "RBI Grade B": [
      "RBI Grade B Notification Released",
      "RBI Grade B Online Form Open",
      "RBI Grade B Exam Date Announced",
      "RBI Grade B Admit Card Released",
      "RBI Grade B Prelims Result Declared",
      "RBI Grade B Mains Exam Date Announced",
      "RBI Grade B Mains Result Out",
      "RBI Grade B Interview Call Released",
      "RBI Grade B Final Result Declared",
      "RBI Grade B Previous Year Papers Available"
    ],
    "SSC CGL": [
      "SSC CGL 2025 Application Open",
      "Tier-I Exam in April 2025",
      "SSC CGL Admit Card Released",
      "SSC CGL Tier-I Result Declared",
      "SSC CGL Tier-II Exam Date Announced",
      "SSC CGL Tier-II Admit Card Released",
      "SSC CGL Tier-II Result Out",
      "SSC CGL Tier-III Exam Date Announced",
      "SSC CGL Final Result Declared",
      "SSC CGL Cut Offs Published"
    ],
    "SSC CHSL": [
      "SSC CHSL 2025 Admit Card Released",
      "SSC CHSL Application Open",
      "SSC CHSL Exam Date Announced",
      "SSC CHSL Tier-I Result Declared",
      "SSC CHSL Tier-II Exam Schedule Out",
      "SSC CHSL Tier-II Result Released",
      "SSC CHSL Skill Test Date Announced",
      "SSC CHSL Final Result Declared",
      "SSC CHSL Cut Offs Released",
      "SSC CHSL Previous Year Papers Available"
    ],
    "NDA": [
      "NDA 2025 Registration Starts Soon",
      "NDA 2025 Notification Released",
      "NDA 2025 Exam Date Announced",
      "NDA 2025 Admit Card Released",
      "NDA 2025 Syllabus Updated",
      "NDA 2025 Answer Key Published",
      "NDA 2025 Result Declared",
      "NDA 2025 Merit List Released",
      "NDA 2025 Interview Schedule Published",
      "NDA 2025 Previous Papers Available"
    ],
    "CDS": [
      "CDS 2025 Exam Date Announced",
      "CDS 2025 Notification Released",
      "CDS 2025 Application Portal Open",
      "CDS 2025 Admit Card Released",
      "CDS 2025 Syllabus Updated",
      "CDS 2025 Prelims Result Declared",
      "CDS 2025 Mains Exam Schedule Out",
      "CDS 2025 Final Result Declared",
      "CDS 2025 Merit List Published",
      "CDS 2025 Previous Papers Available"
    ],
    "GATE": [
      "GATE 2026 Application Portal Open" ,
      "GATE 2026 Exam Dates Announced",
      "GATE 2026 Admit Card Released",
      "GATE 2026 Syllabus Updated",
      "GATE 2026 Mock Test Available",
      "GATE 2026 Answer Key Released",
      "GATE 2026 Result Declared",
      "GATE 2026 Score Card Available",
      "GATE 2026 Cut Offs Published",
      "GATE 2026 Preparation Tips Shared"
    ],
    "IES": [
      "IES 2025 Exam Dates Released",
      "IES 2025 Application Open",
      "IES 2025 Admit Card Released",
      "IES 2025 Syllabus Updated",
      "IES 2025 Prelims Result Declared",
      "IES 2025 Mains Exam Date Announced",
      "IES 2025 Mains Result Out",
      "IES 2025 Interview Schedule Released",
      "IES 2025 Final Result Declared",
      "IES 2025 Previous Papers Available"
    ],
    "CTET": [
      "CTET 2025 Online Form Open",
      "CTET 2025 Exam Date Announced",
      "CTET 2025 Admit Card Released",
      "CTET 2025 Syllabus Updated",
      "CTET 2025 Answer Key Published",
      "CTET 2025 Result Declared",
      "CTET 2025 Score Card Available",
      "CTET 2025 Re-Exam Notification Released",
      "CTET 2025 Cut Offs Announced",
      "CTET 2025 Preparation Tips Shared"
    ],
    "State TETs": [
      "AP TET 2025 Notification Out",
      "AP TET 2025 Application Open",
      "AP TET 2025 Exam Date Announced",
      "AP TET 2025 Admit Card Released",
      "AP TET 2025 Syllabus Updated",
      "AP TET 2025 Result Declared",
      "TS TET 2025 Notification Released",
      "TS TET 2025 Exam Date Announced",
      "TS TET 2025 Admit Card Released",
      "State TETs Previous Papers Available"
    ],
    "RRB Exams": [
      "RRB JE 2025 Notification Released",
      "RRB JE 2025 Application Open",
      "RRB JE 2025 Exam Date Announced",
      "RRB JE 2025 Admit Card Released",
      "RRB JE 2025 Result Declared",
      "RRB NTPC 2025 Notification Out",
      "RRB NTPC 2025 Exam Schedule Released",
      "RRB NTPC 2025 Admit Card Released",
      "RRB NTPC 2025 Result Declared",
      "RRB Exams Preparation Tips Shared"
    ],
    "LIC AAO": [
      "LIC AAO 2025 Prelims Results Out",
      "LIC AAO 2025 Notification Released",
      "LIC AAO 2025 Online Form Open",
      "LIC AAO 2025 Exam Date Announced",
      "LIC AAO 2025 Admit Card Released",
      "LIC AAO 2025 Mains Result Declared",
      "LIC AAO 2025 Interview Schedule Out",
      "LIC AAO 2025 Final Result Declared",
      "LIC AAO 2025 Cut Offs Published",
      "LIC AAO 2025 Previous Papers Available"
    ],
    "FCI Exams": [
      "FCI 2025 Assistant Grade 3 Notification Open",
      "FCI 2025 Online Form Available",
      "FCI 2025 Exam Date Announced",
      "FCI 2025 Admit Card Released",
      "FCI 2025 Prelims Result Declared",
      "FCI 2025 Mains Exam Date Announced",
      "FCI 2025 Mains Result Out",
      "FCI 2025 Interview Call Released",
      "FCI 2025 Final Result Declared",
      "FCI 2025 Previous Papers Available"
    ]
  };
  const calendarEvents = {
 "UPSC CSE": [
      { title: "UPSC Prelims", start: "2025-06-01" },
      { title: "UPSC Mains", start: "2025-09-15" }
    ],
    "State PSCs": [
      { title: "APPSC Prelims", start: "2025-07-05" },
      { title: "TSPSC Mains", start: "2025-08-12" }
    ],
    "IBPS PO": [
      { title: "IBPS PO Prelims", start: "2025-06-10" },
      { title: "IBPS PO Mains", start: "2025-07-20" }
    ],
    "SSC CGL": [
      { title: "SSC CGL Tier-I", start: "2025-04-12" }
    ],
    "SSC CHSL": [
      { title: "SSC CHSL Tier-I", start: "2025-05-18" }
    ],
    "NDA": [
      { title: "NDA Written Exam", start: "2025-04-20" }
    ],
    "CDS": [
      { title: "CDS Written Exam", start: "2025-07-01" }
    ],
    "GATE": [
      { title: "GATE Exam", start: "2026-02-01" }
    ],
    "IES": [
      { title: "IES Prelims", start: "2025-06-25" }
    ],
  };


  const resources = ["NOTES", "STUDY MATERIALS", "CALENDAR", "CHATBOT"];
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (isSignUp) {
      if (storedUsers.find(u => u.username === form.username)) {
        alert("Username already exists!");
        return;
      }
      storedUsers.push(form);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      alert("Account created! Please login.");
      setIsSignUp(false);
      setForm({ username: "", password: "" });
    } else {
      const user = storedUsers.find(u => u.username === form.username && u.password === form.password);
      if (user) {
        setStep("verified");
      } else {
        alert("Invalid credentials!");
      }
    }
  };
  const renderSubOptions = (option) => {
    const data = exams[option];
    if (!data) return null;
    if (Array.isArray(data)) {
      return data.map(sub => (
        <li key={sub}>
          <button onClick={() => { handleSelectSubOption(sub); }} className="link-btn">
            {sub.toUpperCase()}
          </button>
        </li>
      ));
    } else if (typeof data === "object") {
      return Object.keys(data).map(cat => (
        <li key={cat}>
          <strong>{cat}</strong>
          <ul>
            {data[cat].map(sub => (
              <li key={sub}>
                <button onClick={() => { handleSelectSubOption(sub); }} className="link-btn">
                  {sub.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </li>
      ));
    }
  };
  // Option handlers with scroll
  const handleActiveOption = (option) => {
    setActiveOption(option);
    setSelectedSubOption(null);
    setSelectedResource(null);
    scrollToTop();
  };
  const handleSelectSubOption = (subOption) => {
    setSelectedSubOption(subOption);
    setSelectedResource(null);
    scrollToTop();
  };
  const handleSelectResource = (resource) => {
    setSelectedResource(resource);
    scrollToTop();
  };
  // ⏳ Splash screen redirect after 5 seconds
  useEffect(() => {
    if (step === "splash") {
      const timer = setTimeout(() => {
        setStep("homepage");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);
  return (
    <div className="App">
      {step === "auth" && (
        <div className="login-container">
          <div className="login-box">
            <h2>{isSignUp ? "Sign Up" : "Login to Focus Point"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Username" name="username" value={form.username} onChange={handleChange} required />
              <input type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
              <div className="login-buttons">
                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
              </div>
            </form>
            <p
              style={{ marginTop: "15px", cursor: "pointer", color: "#2563eb" }}
              onClick={() => {
                setIsSignUp(!isSignUp);
                setForm({ username: "", password: "" });
              }}
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </p>
          </div>
        </div>
      )}
      {step === "verified" && (
        <div className="welcome-screen">
          Account Verified!
          <button
            style={{ marginTop: "30px", padding: "12px 20px", borderRadius: "8px", border: "none", background: "#2563eb", color: "white" }}
            onClick={() => setStep("splash")}
          >
            Continue
          </button>
        </div>
      )}
      {step === "splash" && (
        <div className="welcome-screen">
           𝐹𝑜𝒸𝓊𝓈-𝒫𝑜𝒾𝓃𝓉 𝒲𝑒𝓁𝒸𝑜𝓂𝑒𝓈 𝒴𝑜𝓊
          <div className="loader"></div>
          <p style={{ marginTop: "20px", fontSize: "2rem" }}>ℛ𝑒𝑑𝑖𝑟𝑒𝑐𝑡𝑖𝑛𝑔 𝑡𝑜 𝐻𝑜𝑚𝑒𝑝𝑎𝑔𝑒…</p>
        </div>
      )}
      {step === "homepage" && (
        <div className="App">
          <header className="navbar">
            <h1 className="logo">{activeOption ? `Focus Point ${activeOption}` : "Focus Point"}</h1>
            <nav>
              <ul style={{ display: "flex", gap: "20px" }}>
                <li><a href="#about">About</a></li>
                <li><a href="#profile">Profile</a></li>
                <li><a href="#bookmarks">Bookmarks</a></li>
                <li><a href="#settings">Settings</a></li>
                <li>
                  <button
                    onClick={() => {
                      setStep("auth");
                      setActiveOption(null);
                      setSelectedSubOption(null);
                      setSelectedResource(null);
                    }}
                    className="link-btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </header>
          <div className="top-section" ref={contentContainerRef}>
            {!activeOption && (
              <>
                <aside className="exams-sidebar">
                  <h2> Exam Sections</h2>
                  <ul>
                    {Object.keys(exams).map((exam) => (
                      <li key={exam}>
                        <button onClick={() => handleActiveOption(exam)} className="link-btn">
                          {exam}
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>
                <div className="gateway-column">
                  <h2>NOW OR NEVER</h2>
                  <p>
                    "Gateway to Success is your personalized learning companion designed to make preparation smarter, not harder. With interactive study materials, AI-powered chatbots, personalized notes, and an integrated exam calendar, it helps students stay organized, motivated, and exam-ready. 
                    Whether it’s doubt-solving, tracking progress, or accessing curated resources, this platform ensures that every learner has the right tools to achieve their academic goals and unlock their true potential."
                  </p>
                </div>
              </>
            )}
            {activeOption && !selectedSubOption && (
              <div className="gateway-column expanded">
                <h2>Focus Point {activeOption}</h2>
                <ul className="sub-options">{renderSubOptions(activeOption)}</ul>
                <button
                  style={{ marginTop: "20px", padding: "10px 16px", cursor: "pointer", borderRadius: "8px", border: "none", background: "#1e293b", color: "white" }}
                  onClick={() => {
                    setActiveOption(null);
                    scrollToTop();
                  }}
                >
                  Back
                </button>
              </div>
            )}
            {selectedSubOption && (
              <div className="gateway-column expanded">
                <h2>{selectedSubOption.toUpperCase()} RESOURCES</h2>
                <ul className="sub-options">
                  {resources.map((res) => (
                    <li key={res}>
                      <button onClick={() => handleSelectResource(res)} className="link-btn">
                        {res}
                      </button>
                    </li>
                  ))}
                </ul>
                {selectedResource && (
                  <div className="resource-section" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                    {selectedResource === "CALENDAR" && (
                      <div style={{ flex: 1 }}>
                        <CalendarComponent events={calendarEvents[selectedSubOption] || []} />
                      </div>
                    )}
                    {selectedResource === "NOTES" && (
                      <div style={{ flex: 1 }}>
                        <NotesApp />
                      </div>
                    )}
                     {selectedResource === "CHATBOT" && (
  <div style={{ flex: 1 }}>
    <ChatBotFull />
  </div>
)}


                    <div style={{ flex: 1 }}>
                      <NotificationsBox notifications={notificationsData[selectedSubOption]} />
                    </div>
                  </div>
                )}
                {selectedResource && (
                  <div className="resource-description" style={{ marginTop: "20px", padding: "15px", background: "#021222ff", borderRadius: "8px", color: "white" }}>
                    {selectedResource === "NOTES" && <p> Personalized and concise notes curated for each subject. Helps you revise faster and focus on the most important concepts without distractions for {selectedSubOption}.</p>}
                    {selectedResource === "STUDY MATERIALS" && <p> Comprehensive resources including books, PDFs, videos, and practice sets. Designed to give in-depth coverage of every topic for strong preparation.</p>}
                    {selectedResource === "CALENDAR" && <p> Smart exam calendar that keeps track of important dates, deadlines, and schedules. Helps you plan your preparation effectively and never miss an event for {selectedSubOption}.</p>}
                    {selectedResource === "CHATBOT" && <p> Your AI-powered study assistant! Instantly get answers to doubts, guidance on tough concepts, and suggestions for study strategies 24/7 for {selectedSubOption}.</p>}
                  </div>
                )}
                <button
                  style={{ marginTop: "20px", padding: "10px 16px", cursor: "pointer", borderRadius: "8px", border: "none", background: "#1e293b", color: "white" }}
                  onClick={() => {
                    setSelectedSubOption(null);
                    setSelectedResource(null);
                    scrollToTop();
                  }}
                >
                  Back
                </button>
              </div>
            )}
          </div>
      {/*  New Footer */}
<footer className="footer">
  <div className="grid">

    {/* Grid Layout for Footer Sections */}
    <div className="grid"></div>

    {/* Company Section */}
    <div>
      <h3 className="text-white font-bold text-lg mb-3"> Company</h3>
      <ul className="space-y-2">
        <li>About Us</li>
        <li>Careers</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
        <li>Advertise with Us</li>
      </ul>
    </div>

    {/* Explore Section */}
    <div>
      <h3 className="text-white font-bold text-lg mb-3"> Explore</h3>
      <ul className="space-y-2">
        <li>Notes</li>
        <li>Calendar</li>
        <li>Study Materials</li>
        <li>Chatbot</li>
        <li>Programming Languages</li>
        <li>AI & Data Science</li>
        <li>GATE Prep</li>
      </ul>
    </div>

    {/* Connect Section */}
    <div>
      <h3 className="text-white font-bold text-lg mb-3"> Connect</h3>
      <ul className="space-y-2">
        <li>Community</li>
        <li>Blogs</li>
        <li>Videos</li>
        <li>Discussion Forum</li>
        <li>
          <a href="https://play.google.com/" target="_blank" rel="noreferrer">
            📱 Focus Point App (Play Store)
          </a>
        </li>
        <li>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer">
             Focus Point App (App Store)
          </a>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
    © {new Date().getFullYear()} Focus Point. All Rights Reserved.
  </div>
</footer>

{/* Added FocusBot component (no other changes) */}
<FocusBot />

</div>
)}
</div>
);
}
export default App;
