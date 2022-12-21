var dados = []

function populaTabela() {
  if (Array.isArray(dados)) {

    $("#tblDados tbody").html("")

    dados.forEach(function (item) {
      //TEMPLATE STRING `` ADICIONA HTML NA TELA ATRAVÉS DE JS
      $("#tblDados tbody").append(`<tr>
        <td>${item.ID}</td>
        <td>${item.Nome}</td>
        <td>${item.Sobrenome}</td>
        <td>${item.DtNascimento}</td>
        <td>${item.Formacao}</td>
      </tr>`)
    })
  }
}

$(function () {
  //EXECUTA AO CARREGAR A TELA
  dados = JSON.parse(localStorage.getItem("--"))

  if (dados) {
    populaTabela()
  }

})