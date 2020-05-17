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
                            PageNotFound();
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