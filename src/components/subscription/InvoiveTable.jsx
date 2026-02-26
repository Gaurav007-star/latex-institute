import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

const invoices = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  invoiceNo: `#INV-${1000 + i}`,
  date: "Mar 12, 2019",
  amount: 3154,
}));

const PAGE_SIZE = 5;

export default function InvoiceTable({ search = "" }) {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // 🔍 FILTER
  const filteredInvoices = useMemo(() => {
    if (!search) return invoices;
    const q = search.toLowerCase();

    return invoices.filter(
      (i) =>
        i.invoiceNo.toLowerCase().includes(q) ||
        i.date.toLowerCase().includes(q)
    );
  }, [search]);

  // 🔃 SORT
  const sortedInvoices = useMemo(() => {
    if (!sortConfig.key) return filteredInvoices;

    return [...filteredInvoices].sort((a, b) => {
      let x = a[sortConfig.key];
      let y = b[sortConfig.key];

      if (sortConfig.key === "amount") {
        x = Number(x);
        y = Number(y);
      }

      if (typeof x === "string") {
        x = x.toLowerCase();
        y = y.toLowerCase();
      }

      if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
      if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredInvoices, sortConfig]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(sortedInvoices.length / PAGE_SIZE);

  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedInvoices.slice(start, start + PAGE_SIZE);
  }, [sortedInvoices, page]);

  // 🧠 RESET PAGE SAFELY
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted text-sm h-[8vh]">
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("invoiceNo")}
            >
              Invoice No.
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("date")}
            >
              Date
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              Amount
            </TableHead>

            <TableHead className="text-center cursor-pointer">Attachment</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>

              <TableCell className="text-muted-foreground">
                {invoice.date}
              </TableCell>

              <TableCell className="font-medium">
                ${invoice.amount.toFixed(2)}
              </TableCell>

              
              <TableCell className="text-center font-medium">
                <Button variant={"link"}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sortedInvoices.length === 0 && (
        <div className="h-24 flex items-center justify-center text-muted-foreground">
          No invoices found
        </div>
      )}

      {sortedInvoices.length > 0 && (
        <Pagination>
          <PaginationContent className="w-full flex justify-end gap-4 py-4 px-4">
            <PaginationItem
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            >
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
