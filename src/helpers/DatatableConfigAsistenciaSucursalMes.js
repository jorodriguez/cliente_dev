
// constantes de configuracion de goof table
const COLUMNS_TABLE_ASISTENCIA_MES = 
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
      },
      {
        label: 'Alumno',
        field: 'nombre',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-left',
      },
      {
        label: 'Apellidos',
        field: 'apellidos',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',
        hidden: true
      },
      {
        label: 'Id_grupo',
        field: 'id_grupo',
        hidden: true
      },
      {
        label: 'Grupo',
        field: 'nombre_grupo',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',        
        
      },     
      {
        label: 'count_fechas',
        field: 'count_fechas', 
        hidden: true
      },
      {
        label: 'Asistencias',
        field: 'numero_asistencias',   
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',                       
        hidden: false,
      },
      {
        label: 'Faltas',
        field: 'numero_inasistencias',               
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',   
        hidden: false,
      },
      {
        label: 'Dias a la fecha actual (sin fines de semana)',
        field: 'num_dias_trabajados',          
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',        
                hidden:true
      },
      {
        label: '',    
        field:'opciones',    
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: false,
        hidden:true 
      },
];


export default COLUMNS_TABLE_ASISTENCIA_MES;