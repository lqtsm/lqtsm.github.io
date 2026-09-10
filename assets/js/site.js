/* ==========================================================================
   LQTSM — script unico do site
   --------------------------------------------------------------------------
   Este arquivo NAO precisa ser editado no dia a dia. Ele apenas:
     - monta o cabecalho e o rodape em todas as paginas (a partir de config.js)
     - desenha as listas de equipe, publicacoes, projetos, tutoriais e
       modelos (a partir de dados/)
     - cuida do menu no celular, dos filtros da pagina de publicacoes e das
       abas da pagina de materiais

   Para mudar CONTEUDO, edite os arquivos da pasta dados/.
   Para mudar APARENCIA, edite assets/css/site.css.
   ========================================================================== */

(function () {
  "use strict";

  /* --- utilidades ------------------------------------------------------- */

  // Escapa texto vindo dos arquivos de dados antes de injetar como HTML.
  function esc(valor) {
    return String(valor == null ? "" : valor).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Converte **texto** em <strong>texto</strong> (usado na lista de autores).
  function negrito(valor) {
    return esc(valor).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  // Converte `texto` em <code>texto</code> (nomes de arquivo e comandos).
  function codigo(valor) {
    return esc(valor).replace(/`(.+?)`/g, "<code>$1</code>");
  }

  function iniciais(nome) {
    var partes = String(nome)
      .replace(/\b(Prof|Profa|Profª|Dr|Dra|Drª|Me|Ma|Sr|Sra)\.?\s*/gi, "")
      .trim()
      .split(/\s+/)
      .filter(function (p) {
        return p.length > 2; // ignora "de", "da", "dos"...
      });
    if (!partes.length) return "?";
    var primeira = partes[0][0];
    var ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
    return (primeira + ultima).toUpperCase();
  }

  function achar(seletor) {
    return document.querySelector(seletor);
  }

  /* --- icones ----------------------------------------------------------- */
  /* Desenhos em SVG embutidos: o site nao depende de nenhuma biblioteca
     externa de icones. Para acrescentar um icone, adicione uma entrada aqui. */

  var ICONES = {
    menu: "M4 6h16M4 12h16M4 18h16",
    fechar: "M18 6 6 18M6 6l12 12",
    email: "M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM3.5 6.5l8.5 6 8.5-6",
    externo: "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
    local: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    pessoa: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    equipe: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    busca: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
    calendario: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 2v4M8 2v4M3 10h18",
    documento: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
    seta: "M5 12h14M12 5l7 7-7 7",
    atomo: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20.2 20.2c1.9-1.9-.4-7-5.2-11.8S4.9 1.9 3 3.8s.4 7 5.2 11.8 9.9 6.5 11.8 4.6ZM3.8 20.2c-1.9-1.9.4-7 5.2-11.8S19.1 1.9 21 3.8s-.4 7-5.2 11.8-9.9 6.5-11.8 4.6Z",
    molecula: "M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM10 7 7.5 12M14 7l2.5 5M9 15h6",
    grafico: "M3 20h18M4 20c2-1 3-4 4.5-9S11 3 12.5 4.5 15 12 16.5 15.5 19.5 19 21 20",
    frasco: "M9 3h6M10 3v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.5V3M7.5 14h9",
    cpu: "M5 5h14v14H5zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3",
    folha: "M11 20A7 7 0 0 1 4 13c0-5 4-9 16-10 0 12-5 17-9 17ZM4 21c2-8 6-11 9-12",
    livro: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22zM8 7h8M8 11h5",
    lupa: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
    orcid: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.5 8.5v7M8.5 6.2v.1M12 15.5v-7h1.8a3.5 3.5 0 0 1 0 7z",
    link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
    baixar: "M12 3v12M7 10l5 5 5-5M4 21h16",
    quadro: "M3 4h18v12H3zM12 16v5M8 21h8M7 8h10M7 12h6",
    prancheta: "M9 3h6v4H9zM9 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3M9 12h6M9 16h4",
    info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-5M12 8h.01",
  };

  function icone(nome, classe) {
    var d = ICONES[nome] || ICONES.link;
    return (
      '<svg class="icone ' +
      (classe || "") +
      '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' +
      d +
      '"/></svg>'
    );
  }

  /* --- cabecalho e rodape ----------------------------------------------- */

  function montarCabecalho(paginaAtual) {
    var alvo = achar("[data-topo]");
    if (!alvo || typeof CONFIG === "undefined") return;

    var itens = CONFIG.menu
      .map(function (item) {
        var atual = item.id === paginaAtual ? ' aria-current="page"' : "";
        return '<a href="' + esc(item.url) + '"' + atual + ">" + esc(item.titulo) + "</a>";
      })
      .join("");

    alvo.className = "topo";
    alvo.innerHTML =
      '<div class="container topo__interno">' +
      '<a class="marca" href="index.html">' +
      // Assinatura (LQTSM + curvas, sem a linha do nome por extenso): é a única
      // versão que continua legível na altura do cabeçalho.
      '<img src="assets/img/logo-assinatura.png" alt="' + esc(CONFIG.sigla) + '" ' +
      "onerror=\"this.onerror=null;this.src='assets/img/favicon.svg'\">" +
      "</a>" +
      '<button class="menu__botao" type="button" aria-expanded="false" aria-controls="menu-principal">' +
      '<span class="somente-leitor">Abrir menu</span>' +
      icone("menu") +
      "</button>" +
      '<nav class="menu" id="menu-principal" aria-label="Menu principal">' + itens + "</nav>" +
      "</div>";

    ligarMenu(alvo);
  }

  function ligarMenu(topo) {
    var botao = topo.querySelector(".menu__botao");
    var menu = topo.querySelector(".menu");
    if (!botao || !menu) return;

    var estreito = window.matchMedia("(max-width: 860px)");

    function sincronizar() {
      if (estreito.matches) {
        menu.hidden = botao.getAttribute("aria-expanded") !== "true";
      } else {
        menu.hidden = false;
      }
    }

    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") === "true";
      botao.setAttribute("aria-expanded", String(!aberto));
      botao.innerHTML =
        '<span class="somente-leitor">' +
        (aberto ? "Abrir" : "Fechar") +
        " menu</span>" +
        icone(aberto ? "menu" : "fechar");
      sincronizar();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
        botao.click();
      }
    });

    estreito.addEventListener("change", sincronizar);
    sincronizar();
  }

  function montarRodape() {
    var alvo = achar("[data-rodape]");
    if (!alvo || typeof CONFIG === "undefined") return;

    var links = CONFIG.menu
      .map(function (item) {
        return "<li><a href=\"" + esc(item.url) + '">' + esc(item.titulo) + "</a></li>";
      })
      .join("");

    alvo.className = "rodape";
    alvo.innerHTML =
      '<div class="container">' +
      '<div class="rodape__grade">' +
      "<div>" +
      "<strong>" + esc(CONFIG.sigla) + "</strong>" +
      "<p>" + esc(CONFIG.nome) + "</p>" +
      "<p>" + esc(CONFIG.unidade) + " — " + esc(CONFIG.instituicao) + "</p>" +
      "</div>" +
      "<div><strong>Navegação</strong><ul>" + links + "</ul></div>" +
      "<div><strong>Contato</strong><ul>" +
      '<li><a href="mailto:' + esc(CONFIG.contato.email) + '">' + esc(CONFIG.contato.email) + "</a></li>" +
      "<li>" + esc(CONFIG.contato.endereco[0]) + "</li>" +
      "<li>" + esc(CONFIG.contato.endereco[1]) + "</li>" +
      "</ul></div>" +
      "</div>" +
      '<p class="rodape__fim">© ' +
      new Date().getFullYear() +
      " " + esc(CONFIG.sigla) + " — " + esc(CONFIG.instituicaoSigla) + ". Todos os direitos reservados.</p>" +
      "</div>";
  }

  /* --- pagina inicial: numeros ------------------------------------------ */

  function montarNumeros() {
    var alvo = achar("[data-numeros]");
    if (!alvo) return;

    var totalPub = typeof PUBLICACOES !== "undefined" ? PUBLICACOES.length : 0;
    var anos = totalPub ? PUBLICACOES.map(function (p) { return p.ano; }) : [];
    // Prefere o ano declarado em config.js; so infere pela publicacao mais antiga
    // se ele nao estiver preenchido.
    var desde =
      (typeof CONFIG !== "undefined" && CONFIG.anoFundacao) ||
      (anos.length ? Math.min.apply(null, anos) : new Date().getFullYear());
    var totalEquipe = typeof EQUIPE !== "undefined" ? EQUIPE.length : 0;
    var totalProjetos =
      typeof PROJETOS !== "undefined"
        ? PROJETOS.filter(function (p) { return p.situacao === "Em andamento"; }).length
        : 0;

    var blocos = [
      { valor: totalPub, rotulo: "artigos publicados" },
      { valor: totalEquipe, rotulo: "pesquisadores e estudantes" },
      { valor: totalProjetos, rotulo: "projetos em andamento" },
      { valor: desde, rotulo: "criação do laboratório" },
    ];

    alvo.innerHTML = blocos
      .map(function (b) {
        return '<div class="numero"><strong>' + esc(b.valor) + "</strong><span>" + esc(b.rotulo) + "</span></div>";
      })
      .join("");
  }

  /* --- pagina inicial: publicacoes recentes ----------------------------- */

  function montarRecentes() {
    var alvo = achar("[data-recentes]");
    if (!alvo || typeof PUBLICACOES === "undefined") return;

    var quantas = Number(alvo.getAttribute("data-recentes")) || 3;
    var lista = PUBLICACOES.slice()
      .sort(function (a, b) { return b.ano - a.ano; })
      .slice(0, quantas);

    alvo.innerHTML = lista.map(cartaoPublicacao).join("");
  }

  /* --- equipe ------------------------------------------------------------ */

  function cartaoPessoa(pessoa, grupo) {
    var cor = "var(--" + (grupo.cor || "azul") + ")";
    var destaque = grupo.destaque === true;

    var avatar = pessoa.foto
      ? '<img class="pessoa__foto" src="' + esc(pessoa.foto) + '" alt="' + esc(pessoa.nome) + '" loading="lazy">'
      : '<div class="pessoa__iniciais" aria-hidden="true">' + esc(iniciais(pessoa.nome)) + "</div>";

    var etiquetas = [];
    if (pessoa.papel) {
      etiquetas.push(
        '<span class="etiqueta etiqueta--' + esc(grupo.cor || "azul") + '">' + esc(pessoa.papel) + "</span>"
      );
    }

    var links = [];
    if (pessoa.email) {
      links.push(
        '<a href="mailto:' + esc(pessoa.email) + '" title="E-mail"><span class="somente-leitor">E-mail de ' +
          esc(pessoa.nome) + "</span>" + icone("email") + "</a>"
      );
    }
    if (pessoa.lattes) {
      links.push(
        '<a href="' + esc(pessoa.lattes) + '" target="_blank" rel="noopener" title="Currículo Lattes">' +
          '<span class="somente-leitor">Lattes de ' + esc(pessoa.nome) + "</span>" + icone("documento") + "</a>"
      );
    }
    if (pessoa.orcid) {
      links.push(
        '<a href="' + esc(pessoa.orcid) + '" target="_blank" rel="noopener" title="ORCID">' +
          '<span class="somente-leitor">ORCID de ' + esc(pessoa.nome) + "</span>" + icone("orcid") + "</a>"
      );
    }
    if (pessoa.site) {
      links.push(
        '<a href="' + esc(pessoa.site) + '" target="_blank" rel="noopener" title="Página pessoal">' +
          '<span class="somente-leitor">Página de ' + esc(pessoa.nome) + "</span>" + icone("link") + "</a>"
      );
    }

    return (
      '<article class="cartao pessoa' + (destaque ? " pessoa--destaque" : "") +
      '" style="--cor-destaque:' + cor + '">' +
      avatar +
      "<div>" +
      '<h3 class="pessoa__nome">' + esc(pessoa.nome) + "</h3>" +
      (pessoa.vinculo ? '<p class="pessoa__vinculo">' + esc(pessoa.vinculo) + "</p>" : "") +
      (etiquetas.length ? '<div class="pessoa__etiquetas">' + etiquetas.join("") + "</div>" : "") +
      (pessoa.resumo ? '<p class="pessoa__resumo">' + esc(pessoa.resumo) + "</p>" : "") +
      (links.length ? '<div class="pessoa__links">' + links.join("") + "</div>" : "") +
      "</div>" +
      "</article>"
    );
  }

  function montarEquipe() {
    var alvo = achar("[data-equipe]");
    if (!alvo || typeof EQUIPE === "undefined" || typeof GRUPOS === "undefined") return;

    alvo.innerHTML = GRUPOS.map(function (grupo) {
      var pessoas = EQUIPE.filter(function (p) { return p.grupo === grupo.id; });
      if (!pessoas.length) return ""; // grupo vazio nao aparece

      var cartoes = pessoas
        .map(function (p) { return cartaoPessoa(p, grupo); })
        .join("");

      return (
        '<section class="secao" id="' + esc(grupo.id) + '">' +
        '<div class="secao__titulo"><h2>' + esc(grupo.titulo) + "</h2></div>" +
        (grupo.destaque ? '<div class="pilha">' : '<div class="grade">') +
        cartoes +
        "</div></section>"
      );
    }).join("");
  }

  /* --- publicacoes ------------------------------------------------------- */

  function cartaoPublicacao(pub) {
    var meta = [];
    if (pub.autores) meta.push(negrito(pub.autores));
    var fonte = [];
    if (pub.revista) fonte.push("<em>" + esc(pub.revista) + "</em>");
    if (pub.detalhe) fonte.push(esc(pub.detalhe));
    if (fonte.length) meta.push(fonte.join(", "));

    var acao = pub.doi
      ? '<a class="botao publicacao__link" href="' + esc(pub.doi) + '" target="_blank" rel="noopener">' +
        "Acessar" + icone("externo") + "</a>"
      : "";

    return (
      '<article class="publicacao">' +
      '<span class="publicacao__ano">' + esc(pub.ano) + "</span>" +
      "<div>" +
      '<h3 class="publicacao__titulo">' + esc(pub.titulo) + "</h3>" +
      (meta.length ? '<p class="publicacao__meta">' + meta.join(" · ") + "</p>" : "") +
      "</div>" +
      acao +
      "</article>"
    );
  }

  function montarPublicacoes() {
    var lista = achar("[data-publicacoes]");
    if (!lista || typeof PUBLICACOES === "undefined") return;

    var filtros = achar("[data-filtros-ano]");
    var campoBusca = achar("[data-busca]");
    var contagem = achar("[data-contagem]");

    var anos = [];
    PUBLICACOES.forEach(function (p) {
      if (anos.indexOf(p.ano) === -1) anos.push(p.ano);
    });
    anos.sort(function (a, b) { return b - a; });

    var anoAtivo = "todos";
    var termo = "";

    function selecionadas() {
      return PUBLICACOES.filter(function (p) {
        if (anoAtivo !== "todos" && p.ano !== anoAtivo) return false;
        if (!termo) return true;
        var texto = (p.titulo + " " + (p.autores || "") + " " + (p.revista || "")).toLowerCase();
        return texto.indexOf(termo) !== -1;
      }).sort(function (a, b) { return b.ano - a.ano; });
    }

    function desenharFiltros() {
      if (!filtros) return;
      var botoes = [{ rotulo: "Todos", valor: "todos" }].concat(
        anos.map(function (a) { return { rotulo: String(a), valor: a }; })
      );
      filtros.innerHTML = botoes
        .map(function (b) {
          return (
            '<button type="button" class="filtros__botao" aria-pressed="false" data-ano="' +
            b.valor + '">' + b.rotulo + "</button>"
          );
        })
        .join("");
      marcarFiltroAtivo();
    }

    // Atualiza so o aria-pressed, para nao perder o foco do teclado a cada clique.
    function marcarFiltroAtivo() {
      if (!filtros) return;
      Array.prototype.forEach.call(filtros.children, function (botao) {
        var valor = botao.getAttribute("data-ano");
        var igual = valor === "todos" ? anoAtivo === "todos" : Number(valor) === anoAtivo;
        botao.setAttribute("aria-pressed", String(igual));
      });
    }

    function desenharLista() {
      var itens = selecionadas();

      if (contagem) {
        contagem.textContent =
          itens.length === 0
            ? "Nenhum artigo encontrado."
            : itens.length === 1
            ? "1 artigo."
            : itens.length + " artigos.";
      }

      lista.innerHTML = itens.length
        ? itens.map(cartaoPublicacao).join("")
        : '<p class="vazio">Nenhum artigo corresponde a esse filtro. ' +
          "Experimente escolher <strong>Todos</strong> ou limpar a busca.</p>";
    }

    if (filtros) {
      filtros.addEventListener("click", function (e) {
        var botao = e.target.closest("[data-ano]");
        if (!botao) return;
        var valor = botao.getAttribute("data-ano");
        anoAtivo = valor === "todos" ? "todos" : Number(valor);
        marcarFiltroAtivo();
        desenharLista();
      });
    }

    if (campoBusca) {
      campoBusca.addEventListener("input", function () {
        termo = campoBusca.value.trim().toLowerCase();
        desenharLista();
      });
    }

    desenharFiltros();
    desenharLista();
  }

  /* --- pesquisa ---------------------------------------------------------- */

  function montarLinhas() {
    var alvo = achar("[data-linhas]");
    if (!alvo || typeof LINHAS === "undefined") return;

    alvo.innerHTML = LINHAS.map(function (linha) {
      return (
        '<article class="cartao cartao--filete" style="--cor-destaque:var(--' +
        esc(linha.cor || "azul") + ')">' +
        '<span class="cartao__icone">' + icone(linha.icone || "atomo") + "</span>" +
        "<h3>" + esc(linha.titulo) + "</h3>" +
        "<p>" + esc(linha.resumo) + "</p>" +
        "</article>"
      );
    }).join("");
  }

  function montarProjetos() {
    var alvo = achar("[data-projetos]");
    if (!alvo || typeof PROJETOS === "undefined") return;

    alvo.innerHTML = PROJETOS.map(function (p) {
      var andamento = p.situacao === "Em andamento";
      var cor = andamento ? "azul" : "vermelho";

      var detalhes = [];
      if (p.descricao) {
        detalhes.push(
          '<div class="projeto__linha"><dt>Descrição</dt><dd>' + esc(p.descricao) + "</dd></div>"
        );
      }
      if (p.edital) {
        detalhes.push('<div class="projeto__linha"><dt>Edital</dt><dd>' + esc(p.edital) + "</dd></div>");
      }
      if (p.natureza) {
        detalhes.push('<div class="projeto__linha"><dt>Natureza</dt><dd>' + esc(p.natureza) + "</dd></div>");
      }

      return (
        '<article class="projeto" style="--cor-destaque:var(--' + cor + ')">' +
        '<div class="projeto__periodo">' +
        '<span class="etiqueta">' + icone("calendario") + esc(p.periodo || "") + "</span>" +
        (p.situacao
          ? '<span class="etiqueta etiqueta--' + (andamento ? "neutra" : "vermelho") + '">' +
            esc(p.situacao) + "</span>"
          : "") +
        (p.financiador
          ? '<span class="etiqueta etiqueta--amarelo">' + esc(p.financiador) + "</span>"
          : "") +
        "</div>" +
        "<div><h3>" + esc(p.titulo) + "</h3>" +
        (detalhes.length ? '<dl class="projeto__detalhes">' + detalhes.join("") + "</dl>" : "") +
        "</div>" +
        "</article>"
      );
    }).join("");
  }

  function montarFerramentas() {
    var alvo = achar("[data-ferramentas]");
    if (!alvo) return;
    if (typeof FERRAMENTAS === "undefined" || !FERRAMENTAS.length) {
      var secao = alvo.closest("section");
      if (secao) secao.hidden = true;
      return;
    }
    alvo.innerHTML = FERRAMENTAS.map(function (f) {
      return '<article class="cartao"><h3>' + esc(f.nome) + "</h3><p>" + esc(f.descricao) + "</p></article>";
    }).join("");
  }

  /* --- materiais: tutoriais ---------------------------------------------- */

  // Mostra a quantidade de itens no rotulo de uma aba (<span data-conta="...">).
  function contar(nome, total) {
    var alvo = achar('[data-conta="' + nome + '"]');
    if (alvo) alvo.textContent = total;
  }

  function montarTutoriais() {
    var alvo = achar("[data-tutoriais]");
    if (!alvo || typeof TUTORIAIS === "undefined") return;

    contar("tutoriais", TUTORIAIS.length);

    if (!TUTORIAIS.length) {
      alvo.innerHTML =
        '<p class="vazio">Os primeiros tutoriais estão sendo preparados. ' +
        "Volte em breve.</p>";
      return;
    }

    alvo.innerHTML = TUTORIAIS.map(function (t) {
      return (
        '<article class="tutorial">' +
        "<div>" +
        '<h3 class="tutorial__titulo">' + esc(t.titulo) + "</h3>" +
        (t.resumo ? '<p class="tutorial__resumo">' + esc(t.resumo) + "</p>" : "") +
        "</div>" +
        '<a class="botao" href="' + esc(t.link) + '" target="_blank" rel="noopener">' +
        "Abrir tutorial" + icone("externo") + "</a>" +
        "</article>"
      );
    }).join("");
  }

  /* --- materiais: modelos do laboratorio -------------------------------- */

  // Transforma o link "Compartilhar" do Google Drive (.../file/d/ID/view) em
  // link de download direto. Aceita tambem o link de um arquivo do Office
  // aberto no editor do Google (docs.google.com/presentation/d/ID/edit...).
  // Links que nao sao do Google passam sem mudanca.
  function linkDownload(link) {
    var achado = /(?:drive|docs)\.google\.com\/.*?(?:\/d\/|[?&]id=)([\w-]{10,})/.exec(String(link || ""));
    return achado ? "https://drive.google.com/uc?export=download&id=" + achado[1] : link;
  }

  function cartaoModelo(m, categoria) {
    var cor = categoria.cor || "azul";

    var etiquetas = [];
    if (m.formato) {
      etiquetas.push('<span class="etiqueta etiqueta--' + esc(cor) + '">' + esc(m.formato) + "</span>");
    }
    var arquivo = [m.extensao, m.tamanho].filter(Boolean).join(" · ");
    if (arquivo) {
      etiquetas.push('<span class="etiqueta etiqueta--neutra">' + esc(arquivo) + "</span>");
    }

    var detalhes = m.detalhes && m.detalhes.length
      ? '<ul class="regras modelo__detalhes">' +
        // O <span> e necessario: cada <li> de .regras e uma grade de duas
        // colunas (✓ e texto), e sem ele cada <code> viraria uma coluna.
        m.detalhes.map(function (d) { return "<li><span>" + codigo(d) + "</span></li>"; }).join("") +
        "</ul>"
      : "";

    // A miniatura repete o link "Ver no Drive"; fica fora do teclado e do
    // leitor de tela para nao anunciar o mesmo destino duas vezes.
    var capa =
      '<a class="modelo__capa" href="' + esc(m.link) + '" target="_blank" rel="noopener" ' +
      'tabindex="-1" aria-hidden="true">' +
      (m.capa ? '<img src="' + esc(m.capa) + '" alt="" loading="lazy">' : icone(categoria.icone || "documento")) +
      "</a>";

    return (
      '<article class="modelo" style="--cor-destaque:var(--' + esc(cor) + ')">' +
      capa +
      "<div>" +
      (etiquetas.length ? '<div class="modelo__etiquetas">' + etiquetas.join("") + "</div>" : "") +
      '<h4 class="modelo__titulo">' + esc(m.titulo) + "</h4>" +
      (m.resumo ? '<p class="modelo__resumo">' + esc(m.resumo) + "</p>" : "") +
      detalhes +
      '<div class="modelo__acoes">' +
      '<a class="botao" href="' + esc(linkDownload(m.link)) + '" rel="noopener">' +
      icone("baixar") + "Baixar modelo" +
      '<span class="somente-leitor"> ' + esc(m.titulo) + "</span></a>" +
      '<a class="botao botao--secundario" href="' + esc(m.link) + '" target="_blank" rel="noopener">' +
      "Ver no Drive" + icone("externo") + "</a>" +
      (m.atualizado ? '<span class="modelo__data">Atualizado em ' + esc(m.atualizado) + "</span>" : "") +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function montarModelos() {
    var alvo = achar("[data-modelos]");
    if (!alvo || typeof MODELOS === "undefined" || typeof CATEGORIAS_MODELOS === "undefined") return;

    contar("modelos", MODELOS.length);

    var ids = CATEGORIAS_MODELOS.map(function (c) { return c.id; });
    MODELOS.forEach(function (m) {
      if (ids.indexOf(m.categoria) === -1) {
        console.warn(
          'LQTSM: o modelo "' + m.titulo + '" tem categoria "' + m.categoria +
          '", que não existe em CATEGORIAS_MODELOS, e não aparece no site.'
        );
      }
    });

    var prontas = [];
    var emPreparo = [];
    CATEGORIAS_MODELOS.forEach(function (categoria) {
      var itens = MODELOS.filter(function (m) { return m.categoria === categoria.id; });
      (itens.length ? prontas : emPreparo).push({ categoria: categoria, itens: itens });
    });

    var html = prontas.length
      ? prontas.map(function (grupo) {
          var c = grupo.categoria;
          return (
            '<section class="categoria" id="modelos-' + esc(c.id) +
            '" style="--cor-destaque:var(--' + esc(c.cor || "azul") + ')">' +
            '<div class="categoria__titulo">' +
            '<span class="cartao__icone">' + icone(c.icone || "documento") + "</span>" +
            "<div><h3>" + esc(c.titulo) + "</h3>" +
            (c.resumo ? "<p>" + esc(c.resumo) + "</p>" : "") +
            "</div></div>" +
            '<div class="pilha">' +
            grupo.itens.map(function (m) { return cartaoModelo(m, c); }).join("") +
            "</div></section>"
          );
        }).join("")
      : '<p class="vazio">Os primeiros modelos estão sendo preparados. Volte em breve.</p>';

    if (emPreparo.length) {
      html +=
        '<aside class="em-preparo">' +
        "<h3>Em preparação</h3>" +
        "<p>Estes modelos estão sendo organizados e aparecem aqui assim que ficarem prontos.</p>" +
        '<ul class="em-preparo__lista">' +
        emPreparo.map(function (grupo) {
          return "<li>" + icone(grupo.categoria.icone || "documento") + esc(grupo.categoria.titulo) + "</li>";
        }).join("") +
        "</ul></aside>";
    }

    alvo.innerHTML = html;
  }

  /* --- materiais: abas --------------------------------------------------- */
  /* Segue o padrao de abas da WAI-ARIA: as setas do teclado trocam de aba.
     O endereco acompanha a aba aberta (materiais.html#modelos), para que o
     link possa ser mandado direto para a aba certa. Tambem aceita um trecho
     de dentro da aba, como materiais.html#modelos-poster. */

  function montarAbas() {
    var barra = achar("[data-abas]");
    if (!barra) return;
    var abas = Array.prototype.slice.call(barra.querySelectorAll('[role="tab"]'));
    if (!abas.length) return;

    function painelDe(aba) {
      return document.getElementById(aba.getAttribute("aria-controls"));
    }

    function hashAtual() {
      try {
        return decodeURIComponent(location.hash.slice(1));
      } catch (e) {
        return "";
      }
    }

    function ativar(aba, opcoes) {
      opcoes = opcoes || {};
      abas.forEach(function (outra) {
        var ativa = outra === aba;
        outra.setAttribute("aria-selected", String(ativa));
        outra.tabIndex = ativa ? 0 : -1;
        var painel = painelDe(outra);
        if (painel) painel.hidden = !ativa;
      });

      if (opcoes.foco) aba.focus();
      if (opcoes.endereco && hashAtual() !== aba.getAttribute("data-aba")) {
        try {
          history.replaceState(null, "", "#" + aba.getAttribute("data-aba"));
        } catch (e) { /* arquivo aberto localmente em navegador restrito */ }
      }

      // Se a pessoa ja desceu a pagina, a barra esta presa no topo: volta para
      // o comeco do conteudo da aba, em vez de deixa-la no meio do painel novo.
      var painelAtivo = painelDe(aba);
      if (opcoes.rolar && painelAtivo) {
        var topo = achar(".topo");
        var alvoY =
          painelAtivo.getBoundingClientRect().top + window.pageYOffset -
          barra.offsetHeight - (topo ? topo.offsetHeight : 0);
        if (window.pageYOffset > alvoY) window.scrollTo(0, alvoY);
      }
    }

    function seguirEndereco() {
      var hash = hashAtual();
      if (!hash) return;
      var aba = abas.filter(function (a) {
        var nome = a.getAttribute("data-aba");
        return hash === nome || hash.indexOf(nome + "-") === 0;
      })[0];
      if (!aba) return;
      ativar(aba);
      // So da para rolar ate um trecho de dentro da aba depois que o painel
      // deixa de estar escondido.
      var destino = hash !== aba.getAttribute("data-aba") && document.getElementById(hash);
      if (destino) destino.scrollIntoView();
    }

    barra.addEventListener("click", function (e) {
      var aba = e.target.closest('[role="tab"]');
      if (aba) ativar(aba, { endereco: true, rolar: true });
    });

    barra.addEventListener("keydown", function (e) {
      var i = abas.indexOf(document.activeElement);
      if (i === -1) return;
      var j = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: abas.length - 1 }[e.key];
      if (j === undefined) return;
      e.preventDefault();
      ativar(abas[(j + abas.length) % abas.length], { foco: true, endereco: true });
    });

    window.addEventListener("hashchange", seguirEndereco);
    seguirEndereco();
  }

  /* --- marca: copiar codigo de cor com um clique ------------------------- */

  function montarCopiaCor() {
    var amostras = document.querySelectorAll("[data-copiar]");
    if (!amostras.length) return;

    Array.prototype.forEach.call(amostras, function (botao) {
      var rotulo = botao.querySelector(".cor__hex");
      if (!rotulo) return;
      var original = rotulo.textContent;

      botao.addEventListener("click", function () {
        var valor = botao.getAttribute("data-copiar");
        if (!navigator.clipboard) return; // navegador antigo: o texto segue selecionavel
        navigator.clipboard.writeText(valor).then(function () {
          rotulo.textContent = "copiado!";
          setTimeout(function () {
            rotulo.textContent = original;
          }, 1200);
        });
      });
    });
  }

  /* --- contato ----------------------------------------------------------- */

  function montarContato() {
    var alvo = achar("[data-contato]");
    if (!alvo || typeof CONFIG === "undefined") return;
    var c = CONFIG.contato;

    function item(nomeIcone, titulo, corpo) {
      return (
        '<div class="contato__item">' +
        '<span class="contato__icone">' + icone(nomeIcone) + "</span>" +
        "<div><h3>" + esc(titulo) + "</h3>" + corpo + "</div></div>"
      );
    }

    alvo.innerHTML =
      item(
        "pessoa",
        "Coordenação",
        "<p>" + esc(c.coordenador) + "</p>" +
          (c.lattes
            ? '<a href="' + esc(c.lattes) + '" target="_blank" rel="noopener">Currículo Lattes</a>'
            : "")
      ) +
      item(
        "email",
        "E-mail",
        '<p>Para dúvidas acadêmicas, colaborações e candidaturas.</p>' +
          '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>"
      ) +
      item(
        "local",
        "Endereço",
        "<p>" + c.endereco.map(esc).join("<br>") + "</p>"
      );

    var mapa = achar("[data-mapa]");
    if (mapa && c.mapa) {
      mapa.innerHTML =
        '<iframe src="' + esc(c.mapa) +
        '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
        'title="Mapa com a localização do LQTSM na UERJ" allowfullscreen></iframe>';
    }
  }

  function montarFormulario() {
    var alvo = achar("[data-formulario]");
    if (!alvo) return;
    if (typeof CONFIG === "undefined" || !CONFIG.formularioInscricao) {
      var secao = alvo.closest("section");
      if (secao) secao.hidden = true;
      return;
    }
    alvo.innerHTML =
      '<iframe src="' + esc(CONFIG.formularioInscricao) +
      '" height="640" loading="lazy" title="Formulário de candidatura ao LQTSM" allowfullscreen></iframe>';
  }

  /* --- inicializacao ----------------------------------------------------- */

  function iniciar() {
    var pagina = document.body.getAttribute("data-pagina") || "";
    montarCabecalho(pagina);
    montarRodape();
    montarNumeros();
    montarRecentes();
    montarEquipe();
    montarPublicacoes();
    montarLinhas();
    montarProjetos();
    montarFerramentas();
    montarTutoriais();
    montarModelos();
    montarAbas(); // depois das listas, para poder rolar ate um trecho delas
    montarCopiaCor();
    montarContato();
    montarFormulario();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
