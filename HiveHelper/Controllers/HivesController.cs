using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HiveHelper.Models;
using HiveHelper.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HiveHelper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HivesController : ControllerBase
    {
        private IDataAccessor data;

        public HivesController(IDataAccessor dataAccessor)
        {
            data = dataAccessor;          
        }

        [HttpGet("locations")]
        public IEnumerable<Location> GetLocations()
        {
            return data.GetYards();
        }

        [HttpGet("locations/{id}")]
        public Location GetLocations(long id)
        {
            return data.GetYard(id);
        }

        [HttpGet("in/{location_id}")]
        public IEnumerable<Hive> GetHives(long location_id)
        {
            return data.GetHives(location_id);
        } 
        
        [HttpPost("locations")]
        public Object AddYard(Location new_yard)
        {
            bool result = data.AddYard(new_yard);
            return new { result };
        }

        [HttpGet("{id}")]
        public Hive GetHive(long id)
        {
            return data.GetHive(id);
        }

        [HttpDelete("{id}")]
        public Object RemoveHive(long id)
        {
            bool result = data.DeleteHive(id);
            return new { result };
        }

        [HttpPost("")]
        public Object AddHive(Hive new_hive)
        {            
            bool result = data.AddHive(new_hive);
            return new { result };
        }

        [HttpPut("")]
        public Object UpdateHive(Hive update_hive)
        {
            bool result = data.UpdateHive(update_hive);
            return new { result };
        }

        private DateTime GetCompletedDate(IEnumerable<ActionDetail> actions)
        {
            if (actions.Count() > 0 && actions.Any(x => x.completed))
            {
                DateTime completed = actions.Where(x => x.completed).First().completed_date;
                foreach (ActionDetail a in actions)
                {
                    if (a.completed_date > completed && a.completed)
                    {
                        completed = a.completed_date;
                    }
                }
                return completed;
            }
            else
            {
                return default;
            }
        }


        //green things
        [HttpGet("filter/today/{location_id}")]
        public IEnumerable<Hive> GetHivesInspectedToday(long location_id)
        {
            IEnumerable<Hive> location_hives = data.GetHives(location_id);
            List<Hive> inspected_today = new List<Hive>();
            foreach(Hive h in location_hives)
            {
                IEnumerable<ActionDetail> actions = data.GetActionDetails(h.id);
                if(actions.Any(action => action.completed_date.Date == DateTime.Now.Date && action.completed))
                {
                    inspected_today.Add(h);
                }
            }
            return inspected_today;
        }

        //yello/red if too long things
        [HttpGet("filter/overdue/{location_id}")]
        public IEnumerable<Hive> GetHivesInspectionOverdue(long location_id)
        {
            IEnumerable<Hive> location_hives = data.GetHives(location_id);
            List<Hive> overdue_inspections = new List<Hive>();
            foreach (Hive h in location_hives)
            {
                IEnumerable<ActionDetail> actions = data.GetActionDetails(h.id);
                DateTime completed;
                if (actions.Count() > 0 && actions.Any(x => x.completed))
                {
                    //get most recent completed action date
                    completed = GetCompletedDate(actions);
                    if(completed.AddDays(h.inspection_interval) < DateTime.Now)
                    {
                        overdue_inspections.Add(h);
                    }
                }
                else
                {
                    overdue_inspections.Add(h);
                }
            }
            return overdue_inspections;
        }

        //red things
        [HttpGet("filter/urgent/{location_id}")]
        public IEnumerable<Hive> GetHivesUrgentAction(long location_id)
        {
            IEnumerable<Hive> location_hives = data.GetHives(location_id);
            List<Hive> urgent_actions = new List<Hive>();
            foreach (Hive h in location_hives)
            {
                IEnumerable<ActionDetail> actions = data.GetActionDetails(h.id);
                if (actions.Count() > 0)
                {
                    if(actions.Any(action => (!action.completed && action.scheduled_date < DateTime.Now)))
                    {
                        urgent_actions.Add(h);
                    }
                    else if (GetCompletedDate(actions).AddDays(h.inspection_interval * 1.5) < DateTime.Now)
                    {
                        urgent_actions.Add(h);
                    }
                }
                else
                {
                    urgent_actions.Add(h);
                }
            }
            return urgent_actions;
        }
    }
}

/*  base = api/hives
x - all yards = api/hives/locations
x - add a yard = api/hives/locations
x - get a single yard = api/hives/locations/id
x - all hives in single yard = api/hives/in/id
x - delete single hive = api/hives/id
x - add a hive = api/hives     
x - update a hive = api/hives/id
X - api/hives/filter/today/id
X - api/hives/filter/overdue/id
    api/hives/filter/urgent/id
*/
