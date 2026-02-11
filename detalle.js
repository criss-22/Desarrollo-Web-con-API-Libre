
const parametros = new URLSearchParams(window.location.search);
const digiId = parametros.get('id');
const contenedor = document.getElementById("detalleDigimon");
if (digiId) {
    fetch(`https://digi-api.com/api/v1/digimon/${digiId}`)
        .then(respuesta => respuesta.json())
        .then(digimon => {
            const nivel = digimon.levels?.[0]?.level || 'Desconocido';
            const tipo = digimon.types?.[0]?.type || 'Desconocido';
            const atributos = digimon.attributes?.map(a => `<div>${a.attribute}</div>`).join('') || 'Desconocido';
            const campos = digimon.fields?.map(f => `
                <img src="${f.image}" alt="${f.field}" title="${f.field}" width="45" class="mx-2 shadow-sm">
            `).join('') || 'Sin campos';
            const descripcion = digimon.descriptions?.find(d => d.language === "en_us")?.description || "No hay descripción disponible.";

            contenedor.innerHTML = `
                <div class="text-center border-bottom pb-3 mb-4">
                    <span class="text-muted d-block small">${digimon.id}</span>
                    <h2 class="fw-bold text-decoration-underline text-uppercase">${digimon.name}</h2>
                </div>

                <div class="text-center mb-5">
                    <img src="${digimon.images[0].href}" class="img-fluid animate__animated animate__fadeIn" style="max-height: 350px;">
                </div>

                <div class="row text-center mb-5 gx-0">
                    <div class="col-4">
                        <h5 class="fw-bold border-bottom pb-2 mx-3"> <i class="bi bi-capslock-fill"></i> Nivel</h5>
                        <p class="mt-3"> ${nivel}</p>
                    </div>
                    <div class="col-4 border-start border-end">
                        <h5 class="fw-bold border-bottom pb-2 mx-3"> <i class="bi bi-plus-circle"></i> Atributos</h5>
                        <div class="mt-3">${atributos}</div>
                    </div>
                    <div class="col-4">
                        <h5 class="fw-bold border-bottom pb-2 mx-3"> <i class="bi bi-droplet"></i> / <i class="bi bi-fire"></i>
Tipo</h5>
                        <p class="mt-3">${tipo}</p>
                    </div>
                </div>

                <div class="text-center mb-5">
                    <h5 class="fw-bold mb-3"> <i class="bi bi-hexagon-fill"></i> Campos</h5>
                    <div class="d-flex justify-content-center flex-wrap">
                        ${campos}
                    </div>
                </div>

                <div class="bg-light p-4 rounded border-start border-info border-4">
                    <h5 class="fw-bold"><i class="bi bi-info-circle"></i> Descripción</h5>
                    <p class="text-muted mb-0" style="text-align: justify; line-height: 1.6;">
                        ${descripcion}
                    </p>
                </div>
            `;
        })
        .catch(error => {
            contenedor.innerHTML = `<div class="alert alert-danger">Error al conectar con el servidor: ${error}</div>`;
        });
} else {
    window.location.href = "index.html"; 
}

//para cambiar el nombre de el title por el nombre del digimon elegido
fetch(`https://digi-api.com/api/v1/digimon/${digiId}`)
    .then(res => res.json())
    .then(detalles => {
        document.title = `Detalle de ${detalles.name}`;
        
        const tituloPestana = document.getElementById("nombre-detalle");
        if (tituloPestana) {
            tituloPestana.innerText = `Detalle de ${detalles.name}`;
        }
    });