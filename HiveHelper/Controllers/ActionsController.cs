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
    public class ActionsController : ControllerBase
    {
        private IDataAccessor data;

        public ActionsController(IDataAccessor dataAccessor)
        {
            data = dataAccessor;
        }

        [HttpGet("details/{hive_id}")]
        public IEnumerable<ActionDetail> GetActionDetails(long hive_id)
        {
            return data.GetActionDetails(hive_id);
        }

        [HttpPost("details")]
        public Object AddActionDetails(ActionDetail actionDetail)
        {
            bool result = data.AddActionDetails(actionDetail);
            return new { result };
        }

        [HttpPut("details")]
        public Object UpdateActionDetails(ActionDetail actionDetail)
        {
            bool result = data.UpdateActionDetail(actionDetail);
            return new { result };
        }

        [HttpGet("primary")]
        public IEnumerable<PrimaryAction> GetPrimaryActions()
        {
            return data.GetPrimaryActions();
        }

        [HttpPost("primary")]
        public Object AddPrimaryAction(PrimaryAction action)
        {
            bool result = data.AddPrimaryAction(action);
            return new { result };
        }

        [HttpPut("primary")]
        public Object UpdatePrimaryAction(PrimaryAction primaryAction)
        {
            bool result = data.UpdatePrimaryAction(primaryAction);
            return new { result };
        }

        [HttpGet("secondary/{primary_id}")]
        public IEnumerable<SecondaryAction> GetSecondaryActions(long primary_id)
        {
            return data.GetSecondaryActions(primary_id);
        }

        [HttpPost("secondary")]
        public Object AddSecondaryAction(SecondaryAction action)
        {
            bool result = data.AddSecondaryAction(action);
            return new { result };
        }

        [HttpPut("secondary")]
        public Object UpdateSecondaryAction(SecondaryAction secondaryAction)
        {
            bool result = data.UpdateSecondaryAction(secondaryAction);
            return new { result };
        }

        [HttpGet("tertiary/{secondary_id}")]
        public IEnumerable<TertiaryAction> GetTertiaryActions(long secondary_id)
        {
            return data.GetTertiaryActions(secondary_id);
        }

        [HttpPost("tertiary")]
        public Object AddTertiaryAction(TertiaryAction action)
        {
            bool result = data.AddTertiaryAction(action);
            return new { result };
        }

        [HttpPut("tertiary")]
        public Object UpdateTertiaryAction(TertiaryAction tertiaryAction)
        {
            bool result = data.UpdateTertiaryAction(tertiaryAction);
            return new { result };
        }
    }
}

/*  base = api/actions
x - get action details = /details/id
X - add action details = /details
x - update action details = /details
x - get primary action = /primary
x - add primary action = for the future
x - update primary action = /primary
x - get secondary action = /secondary/id
x - add secondary action = for the future
x - update secondary action = /secondary
x - get tertiary action = /tertiary/id
X - add tertiary action = for the future
x - update tertiary action = /tertiary
*/
