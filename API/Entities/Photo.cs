namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }


    // Navigation Properites
    #region  Navigation Properites
    public int AppUserId { get; set; }
    public AppUsers AppUser { get; set; } = null!;
    #endregion
}