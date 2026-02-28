import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Shield,
  AlertTriangle,
  CreditCard,
  Clock,
  CalendarDays,
  UserCog
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Link } from "react-router";

export default function Report() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between space-y-2">
        {/* <h2 className="text-3xl font-medium text-foreground">Dashboard</h2> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="space-y-6">
        {/* Top Level Stats */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total License" value="50" description="Maximum capacity in current plan" icon={CreditCard} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
          <StatCard title="License Used" value="39" description="78% of total License utilized" icon={Users} iconColor="text-amber-500" iconBg="bg-amber-500/10" />
          <StatCard title="License Available" value="11" description="Remaining License to allocate" icon={UserPlus} iconColor="text-emerald-500" iconBg="bg-emerald-500/10" />

        </div>

        {/* User Status Details */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="39" description="+2 since last month" icon={Users} iconColor="text-purple-500" iconBg="bg-purple-500/10" />
          <StatCard title="Active Users" value="34" description="Currently active on platform" icon={UserCheck} iconColor="text-emerald-500" iconBg="bg-emerald-500/10" />
          <StatCard title="Inactive Users" value="3" description="Have not logged in recently" icon={UserX} iconColor="text-zinc-500" iconBg="bg-zinc-500/10" />
          <StatCard title="Pending Invites" value="5" description="Awaiting user acceptance" icon={UserPlus} iconColor="text-blue-500" iconBg="bg-blue-500/10" />
        </div>

        {/* Activity & Limits Awareness */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 lg:col-span-4 shadow-sm border-border/50">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Subscription Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full items-center justify-center bg-blue-500/10">
                    <CalendarDays className="h-6 w-6 text-blue-500" />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-base font-medium leading-none">Subscription started</p>
                    <p className="text-sm text-muted-foreground mt-1">Jan 12, 2024</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full items-center justify-center bg-purple-500/10">
                    <Clock className="h-6 w-6 text-purple-500" />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-base font-medium leading-none">Subscription ends</p>
                    <p className="text-sm text-muted-foreground mt-1">Oct 1, 2024</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full items-center justify-center bg-emerald-500/10">
                    <UserCog className="h-6 w-6 text-emerald-500" />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-base font-medium leading-none">Managed by</p>
                    <p className="text-sm text-muted-foreground mt-1">Institute Owner</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 lg:col-span-3 flex flex-col justify-between border-destructive border-2 shadow-sm bg-destructive/5 dark:bg-destructive/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold text-destructive">
                Plan Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 flex-1 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-full shrink-0">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  You’re approaching your seat limit. Upgrade your plan to add
                  more users without interruption and unlock premium tracking features.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <Button variant="destructive" size="lg" className="w-full text-base font-semibold h-14">
                  Request Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, description, icon: Icon, iconColor = "text-muted-foreground", iconBg = "bg-transparent" }) {
  return (
    <Card className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {Icon && (
          <div className={`p-2 rounded-full ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-sm text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
