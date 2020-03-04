
import Vue from "vue";

export default {
  name: "input-email",
  template: `
    <div :class="['input-group', isEmailValid()]">
      <span class="input-group-addon" ><span class="fa fa-envelope"></span></span>
        <input type="email" 
              :class="clase ? clase : 'form-control'" 
              :placeholder="holder ? holder : ''" 
              @change="isEmailValid" 
              @input="isEmailValid" 
              :value="value"/>      
    </div>
     `,
  props: ["value","holder", "clase"],
  data() {
    return {
      email: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  }
  ,
  methods: {
    isEmailValid: function () {
      return (this.email == "") ? "" : (this.reg.test(this.email)) ? 'has-success' : 'has-error';
    }
  }
};


