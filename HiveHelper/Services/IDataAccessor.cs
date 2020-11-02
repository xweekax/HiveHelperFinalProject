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
        public Location GetYard(long id);
        public IEnumerable<Hive> GetHives(long location_id);
        public bool AddHive(Hive add_hive);
        public bool DeleteHive(long id);
        public Hive GetHive(long id);
        public IEnumerable<PrimaryAction> GetPrimaryActions();
        public IEnumerable<SecondaryAction> GetSecondaryActions(long primary_id);
        public IEnumerable<TertiaryAction> GetTertiaryActions(long secondary_id);
        public bool UpdatePrimaryAction(PrimaryAction primary);
        public bool UpdateSecondaryAction(SecondaryAction secondary);
        public bool UpdateTertiaryAction(TertiaryAction tertiary);
        public IEnumerable<ActionDetail> GetActionDetails(long hive_id);
        public bool AddActionDetails(ActionDetail action);
        public bool UpdateActionDetail(ActionDetail update_action);
        public bool AddYard(Location add_yard);
        public bool UpdateHive(Hive update_hive);
        public bool AddPrimaryAction(PrimaryAction primary);
        public bool AddSecondaryAction(SecondaryAction secondary);
        public bool AddTertiaryAction(TertiaryAction tertiary);

        // user 
        public User GetUser(string username);
        public bool AddUser(User new_user);
        public bool UpdateUser(User user);
        public IEnumerable<Permission> GetPermissions(long access_level);
    }
}
