

const COLUMNS_TABLE_ASISTENCIA_USUARIO_DETALLE = 
[
      {
        label: 'Id',
        field: 'id',
        hidden: true
      },    
      {
        label: 'Fecha',
        field: 'fecha_rango',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',        
      },
     
      {
        label: 'Entrada',
        field: 'hora_entrada',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',        
      },
      {
        label: 'Salida',
        field: 'hora_salida',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center ',        
      },
      {
        label: 'Comentario entrada',
        field: 'comentario_entrada',
        filterable: false,
        thClass: 'text-center ',
        tdClass: 'text-center small',        
      },
      {
        label: 'Comentario salida',
        field: 'comentario_salida',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center small',        
      },
      {
        label: 'falta',
        field: 'falta',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',
        hidden:true          
      },
      {
        label: 'dia_asueto',
        field: 'dia_asueto',
        hidden:true          
      },
      
     
];


export default COLUMNS_TABLE_ASISTENCIA_USUARIO_DETALLE;             