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
        public Object AddYard([FromForm] Location new_yard)
        {
            bool result = data.AddYard(new_yard);
            return new { result };
        }

        [HttpDelete("{id}")]
        public Object RemoveHive(long id)
        {
            bool result = data.DeleteHive(id);
            return new { result };
        }

        [HttpPost("")]
        public Object AddHive([FromForm] Hive new_hive)
        {
            bool result = data.AddHive(new_hive);
            return new { result };
        }

        [HttpPut("")]
        public Object UpdateHive([FromForm] Hive update_hive)
        {
            bool result = data.UpdateHive(update_hive);
            return new { result };
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
*/
