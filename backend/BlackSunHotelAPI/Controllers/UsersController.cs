using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.DTOs;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly HotelContext _context;

    public UsersController(HotelContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult>  GetUsers() {
        var users = await _context.Users.ToListAsync();

        var userDto = users.Select(u => u.ToUserDto()).ToList();

        return Ok(userDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult>  GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        return user == null ? NotFound() : Ok(user.ToUserDto());
    }

    [HttpPost]
    public async Task<IActionResult>  PostUser(CreateUserDto userDto)
    {
        var userModel = userDto.ToUserFromCreateDTO();

        _context.Users.Add(userModel);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUser), new { id = userModel.UserId }, userModel.ToUserDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] UpdateUserDto userDto)
    {
         if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userModel = await _context.Users.FirstOrDefaultAsync(x => x.UserId == id);

        if (userModel == null)
        {
            return NotFound();
        }

        userModel.Fullname = userDto.Fullname;
        userModel.Email = userDto.Email;
        userModel.Phone = userDto.Phone;
        userModel.RoleName = userDto.RoleName;
        userModel.IsStaff = userDto.IsStaff;            

        await _context.SaveChangesAsync();

        return Ok(userModel.ToUserDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
