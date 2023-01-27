var dados = []

//FUNÇÃO DO BOTÃO DE EXCLUIR
function apagaRegistro(id) {
  let _confirm = confirm("Deseja realmente excluir esse registro?")
  if(_confirm) {
    for(let i=0; i < dados.length; i++) {
      if(dados[i].ID == id) {
        dados.splice(i, 1)
      }
    }

    populaTabela()
  }
}

function editaRegistro(id) {
  $("#modalRegistro").modal("show")

  dados.forEach(function(item) {
    if(item.ID == id) {
      $("hdID").val(item.ID)
      $("#txtNome").val(item.Nome)
      $("#txtSobrenome").val(item.Sobrenome)
      $("#txtDtNascimento").val(item.DtNascimento.substr(6, 4) + "-" + item.DtNascimento.substr(3, 2) + "-" + item.DtNascimento.substr(0, 2))
      $("#txtFormacao").val(item.Formacao)
    }
  })
}

function populaTabela() {
  if (Array.isArray(dados)) {

    localStorage.setItem("__dados__", JSON.stringify(dados))

    $("#tblDados tbody").html("")

    dados.forEach(function (item) {
      //TEMPLATE STRING `` ADICIONA HTML NA TELA ATRAVÉS DE JS
      $("#tblDados tbody").append(`<tr>
        <td>${item.ID}</td>
        <td>${item.Nome}</td>
        <td>${item.Sobrenome}</td>
        <td>${item.DtNascimento}</td>
        <td>${item.Formacao}</td>
        <td><button type="button" class="btn btn-primary" onclick="javascript:editaRegistro(${item.ID});"><i class="fa fa-edit" /></button></td>
        <td><button type="button" class="btn btn-danger" onclick="javascript:apagaRegistro(${item.ID});"><i class="fa fa-trash" /></button></td>
      </tr>`)
    })
  }
}

//EXECUTA AO CARREGAR A TELA
$(document).ready(function(){
  
  dados = JSON.parse(localStorage.getItem("__dados__"))

  if (dados) {
    populaTabela()
  } else {
    dados = []
  }
  
  //EVENTO CLICK DO BOTÃO SALVAR
  $("#btnSalvar").click(function()  {

    let _id = $("#hdID").val()
    let Nome = $("#txtNome").val()
    let Sobrenome = $("#txtSobrenome").val()
    let DtNascimento = new Date($("#txtDtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
    let Formacao = $("#txtFormacao").val()

    let registro = {}

    registro.Nome = Nome
    registro.Sobrenome = Sobrenome
    registro.DtNascimento = DtNascimento
    registro.Formacao = Formacao

    if(!_id || _id == "0"){
      registro.ID = dados? dados.length + 1:1;
      dados.push(registro)
    } else {
      dados.forEach(function(item) {
        if (item.ID == _id) {
          item.Nome = Nome
          item.Sobrenome = Sobrenome
          item.DtNascimento = DtNascimento
          item.Formacao = Formacao
        }
      })
    }

    alert("Registro salvo com sucesso!")
    $("#modalRegistro").modal("hide")

    //LIMPEZA DE DADOS
    $("#hdID").val("0")
    $("#txtNome").val("")
    $("#txtSobrenome").val("")
    $("#txtDtNascimento").val("")
    $("#txtFormacao").val("")

    populaTabela()
  })

});