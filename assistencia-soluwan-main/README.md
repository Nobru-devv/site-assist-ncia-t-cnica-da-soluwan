# Novo Site Institucional — Assistência Técnica Soluwan (Grupo Engefer)

Este repositório contém o projeto do **Novo Site Institucional e Comercial da Assistência Técnica Soluwan**, integrante do **Grupo Engefer** (+30 anos de mercado).

O projeto foi concebido e desenvolvido com foco em alta conversão de visitantes em clientes, transmitindo autoridade, agilidade, credibilidade empresarial e pleno alinhamento com a identidade visual oficial da marca Soluwan.

---

## 📂 Estrutura de Arquivos do Projeto

```text
site assistencia/
├── index.html          # Página Início (Home moderna com Hero, Serviços, Diferenciais e Fluxo)
├── servicos.html       # Página Serviços (Catálogo detalhado de soluções técnicas)
├── loja.html           # Página Loja Soluwan (Ponte oficial para o e-commerce soluwan.com.br)
├── quem-somos.html     # Página Quem Somos (História, Missão, Visão, Valores e Grupo Engefer)
├── contato.html        # Página Fale Conosco (Canais de suporte e Formulário de Contato)
├── README.md           # Documentação completa e guia de manutenção do projeto
├── css/
│   ├── style.css       # Design System, variáveis CSS, componentes e botão de WhatsApp
│   └── responsive.css  # Regras e adaptações de responsividade Mobile First
└── js/
    ├── main.js         # Configuração do WhatsApp flutuante e utilitários globais
    ├── menu.js         # Gerenciador do Menu Mobile Hambúrguer e links ativos
    └── contato.js      # Validação e simulação do formulário de contato
```

---

## 🎨 Identidade Visual & Design System

- **Paleta de Cores**:
  - `Azul Marinho Soluwan (#0B2240)`: Autoridade, cabeçalhos, rodapé corporativo.
  - `Azul Corporativo (#164E87)`: Navegação, cartões e elementos secundários.
  - `Vermelho Soluwan (#E31C23)`: Destaques de chamada para ação (CTA primários).
  - `Verde WhatsApp (#25D366)`: Atendimento imediato e botão flutuante.
- **Tipografia**: `Kumbh Sans` (títulos, numéricos e botões) + `Open Sans` (textos de leitura).
- **Mobile First & Acessibilidade**: Totalmente adaptável para Smartphones, Tablets, Notebooks e Desktops de alta resolução, com suporte a ARIA e navegação por teclado.

---

## 💬 Componente: Botão Flutuante de WhatsApp

O botão de WhatsApp está integrado em **todas as páginas do site** de forma automática e reutilizável através do script `js/main.js`.

- **Comportamento Desktop**: Exibe ícone circular no canto inferior direito que se expande no hover revelando _"Fale com nosso atendimento"_.
- **Comportamento Mobile**: Mantém formato circular compacto com área de clique confortável e segura.
- **Alteração do Número de WhatsApp**:
  Para alterar o número de atendimento, edite a variável `WHATSAPP_NUMBER` no arquivo `js/main.js`:

const WHATSAPP_NUMBER = "5521964051803";

## 🛠️ Dados e Placeholders para Atualização Futura

Caso deseje atualizar as informações reais da empresa futuramente, os seguintes pontos estão centralizados e identificados no código:

1. **Número do WhatsApp**: Em `js/main.js` (`const WHATSAPP_NUMBER`).
2. **Telefone Fixo & E-mail**: Nos arquivos HTML (busca por `(21) 2157-4488` e `vendas@soluwan.com.br`).
3. **Endereço & Horário de Atendimento**: No arquivo `contato.html` e nos rodapés.

---

## 🚀 Arquitetura Preparada para Expansão Futura

O site foi estruturado de forma modular e limpa (HTML5/CSS3/JS ES6+) permitindo a acoplagem futura de:

- Abertura e acompanhamento de chamados técnicos.
- Solicitação de orçamentos online com upload de fotos.
- Área do cliente e painel administrativo/técnico.
