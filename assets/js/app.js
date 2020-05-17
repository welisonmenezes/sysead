MakeNavigation();
LoadScripts();

function MakeNavigation() {
    var links = document.querySelectorAll('a');
    if (links) {
        PreventPagination();
        [].forEach.call(links, function(link) {
            link.removeEventListener('click', AddNavEvent);
            link.addEventListener('click', AddNavEvent);
        });
    }
}

function AddNavEvent(evt) {
    evt.stopPropagation();
    evt.preventDefault();
        var el = evt.target
        if (el && ! el.classList.contains('without-navigation')) {
            index = 0
            limit = 10000;
            new_el = evt.path[index];
            while (! new_el.getAttribute('href') || limit <= 0) {
                index++;
                new_el = evt.path[index];
                limit--;
            }
            if (! new_el.classList.contains('without-navigation')) {
                var url = new_el.getAttribute('href');
                if (url && url != '#' && url != '#!') {
                    LoadPages(url);
                } else {
                    PageNotFound();
                }
            }
            
        }    
}

function LoadPages(url) {
    fetch(url)
    .then((response) => response.text())
    .then((html) => {
        document.getElementById('app').innerHTML = html;
        MakeNavigation();
        LoadScripts();
    })
    .catch((error) => {
        console.log(error)
        PageNotFound();
    });
}

function PageNotFound() {
    document.getElementById('app').innerHTML = '<main class="content-area text-center"><p>Página não encontrada.</p></main>'; 
}

function LoadScripts() {
    M.AutoInit();
    M.updateTextFields();
}

function PreventPagination() {
    var links = document.querySelectorAll('.pagination a');
    if (links) {
        [].forEach.call(links, function(link) {
            link.classList.add('without-navigation');
        });
    }
}