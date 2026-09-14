import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

// Função que simula o trabalhador (executada em paralelo na thread)
if (!isMainThread) {
    const { numero, tempoTrabalho } = workerData;
    console.log(`Trabalhador ${numero} começou`);
    
    // Equivalente ao time.sleep em segundos (convertido para milissegundos)
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, tempoTrabalho * 1000);
    
    console.log(`Trabalhador ${numero} terminou (levou ${tempoTrabalho}s)`);
    parentPort?.postMessage('concluido');
} 
else {
    // Código principal (Main) equivalente ao do Python
    async function main() {
        console.log("Iniciando 5 trabalhadores...");
        const inicio = Date.now();
        
        // Criar lista de workers (threads)
        const workers: Promise<void>[] = [];
        
        // Criar e iniciar 5 threads
        for (let i = 0; i < 5; i++) {
            const workerPromise = new Promise<void>((resolve, reject) => {
                const worker = new Worker(__filename, {
                    workerData: { numero: i, tempoTrabalho: 2 }
                });
                
                worker.on('message', () => resolve());
                worker.on('error', reject);
            });
            
            workers.push(workerPromise);
        }
        
        // Aguardar todas as threads terminarem (equivalente ao thread.join())
        await Promise.all(workers);
        
        const fim = Date.now();
        const tempoTotal = (fim - inicio) / 1000;
        
        console.log(`\nTodos os trabalhadores terminaram!`);
        console.log(`Tempo total: ${tempoTotal.toFixed(2)}s`);
        console.log(`(Se fosse sequencial, levaria ~10s)`);
    }

    main();
}