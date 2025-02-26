// Elementi DOM
const cartItemsContainer = document.getElementById('cartItems'); // Contenitore degli elementi del carrello
const emptyCartMessage = document.getElementById('emptyCartMessage'); // Messaggio per carrello vuoto
const subtotalElement = document.getElementById('subtotal'); // Elemento per il subtotale
const shippingElement = document.getElementById('shipping'); // Elemento per i costi di spedizione
const discountElement = document.getElementById('discount'); // Elemento per lo sconto applicato
const discountRow = document.getElementById('discountRow'); // Riga dello sconto (per nasconderla/se mostrarla)
const totalElement = document.getElementById('total'); // Elemento per il totale
const discountCodeInput = document.getElementById('discountCode'); // Input per il codice sconto
const applyDiscountBtn = document.getElementById('applyDiscount'); // Bottone per applicare lo sconto
const discountMessage = document.getElementById('discountMessage'); // Messaggio per feedback sullo sconto
const checkoutBtn = document.getElementById('checkoutBtn'); // Bottone per il checkout
const confirmRemoveBtn = document.getElementById('confirmRemove'); // Bottone per confermare la rimozione di un articolo
const backToHomeBtn = document.getElementById('backToHomeBtn'); // Bottone per tornare alla home dopo l'ordine

// Variabili globali
let cart = []; // Array per memorizzare gli articoli nel carrello
let currentItemToRemove = null; // Variabile per memorizzare l'articolo da rimuovere
let appliedDiscount = 0; // Sconto applicato (percentuale o 'shipping' per spedizione gratuita)
const shippingCost = 5.99; // Costo fisso di spedizione
const discountCodes = {
    'DIVINE10': 10, // Codice sconto del 10%
    'WELCOME20': 20, // Codice sconto del 20%
    'FREESHIP': 'shipping', // Codice per spedizione gratuita
    'RIVERSOFBLOOD': 99 // Codice sconto speciale (99%)
};

// Inizializzazione della pagina
function initCart() {
    loadCart(); // Carica il carrello dal localStorage
    renderCart(); // Renderizza gli articoli nel carrello
    setupEventListeners(); // Configura gli event listener
}

// Carica il carrello dal localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart'); // Recupera il carrello salvato
    if (savedCart) {
        cart = JSON.parse(savedCart); // Converte il carrello in un array
    }
}

