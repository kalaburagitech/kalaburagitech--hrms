import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const seedDatabase = mutation({
  handler: async (ctx) => {
    const now = new Date().toISOString();
    let departmentsSeeded = 0;
    let designationsSeeded = 0;
    let shiftsSeeded = 0;
    let employeesSeeded = 0;
    let attendanceSeeded = 0;
    let payrollSeeded = 0;
    let announcementsSeeded = 0;

    // 1. Departments (10)
    const deptNames = ["Engineering", "Human Resources", "Sales", "Operations", "Marketing", "Finance", "Legal", "Customer Support", "IT Infrastructure", "Product Management"];
    for (let i = 0; i < deptNames.length; i++) {
      const existing = await ctx.db.query("departments").withIndex("by_name", (q) => q.eq("name", deptNames[i])).first();
      if (!existing) {
        await ctx.db.insert("departments", { name: deptNames[i], code: `DPT${i+1}`, description: `${deptNames[i]} Dept`, status: "active", createdAt: now, updatedAt: now });
        departmentsSeeded++;
      }
    }
    const depts = await ctx.db.query("departments").collect();

    // 2. Designations (25)
    const desigNames = ["Software Engineer", "Senior Software Engineer", "Tech Lead", "Engineering Manager", "HR Manager", "HR Executive", "Sales Executive", "Sales Manager", "Operations Manager", "Operations Analyst", "Marketing Specialist", "Marketing Manager", "Financial Analyst", "Finance Manager", "Legal Advisor", "Chief Counsel", "Support Agent", "Support Lead", "IT Administrator", "Sysadmin", "Product Manager", "Senior PM", "Director of Engineering", "VP of Sales", "CEO"];
    for (let i = 0; i < desigNames.length; i++) {
      const existing = await ctx.db.query("designations").withIndex("by_name", (q) => q.eq("name", desigNames[i])).first();
      if (!existing) {
        const randomDept = depts.length > 0 ? depts[Math.floor(Math.random() * depts.length)]._id : undefined;
        await ctx.db.insert("designations", { name: desigNames[i], code: `DSG${i+1}`, departmentId: randomDept, description: `${desigNames[i]} Role`, status: "active", createdAt: now, updatedAt: now });
        designationsSeeded++;
      }
    }
    const desigs = await ctx.db.query("designations").collect();

    // 3. Shifts (10)
    const shiftNames = ["Morning A", "Morning B", "Afternoon A", "Afternoon B", "Night A", "Night B", "Graveyard", "Weekend Day", "Weekend Night", "Flexible"];
    for (let i = 0; i < shiftNames.length; i++) {
      const existing = await ctx.db.query("shifts").withIndex("by_name", (q) => q.eq("name", shiftNames[i])).first();
      if (!existing) {
        await ctx.db.insert("shifts", { name: shiftNames[i], code: `SHF${i+1}`, startTime: "09:00", endTime: "17:00", graceTime: 15, breakDuration: 60, weeklyOff: ["Saturday", "Sunday"], status: "active", createdAt: now, updatedAt: now });
        shiftsSeeded++;
      }
    }
    const shifts = await ctx.db.query("shifts").collect();

    // 4. Employees (200)
    const firstNames = ["Rahul", "Priya", "Amit", "Neha", "Rohan", "Sneha", "Vikram", "Pooja", "Arjun", "Anjali"];
    const lastNames = ["Sharma", "Patel", "Singh", "Gupta", "Kumar", "Verma", "Jain", "Reddy", "Nair", "Iyer"];
    for (let i = 0; i < 200; i++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)] + (i > 9 ? i : "");
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const existing = await ctx.db.query("employees").withIndex("by_name", (q) => q.eq("lastName", ln).eq("firstName", fn)).first();
      if (!existing) {
        await ctx.db.insert("employees", { 
          firstName: fn, lastName: ln, age: 25 + (i % 20), sex: i % 2 === 0 ? "M" : "F", phoneNumber: `+9198765${(43210 + i).toString().padStart(5, '0')}`,
          status: "active", department: depts.length > 0 ? depts[Math.floor(Math.random() * depts.length)].name : undefined,
          designation: desigs.length > 0 ? desigs[Math.floor(Math.random() * desigs.length)].name : undefined, joinDate: "2023-01-01" 
        });
        employeesSeeded++;
      }
    }
    const emps = await ctx.db.query("employees").collect();

    // 5. Attendance (1000)
    for (let i = 0; i < 1000; i++) {
      if (emps.length === 0) break;
      const emp = emps[i % emps.length];
      const d = new Date();
      d.setDate(d.getDate() - (i % 30));
      const dateStr = d.toISOString().split('T')[0];
      const existing = await ctx.db.query("attendance").withIndex("by_employee_date", (q) => q.eq("employeeId", emp._id).eq("date", dateStr)).first();
      if (!existing) {
        await ctx.db.insert("attendance", { employeeId: emp._id, date: dateStr, status: "present", checkIn: "09:00", checkOut: "17:00", workingHours: 8, createdAt: now, updatedAt: now });
        attendanceSeeded++;
      }
    }

    // 6. Payroll (200)
    for (let i = 0; i < 200; i++) {
      if (emps.length === 0) break;
      const emp = emps[i % emps.length];
      const month = (i % 12) + 1;
      const year = 2024;
      const existing = await ctx.db.query("payroll").withIndex("by_employee_month_year", (q) => q.eq("employeeId", emp._id).eq("month", month).eq("year", year)).first();
      if (!existing) {
        await ctx.db.insert("payroll", { employeeId: emp._id, month, year, basicSalary: 50000, netSalary: 45000, paymentStatus: "paid", createdAt: now, updatedAt: now });
        payrollSeeded++;
      }
    }

    // 7. Announcements (20)
    for (let i = 0; i < 20; i++) {
      const title = `Announcement ${i+1}`;
      const existing = await ctx.db.query("announcements").filter(q => q.eq(q.field("title"), title)).first();
      if (!existing) {
        await ctx.db.insert("announcements", { title, description: `This is announcement number ${i+1}`, priority: "medium", publishDate: now, status: "published", createdAt: now, updatedAt: now });
        announcementsSeeded++;
      }
    }

    return {
      success: true,
      message: `Seeded: ${departmentsSeeded} Depts, ${designationsSeeded} Desigs, ${shiftsSeeded} Shifts, ${employeesSeeded} Emps, ${attendanceSeeded} Att, ${payrollSeeded} Payroll, ${announcementsSeeded} Ann. (Duplicates skipped)`
    };
  },
});
