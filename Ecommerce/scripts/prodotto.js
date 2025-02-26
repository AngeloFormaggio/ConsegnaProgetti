// Elementi DOM
const productImage = document.getElementById('productImage'); // Immagine del prodotto
const productName = document.getElementById('productName'); // Nome del prodotto
const productCategory = document.getElementById('productCategory'); // Categoria del prodotto
const productPrice = document.getElementById('productPrice'); // Prezzo del prodotto
const productDescription = document.getElementById('productDescription'); // Descrizione del prodotto
const productGrado = document.getElementById('productGrado'); // Grado alcolico del prodotto
const productFrom = document.getElementById('productFrom'); // Provenienza del prodotto
const addToCartBtn = document.getElementById('addToCartBtn'); // Bottone per aggiungere al carrello
const quantityElement = document.querySelector('.quantity'); // Elemento che mostra la quantità
const minusBtn = document.querySelector('.quantity-btn.minus'); // Bottone per diminuire la quantità
const plusBtn = document.querySelector('.quantity-btn.plus'); // Bottone per aumentare la quantità
const variantSelector = document.getElementById('productVariant'); // Selettore di varianti del prodotto

// Elementi per bundle
const singlePriceElement = document.getElementById('singlePrice'); // Prezzo per l'acquisto di un singolo prodotto
const threePriceElement = document.getElementById('threePrice'); // Prezzo per l'acquisto di un bundle di 3 prodotti
const sixPriceElement = document.getElementById('sixPrice'); // Prezzo per l'acquisto di un bundle di 6 prodotti
const bundleOptions = document.querySelectorAll('input[name="bundleOption"]'); // Opzioni di bundle disponibili

let currentProduct = null; // Prodotto attualmente visualizzato
let selectedVariant = 0; // Variante selezionata (0 per la variante principale, 1 per la variante alternativa)
let quantity = 1; // Quantità selezionata
let selectedBundle = 1; // Bundle selezionato (1 = singolo, 3 = bundle di 3, 6 = cassa da 6)

// Sconti bundle
const DISCOUNT_THREE = 0.10; // 10% di sconto per 3 bottiglie
const DISCOUNT_SIX = 0.15;   // 15% di sconto per 6 bottiglie

// Funzione per caricare i dettagli del prodotto
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search); // Ottieni i parametri dall'URL
    const productId = urlParams.get('id'); // Ottieni l'ID del prodotto dall'URL

    if (!productId) {
        alert('Prodotto non trovato'); // Se l'ID non è presente, mostra un alert
        window.location.href = 'archivio.html'; // Reindirizza alla pagina dell'archivio
        return;
    }

    try {
        const response = await fetch('jsons/products.json'); // Carica il file JSON dei prodotti
        if (!response.ok) {
            throw new Error('Impossibile caricare i prodotti'); // Se il caricamento fallisce, lancia un errore
        }
        const products = await response.json(); // Converti la risposta in JSON
        currentProduct = products.find(product => product.id === parseInt(productId)); // Trova il prodotto con l'ID corrispondente

        if (!currentProduct) {
            alert('Prodotto non trovato'); // Se il prodotto non è trovato, mostra un alert
            window.location.href = 'archivio.html'; // Reindirizza alla pagina dell'archivio
            return;
        }

        // Controlla se il prodotto ha varianti
        if (hasVariants(currentProduct)) {
            setupVariantSelector(); // Configura il selettore di varianti se il prodotto ne ha
        } else {
            // Nascondi il selettore se non ci sono varianti
            if (variantSelector) {
                variantSelector.parentElement.style.display = 'none';
            }
        }

        displayProductDetails(); // Mostra i dettagli del prodotto
        updateBundlePrices(); // Aggiorna i prezzi dei bundle
    } catch (error) {
        console.error('Errore durante il caricamento dei prodotti:', error); // Log dell'errore
        alert('Si è verificato un errore durante il caricamento dei dettagli del prodotto.'); // Mostra un alert in caso di errore
    }
}

// Controlla se il prodotto ha varianti
function hasVariants(product) {
    return product.name1 !== undefined && product.price1 !== undefined; // Restituisce true se il prodotto ha varianti
}

