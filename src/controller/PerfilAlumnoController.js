
import router from "@/router/index";
import AlumnoModel from "../models/AlumnoModel";
import FormatoModel from "../models/FormatoModel";
import FamiliarModel from "../models/FamiliarModel";
import Utils from "../models/FormatoUtils";

import Datepicker from 'vuejs-datepicker';
//import CargosPagosController from './CargosPagosController'
import CargosPagos from '../components/CargosPago.vue'
import BalanceAlumno from './BalanceAlumnoController'
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";

export default {
    name: "perfil-alumno",
    mixins:[operacionesApi],
    components: {
        Datepicker,        
        CargosPagos,
        BalanceAlumno
    },    
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
            listaFamiliares: [],
            metadatos: Utils,
            listaGrupos: [],
            listaParentesco: [],            
            listaServicios: [],
            listaValoresEsperados: [],
            listaPosiblesPadres:[],
            familiarRelacionado:null,
            mensaje_facturacion : "",
            display: true,          
            requiere_datos_facturacion:false,  
            datos_facturacion : {
                            rfc:"",
                            razon_social:"" ,
                            curp : "",
                            calle :"",
                            numero_exterior: "",
                            colonia : "",
                            ciudad : "",
                            municipio : "",
                            estado:"",
                            codigo_postal:"",
                            telefono_contacto : "",
                            correo_contacto:""
            },            
            uriTemp: URL.ALUMNOS_BASE,
            uriTempGrupos: URL.GRUPOS_BASE,
            uriTempFamiliar: URL.FAMILIAR_BASE,
            uriTempParentesco: URL.PARENTESCO_BASE, // "http://localhost:5000/parentesco",            
            uriTempServicios: URL.SERVICIOS_BASE, //"http://localhost:5000/servicios",
            uriTempValoresEsperados:URL.VALORES_ESPERADOS, // "http://localhost:5000/valores_esperados",
            uriTempDatosFacturacion: URL.DATOS_FACTURADOS, // "http://localhost:5000/datos_facturacion",            
            uriTempResetClaveFamiliar: URL.RESET_PASSWORD, // "http://localhost:5000/reset_password",
            response: "",
            mensaje: "",
            sesion: {},
            loadFamiliaresFuncion: null,
            loadCatalogoParentescoFuncion: null,            
            loadValoresEsperadosFunction: null,
            loadCatalogoFunction: null,
            loadServiciosFunction:null,
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

            this.get(
                this.uriTemp + "/id/" + this.id,
                this.sesion.token,
                (result) => {
                    this.alumno = result.data;
                    if (this.alumno.formato_inscripcion == null)
                        this.alumno.formato_inscripcion = {};

                    if (this.alumno.co_datos_facturacion != null){
                        this.datos_facturacion = this.alumno.datos_facturacion;
                    }                                      
                 }
            );

            this.loadFamiliaresFuncion = () => {

                this.get(
                    this.uriTempFamiliar + "/" + this.id,
                    this.sesion.token,
                    (result) => {
                        this.response = result.data;
                        if (this.response != null) {
                            this.listaFamiliares = this.response;
                        }
                    }
                );
            };

            // Parentesco         
            this.loadCatalogoParentescoFuncion = () => {
                this.get(
                    this.uriTempParentesco + "/" + this.id,
                    this.sesion.token,
                    (result) => {
                        this.response = result.data;
                        if (this.response != null) {
                            this.listaParentesco = this.response;
                        }
                    }
                );
            };

          
            //traer sevicios            
            this.loadServiciosFunction = ()=>{

                this.get(
                    this.uriTempServicios,
                    this.sesion.token,
                    (result) => {
                        this.response = result.data;
                        if (this.response != null) {
                            this.listaServicios = this.response;
                            console.log("Servicios " + this.listaServicios);
                        }
                    }
                );
            };


            this.loadValoresEsperadosFunction = (id_formato) => {
                this.get(
                    this.uriTempValoresEsperados + "/" + id_formato,
                    this.sesion.token,
                    (result) => {
                        this.response = result.data;
                        if (this.response != null) {
                            this.listaValoresEsperados = this.response;

                            console.log("Valores esperados " + this.listaValoresEsperados);
                        }
                    }
                );
            };

            //grupos
            this.loadFunctionGrupos = function () {

                this.get(
                    this.uriTempGrupos,
                    this.sesion.token,
                    (result) => {
                        this.response = result.data;
                        console.log("Grupos " + this.response);
                        if (this.response != null) {
                            this.listaGrupos = this.response;
                        }
                    }
                );
            };


            this.loadFunctionPosiblesFamiliares = function (id_parentesco,apellidos_alumno,id_sucursal) {
                this.get(
                    this.uriTempFamiliar+"/"+id_parentesco+"/"+apellidos_alumno+"/"+id_sucursal,
                    this.sesion.token,
                    (result) => {
                        this.response = result.data;
                        console.log("Posibles padres " + this.response);
                        if (this.response != null) {
                            this.listaPosiblesPadres = this.response;
                            console.log(JSON.stringify(this.listaPosiblesPadres));
                        }
                    }
                );
            };

            this.validacionGuardarFunction = ()=>{
                if(this.alumno==null){
                  return false;        
                }else{          
                 
                  if(this.alumno.nombre == ''){
                    this.mensaje = "* Escribe un nombre";
                    return false;
                  }
                  if(this.alumno.apellidos == ''){
                    this.mensaje = "* Escribe un nombre";
                    return false;
                  }
                  if(this.alumno.fecha_nacimiento == null){
                    this.mensaje = "* Selecciona la fecha de nacimiento";
                    return false;
                  }
        
                  if(this.alumno.sexo == ''){
                    this.mensaje = "* Selecciona el sexo";
                    return false;
                  }                  
        
                  if(this.alumno.co_grupo == 0 ){
                    this.mensaje = "Selecciona un grupo";
                    return false;
                  }
                 
                  if(this.alumno.hora_entrada == null || this.alumno.hora_salida == null
                      || this.alumno.hora_entrada == '' || this.alumno.hora_salida == ''){            
                    this.mensaje = "* Selecciona la hora de entrada y salida";
                    return false;
                  }
        
                  if(this.alumno.minutos_gracia == null || this.alumno.minutos_gracia == ''){
                    this.mensaje = "* Escribe los minutos de gracia";
                    return false;
                  }
                  
                  if(this.alumno.costo_inscripcion == null || this.alumno.costo_inscripcion == ''){            
                    this.mensaje = "* Escribe el costo de incripción";
                    return false;
                  }
                                                 
                  if(this.alumno.fecha_reinscripcion == null){
                    this.mensaje = "* Selecciona la fecha de reinscripción";
                    return false;
                  }        
        
                  return true;
                }
            }

          //  this.loadFamiliaresFuncion();
            this.loadFunctionGrupos();                      
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

            if(!this.validacionGuardarFunction){
                
                return;
            }           
            this.alumno.genero = this.usuarioSesion.id;
            this.alumno.formato_inscripcion.valores_esperados = this.listaValoresEsperados;

            this.put(
                this.uriTemp + "/" + this.alumno.id, 
                this.alumno,
                this.sesion.token,
                (result) => {
                    this.response = result.data;

                    if (this.response != null) {
                        console.log("" + this.response);
                        this.mensaje = "Se actualizaron los datos del alumno.";
                    }
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
            this.mensaje = '';
            this.familiarRelacionado = null;
            this.loadCatalogoParentescoFuncion();
        },
        seleccionarParentesco(){
          
            this.loadFunctionPosiblesFamiliares(
                        this.familiar.co_parentesco,
                        this.alumno.apellidos,
                        this.usuarioSesion.co_sucursal
                        );

        },
        seleccionarFamiliarParaRelacion(){
            this.familiar.id = this.familiarRelacionado ? this.familiarRelacionado.id:-1;
            this.familiar.nombre = this.familiarRelacionado ? this.familiarRelacionado.nombre : '';
            this.familiar.telefono = this.familiarRelacionado ? this.familiarRelacionado.telefono : '';
            this.familiar.fecha_nacimiento = this.familiarRelacionado ? this.familiarRelacionado.fecha_nacimiento : null;
            this.familiar.correo = this.familiarRelacionado ? this.familiarRelacionado.correo:'';
        },
        seleccionarFamiliar(item, operacion) {
            this.familiar = item;
            this.operacion = operacion;
            this.loadCatalogoParentescoFuncion();
        },
        seleccionarFamiliarResetClave(item) {
            this.familiar = item;
            $("#modal_confirmar_resetear_clave").modal("show");
        },
        confirmarResetClave(){
            this.get(
                this.uriTempResetClaveFamiliar + "/" + this.familiar.id, 
                this.sesion.token,
                result => {
                    this.response = result.data;
                    if (this.response != null) {
                        console.log("" + this.response);
                        this.mensaje = "Se envio un correo con la nueva contraseña al usuario.";
                        $("#modal_confirmar_resetear_clave").modal("hide");                 
                    }
                }
            );
        },
        agregarFamiliar() {
            console.log("Agregar familiar ");

            if (
                this.familiar.co_parentesco == -1 ||
                this.familiar.nombre == "" ||
                this.familiar.telefono == "" ||
                this.familiar.correo == "" 
            ) {
                this.mensaje = "Escribe los valores requeridos";
                this.mensajeToast("Escribe los valores requeridos");
                return;
            }

            console.log("== " + JSON.stringify(this.familiar));
            this.familiar.genero = this.usuarioSesion.id;

            this.post(
                this.uriTempFamiliar + "/" + this.alumno.id, 
                this.familiar,
                this.sesion.token,
                (result) => {
                    let respuesta = result.data;
                    console.log(JSON.stringify(respuesta));

                    if (respuesta != null) {                            
                        this.mensaje = respuesta.mensaje;
                        if(respuesta.estatus){
                            $("#modal_familiar").modal("hide");

                            this.loadFamiliaresFuncion();
                        }                            
                    }
                }
            );
        },
        modificarFamiliar() {
            console.log("modificar familiar");

            if (
                this.familiar.co_parentesco == -1 ||
                this.familiar.nombre == "" ||
                this.familiar.telefono == "" ||
                this.familiar.correo == "" 
            ) {
                this.mensajeToast("Escribe los valores requeridos");
                return;
            }
            this.familiar.genero = this.usuarioSesion.id;

            this.put(
                this.uriTempFamiliar + "/" + this.familiar.id,
                this.familiar,
                this.sesion.token,
                (result) => {                                       
                    if (result.data != null) {
                        console.log("" + this.response);
                        if (result.data.estatus) {                                
                            this.mensaje = this.response.mensaje;
                            this.loadFamiliaresFuncion();
                            $("#modal_familiar").modal("hide");
                        } 
                    }
                }
            );
        },
        eliminarFamiliar() {
            this.familiar.genero = this.usuarioSesion.id;

            console.log("Eliminar familiar " + JSON.stringify(this.familiar));

            this.put(
                this.uriTempFamiliar + "/eliminar/" + this.familiar.id_relacion,
                this.familiar,
                this.sesion.token,
                (result) => {
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
                }
            );

        },
        guardarDatosFacturacion(){            
            if(
                this.datos_facturacion.rfc == ""
               || this.datos_facturacion.razon_social == "" 
               || this.datos_facturacion.curp == ""
               || this.datos_facturacion.calle ==""
               || this.datos_facturacion.numero_exterior == ""
               || this.datos_facturacion.colonia == ""
               || this.datos_facturacion.ciudad == ""
               || this.datos_facturacion.municipio  == ""
               || this.datos_facturacion.estado == ""
               || this.datos_facturacion.codigo_postal ==""
               || this.datos_facturacion.telefono_contacto == ""   
               || this.datos_facturacion.correo_contacto == ""
            ){
                this.mensaje = "Escribe los valores requeridos.";
                return;
            }

            this.datos_facturacion.factura = this.alumno.factura;
            this.datos_facturacion.genero  = this.usuarioSesion.id;
            this.datos_facturacion.id_alumno = this.id;

            this.post(
                this.uriTempDatosFacturacion, 
                this.datos_facturacion,
                this.sesion.token,
                (result) => {
                    this.response = result.data;

                    if (this.response != null) {
                        console.log("" + this.response);
                        if (this.response == 0 || this.response == null) {
                            this.mensaje = "Sucedió un error inesperado";
                        } else {
                            this.mensaje = "Se actualizaron los datos de facturación.";                                                                
                        }
                    }
                }
            );
        },
        iniciarHabilitarDesabilitarDatosFacturacion(){
            
            if(this.alumno.factura && this.alumno.co_datos_facturacion != null){
                //lanzar confirmacion
                this.mensaje_facturacion = "Con esta acción se especifica que no se requiere expedir facturas para el alumno ";
                $("#modal_confirmar_facturacion").modal("show");
            }

            if(!this.alumno.factura && this.alumno.co_datos_facturacion != null){
                this.mensaje_facturacion ="Con esta acción se especifica que se requiere expedir facturas para el alumno ";
                $("#modal_confirmar_facturacion").modal("show");       
            }
        },
        cancelarHabilitarDesabilitarDatosFacturacion(){
            this.alumno.factura = !this.alumno.factura ;

        },
        habilitarDesabilitarDatosFacturacion(){           

            this.put(
                this.uriTempDatosFacturacion,  
                { id_alumno :this.id ,factura : this.alumno.factura,genero:this.usuarioSesion.id},
                this.sesion.token,
                (result) => {
                    this.response = result.data;

                    if (this.response != null) {
                        console.log("" + this.response);
                        if (this.response == 0 || this.response == null) {
                            this.mensaje = "Sucedió un error inesperado";
                        } else {
                            this.mensaje = "Se actualizaron los datos de facturación.";                                                                
                        }
                    }
                }
            );
        },
        cargarTabInscripcion(){
            console.log("Inscripcion Tab load");
            
            if(this.listaServicios.length == 0){
                console.log("Carga de lista");
                this.loadServiciosFunction();
            } 
        },
        cargarTabInstitucion(){
            console.log("Institucion Tab load");
            if(this.listaValoresEsperados.length == 0){

                console.log("Preparando alumno como insticucion " + JSON.stringify(this.alumno));

                this.loadValoresEsperadosFunction(this.alumno.formato_inscripcion.id);
                    
            }
        },
        cargarTabFamiliares(){
            console.log("Familiares Tab load");
            if(this.listaFamiliares.length == 0){
                console.log("Carga de lista de familiares");
                this.loadFamiliaresFuncion();
            }
        }     
    }
};  