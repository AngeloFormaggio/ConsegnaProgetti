// Variabili globali
let allProducts = []; // Array per memorizzare tutti i prodotti caricati dal JSON
let filteredProducts = []; // Array per memorizzare i prodotti filtrati in base ai criteri
let currentCategory = 'tutti'; // Categoria attualmente selezionata (default: 'tutti')
let currentMaxPrice = 500; // Prezzo massimo selezionato per il filtro (default: 500)
let currentSortOption = 'default'; // Opzione di ordinamento selezionata (default: 'default')
let currentSearchTerm = ''; // Termine di ricerca inserito dall'utente

// Elementi DOM
const productsGrid = document.getElementById('products-grid'); // Griglia per visualizzare i prodotti
const productTemplate = document.getElementById('product-template'); // Template per la card del prodotto
const categoryTitle = document.getElementById('category-title'); // Titolo della categoria selezionata
const productsCount = document.getElementById('count-number'); // Contatore dei prodotti visualizzati
const priceRange = document.getElementById('price-range'); // Input range per il filtro del prezzo
const priceValue = document.getElementById('price-value'); // Valore visualizzato del prezzo massimo
const sortBy = document.getElementById('sort-by'); // Dropdown per l'ordinamento dei prodotti
const categoryLinks = document.querySelectorAll('.category-item'); // Link per le categorie
const applyFiltersBtn = document.querySelector('.apply-filters'); // Bottone per applicare i filtri
const loadingElement = document.getElementById('loading'); // Elemento per il caricamento
const searchInput = document.getElementById('search-input'); // Input per la ricerca

// Funzione per caricare i prodotti dal JSON
async function loadProducts() {
    try {
        const response = await fetch('jsons/products.json'); // Effettua una richiesta per caricare il file JSON
        if (!response.ok) {
            throw new Error('Impossibile caricare i prodotti'); // Gestisce errori di rete
        }
        allProducts = await response.json(); // Converte la risposta in un array di prodotti

        // Imposta il valore massimo del range di prezzo in base al prodotto più costoso
        const maxProductPrice = Math.ceil(Math.max(...allProducts.map(product => product.price)));
        priceRange.max = maxProductPrice; // Imposta il valore massimo del range
        priceRange.value = maxProductPrice; // Imposta il valore corrente del range
        currentMaxPrice = maxProductPrice; // Aggiorna la variabile globale
        priceValue.textContent = `${maxProductPrice}€`; // Aggiorna il valore visualizzato

        // Inizializza i prodotti e i filtri
        initializePage();
    } catch (error) {
        console.error('Errore durante il caricamento dei prodotti:', error); // Log dell'errore
        loadingElement.innerHTML = `<p class="text-center text-danger">Si è verificato un errore durante il caricamento dei prodotti.</p>`; // Mostra un messaggio di errore
    }
}

// Inizializzazione della pagina
function initializePage() {
    // Controlla se c'è un parametro nella URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('categoria');

    if (categoryParam && isValidCategory(categoryParam)) {
        currentCategory = categoryParam; // Imposta la categoria corrente
        updateCategoryUI(currentCategory); // Aggiorna l'interfaccia utente
    }

    // Applica i filtri iniziali
    applyFilters();

    // Aggiungi listener per gli eventi
    setupEventListeners();
}

// Funzione per verificare se la categoria è valida
function isValidCategory(category) {
    const validCategories = ['tutti', 'spiriti', 'vino-rosso', 'vino-bianco', 'birra', 'idromele'];
    return validCategories.includes(category); // Restituisce true se la categoria è valida
}

