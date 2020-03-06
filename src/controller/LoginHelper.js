
import Vue from 'vue';


import { setSession, setToken } from '../helpers/Sesion';
import CONSTANTES from "../helpers/Constantes";

const cargarSesion = (loginRespuesta) => {
    return new Promise((resolve, reject) => {
        try {
            let paginaPrincipal = loginRespuesta.usuario.permiso_gerente ? "/ReporteAdmin" : "/principal";
            
            loginRespuesta.paginaPrincipal = paginaPrincipal;
            
            setSession(loginRespuesta);
            setToken(loginRespuesta.token);

            resolve(paginaPrincipal);
/*
            console.log("JSON " + JSON.stringify(loginRespuesta));
            if (loginRespuesta.usuario.permiso_gerente) {
                console.log("Mandar evento para admin");
                //this.$root.$emit('loginEnter', CONSTANTES.EVENTO_LOGIN_ADMIN);
                //this.$router.push({ path: "/ReporteAdmin" });
                //this.$router.replace({ path: "/ReporteAdmin" });              
                resolve("/ReporteAdmin");
            } else {
                console.log("Mandar evento para usuario general");
                //console.log("MENSAJE " + CONSTANTES.EVENTO_LOGIN);
                //this.$root.$emit('loginEnter', CONSTANTES.EVENTO_LOGIN);
                //this.$router.replace({ path: "/principal" });              
                //this.$router.push({ path: "/principal" });
                resolve("/Principal");
            }*/
        } catch (error) {
            reject(error);
        }
    });

};


export { cargarSesion };