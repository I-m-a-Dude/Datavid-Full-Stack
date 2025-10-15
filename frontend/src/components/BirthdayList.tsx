import { useState } from "react";
import type {MemberWithUpcomingBirthday, AIMessageResponse} from "../types";
import { api } from "../services/api";

interface BirthdayListProps {
  birthdays: MemberWithUpcomingBirthday[];
}

function BirthdayList({ birthdays }: BirthdayListProps) {
  const [generatingFor, setGeneratingFor] = useState<number | null>(null);
  const [aiResponse, setAiResponse] = useState<AIMessageResponse | null>(null);
  const [showExplainability, setShowExplainability] = useState(false);

  const handleGenerateMessage = async (
    memberId: number,
    tone: "friendly" | "formal",
    localize: boolean
  ) => {
    try {
      setGeneratingFor(memberId);
      setAiResponse(null);
      const response = await api.generateBirthdayMessage({
        member_id: memberId,
        tone,
        localize_language: localize,
      });
      setAiResponse(response);
    } catch (err) {
      alert("Failed to generate message");
      console.error(err);
    } finally {
      setGeneratingFor(null);
    }
  };

  if (birthdays.length === 0) {
    return <p>No upcoming birthdays!</p>;
  }

  return (
    <div className="birthday-list">
      {birthdays.map((member) => (
        <div key={member.id} className="birthday-card">
          <div className="birthday-info">
            <h3>
              {member.first_name} {member.last_name}
            </h3>
            <p>
              🎂 Turning {member.age_turning} years old
            </p>
            <p>
              📅 {new Date(member.birth_date).toLocaleDateString()}
            </p>
            <p>
              📍 {member.city}, {member.country}
            </p>
            <p className="days-until">
              {member.days_until_birthday === 0
                ? "🎉 Birthday is TODAY!"
                : member.days_until_birthday === 1
                ? "🎈 Birthday is TOMORROW!"
                : `⏰ ${member.days_until_birthday} days until birthday`}
            </p>
          </div>

          <div className="ai-section">
            <div className="ai-buttons">
              <button
                onClick={() => handleGenerateMessage(member.id, "friendly", false)}
                disabled={generatingFor === member.id}
              >
                Generate Friendly Message
              </button>
              <button
                onClick={() => handleGenerateMessage(member.id, "formal", false)}
                disabled={generatingFor === member.id}
              >
                Generate Formal Message
              </button>
              <button
                onClick={() => handleGenerateMessage(member.id, "friendly", true)}
                disabled={generatingFor === member.id}
              >
                Generate Localized Message
              </button>
            </div>

            {generatingFor === member.id && (
              <p className="generating">Generating message...</p>
            )}

            {aiResponse && !generatingFor && (
              <div className="ai-result">
                <div className="message-box">
                  <strong>Generated Message:</strong>
                  <p>{aiResponse.message}</p>
                </div>
                <button
                  onClick={() => setShowExplainability(!showExplainability)}
                  className="explainability-toggle"
                >
                  {showExplainability ? "Hide" : "Show"} Explainability
                </button>
                {showExplainability && (
                  <div className="explainability">
                    <p>
                      <strong>Model:</strong> {aiResponse.explainability.model_name}
                    </p>
                    <p>
                      <strong>Parameters:</strong>{" "}
                      {JSON.stringify(aiResponse.explainability.key_parameters)}
                    </p>
                    <p>
                      <strong>Method:</strong>{" "}
                      {aiResponse.explainability.prompt_method}
                    </p>
                    <p>
                      <strong>Rationale:</strong>{" "}
                      {aiResponse.explainability.rationale}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BirthdayList;
