/* ==========================================================================
   FERRAMENTAS ONLINE
   --------------------------------------------------------------------------
   Aparecem na aba "Ferramentas" da página Materiais. Cada item vira um
   cartão com o título, um resumo e um botão que abre a ferramenta.

   COMO ADICIONAR UMA FERRAMENTA
   1. Coloque a página da ferramenta na raiz do site (ex.: minha-ferramenta.html).
   2. Copie o bloco { ... } abaixo, cole na lista e troque os dados.

     titulo   Nome da ferramenta.
     link     Endereço da página. Para páginas do próprio site, só o nome do
              arquivo (ex.: "visualizador.html").
     resumo   OPCIONAL. Uma linha dizendo para que serve.
     downloads    OPCIONAL. Botões de download: [{ rotulo, link }].
     notaDownload OPCIONAL. Texto curto ao lado dos downloads.

   (Não confundir com FERRAMENTAS de dados/pesquisa.js, que lista os
   programas usados nas pesquisas, na página Pesquisa.)
   ========================================================================== */

const FERRAMENTAS_ONLINE = [
  {
    titulo: "Visualizador de moléculas",
    link: "visualizador.html",
    resumo:
      "Desenhe a molécula, cole coordenadas XYZ (ou a saída do ORCA/Gaussian) ou um SMILES: estrutura 2D no estilo " +
      "ChemDraw, modelo 3D com estilos mistos, ligações de hidrogênio e figuras em PNG/SVG a " +
      "300, 600 ou 900 dpi. Roda no navegador, sem instalar nada.",
  },
  {
    titulo: "Editor de equações",
    link: "editor-equacoes/",
    resumo:
      "Digite a equação visualmente e monte demonstrações passo a passo. Copie como LaTeX, ambiente equation ou " +
      "MathML (cola no Word e no OnlyOffice) ou baixe em SVG e PNG, em quatro fontes. Roda no navegador e também " +
      "como programa para Linux, que funciona sem internet.",
    // Links fixos para a versao mais recente (Releases do GitHub): nao mudam a cada versao
    downloads: [
      { rotulo: "Linux .deb (Ubuntu, Debian, Mint)", link: "https://github.com/lqtsm/editor-equacoes/releases/latest/download/editor-equacoes-lqtsm_amd64.deb" },
      { rotulo: "Linux AppImage (qualquer distribuição)", link: "https://github.com/lqtsm/editor-equacoes/releases/latest/download/editor-equacoes-lqtsm_x86_64.AppImage" },
    ],
    notaDownload: "Código e versões anteriores: github.com/lqtsm/editor-equacoes",
  },
];
