//Caricamento json Osi Introduzione
async function loadTitleOsi() 
{
    try 
    {
      const response = await fetch('Jsons/osij.json');
  
      // Leggere i dati in formato JSON
      const dataOsi= await response.json();
  
      // Costruire dinamicamente l'HTML
      const titleOsiHtml = `
    <div class="container mt-5 pt-4">
        <h1 class="text-center">${dataOsi.introduzione.title}</h1>
    </div>
    <div class="container pt-5">
      <div class="row">
          <div class="col-md-7">
              <p>${dataOsi.introduzione.content}</p>
          </div>
            <div class="col-md-5">
                <img src="${dataOsi.introduzione.imageSrc}" alt="${dataOsi.introduzione.imageAlt}" class="img-fluid">
            </div>
        </div>
    </div>
      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('osi-title').innerHTML = titleOsiHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadTitleOsi);

//Caricamento json Osi accordion
async function loadAccordionOsi() 
{
    try 
    {
      const response = await fetch('Jsons/osij.json');
  
      // Leggere i dati in formato JSON
      const dataOsi= await response.json();
  
      // Costruire dinamicamente l'HTML
      const accordionOsiHtml = `
    <div class="accordion" id="accordionPila">
    <!-- Livello 7 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading1">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                ${dataOsi.accordion.titleLvl7}
            </button>
        </h2>
        <div id="collapse1" class="accordion-collapse collapse" aria-labelledby="heading1" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl7}</p>
                <div class="text-center">
                    <img src="${dataOsi.accordion.imageLvl7}" alt="${dataOsi.accordion.imageAltLvl7}" class="img-fluid rounded">
                    <p class="mt-2"><i>${dataOsi.accordion.subtitleLvl7}</i></p>
                </div>
            </div>
        </div>
    </div>
    <!-- Livello 6 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading2">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                ${dataOsi.accordion.titleLvl6}
            </button>
        </h2>
        <div id="collapse2" class="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl6}</p>
                <div class="text-center">
                    <img src="${dataOsi.accordion.imageLvl6}" alt="${dataOsi.accordion.imageAltLvl6}" class="img-fluid rounded">
                    <p class="mt-2"><i>${dataOsi.accordion.subtitleLvl6}</i></p>
                </div>
            </div>
        </div>
    </div>
    <!-- Livello 5 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading3">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                ${dataOsi.accordion.titleLvl5}
            </button>
        </h2>
        <div id="collapse3" class="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl5}</p>
            </div>
        </div>
    </div>
    <!-- Livello 4 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading4">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                ${dataOsi.accordion.titleLvl4}
            </button>
        </h2>
        <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl4}</p>
                <div class="text-center">
                    <img src="${dataOsi.accordion.imageLvl4}" alt="${dataOsi.accordion.imageAltLvl4}" class="img-fluid rounded">
                    <p class="mt-2"><i>${dataOsi.accordion.subtitleLvl4}</i></p>
                </div>
            </div>
        </div>
    </div>
    <!-- Livello 3 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading5">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                ${dataOsi.accordion.titleLvl3}
            </button>
        </h2>
        <div id="collapse5" class="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl3}</p>
            </div>
        </div>
    </div>
    <!-- Livello 2 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading6">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                ${dataOsi.accordion.titleLvl2}
            </button>
        </h2>
        <div id="collapse6" class="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl2}</p>
            </div>
        </div>
    </div>
    <!-- Livello 1 -->
    <div class="accordion-item">
        <h2 class="accordion-header" id="heading7">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                ${dataOsi.accordion.titleLvl1}
            </button>
        </h2>
        <div id="collapse7" class="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordionPila">
            <div class="accordion-body">
                <p>${dataOsi.accordion.contentLvl1}</p>
            </div>
        </div>
    </div>
</div>

      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('osi-accordion').innerHTML = accordionOsiHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadAccordionOsi);