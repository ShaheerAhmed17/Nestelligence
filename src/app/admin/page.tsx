import AdminDashboard from '@/components/admin/admin-dashboard';
import { Logo } from '@/components/logo';

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20 text-foreground">
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Logo />
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow p-4 md:p-8">
        <AdminDashboard />
      </main>
    </div>
  );
}
