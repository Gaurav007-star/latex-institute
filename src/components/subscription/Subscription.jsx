import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Progress } from "../ui/progress";
import InvoiceTable from "./InvoiveTable";


const Subscription = () => {
  return (
    <div className="w-full min-h-screen bg-background p-6 space-y-6">
      {/* ===================== SUBSCRIPTION SUMMARY ===================== */}
      <Card className="rounded-2xl">
        <CardHeader
          className={`w-full h-max flex items-center justify-between`}
        >
          <div className="left-section w-max">
            <CardTitle className="text-2xl font-semibold">
              Subscriptions and add-ons
            </CardTitle>
            {/* <span className="text-primary">Manage your subscription</span> */}
          </div>

          <div className="right-section w-max text-right">
            <CardTitle className="text-2xl font-semibold">$31500</CardTitle>
            <span className="text-primary">Your total subscription cost</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full rounded-2xl flex items-center mt-10 justify-between">
            <UsageItem
              icon={<Users size={16} />}
              label="User limit"
              value="18 / 2000"
              percent={72}
            />
          </div>
        </CardContent>
      </Card>

      {/* ===================== BILLING DETAILS ===================== */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Invoice details
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* <div className="w-full h-max rounded-xl border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="h-[8vh] font-medium">
                    Invoice No.
                  </TableHead>
                  <TableHead className="h-[8vh] font-medium">Date</TableHead>
                  <TableHead className="h-[8vh] text-right font-medium">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invoices.map((invoice, i) => (
                  <TableRow key={i} className="h-[8vh]">
                    <TableCell className="font-medium">
                      {invoice.invoiceNo}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {invoice.date}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div> */}
          <InvoiceTable/>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscription;

function UsageItem({ icon, label, value, percent }) {
  return (
    <div className="w-full h-max text-lg">
      <div className="flex items-center justify-between mb-1">
        <p className="flex items-center gap-2 ">
          {icon} {label}
        </p>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <Progress value={percent} className={`h-3`} />
    </div>
  );
}

