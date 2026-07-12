import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getDesignations = query({
  args: {
    paginationOpts: paginationOptsValidator,
    searchTerm: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.searchTerm) {
      return await ctx.db
        .query("designations")
        .withSearchIndex("search_by_name", (q) =>
          q.search("name", args.searchTerm!)
        )
        .paginate(args.paginationOpts);
    }
    
    return await ctx.db
      .query("designations")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getDesignationById = query({
  args: { id: v.id("designations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createDesignation = mutation({
  args: {
    name: v.string(),
    code: v.optional(v.string()),
    departmentId: v.optional(v.id("departments")),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("designations", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateDesignation = mutation({
  args: {
    id: v.id("designations"),
    name: v.string(),
    code: v.optional(v.string()),
    departmentId: v.optional(v.id("departments")),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    const now = new Date().toISOString();
    await ctx.db.patch(id, {
      ...rest,
      updatedAt: now,
    });
  },
});

export const deleteDesignation = mutation({
  args: { id: v.id("designations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
