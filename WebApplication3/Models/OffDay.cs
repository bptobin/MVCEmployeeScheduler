//------------------------------------------------------------------------------
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
    
    public partial class OffDay
    {
        public int id { get; set; }
        public System.DateTime DateTimeFrom { get; set; }
        public System.DateTime DateTimeTo { get; set; }
        public int EmpId { get; set; }
        public string Description { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
    }
}
