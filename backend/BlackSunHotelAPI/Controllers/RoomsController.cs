using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomsController(HotelContext context)
        {
            _context = context;
        }

        // GET: api/Rooms
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _context.Rooms
                .Include(r => r.RoomType)
                .ToListAsync();

            var roomDto = rooms.Select(r => r.ToRoomDto()).ToList();

            return Ok(roomDto);
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _context.Rooms
                .Include(r => r.RoomType)
                .FirstOrDefaultAsync(r => r.RoomId == id);

            if (room == null)
                return NotFound();

            return Ok(room.ToRoomDto());
        }

        // POST: api/Rooms
        [HttpPost]
        public async Task<IActionResult> PostRoom(CreateRoomDto roomDto)
        {
            var roomModel = roomDto.ToRoomFromCreateDTO();

            _context.Rooms.Add(roomModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoom), new { id = roomModel.RoomId }, roomModel.ToRoomDto());
        }

        // PUT: api/Rooms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom([FromRoute] int id, [FromBody] UpdateRoomDto roomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var roomModel = await _context.Rooms.FirstOrDefaultAsync(x => x.RoomId == id);

            if (roomModel == null)
            {
                return NotFound();
            }

            roomModel.RoomTitle = roomDto.RoomTitle;
            roomModel.RoomTypeId = roomDto.RoomTypeId;
            roomModel.RoomDescription = roomDto.RoomDescription;
            roomModel.RoomImage = roomDto.RoomImage;
            roomModel.RoomStatus = roomDto.RoomStatus;
            
            await _context.SaveChangesAsync();

            return Ok(roomModel.ToRoomDto());
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
                return NotFound();

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomExists(int id)
        {
            return _context.Rooms.Any(r => r.RoomId == id);
        }
    }
}
