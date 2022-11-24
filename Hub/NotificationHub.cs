using Microsoft.AspNetCore.SignalR;

namespace m5_chat
{

    // O SignalR abstrai implemtações conforme mencionado, mas é nessa classe que gerenciamos o Hub de conexções no lado do server.
    /*
        o objeto Clients é fornecido pela classe base Hub, ela mantem todos os agentes conectados atraves de uma chave unica("ConnectionId") para cada agente;
        Temos três ponto de interação client-server aqui:
            OnConnected - acionado pelo cliente quando a conexão é criada no js. Aqui ao ser acionado invoca a todos os cliente(Clients.All) conforme código abaixo;
            OnDisconnected - acionado pelo cliente quando a conexão é encerrada pelo navegado(navegador fechado). Aqui ao ser acionado invoca a todos os cliente(Clients.All) conforme código abaixo:
            SendMessage - acionado no chat.js linha 38, no clinte quando ele quer explicitamente executar algo no servidor, aqui no caso enviar mensagem(SendMessage).
            
    */

    public class NotificationHub : Hub
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>(); // mantem conjunto de clients conectados
        public IHttpContextAccessor HttpContextAccessor { get; } // não esta sendo utilizado, mas forneces acesso ao request do usuário, logo em app mais complexos tem utilizade.
        public NotificationHub(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }


        public async Task SendMessage(string user, string message) 
        {
            // quando um cliente envia uma mensagem ao servidor, logo o servidor devolve a todos agentes conectador, acionado respectivamente o "ReceiveMessage" nos js chat.js linha 28

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public override Task OnConnectedAsync()
        {
            ConnectedIds.Add(Context.ConnectionId);
            Clients.All.SendAsync("UsersCount", Context.ConnectionId, ConnectedIds.Count); // invoca o metodo UsersCount(chat.js linha 33) no client(js) e envia a quantidade de usuários conectados
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedIds.Remove(Context.ConnectionId);
            Clients.All.SendAsync("UsersCount", Context.ConnectionId, ConnectedIds.Count); // invoca o metodo UsersCount(chat.js linha 33) no client(js) e envia a quantidade de usuários conectados
            return base.OnDisconnectedAsync(exception);
        }


    }
}