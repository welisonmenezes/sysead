MakeNavigation();
LoadScripts();

/*
 * APPLY THE 'DINAMIC' NAVIGATION EVENT AT ALL TAG <a>
 */
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

/*
 * CREATE THE 'DINAMIC' NAVIGATION
 *   - ELEMENTS WITH 'without-navigation' CLASS WILL NOT BE AFFECTED
 */
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

/*
 * LOAD PAGES INTO THE TAG WITH ID 'app'
 */
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

/*
 * ADD ERROR MESSAGE TO ELEMENT WITH ID 'app'
 */
function PageNotFound() {
    document.getElementById('app').innerHTML = '<main class="content-area text-center"><p>Página não encontrada.</p></main>'; 
}

/*
 * RUN ALL THIRD JS SCRIPT (EG.: materalizecss JS METHODS)
 */
function LoadScripts() {
    M.AutoInit();
    M.updateTextFields();
}

/*
 * ADD CLASS 'without-navigation' AT PAGINATIONS LINKS TO DISABLE THEM
 */
function PreventPagination() {
    var links = document.querySelectorAll('.pagination a');
    if (links) {
        [].forEach.call(links, function(link) {
            link.classList.add('without-navigation');
        });
    }
}