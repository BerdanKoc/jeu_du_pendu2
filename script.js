const affichage_mot = document.getElementById('le_mot_aleatoire');
const lettre_incorrect = document.getElementById('lettre_incorrect')
const popup = document.getElementById('popup')
const msg = document.getElementById('msg');


const lettreCorrecte = [];
const lettreIncorrecte = [];
const mots_a_deviner = ["berdan", "tacos", "romain"];
var aleatoire = Math.floor(Math.random() * mots_a_deviner.length);
var mot = mots_a_deviner[aleatoire];

console.log(mot)


let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
    <button class="btn btn-lg btn-primary m-2" id="${letter}" onClick="insertion('${letter}')">
        ${letter}
    </button>
    `).join('');

document.getElementById('les_boutons_ecran').innerHTML = buttonsHTML


function affichageLettre() {
    affichage_mot.innerHTML = `
        ${mot.split('').map(lettre => `
            <div class="lettre">
            ${lettreCorrecte.includes(lettre) ? lettre : ''}
            </div>
            `).join('')}
            `;
}

lettreCorrecte.push(mot[0])
lettreCorrecte.push(mot[mot.length - 1])

function mise_a_jour_lettre_incorrect() {
    const nombreErreurs = lettreIncorrecte.length;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = i < nombreErreurs;
    }
    lettre_incorrect.innerHTML = `
        ${lettreIncorrecte.length > 0 ? '<h3> Les Lettres Incorrectes</h3>' : ''}
        ${lettreIncorrecte.map(lettre => `<span>${lettre}</span>`).join('')}
    `;
}

function finDeJeu(message) {
    const popup = document.getElementById('popup');
    const messageFin = document.getElementById('message-fin');
    messageFin.textContent = message;
    popup.style.display = 'flex';
}

function insertion(lettre) {
    const estLettreCorrecte = mot.includes(lettre);
    const tableauCorrect = estLettreCorrecte ? lettreCorrecte : lettreIncorrecte;

    if (!tableauCorrect.includes(lettre)) {
        tableauCorrect.push(lettre);
        estLettreCorrecte ? affichageLettre() : mise_a_jour_lettre_incorrect();
    }
    if (lettreIncorrecte.length === 6) {
        finDeJeu('Dommage Romain !!!! Tu as perdu!!!!!! nullll!!! Le mot était ' + mot);
    }
    if (lettreCorrecte.length === mot.length) {
        finDeJeu('Tu est trop fort Romainnnn !!')
    }
    document.getElementById(lettre).disabled = true;
}



window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 & e.keyCode <= 90) {
        const lettre = e.key;
        const estLettreCorrecte = mot.includes(lettre);
        const tableauCorrect = estLettreCorrecte ? lettreCorrecte : lettreIncorrecte;

        if (!tableauCorrect.includes(lettre)) {
            tableauCorrect.push(lettre);
            estLettreCorrecte ? affichageLettre() : mise_a_jour_lettre_incorrect();
            if (lettreIncorrecte.length === 6) {
                finDeJeu('Dommage Romain !!!! Tu as perdu!!!!!! nullll!!! Le mot était ' + mot);
            }
            if (lettreCorrecte.length === mot.length) {
                finDeJeu('Tu est trop fort Romainnnn !!')
            }
        }
        document.getElementById(lettre).disabled = true;
    }
});

function recommencerPartie() {
    lettreCorrecte.length = 0;
    lettreIncorrecte.length = 0;

    const boutons = document.querySelectorAll('.btn');
    boutons.forEach(bouton => bouton.disabled = false);

    aleatoire = Math.floor(Math.random() * mots_a_deviner.length);
    mot = mots_a_deviner[aleatoire];

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = true;
    });

    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    lettreCorrecte.push(mot[0])
    lettreCorrecte.push(mot[mot.length - 1])

    affichageLettre();
    mise_a_jour_lettre_incorrect()
}




affichageLettre()