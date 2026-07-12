"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployeeTable } from "./components/EmployeeTable";
import { EmployeeDialogs } from "./components/EmployeeDialogs";
import { useEmployees } from "./services";
import { useDebounce } from "@/hooks/use-debounce";

export default function EmployeePage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { results, status, loadMore } = useEmployees(debouncedSearch);

  const isLoading = status === "LoadingFirstPage";

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Employees</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your workforce, update profiles, and track employee details.
          </p>
        </div>
        <EmployeeDialogs mode="create">
          <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </EmployeeDialogs>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search employees by first name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/50"
          />
        </div>
      </div>

      <div className="flex-1 rounded-3xl border border-white/5 bg-slate-900/50 p-6 shadow-xl">
        <EmployeeTable data={results} isLoading={isLoading} />
        {status === "CanLoadMore" && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={() => loadMore(10)}
              className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