// Configura il selettore di varianti
function setupVariantSelector() {
    if (!variantSelector) return; // Se non c'è un selettore di varianti, esci dalla funzione
    
    // Pulisci le opzioni esistenti
    variantSelector.innerHTML = '';
    
    // Aggiungi le opzioni di variante
    const option1 = document.createElement('option');
    option1.value = '0';
    option1.textContent = currentProduct.name; // Aggiungi la variante principale
    variantSelector.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = '1';
    option2.textContent = currentProduct.name1; // Aggiungi la variante alternativa
    variantSelector.appendChild(option2);
    
    // Mostra il selettore
    variantSelector.parentElement.style.display = 'block';
    
    // Aggiungi l'event listener per il cambio di variante
    variantSelector.addEventListener('change', function() {
        selectedVariant = parseInt(this.value); // Aggiorna la variante selezionata
        displayProductDetails(); // Aggiorna i dettagli del prodotto
        updateBundlePrices(); // Aggiorna i prezzi dei bundle
    });
}

// Funzione per visualizzare i dettagli del prodotto in base alla variante selezionata
function displayProductDetails() {
    if (selectedVariant === 0 || !hasVariants(currentProduct)) {
        // Visualizza la variante principale
        productImage.src = currentProduct.image; // Imposta l'immagine del prodotto
        productImage.alt = currentProduct.name; // Imposta l'alt text dell'immagine
        productName.textContent = currentProduct.name; // Imposta il nome del prodotto
        productPrice.textContent = `€${currentProduct.price.toFixed(2)}`; // Imposta il prezzo del prodotto
        productGrado.textContent = currentProduct.grado || 'Non disponibile'; // Imposta il grado alcolico
    } else {
        // Visualizza la variante alternativa
        productImage.src = currentProduct.image1; // Imposta l'immagine della variante alternativa
        productImage.alt = currentProduct.name1; // Imposta l'alt text dell'immagine
        productName.textContent = currentProduct.name1; // Imposta il nome della variante alternativa
        productPrice.textContent = `€${currentProduct.price1.toFixed(2)}`; // Imposta il prezzo della variante alternativa
        productGrado.textContent = currentProduct.grado1 || 'Non disponibile'; // Imposta il grado alcolico
    }
    
    // Elementi comuni a entrambe le varianti
    productCategory.textContent = getCategoryDisplayName(currentProduct.category); // Imposta la categoria del prodotto
    productDescription.textContent = currentProduct.description; // Imposta la descrizione del prodotto
    productFrom.textContent = currentProduct.from || 'Non disponibile'; // Imposta la provenienza del prodotto
}

// Funzione per ottenere il nome visualizzato della categoria
function getCategoryDisplayName(category) {
    switch(category) {
        case 'spiriti':
            return 'Spiriti'; // Restituisce "Spiriti" per la categoria 'spiriti'
        case 'vino-rosso':
        case 'rosso':
            return 'Vino Rosso'; // Restituisce "Vino Rosso" per le categorie 'vino-rosso' e 'rosso'
        case 'vino-bianco':
        case 'bianco':
            return 'Vino Bianco'; // Restituisce "Vino Bianco" per le categorie 'vino-bianco' e 'bianco'
        case 'birra':
            return 'Birra'; // Restituisce "Birra" per la categoria 'birra'
        case 'idromele':
            return 'Idromele'; // Restituisce "Idromele" per la categoria 'idromele'
        default:
            return category; // Restituisce la categoria originale se non è mappata
    }
}

// Funzione per calcolare il prezzo del bundle
function calculateBundlePrice(basePrice, bundleSize) {
    let discount = 0; // Inizializza lo sconto
    if (bundleSize === 3) {
        discount = DISCOUNT_THREE; // Applica lo sconto del 10% per il bundle di 3
    } else if (bundleSize === 6) {
        discount = DISCOUNT_SIX; // Applica lo sconto del 15% per il bundle di 6
    }
    
    // Calcola il prezzo con lo sconto per il bundle
    const discountedPrice = basePrice * (1 - discount);
    return (discountedPrice * bundleSize).toFixed(2); // Restituisce il prezzo scontato
}

