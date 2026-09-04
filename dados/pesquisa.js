/* ==========================================================================
   PESQUISA — linhas de pesquisa e projetos
   ========================================================================== */

/* --------------------------------------------------------------------------
   LINHAS DE PESQUISA (os cartões do topo da página)

     titulo    Nome da linha
     resumo    Um parágrafo curto
     cor       azul | amarelo | laranja | magenta | vermelho
     icone     atomo | molecula | grafico | frasco | cpu | folha
               (a lista completa está em assets/js/site.js, função icone)

   >>> CONFERIR: o site antigo tinha só a primeira linha. As outras três foram
   >>> redigidas a partir dos temas recorrentes nas publicações do grupo.
   >>> Ajuste o texto ou apague o bloco { ... } das que não se aplicarem.
   -------------------------------------------------------------------------- */

const LINHAS = [
  {
    titulo: "Análise conformacional em solução",
    resumo:
      "Cálculo de propriedades termodinâmicas e espectroscópicas para determinar as geometrias " +
      "predominantes de compostos orgânicos em solução, com apoio de software próprio em Python.",
    cor: "azul",
    icone: "molecula",
  },
  {
    titulo: "RMN e química quântica",
    resumo:
      "Previsão de deslocamentos químicos de ¹H e ¹³C por DFT e comparação direta com o espectro " +
      "experimental, usada para atribuir estruturas e distinguir estereoisômeros.",
    cor: "magenta",
    icone: "grafico",
  },
  {
    titulo: "Solvatação e solubilidade",
    resumo:
      "Relação entre energias de solvatação calculadas e solubilidades experimentais de compostos " +
      "orgânicos, com modelos contínuos e explícitos de solvente.",
    cor: "laranja",
    icone: "frasco",
  },
  {
    titulo: "Dinâmica molecular de sistemas aplicados",
    resumo:
      "Simulação clássica de encapsulamento em ciclodextrinas, imobilização de enzimas em polímeros " +
      "porosos e outros sistemas de interesse tecnológico e ambiental.",
    cor: "amarelo",
    icone: "atomo",
  },
];

/* --------------------------------------------------------------------------
   PROJETOS

     titulo       Título do projeto
     periodo      Ex.: "2026 – atual", "2023 – 2025"
     situacao     "Em andamento" | "Concluído"  (define a cor da etiqueta)
     financiador  Ex.: "FAPERJ", "CNPq". Deixe "" se não houver
     edital       Nome/numero do edital. Deixe "" se não houver
     natureza     Normalmente "Pesquisa"
     descricao    Texto livre, opcional

   Coloque os projetos mais recentes no topo.
   -------------------------------------------------------------------------- */

const PROJETOS = [
  {
    titulo:
      "Geração de hidrogênio verde: estratégias para o desenvolvimento de eletrocatalisadores " +
      "de alta eficiência e estabilidade para a reação de water splitting",
    periodo: "2026 – atual",
    situacao: "Em andamento",
    financiador: "FAPERJ",
    edital:
      "Edital FAPERJ nº 22/2025 — Programa Pensa Rio: apoio ao estudo de temas relevantes " +
      "e estratégicos para o estado do Rio de Janeiro",
    natureza: "Pesquisa",
    descricao: "",
  },
  {
    titulo:
      "Desenvolvimento de sistemas para imobilização de enzimas em polímeros porosos: " +
      "uma abordagem de dinâmica molecular",
    periodo: "2025 – atual",
    situacao: "Em andamento",
    financiador: "CNPq",
    edital: "Chamada CNPq/MCTI nº 44/2024 — Faixa A, Grupos Emergentes",
    natureza: "Pesquisa",
    descricao: "",
  },
  {
    titulo:
      "Análise conformacional de compostos orgânicos em solução usando dados de " +
      "ressonância magnética nuclear",
    periodo: "Atual",
    situacao: "Em andamento",
    financiador: "",
    edital: "",
    natureza: "Pesquisa",
    descricao: "",
  },
];

/* --------------------------------------------------------------------------
   PROGRAMAS E FERRAMENTAS usados no laboratório (seção "Como trabalhamos").
   Apague a lista inteira (deixe []) se preferir não exibir a seção.

   >>> PREENCHER: a lista abaixo é um exemplo, não veio do site antigo.
   >>> Troque pelos programas que o grupo realmente usa.
   -------------------------------------------------------------------------- */

const FERRAMENTAS = [
  { nome: "Gaussian / ORCA", descricao: "Cálculos de estrutura eletrônica e DFT" },
  { nome: "GROMACS", descricao: "Dinâmica molecular clássica" },
  { nome: "Python", descricao: "Automação, análise de dados e software próprio do grupo" },
  { nome: "Cluster de cálculo", descricao: "Infraestrutura de alto desempenho do IQ-UERJ" },
];
