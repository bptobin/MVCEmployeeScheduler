﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MVCEmployeeScheduler.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    public partial class Schedules
    {
        public int id { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public DateTime DateTimeFrom { get; set; }
        public DateTime DateTimeTo { get; set; }
        public Nullable<int> EmpId { get; set; }
    }

    public class ScheduleDBContext : DbContext
    {
        public DbSet<Schedules> Schedules { get; set; }

        public System.Data.Entity.DbSet<MVCEmployeeScheduler.Models.OffDays> OffDays { get; set; }
    }
}
