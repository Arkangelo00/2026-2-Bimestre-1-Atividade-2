Este relato faz parte do processo avaliativo da disciplina de sistemas operacionais no curso superior em análise e desenvolvimento de sistemas, ofertado na Diretoria acadêmica de gestão e tecnologia da informação no campus natal-central do instituto federal de educação, ciência e tecnologia do rio grande do norte.
Tem como objetivo principal relatar como implementar linhas de execução na linguagem **TypeScript**.
O grupo de trabalho foi formado por Arkângelo, Luiz e Jadson.

# Implementando múltiplas linhas de execução em TypeScript

## Informações gerais sobre TypeScript

O **TypeScript** é um superconjunto fortemente tipado do JavaScript desenvolvido pela Microsoft que compila para JavaScript puro. Trata-se de uma linguagem **multiparadigma**, suportando os estilos **orientado a objetos, funcional e imperativo**. 

O TypeScript/Node.js é de código aberto e está amplamente disponível em praticamente todos os ambientes operacionais através do runtime Node.js (Windows, Linux, macOS) e em plataformas de desenvolvimento baseadas em nuvem, como o **GitHub Codespaces**.

Ao contrário do Python ou C, o modelo padrão de execução do TypeScript/Node.js baseia-se em um **modelo de I/O não-bloqueante orientado a eventos (*Event Loop*)**, executado em uma única thread principal. O objetivo principal do modelo assíncrono é permitir que a aplicação lide com milhares de operações concorrentes (como chamadas de rede ou leituras de arquivo) de forma eficiente sem a necessidade de criar threads pesadas do sistema operacional para cada tarefa.

---

## Criando linhas de execução

No contexto do TypeScript no Node.js, o comportamento equivalente ao lançamento de uma thread Python para tarefas baseadas em tempo/espera não é a criação de uma thread do SO, mas o encadeamento de uma **`Promise` assíncrona**.

Enquanto em Python utilizamos `threading.Thread(target=...)`, em TypeScript definimos a função como `async` e utilizamos o padrão `Promise` associado a um temporizador `setTimeout`:

```typescript
const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function minhaFuncao(): Promise<void> {
    console.log("Thread iniciada!");
    await sleep(2000);
    console.log("Thread finalizada!");
}