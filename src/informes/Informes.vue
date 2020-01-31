   
    <template>
        <div id="id_informes">

        </div>
    </template>
    
    <script>
   export default {
    data: () => ({
      
    }),
    mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://js.hsforms.net/forms/shell.js')
      document.head.appendChild(recaptchaScript)

      console.log("Add");
      let info = document.createElement('script')
      info.setAttribute('src', 'hbspt.forms.create({portalId: "5264178",	formId: "8a4e3938-bf2e-4edf-9de5-ad5790750538"});')
      //info.appendChild('hbspt.forms.create({portalId: "5264178",	formId: "8a4e3938-bf2e-4edf-9de5-ad5790750538"});')
      let elem = document.elementById("id_informes");
      elem.appendChild(info)
      
    },
    methods: {
      
    }
  }
    
    </script>
    
            
    
    <style>
    
    </style>