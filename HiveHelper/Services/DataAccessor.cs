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
            throw new NotImplementedException();
        }

        public bool AddUser(User new_user)
        {
            throw new NotImplementedException();
        }

        public bool DeleteHive(long id)
        {
            int result = db.Execute("DeleteHive", new { id }, commandType: CommandType.StoredProcedure );
            return result != 0;

        }

        public IEnumerable<ActionDetail> GetActionDetails(long hive_id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Hive> GetHives(long location_id)
        {
            string query = "SELECT * FROM Hive WHERE location_id = @location_id";
            return db.Query<Hive>(query, new { location_id });            
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
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        public bool UpdatePrimaryAction(PrimaryAction primary)
        {
            
        }

        public bool UpdateSecondaryAction(SecondaryAction secondary)
        {
            throw new NotImplementedException();
        }

        public bool UpdateTertiaryAction(TertiaryAction tertiary)
        {
            throw new NotImplementedException();
        }
    }
}
