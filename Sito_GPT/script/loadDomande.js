document.addEventListener('DOMContentLoaded', () => {
    let timeLeft = sessionStorage.getItem('timeLeft') || 600;  // 10 minuti in secondi
    const timerElement = document.getElementById('timer');

    // Funzione per aggiornare il timer
    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // Aggiungi uno zero davanti ai secondi se sono meno di 10
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Aggiorna il timer nella pagina
        timerElement.textContent = `${minutes}:${seconds}`;

        // Salva il tempo rimanente nel sessionStorage
        sessionStorage.setItem('timeLeft', timeLeft);

        // Se il timer arriva a zero, fermalo
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
        }

        timeLeft--;  // Decrescita del timer
    }

    // Avvia il timer e aggiorna ogni secondo
    const timerInterval = setInterval(updateTimer, 1000);

    // Avvia il timer solo se non è già in esecuzione (per evitare sovrapposizioni tra le pagine)
    if (!sessionStorage.getItem('timeLeft')) {
        timeLeft = 600;  // Imposta il tempo iniziale a 10 minuti
        sessionStorage.setItem('timeLeft', timeLeft);
    }

    // Gestisci la pagina della domanda (carica la domanda e gestisci la risposta)
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = urlParams.get('id');

    if (questionId) {
        fetch('jsons/domande.json')
            .then(response => response.json())
            .then(data => {
                const question = data.find(q => q.id == questionId);

                if (question) {
                    document.getElementById('question-text').textContent = question.question;
                    const savedAnswer = sessionStorage.getItem('answer-' + questionId); // Recupera la risposta salvata
                    document.getElementById('answer-text').value = savedAnswer || ''; // Precarica la risposta nella textarea
                } else {
                    document.getElementById('question-text').textContent = "Domanda non trovata!";
                }
            })
            .catch(error => {
                console.error('Errore nel caricamento del JSON:', error);
                document.getElementById('question-text').textContent = "Errore nel caricamento della domanda.";
            });
    }

    // Salva la risposta
    document.getElementById('save-btn').addEventListener('click', () => {
        const answerText = document.getElementById('answer-text').value;
        if (answerText) {
            // Salva la risposta nel sessionStorage con una chiave unica basata sull'id della domanda
            sessionStorage.setItem('answer-' + questionId, answerText);
            alert('Risposta salvata!');
        } else {
            alert('La risposta non può essere vuota!');
        }
    });

    // Torna al menu
    document.getElementById('menu-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
