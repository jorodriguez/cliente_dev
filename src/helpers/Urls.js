import configEnv from '../../config/configEnv';


//const BASE = configEnv.BASE || "http://localhost:5000";
//const BASE = process.env.URL_API || 'https://magic-stagging-api.herokuapp.com'
const BASE = process.env.URL_API || 'https://api-ambiente-produccion.herokuapp.com';


export const BRANCH = "202108-aviso-f1";

const ASISTENCIA_BASE =  BASE + '/asistencia';
const ASISTENCIA_USUARIO_BASE =  BASE + '/asistencia_usuarios';
const BALANCE_BASE = BASE +'/balance';
const SUCURSAL_BASE = BASE +'/sucursal';
const CAMBIO_SUCURSAL_BASE = BASE +'/cambio_sucursal';
const ALUMNOS_BASE = BASE + '/alumnos';
const PAGOS_BASE = BASE +'/pagos';
const CARGOS_BASE = BASE +'/cargos';
const FORMAS_PAGO_BASE = BASE +'/formas_pagos';
const GRUPOS_BASE = BASE + '/grupos';
const GASTOS_BASE = BASE + '/gastos';
const USUARIO_BASE = BASE+'/usuario'    

const HISTORICO_GASTOS  = BASE +'/historico_gastos';
const TIPOS_GASTO = BASE + '/tipos_gasto';

const FAMILIAR_BASE = BASE + '/familiar';
const PARENTESCO_BASE = BASE + '/parentesco';
const SERVICIOS_BASE = BASE + '/servicios';
const VALORES_ESPERADOS = BASE + '/valores_esperados';
const DATOS_FACTURADOS = BASE +'/datos_facturacion';

const RESET_PASSWORD = BASE + '/reset_password';
const ACTIVIDAD_BASE = BASE + '/actividad';
const CATALOGO_ACTIVIDAD = BASE + '/catalogo_actividad';

const BALANCE_CRECIMIENTO_GLOBAL = BASE + '/balance_crecimiento_global';
const ALUMNOS_CRECIMIENTO_MES = BASE + '/alumnos_crecimiento_mes';

const BALANCE_SUCURSAL = BASE + '/balance_sucursal';
const BALANCE_ALUMNO_SUCURSAL = BASE + '/balance_alumnos_sucursal';
const BALANCE_CRECIMIENTO = BASE +'/balance_crecimiento';
const BALANCE_CRECIMIENTO_MENSUAL = BASE +'/balance_crecimiento_mensual';
const BALANCE_CRECIMIENTO_ALUMNOS = BASE +'/balance_crecimiento_alumnos';
const MESES_ACTIVOS = BASE + '/meses_activos';

const ALUMNOS_BALANCE_CRECIMIENTO_MENSUAL_SUCURSAL =  BASE +'/alumnos_balance_crecimiento_mensual_sucursal';
const REPORTE_GASTO_MES_ACTUAL = BASE + '/reporte_gastos_mes_actual';
const REPORTE_INGRESO_MENOS_GASTO_MENSUAL = BASE + '/reporte_ingreso_menos_gasto_mensual';

const REPORTE_GASTOS = BASE + '/reporte_gastos';
const REPORTE_GASTOS_SUCURSALES = BASE + '/reporte_gastos_sucursales';
const REPORTE_GASTOS_GLOBAL = BASE + '/reporte_gastos_global';

const REPORTE_MENSUALIDADES = BASE + '/reporte_mensualidades';
const REPORTE_MENSUALIDADES_MES_ACTUAL = BASE + '/reporte_mensualidades_mes_actual';

/*
const REPORTE_MENSUALIDADES = BASE + '/reporte_mensualidades_sucursales';
const REPORTE_MENSUALIDADES_MES_ACTUAL = BASE + '/reporte_mensualidades_mes_actual';
*/


//-recordatorio
const INFO_CORREO_ALUMNOS = BASE + '/getInfoCorreoAlumnos';

const INFO_CONFIGURACION = BASE + '/configuracion';
const ENVIAR_RECORDATORIO_PAGO_ALUMNO = BASE + '/enviar_recordatorio_pago';
const REPORTE_MENSUALIDAD_BASE =  BASE +'/mensualidad';

const SUCURSAL_USUARIO = BASE + '/sucursal_usuario';
const SUCURSAL_USUARIO_ASIGNADAS = SUCURSAL_USUARIO + '/sucursales_asignadas'; //todas las sucursales asignadas

const CAT_DESCUENTOS = BASE + '/descuento';

