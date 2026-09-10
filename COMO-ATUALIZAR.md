# Como atualizar o site do LQTSM

Este site é feito só de HTML, CSS e JavaScript — **não existe etapa de compilação**.
Você edita um arquivo, salva, envia para o GitHub e em ~1 minuto está no ar.

O conteúdo que muda com frequência (equipe, publicações, projetos) fica **separado**
do código das páginas, na pasta `dados/`. No dia a dia você só mexe lá.

---

## O mapa dos arquivos

```
lqtsm.github.io/
│
├── dados/                   ← 99% das atualizações acontecem aqui
│   ├── config.js            Nome do lab, e-mail, endereço, mapa, menu
│   ├── equipe.js            Pessoas do laboratório
│   ├── pesquisa.js          Linhas de pesquisa, projetos e ferramentas
│   ├── publicacoes.js       Artigos publicados
│   ├── tutoriais.js         Links dos tutoriais no Notion
│   └── modelos.js           Modelos do laboratório (arquivos no Google Drive)
│
├── assets/
│   ├── css/site.css         Aparência (cores, espaçamentos, tipografia)
│   ├── js/site.js           Motor do site — normalmente não precisa mexer
│   └── img/                 Logotipos, fotos e miniaturas dos modelos
│
├── index.html               Página inicial
├── equipe.html              Equipe
├── pesquisa.html            Pesquisa
├── publicacoes.html         Publicações
├── materiais.html           Materiais: abas Tutoriais e Modelos do laboratório
├── tutoriais.html           Só redireciona para materiais.html#tutoriais (links antigos)
├── marca.html               Download do logotipo, cores e uso
├── contato.html             Contato
└── 404.html                 Página de endereço inexistente
```

**Regra prática:** as páginas `.html` são só a "moldura". Quem preenche as listas
é o `assets/js/site.js`, lendo os arquivos de `dados/`.

---

## 1. Adicionar uma publicação

Abra `dados/publicacoes.js` e cole um bloco novo **no topo da lista**:

```js
{
  ano: 2026,
  titulo: "Título completo do artigo",
  autores: "Silva A. B.; **Candal H.**",
  revista: "Journal of Molecular Liquids",
  detalhe: "412, 127890",
  doi: "https://doi.org/10.xxxx/xxxxx",
},
```

- Só `ano` e `titulo` são obrigatórios. Deixe `""` no que não tiver.
- O que estiver entre `**` aparece em **negrito** (útil para destacar o grupo).
- Os filtros de ano e a contagem se atualizam sozinhos — **não é preciso mexer em mais nada.**
- Não esqueça da **vírgula** no fim do bloco.

Para remover um artigo, apague o bloco `{ ... },` inteiro.

---

## 2. Adicionar uma pessoa

Abra `dados/equipe.js` e cole um bloco na posição desejada:

```js
{
  nome: "Maria Souza",
  grupo: "pos",
  papel: "Doutoranda",
  vinculo: "PPGQ-UERJ",
  foto: "assets/img/equipe/maria.jpg",
  email: "maria.souza@uerj.br",
  lattes: "http://lattes.cnpq.br/0000000000000000",
  orcid: "https://orcid.org/0000-0000-0000-0000",
},
```

O campo `grupo` tem que ser um dos `id` da lista `GRUPOS`, no fim do arquivo:

| `grupo`         | Aparece como           |
|-----------------|------------------------|
| `coordenacao`   | Coordenação            |
| `colaboracao`   | Colaboradores          |
| `pos`           | Pós-graduação          |
| `graduacao`     | Iniciação científica   |
| `egressos`      | Egressos               |

- **Sem foto?** Deixe `foto: ""` — o site desenha um círculo com as iniciais.
- **Com foto?** Salve o arquivo em `assets/img/equipe/` (de preferência quadrado,
  400×400 px) e escreva o caminho no campo `foto`.
- **Grupo sem ninguém não aparece no site** — pode deixar `egressos` vazio à vontade.
- **Criar uma categoria nova:** acrescente uma linha em `GRUPOS`
  (ex.: `{ id: "posdoc", titulo: "Pós-doutorado", cor: "vermelho" }`)
  e use `grupo: "posdoc"` nas pessoas.

---

## 3. Adicionar um projeto ou linha de pesquisa

Abra `dados/pesquisa.js`. Ele tem três listas independentes:

