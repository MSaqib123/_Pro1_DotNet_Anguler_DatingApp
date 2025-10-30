using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (context.Users.Any()) return;

        var userData = File.ReadAllText("Data/UserSeedData.json");
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options)!;
        
        foreach (var user in users) 
        {
            using var hmac = new HMACSHA512();
            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
}
