/* ==========================================================================
   EQUIPE
   --------------------------------------------------------------------------
   COMO ADICIONAR UMA PESSOA
   Copie um bloco { ... } inteiro, cole no grupo certo e troque os dados.
   So "nome" e "grupo" sao obrigatorios; o resto pode ficar de fora ou "".

     nome     Nome como deve aparecer, ja com o titulo (Prof. Dr., Dra., ...)
     grupo    Um dos "id" definidos em GRUPOS, la embaixo
     papel    Etiqueta colorida do cartao (Coordenador, Mestrando, IC, ...)
     vinculo  Instituicao / programa. Ex.: "UERJ · PPGQ-UERJ"
     resumo   Uma ou duas frases (aparece so no cartao da coordenacao)
     foto     "assets/img/equipe/nome.jpg". Deixe "" para usar as iniciais
     email    So o endereco, sem "mailto:"
     lattes   Endereco completo do Lattes
     orcid    Endereco completo do ORCID
     site     Qualquer outro link (pagina pessoal, Google Scholar, GitHub...)

   COMO REMOVER  Apague o bloco { ... } inteiro, incluindo a virgula do fim.
   COMO REORDENAR  Mude a ordem dos blocos; o site respeita a ordem da lista.
   ========================================================================== */

const EQUIPE = [
  {
    nome: "Prof. Dr. Haroldo Candal",
    grupo: "coordenacao",
    papel: "Coordenador",
    vinculo: "UERJ · PPGQ-UERJ",
    resumo:
      "Atuação em simulação de sistemas de interesse químico, biológico, tecnológico e ambiental, " +
      "com ênfase em análise conformacional em solução a partir de dados de RMN.",
    foto: "",
    email: "haroldo.candal@uerj.br",
    lattes: "http://lattes.cnpq.br/0841126231630553",
    orcid: "",
    site: "",
  },

  {
    nome: "Prof. Dr. Wagner Batista",
    grupo: "colaboracao",
    papel: "Colaborador",
    vinculo: "UFF · PPGQ-UERJ",
  },
  {
    nome: "Profª. Drª. Angela Sanches",
    grupo: "colaboracao",
    papel: "Colaboradora",
    vinculo: "UERJ · PPGQ-UERJ",
  },
  {
    nome: "Prof. Dr. Leonardo Vasconcelos",
    grupo: "colaboracao",
    papel: "Colaborador",
    vinculo: "UFPI",
  },

  {
    nome: "Antônio Fernandes",
    grupo: "pos",
    papel: "Mestrando",
    vinculo: "PPGQ-UERJ",
  },
  {
    nome: "Andrews Yuri",
    grupo: "pos",
    papel: "Mestrando",
    vinculo: "PPGQ-UERJ",
  },
  {
    nome: "Diego Ramos",
    grupo: "pos",
    papel: "Mestrando",
    vinculo: "PPGQ-UERJ",
  },
  {
    nome: "Ícaro Hilário",
    grupo: "pos",
    papel: "Mestrando",
    vinculo: "PPGQ-UERJ",
  },

  {
    nome: "Brenno Rodrigues",
    grupo: "graduacao",
    papel: "Iniciação científica",
    vinculo: "IQ-UERJ",
  },
  {
    nome: "Bernardo Cordeiro",
    grupo: "graduacao",
    papel: "Iniciação científica",
    vinculo: "IQ-UERJ",
  },
  {
    nome: "João Gurjão",
    grupo: "graduacao",
    papel: "Iniciação científica",
    vinculo: "IQ-UERJ",
  },
];

/* --------------------------------------------------------------------------
   GRUPOS — as seções da página, na ordem em que aparecem.
   "cor" aceita: azul, amarelo, laranja, magenta, vermelho.
   "destaque: true" usa o cartão largo (indicado para a coordenação).
   Para criar uma nova seção (ex.: "Egressos"), acrescente um bloco aqui
   e use o mesmo "id" no campo "grupo" das pessoas.
   -------------------------------------------------------------------------- */

const GRUPOS = [
  { id: "coordenacao", titulo: "Coordenação", cor: "azul", destaque: true },
  { id: "colaboracao", titulo: "Colaboradores", cor: "magenta" },
  { id: "pos", titulo: "Pós-graduação", cor: "laranja" },
  { id: "graduacao", titulo: "Iniciação científica", cor: "amarelo" },
  { id: "egressos", titulo: "Egressos", cor: "vermelho" },
];
