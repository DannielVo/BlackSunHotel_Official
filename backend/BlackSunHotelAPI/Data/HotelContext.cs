using Microsoft.EntityFrameworkCore;
using BlackSunHotelAPI.Models;

public class HotelContext : DbContext
{
    public HotelContext(DbContextOptions<HotelContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<RoomType> RoomTypes { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<BookingDetail> BookingDetails { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<RoomService> RoomServices { get; set; }
    public DbSet<ParkingService> ParkingServices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany()
            .HasForeignKey(b => b.UserId);

        modelBuilder.Entity<Booking>()
            .HasMany(b => b.BookingDetails)
            .WithOne(d => d.Booking)
            .HasForeignKey(d => d.BookingId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BookingDetail>()
            .HasOne(bd => bd.Booking)
            .WithMany(b => b.BookingDetails)
            .HasForeignKey(bd => bd.BookingId);

        modelBuilder.Entity<BookingDetail>()
            .HasOne(bd => bd.Room)
            .WithMany()
            .HasForeignKey(bd => bd.RoomId);

    }
}

