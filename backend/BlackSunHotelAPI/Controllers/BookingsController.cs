using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly HotelContext _context;

    public BookingsController(HotelContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBookings()
    {
        var bookings = await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.BookingDetails)
                .ThenInclude(d => d.Room)
            .ToListAsync();

        var bookingDto = bookings.Select(b => b.ToBookingDto()).ToList();

        return Ok(bookingDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBooking(int id)
    {
        var booking = await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.BookingDetails)
                .ThenInclude(d => d.Room)
            .FirstOrDefaultAsync(b => b.BookingId == id);

        if (booking == null)
            return NotFound();

        return Ok(booking.ToBookingDto());
    }

    [HttpPost]
    public async Task<ActionResult<Booking>> PostBooking(CreateBookingDto bookingDto)
    {
        var booking = bookingDto.ToBookingFromCreateDTO();

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        foreach (var roomId in bookingDto.RoomIds)
        {
            _context.BookingDetails.Add(new BookingDetail
            {
                BookingId = booking.BookingId,
                RoomId = roomId
            });

            var room = await _context.Rooms.FindAsync(roomId);
            if (room != null)
            {
                room.RoomStatus = "booked";
                _context.Rooms.Update(room);
            }
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingId }, booking.ToBookingDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBooking([FromRoute] int id, [FromBody] UpdateBookingDto bookingDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var bookingModel = await _context.Bookings.FirstOrDefaultAsync(x => x.BookingId == id);

        if (bookingModel == null)
        {
            return NotFound();
        }

        bookingModel.UserId = bookingDto.UserId;
        bookingModel.Fullname = bookingDto.Fullname;
        bookingModel.Email = bookingDto.Email;
        bookingModel.Phone = bookingDto.Phone;
        bookingModel.CheckInDate = bookingDto.CheckInDate;
        bookingModel.CheckOutDate = bookingDto.CheckOutDate;
        bookingModel.TotalPrice = bookingDto.TotalPrice;
        bookingModel.PaymentStatus = bookingDto.PaymentStatus;

        await _context.SaveChangesAsync();

        return Ok(bookingModel.ToBookingDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var booking = await _context.Bookings.Include(b => b.BookingDetails).FirstOrDefaultAsync(b => b.BookingId == id);
        if (booking == null)
            return NotFound();

        // Cập nhật trạng thái phòng
        foreach (var detail in booking.BookingDetails)
        {
            var room = await _context.Rooms.FindAsync(detail.RoomId);
            if (room != null)
            {
                room.RoomStatus = "available";
                _context.Rooms.Update(room);
            }
        }

        _context.Bookings.Remove(booking);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("checkAvailability")]
    public async Task<IActionResult> CheckAvailability([FromBody] RoomAvailabilityRequest request)
    {
        if (request.NumberOfRooms <= 0 || request.NumberOfPeople <= 0 || request.CheckInDate >= request.CheckOutDate)
            return BadRequest("Invalid input.");

        var checkIn = request.CheckInDate.Date;
        var checkOut = request.CheckOutDate.Date;

        // Lấy tất cả phòng trống trong khoảng thời gian
        var unavailableRoomIds = await _context.BookingDetails
            .Include(bd => bd.Booking)
            .Where(bd =>
                (bd.Booking.CheckInDate < checkOut) &&
                (bd.Booking.CheckOutDate > checkIn)
            )
            .Select(bd => bd.RoomId)
            .Distinct()
            .ToListAsync();

        var availableRooms = await _context.Rooms
            .Include(r => r.RoomType)
            .Where(r => !unavailableRoomIds.Contains(r.RoomId) && r.RoomStatus == "available")
            .ToListAsync();

        // Tạo các tổ hợp phòng
        var roomCombinations = GetValidRoomCombinations(
            availableRooms,
            request.NumberOfRooms,
            request.NumberOfPeople
        );

        return Ok(roomCombinations);
    }

    private List<List<Room>> GetValidRoomCombinations(List<Room> rooms, int numberOfRooms, int numberOfPeople)
    {
        var results = new List<List<Room>>();
        var combination = new List<Room>();

        void Backtrack(int start)
        {
            if (combination.Count == numberOfRooms)
            {
                int totalCapacity = combination.Sum(r => r.RoomType.MaxNoPeople);
                if (totalCapacity >= numberOfPeople)
                    results.Add(new List<Room>(combination));
                return;
            }

            for (int i = start; i < rooms.Count; i++)
            {
                combination.Add(rooms[i]);
                Backtrack(i + 1);
                combination.RemoveAt(combination.Count - 1);
            }
        }

        Backtrack(0);
        return results;
    }

    [HttpGet("findByUser/{userId}")]
    public async Task<IActionResult> FindBookingByUserId(int userId)
    {
        var bookings = await _context.Bookings
            .Include(b => b.BookingDetails)
                .ThenInclude(bd => bd.Room)
                    .ThenInclude(r => r.RoomType)
            .Where(b => b.UserId == userId)
            .ToListAsync();

        if (bookings == null || bookings.Count == 0)
        {
            return NotFound(new { Message = "No bookings found for this user." });
        }

        return Ok(bookings);
    }
}
