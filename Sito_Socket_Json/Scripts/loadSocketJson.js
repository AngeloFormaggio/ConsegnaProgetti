//Caricamento json SOCKET
async function loadContentSocket() {
    try 
    {
      const response = await fetch('Jsons/socketj.json');
      if (!response.ok) 
        {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }

      const dataSocket = await response.json();
  
      const contentSocketHtml = `
                <!-- Corpo principale -->
        <div class="row align-items-center">
            <!-- Immagine -->
            <div class="col-12 col-md-6 order-1 order-md-1">
            <img src="${dataSocket.image1Src}" alt="${dataSocket.image1Alt}" class="img-fluid">
            <i>${dataSocket.image1Fonte}</i>
            </div>
            <!-- Testo -->
            <div class="col-12 col-md-6 order-2 order-md-2">
            <h1>${dataSocket.title}</h1>
            <p>
                ${dataSocket.content1}
            </p>
            </div>
        </div>

        <div class="row align-items-center pt-5">
            <!-- Testo -->
            <div class="col-12 col-md-6 order-2 order-md-1">
            <h2>${dataSocket.subTitle1}</h2>
                <p>
                    ${dataSocket.content21}
                </p>
                <br>
                <h3>${dataSocket.subTitle11}</h3>
                <p>
                    ${dataSocket.content22}
                </p>
                <br>
                <h3>${dataSocket.subTitle12}</h3>
                <p>
                    ${dataSocket.content23}
                </p>
            </div>
            <!-- Immagine -->
            <div class="col-12 col-md-6 order-1 order-md-2">
            <img src="${dataSocket.image2Src}" alt="${dataSocket.image2Alt}" class="img-fluid">
            </div>
        </div>

        <div class="row align-items-center pt-5">
            <!-- Immagine -->
            <div class="col-12 col-md-6 order-1">
            <img src="${dataSocket.image3Src}" alt="${dataSocket.image3Alt}" class="img-fluid">
            </div>
            <!-- Testo -->
            <div class="col-12 col-md-6 order-2">
            <h2>${dataSocket.subTitle2}</h2>
                <p>
                    ${dataSocket.content3}
                </p>
                <br>
            </div>
        </div>
        <div style="margin-top: 100px;">
            <h2>${dataSocket.subTitle3}</h2>
            <p>
                ${dataSocket.content4}
            </p>
        </div>
      `;
  
      document.getElementById('main-content-socket').innerHTML = contentSocketHtml;
    } 
    catch (error) 
    {
      console.error('Errore durante il caricamento dei dati:', error);
    }
}
  
document.addEventListener('DOMContentLoaded', loadContentSocket);