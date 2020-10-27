using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiveHelper.Models
{
    public class Hive
    {
        public long id { get; set; }
        public long location_id { get; set; }
        public int inspection_interval { get; set;}
        public string name { get; set; }
    }
}
