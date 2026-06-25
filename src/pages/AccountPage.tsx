import { useState, useEffect } from 'react';
import { FileText, Shield, Bell, Moon, Sun } from 'lucide-react';
import { Card } from '../components/ui/card';

import { useAuth } from '../hooks/useAuth';
import { useJobs } from '../hooks/useJobs';
import { useTheme } from '../hooks/useTheme';
import { useSuppliers } from '../hooks/useSuppliers';

import { ProfileCard } from '../components/Account/ProfileCard';
import { StatsGrid } from '../components/Account/StatsGrid';
import { ActiveTenderCard } from '../components/Account/ActiveTenderCard';

export function AccountPage() {
  const { userProfile, logout } = useAuth();
  const { jobs, deleteJob } = useJobs();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { quotesCount } = useSuppliers();

  const [profile, setProfile] = useState({
    name: 'Alex Mercer',
    company: 'Pinnacle Commercial Builders',
    title: 'Director of Procurement',
    email: 'alex.mercer@pinnacle.com',
  });

  useEffect(() => {
    if (userProfile) {
      setProfile(prev => ({
        ...prev,
        name: userProfile.name || prev.name,
        email: userProfile.email || prev.email,
      }));
    }
  }, [userProfile]);

  const [notifications, setNotifications] = useState(true);

  const handleProfileSave = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        <div className="space-y-1 pb-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight">My Dashboard</h1>
          <p className="text-xs text-muted-foreground leading-normal">
            Monitor bids, track active quotes, and adjust preferences.
          </p>
        </div>

        {/* Profile Card */}
        <ProfileCard profile={profile} onSave={handleProfileSave} />

        {/* Stats Grid */}
        <StatsGrid postedJobsCount={jobs.length} quotesCount={quotesCount} />

        {/* Live Posted Tenders */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Active Public Tenders
          </span>

          {jobs.length === 0 ? (
            <div className="text-center py-6 px-4 border border-dashed border-muted rounded-xl bg-card">
              <span className="text-[11px] text-muted-foreground">You have not posted any tenders yet.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {jobs.map((job) => (
                <ActiveTenderCard key={job.id} job={job} onDelete={deleteJob} />
              ))}
            </div>
          )}
        </div>

        {/* Preferences List */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Preferences
          </span>
          
          <Card className="overflow-hidden divide-y divide-muted text-xs">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-500" />}
                <span>Interface Aesthetics</span>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-[10px] text-foreground font-bold border border-muted bg-muted/40 hover:bg-muted px-2.5 py-1.5 rounded-lg active-scale"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Bell className="w-4 h-4 text-[var(--brand-gold)]" />
                <span>Bid Sourcing Alerts</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg active-scale border ${
                  notifications 
                    ? 'text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/20' 
                    : 'text-muted-foreground bg-muted/40 border-muted'
                }`}
              >
                {notifications ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </Card>
        </div>

        {/* Log Out Section */}
        <div className="pt-2 pb-1">
          <button
            type="button"
            onClick={logout}
            className="w-full py-3 border border-red-200 dark:border-red-950/20 bg-red-50/20 dark:bg-red-950/5 hover:bg-red-50 dark:hover:bg-red-950/15 text-red-500 hover:text-red-600 dark:hover:text-red-400 text-xs font-bold rounded-xl transition active-scale flex items-center justify-center gap-2"
          >
            Log Out Account
          </button>
        </div>
      </div>
    </div>
  );
}
