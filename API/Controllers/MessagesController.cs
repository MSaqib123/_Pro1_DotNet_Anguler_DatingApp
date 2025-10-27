using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController(
        IMessageRepository messageRepository,
        IUserRepository userRepository,
        IMapper mapper
        ) : BaseApiController
    {
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();
            if (username == createMessageDto.RecipientUsername!.ToLower())
            {
                return BadRequest("You cannot message yourself");
            }

            var sender = await userRepository.GetUserByUsernameAsync(username);
            var recipient = await userRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null || sender == null) return BadRequest("Cannot Send message at this time");
            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = recipient.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            if (await messageRepository.SaveAllAsync()) return Ok(mapper.Map<MessageDto>(message));

            return BadRequest("Failed to Save message");
        }
    }
}