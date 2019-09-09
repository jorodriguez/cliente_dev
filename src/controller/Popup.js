
import Vue from "vue";

export default {
  name: "Popup", 
  template: `
      <div :id="id == undefined ? [dynamicSlotName]: id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
                <slot name="header">
                    Header             
                </slot>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <slot name="content">
              </slot>            
          </div>
          <div class="modal-footer">
            <button v-if="show_button_close" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>`,  
    props: ["id", "show_button_close"],
    data() {
        return {  }
    },
    mounted(){
        //metodos de inicio
    }
};


    