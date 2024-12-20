// Impostazione del timer che parte da 10 minuti
let time = sessionStorage.getItem('timeLeft') || 600; // 10 minuti in secondi
let timerElement = document.getElementById('timer');

// Funzione per aggiornare il timer
function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    // Aggiungi uno zero davanti ai numeri se sono minori di 10
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    // Imposta il valore del timer
    timerElement.textContent = `${minutes}:${seconds}`;

    // Decrementa il tempo
    if (time > 0) {
        time--;
    } else {
        clearInterval(timerInterval); // Ferma il timer quando arriva a zero
        alert('Il tempo è scaduto!');
    }

    // Salva il tempo rimanente nel sessionStorage
    sessionStorage.setItem('timeLeft', time);
}

// Avvia il timer
let timerInterval = setInterval(updateTimer, 1000);

// Funzione per scaricare le risposte salvate come file di testo
function saveAnswers() {
    let answers = '';

    // Recupera tutte le risposte salvate nel sessionStorage per domande a risposta aperta
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        if (key.startsWith('answer-')) {
            let answer = sessionStorage.getItem(key);
            answers += `${key}: ${answer}\n`;
        }
    }

    // Aggiungi le risposte delle crocette
    const crocetteResults = getCrocetteResults();
    crocetteResults.forEach(result => {
        answers += `${result.question}: ${result.answer} (Risposta corretta: ${result.correct ? 'Sì' : 'No'})\n`;
    });

    if (answers) {
        // Crea un blob con le risposte
        let blob = new Blob([answers], { type: 'text/plain' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'risposte.txt'; // Nome del file di testo
        link.click(); // Esegue il download
    } else {
        alert('Non ci sono risposte salvate!');
    }
}

// Funzione per ottenere i risultati delle crocette (domande a scelta multipla)
function getCrocetteResults() {
    let results = [];
    
    // Recupera i dati dal sessionStorage per le risposte delle crocette
    const crocetteData = ['1', '2']; // ID delle categorie delle crocette (puoi modificarlo se necessario)
    
    crocetteData.forEach(categoria => {
        // Carica il JSON relativo alla categoria
        fetch('jsons/domande.json')
            .then(response => response.json())
            .then(data => {
                let categoriaData = data['categoria' + categoria];
                
                categoriaData.forEach((question, index) => {
                    const answerKey = 'answer-categoria' + categoria + '-q' + (index + 1);
                    const savedAnswer = sessionStorage.getItem(answerKey);
                    const correct = savedAnswer === question.correct; // Confronta la risposta con la risposta corretta
                    
                    results.push({
                        question: question.question,
                        answer: savedAnswer,
                        correct: correct
                    });
                });
            })
            .catch(error => {
                console.error('Errore nel caricamento del JSON:', error);
            });
    });

    return results;
}

// Aggiungi l'evento per il bottone "Fine"
document.querySelector('.fine-box').addEventListener('click', () => {
    // Chiede conferma all'utente prima di salvare
    let confirmSave = confirm('Vuoi salvare le risposte in un file di testo?');
    if (confirmSave) {
        saveAnswers();
    }
});
