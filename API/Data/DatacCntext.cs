using API.Entities;
using Microsoft.EntityFrameworkCore;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUsers> Users{ get; set; }
    public DbSet<UserLike> Likes { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        // During migration  the migration 1st look to this configuartion
        base.OnModelCreating(builder);


        // Customizing the Keys of tables 

        //
        builder.Entity<UserLike>()
            .HasKey(k => new { k.SourceUserId, k.TargetUserId });

        //2 side of relation ship
        builder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserLike>()
            .HasOne(s => s.TargetUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);
            //NOTE======= on MSSQL  we set to   NoAction  

        

    }
}