// Funzione per aggiornare i prezzi dei bundle
function updateBundlePrices() {
    const currentPrice = selectedVariant === 0 ? currentProduct.price : currentProduct.price1; // Ottieni il prezzo base in base alla variante selezionata
    
    if (singlePriceElement) {
        singlePriceElement.textContent = `€${currentPrice.toFixed(2)}`; // Aggiorna il prezzo per l'acquisto singolo
    }
    
    if (threePriceElement) {
        const threePrice = calculateBundlePrice(currentPrice, 3); // Calcola il prezzo per il bundle di 3
        threePriceElement.textContent = `€${threePrice}`; // Aggiorna il prezzo per il bundle di 3
    }
    
    if (sixPriceElement) {
        const sixPrice = calculateBundlePrice(currentPrice, 6); // Calcola il prezzo per il bundle di 6
        sixPriceElement.textContent = `€${sixPrice}`; // Aggiorna il prezzo per il bundle di 6
    }
}

// Funzione per aggiungere il prodotto al carrello
function addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Ottieni il carrello dal localStorage o crea un nuovo array
    
    // Ottieni il bundle selezionato
    selectedBundle = parseInt(document.querySelector('input[name="bundleOption"]:checked').value);
    
    // Calcola il prezzo base in base alla variante selezionata
    const basePrice = selectedVariant === 0 ? currentProduct.price : currentProduct.price1;
    
    // Se è un bundle, calcoliamo lo sconto
    let finalPrice = basePrice;
    let bundleDiscount = 0;
    
    if (selectedBundle === 3) {
        bundleDiscount = DISCOUNT_THREE; // Applica lo sconto del 10% per il bundle di 3
    } else if (selectedBundle === 6) {
        bundleDiscount = DISCOUNT_SIX; // Applica lo sconto del 15% per il bundle di 6
    }
    
    finalPrice = basePrice * (1 - bundleDiscount); // Calcola il prezzo finale con lo sconto
    
    // Crea un oggetto prodotto con i dettagli della variante selezionata
    const productToAdd = {
        ...currentProduct,
        variantIndex: selectedVariant,
        displayName: selectedVariant === 0 ? currentProduct.name : currentProduct.name1,
        displayPrice: finalPrice,
        originalPrice: basePrice,
        displayImage: selectedVariant === 0 ? currentProduct.image : currentProduct.image1,
        quantity: quantity * selectedBundle,
        isBundle: selectedBundle > 1,
        bundleSize: selectedBundle,
        bundleDiscount: bundleDiscount
    };
    
    // Chiave unica per identificare il prodotto con variante nel carrello
    const cartItemKey = `${currentProduct.id}-${selectedVariant}-${selectedBundle}`;
    
    const existingProductIndex = cart.findIndex(item => 
        item.id === currentProduct.id && 
        item.variantIndex === selectedVariant &&
        item.bundleSize === selectedBundle
    );

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity * selectedBundle; // Se il prodotto è già nel carrello, aumenta la quantità
    } else {
        cart.push(productToAdd); // Altrimenti, aggiungi il prodotto al carrello
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Salva il carrello aggiornato nel localStorage
    
    let message = '';
    if (selectedBundle === 1) {
        message = `${productToAdd.displayName} è stato aggiunto al carrello!`; // Messaggio per l'acquisto singolo
    } else {
        const discountPercentage = bundleDiscount * 100;
        message = `Bundle di ${selectedBundle} ${productToAdd.displayName} aggiunto al carrello con sconto del ${discountPercentage}%!`; // Messaggio per l'acquisto di un bundle
    }
    
    alert(message); // Mostra un alert con il messaggio
}

// Gestione della quantità
minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--; // Diminuisce la quantità
        quantityElement.textContent = quantity; // Aggiorna l'elemento che mostra la quantità
    }
});

plusBtn.addEventListener('click', () => {
    quantity++; // Aumenta la quantità
    quantityElement.textContent = quantity; // Aggiorna l'elemento che mostra la quantità
});

// Event listener per le opzioni di bundle
if (bundleOptions) {
    bundleOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedBundle = parseInt(this.value); // Aggiorna il bundle selezionato
        });
    });
}

// Aggiungi al carrello
addToCartBtn.addEventListener('click', addToCart); // Aggiunge il prodotto al carrello quando il bottone è cliccato

// Carica i dettagli del prodotto quando la pagina è pronta
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails(); // Carica i dettagli del prodotto quando il DOM è completamente caricato
});