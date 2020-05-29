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
    var el = evt.target
    if (el && el.classList.contains('link-tab')) {
        return true;
    }
    evt.stopPropagation();
    evt.preventDefault();
    if (el && ! el.classList.contains('without-navigation')) {
        index = 0
        limit = 10000;
        new_el = evt.path[index];
        while (! new_el.getAttribute('href') || limit <= 0) {
            index++;
            new_el = evt.path[index];
            limit--;
        }
        if (new_el.classList.contains('menu-item')) {
            removeAllActiveLink();
            new_el.classList.add('active');
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
    openMoreOptions();
    OnInsertSubItem();
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

/*
 * REMOVE CLASS 'active' FROM EACH MENU ITEM
 */
function removeAllActiveLink() {
    links = document.querySelectorAll('a.menu-item');
    if (links) {
        [].forEach.call(links, function(link) {
            link.classList.remove('active');
        });
    }
}


function openMoreOptions() {
    btnOptions = document.querySelectorAll('.open-more-options');
    if (btnOptions) {
        [].forEach.call(btnOptions, function(btn) {
            btn.addEventListener('click', function(evt) {
                evt.stopPropagation();
                var parent = evt.target.parentElement;
                if (parent) {
                    parent.classList.add('opened');
                }
            });
        });
        document.querySelector('body').addEventListener('click', function() {
            options = document.querySelectorAll('.more-options.opened');
            [].forEach.call(options, function(opt) {
                opt.classList.remove('opened');
            });
        });
    }
}



function OnInsertSubItem() {
    var buttons = document.querySelectorAll('.insert-sub-item');
    if (buttons) {
        PreventPagination();
        [].forEach.call(buttons, function(btn) {
            btn.removeEventListener('click', InsertSubItem);
            btn.addEventListener('click', InsertSubItem);
        });
    }
}


function InsertSubItem(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var el = evt.target;
    if (el) {
        index = 0
        limit = 10000;
        new_el = evt.path[index];
        while (! new_el.getAttribute('data-subitem') || limit <= 0) {
            index++;
            new_el = evt.path[index];
            limit--;
        }
        var url = new_el.getAttribute('data-subitem');
        if (url && url != '#' && url != '#!') {
            LoadSubItem(url);
        } else {
            PageNotFound();
        }
    }    
}

function LoadSubItem(url) {
    fetch(url)
    .then((response) => response.text())
    .then((html) => {
        document.getElementById('subitem').innerHTML = html;
        LoadSubItemScripts()
    })
    .catch((error) => {
        console.log(error)
        PageNotFound();
    });
}

function LoadSubItemScripts() {
    M.AutoInit();
    M.updateTextFields();
    RemoveSubItem();
}

function RemoveSubItem() {
    var btn = document.querySelector('#remove-subitem');
    if (btn)
    {
        btn.addEventListener('click', function() {
            console.log('xxxx')
            var subitem = document.querySelector('#subitem-content');
            if (subitem) {
                subitem.parentNode.removeChild(subitem);
            }
        })
    }
}