import { useState, useEffect } from "react";
import type {Member, MemberCreate} from "../types";
import { api } from "../services/api";
import MemberForm from "../components/MemberForm";
import MemberList from "../components/MemberList";

function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await api.getAllMembers();
      setMembers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch members");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleCreateMember = async (member: MemberCreate) => {
    try {
      await api.createMember(member);
      await fetchMembers();
      setShowForm(false);
    } catch (err) {
      alert("Failed to create member");
      console.error(err);
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      await api.deleteMember(id);
      await fetchMembers();
    } catch (err) {
      alert("Failed to delete member");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Members</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Member"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <MemberForm onSubmit={handleCreateMember} />
        </div>
      )}

      <MemberList members={members} onDelete={handleDeleteMember} />
    </div>
  );
}

export default MembersPage;
