
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
        label: 'Dias Laborables',
        field: 'dias_laborables',                
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
      },
      {
        label: 'Sueldo Mensual',
        field: 'sueldo_base_mensual',                                
        hidden:true
      },
      {
        label: 'Sueldo (Quincenal)',
        field: 'sueldo_base_quincenal',                                
        hidden:false
      },
      {
        label: 'Pago Quincena',
        field: 'pago_sueldo_quincenal',                                
        hidden:false
      }, 
      {
        label: 'Pago Mensual',
        field: 'pago_sueldo_mensual',                                
        hidden:true
      },
      {
        label: 'porcentaje_falta',
        field: 'porcentaje_falta',                                
        hidden:true
      }

];


export default COLUMNS_TABLE_ASISTENCIA_SUCURSAL;