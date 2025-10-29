using System;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

//bredge table b/w   appuser / approle
public class AppUserRole : IdentityUserRole<int>
{
    public AppUser User { get; set; } = null!;

    public AppRole Role { get; set; } = null!;

}
