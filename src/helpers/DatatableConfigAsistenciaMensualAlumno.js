
// constantes de configuracion de goof table
const COLUMNS_TABLE_ASISTENCIA_MENSUAL_ALUMNO = 
[
           
      {
        label: 'Fecha',
        field: 'fecha',
        filterable: false,
        thClass: 'text-center',
        tdClass: 'text-center',
      },
      {
        label: 'num_dia',
        field: 'num_dia',
        thClass: 'text-center',
        tdClass: 'text-left',
        hidden:true
      },
      {
        label: 'num_mes',
        field: 'num_mes',
        thClass: 'text-center',
        tdClass: 'text-left',
        hidden:true
      },
      {
        label: 'num_anio',
        field: 'num_anio',
        thClass: 'text-center',
        tdClass: 'text-left',
        hidden:true
      },     
      {
        label: 'nombre_dia',
        field: 'nombre_dia',       
       
        thClass: 'text-center',
        tdClass: 'text-center',                       
        hidden: true,
      },
      {
        label: 'asistencia',
        field: 'asistencia',               
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',   
        hidden: false,
      },
      {
        label: 'Fin Semana',
        field: 'es_fin_semana',               
       
        hidden: true,
      },
      {
        label: 'numero_asistencia',
        field: 'numero_asistencia',               
       
        hidden: true,
      },
     
];


export default COLUMNS_TABLE_ASISTENCIA_MENSUAL_ALUMNO;