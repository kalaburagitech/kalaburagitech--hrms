import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getDepartments = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("departments")
        .withSearchIndex("search_by_name", (q) => q.search("name", args.search!))
        .paginate(args.paginationOpts);
    }
    
    return await ctx.db
      .query("departments")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getDepartmentById = query({
  args: { id: v.id("departments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createDepartment = mutation({
  args: {
    name: v.string(),
    code: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("departments")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing) {
      throw new Error("A department with this name already exists.");
    }

    const now = new Date().toISOString();
    return await ctx.db.insert("departments", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateDepartment = mutation({
  args: {
    id: v.id("departments"),
    name: v.optional(v.string()),
    code: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    if (updates.name) {
      const existing = await ctx.db
        .query("departments")
        .withIndex("by_name", (q) => q.eq("name", updates.name!))
        .first();

      if (existing && existing._id !== id) {
        throw new Error("A department with this name already exists.");
      }
    }

    const now = new Date().toISOString();
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
    });
  },
});

export const deleteDepartment = mutation({
  args: { id: v.id("departments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
