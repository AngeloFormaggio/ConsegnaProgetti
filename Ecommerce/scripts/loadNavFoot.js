// Aggiungi un event listener per eseguire il codice quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function () {
    // Carica la navbar
    fetch("components/nav.html") // Effettua una richiesta per caricare il file HTML della navbar
        .then(response => response.text()) // Converte la risposta in testo
        .then(data => {
            // Inserisce il contenuto della navbar nell'elemento con ID "nav-section"
            document.getElementById("nav-section").innerHTML = data;
        })
        .catch(error => console.error("Errore nel caricamento della navbar:", error)); // Gestisce eventuali errori durante il caricamento

    // Carica il footer
    fetch("components/foot.html") // Effettua una richiesta per caricare il file HTML del footer
        .then(response => response.text()) // Converte la risposta in testo
        .then(data => {
            // Inserisce il contenuto del footer nell'elemento con ID "foot-section"
            document.getElementById("foot-section").innerHTML = data;
        })
        .catch(error => console.error("Errore nel caricamento del footer:", error)); // Gestisce eventuali errori durante il caricamento
});
