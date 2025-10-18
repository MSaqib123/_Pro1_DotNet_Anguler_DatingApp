using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext _context,IMapper mapper) : IUserRepository
{
    
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



    

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await _context.Users.ProjectTo<MemberDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<MemberDto?> GetMemberAsync(string username)
    {
        return await _context.Users.Where(x=>x.UserName == username).ProjectTo<MemberDto>(mapper.ConfigurationProvider).SingleOrDefaultAsync();
    }
}