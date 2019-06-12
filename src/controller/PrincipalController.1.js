
import SesionHelper from "../helpers/SesionHelper";
import ActividadModel from "../models/ActividadModel";

export default {
    name: "Principal",
    data() {
        return {
            usuarioSesion: {},
            sesion: {},
            response: "",
            listaAlumnos: [],
            listaAlumnosResp: [],
            listaAlumnosSeleccionados: [],
            listaGrupos: [],
            listaGruposFiltrados: [],
            grupoDefault: {id:-1,nombre:"Todos"},
            grupoSeleccionado : {id:-1,nombre:"Todos"},
            actividad: ActividadModel,
            actividadSelecionada: {},
            listaActividades: [],
            listaTipoActividad: [],
            limpiarFormularioActividad: null,
            validacion: null,
            mensajeToast: null,
            /*uriTempAsistencia: "http://localhost:5000/asistencia",
            uriTempGrupos: "http://localhost:5000/grupos",
            uriTempActividad: "http://localhost:5000/actividad"*/
            uriTempAsistencia: "https://app-restexpres.herokuapp.com/asistencia",
            uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos",
            uriTempActividad: "https://app-restexpres.herokuapp.com/actividad"
        };
    },
    //FIXME: SESION
    mounted() {
        console.log("iniciando el Bienvenida ");

        this.sesion = this.$session.get("usuario_sesion");

        if (!this.sesion || !this.sesion.usuario) {
            console.log("No tiene sesion");
            this.$router.push("/");
            return;
        }
        this.usuarioSesion = this.sesion.usuario;

        console.log("Cargando lista alumno");
        this.loadFunctionAlumnosDentro = function () {
            this.listaRecibidos = [];
            this.$http
                .get(
                    this.uriTempAsistencia +
                    "/alumnos_recibidos" +
                    "/" +
                    this.usuarioSesion.co_sucursal,
                    {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    }
                )
                .then(
                    result => {
                        this.response = result.data;
                        if (this.response != null) {
                            console.log(" ====>> " + JSON.stringify(this.response));
                            this.listaAlumnos = this.response;
                            this.listaAlumnosResp = this.response;
                            this.actualizarComboFiltro();                            
                            this.filtrarAlumnosPorGrupo(this.grupoDefault);
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        };

        //toast
        this.mensajeToast = mensaje => {
            $("#toast_msg").text(mensaje);
            $("#toast_id").toast("show");
        };

        //funcion de limpiado de actividad
        this.limpiarFormularioActividad = function () {
            $("#combo_actividad_principal").prop("selectedIndex", -1);
            $("#combo_sub_actividad").prop("selectedIndex", -1);
            $("#combo_tipo_actividad").prop("selectedIndex", -1);
            $("#nota_id").text("");
            this.actividadSelecionada = {};
            this.actividad.id = 0;
            this.actividad.cat_actividad = -1;
            this.actividad.tipo_actividad = -1;
            this.actividad.sub_actividad = -1;
            this.actividad.genero = -1;
            this.actividad.alumnosIds = [];
        };

        //actividades
        this.$http
            .get(this.uriTempActividad + "/catalogo_actividad", {
                headers: {
                    "x-access-token": this.sesion.token
                }
            })
            .then(
                result => {
                    this.response = result.data;
                    console.log("Consulta de actividades" + this.response);
                    if (this.response != null) {
                        if (this.response.length > 0) {
                            this.listaActividades = this.response[0].catalogo_actividades;
                        }
                    }
                },
                error => {
                    console.error(error);
                }
            );

        ///c
        this.validacion = function () {
            if (
                this.actividadSelecionada.tipo_actividad !== null &&
                this.actividad.tipo_actividad === -1
            ) {
                return false;
            }

            if (
                this.actividadSelecionada.sub_actividad !== null &&
                this.actividad.sub_actividad === -1
            ) {
                return false;
            }

            return true;
        };

        //Filtro de grupos

        this.actualizarComboFiltro = () => {
            const distinct = (value, index, self) => {
                return self.indexOf(value) === index;
            }

            //this.listaGrupos = this.listaAlumnos.filter(distinct);

            this.listaGrupos = this.listaAlumnos.map(e => {
                return { id: e.co_grupo, nombre: e.nombre_grupo };
            }).filter(distinct);

            console.log("Grupos filtrados " + JSON.stringify(this.listaGrupos));

            //return { id: e.co_grupo, grupo: e.nombre_grupo };
        };

        /*this.actualizarComboFiltro = () => {
          this.listaGrupos = this.listaAlumnos.map(e => {
            return { id: e.co_grupo, grupo: e.nombre_grupo };
          });
          console.log("Grupos filtrados " + JSON.stringify(this.listaGrupos));
        };*/

        this.limpiarSeleccionAlumnos = () => {
            this.listaAlumnos['seleccionado'] = false;
        };

        this.loadFunctionAlumnosDentro();
        //this.validacion();
    },
    methods: {
        addToListAlumno(itemSelected) {
            if (!itemSelected.seleccionado) {
                itemSelected["seleccionado"] = true;
                this.listaAlumnosSeleccionados.push(itemSelected);
                /*$("#" + itemSelected.id + "_selection_alumno").addClass(
                    "fas fa-check-circle text-danger"
                );*/
                console.log(" Alumno seleccionado  " + JSON.stringify(itemSelected));
            } else {
                itemSelected.seleccionado = false;
                this.removeToListAlumno(itemSelected);
            }
            console.log("Add " + JSON.stringify(itemSelected));
        },
        removeToListAlumno(itemSelected) {
            console.log("Remove " + itemSelected.nombre_alumno);

            var pos = this.listaAlumnosSeleccionados.indexOf(itemSelected);

            var elemento = this.listaAlumnosSeleccionados[pos];

            this.listaAlumnosSeleccionados.splice(pos, 1);

            $("#" + itemSelected.id + "_selection_alumno").removeClass(
                "fas fa-check-circle text-danger"
            );

            if (this.listaAlumnosSeleccionados.length == 0) {
                this.limpiarFormularioActividad();
                this.loadFunctionAlumnosDentro();
                $("#modal_actividad").modal("hide");
            }
        },
        initRegistroActividad() {
            console.log("init registro actividad");
            if (this.listaAlumnosSeleccionados.length > 0) {
                this.limpiarFormularioActividad();
                $("#modal_actividad").modal("show");
            } else {
                this.mensajeToast("Seleccione al menos un alumno");
            }
        },
        registrarActividad() {
            console.log("Registrar actividad");

            console.log(JSON.stringify(this.actividad));

            if (this.listaAlumnosSeleccionados.length == 0) {
                console.log("Seleccione al menos un alumno");
                this.mensajeToast("Seleccione al menos un alumno");
                return;
            }

            //if (this.actividad.cat_actividad == -1) {
            if (!this.actividadSelecionada.id) {
                console.log("Seleccione la actividad");
                this.mensajeToast("Seleccione la actividad");
                return;
            }

            if (!this.validacion()) {
                console.log("complete los campos");
                this.mensajeToast("Complete los campos");
                return;
            }

            const alumnosIds = this.listaAlumnosSeleccionados.map(
                item => item.id_alumno
            );
            
            this.actividad["alumnosIds"] = alumnosIds;
            this.actividad["cat_actividad"] = this.actividadSelecionada.id;
            this.actividad.genero = this.usuarioSesion.id;

            console.log("ENVO " + JSON.stringify(this.actividad));

            this.$http
                .post(this.uriTempActividad + "/registrar", this.actividad, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.response = result.data;
                        console.log("Actividades insertadas " + this.response);
                        if (this.response != null) {
                            var rowsAffected = this.response;
                            if (rowsAffected > 0) {
                                this.mensaje = "Se registro la actividad";
                                this.listaAlumnosSeleccionados = [];
                                this.limpiarFormularioActividad();

                                $("[is_alumno]").removeClass("fas fa-check-circle text-danger");                                

                                $("#modal_actividad").modal("hide");
                            }
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        },
        signout() {
            console.log("Signout ");
            this.$session.clear();
            this.$router.push("/");
        },
        filtrarAlumnosPorGrupo(grupoItem) {
            console.log("Grupo selecionado "+JSON.stringify(grupoItem));

            this.grupoSeleccionado = grupoItem;

            if (this.grupoSeleccionado.id == -1) {
                console.log("sinfiltro");
                this.listaAlumnos = this.listaAlumnosResp;
            } else {
                console.log("Filtrar por grupo " + grupoItem.nombre);
                this.listaAlumnos = this.listaAlumnosResp.filter(e => e.co_grupo == grupoItem.id);               
            }
            console.log("new array " + JSON.stringify(this.listaAlumnos));
        }
    }
};