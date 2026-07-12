import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // Note: No search index is currently defined on payroll schema, 
    // so we handle basic pagination. 
    const results = await ctx.db
      .query("payroll")
      .order("desc")
      .paginate(args.paginationOpts);
      
    const populatedPage = await Promise.all(
      results.page.map(async (payroll) => {
        const employee = await ctx.db.get(payroll.employeeId);
        return { ...payroll, employee };
      })
    );
    
    return { ...results, page: populatedPage };
  },
});

export const getById = query({
  args: { id: v.id("payroll") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    employeeId: v.id("employees"),
    month: v.number(),
    year: v.number(),
    basicSalary: v.number(),
    allowances: v.optional(v.number()),
    deductions: v.optional(v.number()),
    overtimeAmount: v.optional(v.number()),
    netSalary: v.number(),
    paymentStatus: v.union(v.literal("pending"), v.literal("processing"), v.literal("paid"), v.literal("failed")),
    paymentDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payroll", {
      ...args,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("payroll"),
    employeeId: v.optional(v.id("employees")),
    month: v.optional(v.number()),
    year: v.optional(v.number()),
    basicSalary: v.optional(v.number()),
    allowances: v.optional(v.number()),
    deductions: v.optional(v.number()),
    overtimeAmount: v.optional(v.number()),
    netSalary: v.optional(v.number()),
    paymentStatus: v.optional(v.union(v.literal("pending"), v.literal("processing"), v.literal("paid"), v.literal("failed"))),
    paymentDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, {
      ...rest,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("payroll") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const bulkRemove = mutation({
  args: { ids: v.array(v.id("payroll")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});
