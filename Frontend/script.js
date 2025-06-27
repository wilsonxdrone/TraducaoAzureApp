document.addEventListener('DOMContentLoaded', () => {
     // (O restante do nosso código virá aqui dentro)

    // =========================================================================
    // PASSO 2: PEGAR OS ELEMENTOS DO HTML
    // Criamos variáveis para acessar os elementos HTML com os quais vamos interagir.
    // =========================================================================
    const textToTranslateEl = document.getElementById('text-to-translate');
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');

    // =========================================================================
    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA
    // =========================================================================
    // const subscriptionKey = "313KbzZa7968u7cNDvVA0JGg1YnraZT4Wisfkok1LACy9yuJIYpTJQQJ99BFACYeBjFXJ3w3AAAbACOGBRxP";
    // const locationOrRegion = "eastus";
    // const endpoint = "https://api.cognitive.microsofttranslator.com/";

    const backendApiUrl = 'https://publicarapptradusitebackend-gyb7dvgzakhudbes.eastus-01.azurewebsites.net/api/translate';

    async function translateText() {
        // Pega o texto do <textarea> e o idioma selecionado no <select>.
        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        // Verificação simples para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; 
        // Limpa o campo de resultado anterior.
        // (Código anterior para pegar os valores)
    
        // Monta a URL da API da Azure que vamos chamar.variavel use let
        // let url = `${endpoint}translate?api-version=3.0&to=${toLanguage}`;
        // if (fromLanguage) {
        //     url += `&from=${fromLanguage}`;
        // }
        
        // // O bloco try...catch é usado para lidar com possíveis erros.
         try {
        //     // A função 'fetch' faz a requisição para a API.
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Ocp-Apim-Subscription-Key': subscriptionKey,
        //             'Ocp-Apim-Subscription-Region': locationOrRegion,
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify([{ 'Text': textToTranslate }])
        //     });

//      let url = `${endpoint}translate?api-version=3.0&to=${toLanguage}`;
//         if (fromLanguage) {
//         url += `&from=${fromLanguage}`;
// }

        const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend
            method: 'POST',
            headers: {
                // <-- Cabeçalhos de autenticação REMOVIDOS
                'Content-type': 'application/json'
            },
            // <-- O corpo agora usa o formato que NOSSA API espera
            body: JSON.stringify({
                'text': textToTranslate,
                'to': toLanguage,
                'from': fromLanguage
            })
        });


        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Ocp-Apim-Subscription-Key': subscriptionKey,
        //         'Ocp-Apim-Subscription-Region': locationOrRegion,
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify([{ 'Text': textToTranslate }])
        // });

            
            // (Dentro da função translateText, dentro do bloco try)

            // // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
            // const data = await response.json();

            // // Se a resposta da API contém um erro (ex: chave inválida), nós o mostramos.
            // if (data.error) {
            //     throw new Error(data.error.message);
            // }

            // // Extraímos o texto traduzido do objeto de resposta.
                    // const translation = data[0].translations[0].text;
        const data = await response.json();

        // Verificamos o status da resposta diretamente
        if (!response.ok) {
            throw new Error(data.error || 'Ocorreu um erro no servidor.');
        }

        // Acessamos a tradução de forma muito mais direta
        const translation = data.translation;

                    // Colocamos o texto traduzido no <textarea> de resultado.
        translatedTextEl.value = translation;
        statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!
                

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        }
    }
    translateBtn.addEventListener('click', translateText);
    
})


