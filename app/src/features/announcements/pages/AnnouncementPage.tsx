"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnnouncementTable } from "../components/AnnouncementTable";
import { AnnouncementDialogs } from "../components/AnnouncementDialogs";
import { useAnnouncements } from "../services";

export function AnnouncementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { results, status, loadMore } = useAnnouncements(searchQuery || undefined);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Announcements</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create, update, and manage company-wide announcements.
          </p>
        </div>
        <AnnouncementDialogs mode="create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-foreground">
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </AnnouncementDialogs>
      </div>
      
      <div className="flex-1 rounded-3xl border border-border bg-card/50 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <AnnouncementTable 
          data={results as unknown as import("../types").Announcement[] || []} 
          isLoading={status === "LoadingFirstPage"} 
          loadMore={loadMore as any}
          status={status as any}
        />
      </div>
    </div>
  );
}

