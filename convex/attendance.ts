import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";

export const getAttendance = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const paginatedResult = await ctx.db
      .query("attendance")
      .order("desc")
      .paginate(args.paginationOpts);

    const enrichedPage = await Promise.all(
      paginatedResult.page.map(async (record) => {
        const employee = await ctx.db.get(record.employeeId);
        const shift = record.shiftId ? await ctx.db.get(record.shiftId) : null;
        const department = record.departmentId ? await ctx.db.get(record.departmentId) : null;
        
        return {
          ...record,
          employee,
          shift,
          department,
        };
      })
    );

    // If search is provided, we might filter it here, though it breaks strict pagination count
    // A better approach in Convex is using search indexes, but since we don't have one on attendance,
    // we'll filter the enriched results by employee name
    let filteredPage = enrichedPage;
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      filteredPage = enrichedPage.filter(
        (r) => 
          r.employee?.firstName.toLowerCase().includes(searchLower) ||
          r.employee?.lastName.toLowerCase().includes(searchLower) ||
          r.date.includes(searchLower)
      );
    }

    return {
      ...paginatedResult,
      page: filteredPage,
    };
  },
});

export const getAttendanceById = query({
  args: { id: v.id("attendance") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

function timeToMinutes(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

export const createAttendance = mutation({
  args: {
    employeeId: v.id("employees"),
    departmentId: v.optional(v.id("departments")),
    designationId: v.optional(v.id("designations")),
    shiftId: v.optional(v.id("shifts")),
    date: v.string(),
    checkIn: v.optional(v.string()),
    checkOut: v.optional(v.string()),
    status: v.union(v.literal("present"), v.literal("absent"), v.literal("half_day"), v.literal("late")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let workingHours = 0;
    let lateMinutes = 0;
    let earlyOutMinutes = 0;

    if (args.checkIn && args.checkOut) {
      const checkInMins = timeToMinutes(args.checkIn);
      const checkOutMins = timeToMinutes(args.checkOut);
      workingHours = (checkOutMins - checkInMins) / 60;
    }

    if (args.shiftId && args.checkIn) {
      const shift = await ctx.db.get(args.shiftId);
      if (shift) {
        const shiftStartMins = timeToMinutes(shift.startTime);
        const checkInMins = timeToMinutes(args.checkIn);
        const grace = shift.graceTime || 0;
        if (checkInMins > shiftStartMins + grace) {
          lateMinutes = checkInMins - shiftStartMins;
        }

        if (args.checkOut) {
          const shiftEndMins = timeToMinutes(shift.endTime);
          const checkOutMins = timeToMinutes(args.checkOut);
          if (checkOutMins < shiftEndMins) {
            earlyOutMinutes = shiftEndMins - checkOutMins;
          }
        }
      }
    }

    const now = new Date().toISOString();
    return await ctx.db.insert("attendance", {
      ...args,
      workingHours: workingHours > 0 ? parseFloat(workingHours.toFixed(2)) : undefined,
      lateMinutes: lateMinutes > 0 ? lateMinutes : undefined,
      earlyOutMinutes: earlyOutMinutes > 0 ? earlyOutMinutes : undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateAttendance = mutation({
  args: {
    id: v.id("attendance"),
    checkIn: v.optional(v.string()),
    checkOut: v.optional(v.string()),
    status: v.optional(v.union(v.literal("present"), v.literal("absent"), v.literal("half_day"), v.literal("late"))),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Attendance record not found");

    const checkIn = updates.checkIn !== undefined ? updates.checkIn : existing.checkIn;
    const checkOut = updates.checkOut !== undefined ? updates.checkOut : existing.checkOut;
    const shiftId = existing.shiftId;

    let workingHours = existing.workingHours;
    let lateMinutes = existing.lateMinutes;
    let earlyOutMinutes = existing.earlyOutMinutes;

    if (checkIn && checkOut) {
      const checkInMins = timeToMinutes(checkIn);
      const checkOutMins = timeToMinutes(checkOut);
      workingHours = (checkOutMins - checkInMins) / 60;
    }

    if (shiftId && checkIn) {
      const shift = await ctx.db.get(shiftId);
      if (shift) {
        const shiftStartMins = timeToMinutes(shift.startTime);
        const checkInMins = timeToMinutes(checkIn);
        const grace = shift.graceTime || 0;
        if (checkInMins > shiftStartMins + grace) {
          lateMinutes = checkInMins - shiftStartMins;
        } else {
          lateMinutes = 0;
        }

        if (checkOut) {
          const shiftEndMins = timeToMinutes(shift.endTime);
          const checkOutMins = timeToMinutes(checkOut);
          if (checkOutMins < shiftEndMins) {
            earlyOutMinutes = shiftEndMins - checkOutMins;
          } else {
            earlyOutMinutes = 0;
          }
        }
      }
    }

    const now = new Date().toISOString();
    await ctx.db.patch(id, {
      ...updates,
      workingHours: workingHours ? parseFloat(workingHours.toFixed(2)) : undefined,
      lateMinutes: lateMinutes || undefined,
      earlyOutMinutes: earlyOutMinutes || undefined,
      updatedAt: now,
    });
  },
});

export const deleteAttendance = mutation({
  args: { id: v.id("attendance") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
