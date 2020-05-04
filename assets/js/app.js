document.addEventListener('DOMContentLoaded', function () {

    // dropdowns
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});

    // sidebar
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    //modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    // selects
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    // chips
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems, {
        autocompleteOptions: {
            data: {
                'Luciano Coelho': null,
                'Sabrina Bet': null,
                'Fogaça': null
            },
            limit: Infinity,
            minLength: 1
        },
        placeholder: 'Add Professor',
        secondaryPlaceholder: '+ Professor',
        onChipAdd: function() {
            M.updateTextFields();
        }
    });

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        container: document.body
    });
});