// Renderizza gli elementi del carrello
function renderCart() {
    if (cart.length === 0) {
        // Se il carrello è vuoto, mostra il messaggio e nascondi gli articoli
        emptyCartMessage.style.display = 'block';
        cartItemsContainer.style.display = 'none';
    } else {
        // Altrimenti, nascondi il messaggio e mostra gli articoli
        emptyCartMessage.style.display = 'none';
        cartItemsContainer.style.display = 'block';
        let cartHTML = ''; // Stringa per costruire l'HTML degli articoli

        // Itera su ogni articolo nel carrello
        cart.forEach(item => {
            let productTitle = item.displayName || item.name; // Nome del prodotto
            let unitPrice = item.displayPrice || item.price; // Prezzo unitario
            let totalPrice = unitPrice * item.quantity; // Prezzo totale per l'articolo

            let bundleInfo = ''; // Informazioni aggiuntive per i bundle
            let quantityControls = ''; // Controlli per la quantità

            if (item.isBundle && item.bundleSize > 1) {
                // Se è un bundle, mostra informazioni aggiuntive
                const discountPercentage = (item.bundleDiscount * 100).toFixed(0);
                bundleInfo = `<span class="badge bg-danger ms-2">Bundle ${item.bundleSize}x -${discountPercentage}%</span>`;

                // Per i bundle, disabilita i controlli di quantità
                quantityControls = `
                    <div class="quantity-controls">
                        <span class="quantity">${item.quantity}</span>
                    </div>
                `;

                // Mostra il prezzo originale se disponibile
                if (item.originalPrice) {
                    const originalTotal = item.originalPrice * item.quantity;
                    bundleInfo += `<div class="original-price text-muted text-decoration-line-through">€${originalTotal.toFixed(2)}</div>`;
                }
            } else {
                // Per articoli singoli, mostra i controlli di quantità
                quantityControls = `
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-outline-light quantity-btn minus" data-variant-id="${item.variantId || `${item.id}-${item.variantIndex || 0}-${item.bundleSize || 1}`}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-light quantity-btn plus" data-variant-id="${item.variantId || `${item.id}-${item.variantIndex || 0}-${item.bundleSize || 1}`}">+</button>
                    </div>
                `;
            }

            // Costruisci l'HTML per l'articolo
            cartHTML += `
                <div class="cart-item" data-variant-id="${item.variantId || `${item.id}-${item.variantIndex || 0}-${item.bundleSize || 1}`}">
                    <div class="row align-items-center">
                        <div class="col-md-2 col-4">
                            <img src="${item.displayImage || item.image}" alt="${productTitle}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-4 col-8">
                            <h3 class="cart-item-title">${productTitle} ${bundleInfo}</h3>
                            <p class="cart-item-category">${getCategoryDisplayName(item.category)}</p>
                        </div>
                        <div class="col-md-2 col-4 mt-3 mt-md-0">
                            ${quantityControls}
                        </div>
                        <div class="col-md-2 col-4 mt-3 mt-md-0 text-center">
                            <span class="cart-item-price">€${totalPrice.toFixed(2)}</span>
                        </div>
                        <div class="col-md-2 col-4 mt-3 mt-md-0 text-end">
                            <button class="btn btn-outline-danger remove-item" data-variant-id="${item.variantId || `${item.id}-${item.variantIndex || 0}-${item.bundleSize || 1}`}">
                                <i class="bi bi-trash"></i> Rimuovi
                            </button>
                        </div>
                    </div>
                </div>
                <hr class="divider">
            `;
        });

        cartItemsContainer.innerHTML = cartHTML; // Inserisci l'HTML nel contenitore
    }

    updateOrderSummary(); // Aggiorna il riepilogo dell'ordine
}

// Ottieni il nome visualizzato per una categoria
function getCategoryDisplayName(category) {
    switch (category) {
        case 'spiriti':
            return 'Spiriti';
        case 'vino-rosso':
        case 'rosso':
            return 'Vino Rosso';
        case 'vino-bianco':
        case 'bianco':
            return 'Vino Bianco';
        case 'birra':
            return 'Birra';
        case 'idromele':
            return 'Idromele';
        default:
            return category;
    }
}

// Aggiorna il riepilogo dell'ordine
function updateOrderSummary() {
    const subtotal = cart.reduce((total, item) => {
        const itemPrice = item.displayPrice || item.price;
        return total + (itemPrice * item.quantity);
    }, 0); // Calcola il subtotale

    subtotalElement.textContent = `€${subtotal.toFixed(2)}`; // Aggiorna il subtotale

    let discountAmount = 0; // Importo dello sconto
    if (appliedDiscount > 0) {
        discountAmount = (subtotal * appliedDiscount) / 100; // Calcola lo sconto percentuale
        discountRow.style.display = 'flex';
        discountElement.textContent = `-€${discountAmount.toFixed(2)}`;
    } else if (appliedDiscount === 'shipping') {
        discountRow.style.display = 'flex';
        discountElement.textContent = `-€${shippingCost.toFixed(2)}`; // Applica spedizione gratuita
    } else {
        discountRow.style.display = 'none'; // Nascondi la riga dello sconto
    }

    let total = subtotal; // Calcola il totale
    if (subtotal > 0) {
        if (appliedDiscount !== 'shipping') {
            total += shippingCost; // Aggiungi i costi di spedizione
            shippingElement.textContent = `€${shippingCost.toFixed(2)}`;
        } else {
            shippingElement.textContent = `€0.00`; // Spedizione gratuita
        }
    } else {
        shippingElement.textContent = `€0.00`;
    }

    if (typeof appliedDiscount === 'number' && appliedDiscount > 0) {
        total -= discountAmount; // Sottrai lo sconto percentuale
    }

    totalElement.textContent = `€${total.toFixed(2)}`; // Aggiorna il totale

    checkoutBtn.disabled = cart.length === 0; // Disabilita il pulsante di checkout se il carrello è vuoto
}

