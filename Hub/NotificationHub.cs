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
        private readonly static ConnectionMapping<NotificationClient> _connections = new();
        public IHttpContextAccessor HttpContextAccessor { get; }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        // public override Task OnConnectedAsync()
        // {
        //     var operador = GetOperador();
        //     _connections.Add(GetOperador(), Context.ConnectionId);
        //     JoinGroups(operador);
        //     return base.OnConnectedAsync();
        // }


        // public override Task OnDisconnectedAsync(Exception stopCalled)
        // {
        //     _connections.Remove(GetOperador(), Context.ConnectionId);

        //     return base.OnDisconnectedAsync(stopCalled);
        // }
 

        // private void JoinGroups(NotificationClient operador)
        // {
        //     var connIds = _connections.GetConnections(operador);
        //     foreach (var groupName in operador.Groups)
        //     {
        //         foreach (var connectionId in connIds)
        //         {
        //             Groups.AddToGroupAsync(connectionId, groupName);
        //         }
        //     }
        // }

        // private void LeaveGroup(string groupName)
        // {
        //     Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        // }

        // private NotificationClient GetOperador()
        // {
        //     var nomeusuario = HttpContextAccessor.HttpContext.Request.Form["nomeusuario"];
        //     var opCliente = new NotificationClient
        //     {                
        //         Name = nomeusuario,
        //     };            
        //      return opCliente;
        // }

    }
}