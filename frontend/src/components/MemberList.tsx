import type {Member} from "../types";

interface MemberListProps {
  members: Member[];
  onDelete: (id: number) => void;
}

function MemberList({ members, onDelete }: MemberListProps) {
  if (members.length === 0) {
    return <p>No members found. Add a member to get started!</p>;
  }

  return (
    <div className="member-list">
      {members.map((member) => (
        <div key={member.id} className="member-card">
          <div className="member-info">
            <h3>
              {member.first_name} {member.last_name}
            </h3>
            <p>
              📅 {new Date(member.birth_date).toLocaleDateString()}
            </p>
            <p>
              📍 {member.city}, {member.country}
            </p>
          </div>
          <button
            onClick={() => onDelete(member.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MemberList;
