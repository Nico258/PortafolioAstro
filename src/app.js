//Cambio de tema
const storageTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const newTheme = storageTheme ?? systemTheme;

document.documentElement.setAttribute('data-theme', newTheme);

document.addEventListener('DOMContentLoaded', () => {

    const switcherTheme = document.querySelector('#switch');
    const root = document.documentElement;

    if(root.getAttribute('data-theme') === 'dark'){
        switcherTheme.checked = true;
    }

    switcherTheme.addEventListener('click', toggleTheme);

    function toggleTheme(){
        const setTheme = switcherTheme.checked ? 'dark' : 'light';

        root.setAttribute('data-theme', setTheme);
        localStorage.setItem('theme', setTheme);
    }

});

const dinamicText = document.querySelectorAll("[data-section]");
//Cambio de idioma
export async function changeLanguage (language) {
    language = language.includes('es') ? 'es':'en';
    localStorage.setItem("language", language);
    const json = await fetch(`src/resources/languages/${language}.json`);
    const text = await json.json();
    
    for(const ttx of dinamicText){
        const section = ttx.dataset.section;
        const value = ttx.dataset.value;
        const ob = ttx.dataset.item ?? null;

        if(ob == null){
            ttx.innerHTML = text[section][value];
        }else{
            ttx.innerHTML = text[section][ob][value];
        }
    }
};

const storageLanguage = localStorage.getItem('language');
const systemLanguage = window.navigator.userLanguage || window.navigator.language;

const main_language = storageLanguage ?? systemLanguage;

changeLanguage(main_language);
document.getElementById('select-language').value = main_language;

