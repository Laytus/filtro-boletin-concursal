document.getElementById('filterButton').addEventListener('click', filterData);
document.getElementById('excelButton').addEventListener('click', downloadExcel);

let data = [];

// Carga de datos desde el archivo JSON
fetch('./DATA/registro_publicaciones_full.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        
        if (data.length > 0) {
            const firstElement = data[0];
            console.log(`DATA: ${JSON.stringify(firstElement, null, 2)}`);
        } else {
            console.log('El archivo JSON está vacío.');
        }
    })
    .catch(error => console.error('Error al cargar la base de datos JSON:', error));

// tribunal
// rolCausa
// tipoProcedimiento
// deudorNombre
// rut
// entePublicador
// nombrePublicacion
// fechaPublicacion

// Función de filtrado de la base de datos
function filterData() {
    // const tribunalValue = document.getElementById('tribunalInput').value.toLowerCase();
    // const rolCausaValue = document.getElementById('rolCausaInput').value.toLowerCase();
    // const tipoProcedimientoValue = document.getElementById('tipoProcedimientoInput').value.toLowerCase();
    // const deudorNombreValue = document.getElementById('deudorNombreInput').value.toLowerCase();
    // const rutValue = document.getElementById('rutInput').value.toLowerCase();
    // const entePublicadorValue = document.getElementById('entePublicadorInput').value.toLowerCase();
    // const nombrePublicacionValue = document.getElementById('nombrePublicacionInput').value.toLowerCase();
    // const fechaPublicacionValue = document.getElementById('fechaPublicacionInput').value.toLowerCase();
    // const resultsBody = document.getElementById('resultsBody');

    const key1 = document.getElementById('keySelect1').value;
    const filterValue1 = document.getElementById('filterInput1').value.toLowerCase();
    const key2 = document.getElementById('keySelect2').value;
    const filterValue2 = document.getElementById('filterInput2').value.toLowerCase();
    const resultsBody = document.getElementById('resultsBody');

    // console.log(`KEY: ${key}`);
    // console.log(`FILTER VALUE: ${filterValue}`);

    resultsBody.innerHTML = '';

    // Filtrado de data en base a inputs
    const filteredData = data.filter(item => {
        let matchesKey1 = true;
        let matchesKey2 = true;

        // Filtrado para el primer input
        if (filterValue1) {
            if (item[key1]) {
                const value1 = item[key1].toLowerCase();
                const filterValues1List = filterValue1.split(',').map(value => value.trim().toLowerCase());
                matchesKey1 = filterValues1List.some(filterValue => value1.includes(filterValue)); //???
            } else {
                matchesKey1 = false;
            }
        }

        // Filtrado para el segundo input
        if (filterValue2) {
            if (item[key2]) {
                const value2 = item[key2].toLowerCase();
                const filterValues2List = filterValue2.split(',').map(value => value.trim().toLowerCase());
                matchesKey2 = filterValues2List.some(filterValue => value2.includes(filterValue)); //???
            } else {
                matchesKey2 = false;
            }
        }

        // Devuelve verdadero si el item cumple con los filtros aplicables
        return (filterValue1 ? matchesKey1 : true) && (filterValue2 ? matchesKey2 : true);

        // if (item[key1] && item[key2]) {
        //     // if (item[key1].toLowerCase().includes(filterValue1) && item[key2].toLowerCase().includes(filterValue2)) {
        //     //     return true;
        //     // }

        //     const value1 = item[key1].toLowerCase();
        //     const value2 = item[key2].toLowerCase();

        //     const filterValues1List = filterValue1.split(',').map(value => value.trim().toLowerCase());
        //     const filterValues2List = filterValue2.split(',').map(value => value.trim().toLowerCase());

        //     const matchesKey1 = filterValues1List.some(filterValue => value1.includes(filterValue)); //???
        //     const matchesKey2 = filterValues2List.some(filterValue => value2.includes(filterValue)); //???

        //     return matchesKey1 && matchesKey2;
        //     // return item[key1].toLowerCase().includes(filterValue1);
        // }


        // if (item[key2]) {
        //     return item[key2].toLowerCase().includes(filterValue2);
        // }

        // if (item['tribunal']) {
        //     console.log(`${item['tribunal'].toLowerCase()}`);
        //     return item['tribunal'].toLowerCase().includes(tribunalValue);
        // }
        // if (item['rolCausa']) {
        //     return item['rolCausa'].toLowerCase().includes(rolCausaValue);
        // }
        // if (item['tipoProcedimiento']) {
        //     return item['tipoProcedimiento'].toLowerCase().includes(tipoProcedimientoValue);
        // }
        // if (item['deudorNombre']) {
        //     return item['deudorNombre'].toLowerCase().includes(deudorNombreValue);
        // }
        // if (item['rut']) {
        //     return item['rut'].toLowerCase().includes(rutValue);
        // }
        // if (item['entePublicador']) {
        //     return item['entePublicador'].toLowerCase().includes(entePublicadorValue);
        // }
        // if (item['nombrePublicacion']) {
        //     return item['nombrePublicacion'].toLowerCase().includes(nombrePublicacionValue);
        // }
        // if (item['fechaPublicacion']) {
        //     return item['fechaPublicacion'].toLowerCase().includes(fechaPublicacionValue);
        // }
        // return false;
    });

    // 
    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.tribunal}</td>
                             <td>${item.rolCausa}</td>
                             <td>${item.tipoProcedimiento}</td>
                             <td>${item.deudorNombre}</td>
                             <td>${item.rut}</td>
                             <td>${item.entePublicador}</td>
                             <td>${item.nombrePublicacion}</td>
                             <td>${item.fechaPublicacion}</td>`;
                             resultsBody.appendChild(row);
        });

        excelButton.classList.remove('hidden');
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="8">No se encontraron resultados.</td>`;
        resultsBody.appendChild(row);
    }
}

// Función para descargar la tabla como archivo Excel
function downloadExcel() {
    const wb = XLSX.utils.book_new();
    const ws_data = [['Tribunal', 'Rol Causa', 'Tipo Procedimiento', 'Deudor Nombre', 'RUT', 'Ente Publicador', 'Nombre Publicación', 'Fecha Publicación']];

    const rows = Array.from(document.querySelectorAll('#resultsTable tbody tr'));
    rows.forEach(row => {
        const rowData = Array.from(row.children).map(cell => cell.innerText);
        ws_data.push(rowData);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");

    XLSX.writeFile(wb, 'resultados.xlsx');
}

// Tipo Procedimiento: 
// Reorganización de la Empresa Deudora

// Nombre 
// Texto íntegro del acuerdo y sus modificaciones
// Propuesta de acuerdo del deudor
// Informe del veedor sobre propuesta de acuerdo
// Texto íntegro del acuerdo y sus modificaciones,Propuesta de acuerdo del deudor,Informe del veedor sobre propuesta de acuerdo