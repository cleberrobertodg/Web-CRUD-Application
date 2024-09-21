var selectedRow = null

//Mostrar alertas

function mostrarAlerta(message, className){
    const div = document.createElement("div")
    div.className = `alert alert-${className}`
    
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container")
    const main = document.querySelector(".main")
    container.insertBefore(div, main)
    
    setTimeout(() => document.querySelector(".alert").remove(), 3000)
}

//Deletar todos os campos
function deletarCampos () {
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#matricula").value = ""
}

//Adicionar dados
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault()

    //Pegar valores do form
    const primeiroNome = document.querySelector("#firstName").value
    const sobrenome = document.querySelector("#lastName").value
    const matricula = document.querySelector("#matricula").value

    //Validação
    if(primeiroNome == "" || sobrenome == "" || matricula == ""){
        mostrarAlerta("Por favor, preencha todos os campos do formulário!", "danger")
    } else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list")
            const row = document.createElement("tr")

            row.innerHTML = `
            <td>${primeiroNome}</td>
            <td>${sobrenome}</td>
            <td>${matricula}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
            <a href="#" class="btn btn-danger btn-sm delete">Remover</a>
            `
            list.appendChild(row)
            selectedRow = null
            mostrarAlerta("Aluno adicionado com sucesso!", "success")
        } else{
            selectedRow.children[0].textContent = primeiroNome
            selectedRow.children[1].textContent = sobrenome
            selectedRow.children[2].textContent = matricula
            selectedRow = null
            mostrarAlerta("Informações de aluno atualizadas com sucesso", "info")
        }
        deletarCampos()
    }
})

//Atualizar dados
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement
        document.querySelector("#firstName").value = selectedRow.children[0].textContent
        document.querySelector("#lastName").value = selectedRow.children[1].textContent
        document.querySelector("#matricula").value = selectedRow.children[2].textContent
    }
})

//Deletar dados
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove()
        mostrarAlerta("Dados de aluno removidos com sucesso", "danger")
    }
})