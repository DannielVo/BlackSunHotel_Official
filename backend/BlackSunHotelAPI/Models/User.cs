namespace BlackSunHotelAPI.Models
{    
    public class User
    {
        public int UserId { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsStaff { get; set; }
        public string RoleName { get; set; }
        public string PasswordHash { get; set; }
    }
}
