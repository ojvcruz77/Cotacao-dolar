// Função para obter a cotação da API
async function getCotacao() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const data = await response.json();
        const cotacao = parseFloat(data.USDBRL.bid);
        document.getElementById('cotacao').innerText = `R$ ${cotacao.toFixed(2)}`;
        return cotacao;
    } catch (error) {
        document.getElementById('cotacao').innerText = 'Erro ao carregar';
        console.error('Erro ao buscar a cotação:', error);
    }
}

// Função para fazer a conversão de moeda
async function converter() {
    const cotacao = await getCotacao();
    const valor = parseFloat(document.getElementById('valor').value);
    const moeda = document.getElementById('moeda').value;
    let resultado;

    if (isNaN(valor)) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    if (moeda === 'USD') {
        resultado = valor * cotacao;
        document.getElementById('resultado').innerText = `R$ ${resultado.toFixed(2)}`;
    } else {
        resultado = valor / cotacao;
        document.getElementById('resultado').innerText = `US$ ${resultado.toFixed(2)}`;
    }
}

// Atualizar cotação a cada 5 minutos (300000 ms)
setInterval(getCotacao, 300000);

// Carregar a cotação ao carregar a página
window.onload = getCotacao;
