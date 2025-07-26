let inpCep = document.getElementById("inputCep")
let btnBuscar = document.getElementById("btnBuscar")
let divCep = document.getElementById("divCep")

btnBuscar.addEventListener('click', async (event) => {
    event.preventDefault();

    let objRetornado = await getCep()

    if(!objRetornado) {
        alert("Erro no cep")
        return
    }

    let htmlMontada = montarHtml(objRetornado)

    divCep.innerHTML = htmlMontada
    
})

async function getCep() {
    try {
      const response = await fetch(`http://viacep.com.br/ws/${inpCep.value}/json/`)
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      const dados = await response.json();
      return dados;
    } catch (erro) {
      console.error('Ops, algo deu errado!', erro);
      return null;
    }
  }

  function montarHtml(obj) {
    return `<p><b>Rua:</b> ${obj.logradouro}</p>
    <p><b>Bairro:</b> ${obj.bairro}, ${obj.localidade} - ${obj.uf}</p>
    <p></p>`
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker registrado!"))
      .catch(error => console.error("Erro ao registrar SW:", error));
  }
  