using System.ComponentModel.DataAnnotations;

namespace API.Entities;
public class AppUsers
{

    public int Id { get; set; }
    //[Required]
    public required string UserName { get; set; }
}