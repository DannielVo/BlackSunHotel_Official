using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.DTOs;


[Route("api/[controller]")]
[ApiController]
public class ParkingServiceController : ControllerBase
{
    private readonly HotelContext _context;

    public ParkingServiceController(HotelContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetParkingServices()
    {
        var parkings = await _context.ParkingServices.Include(p => p.Booking).ToListAsync();

        var parkingDto = parkings.Select(p => p.ToParkingServiceDto()).ToList();

        return Ok(parkingDto);
    }

    [HttpPost]
    public async Task<IActionResult> PostParkingService(CreateParkingServiceDto serviceDto)
    {
        var parkingModel = serviceDto.ToParkingServiceFromCreateDTO();

        _context.ParkingServices.Add(parkingModel);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetParkingService), new { id = parkingModel.ParkingServiceId }, parkingModel.ToParkingServiceDto());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetParkingService(int id)
    {
        var service = await _context.ParkingServices.FindAsync(id);
        if (service == null) return NotFound();
        return Ok(service.ToParkingServiceDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutParkingService([FromRoute] int id, [FromBody] UpdateParkingServiceDto parkingDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var parkingModel = await _context.ParkingServices.FirstOrDefaultAsync(x => x.ParkingServiceId == id);

        if (parkingModel == null)
        {
            return NotFound();
        }

        parkingModel.BookingId = parkingDto.BookingId;
        parkingModel.ParkingPlateNo = parkingDto.ParkingPlateNo;
        
        await _context.SaveChangesAsync();

        return Ok(parkingModel.ToParkingServiceDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteParkingService(int id)
    {
        var service = await _context.ParkingServices.FindAsync(id);
        if (service == null) return NotFound();
        _context.ParkingServices.Remove(service);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
