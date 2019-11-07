
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
        label: 'Foto',
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
        tdClass: 'text-center',
      },
      {
        label: 'Apellidos',
        field: 'apellido_alumno',
        filterable: true,
        thClass: 'text-center',
        tdClass: 'text-center',
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
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM Do yy',
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: false,
      },    
      {
        label: 'Entrada',
        field: 'hora_entrada',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd hh:mm:ss',
        dateOutputFormat: 'hh:mm',
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
      },
      {
        label: 'Salida',
        field: 'hora_salida',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd hh:mm:ss',
        dateOutputFormat: 'hh:mm',
        thClass: 'text-center',
        tdClass: 'text-center',
        filterable: true,
      },
];


export default COLUMNS_TABLE_ASISTENCIA;