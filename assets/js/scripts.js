// Função para fazer uma solicitação AJAX e obter os dados das siglas
function fetchSiglasData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var siglasData = JSON.parse(xhr.responseText);
              callback(siglasData);
          } else {
              console.error('Erro ao buscar os dados das siglas:', xhr.status);
          }
      }
  };
  xhr.open('GET', '../data/siglario.json', true);
  xhr.send();
}

// Função para inicializar a aplicação após a obtenção dos dados das siglas
function initializeApp(siglasData) {
  // Função para renderizar a lista de siglas na página
  function renderSiglasList(siglas) {
      const siglasList = document.getElementById('siglasList');
      siglasList.innerHTML = ''; // Limpa a lista antes de renderizar

      siglas.forEach(sigla => {
          const li = document.createElement('li');
          li.textContent = `${sigla.sigla}: ${sigla.significado}`;
          siglasList.appendChild(li);
      });
  }

  // Função para filtrar siglas com base na pesquisa do usuário
  function searchSiglas() {
      const searchTerm = searchInput.value.trim().toLowerCase();

      const filteredSiglas = siglasData.filter(sigla => {
          return sigla.sigla.toLowerCase().includes(searchTerm) || sigla.significado.toLowerCase().includes(searchTerm);
      });

      renderSiglasList(filteredSiglas);
  }

  // Renderiza a lista de siglas na inicialização
  renderSiglasList(siglasData);

  // Adiciona um evento de input para a barra de pesquisa
  searchInput.addEventListener('input', searchSiglas);
}

// Faz a solicitação AJAX para obter os dados das siglas e inicializa a aplicação
fetchSiglasData(initializeApp);
