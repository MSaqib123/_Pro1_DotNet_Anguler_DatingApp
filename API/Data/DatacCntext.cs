using API.Entities;
using Microsoft.EntityFrameworkCore;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUsers> Users{ get; set; }
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        // During migration  the migration 1st look to this configuartion
        base.OnModelCreating(builder);


        // Customizing the Keys of tables 

        //===========
        //=========== UserLike Relation ===========
        //===========
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

        //===========
        //=========== Messages Relation ===========
        //===========
        builder.Entity<Message>()
            .HasOne(x => x.Recipient)
            .WithMany(x => x.MessageReceived)
            .OnDelete(DeleteBehavior.Restrict);
        builder.Entity<Message>()
            .HasOne(x => x.Sender)
            .WithMany(x => x.MessageSent)
            .OnDelete(DeleteBehavior.Restrict);
        

    }
}