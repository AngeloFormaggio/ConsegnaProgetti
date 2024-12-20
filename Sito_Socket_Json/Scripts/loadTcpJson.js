//Caricamento json tcp titolo
async function loadTitleTcp() 
{
    try 
    {
      const response = await fetch('Jsons/tcpj.json');
  
      // Leggere i dati in formato JSON
      const dataTcp= await response.json();
  
      // Costruire dinamicamente l'HTML
      const titleTcpHtml = `
       <h1>${dataTcp.introduzione.title}</h1>
        <p>${dataTcp.introduzione.subtitle}</p>

      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('tcp-title').innerHTML = titleTcpHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadTitleTcp);

//Caricamento json tcp spiegazione
async function loadSpiegazioneTcp() 
{
    try 
    {
      const response = await fetch('Jsons/tcpj.json');
  
      // Leggere i dati in formato JSON
      const dataTcp= await response.json();
  
      // Costruire dinamicamente l'HTML
      const spiegazioneTcpHtml = `
<!-- TCP Card -->
<div class="col-lg-6 d-flex">
    <div class="card text-light bg-dark h-100 w-100">
        <div class="card-header text-warning">
            ${dataTcp.descrizione.tcp_title}
        </div>
        <div class="card-body">
            <p>${dataTcp.descrizione.tcp_description}</p>
            <h5 class="card-title">${dataTcp.descrizione.tcp_caract}</h5>
            <ul>
                ${dataTcp.descrizione.tcp_list1}
            </ul>
            <h5 class="card-title">${dataTcp.descrizione.tcp_applications_title}</h5>
            <p>${dataTcp.descrizione.tcp_applications_description}</p>
            <ul>
                ${dataTcp.descrizione.tcp_list2}
            </ul>
        </div>
    </div>
</div>

<!-- UDP Card -->
<div class="col-lg-6 d-flex">
    <div class="card text-light bg-dark h-100 w-100">
        <div class="card-header text-warning">
            ${dataTcp.descrizione.udp_title}
        </div>
        <div class="card-body">
            <p>${dataTcp.descrizione.udp_description}</p>
            <h5 class="card-title">${dataTcp.descrizione.udp_caract}</h5>
            <ul>
                ${dataTcp.descrizione.udp_list1}
            </ul>
            <h5 class="card-title">${dataTcp.descrizione.udp_applications_title}</h5>
            <p>${dataTcp.descrizione.udp_applications_description}</p>
            <ul>
                ${dataTcp.descrizione.udp_list2}
            </ul>
        </div>
    </div>
</div>

      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('tcp-sp').innerHTML = spiegazioneTcpHtml;
    } 
    catch (error)
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadSpiegazioneTcp);

//Caricamento json tcp confronto
async function loadConfTcp() 
{
    try 
    {
      const response = await fetch('Jsons/tcpj.json');
  
      // Leggere i dati in formato JSON
      const dataTcp= await response.json();
  
      // Costruire dinamicamente l'HTML
      const ConfTcpHtml = `
        <div class="col-12">
    <div class="card text-light bg-dark">
        <div class="card-header text-warning">
            ${dataTcp.confronto.title}
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-dark table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>${dataTcp.confronto.indice1}</th>
                            <th>${dataTcp.confronto.indice2}</th>
                            <th>${dataTcp.confronto.indice3}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>${dataTcp.confronto.connection}</strong></td>
                            <td>${dataTcp.confronto.tcp_connection}</td>
                            <td>${dataTcp.confronto.udp_connection}</td>
                        </tr>
                        <tr>
                            <td><strong>${dataTcp.confronto.affidabilità}</strong></td>
                            <td>${dataTcp.confronto.tcp_aff}</td>
                            <td>${dataTcp.confronto.udp_aff}</td>
                        </tr>
                        <tr>
                            <td><strong>${dataTcp.confronto.dati}</strong></td>
                            <td>${dataTcp.confronto.tcp_dati}</td>
                            <td>${dataTcp.confronto.udp_dati}</td>
                        </tr>
                        <tr>
                            <td><strong>${dataTcp.confronto.velocita}</strong></td>
                            <td>${dataTcp.confronto.tcp_vel}</td>
                            <td>${dataTcp.confronto.udp_vel}</td>
                        </tr>
                        <tr>
                            <td><strong>${dataTcp.confronto.applicazioni}</strong></td>
                            <td>${dataTcp.confronto.tcp_app}</td>
                            <td>${dataTcp.confronto.udp_app}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

      `;
  
      // Inserimento del contenuto nel contenitore principale
      document.getElementById('Tcp-Conf').innerHTML = ConfTcpHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadConfTcp);