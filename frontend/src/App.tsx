import { useState } from "react";
import MembersPage from "./pages/MembersPage";
import UpcomingBirthdaysPage from "./pages/UpcomingBirthdaysPage";
import "./App.css";

type Page = "members" | "birthdays";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("members");

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="#171717"/>
                <path d="M16 8L18 14H22L18.5 17L20 23L16 19.5L12 23L13.5 17L10 14H14L16 8Z" fill="#FBBF24"/>
                <circle cx="16" cy="24" r="1.5" fill="#FBBF24"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>Birthday Manager</h1>
              <p className="tagline">Never miss a celebration</p>
            </div>
          </div>
          <nav className="nav">
            <button
              className={currentPage === "members" ? "active" : ""}
              onClick={() => setCurrentPage("members")}
            >
              <span className="nav-icon">👥</span>
              Members
            </button>
            <button
              className={currentPage === "birthdays" ? "active" : ""}
              onClick={() => setCurrentPage("birthdays")}
            >
              <span className="nav-icon">🎂</span>
              Upcoming
            </button>
          </nav>
        </div>
      </header>
      <main className="main">
        {currentPage === "members" && <MembersPage />}
        {currentPage === "birthdays" && <UpcomingBirthdaysPage />}
      </main>
    </div>
  );
}

export default App;