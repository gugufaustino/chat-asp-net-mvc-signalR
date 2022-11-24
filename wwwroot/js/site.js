/*
    

    Este arquivo faz a manipuação da interface/DOM para que a interface se comporte como um chat e também faz envio de mensagem ao servidor: 
    - Possibilita entrar com um nome qualquer;
    - Possibilita enviar mensagem ao servidor;
    - Quando servidor envia ao navegador faz algumas manipulações para que o chat tenha o aspecto de chat tradicional:
        - - Basicamente adiciona na div de mensagens a mensagem de cada usuário, fazendo controle para por na direita as "minhas mensagens" e no lado esquerdo "mensagem de outro usuário


*/

var _user = "";


/* Este pondo é o envio de uma mensagem ao servidor
*/
function postMinhaMensagem() {
    var minhaMens = document.getElementById("txtMessage").value;
    if (minhaMens !== null && minhaMens !== "") {
        
        //função no chat.js que envia ao servidor a mensagem
        invokeSendMessage(_user, minhaMens);       

        event.preventDefault();
        document.getElementById("txtMessage").value = "";
    }
}

/* Desse metodo para baixo são funções para manipulação da interface
 */
function entrar() {
    desabilitarNome();
    habilitarEnviar();
    toggleEntrarSair(true);

    document.getElementById("txtMessage").focus();
}

function sair() {
    limparMensagens();
    desabilitarBoxGrupo();
    desabilitarEnviar();
    limparNome();
    habilitaNome();
    toggleEntrarSair(false);
}



function toggleEntrarSair(entrar) {
    if (entrar) {
        document.getElementById("btnEntrar").classList.add("d-none");
        document.getElementById("btnSair").classList.remove("d-none");
    } else {
        document.getElementById("btnEntrar").classList.remove("d-none");
        document.getElementById("btnSair").classList.add("d-none");
    }
}

function limparMensagens() {
    const el = document.getElementById("box-message-group");
    el.innerHTML = "";
}

function desabilitarBoxGrupo() {
    const el = document.getElementById("box-message-group").classList.add("disableBoxGroup");
}
function habilitarBoxGrupo() {
    const el = document.getElementById("box-message-group").classList.remove("disableBoxGroup");
}

function desabilitarEnviar() {
    const eltxtMessage = document.getElementById("txtMessage");
    const elEnviar = document.getElementById("btnEnviar");
    eltxtMessage.disabled = true;
    eltxtMessage.value = "";
    elEnviar.disabled = true;
}
function desabilitarNome() {
    const elTxtNome = document.getElementById("txtNome");
    _user = elTxtNome.value;
    elTxtNome.disabled = true;
}
function habilitaNome() {
    const elTxtNome = document.getElementById("txtNome");
    elTxtNome.disabled = false;
}

function limparNome() {
    document.getElementById("txtNome").value = "";
    _user = "";
}
function habilitarEnviar() {
    const eltxtMessage = document.getElementById("txtMessage");
    const elEnviar = document.getElementById("btnEnviar");
    eltxtMessage.disabled = false;
    elEnviar.disabled = false;
}

document.getElementById("txtMessage").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !document.getElementById("btnEnviar").disabled ) {
      event.preventDefault();
      document.getElementById("btnEnviar").click();
    }
  });


function postMessage(texto, user) {
    let minhaMensagem = user == _user;
    if (minhaMensagem) {
        if (!minhaUltimaMensagem()) $("#box-message-group").append(montarMensagen(true));
        adicionarMensagem(texto, true, user);
    } else {
        if (!mesmoUsuarioUltimaMensagagem(user)) $("#box-message-group").append(montarMensagen(false));
        adicionarMensagem(texto, false, user);
    }

    let boxMessage = document.getElementById("box-message-group");
    boxMessage.scrollTop = boxMessage.scrollHeight;
}

function minhaUltimaMensagem(user) {
    return $(".lbl-hora-envio:last").hasClass("direita");
}

function mesmoUsuarioUltimaMensagagem(user) {
    return $(".lbl-hora-envio:last").hasClass("esquerda") && $(".lbl-hora-envio:last").hasClass("user-" + user);
}

function adicionarMensagem(mensagem, minhaMens, user) {
    const templateMessageEsquerda = `<p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${mensagem}</p><br>`;
    const templateMessageDireita = ` <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${mensagem}</p><br>`;

    let template = minhaMens ? templateMessageDireita : templateMessageEsquerda;
    let groupMens = $(".grupo-mensagens:last");
    var lblHora = groupMens.find(".lbl-hora-envio")[0];
    $(template).insertBefore(lblHora);
    atualizarHoraEnvio(minhaMens ? "" : user);
}

function montarMensagen(minhaMens) {
    const templateMensagemUsuarioEsquerda = `<div class="d-flex flex-row justify-content-start">    
    <img src="/img/hacker.png" alt="avatar 1" style="width: 64px; height: 100%;">
    <div class="grupo-mensagens esquerda">
         
        <p class="small ms-3 mb-3 rounded-3 text-muted lbl-hora-envio esquerda"></p>
    </div>
</div>`;

    const templateMensagemUsuarioDireita = `<div class="d-flex flex-row justify-content-end mb-4 pt-1">
    <div class="grupo-mensagens direita text-end">

    <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end lbl-hora-envio direita"></p>
    </div>    
    <img src="/img/hacker.png" alt="avatar 1" style="width: 64px; height: 100%;">
</div>`;

    return minhaMens ? templateMensagemUsuarioDireita : templateMensagemUsuarioEsquerda;
}

function atualizarHoraEnvio(user) {
    const dtEnvio = new Date();
    const hor = String(dtEnvio.getHours()).padStart(2, "0");
    const min = String(dtEnvio.getMinutes()).padStart(2, "0");

    var lstUltimasHoras = document.getElementsByClassName("lbl-hora-envio");
    var el = lstUltimasHoras[lstUltimasHoras.length - 1];
    var nomeHora = "";
    if (user != "" && user != _user) nomeHora = `<b>${user}</b>  às `;

    el.innerHTML = nomeHora + `${hor}:${min}`;
    el.classList.add("user-" + user);
}
