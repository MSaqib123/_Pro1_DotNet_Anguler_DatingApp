using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext _context,IMapper mapper) : IUserRepository
{
    
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await _context.Users
            .Include(x=>x.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
    }   

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await _context.Users
            .Include(x=>x.Photos)
            .ToListAsync();
    }


    public void Update(AppUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }



    

    // public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
    {
        //var query = _context.Users.ProjectTo<MemberDto>(mapper.ConfigurationProvider).Where(x=>x.UserName != userParams.CurrentUsername);
        // return await PagedList<MemberDto>.CreateAsync(query,userParams.PageNumber, userParams.PageSize);

        //=========== Filtration ===========
        // Execude currentUser
        var query = _context.Users.AsQueryable();
        query = query.Where(x => x.UserName != userParams.CurrentUsername);
        // Gender Filter
        if (userParams.Gender != null)
        {
            query = query.Where(x => x.Gender == userParams.Gender);
        }

        // Age Filtration
        var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge-1));
        var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));
        query = query.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);

        // Order by
        query = userParams.OrderBy switch
        {
            "created" => query.OrderByDescending(x => x.Created),
            _ => query.OrderByDescending(x => x.LastActive)
        };

        return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(
                mapper.ConfigurationProvider),
                userParams.PageNumber,
                userParams.PageSize
            );

        // return await _context
        // .Users
        // // .Skip(5)
        // // .Take(5)
        // .ProjectTo<MemberDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<MemberDto?> GetMemberAsync(string username)
    {
        return await _context.Users.Where(x=>x.UserName == username).ProjectTo<MemberDto>(mapper.ConfigurationProvider).SingleOrDefaultAsync();
    }
}