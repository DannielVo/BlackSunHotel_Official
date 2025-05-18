using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.DTOs;

[Route("api/[controller]")]
[ApiController]
public class RoomServiceController : ControllerBase
{
    private readonly HotelContext _context;

    public RoomServiceController(HotelContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoomServices()
    {
        var roomService = await _context.RoomServices.Include(r => r.Room).ToListAsync();

        var serviceDto = roomService.Select(r => r.ToRoomServiceDto()).ToList();

        return Ok(serviceDto);
    }

    [HttpPost]
    public async Task<IActionResult> PostRoomService(CreateRoomServiceDto serviceDto)
    {
        var serviceModel = serviceDto.ToRoomServiceFromCreateDTO();

        _context.RoomServices.Add(serviceModel);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRoomService), new { id = serviceModel.RoomServiceId }, serviceModel.ToRoomServiceDto());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoomService(int id)
    {
        var service = await _context.RoomServices.FindAsync(id);
        if (service == null) return NotFound();
        return Ok(service.ToRoomServiceDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutRoomService([FromRoute] int id, [FromBody] UpdateRoomServiceDto serviceDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var serviceModel = await _context.RoomServices.FirstOrDefaultAsync(x => x.RoomServiceId == id);

        if (serviceModel == null)
        {
            return NotFound();
        }

        serviceModel.RoomId = serviceDto.RoomId;
        serviceModel.Datetime = serviceDto.Datetime;
        serviceModel.RoomServiceStatus = serviceDto.RoomServiceStatus;

        await _context.SaveChangesAsync();

        return Ok(serviceModel.ToRoomServiceDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRoomService(int id)
    {
        var service = await _context.RoomServices.FindAsync(id);
        if (service == null) return NotFound();
        _context.RoomServices.Remove(service);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
