using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiveHelper.Models
{
    public class User
    {
        public long id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int access_level { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
