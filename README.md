# lqtsm.github.io

Site oficial do **Laboratório de Química Teórica e Simulação Molecular (LQTSM)** —
Instituto de Química, Universidade do Estado do Rio de Janeiro (UERJ).

🔗 https://lqtsm.github.io

## Como atualizar

Todo o conteúdo que muda com frequência está na pasta [`dados/`](dados/):

| Arquivo | O que contém |
|---|---|
| [`dados/config.js`](dados/config.js) | Nome do lab, e-mail, endereço, mapa e menu |
| [`dados/equipe.js`](dados/equipe.js) | Pessoas do laboratório |
| [`dados/pesquisa.js`](dados/pesquisa.js) | Linhas de pesquisa, projetos e ferramentas |
| [`dados/publicacoes.js`](dados/publicacoes.js) | Artigos publicados |
| [`dados/tutoriais.js`](dados/tutoriais.js) | Links dos tutoriais no Notion |

O passo a passo completo, com exemplos prontos para copiar, está em
**[COMO-ATUALIZAR.md](COMO-ATUALIZAR.md)**.

## Como funciona

Site estático, sem dependências e sem etapa de compilação:

- as páginas `.html` contêm só a estrutura;
- [`assets/js/site.js`](assets/js/site.js) monta o cabeçalho, o rodapé e as listas
  a partir dos arquivos de `dados/`;
- [`assets/css/site.css`](assets/css/site.css) concentra toda a aparência, com as
  cores da marca declaradas como variáveis CSS no topo do arquivo.

Basta abrir `index.html` no navegador para ver o resultado — não é preciso servidor.

Publicado automaticamente pelo GitHub Pages a cada `push` no branch `main`.
