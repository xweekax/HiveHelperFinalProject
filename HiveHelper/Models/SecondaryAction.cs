using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiveHelper.Models
{
    public class SecondaryAction
    {
        public long id { get; set; }
        public string name { get; set; }
        public long primary_action_id { get; set; }
        public bool active { get; set; }

    }

}