- **`LINHAS`** — os cartões coloridos do topo da página.
- **`PROJETOS`** — os projetos, mais recentes primeiro.
- **`FERRAMENTAS`** — a seção "Como trabalhamos". Deixe `[]` para escondê-la.

Um projeto novo:

```js
{
  titulo: "Nome do projeto",
  periodo: "2027 – atual",
  situacao: "Em andamento",     // ou "Concluído"
  financiador: "FAPERJ",        // "" se não houver
  edital: "Edital FAPERJ nº 00/2027",
  natureza: "Pesquisa",
  descricao: "",
},
```

---

## 3b. A página Materiais

`materiais.html` tem duas abas: **Tutoriais** e **Modelos do laboratório**. Cada
aba tem o seu arquivo de dados (`dados/tutoriais.js` e `dados/modelos.js`) e o
número de itens aparece sozinho ao lado do nome da aba.

O endereço acompanha a aba aberta, então dá para mandar o link direto para a aba
certa: **`lqtsm.github.io/materiais.html#modelos`**. Também funciona para uma
categoria específica: `materiais.html#modelos-poster`, `#modelos-registro` etc.

O antigo `tutoriais.html` continua existindo só para redirecionar quem tiver o
link velho salvo — não precisa mexer nele.

### Adicionar um tutorial

1. Escreva o tutorial no Notion.
2. Publique a página: **···** (canto superior direito) → **Compartilhar** →
   **Publicar na web** → **Copiar link**. Sem esse passo o link só abre para
   quem tem conta com acesso.
3. Abra `dados/tutoriais.js` e acrescente:

```js
{
  titulo: "Primeiros passos no cluster do laboratório",
  link: "https://lqtsm.notion.site/o-link-que-voce-copiou",
  resumo: "Como acessar, submeter um cálculo e acompanhar a fila.",
},
```

`resumo` é opcional — apague a linha se não quiser. A ordem da lista é a ordem
que aparece no site: deixe em cima o que os alunos novos precisam ler primeiro.

Enquanto a lista estiver vazia, a aba mostra "Os primeiros tutoriais estão
sendo preparados".

### Adicionar um modelo

1. Suba o arquivo para o Google Drive.
2. **Botão direito → Compartilhar → Acesso geral: "Qualquer pessoa com o link"**
   (como *Leitor*) → **Copiar link**. Sem isso o aluno cai em "Solicitar acesso".
3. Abra `dados/modelos.js` e acrescente um bloco na lista `MODELOS`:

```js
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
  link: "https://drive.google.com/file/d/o-id-do-arquivo/view?usp=sharing",
  capa: "assets/img/modelos/dissertacao.jpg",
},
```

- **Não é preciso gerar link de download.** O site transforma o link do Drive em
  download direto sozinho: o botão **Baixar modelo** baixa o arquivo, e **Ver no
  Drive** abre a pré-visualização.
- `categoria` tem que ser um dos `id` de `CATEGORIAS_MODELOS`, no topo do arquivo:
  `poster`, `teses`, `artigos` ou `registro`. Se não bater, o modelo não aparece
  (e o Console do navegador, F12, avisa qual foi).
- **Categoria sem modelo não some:** vai para o quadro "Em preparação", no fim da
  aba. Assim que você cadastrar o primeiro modelo dela, ela ganha a própria seção.
- **Criar uma categoria nova:** acrescente um bloco em `CATEGORIAS_MODELOS`
  (ex.: `{ id: "slides", titulo: "Apresentações", icone: "quadro", cor: "vermelho", resumo: "..." }`).
- `detalhes` é opcional: são as instruções com o ✓ no cartão. O que estiver entre
  crases (`` `assim` ``) aparece como código.

**Miniatura (`capa`).** É a imagem da primeira página que aparece no cartão.
Salve em `assets/img/modelos/`, em retrato, com uns 600 px de altura. No Mac, a
forma mais rápida de gerar é pelo Terminal, a partir do PDF ou do arquivo do Word:

```
qlmanage -t -s 900 -o . arquivo.pdf
sips -s format jpeg -Z 600 arquivo.pdf.png --out assets/img/modelos/nome.jpg
```

Sem miniatura (`capa: ""`), o cartão mostra o ícone da categoria.

**Atualizar um modelo sem trocar o link:** no Drive, botão direito no arquivo →
**Gerenciar versões → Enviar nova versão**. O link continua o mesmo; em
`modelos.js` basta mudar `atualizado` (e `tamanho`, se mudou).

