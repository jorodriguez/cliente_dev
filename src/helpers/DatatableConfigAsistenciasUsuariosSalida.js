

const COLUMNS_TABLE_ASISTENCIA_USUARIO_SALIDA = 
[
      {
        label: 'Id',
        field: 'id',
        hidden: true
      },    
      {
        label: '',
        field: 'foto',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',
        hidden:true
      },
      {
        label: 'Usuario',
        field: 'nombre',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-left',
      },
     /* {
        label: 'Entrada',
        field: 'hora_entrada',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',  
        hidden:true      
      },
      {
        label: 'Salida',
        field: 'hora_salida',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',        
        hidden:true
      },*/
      {
        label: 'Entrada',
        field: 'hora_asistencia_entrada',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',          
      },
      {
        label: 'Salida',
        field: 'hora_asistencia_salida',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',        
        
      },      
      {
        label: '',
        field: 'botones',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',        
      },
];


export default COLUMNS_TABLE_ASISTENCIA_USUARIO_SALIDA;