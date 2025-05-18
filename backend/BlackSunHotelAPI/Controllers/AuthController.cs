using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly HotelContext _context;
    private readonly JwtService _jwtService;

    public AuthController(HotelContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(RegisterDto dto)
    {
        if (_context.Users.Any(u => u.Email == dto.Email))
            return BadRequest("Email already in use.");

        var user = new User
        {
            Fullname = dto.Fullname,
            Email = dto.Email,
            Phone = dto.Phone,
            RoleName = dto.RoleName,
            IsStaff = dto.IsStaff,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User created successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var token = _jwtService.GenerateToken(user);

        return Ok(new { token, user });
    }
}