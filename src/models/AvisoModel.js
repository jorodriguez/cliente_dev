
export class AvisoModel {
    constructor(usuario) {
        this.id = null;
        this.titulo = "";
        this.para = "";
        this.aviso = "";
        this.etiquetas = "";
        this.nota_interna ="";
        this.etiquetas =  "";
        this.genero = null;       
    }

}


export class AvisoBuilder {
    constructor() { }

    setId(id) { this.id = id; return this; }
    setTitulo(titulo) { this.titulo = tituli; return this; }
    setPara(para) { this.para = para; return this; }
    setAviso(aviso) { this.aviso = aviso; return this; }
    setEtiqueta(etiqueta) { this.etiqueta = etiqueta; return this; }
    setNotaInterna(notaInterna) { this.notaInterna = notaInterna; return this; }
    setEtiquetas(etiquetas) { this.etiquetas = etiquetas; return this; }
    setGenero(genero) { this.genero = genero; return this; }
    clear() {
        this.setId(0);
        this.setTitulo("");
        this.setPara("");
        this.setAviso("");
        this.setEtiqueta("");
        this.setNotaInterna("");        
        this.setGenero(null);        
    }

    build() {
        return new AvisoModel(this);
    }

}