---

## 4. Trocar e-mail, endereço, mapa ou menu

Tudo em `dados/config.js`. O que estiver lá muda em **todas** as páginas de uma vez —
cabeçalho, rodapé e página de contato.

Para trocar o mapa: no Google Maps, **Compartilhar → Incorporar um mapa → Copiar HTML**,
e cole apenas o endereço que está dentro de `src="..."`.

---

## 5. Os arquivos do logotipo

Ficam em `assets/img/`, com estes nomes:

| Arquivo                          | O que é                        | Onde aparece                                   |
|----------------------------------|--------------------------------|------------------------------------------------|
| `logo-horizontal.png`            | Versão principal, oficial      | Capa da página inicial · download na **Marca** |
| `logo-quadrado.png`              | Versão quadrada, oficial       | Download na **Marca**                          |
| `logo-assinatura.png`            | Sigla + curvas, sem o nome     | Cabeçalho de todas as páginas · download na **Marca** |

A **assinatura** foi recortada do arquivo horizontal (a faixa com o nome por extenso
foi removida), porque na altura do cabeçalho — 38 px — o nome completo vira um borrão.
Não é um logotipo novo: são os mesmos traços do original.

**Para trocar o logotipo no futuro**, substitua os arquivos mantendo os mesmos nomes —
todas as páginas e os downloads passam a usar o novo automaticamente. Se trocar o
horizontal, gere também uma assinatura nova (basta recortar a faixa do nome por extenso).

Se algum arquivo faltar, o site mostra no lugar o desenho das curvas
(`assets/img/curvas.svg`) em vez de quebrar — mas o botão "Baixar PNG"
correspondente para de funcionar.

### A página Marca

`marca.html` é a página onde os alunos baixam o logotipo. Ela também lista as cores
da marca (com um clique para copiar o código) e as orientações de uso.

- **Para mudar os textos de uso**, edite as listas `<ul class="regras">` direto no
  arquivo `marca.html` — é HTML simples, sem lista de dados por trás.
- **Para acrescentar uma cor**, copie um bloco `<button class="cor" ...>` e troque
  o `--cor-amostra`, o nome e o código.
- **Para tirar "Marca" do menu do topo**, apague a linha correspondente em
  `dados/config.js`, na lista `menu`. A página continua existindo e acessível
  pelo link do logotipo na capa.

---

## 6. Mudar as cores ou a aparência

Abra `assets/css/site.css`. As cores estão todas no **bloco 1**, no começo do arquivo:

```css
--azul: #2e7fb8;          /* cor principal: botões, links, destaques */
--azul-escuro: #14456b;   /* faixas escuras do topo das páginas */
--amarelo: #f0b429;
--laranja: #ed7a2c;
--magenta: #e4007e;
--vermelho: #d23c33;
```

São as cores tiradas do logotipo. Mudar `--azul` muda o site inteiro.

---

## 7. Ver o resultado antes de publicar

Basta **abrir o arquivo `index.html` com dois cliques** — funciona direto no navegador,
sem servidor. Se preferir um servidor local (necessário só se um dia usar `fetch`):

```
python -m http.server 8000
```

e acesse `http://localhost:8000`.

---

## 8. Publicar

Pelo site do GitHub, sem instalar nada:

1. Entre em `github.com/lqtsm/lqtsm.github.io`
2. Clique no arquivo que quer mudar (ex.: `dados/publicacoes.js`)
3. Clique no lápis ✏️, edite, e clique em **Commit changes**
4. Espere ~1 minuto e recarregue o site

Pelo computador, se tiver o Git instalado:

```
git add .
git commit -m "Adiciona publicação de 2026"
git push
```

---

## Erros comuns

| Sintoma                              | Causa quase certa                                        |
|--------------------------------------|----------------------------------------------------------|
| A página fica em branco              | Faltou uma vírgula ou uma aspa em algum arquivo de `dados/` |
| Um artigo/pessoa não aparece         | O bloco ficou fora dos colchetes `[ ... ]` da lista       |
| Acentos viraram símbolos estranhos   | O arquivo foi salvo sem UTF-8 — salve novamente como UTF-8 |
| Uma pessoa não aparece               | O `grupo` dela não bate com nenhum `id` em `GRUPOS`       |

Para descobrir o erro exato: no navegador, aperte **F12** e veja a aba **Console** —
ele diz o arquivo e a linha do problema.
