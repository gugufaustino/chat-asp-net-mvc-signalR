using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Http;

namespace m5_chat
{
    public class NotificationHub : Hub
    {


        public NotificationHub(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }

        public static HashSet<string> ConnectedIds = new HashSet<string>();

        public IHttpContextAccessor HttpContextAccessor { get; }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public override Task OnConnectedAsync()
        {
            ConnectedIds.Add(Context.ConnectionId);
            Clients.All.SendAsync("UsersCount", Context.ConnectionId, ConnectedIds.Count);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            ConnectedIds.Remove(Context.ConnectionId);
            Clients.All.SendAsync("UsersCount", Context.ConnectionId, ConnectedIds.Count);
            return base.OnDisconnectedAsync(exception);
        }


    }
}