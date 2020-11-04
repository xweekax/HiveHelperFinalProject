using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HiveHelper.Models;
using HiveHelper.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HiveHelper.Controllers
{  
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IDataAccessor data;

        public UsersController(IDataAccessor dataAccessor)
        {
            data = dataAccessor;
        }
        private string ParsePassword(string password)
        {
            if (password is null)
            {
                password = "";
            }
            var hasher = SHA256.Create();
            byte[] hashed = hasher.ComputeHash(Encoding.UTF8.GetBytes(password));

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hashed.Length; i++)
            {
                builder.Append(hashed[i].ToString("x2"));
            }
            return builder.ToString();
        }       

        private List<string> GetPermission(long access_level)
        {
            IEnumerable<Permission> permissions = data.GetPermissions(access_level);

            List<string> results = new List<string>();

            foreach(Permission p in permissions)
            {
                results.Add(p.name);
            }

            return results;
        }

        [HttpGet("{username}/{password?}")]
        public Object Login(string username, string password)
        {
            User found = data.GetUser(username);

            bool result;
            string status;
            List<string> permissions = null;

            if(found == null)
            {
                status = "fail no user found";
                result = false;
            }
            else if (found.password == null || found.password == "")
            {
                status = "new";
                result = true;
                permissions = GetPermission(found.access_level);
            }
            else if (found.password == ParsePassword(password))
            {
                status = "success";
                found.password = null;
                result = true;
                permissions = GetPermission(found.access_level);
            }
            else
            {
                status = $"fail password doesn't match \n {found.password} \n {ParsePassword(password)}";
                found = null;
                result = false;
            }
            return new { result, status, user = found, permissions };
        }

        [HttpGet("/available/{username}")]
        public Object AvailableUsername(string username)
        {
            bool result = data.GetUser(username) is null;
            return new { result };
        }

        [HttpPost]
        public Object AddUser(User user)
        {
            bool result = data.AddUser(user);
            return new { result };
        }
        [HttpPut("{username}/{password?}")]
        public Object UpdatePassword(User user, string username, string password)
        {
            string status = "";
            if (password is null)
            {
                password = "";
            }
            dynamic response = Login(username, password);
            bool result;
            if(response.status == "new" || response.status == "success")
            {
                status = user.password;
                user.password = ParsePassword(user.password);
                result = data.UpdateUser(user);
            }
            else
            {
                result = false;
            }
            return new { result, status};
        }
    }
}
