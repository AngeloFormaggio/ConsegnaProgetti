//Caricamento json Shell titolo
async function loadTitleShell() 
{
    try 
    {
      const response = await fetch('Jsons/shellj.json');
  
      // Leggere i dati in formato JSON
      const dataShell= await response.json();
  
      // Costruire dinamicamente l'HTML
      const titleShellHtml = `
        <h1 style="color: rgb(185, 0, 0);">${dataShell.introduzione.title}</h1>
        <p class="text-light">${dataShell.introduzione.subtitle}</p>
      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('shell-title').innerHTML = titleShellHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadTitleShell);

//Caricamento json Shell spiegazione
async function loadSpiegazioneShell() 
{
    try 
    {
      const response = await fetch('Jsons/shellj.json');
  
      // Leggere i dati in formato JSON
      const dataShell= await response.json();
  
      // Costruire dinamicamente l'HTML
      const spiegazioneShellHtml = `
        <div class="col-12">
            <div class="card text-light bg-dark">
                <div class="card-header text-warning">
                    ${dataShell.spiegazione.title}
                </div>
                <div class="card-body">
                    <p>
                        ${dataShell.spiegazione.description1}
                    </p>
                    <h5 class="card-title">${dataShell.spiegazione.subtitle1}</h5>
                    <ul>
                        ${dataShell.spiegazione.description2}
                    </ul>
                    <h5 class="card-title">${dataShell.spiegazione.subtitle3}</h5>
                    <p>
                        ${dataShell.spiegazione.description3}
                    </p>
                </div>
            </div>
        </div>
      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('shell-spiegazione').innerHTML = spiegazioneShellHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadSpiegazioneShell);

//Caricamento json Shell lab
async function loadLabShell() 
{
    try 
    {
      const response = await fetch('Jsons/shellj.json');
  
      // Leggere i dati in formato JSON
      const dataShell= await response.json();
  
      // Costruire dinamicamente l'HTML
      const labShellHtml = `
        <!-- Sezione laboratorio -->
        <div class="row mt-5">
          <div class="col-12">
           <div class="card text-light bg-dark">
            <div class="card-header text-warning">
                ${dataShell.laboratorio.title}
            </div>
            <div class="card-body">
                <h5 class="card-title">${dataShell.laboratorio.title_prerec}</h5>
                ${dataShell.laboratorio.prerec}

                <h5 class="card-title">${dataShell.laboratorio.subtitle1}</h5>
                <ol>
                    <li><strong>${dataShell.laboratorio.subtitle11}</strong></li>
                    <pre class="bg-dark text-light p-3">
                        ${dataShell.laboratorio.content11}
                    </pre>
                    <li><strong>${dataShell.laboratorio.subtitle12}</strong></li>
                    <pre class="bg-dark text-light p-3">
                        ${dataShell.laboratorio.content12}
                    </pre>

                    <li><strong>${dataShell.laboratorio.subtitle13}</strong></li>
                    <p>
                        ${dataShell.laboratorio.content13}
                    </p>
                    <li><strong>${dataShell.laboratorio.subtitle14}</strong></li>
                    <p>
                        ${dataShell.laboratorio.content14}
                    </p>
                </ol>

                <h5 class="card-title">${dataShell.laboratorio.subtitle2}</h5>
                <p style="color: red;">
                    ${dataShell.laboratorio.content2}
                </p>
            </div>
          </div>
        </div>
       </div>

      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('shell-lab').innerHTML = labShellHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadLabShell);