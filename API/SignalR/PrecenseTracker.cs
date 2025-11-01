using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    // this is to presist the data to locally not good but only for startup
    public class PrecenseTracker
    {
        //old C#
        // private static readonly Dictionary<string, List<string>> OnlineUsers = new Dictionary<string, List<string>>();

        //C# 12
        private static readonly Dictionary<string, List<string>> OnlineUsers = [];

        public Task UserConnected(string username, string connectionId)
        {
            lock (OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(username))
                {
                    OnlineUsers[username].Add(connectionId);
                }
                else
                {
                    // old C#
                    // OnlineUsers.Add(username, new List<string> { connectionId} );

                    // C# 12
                    OnlineUsers.Add(username, [connectionId]);
                }
            }
            return Task.CompletedTask;
        }

        public Task UserDisconnected(string username, string connectionId)
        {
            lock (OnlineUsers)
            {
                if (!OnlineUsers.ContainsKey(username)) return Task.CompletedTask;

                OnlineUsers[username].Remove(connectionId);

                if (OnlineUsers[username].Count == 0)
                {
                    OnlineUsers.Remove(username);
                }
            }
            return Task.CompletedTask;
        }


        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;
            lock (OnlineUsers)
            {
                onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }
            return Task.FromResult(onlineUsers);
        }
    }

    
}