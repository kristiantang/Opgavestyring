using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Opgavestyring.Models
{
    public class DataContext : DbContext
    {
        public DataContext() : base("Opgavestyring")
        {

        }

        public DbSet<Task> Task { get; set; }
        public DbSet<Category> Category { get; set; }
    }
}