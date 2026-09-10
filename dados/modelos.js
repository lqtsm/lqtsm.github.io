/* ==========================================================================
   MODELOS DO LABORATÓRIO
   --------------------------------------------------------------------------
   Aparecem na página Materiais, aba "Modelos do laboratório".

   São duas listas:
     CATEGORIAS_MODELOS   os grupos (pôster, tese, artigo...). Categoria sem
                          nenhum modelo não some: vai para o quadro
                          "Em preparação", no fim da aba.
     MODELOS              os arquivos em si. Cada um vira um cartão com
                          miniatura, descrição e os botões "Baixar modelo"
                          e "Ver no Drive".

   COMO ADICIONAR UM MODELO
   1. Suba o arquivo para o Google Drive.
   2. Botão direito > Compartilhar > Acesso geral: "Qualquer pessoa com o link"
      (como Leitor) > Copiar link. Sem esse passo o aluno cai em
      "Solicitar acesso".
   3. Copie um bloco { ... } da lista MODELOS, cole e troque os dados.

     titulo      Nome do modelo, em destaque no cartão.
     categoria   Um dos "id" de CATEGORIAS_MODELOS (ex.: "poster").
     formato     Programa usado para editar: "LaTeX", "Word", "PowerPoint"...
     extensao    Extensão do arquivo, com o ponto: ".docx", ".zip"...
     tamanho     Tamanho do arquivo, como aparece no Drive: "820 KB".
     atualizado  Mês/ano da versão atual. Troque sempre que subir versão nova.
     resumo      Uma ou duas frases dizendo o que é e quando usar.
     detalhes    OPCIONAL. Lista de instruções curtas. O que estiver entre
                 crases (`assim`) aparece como código: nomes de arquivo,
                 comandos. Apague a linha se não quiser.
     link        O link copiado do Drive. O site gera sozinho o link de
                 download direto a partir dele. Serve também o link de um
                 arquivo do Word/PowerPoint aberto no editor do Google
                 (docs.google.com/.../edit). Não serve para um arquivo
                 nativo do Google Docs/Apresentações: converta antes
                 (Arquivo > Fazer download > .docx/.pptx) e suba o arquivo.
     capa        OPCIONAL. Miniatura em assets/img/modelos/ (JPG ou PNG,
                 retrato, ~600 px de altura). Sem capa, aparece o ícone
                 da categoria.

   PARA ATUALIZAR UM MODELO sem mudar o link: no Drive, botão direito no
   arquivo > Gerenciar versões > Enviar nova versão. O link continua o mesmo;
   aqui basta mudar "atualizado" (e "tamanho", se mudou).
   ========================================================================== */

// A ordem aqui é a ordem das seções na página.
// "cor" é uma das cores da marca: azul, amarelo, laranja, magenta ou vermelho.
// "icone" é um dos desenhos de assets/js/site.js (quadro, livro, documento,
// prancheta...).
const CATEGORIAS_MODELOS = [
  {
    id: "poster",
    titulo: "Pôsteres para congressos",
    icone: "quadro",
    cor: "azul",
    resumo:
      "Para apresentar trabalhos em eventos científicos com a identidade visual do laboratório. " +
      "O mesmo layout em duas versões: escolha pelo programa que você usa.",
  },
  {
    id: "teses",
    titulo: "Teses e dissertações",
    icone: "livro",
    cor: "laranja",
    resumo: "Estrutura e formatação para monografias, dissertações de mestrado e teses de doutorado.",
  },
  {
    id: "artigos",
    titulo: "Artigos",
    icone: "documento",
    cor: "magenta",
    resumo: "Rascunhos de manuscrito já organizados nas seções usuais das revistas da área.",
  },
  {
    id: "registro",
    titulo: "Registro de atividades",
    icone: "prancheta",
    cor: "amarelo",
    resumo: "O caderno de laboratório do grupo: um registro por dia de trabalho.",
  },
];

