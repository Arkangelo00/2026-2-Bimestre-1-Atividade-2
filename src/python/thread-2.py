# thread - passar valores por parâmetro para thread
# 

# importar as libs
import threading

# função que será executada na thread
def saudar(nome, vezes):
    for i in range(vezes):
        print(f"Olá, {nome}! (mensagem {i+1})")

def main():
    # Criar thread com argumentos
    thread = threading.Thread(target=saudar, args=("Maria", 3))
    thread.start()
    thread.join()

if __name__ == "__main__":
    main()