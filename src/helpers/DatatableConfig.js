
// constantes de configuracion de goof table
const TABLE_CONFIG = {
     PAGINATION_OPTIONS:{
        enabled: true,
        mode: 'records',
        perPage: 10,
        position: 'bottom',
        //perPageDropdown: [3, 7, 9],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        rowsPerPageLabel: 'Registros por pagina',
        ofLabel: 'de',
        pageLabel: 'Pagina', // for 'pages' mode
        allLabel: 'Todos',
    },
    SELECT_OPTIONS:{
        enabled: true,
        selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'Registro(s)',
        clearSelectionText: 'Limpiar ',
        disableSelectInfo: true, // disable the select info panel on top
    },
    NO_SELECT_OPTIONS:{
        enabled: false,
        selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'Registro(s)',
        clearSelectionText: 'Limpiar ',
        disableSelectInfo: true, // disable the select info panel on top
    },
    SEARCH_OPTIONS : {
        enabled: true,                        
        //  skipDiacritics: true,                        
          placeholder: 'Buscar'  
    }
};

export default TABLE_CONFIG;