const MODELOS = [
  {
    titulo: "Pôster LQTSM 90 × 120 cm — LaTeX",
    categoria: "poster",
    formato: "LaTeX",
    extensao: ".tar.gz",
    tamanho: "823 KB",
    atualizado: "set. 2026",
    resumo:
      "Classe LaTeX própria (posterlqtsm) no formato 90 × 120 cm, retrato. Cabeçalho e rodapé " +
      "seguem a identidade do laboratório; o corpo, em duas colunas, se ajusta sozinho ao conteúdo.",
    detalhes: [
      "Edite só o `poster.tex`: o bloco CONTEÚDO FIXO traz evento, título, autores e logotipos; o corpo vem logo abaixo.",
      "Compile com `latexmk -pdf poster.tex` (ou `-lualatex`). As referências saem em ABNT numérico, a partir do `referencias.bib`.",
      "Três fontes para o texto e as equações: STIX (padrão), Libertinus ou Charter.",
      "No Overleaf: descompacte, recompacte a pasta como .zip e use New Project > Upload Project.",
    ],
    link: "https://drive.google.com/file/d/1rGWCFUrqI3GSuP2tvqdB86YW9BHzt6X_/view?usp=sharing",
    capa: "assets/img/modelos/poster-lqtsm.jpg",
  },
  {
    titulo: "Pôster LQTSM 90 × 120 cm — PowerPoint",
    categoria: "poster",
    formato: "PowerPoint",
    extensao: ".pptx",
    tamanho: "170 KB",
    atualizado: "set. 2026",
    resumo:
      "O mesmo pôster da versão LaTeX, montado em um único slide já no tamanho final. " +
      "Para quem prefere editar visualmente, sem compilar nada.",
    detalhes: [
      "Troque os textos e as caixas marcadas com (substituir): logotipos do evento e do PPGQ, figuras e tabela.",
      "Não redimensione o slide: ele já está em 90 × 120 cm, retrato.",
      "Títulos em Arial e texto em Cambria, fontes que já vêm no Windows e no macOS. Edite no PowerPoint: no Google Apresentações a equação pode não ser preservada.",
      "Para imprimir, salve como PDF (Arquivo > Exportar) e envie o PDF à gráfica, não o .pptx.",
    ],
    link: "https://docs.google.com/presentation/d/1iY42B8uo13cAibspKtXN0ax1DTjtz_z4/edit?usp=sharing&ouid=102066516932258614737&rtpof=true&sd=true",
    capa: "assets/img/modelos/poster-lqtsm-powerpoint.jpg",
  },
  {
    titulo: "Registro Diário de Atividades",
    categoria: "registro",
    formato: "Word",
    extensao: ".dotx",
    tamanho: "36 KB",
    atualizado: "set. 2026",
    resumo:
      "Modelo do Word para registrar um dia de trabalho: objetivo do dia, procedimento e " +
      "resultados comentados e próximos passos.",
    detalhes: [
      "Abra o arquivo com dois cliques: o Word cria um documento novo a partir do modelo, sem alterar o original.",
      "Um arquivo por dia. Ao fim do dia, salve e não volte a editá-lo; para o dia seguinte, gere outro.",
      "Todo resultado precisa de observação, interpretação e implicação. Resultado sem comentário não é registro.",
      "O texto entre colchetes é instrução: o arquivo finalizado não deve ter nenhum colchete.",
    ],
    link: "https://drive.google.com/file/d/1WhGhGh_i3b3lYaA1dLGacpdFo_DJrnmg/view?usp=sharing",
    capa: "assets/img/modelos/registro-atividades.jpg",
  },

  /* ---- MODELO: apague estas barras de comentário e preencha ----
  {
    titulo: "Dissertação de mestrado — PPGQ-UERJ",
    categoria: "teses",
    formato: "LaTeX",
    extensao: ".zip",
    tamanho: "1,2 MB",
    atualizado: "mar. 2027",
    resumo: "Estrutura completa com elementos pré-textuais nas normas do programa.",
    detalhes: [
      "Compile com `latexmk -pdf main.tex`.",
    ],
    link: "https://drive.google.com/file/d/COLE-AQUI-O-ID/view?usp=sharing",
    capa: "",
  },
  ---------------------------------------------------------------- */

];
