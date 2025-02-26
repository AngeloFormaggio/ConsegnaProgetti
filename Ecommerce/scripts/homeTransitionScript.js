// Aggiungi un event listener per eseguire il codice quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", () => {
    // Seleziona tutte le sezioni della pagina con la classe "section"
    const sections = document.querySelectorAll(".section");

    // Array di immagini di background per ogni sezione
    const bgImages = [
        'photos/homepage.png',         // Immagine di background per la Sezione 1
        'photos/RossoPuoServire2.jpg', // Immagine di background per la Sezione 2
        'photos/RossoScroll.jpg'       // Immagine di background per la Sezione 3 (inizialmente la stessa del carosello)
    ];

    // Seleziona l'elemento body della pagina
    const body = document.getElementById("mainBody");

    // Variabile per tenere traccia dell'indice dell'immagine di background corrente
    let currentBg = -1;

    // Funzione per aggiornare lo sfondo in base alla sezione visibile
    function updateBackground(force = false) {
        let index = 0; // Indice della sezione corrente

        // Itera su tutte le sezioni per determinare quale è attualmente visibile
        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect(); // Ottiene le coordinate della sezione
            // Controlla se la sezione è visibile al centro della finestra
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                index = i; // Imposta l'indice della sezione corrente
            }
        });

        // Se l'indice è cambiato o se è forzato l'aggiornamento
        if (index !== currentBg || force) {
            const newBg = bgImages[index]; // Ottieni l'immagine di background corrispondente

            // Crea un elemento temporaneo per gestire la transizione dello sfondo
            const tempBg = document.createElement("div");
            tempBg.style.position = "fixed";
            tempBg.style.top = "0";
            tempBg.style.left = "0";
            tempBg.style.width = "100%";
            tempBg.style.height = "100%";
            tempBg.style.backgroundImage = `url(${newBg})`; // Imposta l'immagine di background
            tempBg.style.backgroundSize = "cover";
            tempBg.style.backgroundPosition = "center";
            tempBg.style.backgroundAttachment = "fixed";
            tempBg.style.opacity = "0"; // Inizia con opacità 0 per la transizione
            tempBg.style.transition = "opacity 1s ease-in-out"; // Aggiungi una transizione fluida
            tempBg.style.zIndex = "-2"; // Posiziona dietro agli altri elementi

            // Aggiungi l'elemento temporaneo al body
            document.body.appendChild(tempBg);

            // Dopo un breve ritardo, applica l'opacità per avviare la transizione
            setTimeout(() => {
                tempBg.style.opacity = "1";
            }, 10);

            // Dopo 500ms, aggiorna lo sfondo del body e rimuovi l'elemento temporaneo
            setTimeout(() => {
                body.style.backgroundImage = `url(${newBg})`; // Imposta il nuovo background
                document.body.removeChild(tempBg); // Rimuovi l'elemento temporaneo
            }, 500);

            currentBg = index; // Aggiorna l'indice corrente
        }
    }

    // Aggiorna lo sfondo quando cambia l'immagine del carosello (solo per la sezione 3)
    const carousel = document.getElementById("carouselExample");
    if (carousel) {
        // Aggiungi un event listener per l'evento "slid.bs.carousel" (quando il carosello cambia slide)
        carousel.addEventListener("slid.bs.carousel", function () {
            const activeItem = carousel.querySelector(".carousel-item.active img"); // Ottieni l'immagine attiva
            if (activeItem) {
                bgImages[2] = activeItem.src; // Aggiorna l'immagine di background della sezione 3
                updateBackground(true); // Forza l'aggiornamento dello sfondo
            }
        });
    }

    // Imposta lo sfondo iniziale all'avvio
    updateBackground(true);

    // Aggiungi un event listener per aggiornare lo sfondo durante lo scroll
    window.addEventListener("scroll", updateBackground);
});

// Codice per il carosello
document.addEventListener("DOMContentLoaded", function () {
    // Seleziona il carosello e l'elemento di background sfocato
    var carousel = document.getElementById("carouselExample");
    var background = document.querySelector(".background-blur");

    // Funzione per aggiornare lo sfondo sfocato in base all'immagine attiva del carosello
    function updateBackground() {
        var activeItem = carousel.querySelector(".carousel-item.active"); // Ottieni l'elemento attivo del carosello
        var newBg = activeItem.getAttribute("data-bg"); // Ottieni l'URL dell'immagine di background

        // Fase 1: Fade out (riduci l'opacità per nascondere l'immagine corrente)
        background.style.opacity = "0";

        // Fase 2: Cambia l'immagine di background dopo un breve ritardo
        setTimeout(() => {
            background.style.backgroundImage = `url(${newBg})`; // Imposta la nuova immagine di background

            // Fase 3: Fade in (ripristina l'opacità per mostrare la nuova immagine)
            background.style.opacity = "0.5"; // Torna all'opacità normale
        }, 300); // Ritardo di 300ms per sincronizzarlo con la transizione
    }

    // Aggiungi un event listener per aggiornare lo sfondo quando il carosello cambia slide
    carousel.addEventListener("slid.bs.carousel", updateBackground);

    // Imposta lo sfondo iniziale all'avvio
    updateBackground();
});