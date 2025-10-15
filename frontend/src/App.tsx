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
        <h1>🎂 Birthday Manager</h1>
        <nav className="nav">
          <button
            className={currentPage === "members" ? "active" : ""}
            onClick={() => setCurrentPage("members")}
          >
            Members
          </button>
          <button
            className={currentPage === "birthdays" ? "active" : ""}
            onClick={() => setCurrentPage("birthdays")}
          >
            Upcoming Birthdays
          </button>
        </nav>
      </header>
      <main className="main">
        {currentPage === "members" && <MembersPage />}
        {currentPage === "birthdays" && <UpcomingBirthdaysPage />}
      </main>
    </div>
  );
}

export default App;
