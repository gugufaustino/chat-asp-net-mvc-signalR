//Classe de configuração de um projeto .NET, nessa que incluimos o SignalR para abstrair as implementações de websocket

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddControllersWithViews();

//SignalR incluido no projeto
builder.Services.AddSignalR(i=> {
                i.EnableDetailedErrors = true;
                i.MaximumReceiveMessageSize = long.MaxValue;
            });


var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");    
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// SignalR configurado, cria o Hub de conexões gerenciados e endpoint ponto de comunicação bi-derecional
app.MapHub<m5_chat.NotificationHub>("/chatHub");
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();
