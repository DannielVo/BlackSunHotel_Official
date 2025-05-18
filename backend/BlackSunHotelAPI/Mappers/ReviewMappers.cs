using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlackSunHotelAPI.DTOs;
using BlackSunHotelAPI.Models;

namespace BlackSunHotelAPI.Mappers
{
    public static class ReviewMappers
    {
        public static ReviewDto ToReviewDto(this Review reviewModel){
            return new ReviewDto
            {
                ReviewId = reviewModel.ReviewId,
                UserId = reviewModel.UserId,
                BookingId = reviewModel.BookingId,
                ReviewContent = reviewModel.ReviewContent,
                Rating = reviewModel.Rating,
                User = reviewModel.User,
                Booking = reviewModel.Booking
            };
        }

        public static Review ToReviewFromCreateDTO(this CreateReviewDto reviewDto)
        {
            return new Review
            {
                UserId = reviewDto.UserId,
                BookingId = reviewDto.BookingId,
                ReviewContent = reviewDto.ReviewContent,
                Rating = reviewDto.Rating,
            };
        }
    }
}