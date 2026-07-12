import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  employees: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    age: v.number(),
    sex: v.string(), // M/F or other
    phoneNumber: v.string(),
    // Additional enterprise fields
    status: v.optional(v.union(v.literal("active"), v.literal("inactive"), v.literal("on_leave"))),
    department: v.optional(v.string()),
    designation: v.optional(v.string()),
    joinDate: v.optional(v.string()),
  })
    .index("by_name", ["lastName", "firstName"])
    .searchIndex("search_by_name", {
      searchField: "firstName",
    }),
  departments: defineTable({
    name: v.string(),
    code: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_name", ["name"])
    .searchIndex("search_by_name", {
      searchField: "name",
    }),
  designations: defineTable({
    name: v.optional(v.string()),
    title: v.optional(v.string()),
    code: v.optional(v.string()),
    departmentId: v.optional(v.id("departments")),
    description: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_name", ["name"])
    .searchIndex("search_by_name", {
      searchField: "name",
    }),
  shifts: defineTable({
    name: v.string(),
    code: v.optional(v.string()),
    startTime: v.string(),
    endTime: v.string(),
    graceTime: v.optional(v.number()),
    breakDuration: v.optional(v.number()),
    weeklyOff: v.optional(v.array(v.string())),
    workingDays: v.optional(v.array(v.string())),
    status: v.union(v.literal("active"), v.literal("inactive")),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_name", ["name"])
    .searchIndex("search_by_name", {
      searchField: "name",
    }),
  attendance: defineTable({
    employeeId: v.id("employees"),
    departmentId: v.optional(v.id("departments")),
    designationId: v.optional(v.id("designations")),
    shiftId: v.optional(v.id("shifts")),
    date: v.string(),
    checkIn: v.optional(v.string()),
    checkOut: v.optional(v.string()),
    workingHours: v.optional(v.number()),
    lateMinutes: v.optional(v.number()),
    earlyOutMinutes: v.optional(v.number()),
    overtime: v.optional(v.number()),
    status: v.union(v.literal("present"), v.literal("absent"), v.literal("half_day"), v.literal("late")),
    notes: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_employee_date", ["employeeId", "date"]),
  payroll: defineTable({
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
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_employee_month_year", ["employeeId", "month", "year"]),
  announcements: defineTable({
    title: v.string(),
    description: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    publishDate: v.string(),
    expiryDate: v.optional(v.string()),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_publishDate", ["publishDate"])
    .searchIndex("search_by_title", {
      searchField: "title",
    }),
});
