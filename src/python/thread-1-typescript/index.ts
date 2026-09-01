// Função utilitária para simular a pausa (delay) de forma assíncrona
const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Função correspondente à `minha_funcao` do Python
async function minhaFuncao(): Promise<void> {
    console.log("Thread iniciada!");
    await sleep(2000); // Aguarda 2 segundos
    console.log("Thread finalizada!");
}

// Função principal
async function main(): Promise<void> {
    // Executa a função assíncrona e aguarda o término (equivalente ao start + join)
    await minhaFuncao();
    console.log("Programa principal finalizado!");
}

// Execução do ponto de entrada
if (require.main === module) {
    main();
}