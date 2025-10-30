using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = File.ReadAllText("Data/UserSeedData.json");
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options)!;
        if (users == null) return;

        var roles = new List<AppRole>
        {
            new() {Name = "Member"},
            new() {Name = "Admin"},
            new() {Name = "Moderator"},
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }


        foreach (var user in users)
        {
            user.UserName = user.UserName!.ToLower();
            await userManager.CreateAsync(user, "Saqib12345.");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new AppUser
        {
            UserName = "admin",
            KnownAs = "Admin",
            Gender = "",
            City = "",
            Country = "",
        };

        await userManager.CreateAsync(admin, "Saqib12345.");
        await userManager.AddToRolesAsync(admin, ["Admin","Moderator"]);
    }
}


// using System;
// using System.Security.Cryptography;
// using System.Text;
// using System.Text.Json;
// using API.Entities;

// namespace API.Data;

// public class Seed
// {
//     public static async Task SeedUsers(DataContext context)
//     {
//         if (context.Users.Any()) return;

//         var userData = File.ReadAllText("Data/UserSeedData.json");
//         var options = new JsonSerializerOptions
//         {
//             PropertyNameCaseInsensitive = true
//         };
//         var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options)!;
        
//         foreach (var user in users) 
//         {
//             using var hmac = new HMACSHA512();
//             context.Users.Add(user);
//         }

//         await context.SaveChangesAsync();
//     }
// }
