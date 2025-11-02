using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.SignalR;
// this is to presist the data to locally not good but only for startup
public class PrecenseTracker
{
    //old C#
    // private static readonly Dictionary<string, List<string>> OnlineUsers = new Dictionary<string, List<string>>();

    //C# 12
    private static readonly Dictionary<string, List<string> > OnlineUsers = [];

    public Task<bool> UserConnected(string username, string connectionId)
    {
        var isOnline = false;
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
                isOnline = true;
            }
        }
        return Task.FromResult(isOnline);
        // return Task.CompletedTask;
    }

    public Task<bool> UserDisconnected(string username, string connectionId)
    {
        var isOffline = false;
        lock (OnlineUsers)
        {
            if (!OnlineUsers.ContainsKey(username)) return Task.FromResult(isOffline);

            OnlineUsers[username].Remove(connectionId);

            if (OnlineUsers[username].Count == 0)
            {
                OnlineUsers.Remove(username);
                isOffline = true;
            }
        }
        return Task.FromResult(isOffline);
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

    public static Task<List<string>> GetConnectionsForUser(string username)
    {
        List<string> connectionIds;
        if (OnlineUsers.TryGetValue(username, out var connections))
        {
            lock (connections)
            {
                connectionIds = connections.ToList();
            }

        }
        else
        {
            connectionIds = [];
        }

        return Task.FromResult(connectionIds);
    }


}
