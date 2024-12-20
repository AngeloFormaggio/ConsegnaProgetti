//Caricamento json INDEX
async function loadContentIndex() 
{
    try 
    {
      // Aggiorna il percorso al file JSON
      const response = await fetch('Jsons/indexj.json');
  
      // Controlla se la risposta è ok (status 200)
      if (!response.ok) 
        {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
  
      // Leggi i dati in formato JSON
      const dataIndex = await response.json();
  
      // Costruisci dinamicamente l'HTML
      const contentIndexHtml = `
        <!-- Testo a sinistra -->
        <div class="col-md-6">
          <h1>${dataIndex.title}</h1>
          <p>${dataIndex.content}</p>
        </div>
        
        <!-- Foto a destra -->
        <div class="col-md-6">
          <img src="${dataIndex.imageSrc}" alt="${dataIndex.imageAlt}" class="img-fluid">
        </div>
      `;
  
      // Inserisci il contenuto nel contenitore principale
      document.getElementById('main-content-index').innerHTML = contentIndexHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
  
// Chiama la funzione quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadContentIndex);