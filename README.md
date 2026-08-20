# Portfólio — Arthur Mendes

Designer Gráfico e Engenheiro de Prompts · Joinville, SC  
**Tecnologias:** Python 3 · Flask · HTML5 · CSS3 · JavaScript Vanilla

---

## Instalação

### Pré-requisitos

- Python 3.9 ou superior
- pip

### macOS / Linux

```bash
cd portfolio-arthur
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Windows

```cmd
cd portfolio-arthur
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Acesse em: **http://localhost:5000**

---

## Estrutura de pastas

```
portfolio-arthur/
├── app.py                  ← Aplicação Flask
├── requirements.txt
├── .gitignore
├── data/
│   └── projects.json       ← Dados de todos os projetos
├── templates/
│   ├── base.html           ← Template base (header, footer, meta)
│   ├── index.html          ← Página inicial
│   ├── projects.html       ← Grade de projetos
│   ├── project_detail.html ← Estudo de caso individual
│   ├── about.html          ← Sobre mim
│   ├── contact.html        ← Contato
│   └── 404.html            ← Página de erro
└── static/
    ├── css/
    │   ├── main.css        ← Tokens, reset, layout base
    │   ├── themes.css      ← Paleta claro/escuro
    │   └── components.css  ← Cards, carrossel, formulário
    ├── js/
    │   ├── theme.js        ← Alternância de tema
    │   ├── carousel.js     ← Carrossel de projetos
    │   ├── filters.js      ← Filtros por categoria
    │   └── main.js         ← Comportamentos gerais
    └── images/
        ├── about/          ← Foto profissional (arthur-mendes.jpg)
        ├── projects/       ← Imagens dos projetos por pasta
        └── ui/             ← Ícones e assets de interface
```

---

## Como adicionar um projeto

1. Abra `data/projects.json`
2. Copie um bloco existente e cole no início ou no final do array
3. Preencha os campos (veja a estrutura abaixo)
4. Adicione a imagem de capa em `static/images/projects/nome-do-projeto/cover.jpg`
5. Salve e atualize o navegador

### Estrutura de um projeto no JSON

```json
{
  "id": 7,
  "title": "Nome do Projeto",
  "slug": "nome-do-projeto",
  "categories": ["Identidade Visual"],
  "year": "2025",
  "client": "Nome do Cliente",
  "project_type": "Identidade Visual",
  "role": "Designer Gráfico",
  "summary": "Resumo curto do projeto.",
  "challenge": "Desafio enfrentado.",
  "objective": "Objetivo do projeto.",
  "process": "Como o projeto foi desenvolvido.",
  "tools": ["Adobe Illustrator", "Photoshop"],
  "solution": "Solução desenvolvida.",
  "results": "Resultados alcançados.",
  "learnings": "O que aprendi.",
  "cover_image": "projects/nome-do-projeto/cover.jpg",
  "gallery": [
    { "src": "projects/nome-do-projeto/img1.jpg", "alt": "Descrição", "caption": "Legenda" }
  ],
  "external_link": null,
  "alt_texts": { "cover": "Descrição da imagem de capa" },
  "featured": false,
  "in_development": false
}
```

### Categorias disponíveis

- `Identidade Visual`
- `Social Media e Campanhas`
- `Design Esportivo`
- `Design Editorial e Institucional`
- `Design de Superfície e Games`
- `Projetos Digitais, IA e Dashboards`

Um projeto pode ter mais de uma categoria: `"categories": ["Identidade Visual", "Social Media e Campanhas"]`

---

## Como adicionar imagens

### Foto profissional

Coloque em: `static/images/about/arthur-mendes.jpg`

### Imagem de capa de projeto

Coloque em: `static/images/projects/slug-do-projeto/cover.jpg`  
Tamanho recomendado: **1600 × 900px** (proporção 16:9)

### Imagens da galeria

Coloque em: `static/images/projects/slug-do-projeto/nome-da-imagem.jpg`  
Referencie no JSON: `"src": "projects/slug-do-projeto/nome-da-imagem.jpg"`

### Currículo

Coloque em: `static/docs/curriculo-arthur-mendes.pdf`

---

## Como editar cores

Abra `static/css/themes.css` e altere as variáveis:

```css
[data-theme="light"] {
  --color-accent: #E51B23; /* Vermelho MENDES */
  --color-bg:     #F7F6F2; /* Fundo */
  --color-text:   #0A0A0C; /* Texto */
}
```

---

## Como editar fontes

Abra `static/css/main.css` e altere as variáveis no início do arquivo:

```css
--font-display: 'Nimbus Sans', 'Barlow', 'Helvetica Neue', Arial, sans-serif;
--font-body:    'Inter', -apple-system, sans-serif;
```

Para trocar a fonte de display para Nimbus Sans:
1. Instale a fonte no sistema ou via Adobe Fonts
2. Adicione `@font-face` no início de `main.css`
3. Atualize a variável `--font-display`

---

## Publicação

### Opções recomendadas

| Plataforma | Plano gratuito | Observação |
|---|---|---|
| **Render** | Sim | Suporte nativo a Flask/Python |
| **Railway** | Sim (limite mensal) | Deploy rápido via GitHub |
| **Fly.io** | Sim | Boa performance |
| **PythonAnywhere** | Sim | Simples para iniciantes |

### Deploy no Render (recomendado)

1. Crie uma conta em render.com
2. Conecte seu repositório GitHub
3. Crie um "Web Service" com:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
4. Adicione `gunicorn` ao `requirements.txt`

---

## Suporte e edições

Campos marcados com `[adicionar depois]` no JSON são placeholders —  
preencha quando tiver o conteúdo pronto. O site funciona normalmente  
sem eles, exibindo apenas as informações disponíveis.
