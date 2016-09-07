using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Opgavestyring.Models
{
    public class Task 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public int CategoryId { get; set; }
        public bool Finished { get; set; }
    }
}