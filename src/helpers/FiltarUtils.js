
export function filtrarNombreAlumno(criterioNombre, listaAlumnos) {
    /*let listaFiltrada = [];
    if (criterioNombre == "") {
        lista = listaAlumnos;
    } else {
        lista = listaAlumnos.filter(
            e =>
                e.nombre
                    .toUpperCase()
                    .includes(criterioNombre.toUpperCase()) ||
                (e.nombre_carino
                    ? e.nombre_carino
                        .toUpperCase()
                        .includes(criterioNombre.toUpperCase())
                    : false)
        );
    }*/
    return criterioNombre === "" ? listaAlumnos : listaAlumnos.filter(
        e =>
            e.nombre
                .toUpperCase()
                .includes(criterioNombre.toUpperCase()) ||
            (e.nombre_carino
                ? e.nombre_carino
                    .toUpperCase()
                    .includes(criterioNombre.toUpperCase())
                : false)
    );
}

