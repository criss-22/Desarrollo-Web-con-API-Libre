const criatura = document.getElementById("digimonContainer");

fetch('https://digi-api.com/api/v1/digimon?pageSize=60')
    .then(respuesta => respuesta.json())
    .then(data => {
        const personaje = data.content;
        
        personaje.forEach(digi => {
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card bg-secondary text-white h-100 border-0 shadow" style="cursor: pointer;">
                    <img src="${digi.image}" class="card-img-top p-3" alt="${digi.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${digi.name}</h5>
                        <button class="btn btn-info btn-sm">Ver más</button>
                    </div>
                </div>`;
                
            card.onclick = () => {
                window.location.href = `detalle.html?id=${digi.id}`;
            };
            criatura.appendChild(card);
        });
    })
    .catch(error => console.error("Error al cargar:", error));