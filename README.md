# monorepo


Instruções de execução:

    - Requerimentos:
        Docker;
    
    - clone o repositório
    - crie um arquivo .env copie o conteúdo dos arquivos .env.example
    - abra powershell na raiz do repositório
        - docker compose up --build
        - docker compose exec back-end node ace generate:key
            - copie a chave gerada para o .env do back-end
            - docker compose restart back-end
        - docker compose exec back-end node ace migration:run
    - certifique-se que todos os containers estão rodando e acesse o front-end via localhost:5173

    - para criar uma nova conta de usuário basta usar o botão entrar e digitar os dados desejados.

