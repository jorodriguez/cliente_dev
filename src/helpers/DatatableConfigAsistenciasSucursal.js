
// constantes de configuracion de goof table
const COLUMNS_TABLE_ASISTENCIA_SUCURSAL = 
[
      {
        label: 'Id',
        field: 'id',
        hidden: true
      },
      {
        label: 'Maestra',
        field: 'usuario',
        thClass: 'text-center',
        tdClass: 'text-left',        
        filterable: true,
      },            
      {
        label: 'Asistencias',
        field: 'count_dias_asistencia',
        thClass: 'text-center',
        tdClass: 'text-center font-weight-bold',        
        filterable: true,
      },
      {
        label: 'Faltas',
        field: 'count_dias_faltas',        
        thClass: 'text-center',
        tdClass: 'text-center font-weight-bold',        
        filterable: true,
      },
      {
        label: 'Dias Activos',
        field: 'dias_trabajo',                
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: false,
        hidden:true
      },
      {
        label: 'hora_entrada',
        field: 'hora_entrada',                        
        filterable: false,
        hidden:true
      } ,
      {
        label: 'hora_salida',
        field: 'hora_salida',                        
        filterable: false,
        hidden:true
      }         
];


export default COLUMNS_TABLE_ASISTENCIA_SUCURSAL;