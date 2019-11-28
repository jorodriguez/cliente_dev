

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
        tdClass: 'text-center',        
      },
      {
        label: 'comentario_entrada',
        field: 'comentario_entrada',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',        
      },
      {
        label: 'comentario_salida',
        field: 'comentario_salida',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',        
      },
      {
        label: 'falra',
        field: 'falta',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',
        hidden:true          
      },
     
];


export default COLUMNS_TABLE_ASISTENCIA_USUARIO_DETALLE;             