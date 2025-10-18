using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }


    
    public async Task<AppUsers?> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<AppUsers?> GetUserByUsernameAsync(string username)
    {
        return await _context.Users
            .Include(x=>x.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
    }   

    public async Task<IEnumerable<AppUsers>> GetUsersAsync()
    {
        return await _context.Users
            .Include(x=>x.Photos)
            .ToListAsync();
    }


    public void Update(AppUsers user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    
}