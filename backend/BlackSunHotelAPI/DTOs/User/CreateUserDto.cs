using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlackSunHotelAPI.DTOs
{
    public class CreateUserDto
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsStaff { get; set; }
        public string RoleName { get; set; }
        public string Password { get; set; }
    }
}