using System;
using System.Security.Cryptography;
using System.Text;
using API.Entities;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (context.Users.Any()) return;

        var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        var options = new System.Text.Json.JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var users = System.Text.Json.JsonSerializer.Deserialize<List<AppUser>>(userData, options);
        
        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();
            user.UserName = user.UserName.ToLower();
            context.Users.Add(user);
        }

        context.SaveChanges();
    }
}
