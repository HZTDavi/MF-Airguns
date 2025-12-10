# MF Air Guns 🎯

Plataforma de E-commerce moderna e robusta desenvolvida para a **M&F Air Guns**, especializada em carabinas de pressão e equipamentos táticos.

Este projeto utiliza **Next.js 14+** com **App Router**, **TypeScript**, **Tailwind CSS** e **Prisma** para oferecer uma experiência de usuário premium e uma área administrativa completa.

![M&F Air Guns Banner](https://via.placeholder.com/1200x400?text=MF+Airguns+Preview)

## 🚀 Funcionalidades

### 🛒 Loja Virtual (Pública)
*   **Design Tático & Moderno:** Interface escura e imersiva com detalhes em dourado e efeitos visuais fluidos.
*   **Catálogo Separado:** Navegação intuitiva entre "Armas" e "Acessórios".
*   **Página de Detalhes:** Galeria de imagens interativa, especificações técnicas detalhadas e preço à vista.
*   **Integração WhatsApp:** Botão "Comprar" redireciona diretamente para o WhatsApp da loja já com a mensagem de interesse preenchida.

### 🛡️ Painel Administrativo
*   **Gestão de Produtos:** Criar, editar (ocultar) e excluir produtos.
*   **Upload de Imagens:** Sistema "Drag & Drop" para envio de múltiplas fotos.
*   **Controle de Estoque:** Ocultar produtos rapidamente do site sem excluí-los (status Ativo/Inativo).
*   **Segurança:** Acesso protegido por login e senha.

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/).
*   **Backend:** Next.js API Routes (Serverless functions).
*   **Banco de Dados:** SQLite (Dev) / PostgreSQL (Prod ready), gerenciado via [Prisma ORM](https://www.prisma.io/).
*   **Linguagem:** TypeScript.

## 📦 Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/HZTDavi/MF-Airguns.git
    cd MF-Airguns
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    ```bash
    # Gera o cliente Prisma
    npx prisma generate
    
    # Cria as tabelas no banco SQLite local
    npx prisma db push
    
    # Popula com dados iniciais (Admin user)
    npx prisma db seed
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Acesse: `http://localhost:3000`

## 🔑 Acesso Administrativo (Padrão Seed)

Para acessar o painel (`/admin/login`):
*   **Usuário:** `MFAirGuns`
*   **Senha:** `MfSandroM`

## 📂 Estrutura de Pastas

*   `/app`: Rotas e páginas (App Router).
*   `/components`: Componentes reutilizáveis (Navbar, Galeria, Carrossel).
*   `/prisma`: Schema do banco de dados e seed.
*   `/public/uploads`: Armazenamento local de imagens dos produtos.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por **Davi** para M&F Air Guns.
