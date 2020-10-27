using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiveHelper.Models
{
    public class Permission
    {
        public long id { get; set; }
        public string name { get; set; }
        public int access_level { get; set; }
    }
}
