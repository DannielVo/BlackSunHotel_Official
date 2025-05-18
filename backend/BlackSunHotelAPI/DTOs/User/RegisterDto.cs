namespace BlackSunHotelAPI.DTOs
{
    public class RegisterDto
    {
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public bool IsStaff { get; set; }
        public string RoleName { get; set; } = "Customer";
    }
}
