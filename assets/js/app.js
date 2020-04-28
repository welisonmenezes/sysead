document.addEventListener('DOMContentLoaded', function() {

    // dropdowns
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});

    // sidebar
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    
    //modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
});

