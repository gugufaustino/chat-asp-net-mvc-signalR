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
        public NotificationHub(IHttpContextAccessor httpContextAccessor )
        {
            HttpContextAccessor = httpContextAccessor;
        }
    
        public IHttpContextAccessor HttpContextAccessor { get; }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
  

    }
}