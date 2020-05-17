MakeNavigation();
LoadScripts();


function MakeNavigation() {
    var links = document.querySelectorAll('a');
    if (links) {
        console.log('make');
        [].forEach.call(links, function(link) {
            link.addEventListener('click', function(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                    var el = evt.target
                    if (el) {
                        index = 0
                        limit = 10000;
                        new_el = evt.path[index];
                        while (! new_el.getAttribute('href') || limit <= 0) {
                            index++;
                            new_el = evt.path[index];
                            limit--;
                        }
                        var url = new_el.getAttribute('href');
                        if (url && url != '#' && url != '#!') {
                            LoadPages(url);
                        } else {
                            return true;
                        }
                    }    
            });
        });
    }
}

function LoadPages(url) {
    fetch(url)
    .then((response) => response.text())
    .then((html) => {
        document.getElementById('app').innerHTML = html;
        MakeNavigation();
        setTimeout(function() {
            LoadScripts();
        },200);
    })
    .catch((error) => {
        console.log(error)
    });
}

function LoadScripts() {

    // dropdowns
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});

    // sidebar
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});

    //modal
    M.Modal.init(document.querySelectorAll('.modal'), {});

    // selects
    M.FormSelect.init(document.querySelectorAll('select'), {});

    // chips
    M.Chips.init(document.querySelectorAll('.chips'), {
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

    // datepicker
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        container: document.body
    });

}