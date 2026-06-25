import { useState, useEffect } from "react"
import { User, ShieldCheck, Building2 } from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"

interface ProfileData {
  name: string;
  company: string;
  title: string;
  email: string;
}

interface ProfileCardProps {
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
}

export function ProfileCard({ profile, onSave }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>({ ...profile });

  useEffect(() => {
    setEditForm({ ...profile });
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editForm);
    setIsEditing(false);
  };

  return (
    <Card className="p-4 space-y-4 shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-brand-gold-light flex items-center justify-center text-[var(--brand-gold)] border border-border shrink-0">
          <User className="w-6 h-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-1">
            {profile.name}
            <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
          </h3>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
            {profile.company} &bull; {profile.title}
          </p>
        </div>

        <button
          onClick={() => {
            setEditForm({ ...profile });
            setIsEditing(!isEditing);
          }}
          className="text-[10px] text-[var(--brand-gold)] font-bold bg-[var(--brand-gold-light)] px-2.5 py-1.5 rounded-lg active-scale"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 pt-3 border-t border-muted border-dashed animate-[fadeIn_0.25s_ease-out]"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-0.5">
                Full Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-2 py-1 text-xs border border-muted rounded bg-card text-foreground focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-muted-foreground uppercase mb-0.5">
                Company Name
              </label>
              <input
                type="text"
                value={editForm.company}
                onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                className="w-full px-2 py-1 text-xs border border-muted rounded bg-card text-foreground focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              size="sm"
              className="text-[10px] h-7 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white"
            >
              Save Changes
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}

export default ProfileCard;
