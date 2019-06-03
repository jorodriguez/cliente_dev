
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
            listaAlumnosSeleccionados: [],
            listaGrupos: [],
            listaGruposFiltrados: [],
            grupoDefault: { id: -1, nombre: "Todos" },
            grupoSeleccionado: { id: -1, nombre: "Todos" },
            actividad: ActividadModel,
            actividadSelecionada: {},
            listaActividades: [],
            listaTipoActividad: [],
            limpiarFormularioActividad: null,
            existeSeleccionAlumno: null,
            seleccionarTodosAlumnos: null,
            toggleSeleccionarTodosVisibles: null,
            seleccionarTodosVisibles: false,
            validacion: null,
            mensajeToast: null,
            //uriTempAsistencia: "http://localhost:5000/asistencia",
            //uriTempGrupos: "http://localhost:5000/grupos",
            //uriTempActividad: "http://localhost:5000/actividad"
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
                            //console.log(" ====>> " + JSON.stringify(this.response));
                            this.listaAlumnos = this.response;
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

            this.listaGrupos = this.listaAlumnos.map(e => {
                return { id: e.co_grupo, nombre: e.nombre_grupo };
            }).filter(distinct);

            console.log("Grupos filtrados " + JSON.stringify(this.listaGrupos));

        };

        this.seleccionarTodos = (seleccion) => {
            this.listaAlumnos
                //.filter(e => e.seleccionado)
                .forEach(e => {
                    //if(e.visible){                        
                    e.seleccionado = seleccion;
                    //}
                });

        };

        this.toggleSeleccionarTodosVisibles = () => {
            var _this = this;
            console.log("toggleSeleccionarTodosVisibles");

            if (this.grupoSeleccionado.id == -1) {
                console.log("Seleccionar todos sin grupo");
                this.listaAlumnos                    
                    .forEach(e => {
                        if (e.visible) {
                            console.log("seleccion " + e);
                            e.seleccionado = !e.seleccionado;
                        }
                });
            } else {
                this.listaAlumnos
                    .filter(e => e.co_grupo === _this.grupoSeleccionado.id)
                    .forEach(e => {
                        if (e.visible) {
                            console.log("seleccion " + e);
                            e.seleccionado = !e.seleccionado;
                        }
                });
            }
        };

        this.existeSeleccionAlumno = () => {
            return this.listaAlumnos.some(function (e) {
                return e.seleccionado;
            });
        }

        this.loadFunctionAlumnosDentro();
        //this.validacion();
    },
    methods: {
        toggleSelectAlumno(itemSelected) {
            if (!itemSelected.seleccionado) {
                itemSelected["seleccionado"] = true;
            } else {
                itemSelected.seleccionado = false;

                var existeSeleccion = this.existeSeleccionAlumno();
                if (!existeSeleccion) {
                    this.limpiarFormularioActividad();
                    this.loadFunctionAlumnosDentro();
                    $("#modal_actividad").modal("hide");
                }

            }
        },
        initRegistroActividad() {

            var existeSeleccion = this.existeSeleccionAlumno();
            if (existeSeleccion) {
                this.limpiarFormularioActividad();
                $("#modal_actividad").modal("show");
            } else {
                this.mensajeToast("Seleccione al menos un alumno");
            }
            console.log("init registro actividad");

        },
        registrarActividad() {
            console.log("Registrar actividad");

            console.log(JSON.stringify(this.actividad));

            var existeSeleccion = this.existeSeleccionAlumno();

            if (!existeSeleccion) {
                console.log("Seleccione al menos un alumno");
                this.mensajeToast("Seleccione al menos un alumno");
                return;
            }

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

            const alumnosIds = this.listaAlumnos
                .filter(e => e.seleccionado)
                .map(item => item.id_alumno);

            console.log("Alumnos seleccionado " + alumnosIds);

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

                                this.seleccionarTodos(false);
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
            console.log("Grupo selecionado " + JSON.stringify(grupoItem));

            this.grupoSeleccionado = grupoItem;

            if (this.grupoSeleccionado.id == -1) {
                console.log("sinfiltro");
                this.listaAlumnos.forEach(element => {
                    element.visible = true;
                });
            } else {
                console.log("Filtrar por grupo " + grupoItem.nombre);
                this.listaAlumnos.forEach(element => {
                    if (element.co_grupo == grupoItem.id) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });

            }
        },
        toggleSeleccionVisibles() {
            if (this.listaAlumnos == null || this.listaAlumnos.length == 0) {
                console.log("No existen alumnos seleccionados");
                this.mensajeToast("No existen alumnos seleccionados");
                return;
            }
            console.log("toggleSeleccionVisibles ");
            this.toggleSeleccionarTodosVisibles();
        }
    }
};