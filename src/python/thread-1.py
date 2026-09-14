# thread - criar thread e empilhar para execução
# 

# Importa as libs padrões
import threading
import time

# função que será executada na thread
def minha_funcao():
    print("Thread iniciada!")
    time.sleep(2)
    print("Thread finalizada!")

def main():
    # Criar a thread
    thread = threading.Thread(target=minha_funcao)

    # Iniciar a thread
    thread.start()

    # Aguardar a thread terminar
    thread.join()
    print("Programa principal finalizado!")

if __name__ == "__main__":
    main()