using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.DTOs;

[ApiController]
[Route("api/[controller]")]
public class BookingDetailsController : ControllerBase
{
    private readonly HotelContext _context;

    public BookingDetailsController(HotelContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBookingDetails()
    {
        var bookingDetails = await _context.BookingDetails
            .Include(bd => bd.Room)
            .Include(bd => bd.Booking)
            .ToListAsync();

        var bookingDetailDto = bookingDetails.Select(bd => bd.ToBookingDetailDto());

        return Ok(bookingDetailDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookingDetail(int id)
    {
        var detail = await _context.BookingDetails
            .Include(bd => bd.Room)
            .Include(bd => bd.Booking)
            .FirstOrDefaultAsync(bd => bd.BookingDetailId == id);

        if (detail == null)
            return NotFound();

        return Ok(detail.ToBookingDetailDto());
    }

    [HttpPost]
    public async Task<IActionResult> PostBookingDetail(CreateBookingDetailDto detailDto)
    {
        var detailModel = detailDto.ToBookingDetailFromCreateDTO();

        _context.BookingDetails.Add(detailModel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBookingDetail), new { id = detailModel.BookingDetailId }, detailModel.ToBookingDetailDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBookingDetail([FromRoute] int id, [FromBody] UpdateBookingDetailDto bookingDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var detailModel = await _context.BookingDetails.FirstOrDefaultAsync(x => x.BookingDetailId == id);

        if (detailModel == null)
        {
            return NotFound();
        }

        detailModel.BookingId = bookingDto.BookingId;
        detailModel.RoomId = bookingDto.RoomId;
        
        await _context.SaveChangesAsync();

        return Ok(detailModel.ToBookingDetailDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBookingDetail(int id)
    {
        var detail = await _context.BookingDetails.FindAsync(id);
        if (detail == null)
            return NotFound();

        _context.BookingDetails.Remove(detail);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
