using HiveHelper.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace HiveHelper.Services
{
    public class DataAccessor : IDataAccessor
    {
        IDbConnection db;
        public DataAccessor(IConfiguration config)
        {
            db = new SqlConnection(config.GetConnectionString("DbServer"));
        }

        public bool AddActionDetails(ActionDetail action)
        {
            string enteredOn = action.entry_date.ToShortDateString() + " " + action.entry_date.ToShortTimeString();
            string completedOn = action.completed_date.ToShortDateString() + " " + action.completed_date.ToShortTimeString();
            string scheduledOn = action.scheduled_date.ToShortDateString() + " " + action.scheduled_date.ToShortTimeString();
            //int result = db.Execute("AddActionDetail", new { hiveid = action.hive_id, completedbyid = action.completed_by_id, enteredbyid = action.entered_by_id, primaryactionid = action.primary_action_id, secondaryactionid = action.secondary_action_id, tertiaryactionid = action.tertiary_action_id, completed = action.completed, entrydate = action.entry_date, scheduleddate = action.scheduled_date, completeddate = action.completed_date, comments = action.comments }, commandType: CommandType.StoredProcedure);
            string query = "INSERT INTO ActionDetail (hive_id, completed_by_id, entered_by_id, primary_action_id, secondary_action_id, tertiary_action_id, completed, entry_date, scheduled_date, completed_date, comments) VALUES (@hive_id, @completed_by_id, @entered_by_id, @primary_action_id, @secondary_action_id, @tertiary_action_id, @completed, @entry_date, @scheduled_date, @completed_date, @comments)";
            int result =db.Execute(query, new { action.hive_id, action.completed_by_id, action.entered_by_id, action.primary_action_id, action.secondary_action_id, action.tertiary_action_id, action.completed, @entry_date = enteredOn, @scheduled_date = scheduledOn, @completed_date = completedOn, action.comments});
            return result != 0;
        }

        public bool AddHive(Hive add_hive)
        {
            if(add_hive.genetics is null || add_hive.genetics == "")
            {
                add_hive.genetics = "unknown";
            }

            int result = db.Execute("AddHive", new {@location_id = add_hive.location_id, @inspection_interval = add_hive.inspection_interval, @name = add_hive.name, @genetics = add_hive.genetics }, commandType: CommandType.StoredProcedure);
            return result != 0;
        }

        public bool AddPrimaryAction(PrimaryAction primary)
        {
            string query = "INSERT INTO PrimaryAction (name, active) VALUES (@name, @active)";
            int result = db.Execute(query, primary);
            return result == 1;
        }

        public bool AddSecondaryAction(SecondaryAction secondary)
        {
            string query = "INSERT INTO SecondaryAction (name, active, primary_action_id) VALUES (@name, @active, @primary_action_id)";
            int result = db.Execute(query, secondary);
            return result == 1;
        }

        public bool AddTertiaryAction(TertiaryAction tertiary)
        {
            string query = "INSERT INTO TertiaryAction (name, active, secondary_action_id) VALUES (@name, @active, @secondary_action_id)";
            int result = db.Execute(query, tertiary);
            return result == 1;
        }

        public bool AddUser(User new_user)
        {
            new_user.username = new_user.username.ToLower();
            int result = db.Execute("AddUser", new { @firstname = new_user.first_name, @lastname = new_user.last_name, @accesslevel = new_user.access_level, @username = new_user.username }, commandType: CommandType.StoredProcedure );
            return result != 0;
        }

        public bool AddYard(Location add_yard)
        {
            int result = db.Execute("AddYard", new { @name = add_yard.name, @address = add_yard.address }, commandType: CommandType.StoredProcedure);
            return result == 1;
        }

        public bool DeleteHive(long id)
        {
            int result = db.Execute("DeleteHive", new { id }, commandType: CommandType.StoredProcedure );
            return result != 0;
        }

        public IEnumerable<ActionDetail> GetActionDetails(long hive_id)
        {
            List<ActionDetail> actions = db.Query<ActionDetail>("GetActionDetails", new { hive_id }, commandType: CommandType.StoredProcedure).ToList();

            foreach(ActionDetail a in actions)
            {
                a.scheduled_date = a.scheduled_date.ToLocalTime();
                a.entry_date = a.entry_date.ToLocalTime();
                a.completed_date = a.completed_date.ToLocalTime();
            }

            return actions;
        }

        public Hive GetHive(long id)
        {
            string query = "SELECT * FROM Hive WHERE id = @id";
            return db.QuerySingle<Hive>(query, new { id });
        }

        public IEnumerable<Hive> GetHives(long location_id)
        {
            string query = "SELECT * FROM Hive WHERE location_id = @location_id";
            return db.Query<Hive>(query, new { location_id });            
        }

        public IEnumerable<Permission> GetPermissions(long access_level)
        {
            string query = "SELECT * FROM Permission WHERE access_level <= @access_level";
            return db.Query<Permission>(query, new { access_level });
        }

        public IEnumerable<PrimaryAction> GetPrimaryActions()
        {
            string query = "SELECT * FROM PrimaryAction";
            return db.Query<PrimaryAction>(query);
        }

        public IEnumerable<SecondaryAction> GetSecondaryActions(long primary_id)
        {
            string query = "SELECT * FROM SecondaryAction WHERE primary_action_id = @primary_id";
            return db.Query<SecondaryAction>(query, new { primary_id });
        }

        public IEnumerable<TertiaryAction> GetTertiaryActions(long secondary_id)
        {
            string query = "SELECT * FROM TertiaryAction WHERE secondary_action_id = @secondary_id";
            return db.Query<TertiaryAction>(query, new { secondary_id });
        }

        public User GetUser(string username)
        {
            string query = "SELECT * FROM [User] WHERE username = @username";
            username = username.ToLower();
            User found;

            try
            {
               found = db.QuerySingle<User>(query, new { username });
            } 
            catch 
            {
                found = null;
            }
            return found;            
        }

        public Location GetYard(long id)
        {
            string query = "SELECT * FROM Location WHERE id = @id";
            return db.QuerySingle<Location>(query, new { id });
        }

        public IEnumerable<Location> GetYards()
        {
            string query = "SELECT * FROM Location";
            return db.Query<Location>(query);
        }

        public bool UpdateActionDetail(ActionDetail update_action)
        {
            //What we are updating: completed by id, completed status, and completed date
            string query = "UPDATE ActionDetail SET completed_by_id = @completed_by_id, completed = @completed, completed_date = @completed_date WHERE id = @id";
            int results = db.Execute(query, new { update_action.id, update_action.completed_by_id, update_action.completed, update_action.completed_date });
            return results == 1;
        }

        public bool UpdateHive(Hive update_hive)
        {
            string query = "UPDATE Hive SET location_id = @location_id, inspection_interval = @inspection_interval, name = @name, aggressive = @aggressive WHERE id = @id";
            int results = db.Execute(query, update_hive);
            return results == 1;
        }

        public bool UpdatePrimaryAction(PrimaryAction primary)
        {
            int result = db.Execute("UpdatePrimaryAction", new { id = primary.id, active = primary.active }, commandType: CommandType.StoredProcedure);
            return result == 1;
            //string query = "UPDATE id, active FROM PrimaryAction";
        }

        public bool UpdateSecondaryAction(SecondaryAction secondary)
        {
            int result = db.Execute("UpdateSecondaryAction", new { id = secondary.id, active = secondary.active }, commandType: CommandType.StoredProcedure);
            return result == 1;
        }

        public bool UpdateTertiaryAction(TertiaryAction tertiary)
        {
            int result = db.Execute("UpdateTertiaryAction", new { id = tertiary.id, active = tertiary.active }, commandType: CommandType.StoredProcedure);
            return result == 1;
        }

        public bool UpdateUser(User user)
        {
            string query = "UPDATE [User] SET first_name = @first_name, password = @password, last_name = @last_name, access_level = @access_level, username = @username WHERE id = @id";
            int result = db.Execute(query, user);
            return result == 1;
        }
    }
}
