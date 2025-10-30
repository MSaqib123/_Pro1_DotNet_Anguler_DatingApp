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
    public static async Task SeedUsers(UserManager<AppUser> userManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = File.ReadAllText("Data/UserSeedData.json");
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options)!;
        
        foreach (var user in users)
        {
            user.UserName = user.UserName!.ToLower();
            await userManager.CreateAsync(user, "Saqib12345.");
        }
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
