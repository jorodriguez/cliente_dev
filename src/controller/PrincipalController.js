
import SesionHelper from "../helpers/SesionHelper";
import ActividadModel from "../models/ActividadModel";
import { truncateSync } from "fs";
//import fire from '../fire'
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";


export default {
    name: "Principal",
    mixins: [operacionesApi],
    data() {
        return {
            usuarioSesion: {},
            sesion: {},
            response: "",
            listaAlumnos: [],
            listaAlumnosSeleccionados: [],
            listaAlumnosSeleccionadosCalculoHoraExtra: [],
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
            isSeleccionadoTodos: false,
            toggleSeleccionarTodosVisibles: null,
            seleccionarTodosVisibles: false,
            validacion: null,
            mensajeToast: null,
            loadFunctionAlumnosParaSalir: null,
            firebaseMessages: null,
            uriTempAsistencia: URL.ASISTENCIA_BASE,
            uriTempGrupos: URL.GRUPOS_BASE,
            uriTempActividad: URL.ACTIVIDAD_BASE,
            loaderAsistencia: false
        };
    },
    //FIXME: SESION
    mounted() {
        console.log("iniciando el Bienvenida ");

        this.sesion = this.$session.get("usuario_sesion");

        if (!this.sesion || !this.sesion.usuario) {
            console.log("No tiene sesion");
            this.$router.push("/login");
            return;
        }
        this.usuarioSesion = this.sesion.usuario;

        console.log("Cargando lista alumno");
        this.loadFunctionAlumnosDentro = function () {
            this.listaRecibidos = [];
            this.get(
                this.uriTempAsistencia + "/alumnos_recibidos/" + this.usuarioSesion.co_sucursal,
                this.sesion.token,
                (result) => {
                    this.response = result.data;
                    if (this.response != null) {
                        this.listaAlumnos = this.response;
                        this.actualizarComboFiltro();
                        this.filtrarAlumnosPorGrupo(this.grupoDefault);
                    }
                }
            );
        };

        this.loadFunctionAlumnosParaSalir = function (listaIdsAsistenciasSalida, handler) {

            this.get(
                URL.ASISTENCIA_SALIDA_ALUMNOS_TIEMPO_EXTRA + listaIdsAsistenciasSalida,
                this.sesion.token,
                handler
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
            this.actividad.nota = "";
        };

        //actividades

        this.get(
            this.uriTempActividad + "/catalogo_actividad",
            this.sesion.token,
            (result) => {
                this.response = result.data;
                console.log("Consulta de actividades" + this.response);
                if (this.response != null) {
                    if (this.response.length > 0) {
                        this.listaActividades = this.response[0].catalogo_actividades;
                    }
                }
            },
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
            var resArr = [];
            this.listaAlumnos.filter(function (item) {
                var i = resArr.findIndex(x => x.nombre == item.nombre_grupo);
                if (i <= -1) {
                    resArr.push({ id: item.co_grupo, nombre: item.nombre_grupo });
                }
                return null;
            });

            this.listaGrupos = resArr;
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
                this.isSeleccionadoTodos = !this.isSeleccionadoTodos;
                this.listaAlumnos
                    .forEach(e => {
                        if (e.visible) {
                            e.seleccionado = this.isSeleccionadoTodos;
                        }
                    });

            } else {
                this.listaAlumnos
                    .filter(e => e.co_grupo === _this.grupoSeleccionado.id)
                    .forEach(e => {
                        if (e.visible) {
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
                    $("#confirmar_salida_modal").modal("hide");
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

            this.post(
                this.uriTempActividad + "/registrar",
                this.actividad,
                this.sesion.token,
                (result) => {
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
        },

        iniciarRegistrarSalida() {
            var existeSeleccion = this.existeSeleccionAlumno();
            if (existeSeleccion) {
                //revisar horas extras salida alumnos
                // ASISTENCIA_SALIDA_ALUMNOS_TIEMPO_EXTRA
                //listaAlumnosSeleccionadosCalculoHoraExtra
                this.loaderAsistencia = true;
                const idsAsistencias = this.listaAlumnos
                    .filter(e => e.seleccionado)
                    .map(item => item.id);

                $("#confirmar_salida_modal").modal("show");
                this.loadFunctionAlumnosParaSalir(idsAsistencias,
                    (result) => {
                        if (result.data != null) {
                            this.listaAlumnosSeleccionadosCalculoHoraExtra = result.data;
                            this.loaderAsistencia = false;
                        }
                    });
            } else {
                this.mensajeToast("Seleccione al menos un alumno de la lista");
            }

        },
        registrarSalida() {
            console.log("Registrar salida");

            var existeSeleccion = this.existeSeleccionAlumno();
            console.log("seleccion " + existeSeleccion);

            if (existeSeleccion) {
                var lista = [];

                for (var i = 0; i < this.listaAlumnos.length; i++) {
                    var elem = this.listaAlumnos[i];
                    if (elem.seleccionado) {
                        lista.push({ id: elem.id, calcular_horas_extra: elem.calcular_horas_extra });
                    }
                }

                console.log("IDS " + lista);
                this.post(
                    this.uriTempAsistencia + "/salidaAlumnos",
                    { listaSalida: lista, genero: this.usuarioSesion.id },
                    this.sesion.token,
                    (result) => {
                        console.log("Response " + result.data);
                        if (result.data != null) {
                            this.lista = result.data;
                            this.mensaje = "Se registro la salida de los alumnos";
                            $("#confirmar_salida_modal").modal("hide");
                            this.loadFunctionAlumnosDentro();
                        }
                    }
                );
            } else {
                this.mensajeToast("Seleccione al menos un alumno de la lista");
                //this.mensaje = "Seleccione al menos un alumno de la lista";
            }
        },
        calcularHorasExtras(alumnoItem) {
            alumnoItem.calcular_horas_extra = !alumnoItem.calcular_horas_extra;
            console.log(" alumnoItem " + alumnoItem.nombre_alumno);
        },
        getListaAlumnosHorasExtras() {
            return this.listaAlumnos.filter(e => e.calcular_horas_extra);
        }
    }
};