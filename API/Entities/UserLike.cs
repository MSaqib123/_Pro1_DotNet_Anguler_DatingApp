using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserLike
    {
        //=== user that Doing the Like ===
        public AppUsers SourceUser { get; set; } = null!;
        public int SourceUserId { get; set; }


        //=== user that is being liked or ===
        //=== like recieving user ===
        public AppUsers TargetUser { get; set; } = null!;
        public int TargetUserId { get; set; }

    }
}