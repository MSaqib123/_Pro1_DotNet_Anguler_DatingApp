using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities;

public class AppUsers
{
    public int Id { get; set; }
    public required string UserName { get; set; }

    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];

    public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime LastActive { get; set; } = DateTime.Now;
    public required string Gender { get; set; }

    public string? Introduction { get; set; }
    public string? Interests { get; set; }
    public string? LookingFor { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }

    public List<Photo> Photos { get; set; } = [];

    //=========== 1st Way =======
    #region 1st Way
    //====  M to M ====
    // public List<AppUsers> LikedByUsers { get; set; } = [];
    // public List<AppUsers> LikedUsers { get; set; } = [];

    // execute4 the  command  'dotnet ef  migrations add userLikedsAdded'

    // but we will not use this feature becuazse its generate the table by it self
    // which name is   = AppUsersAppUsers   not correct so we
    // will generate manulaly  M to M realteion 
    // by adding 3rd model 

    // ef migration remove
    #endregion


    //=========== 2nd Way =======
    #region 2nd Way 
    // add 3rd table   UserLike table in Entity folder simple 
    // add the  both table  relation ther with there ids hahahaha

    // list of user  liked by
    public List<UserLike> LikedByUsers { get; set; } = [];

    // list of user which has like
    public List<UserLike> LikedUsers { get; set; } = [];

    // now set the dbcontext db set for this table
    // and set  foriegn key constraint
    #endregion  

    // public int GetAge()
    // {
    //     return DateOfBirth.CalculateAge();
    // }
}
