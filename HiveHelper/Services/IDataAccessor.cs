using HiveHelper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiveHelper.Services
{
    public interface IDataAccessor
    {
        public IEnumerable<Location> GetYards();
      //  public IEnumerable<Location> GetYards(string name);
        public Location GetYard(long id);
        public IEnumerable<Hive> GetHives(long location_id);
        public bool DeleteHive(long id);
        public IEnumerable<PrimaryAction> GetPrimaryActions();
        public IEnumerable<SecondaryAction> GetSecondaryActions(long primary_id);
        public IEnumerable<TertiaryAction> GetTertiaryActions(long secondary_id);
        public bool UpdatePrimaryAction(PrimaryAction primary);
        public bool UpdateSecondaryAction(SecondaryAction secondary);
        public bool UpdateTertiaryAction(TertiaryAction tertiary);
        public IEnumerable<ActionDetail> GetActionDetails(long hive_id);
        public bool AddActionDetails(ActionDetail action);
        public bool UpdateActionDetail(ActionDetail update_action);

        public User GetUser(string username);
        public bool AddUser(User new_user);

    }
}
