
// constantes de configuracion de goof table
const COLUMNS_TABLE_ASISTENCIA_ALUMNO = 
[
      {
        label: 'Id',
        field: 'id',
        hidden: true
      },                 
      {
        label: 'Fecha',
        field: 'fecha',                
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: false,
        hidden:true
      },    
      {
        label: 'Entrada',
        field: 'hora_entrada', 
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
      },
      {
        label: 'Salida',
        field: 'hora_salida',                
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
      },     
      {
        label: 'Cargos',
        field: 'cargos_extras',                
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
      },     
      
      
];


export default COLUMNS_TABLE_ASISTENCIA_ALUMNO;