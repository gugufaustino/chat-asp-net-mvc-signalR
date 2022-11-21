function entrar() {
    desabilitarNome();
    habilitarEnviar();
    toggleEntrarSair(true);
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
    elTxtNome.disabled = true;
}
function habilitaNome() {
    const elTxtNome = document.getElementById("txtNome");
    elTxtNome.disabled = false;
}

function limparNome() {
    document.getElementById("txtNome").value = "";
}
function habilitarEnviar() {
    const eltxtMessage = document.getElementById("txtMessage");
    const elEnviar = document.getElementById("btnEnviar");
    eltxtMessage.disabled = false;
    elEnviar.disabled = false;
}

function postMinhaMensagem() {
    var minhaMens = document.getElementById("txtMessage").value;
    if (minhaMens !== null && minhaMens !== "") {
        postMessage(minhaMens, true);
        document.getElementById("txtMessage").value = "";
    }
}

function postMessage(texto, minhaMensagem) {
    if (minhaMensagem) {
        if (!minhaUltimaMensagem()) $("#box-message-group").append(montarMensagen(true));
        adicionarMensagem(texto, true);
    } else {
        if (!mesmoUsuarioUltimaMensagagem()) $("#box-message-group").append(montarMensagen(false));
        adicionarMensagem(texto, false);
    }
}

function minhaUltimaMensagem(user) {
    return $(".lbl-hora-envio:last").hasClass("direita");
}

var mesmoUltimo = false;
function mesmoUsuarioUltimaMensagagem(user) {
    return $(".lbl-hora-envio:last").hasClass("esquerda");
}

function adicionarMensagem(mensagem, minhaMens) {
    const templateMessageEsquerda = `<p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${mensagem}</p><br>`;
    const templateMessageDireita = ` <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${mensagem}</p><br>`;

    let template = minhaMens ? templateMessageDireita : templateMessageEsquerda;
    let groupMens = $(".grupo-mensagens:last");
    var lblHora = groupMens.find(".lbl-hora-envio")[0];
    $(template).insertBefore(lblHora);
    atualizarHoraEnvio();
}

function montarMensagen(minhaMens) {
    const templateMensagemUsuarioEsquerda = `<div class="d-flex flex-row justify-content-start">
    <i class="bi bi-person fs-2" style="width: 40px; height: 100%; "></i>
    <div class="grupo-mensagens esquerda">
         
        <p class="small ms-3 mb-3 rounded-3 text-muted lbl-hora-envio esquerda"></p>
    </div>
</div>`;

    const templateMensagemUsuarioDireita = `<div class="d-flex flex-row justify-content-end mb-4 pt-1">
    <div class="grupo-mensagens direita text-end">

    <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end lbl-hora-envio direita"></p>
    </div>
    <i class="bi bi-person fs-2" style="width: 40px; height: 100%; "></i>
</div>`;

    return minhaMens ? templateMensagemUsuarioDireita : templateMensagemUsuarioEsquerda;
}

function atualizarHoraEnvio() {
    const dtEnvio = new Date();
    const min = String(dtEnvio.getMinutes()).padStart(2, '0')

    var lstUltimasHoras = document.getElementsByClassName("lbl-hora-envio")
    lstUltimasHoras[lstUltimasHoras.length - 1].innerHTML = `${dtEnvio.getHours()}:${min}`;
}
