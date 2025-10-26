using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.Execution;

namespace API.Helpers
{

    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUsers, MemberDto>()
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain)!.Url));
            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, AppUsers>();

            //Registration Mapper
            CreateMap<RegisterDto, AppUsers>();
            CreateMap<string, DateOnly>().ConvertUsing(s => DateOnly.Parse(s));

            CreateMap<Message, MessageDto>()
                .ForMember(d => d.SenderPhotoUrl,
                    o => o.MapFrom(s => s.Sender.Photos.FirstOrDefault(x => x.IsMain)!.Url))
                .ForMember(d => d.RecipientPhotoUrl,
                    o => o.MapFrom(s => s.Recipient.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        }
    }
}