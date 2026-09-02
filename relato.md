# Relatório de implementação de linha de execução em Typescript

## Introdução

Este relato faz parte do processo avaliativo da disciplina de sistemas operacionas no curso superior em análise e desenvolvimento de sistemas, ofertado na Diretoria acadêmica de gestão e tecnologia da informação no campus natal-central do instituto federal de educação, ciência e tecnologia do rio grande do norte.

Tem como objetivo principal relatar como implementar linhas de execução na linguagem typescript.

O grupo de trabalho foi formado por jadson,luiz e arkângelo.

## Implementando múltiplas linhas de execução em typescript

### Informações gerais sobre typescript


> qual o objetivo e o paradgima da linguagem? O objetivo do TypeScript é adicionar tipagem estática ao JavaScript para evitar erros durante a escrita do código e facilitar o desenvolvimento de projetos grandes. Ele é uma linguagem multi-paradigma
> esta disponível onde?Está disponível para execução em ambientes JavaScript e roda em todos os navegadores web

### Criando linhas de execução

Em TypeScript no Node.js, criamos threads de execução utilizando o módulo nativo worker_threads, instanciando a classe Worker e passando o caminho do arquivo de script a ser executado em paralelo.

### Passando valores para linhas de execução

Para enviar dados para a linha de execução (Worker), passamos a propriedade workerData na criação do Worker ou enviamos mensagens dinâmicas utilizando o método worker.postMessage(dados). Dentro do Worker, recebemos os dados pelo evento parentPort.on('message', ...).

### Múltiplas linhas de execução

Para executar múltiplas threads simultaneamente, criamos um array de instâncias de Worker (ou um loop for) e gerenciamos o término de cada uma utilizando Promise.all() ou escutando o evento 'exit' de cada Worker.

## Considerações finais

A utilização de Worker Threads em TypeScript permitiu executar tarefas em paralelo de forma eficiente no Node.js, aproveitando múltiplos núcleos do processador sem bloquear a thread principal da aplicação.