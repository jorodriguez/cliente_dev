
 //const BASE = 'https://api-ambiente-desarrollo.herokuapp.com';
 //const BASE = 'https://api-ambiente-desarrollo.herokuapp.com'
 //const BASE = 'https://api-ambiente-produccion.herokuapp.com',

const BASE = "http://localhost:5000" ;
const ASISTENCIA_BASE =  BASE + '/asistencia';

const URL = {    
    LOGIN : BASE+'/auth/login',    
    ASISTENCIA_BASE : ASISTENCIA_BASE,
    ASISTENCIA_POR_RECIBIR : ASISTENCIA_BASE + '/alumnos_por_recibidos/',//param sucursal
    ASISTENCIA_RECIBIDOS : ASISTENCIA_BASE + '/alumnos_recibidos/',//param sucursal
    ASISTENCIA_ENTRADA_ALUMNOS : ASISTENCIA_BASE + '/entradaAlumnos',
    ASISTENCIA_SALIDA_ALUMNOS : ASISTENCIA_BASE + '/salidaAlumnos',

}

export default URL;

//pasar urls aqui y llamar en los controladores