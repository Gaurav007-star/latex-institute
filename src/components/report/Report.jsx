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
} from "lucide-react";

export default function Report() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* User Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>User Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Stat label="Total Users" value="39" icon={Users} />
          <Stat label="Active" value="34" icon={UserCheck} />
          <Stat label="Inactive" value="3" icon={UserX} />
          <Stat label="Pending Invites" value="5" icon={UserPlus} />
          <Stat label="Suspended" value="2" icon={Shield} />
        </CardContent>
      </Card>

      {/* Seat & License Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Seat & License Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Stat label="Total Seats" value="50" icon={CreditCard} />
          <Stat label="Seats Used" value="39" icon={Users} />
          <Stat label="Seats Available" value="11" icon={UserPlus} />
        </CardContent>
      </Card>

      {/* Activity & Limits Awareness */}
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Subscription Activity */}
          <div className="space-y-4 text-lg">
            <CardTitle className="font-semibold">
              Subscription Activity
            </CardTitle>

            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-center gap-3">
                <Clock size={18} />
                <span>
                  Subscription started on
                  <strong className="text-foreground"> Jan 12, 2024</strong>
                </span>
              </p>

              <p className="flex items-center gap-3">
                <Clock size={18} />
                <span>
                  Subscription ends on
                  <strong className="text-foreground"> Oct 1, 2024</strong>
                </span>
              </p>

              <p className="flex items-center gap-3">
                <Shield size={18} />
                <span>
                  Managed by
                  <strong className="text-foreground"> Institute Owner</strong>
                </span>
              </p>
            </div>
          </div>

          {/* Plan Actions */}
          <div className="flex flex-col justify-between rounded-lg border border-destructive bg-muted/30 p-4 text-lg">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2 font-semibold text-destructive">
                <AlertTriangle size={16} />
                Plan Actions
              </CardTitle>

              <p className="text-muted-foreground">
                You’re approaching your seat limit. Upgrade your plan to add
                more users without interruption.
              </p>
            </div>

            <div className="mt-4 w-full text-right">
              <Button variant="outline" size="lg">
                Request Upgrade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, icon }) {
  const Icon = icon;
  return (
    <div className="flex flex-col gap-10 rounded-2xl bg-white px-6 py-5 shadow-sm">
      {/* Label */}
      <p className="text-lg font-semibold text-muted-foreground">{label}</p>

      {/* Icon + Value */}
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center">
          <Icon className={`text-primary size-10`}/>
        </span>
        <p className="text-xl font-normal text-foreground">{value}</p>
      </div>
    </div>
  );
}