const REPORTE_CONBRANZA = BASE + '/reporte_cobranza';
const GENERO_ALUMNO = BASE + '/genero_alumno';
const IMAGEN_PERFIL = BASE + '/foto_perfil';
const ESTADO_CUENTA = BASE + '/estado_cuenta/'; // /estado_cuenta/:id_alumno
const ESTADO_CUENTA_PREVIEW = BASE + '/estado_cuenta/preview/'; // /estado_cuenta/preview/:id_alumno
const ESTADO_CUENTA_ENVIAR = BASE + '/estado_cuenta/enviar/'; // /estado_cuenta/preview/:id_alumno
const USUARIOS_RH = BASE + '/usuarios_rh'; // /usuarios_rh/id_sucursal
const AVISOS = BASE + '/aviso'; // /aviso/:

const URL = {    
    LOGIN : BASE+'/auth/login',    
    ASISTENCIA_BASE : ASISTENCIA_BASE,
    ASISTENCIA_POR_RECIBIR : ASISTENCIA_BASE + '/alumnos_por_recibidos/',//param sucursal
    ASISTENCIA_RECIBIDOS : ASISTENCIA_BASE + '/alumnos_recibidos/',//param sucursal
    ASISTENCIA_ENTRADA_ALUMNOS : ASISTENCIA_BASE + '/entradaAlumnos',
    ASISTENCIA_SALIDA_ALUMNOS : ASISTENCIA_BASE + '/salidaAlumnos',
    ASISTENCIA_SALIDA_ALUMNOS_TIEMPO_EXTRA : ASISTENCIA_BASE+'/salidaAlumnos/alumno_tiempo_extra/',//parametro lista asistencias
    ASISTENCIA_REPORTE : ASISTENCIA_BASE + '/reporte/',
    ASISTENCIA_REPORTE_POR_ALUMNO : ASISTENCIA_BASE + '/reporte_por_alumno/', //id_alumno y numero_mes
    ASISTENCIA_REPORTE_MES_ALUMNO : ASISTENCIA_BASE + '/reporte_mes_alumno/', //id_alumno y numero_mes
    ASISTENCIA_REPORTE_MES_SUCURSAL : ASISTENCIA_BASE + '/reporte_mes_sucursal/', //id_sucursal y numero_mes
    ASISTENCIA_MENSUAL_ALUMNO : ASISTENCIA_BASE + '/mensual/', //id_alumno
    USUARIO_BASE:  USUARIO_BASE,
    USUARIO_BUSCAR_ID:  USUARIO_BASE+'/buscar',//+id_usuario
    
    //Usuari
    //Asistencia Usuarios
    ASISTENCIA_USUARIO_BASE:ASISTENCIA_USUARIO_BASE,
    ASISTENCIA_USUARIO_POR_ENTRAR : ASISTENCIA_USUARIO_BASE + '/por_entrar/', // parametro de sucursal
    ASISTENCIA_USUARIO_POR_SALIR : ASISTENCIA_USUARIO_BASE + '/por_salir/', // parametro de sucursal    
    ASISTENCIA_USUARIO_ENTRADA : ASISTENCIA_USUARIO_BASE + '/entrada', // parametro en body
    ASISTENCIA_USUARIO_SALIDA : ASISTENCIA_USUARIO_BASE + '/salida', // parametro en body
    ASISTENCIA_USUARIO_REPORTE_SUC_RANGO_FECHA : ASISTENCIA_USUARIO_BASE + '/reporte_mes/', // id_sucursal,fecha_inicio,fecha_fin
    ASISTENCIA_USUARIO_REPORTE_USUARIO_RANGO_FECHA : ASISTENCIA_USUARIO_BASE + '/usuario/', // id_usuario,fecha_inicio,fecha_fin
    ASISTENCIA_USUARIO_REPORTE_FILTRO_ANIOS : ASISTENCIA_USUARIO_BASE + '/filtros_anios', // co_empresa
    ASISTENCIA_USUARIO_REPORTE_FILTRO_QUINCENAS : ASISTENCIA_USUARIO_BASE + '/filtros_quincenas', // co_empresa,anio

    BALANCE_BASE : BALANCE_BASE,
    SUCURSAL_BASE : SUCURSAL_BASE,
    CAMBIO_SUCURSAL_BASE : CAMBIO_SUCURSAL_BASE,
    ALUMNOS_BASE : ALUMNOS_BASE ,

    PAGOS_BASE: PAGOS_BASE,
    PAGOS_REGISTRAR : PAGOS_BASE + '/registrar',
    CARGOS_BASE : CARGOS_BASE,
    CARGO_REGISTRAR : CARGOS_BASE + '/registrar',
    MESES_ADEUDA : CARGOS_BASE + '/meses_adeuda/',  //id_alumno
    REENVIAR_COMPROBANTE: PAGOS_BASE+'/reenviar_comprobante',

    MENSUALIDAD_VENCE_SEMANA_ACTUAL : REPORTE_MENSUALIDAD_BASE + '/vence_semana_actual/',//id_sucursal
    
    FORMAS_PAGO_BASE : FORMAS_PAGO_BASE,

    GRUPOS_BASE : GRUPOS_BASE,
    GASTOS_BASE : GASTOS_BASE,
    HISTORICO_GASTOS:HISTORICO_GASTOS,
    TIPOS_GASTO : TIPOS_GASTO,
    GENERO_ALUMNO:GENERO_ALUMNO,

    FAMILIAR_BASE : FAMILIAR_BASE,
    PARENTESCO_BASE : PARENTESCO_BASE,
    SERVICIOS_BASE : SERVICIOS_BASE,
    VALORES_ESPERADOS : VALORES_ESPERADOS,
    DATOS_FACTURADOS : DATOS_FACTURADOS,
    RESET_PASSWORD : RESET_PASSWORD,
    ACTIVIDAD_BASE : ACTIVIDAD_BASE,
    CATALOGO_ACTIVIDAD : CATALOGO_ACTIVIDAD,
    BALANCE_CRECIMIENTO_GLOBAL : BALANCE_CRECIMIENTO_GLOBAL,
    ALUMNOS_CRECIMIENTO_MES : ALUMNOS_CRECIMIENTO_MES,
    BALANCE_SUCURSAL : BALANCE_SUCURSAL,
    BALANCE_ALUMNO_SUCURSAL : BALANCE_ALUMNO_SUCURSAL,
    BALANCE_CRECIMIENTO : BALANCE_CRECIMIENTO,
    BALANCE_CRECIMIENTO_ALUMNOS : BALANCE_CRECIMIENTO_ALUMNOS,
    BALANCE_CRECIMIENTO_MENSUAL : BALANCE_CRECIMIENTO_MENSUAL,

    MESES_ACTIVOS : MESES_ACTIVOS,
    ALUMNOS_BALANCE_CRECIMIENTO_MENSUAL_SUCURSAL : ALUMNOS_BALANCE_CRECIMIENTO_MENSUAL_SUCURSAL,
    REPORTE_GASTO_MES_ACTUAL : REPORTE_GASTO_MES_ACTUAL,
    REPORTE_INGRESO_MENOS_GASTO_MENSUAL : REPORTE_INGRESO_MENOS_GASTO_MENSUAL,

    REPORTE_GASTOS : REPORTE_GASTOS,
    REPORTE_GASTOS_SUCURSALES:REPORTE_GASTOS_SUCURSALES,
    REPORTE_GASTOS_GLOBAL : REPORTE_GASTOS_GLOBAL,

    REPORTE_MENSUALIDADES : REPORTE_MENSUALIDADES,    
    REPORTE_MENSUALIDADES_MES_ACTUAL : REPORTE_MENSUALIDADES_MES_ACTUAL,    
    
    INFO_CORREO_ALUMNOS: INFO_CORREO_ALUMNOS,
    
    INFO_CONFIGURACION:INFO_CONFIGURACION,

    ENVIAR_RECORDATORIO_PAGO_ALUMNO : ENVIAR_RECORDATORIO_PAGO_ALUMNO,

    SUCURSAL_USUARIO:SUCURSAL_USUARIO,
    REPORTE_MENSUALIDADES_MES_ACTUAL:REPORTE_MENSUALIDADES_MES_ACTUAL,

    SUCURSAL_USUARIO_ASIGNADAS :SUCURSAL_USUARIO_ASIGNADAS,

    CAT_DESCUENTOS:CAT_DESCUENTOS,
    
    REPORTE_CONBRANZA:REPORTE_CONBRANZA,
    
    IMAGEN_PERFIL:IMAGEN_PERFIL,
    ESTADO_CUENTA:ESTADO_CUENTA,
    ESTADO_CUENTA_ENVIAR:ESTADO_CUENTA_ENVIAR,
    ESTADO_CUENTA_PREVIEW:ESTADO_CUENTA_PREVIEW,
    USUARIOS_RH:USUARIOS_RH,
    REPORTE_ASISTECIAS_RH: ASISTENCIA_USUARIO_BASE +'/reporte_rh',
    AVISOS: AVISOS

}

export default URL;

