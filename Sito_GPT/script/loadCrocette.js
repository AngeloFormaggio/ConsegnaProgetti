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

    // Caricamento delle domande dal file JSON
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    
    fetch('jsons/crocette.json')
        .then(response => response.json())
        .then(data => {
            const questionsContainer = document.getElementById('crocette-questions');
            const questions = data[`categoria${categoria}`];  // Carica le domande della categoria scelta

            if (questions) {
                questions.forEach((q, index) => {
                    const questionHTML = `
                        <div class="question" id="question-${index}">
                            <p>${q.question}</p>
                            <div class="answers">
                                ${q.answers.map((answer, i) => `
                                    <label>
                                        <input type="radio" name="question${index}" value="${answer}" id="answer-${index}-${i}" ${getSavedAnswer(index, answer) ? 'checked' : ''}>
                                        ${answer}
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    questionsContainer.innerHTML += questionHTML;
                });
            }
        });

    // Funzione per recuperare la risposta salvata (se esiste)
    function getSavedAnswer(questionIndex, answer) {
        const savedAnswers = JSON.parse(sessionStorage.getItem('answers')) || {};
        return savedAnswers[questionIndex] === answer;
    }

    // Aggiungi un listener per salvare le risposte quando l'utente seleziona una risposta
    document.getElementById('crocette-questions').addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'radio') {
            saveAnswer(e.target.name, e.target.value);
        }
    });

    // Funzione per salvare la risposta nel sessionStorage
    function saveAnswer(questionName, answer) {
        const savedAnswers = JSON.parse(sessionStorage.getItem('answers')) || {};
        const questionIndex = questionName.replace('question', '');

        savedAnswers[questionIndex] = answer;

        sessionStorage.setItem('answers', JSON.stringify(savedAnswers));
    }

    // Funzionalità per salvare le risposte e tornare al menu
    document.getElementById('save-btn').addEventListener('click', () => {
        alert('Risposte salvate!');
        // Le risposte vengono salvate automaticamente tramite sessionStorage,
        // quindi non è necessario fare altro qui.
    });

    document.getElementById('menu-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

});
