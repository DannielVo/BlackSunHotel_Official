using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;
using BlackSunHotelAPI.Mappers;
using BlackSunHotelAPI.DTOs;

namespace BlackSunHotelAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomTypesController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomTypesController(HotelContext context)
        {
            _context = context;
        }

        // GET: api/RoomTypes
        [HttpGet]
        public async Task<IActionResult> GetRoomTypes()
        {
            var roomTypes = await _context.RoomTypes.ToListAsync();

            var roomTypeDto = roomTypes.Select(r => r.ToRoomTypeDto()).ToList();

            return Ok(roomTypeDto);
        }

        // GET: api/RoomTypes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);

            if (roomType == null)
                return NotFound();

            return Ok(roomType.ToRoomTypeDto());
        }

        // POST: api/RoomTypes
        [HttpPost]
        public async Task<IActionResult> PostRoomType(CreateRoomTypeDto roomTypeDto)
        {
            var roomTypeModel = roomTypeDto.ToRoomTypeFromCreateDTO();

            _context.RoomTypes.Add(roomTypeModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomType), new { id = roomTypeModel.RoomTypeId }, roomTypeModel.ToRoomTypeDto());
        }

        // PUT: api/RoomTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomType([FromRoute] int id, [FromBody] UpdateRoomTypeDto roomTypeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var typeModel = await _context.RoomTypes.FirstOrDefaultAsync(x => x.RoomTypeId == id);

            if (typeModel == null)
            {
                return NotFound();
            }

            typeModel.RoomTypeName = roomTypeDto.RoomTypeName;
            typeModel.RoomDesc = roomTypeDto.RoomDesc;
            typeModel.RoomFeatures = roomTypeDto.RoomFeatures;
            typeModel.RoomAmenities = roomTypeDto.RoomAmenities;
            typeModel.RoomImg = roomTypeDto.RoomImg;
            typeModel.MaxNoPeople = roomTypeDto.MaxNoPeople;
            typeModel.RoomPrice = roomTypeDto.RoomPrice;
            
            await _context.SaveChangesAsync();

            return Ok(typeModel.ToRoomTypeDto());
        }

        // DELETE: api/RoomTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
                return NotFound();

            _context.RoomTypes.Remove(roomType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomTypeExists(int id)
        {
            return _context.RoomTypes.Any(e => e.RoomTypeId == id);
        }
    }
}
