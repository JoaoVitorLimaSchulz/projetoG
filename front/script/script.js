
const lista = document.getElementById("listaSalas");

window.onload = listarLaboratorios;

async function listarLaboratorios() {
    try {
        const res = await fetch(API);
        const dados = await res.json();

        lista.innerHTML = "";

        dados.forEach(lab => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${lab.id}</td>
                <td>${lab.nome}</td>
                <td>${lab.localizacao}</td>
                <td>${lab.info}</td>
                <td><img src="${lab.foto}" width="80"></td>
            `;
            lista.appendChild(linha);
        });
    } catch (erro) {}
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const loc = document.getElementById("loc").value;
    const info = document.getElementById("info").value;
    const foto = document.getElementById("foto").files[0];

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("localizacao", loc);
    formData.append("info", info);
    if (foto) formData.append("foto", foto);

    try {
        await fetch(API, {
            method: "POST",
            body: formData
        });

        form.reset();
        listarLaboratorios();
    } catch (erro) {}
});
