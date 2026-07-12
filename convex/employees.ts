import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("employees")
        .withSearchIndex("search_by_name", (q) => q.search("firstName", args.search!))
        .paginate(args.paginationOpts);
    }
    
    return await ctx.db
      .query("employees")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getById = query({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("employees").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    age: v.number(),
    sex: v.string(),
    phoneNumber: v.string(),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("on_leave"))),
    department: v.optional(v.string()),
    designation: v.optional(v.string()),
    joinDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("employees", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("employees"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    age: v.optional(v.number()),
    sex: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("on_leave"))),
    department: v.optional(v.string()),
    designation: v.optional(v.string()),
    joinDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const bulkRemove = mutation({
  args: { ids: v.array(v.id("employees")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});
