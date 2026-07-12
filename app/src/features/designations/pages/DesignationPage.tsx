"use client";

import { useState } from "react";
import { DesignationTable } from "../components/DesignationTable";
import { DesignationForm } from "../components/DesignationForm";
import { useDesignations } from "../services";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Designation } from "../types";

export function DesignationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { designations, status, loadMore, isLoading } = useDesignations(searchTerm);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Designations</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Designation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Designation</DialogTitle>
              </DialogHeader>
              <DesignationForm onSuccess={() => setIsAddOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search designations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <DesignationTable data={(designations as Designation[]) || []} isLoading={isLoading} />
      
      {status === "CanLoadMore" && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => loadMore(10)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