// Aggiorna l'interfaccia utente per la categoria selezionata
function updateCategoryUI(category) {
    // Rimuovi la classe active da tutti i link
    categoryLinks.forEach(item => {
        item.classList.remove('active');
    });

    // Aggiungi la classe active al link corrente
    const activeLink = document.querySelector(`.category-item[data-category="${category}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Aggiorna il titolo della categoria
    let categoryName = 'Tutti i prodotti'; // Default

    switch (category) {
        case 'spiriti':
            categoryName = 'Spiriti';
            break;
        case 'vino-rosso':
            categoryName = 'Vini Rossi';
            break;
        case 'vino-bianco':
            categoryName = 'Vini Bianchi';
            break;
        case 'birra':
            categoryName = 'Birre';
            break;
        case 'idromele':
            categoryName = 'Idromele';
            break;
    }

    categoryTitle.textContent = categoryName; // Aggiorna il titolo
}

// Configura gli ascoltatori di eventi
function setupEventListeners() {
    // Listener per i link di categoria
    categoryLinks.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); // Previene il comportamento predefinito del link
            currentCategory = this.dataset.category; // Imposta la categoria corrente
            updateCategoryUI(currentCategory); // Aggiorna l'interfaccia utente
            applyFilters(); // Applica i filtri

            // Aggiorna l'URL senza ricaricare la pagina
            const url = new URL(window.location);
            if (currentCategory === 'tutti') {
                url.searchParams.delete('categoria'); // Rimuove il parametro se la categoria è 'tutti'
            } else {
                url.searchParams.set('categoria', currentCategory); // Aggiunge il parametro alla URL
            }
            history.pushState({}, '', url); // Aggiorna la cronologia del browser
        });
    });

    // Listener per il range di prezzo
    priceRange.addEventListener('input', function () {
        priceValue.textContent = `${this.value}€`; // Aggiorna il valore visualizzato
        currentMaxPrice = parseInt(this.value); // Aggiorna la variabile globale
    });

    // Listener per il selettore di ordinamento
    sortBy.addEventListener('change', function () {
        currentSortOption = this.value; // Aggiorna l'opzione di ordinamento
    });

    // Listener per il pulsante di applicazione filtri
    applyFiltersBtn.addEventListener('click', applyFilters);

    // Listener per l'input di ricerca (con debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout); // Cancella il timeout precedente
        searchTimeout = setTimeout(() => {
            currentSearchTerm = this.value.trim().toLowerCase(); // Aggiorna il termine di ricerca
            applyFilters(); // Applica i filtri
        }, 300); // Debounce di 300ms
    });
}

// Applica i filtri correnti
function applyFilters() {
    // Filtra per categoria
    if (currentCategory === 'tutti') {
        filteredProducts = [...allProducts]; // Mostra tutti i prodotti
    } else {
        filteredProducts = allProducts.filter(product => product.category === currentCategory); // Filtra per categoria
    }

    // Filtra per prezzo
    filteredProducts = filteredProducts.filter(product => product.price <= currentMaxPrice);

    // Filtra per termine di ricerca
    if (currentSearchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description?.toLowerCase().includes(currentSearchTerm)
        );
    }

    // Applica l'ordinamento
    sortProducts();

    // Visualizza i prodotti filtrati
    displayProducts();
}

// Ordina i prodotti in base all'opzione selezionata
function sortProducts() {
    switch (currentSortOption) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price); // Ordina per prezzo crescente
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price); // Ordina per prezzo decrescente
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); // Ordina per nome crescente
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name)); // Ordina per nome decrescente
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id); // Ordine predefinito (per ID)
            break;
    }
}

// Visualizza i prodotti nella griglia
function displayProducts() {
    // Rimuovi il loader
    loadingElement.style.display = 'none';

    // Pulisci la griglia dei prodotti
    productsGrid.innerHTML = '';

    // Aggiorna il contatore dei prodotti
    productsCount.textContent = filteredProducts.length;

    // Se non ci sono prodotti, mostra un messaggio
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="col-12 text-center py-5"><p>Nessun prodotto corrisponde ai filtri selezionati.</p></div>';
        return;
    }

    // Crea e aggiungi ogni card prodotto
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product); // Crea la card del prodotto
        productsGrid.appendChild(productCard); // Aggiunge la card alla griglia
    });
}

// Crea una card prodotto dal template
function createProductCard(product) {
    const clone = document.importNode(productTemplate.content, true); // Clona il template

    // Imposta i dati del prodotto nella card
    const productImage = clone.querySelector('.product-image');
    productImage.src = product.image; // Imposta l'immagine del prodotto
    productImage.alt = product.name; // Imposta l'alt text

    clone.querySelector('.product-name').textContent = product.name; // Imposta il nome
    clone.querySelector('.product-category').textContent = getCategoryDisplayName(product.category); // Imposta la categoria
    clone.querySelector('.product-price').textContent = `${product.price.toFixed(2)}€`; // Imposta il prezzo

    // Imposta il link al dettaglio prodotto
    const viewProductLink = clone.querySelector('.btn-view-product');
    viewProductLink.href = `prodotto.html?id=${product.id}`;

    // Aggiungi funzionalità per il carrello
    const addToCartBtn = clone.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(product)); // Aggiunge il prodotto al carrello

    return clone; // Restituisce la card clonata
}

// Ottieni il nome visualizzato per una categoria
function getCategoryDisplayName(category) {
    switch (category) {
        case 'spiriti':
            return 'Spiriti';
        case 'vino-rosso':
            return 'Vino Rosso';
        case 'vino-bianco':
            return 'Vino Bianco';
        case 'birra':
            return 'Birra';
        case 'idromele':
            return 'Idromele';
        default:
            return category;
    }
}

// Funzionalità di aggiunta al carrello
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Recupera il carrello dal localStorage

    // Crea un ID variante per mantenere consistenza con la pagina prodotto
    const variantId = `${product.id}-0`;

    // Controlla se il prodotto è già nel carrello
    const existingProductIndex = cart.findIndex(item => item.variantId === variantId);

    if (existingProductIndex !== -1) {
        // Se esiste, aumenta la quantità
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Altrimenti, aggiungi il prodotto con quantità 1
        cart.push({
            ...product,
            variantId: variantId,
            variant: 0, // Imposta la variante principale
            quantity: 1
        });
    }

    // Salva il carrello aggiornato nel localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Feedback all'utente
    alert(`${product.name} è stato aggiunto al carrello!`);
}

// Carica i prodotti quando la pagina è completamente caricata
document.addEventListener('DOMContentLoaded', loadProducts);