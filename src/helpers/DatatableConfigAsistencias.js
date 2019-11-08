
// constantes de configuracion de goof table
const COLUMNS_TABLE_ASISTENCIA = 
[
      {
        label: 'Id',
        field: 'id',
        hidden: true
      },
      {
        label: 'Id_alumno',
        field: 'id_alumno',
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
        field: 'nombre_alumno',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-left',
      },
      {
        label: 'Apellidos',
        field: 'apellido_alumno',
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
        label: 'Tiempo',
        field: 'tiempo',                
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
      },
      {
        label: '',
        field: 'alerta_tiempo',                
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
        hidden:true
      },
];


export default COLUMNS_TABLE_ASISTENCIA;