'use client';

import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, startOfDay } from 'date-fns';
import { Loader2, AlertTriangle, Users, SheetIcon, Activity } from 'lucide-react';

interface Lead {
  Timestamp: string;
  Name: string;
  Email: string;
  Phone: string;
  Location: string;
  Budget: string;
  PropertyType: string;
}

// Function to process lead data for the chart
const processLeadDataForChart = (leads: Lead[]) => {
  if (!leads || leads.length === 0) return [];

  const leadsByDay = leads.reduce((acc, lead) => {
    try {
      // Handles potential invalid date strings gracefully
      const date = parseISO(lead.Timestamp);
      if (isNaN(date.getTime())) return acc;
      
      const day = format(startOfDay(date), 'MMM d');
      acc[day] = (acc[day] || 0) + 1;
    } catch (e) {
      console.error("Invalid timestamp for lead:", lead);
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(leadsByDay)
    .map(([name, leads]) => ({ name, leads }))
    .sort((a, b) => new Date(a.name) > new Date(b.name) ? -1 : 1).reverse(); // Show oldest first
};


export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [leadsResponse, analyticsResponse] = await Promise.all([
          axios.get<{ leads: Lead[], configured: boolean, error?: string }>('/api/get-leads'),
          axios.get<{ totalVisitors: number, configured: boolean }>('/api/analytics')
        ]);
        
        const configured = leadsResponse.data.configured && analyticsResponse.data.configured;
        setIsConfigured(configured);

        if (configured) {
          const cleanedLeads = leadsResponse.data.leads.map(lead => ({
            ...lead,
            Phone: lead.Phone ? String(lead.Phone).replace(/^'/, '') : '',
          }));
          setLeads(cleanedLeads);
          setTotalVisitors(analyticsResponse.data.totalVisitors);
        } else {
          setLeads([]);
          setTotalVisitors(0);
        }

      } catch (err: any) {
        const errorMessage = err.response?.data?.error || 'An unknown error occurred while fetching dashboard data. Check the server logs.';
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = useMemo(() => processLeadDataForChart(leads), [leads]);
  
  const conversionRate = useMemo(() => {
    if (totalVisitors === null || totalVisitors === 0 || leads.length === 0) {
      return 0;
    }
    return (leads.length / totalVisitors) * 100;
  }, [leads, totalVisitors]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Admin Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive">
          <CardHeader className="flex flex-row items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <div>
              <CardTitle className="text-destructive">An Error Occurred</CardTitle>
              <CardDescription className="text-destructive/80">{error}</CardDescription>
            </div>
          </CardHeader>
      </Card>
    );
  }

  if (!isConfigured) {
    return (
      <Card className="bg-yellow-900/20 border-yellow-600">
          <CardHeader className="flex flex-row items-start gap-4">
            <SheetIcon className="w-8 h-8 text-yellow-500 mt-1" />
            <div>
              <CardTitle className="text-yellow-400">Google Sheets Integration Needed</CardTitle>
              <CardDescription className="text-yellow-500/80 mt-2">
                Your dashboard is working, but it can't display leads or analytics because it's not connected to Google Sheets.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-yellow-400/90 space-y-4">
              <p>To see your leads and analytics, you need to:</p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>
                  <strong>Create a Google Service Account:</strong> Go to the Google Cloud Console, create a service account for your project, and download its JSON key file.
                </li>
                <li>
                  <strong>Share Your Google Sheet:</strong> Open your leads spreadsheet and share it with the service account's email address (found in the JSON key), giving it "Editor" permissions.
                </li>
                <li>
                  <strong>Update Environment Variables:</strong> Add the following to your <code className="bg-yellow-900/50 p-1 rounded font-mono">.env</code> file:
                </li>
              </ol>
              <pre className="bg-black/50 p-4 rounded-md text-xs overflow-x-auto font-mono">
                {`GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL="your-service-account-email@...iam.gserviceaccount.com"\nGOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...your-private-key...\\n-----END PRIVATE KEY-----\\n"\nGOOGLE_SHEET_ID="your-google-sheet-id"`}
              </pre>
               <p className="pt-2">After updating the <code className="bg-yellow-900/50 p-1 rounded font-mono">.env</code> file, you'll need to restart the application for the changes to take effect.</p>
            </div>
          </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground">All captured leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{conversionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Based on {totalVisitors ?? 'N/A'} visitors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Leads Over Time</CardTitle>
            <CardDescription>Daily lead submissions.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  cursor={{fill: 'hsl(var(--accent))', opacity: 0.5}}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Your {Math.min(5, leads.length)} most recent lead submissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.Email} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{lead.Name}</p>
                    <p className="text-sm text-muted-foreground">{lead.Email}</p>
                  </div>
                  <div className="ml-auto font-medium">{lead.Budget}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

       {/* Full leads table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>A complete list of all captured leads.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Property Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <TableRow key={lead.Timestamp + lead.Email}>
                      <TableCell>{format(parseISO(lead.Timestamp), 'PPp')}</TableCell>
                      <TableCell className="font-medium">{lead.Name}</TableCell>
                      <TableCell>{lead.Email}</TableCell>
                      <TableCell>{lead.Phone}</TableCell>
                      <TableCell>{lead.Location}</TableCell>
                      <TableCell>{lead.Budget}</TableCell>
                      <TableCell>{lead.PropertyType}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No leads have been submitted yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
