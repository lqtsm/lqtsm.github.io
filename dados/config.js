/* ==========================================================================
   CONFIGURACAO GERAL DO SITE
   --------------------------------------------------------------------------
   Dados que aparecem no cabecalho, no rodape e na pagina de contato.
   Mudar aqui muda em TODAS as paginas de uma vez.
   ========================================================================== */

const CONFIG = {
  sigla: "LQTSM",
  nome: "Laboratório de Química Teórica e Simulação Molecular",
  instituicao: "Universidade do Estado do Rio de Janeiro",
  instituicaoSigla: "UERJ",
  unidade: "Instituto de Química",

  // Ano de criação do laboratório. Aparece nos números da página inicial.
  anoFundacao: 2024,

  // Frase curta que aparece na capa da pagina inicial.
  chamada:
    "Modelamos moléculas e materiais de interesse acadêmico e aplicado combinando " +
    "química quântica, simulação clássica e dados espectroscópicos.",

  contato: {
    email: "haroldo.candal@uerj.br",
    coordenador: "Prof. Dr. Haroldo Candal",
    lattes: "http://lattes.cnpq.br/0841126231630553",
    endereco: [
      "UERJ — Campus Maracanã",
      "Instituto de Química, Sala 401",
      "Pavilhão Haroldo Lisboa da Cunha",
      "R. São Francisco Xavier, 524 — Maracanã",
      "Rio de Janeiro — RJ, 20550-013",
    ],
    // Link "incorporar" gerado no Google Maps (Compartilhar > Incorporar um mapa).
    mapa:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.3576679267766!2d-43.23619768503444!3d-22.914068985008063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997e686c12e759%3A0x6295240217983c22!2sUniversidade%20do%20Estado%20do%20Rio%20de%20Janeiro!5e0!3m2!1spt-BR!2sbr!4v1625684725458!5m2!1spt-BR!2sbr",
  },

  // Formulario de candidatura (Notion). Deixe "" para esconder a secao na pagina Equipe.
  formularioInscricao:
    "https://lqtsm.notion.site/ebd//1868e483182a800386b1c9fef5b0acf3",

  // Menu principal. A ordem aqui e a ordem que aparece no site.
  // "id" precisa bater com o data-pagina="..." do <body> de cada arquivo .html.
  menu: [
    { id: "inicio", titulo: "Início", url: "index.html" },
    { id: "equipe", titulo: "Equipe", url: "equipe.html" },
    { id: "pesquisa", titulo: "Pesquisa", url: "pesquisa.html" },
    { id: "publicacoes", titulo: "Publicações", url: "publicacoes.html" },
    { id: "materiais", titulo: "Materiais", url: "materiais.html" },
    { id: "marca", titulo: "Marca", url: "marca.html" },
    { id: "contato", titulo: "Contato", url: "contato.html" },
  ],
};
