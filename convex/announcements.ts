import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getAnnouncements = query({
  args: {
    paginationOpts: paginationOptsValidator,
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("announcements");
    if (args.searchQuery) {
      return await ctx.db
        .query("announcements")
        .withSearchIndex("search_by_title", (q) =>
          q.search("title", args.searchQuery as string)
        )
        .paginate(args.paginationOpts);
    }
    return await q.order("desc").paginate(args.paginationOpts);
  },
});

export const getAnnouncementById = query({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createAnnouncement = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    publishDate: v.string(),
    expiryDate: v.optional(v.string()),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("announcements", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateAnnouncement = mutation({
  args: {
    id: v.id("announcements"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    publishDate: v.optional(v.string()),
    expiryDate: v.optional(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const now = new Date().toISOString();
    await ctx.db.patch(id, {
      ...rest,
      updatedAt: now,
    });
    return id;
  },
});

export const deleteAnnouncement = mutation({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
