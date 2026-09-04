/* ==========================================================================
   TUTORIAIS
   --------------------------------------------------------------------------
   Cada item vira um cartão com o título e um botão que abre a página do Notion.

   COMO ADICIONAR UM TUTORIAL
   1. Crie a página no Notion e publique na web
      (no Notion: ··· > Compartilhar > Publicar na web > Copiar link).
   2. Copie o bloco { ... } abaixo, cole na lista e troque os dados.

     titulo   Nome do tutorial. É o que aparece em destaque no cartão.
     link     Endereço da página do Notion, completo, com https://
     resumo   OPCIONAL. Uma linha dizendo o que a pessoa vai aprender.
              Deixe "" ou apague a linha se não quiser.

   A ordem da lista é a ordem que aparece no site. Coloque em cima o que os
   alunos novos precisam ler primeiro.

   Enquanto a lista estiver vazia, a página mostra um aviso de "em preparação"
   no lugar dos cartões — não quebra nada.
   ========================================================================== */

const TUTORIAIS = [
  {
    titulo: "Comandos Linux - Do Básico ao Shell Script para Química Computacional",
    link: "https://lqtsm.notion.site/Modelo-de-Aula-3d18e483182a80ccbfcadf74ccf35f23",
    resumo: "",
  },

  /* ---- MODELO: apague estas barras de comentário e preencha ----
  {
    titulo: "Primeiros passos no cluster do laboratório",
    link: "https://lqtsm.notion.site/COLE-AQUI-O-LINK",
    resumo: "Como acessar, submeter um cálculo e acompanhar a fila.",
  },
  ---------------------------------------------------------------- */

];
