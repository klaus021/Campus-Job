import { useStore } from './store';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { GigsPage } from './components/GigsPage';
import { GigDetailPage } from './components/GigDetailPage';
import { JobsPage } from './components/JobsPage';
import { JobDetailPage } from './components/JobDetailPage';
import { LoginPage, RegisterPage } from './components/AuthPages';
import { MessagesPage } from './components/MessagesPage';
import { DashboardPage } from './components/DashboardPage';
import { ProfilePage } from './components/ProfilePage';
import { EditProfilePage } from './components/EditProfilePage';
import { OrdersPage } from './components/OrdersPage';
import { NotificationsPage } from './components/NotificationsPage';
import { CreateGigPage, CreateJobPage } from './components/CreatePages';
import { PaymentsPage } from './components/PaymentsPage';

function PageContent() {
  const { currentPage } = useStore();

  switch (currentPage) {
    case 'home': return <HomePage />;
    case 'gigs': return <GigsPage />;
    case 'gig-detail': return <GigDetailPage />;
    case 'jobs': return <JobsPage />;
    case 'job-detail': return <JobDetailPage />;
    case 'login': return <LoginPage />;
    case 'register': return <RegisterPage />;
    case 'messages': return <MessagesPage />;
    case 'dashboard': return <DashboardPage />;
    case 'profile': return <ProfilePage />;
    case 'edit-profile': return <EditProfilePage />;
    case 'orders': return <OrdersPage />;
    case 'notifications': return <NotificationsPage />;
    case 'create-gig': return <CreateGigPage />;
    case 'create-job': return <CreateJobPage />;
    case 'payments': return <PaymentsPage />;
    default: return <HomePage />;
  }
}

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageContent />
    </div>
  );
}
