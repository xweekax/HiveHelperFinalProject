using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiveHelper.Models
{
    public class ActionDetail
    {
        public long id { get; set; }
        public long primary_action_id { get; set; }
        public long secondary_action_id { get; set; }
        public long tertiary_action_id { get; set; }
        public long hive_id { get; set; }
        public long completed_by_id { get; set; }
        public long entered_by_id { get; set; }
        public bool completed { get; set; }
        public DateTime entry_date { get; set; }
        public DateTime completed_date { get; set; }
        public DateTime scheduled_date { get; set; }
        public string comments { get; set; }
        public string primary_action_name { get; set; }
        public string secondary_action_name { get; set; }
        public string tertiary_action_name { get; set; }
        public string completed_by_first_name { get; set; }
        public string completed_by_last_name { get; set; }
        public string entered_by_first_name { get; set; }
        public string entered_by_last_name { get; set; }
    }
}
