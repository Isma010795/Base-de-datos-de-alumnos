

const alumnos = [];
    const grupos = new Map();

    function registrarAlumno() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = parseInt(document.getElementById('edad').value, 10);

        const alumno = {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            clase: null,
            calificacion: null,
            grupo: null
        };
        alert(`Alumno ${alumno.nombre} ${alumno.apellido} dado de alta`);
        alumnos.push(alumno);
        updateAlumnosList();
        updateAlumnoSelects();
        updatePromedioAlumnoSelect();
        updateAlumnosTable();
        clearForm('registroAlumnoForm');
        localStorage.setItem(updateAlumnoSelects,alumnos);
        console.log(`Alumno ${alumno.nombre} ${alumno.apellido} dado de alta`);

    }


    function inscribirAlumno() {
        localStorage.getItem(updateAlumnoSelects);
        const selectedAlumno = document.getElementById('alumnoSelect').value;
        const clase = document.getElementById('clase').value;
        const calificacion = document.getElementById('calificacion').value;

        const alumno = alumnos.find(a => a.nombre === selectedAlumno);

        if (alumno) {
            alumno.clase = clase;
            alumno.calificacion = calificacion;
            updateAlumnosList();
            updatePromedioAlumnoSelect();
            updateAlumnosTable();
            alert(`Alumno ${alumno.nombre} asignacion de clase ${alumno.clase}`);
            console.log(`Alumno ${alumno.nombre} asignacion de clase ${alumno.clase}`);

        }

        clearForm('inscripcionForm');
    }

    function crearGrupo() {
        const grupoNombre = document.getElementById('grupoNombre').value;

        if (!grupos.has(grupoNombre)) {
            grupos.set(grupoNombre, []);
            updateGruposList();
            updateGrupoSelects();
            updatePromedioGrupoSelect();
            updateAlumnosTable();
            updateGruposTable();
            clearForm('grupoForm');
            alert('Grupo creado');
        } else {
            alert('El nombre del grupo ya existe. Por favor, elija un nombre diferente.');
        }
    }

    function asignarAlumnoAGrupo() {
        const selectedAlumno = document.getElementById('alumnoGrupoSelect').value;
        const selectedGrupo = document.getElementById('grupoSelect').value;

        const alumno = alumnos.find(a => a.nombre === selectedAlumno);

        if (alumno) {
            alumno.grupo = selectedGrupo;
            grupos.get(selectedGrupo).push(alumno);
            updateAlumnosList();
            updateGruposList();
            updateAlumnosTable();

        }

        clearForm('asignacionGrupoForm');
    }

    function buscarAlumno() {
        const nombreABuscar = document.getElementById('buscarNombre').value;
        const apellidoABuscar = document.getElementById('buscarApellido').value;

        const resultadoBusqueda = alumnos.filter(alumno =>
            alumno.nombre.toLowerCase().includes(nombreABuscar.toLowerCase()) &&
            alumno.apellido.toLowerCase().includes(apellidoABuscar.toLowerCase())
        );

        updateAlumnosList(resultadoBusqueda);
    }

    function obtenerPromedioAlumno() {
        const selectedAlumno = document.getElementById('promedioAlumnoSelect').value;

        const alumno = alumnos.find(a => a.nombre === selectedAlumno);

        if (alumno && alumno.calificacion !== null) {
            alert(`El promedio de ${alumno.nombre} es: ${alumno.calificacion}`);
        } else {
            alert('No se ha asignado una calificación para este alumno.');
        }
    }

    function obtenerPromedioGrupo() {
        const selectedGrupo = document.getElementById('promedioGrupoSelect').value;

        const alumnosEnGrupo = grupos.get(selectedGrupo);

        if (alumnosEnGrupo.length > 0) {
            const promedioGrupo = alumnosEnGrupo.reduce((total, alumno) => total + parseFloat(alumno.calificacion), 0) / alumnosEnGrupo.length;
            alert(`El promedio del grupo ${selectedGrupo} es: ${promedioGrupo.toFixed(2)}`);
        } else {
            alert('No hay alumnos en este grupo.');
        }
    }

    function obtenerListaOrdenada() {
        const orden = document.getElementById('ordenAlumnosSelect').value;

        const listaOrdenada = [...alumnos];

        if (orden === 'ascendente') {
            listaOrdenada.sort((a, b) => a.calificacion - b.calificacion);
        } else {
            listaOrdenada.sort((a, b) => b.calificacion - a.calificacion);
        }

        updateAlumnosList(listaOrdenada);
    }

    function updateAlumnosList(alumnosArray = alumnos) {
        const alumnosList = document.getElementById('alumnosList');
        alumnosList.innerHTML = '';

        alumnosArray.forEach(alumno => {
            const listItem = document.createElement('li');
            listItem.textContent = `Nombre: ${alumno.nombre} ${alumno.apellido}, Edad: ${alumno.edad}, Clase: ${alumno.clase || 'No inscrito'}, Calificación: ${alumno.calificacion || 'No asignada'}, Grupo: ${alumno.grupo || 'No asignado'}`;
            alumnosList.appendChild(listItem);
        });
    }

    function updateGruposList() {
        const gruposList = document.getElementById('gruposList');
        gruposList.innerHTML = '';

        grupos.forEach((alumnos, grupoNombre) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Grupo ${grupoNombre}: ${alumnos.map(alumno => alumno.nombre).join(', ')}`;
            gruposList.appendChild(listItem);
        });
        updateGruposTable();
    }

    function updateAlumnoSelects() {
        const alumnoSelect = document.getElementById('alumnoSelect');
        const alumnoGrupoSelect = document.getElementById('alumnoGrupoSelect');
        alumnoSelect.innerHTML = '';
        alumnoGrupoSelect.innerHTML = '';

        alumnos.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.nombre;
            option.textContent = `${alumno.nombre} ${alumno.apellido}`;
            alumnoSelect.appendChild(option);

            const optionGrupo = document.createElement('option');
            optionGrupo.value = alumno.nombre;
            optionGrupo.textContent = `${alumno.nombre} ${alumno.apellido}`;
            alumnoGrupoSelect.appendChild(optionGrupo);
        });
    }

    function updateGrupoSelects() {
        const grupoSelect = document.getElementById('grupoSelect');
        const promedioGrupoSelect = document.getElementById('promedioGrupoSelect');
        grupoSelect.innerHTML = '';
        promedioGrupoSelect.innerHTML = '';

        grupos.forEach((alumnos, grupoNombre) => {
            const option = document.createElement('option');
            option.value = grupoNombre;
            option.textContent = grupoNombre;
            grupoSelect.appendChild(option);

            const optionPromedio = document.createElement('option');
            optionPromedio.value = grupoNombre;
            optionPromedio.textContent = grupoNombre;
            promedioGrupoSelect.appendChild(optionPromedio);
        });
    }

    function updatePromedioAlumnoSelect() {
        const promedioAlumnoSelect = document.getElementById('promedioAlumnoSelect');
        promedioAlumnoSelect.innerHTML = '';

        alumnos.forEach(alumno => {
            const option = document.createElement('option');
            option.value = alumno.nombre;
            option.textContent = `${alumno.nombre} ${alumno.apellido}`;
            promedioAlumnoSelect.appendChild(option);
        });
    }

    function updatePromedioGrupoSelect() {
        const promedioGrupoSelect = document.getElementById('promedioGrupoSelect');
        promedioGrupoSelect.innerHTML = '';

        grupos.forEach((alumnos, grupoNombre) => {
            const option = document.createElement('option');
            option.value = grupoNombre;
            option.textContent = grupoNombre;
            promedioGrupoSelect.appendChild(option);
        });
    }

    function updateAlumnosTable() {
        const alumnosTableBody = document.querySelector('#alumnosTable tbody');
        alumnosTableBody.innerHTML = '';

        // Iterar sobre la lista de alumnos y agregar filas a la tabla
        alumnos.forEach(alumno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.clase || 'No inscrito'}</td>
                <td>${alumno.calificacion || 'No asignada'}</td>
                <td>${alumno.grupo || 'No asignado'}</td>
            `;
            alumnosTableBody.appendChild(row);
        });
    }
    function updateGruposTable() {
        const gruposTableBody = document.querySelector('#grupoTable tbody');
        gruposTableBody.innerHTML = '';

        // Iterar sobre la lista de grupos y agregar filas a la tabla
        alumnos.forEach(alumno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alumno.grupo}</td>
                <td>${alumno.nombre}</td>
               
            `;
            gruposTableBody.appendChild(row);
        });
    }



    function clearForm(formId) {
        const form = document.getElementById(formId);
        form.reset();
    }