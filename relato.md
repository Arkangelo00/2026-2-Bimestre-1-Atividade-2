# Relatório de Implementação de Linhas de Execução em TypeScript

## Introdução

O objetivo principal deste trabalho é relatar e analisar a implementação do conceito de linhas de execução (*threads* e concorrência) na linguagem TypeScript, por meio da "tradução" e reescrita das três questões propostas e disponibilizadas no repositório do GitHub.

**Integrantes do Grupo:** Arkângelo, Jadson e Luiz.

---

## Implementando Múltiplas Linhas de Execução em TypeScript

### Informações Gerais sobre o TypeScript

* **Objetivo e Paradigma:** O TypeScript é um *superset* (superconjunto) do JavaScript desenvolvido pela Microsoft que adiciona **tipagem estática opcional** e recursos modernos à linguagem base. Seu objetivo principal é capturar erros de tipo em tempo de compilação/desenvolvimento — e não em tempo de execução —, além de oferecer suporte a projetos de grande escala com melhor manutenibilidade e refatoração. É uma linguagem **multiparadigma**, suportando programação orientada a objetos, funcional e imperativa.
* **Onde é Utilizado:** O TypeScript roda em qualquer ambiente onde o JavaScript é executado. Ele é amplamente utilizado tanto no **Front-end** (navegadores web através de *frameworks* como React, Angular e Vue.js) quanto no **Back-end** (servidores web e APIs de alta concorrência rodando no ecossistema Node.js, Deno ou Bun).
* **Por que Escolhemos o TypeScript?** A escolha do TypeScript se deu devido à robustez do seu sistema de tipos, à legibilidade do código e à sua ampla adoção no mercado moderno de desenvolvimento. No contexto de Sistemas Operacionais, utilizar o TypeScript com o ambiente Node.js permite demonstrar como linguagens prioritariamente *single-threaded* gerenciam o paralelismo moderno e o processamento multinúcleo (*multicore*) sem perder a segurança dos tipos.

---

### Módulos e Conceitos de Execução Paralela

No ecossistema Node.js/TypeScript, por padrão, o código roda em um único thread da CPU (o *Event Loop*). Para criar e gerenciar **linhas de execução verdadeiramente paralelas**, utilizamos o módulo nativo **`worker_threads`**.

1. **Criando Linhas de Execução (`Worker`):** Instanciamos a classe `Worker`, passando o arquivo do script que deve ser executado em uma nova linha de execução paralela.
2. **Passando e Recebendo Valores (`workerData` e `postMessage`):** 
   * **Dados Iniciais:** Passamos informações para o Worker através da opção `workerData` na inicialização.
   * **Mensagens Dinâmicas:** A comunicação assíncrona entre a thread principal e a thread do Worker ocorre por troca de mensagens com os métodos `worker.postMessage()` e escutando o canal via `parentPort.on('message', ...)`.
3. **Gerenciamento de Múltiplas Threads (`Promise.all`):** Para executar várias threads em paralelo e aguardar o término de todas sem bloquear a aplicação principal, encapsulamos o ciclo de vida dos Workers em *Promises* e utilizamos `Promise.all()`.

---

### Exemplo Prático e Explicação do Código

Abaixo está a demonstração da estrutura utilizada para resolver os desafios propostos, dividida entre a **Thread Principal** e a **Worker Thread**.

#### 1. Código da Worker Thread (`worker.ts`)
Este script é executado em uma linha de execução separada:

```typescript
import { parentPort, workerData } from 'worker_threads';

// Interface para garantir tipagem estática nos dados recebidos
interface TarefaPayload {
  id: number;
  inicio: number;
  fim: number;
}

const payload = workerData as TarefaPayload;

// Processamento pesado/intensivo em CPU na thread secundária
let soma = 0;
for (let i = payload.inicio; i <= payload.fim; i++) {
  soma += i;
}

// Envia o resultado de volta para a thread principal
if (parentPort) {
  parentPort.postMessage({ id: payload.id, resultado: soma });
}




//Main.ts

import { Worker } from 'worker_threads';
import * as path from 'path';

function executarThread(id: number, inicio: number, fim: number): Promise<number> {
  return new Promise((resolve, reject) => {
    // Instancia uma nova linha de execução (Worker)
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: { id, inicio, fim }
    });

    // Escuta o retorno do Worker
    worker.on('message', (dados) => {
      console.log(`Thread ${dados.id} finalizada com resultado: ${dados.resultado}`);
      resolve(dados.resultado);
    });

    // Trata eventuais erros da thread
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker finalizou com código de erro ${code}`));
    });
  });
}

async function principal() {
  console.log("Iniciando execução paralela com TypeScript Worker Threads...");

  // Dispara 3 threads simultâneas
  const tarefas = [
    executarThread(1, 1, 1_000_000),
    executarThread(2, 1001, 2_000_000),
    executarThread(3, 2001, 3_000_000)
  ];

  // Aguarda a conclusão de todas as threads paralelas
  const resultados = await Promise.all(tarefas);
  console.log("Todas as threads concluídas. Resultados:", resultados);
}

principal();