// Configura gli event listener
function setupEventListeners() {
    // Gestione dei pulsanti di quantità e rimozione
    cartItemsContainer.addEventListener('click', function (e) {
        const target = e.target;

        if (target.classList.contains('quantity-btn')) {
            const variantId = target.dataset.variantId;
            if (target.classList.contains('plus')) {
                changeQuantity(variantId, 1); // Aumenta la quantità
            } else if (target.classList.contains('minus')) {
                changeQuantity(variantId, -1); // Diminuisci la quantità
            }
        }

        if (target.classList.contains('remove-item') || target.parentElement.classList.contains('remove-item')) {
            const variantId = target.dataset.variantId || target.parentElement.dataset.variantId;
            openRemoveModal(variantId); // Apri il modal di conferma rimozione
        }
    });

    // Conferma rimozione articolo
    confirmRemoveBtn.addEventListener('click', function () {
        if (currentItemToRemove !== null) {
            removeItem(currentItemToRemove); // Rimuovi l'articolo
            currentItemToRemove = null;
            const modal = bootstrap.Modal.getInstance(document.getElementById('removeItemModal'));
            modal.hide(); // Chiudi il modal
        }
    });

    // Applica codice sconto
    applyDiscountBtn.addEventListener('click', applyDiscountCode);

    // Gestione checkout
    checkoutBtn.addEventListener('click', processCheckout);

    // Torna alla home dopo l'ordine
    backToHomeBtn.addEventListener('click', function () {
        cart = []; // Svuota il carrello
        saveCart();
        window.location.href = 'home.html'; // Reindirizza alla home
    });
}

// Cambia la quantità di un articolo
function changeQuantity(variantId, change) {
    const index = cart.findIndex(item => {
        const itemId = item.variantId || `${item.id}-${item.variantIndex || 0}-${item.bundleSize || 1}`;
        return itemId === variantId;
    });

    if (index !== -1) {
        if (cart[index].isBundle && cart[index].bundleSize > 1) {
            console.log("Non è possibile modificare la quantità di un bundle");
            return;
        }

        cart[index].quantity += change; // Modifica la quantità

        if (cart[index].quantity <= 0) {
            openRemoveModal(variantId); // Se la quantità è <= 0, rimuovi l'articolo
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Apre il modal di conferma rimozione
function openRemoveModal(productId) {
    currentItemToRemove = productId;
    const removeModal = new bootstrap.Modal(document.getElementById('removeItemModal'));
    removeModal.show();
}

// Rimuove un articolo dal carrello
function removeItem(variantId) {
    cart = cart.filter(item => {
        const itemId = item.variantId || `${item.id}-${item.variantIndex || 0}-${item.bundleSize || 1}`;
        return itemId !== variantId;
    });
    saveCart();
    renderCart();
}

// Salva il carrello nel localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Applica un codice sconto
function applyDiscountCode() {
    const code = discountCodeInput.value.trim().toUpperCase();

    if (code === '') {
        showDiscountMessage('Inserisci un codice sconto', 'warning');
        return;
    }

    if (discountCodes.hasOwnProperty(code)) {
        appliedDiscount = discountCodes[code];
        showDiscountMessage('Codice sconto applicato!', 'success');
        updateOrderSummary();
    } else {
        showDiscountMessage('Codice sconto non valido', 'error');
    }
}

// Mostra un messaggio di feedback per lo sconto
function showDiscountMessage(message, type) {
    discountMessage.textContent = message;
    discountMessage.className = 'discount-message mt-2';

    switch (type) {
        case 'success':
            discountMessage.classList.add('text-success');
            break;
        case 'warning':
            discountMessage.classList.add('text-warning');
            break;
        case 'error':
            discountMessage.classList.add('text-danger');
            break;
    }
}

// Elabora il checkout
function processCheckout() {
    if (cart.length === 0) {
        alert('Il tuo carrello è vuoto');
        return;
    }

    const orderConfirmModal = new bootstrap.Modal(document.getElementById('orderConfirmModal'));
    orderConfirmModal.show(); // Mostra il modal di conferma ordine
}

// Inizializza il carrello al caricamento della pagina
document.addEventListener('DOMContentLoaded', initCart);