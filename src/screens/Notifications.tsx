import * as React from 'react';
import { TopAppBar } from '../components/ui/TopAppBar';
import { Card } from '../components/ui/Card';
import { Bell, Briefcase, MessageSquare, Star, CheckCircle2, ChevronRight } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const notifications = [
    {
      id: '1',
      type: 'application',
      title: 'Application Viewed',
      desc: 'Google viewed your application for Senior Android Developer.',
      time: '2 hours ago',
      icon: Briefcase,
      color: 'bg-primary/10 text-primary',
      unread: true,
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      desc: 'Recruiter from Shopee sent you a message regarding your application.',
      time: '5 hours ago',
      icon: MessageSquare,
      color: 'bg-secondary/10 text-secondary',
      unread: true,
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'New Job for You',
      desc: 'Based on your profile, you might like "UI/UX Designer" at VNG.',
      time: '1 day ago',
      icon: Star,
      color: 'bg-tertiary/10 text-tertiary',
      unread: false,
    },
    {
      id: '4',
      type: 'system',
      title: 'Verification Success',
      desc: 'Your identity has been successfully verified. You can now apply for all jobs.',
      time: '2 days ago',
      icon: CheckCircle2,
      color: 'bg-success/10 text-success',
      unread: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <TopAppBar title="Notifications" onBack={onBack} />

      <div className="px-4 py-2 space-y-3">
        <div className="flex justify-between items-center px-2 mb-2">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Recent</span>
          <button className="text-xs font-bold text-primary">Mark all as read</button>
        </div>

        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <Card 
              key={notif.id} 
              variant={notif.unread ? 'elevated' : 'outlined'} 
              className={`p-4 flex gap-4 cursor-pointer hover:bg-surface-variant/50 transition-colors ${notif.unread ? 'border-l-4 border-l-primary' : 'border-outline/10'}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold truncate ${notif.unread ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-on-surface-variant opacity-60 whitespace-nowrap ml-2">{notif.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {notif.desc}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant opacity-20 self-center" />
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col items-center justify-center py-12 opacity-30">
        <Bell className="w-12 h-12 mb-2" />
        <p className="text-sm font-medium">No more notifications</p>
      </div>
    </div>
  );
};
