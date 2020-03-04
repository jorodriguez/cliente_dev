
export class UsuarioModel {
    constructor(usuario) {
        this.id = null;
        this.nombre = "";
        this.correo = "";
        this.password = "";
        this.coSucursal = null;
        this.hora_entrada =null;
        this.hora_salida =  null;
        this.genero = null;
        this.token = '';
        this.foto =  '';
        this.activo =  false;
        this.motivoBaja =  '';
        this.fechaBaja =  '';
        this.nombreSucursal =  '';
        this.tipoUsuario = '';
        
       /* console.log("En el cos");
        this.id = usuario.id || null;
        this.nombre = usuario.nombre || '';
        this.correo = usuario.correo || '';
        this.password = usuario.password || '';
        this.coSucursal = usuario.co_sucursal || null;
        this.hora_entrada = usuario.hora_entrada || null;
        this.hora_salida = usuario.hora_salida || null;
        this.genero = usuario.genero || null;
        this.token = usuario.token || '';
        this.foto = usuario.foto || '';
        this.activo = usuario.activo || false;
        this.motivoBaja = usuario.motivoBaja || '';
        this.fechaBaja = usuario.fechaBaja || '';
        this.nombreSucursal = usuario.nombreSucursal || '';
        this.tipoUsuario = usuario.tipoUsuario || '';
        */
    }

}


export class UsuarioBuilder {
    constructor() { }

    setId(id) { this.id = id; return this; }
    setNombre(nombre) { this.nombre = nombre; return this; }
    setCorreo(correo) { this.correo = correo; return this; }
    setPassword(password) { this.password = password; return this; }
    setCoSucursal(coSucursal) { this.coSucursal = coSucursal; return this; }
    setHoraEntrada(horaEntrada) { this.horaEntrada = horaEntrada; return this; }
    setHoraSalida(horaSalida) { this.horaSalida = horaSalida; return this; }
    setGenero(genero) { this.genero = genero; return this; }
    setToken(token) { this.token = token; return this; }
    setFoto(foto) { this.foto = foto; return this; }
    setActivo(activo) { this.activo = activo; return this; }
    setMotivoBaja(motivoBaja) { this.genero = motivoBaja; return this; }
    setNombreSucursal(nombreSucursal) { this.nombreSucursal = nombreSucursal; return this; }
    setTipoUsuario(tipoUsuario) { this.tipoUsuario = tipoUsuario; return this; }
    clear() {
        this.setId(0);
        this.setNombre("");
        this.setCorreo("");
        this.setPassword("");
        this.setCoSucursal(0);
        this.setHoraEntrada(null);
        this.setHoraSalida(null);
        this.setGenero(null);
        this.setToken('');
        this.setFoto('');
        this.setActivo(true);
        this.setMotivoBaja("");
        this.setNombreSucursal("");
        this.tipoUsuario("");
    }

    build() {
        return new UsuarioModel(this);
    }

}
