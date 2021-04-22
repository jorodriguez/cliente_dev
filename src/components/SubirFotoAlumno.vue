
<template>  
  <div>
    <croppa v-model="myCroppa" 
            canvas-color="transparent" 
            @init="onInit"
            :width="250"
            :height="250"
            prevent-white-space
            :accept="'image/*'"
            :placeholder="'Selecciona una foto'"
            :placeholder-font-size="12"
            :placeholder-color="'#3E85CC'"
            ></croppa>
      <button @click="generateImage">Subir</button>
      <button @click="zoomIn()">in</button>
      <button @click="zoomOut()">out</button>
      <button @click="rotate()">Rotar</button>
      <button @click="flipX()">voltear Derecha</button>
      <button @click="flipY()">voltear izquierda</button>

      
      <br>
      <img class="output" :src="imgUrl" >            
   </div>    
</template>

<script>
import Popup from "../controller/Popup";
import { operacionesApi } from "../helpers/OperacionesApi";
import { usuarioSesion, clearSesion } from "../helpers/Sesion";
import Vue from "vue";

import Croppa from 'vue-croppa';
Vue.use(Croppa);
import 'vue-croppa/dist/vue-croppa.css';
/* eslint-disable */
export default {  
  components: {
    Popup
  },
  name: "upload",  
  data() {
    return { 
      resultado:{},
      myCroppa: {},
      imgUrl: ''
    }
  },
  methods: {
     onInit() {
      this.myCroppa.addClipPlugin(function (ctx, x, y, w, h) {
        /*
         * ctx: canvas context
         * x: start point (top-left corner) x coordination
         * y: start point (top-left corner) y coordination
         * w: croppa width
         * h: croppa height
        */
        console.log(x, y, w, h)
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      })
    },
    generateImage() {
      console.log("Upload ");
      
      let url = this.myCroppa.generateDataUrl();
      if (!url) {
      	alert('no image');
        return;
      }
      this.imgUrl = url;

      this.myCroppa.generateBlob(
        blob => {
          // write code to upload the cropped image file (a file is a blob)
          this.subir(blob);
          console.log(blob);          
        },
        'image/jpeg',
        0.7
      );   
  },
  subir(blob){
    let data = new FormData();
    data.append('name', 'image');
    data.append('image', blob);     
    let urlApi = 'http://localhost:5100/imagen'; 
  this.$http
    .post(
      urlApi, 
      data,
      { headers: { "Content-Type": 'image/png' } }
      )
    .then(
      result => {
        this.resultado = result;
        console.log("todo bien al subi ");
      },
      error => {
        console.error(error);
                
      });
  },
  zoomIn(){
    this.myCroppa.zoomIn();
  },zoomOut(){
    this.myCroppa.zoomOut();
  },
  rotate () {
        this.myCroppa.rotate()
      },

      flipX () {
        this.myCroppa.flipX()
      },

      flipY () {
        this.myCroppa.flipY()
      },
    }  
}
</script>

