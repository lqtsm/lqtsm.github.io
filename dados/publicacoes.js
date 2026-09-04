/* ==========================================================================
   PUBLICACOES
   --------------------------------------------------------------------------
   A lista cobre a producao do laboratorio a partir de 2024, ano em que o LQTSM
   foi criado. Artigos anteriores dos pesquisadores nao entram aqui.

   COMO ADICIONAR UM ARTIGO
   Copie o bloco { ... } de cima, cole no topo da lista e troque os dados.
   Só "ano" e "titulo" são obrigatórios.

     ano       Número, sem aspas. Ex.: 2026
     titulo    Título do artigo
     autores   Autores na ordem da publicação. Use ** ao redor dos nomes dos
               membros do grupo para sair em negrito.
               Ex.: "Silva A.; **Candal H.**"
     revista   Nome do periódico
     detalhe   Volume, número, páginas. Ex.: "610, 113346"
     doi       Endereço completo (https://doi.org/...)

   A página ordena tudo sozinha (mais recente primeiro) e monta os filtros de
   ano automaticamente — não é preciso mexer em mais nada.
   ========================================================================== */

const PUBLICACOES = [
  {
    ano: 2026,
    titulo:
      "An analysis of implicit and explicit solvent model effects on DFT calculation of relative " +
      "energies and ¹H NMR chemical shifts for conformers of α-bisabolol in chloroform solution",
    autores: "**Da Silva H. C.**; **Alves Í. H. A.**; **De Almeida W. B.**",
    revista: "Chemical Physics",
    detalhe: "610, 113346",
    doi: "https://doi.org/10.1016/j.chemphys.2026.113346",
  },
  {
    ano: 2025,
    titulo:
      "Quantum Chemical NMR Spectroscopic Structural Analysis in Solution: The Investigation " +
      "of 3-Indoleacetic Acid Dimer Formation in Chloroform and DMSO Solution",
    autores: "",
    revista: "Magnetic Resonance in Chemistry",
    detalhe: "",
    doi: "https://doi.org/10.1002/mrc.5511",
  },
  {
    ano: 2025,
    titulo:
      "Modeling Solvent Effects in Quantum Chemical Calculation of Relative Energies and " +
      "NMR Chemical Shifts for Azithromycin",
    autores: "",
    revista: "The Journal of Physical Chemistry A",
    detalhe: "",
    doi: "https://doi.org/10.1021/acs.jpca.4c08015",
  },
  {
    ano: 2025,
    titulo:
      "Determination of the Preferred Stereoisomer of Natural Product Bisabolol in Chloroform " +
      "Solution through Quantum Chemical Calculations of ¹H NMR Chemical Shifts",
    autores: "",
    revista: "ACS Omega",
    detalhe: "",
    doi: "https://doi.org/10.1021/acsomega.5c07923",
  },
  {
    ano: 2025,
    titulo:
      "Understanding the relationship between experimental solubilities of organic compounds " +
      "and density functional theory calculations of solvation energies",
    autores: "",
    revista: "Journal of Molecular Liquids",
    detalhe: "",
    doi: "https://doi.org/10.1016/j.molliq.2025.128982",
  },
  {
    ano: 2024,
    titulo:
      "On the use of ¹H NMR chemical shifts and thermodynamic data for the prediction of the " +
      "predominant conformation of organic molecules in solution: the example of the flavonoid rutin",
    autores: "",
    revista: "RSC Advances",
    detalhe: "",
    doi: "https://doi.org/10.1039/D4RA03430A",
  },
];
