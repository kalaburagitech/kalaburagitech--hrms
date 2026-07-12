import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const getShifts = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("shifts")
        .withSearchIndex("search_by_name", (q) => q.search("name", args.search!))
        .paginate(args.paginationOpts);
    }
    
    return await ctx.db
      .query("shifts")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getShiftById = query({
  args: { id: v.id("shifts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAllShifts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("shifts").order("desc").collect();
  },
});

export const createShift = mutation({
  args: {
    name: v.string(),
    code: v.optional(v.string()),
    startTime: v.string(),
    endTime: v.string(),
    graceTime: v.optional(v.number()),
    breakDuration: v.optional(v.number()),
    weeklyOff: v.array(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("shifts")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing) {
      throw new Error("A shift with this name already exists.");
    }

    const now = new Date().toISOString();
    return await ctx.db.insert("shifts", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateShift = mutation({
  args: {
    id: v.id("shifts"),
    name: v.optional(v.string()),
    code: v.optional(v.string()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    graceTime: v.optional(v.number()),
    breakDuration: v.optional(v.number()),
    weeklyOff: v.optional(v.array(v.string())),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    if (updates.name) {
      const existing = await ctx.db
        .query("shifts")
        .withIndex("by_name", (q) => q.eq("name", updates.name!))
        .first();

      if (existing && existing._id !== id) {
        throw new Error("A shift with this name already exists.");
      }
    }

    const now = new Date().toISOString();
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
    });
  },
});

export const deleteShift = mutation({
  args: { id: v.id("shifts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
