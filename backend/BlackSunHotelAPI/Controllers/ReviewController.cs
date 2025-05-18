using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController : ControllerBase
{
    private readonly HotelContext _context;

    public ReviewsController(HotelContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetReviews()
    {
        var reviews = await _context.Reviews
            .Include(r => r.User)
            .Include(r => r.Booking)
            .ToListAsync();

        var reviewDto = reviews.Select(r => r.ToReviewDto()).ToList();

        return Ok(reviewDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
        var review = await _context.Reviews.FindAsync(id);
        if (review == null) return NotFound();
        return Ok(review.ToReviewDto());
    }

    [HttpPost]
    public async Task<IActionResult> PostReview(CreateReviewDto reviewDto)
    {
        var reviewModel = reviewDto.ToReviewFromCreateDTO();

        _context.Reviews.Add(reviewModel);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetReview), new { id = reviewModel.ReviewId }, reviewModel.ToReviewDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutReview([FromRoute] int id, [FromBody] UpdateReviewDto reviewDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var reviewModel = await _context.Reviews.FirstOrDefaultAsync(x => x.ReviewId == id);

        if (reviewModel == null)
        {
            return NotFound();
        }

        reviewModel.UserId = reviewDto.UserId;
        reviewModel.BookingId = reviewDto.BookingId;
        reviewModel.ReviewContent = reviewDto.ReviewContent;
        reviewModel.Rating = reviewModel.Rating;

        await _context.SaveChangesAsync();

        return Ok(reviewModel.ToReviewDto());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
        var review = await _context.Reviews.FindAsync(id);
        if (review == null) return NotFound();
        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("findByUser/{userId}")]
    public async Task<IActionResult> FindReviewByUserId(int userId)
    {
        var reviews = await _context.Reviews
            .Where(b => b.UserId == userId)
            .ToListAsync();

        if (reviews == null || reviews.Count == 0)
        {
            return NotFound(new { Message = "No reviews found for this user." });
        }

        return Ok(reviews);
    }
}
