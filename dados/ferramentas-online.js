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

   (Não confundir com FERRAMENTAS de dados/pesquisa.js, que lista os
   programas usados nas pesquisas, na página Pesquisa.)
   ========================================================================== */

const FERRAMENTAS_ONLINE = [
  {
    titulo: "Visualizador de moléculas",
    link: "visualizador.html",
    resumo:
      "Cole coordenadas XYZ (ou a saída do ORCA/Gaussian), meça ligações de hidrogênio " +
      "e exporte figuras em PNG a 300, 600 ou 900 dpi. Roda no navegador, sem instalar nada.",
  },
];
