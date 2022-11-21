# chat-asp-net-mvc-signalR
[![Build & Test](https://github.com/gugufaustino/chat-asp-net-mvc-signalR/actions/workflows/dotnet.yml/badge.svg)](https://github.com/gugufaustino/chat-asp-net-mvc-signalR/actions/workflows/dotnet.yml)

Live Demo https://m5-chat-demo.azurewebsites.net/

Projeto academico para a disciplina Fundamentos de Redes de Computadores do curso ANALISE E DESENVOLVIMENTO DE SISTEMAS da Universidade do Vale do Rio dos Sinos (UNISINOS).
Tarefa M5, fazer uma aplicação com uso de sockets.


#### INTERFACE

Foi utilizado o framework front-end bootstrap para elaborar a interface com padrão e aspecto bonito.

#### APLICAÇÃO

Foi utilizado a tecnologia ASP.NET Core MVC versão 6.0 para ser o servidor. Essa aplicação ela tem a responsabilidade de servir conteudo html, no caso o site, e manter os agentes conectados ao websocket.

#### SOCKET

A implementação do socket client/server foi abstraida usando o SignalR uma biblioteca para desenvolvedores que faz uso do WebSocket, uma API HTML5 que permite a comunicação bidirecional entre o navegador e o servidor.
O ASP.NET Core suporta Websocket sem a necessidade de usar SignalR, ainda assim a propria documentação da microsoft sugere o uso "For most applications, we recommend SignalR rather than raw WebSockets. SignalR:" fonte:
 https://learn.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-7.0

##### Referências
<sub>Documentação das tecnologias utilizadas</sub>
> - ASP.NET Core MVC https://learn.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-6.0
> - ASP.NET Core SignalR - https://dotnet.microsoft.com/en-us/apps/aspnet/signalr
> - Bootstrap - https://getbootstrap.com/
