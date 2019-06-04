
import router from "@/router/index";
import AlumnoModel from "../models/AlumnoModel";
import FormatoModel from "../models/FormatoModel";
import FamiliarModel from "../models/FamiliarModel";
import Utils from "../models/FormatoUtils";

export default {
    name: "PerfilAlumno",
    data() {
        return {
            id: 0,
            alumno: AlumnoModel,
            familiar: {
                id: 0,
                id_relacion: -1,
                co_alumno: -1,
                co_parentesco: -1,
                parentesco: "",
                nombre: "",
                telefono: "",
                fecha_nacimiento: null,
                correo: "",
                genero: 0
            },
            producto: { co_alumno: -1, cat_producto: -1, cantidad: 1 },
            listaFamiliares: [],
            metadatos: Utils,
            listaGrupos: [],
            listaParentesco: [],
            listaProductos: [],
            listaProductosAlumno: [],
            listaServicios: [],
            listaValoresEsperados: [],
            display: true,
            //uri:"http://localhost:5000/",
            //uri:"https://app-restexpres.herokuapp.com/",      
            /*uriTemp: "http://localhost:5000/alumnos",
            uriTempGrupos: "http://localhost:5000/grupos",
            uriTempFamiliar: "http://localhost:5000/familiar",
            uriTempParentesco: "http://localhost:5000/parentesco",
            uriTempProducto: "http://localhost:5000/producto",
            uriTempServicios: "http://localhost:5000/servicios",
            uriTempValoresEsperados: "http://localhost:5000/valores_esperados",*/

            //--
            uriTemp: "https://app-restexpres.herokuapp.com/alumnos",
            uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos",
            uriTempFamiliar: "https://app-restexpres.herokuapp.com/familiar",
            uriTempParentesco: "https://app-restexpres.herokuapp.com/parentesco",            
            uriTempProducto: "https://app-restexpres.herokuapp.com/producto",
            uriTempServicios: "https://app-restexpres.herokuapp.com/servicios",
            uriTempValoresEsperados: "https://app-restexpres.herokuapp.com/valores_esperados",
            response: "",
            mensaje: "",
            sesion: {},
            loadFamiliaresFuncion: null,
            loadCatalogoParentescoFuncion: null,
            loadCatalogoProductosFuncion: null,
            loadProductosAlumnoFuncion: null,
            loadValoresEsperadosFunction: null,
            loadCatalogoFunction: null,
            mensajeToast: null,
            initFamiliar: null,
            operacion: "",
            usuarioSesion: {}
        };
    },
    mounted() {
        console.log("iniciando el componente Perfil alumno");

        this.sesion = this.$session.get("usuario_sesion");

        if (!this.sesion || !this.sesion.usuario) {
            console.log("No tiene sesion");
            this.$router.push("/");
            return;
        }

        this.usuarioSesion = this.sesion.usuario;

        this.id = this.$route.params.id;

        console.log("this.uriTemp  " + this.uriTempGrupos);

        if (this.id == undefined) {
            this.display = false;
            console.log("No se recibe ningun id de alumno ");
        } else {
            console.log("this.uriTemp  " + this.uriTemp);

            /*this.loadCatalogoFunction = function(url,listaTarget){
                console.log("===> "+url);                
                this.$http
                    .get(url, {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    })
                    .then(
                        result => {          
                            this.response = result.data;
                            console.log("ZZZZ "+JSON.stringify(result.data));
                            if (this.response != null) {
                                listaTarget = result.data;
                            }
                        },
                        error => {
                            listaTarget = [];
                            console.error(error);
                        }
                    );
            };*/

            this.$http
                .get(this.uriTemp + "/id/" + this.id, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.alumno = result.data;

                        if (this.alumno.formato_inscripcion == null)
                            this.alumno.formato_inscripcion = {};

                        console.log("Preparando alumno como insticucion " + JSON.stringify(this.alumno));

                        this.loadValoresEsperadosFunction(this.alumno.formato_inscripcion.id);
                       //this.loadCatalogoFunction(this.uriTempValoresEsperados + "/" + this.alumno.formato_inscripcion.id,this.listaValoresEsperados);  
                    },
                    error => {
                        console.error(error);
                    }
                );

           


            //familiares
            /*this.loadFamiliaresFuncion = () => {
                    this.loadCatalogoFunction(this.uriTempFamiliar + "/" + this.id,this.listaFamiliares );
            };*/
            this.loadFamiliaresFuncion = () => {
                this.$http
                    .get(this.uriTempFamiliar + "/" + this.id, {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    })
                    .then(
                        result => {
                            this.response = result.data;
                            if (this.response != null) {
                                this.listaFamiliares = this.response;
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
            };

            // Parentesco
            /*this.loadCatalogoParentescoFuncion = () => {
                this.loadCatalogoFunction(this.uriTempParentesco + "/" + this.id,this.listaParentesco);
            };*/
            this.loadCatalogoParentescoFuncion = () => {
                this.$http
                    .get(this.uriTempParentesco + "/" + this.id, {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    })
                    .then(
                        result => {
                            this.response = result.data;
                            if (this.response != null) {
                                this.listaParentesco = this.response;
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
            };

            //Traer productos
            /*this.loadCatalogoProductosFuncion = () => {
                    this.loadCatalogoFunction(this.uriTempProducto,this.listaProductos);
            };
            */
           this.loadCatalogoProductosFuncion = () => {
                this.$http
                    .get(this.uriTempProducto, {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    })
                    .then(
                        result => {
                            this.response = result.data;
                            if (this.response != null) {
                                this.listaProductos = this.response;
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
            };

            /*this.loadProductosAlumnoFuncion = ()=>{
                this.loadCatalogoFunction(this.uriTempProducto + "/" + this.id,this.listaProductosAlumno);
            };*/

            this.loadProductosAlumnoFuncion = () => {
                console.log("loadProductosAlumnoFuncion ");
                this.$http
                    .get(this.uriTempProducto + "/" + this.id, {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    })
                    .then(
                        result => {
                            this.response = result.data;
                            console.log("Respuesta " + JSON.stringify(this.response));
                            if (this.response != null) {
                                this.listaProductosAlumno = this.response;
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
            };

            //traer sevicios
            //this.loadCatalogoFunction(this.uriTempServicios,this.listaServicios);  
            this.$http
                .get(this.uriTempServicios, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.response = result.data;
                        if (this.response != null) {
                            this.listaServicios = this.response;
                            console.log("Servicios " + this.listaServicios);
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
           
           /*     this.loadValoresEsperadosFunction = (id_formato) => {
                    this.loadCatalogoFunction(this.uriTempValoresEsperados + "/" + id_formato,this.listaValoresEsperados);  
                };
                */
                
            this.loadValoresEsperadosFunction = (id_formato) => {
                this.$http
                    .get(this.uriTempValoresEsperados + "/" + id_formato, {
                        headers: {
                            "x-access-token": this.sesion.token
                        }
                    })
                    .then(
                        result => {
                            this.response = result.data;
                            if (this.response != null) {
                                this.listaValoresEsperados = this.response;

                                console.log("Valores esperados " + this.listaValoresEsperados);
                            }
                        },
                        error => {
                            console.error(error);
                        }
                    );
            };

            //grupos
            this.loadFunctionGrupos = function() {
                this.$http
                  .get(this.uriTempGrupos, {
                    headers: {
                      "x-access-token": this.sesion.token
                    }
                  })
                  .then(
                    result => {
                      this.response = result.data;
                      console.log("Grupos " + this.response);
                      if (this.response != null) {
                        this.listaGrupos = this.response;                        
                      }
                    },
                    error => {
                      console.error(error);
                    }
                  );
              };

            this.loadFamiliaresFuncion();
            this.loadFunctionGrupos();
            this.loadCatalogoProductosFuncion();
            this.loadProductosAlumnoFuncion();

        }

        this.mensajeToast = mensaje => {
            $("#toast_msg").text(mensaje);
            $("#toast_id").toast("show");
        };
    },
    methods: {
        //FIXME : pasar al servicio
        modificar() {
            console.log("Modificar el id " + this.alumno.id);
            this.mensaje = JSON.stringify(this.alumno);

            this.alumno.genero = this.usuarioSesion.id;
            this.alumno.formato_inscripcion.valores_esperados = this.listaValoresEsperados;

            this.$http
                .put(this.uriTemp + "/" + this.alumno.id, this.alumno, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.response = result.data;

                        if (this.response != null) {
                            console.log("" + this.response);
                            this.mensaje = "Se actualizaron los datos del alumno.";
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        },
        iniciarAgregarFamiliar() {
            this.operacion = "INSERT";
            this.familiar = {
                id: 0,
                id_relacion: -1,
                co_alumno: -1,
                co_parentesco: -1,
                parentesco: "",
                nombre: "",
                telefono: "",
                fecha_nacimiento: null,
                correo: "",
                genero: 0
            };
            this.loadCatalogoParentescoFuncion();
        },
        seleccionarFamiliar(item, operacion) {
            this.familiar = item;
            this.operacion = operacion;
            this.loadCatalogoParentescoFuncion();
        },
        agregarFamiliar() {
            console.log("Agregar familiar ");

            if (
                this.familiar.co_parentesco == -1 ||
                this.familiar.nombre == "" ||
                this.familiar.telefono == ""
            ) {
                this.mensaje = "Escribe los valores requeridos";
                this.mensajeToast("Escribe los valores requeridos");
                return;
            }

            console.log("== " + JSON.stringify(this.familiar));
            this.familiar.genero = this.usuarioSesion.id;

            this.$http
                .post(this.uriTempFamiliar + "/" + this.alumno.id, this.familiar, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.response = result.data;

                        if (this.response != null) {
                            console.log("" + this.response);
                            this.mensaje = "Se agrego el familiar.";

                            $("#modal_familiar").modal("hide");

                            this.loadFamiliaresFuncion();
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        },
        modificarFamiliar() {
            console.log("modificar familiar");

            if (
                this.familiar.co_parentesco == -1 ||
                this.familiar.nombre == "" ||
                this.familiar.telefono == ""
            ) {
                this.mensajeToast("Escribe los valores requeridos");
                return;
            }
            this.familiar.genero = this.usuarioSesion.id;

            this.$http
                .put(this.uriTempFamiliar + "/" + this.familiar.id, this.familiar, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.response = result.data;

                        if (this.response != null) {
                            console.log("" + this.response);
                            if (this.response == 0 || this.response == null) {
                                this.mensaje = "Sucedió un error inesperado";
                            } else {
                                this.mensaje = "Se actualizaron los datos de familiar.";
                                this.loadFamiliaresFuncion();
                                $("#modal_familiar").modal("hide");
                            }
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        },
        eliminarFamiliar() {
            this.familiar.genero = this.usuarioSesion.id;

            console.log("Eliminar familiar " + JSON.stringify(this.familiar));

            this.$http
                .put(
                    this.uriTempFamiliar + "/eliminar/" + this.familiar.id_relacion,
                    this.familiar,
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
                            console.log("" + this.response);
                            if (this.response == 0 || this.response == null) {
                                this.mensaje = "Sucedió un error inesperado";
                            } else {
                                this.mensaje = "Se actualizaron los datos de familiar.";
                                this.loadFamiliaresFuncion();
                                $("#modal_eliminar_familiar").modal("hide");
                            }
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        },
        iniciaragregarProducto() {
            console.log("Iniciar add producto");
            this.producto = { co_alumno: -1, cat_producto: -1, cantidad: 1 };
            this.loadCatalogoProductosFuncion();
        },
        seleccionarProducto(item, operacion) {
            console.log("seleccionar producto");
        },
        agregarProducto() {
            console.log("agregar servicio");

            if (this.producto.cantidad == null || this.producto.cantidad == 0) {
                this.mensaje = "La cantidad no es correcta ";
                return;
            }

            if (this.producto.cat_producto == null || this.producto.cantidad == -1) {
                this.mensaje = "Selecione el producto ";
                return;
            }

            this.producto.genero = this.usuarioSesion.id;
            this.producto.co_alumno = this.alumno.id;

            this.$http
                .post(this.uriTempProducto, this.producto, {
                    headers: {
                        "x-access-token": this.sesion.token
                    }
                })
                .then(
                    result => {
                        this.response = result.data;

                        if (this.response != null) {
                            console.log("" + this.response);
                            this.mensaje = "Se agrego el producto.";

                            $("#modal_producto").modal("hide");

                            this.loadProductosAlumnoFuncion();
                        }
                    },
                    error => {
                        console.error(error);
                    }
                );
        },
        eliminarproducto() {
            console.log("eliminar producto");
        }
    }
};