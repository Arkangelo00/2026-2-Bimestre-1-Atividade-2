import { Worker, isMainThread, workerData } from 'worker_threads';

function saudar(nome: string, vezes: number): void {
    for (let i = 0; i < vezes; i++) {
        console.log(`Olá, ${nome}! (mensagem ${i + 1})`);
    }
}

if (isMainThread) {
    const thread = new Worker(__filename, {
        workerData: { nome: "Maria", vezes: 3 },
        execArgv: ['-r', 'ts-node/register']
    });

    thread.on('exit', (code: number) => {
        // Thread finalizada
    });

    thread.on('error', (err: Error) => {
        console.error("Erro na thread:", err);
    });

} else {
    const { nome, vezes } = workerData;
    saudar(nome, vezes);
}