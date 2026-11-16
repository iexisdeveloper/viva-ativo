# Viva Ativo: Liberte-se do sedentarismo

Protótipo web desenvolvido para a **Atividade Extensionista II: Tecnologia Aplicada à Inclusão Digital – Projeto** (CST em Ciência de Dados – UNINTER).

O Viva Ativo sugere exercícios de 1 minuto, sem equipamentos, para quem passa muito tempo sentado no trabalho ou nos estudos. As sugestões levam em conta o **objetivo** escolhido pelo usuário e as **limitações físicas** que ele informar.

**ODS 3 – Saúde e bem-estar**

## Telas

1. **Apresentação**: explica a proposta do aplicativo.
2. **Perfil e metas**: nome, objetivo principal, limitações físicas e intervalo entre os lembretes.
3. **Início**: progresso do dia, sequência de dias, próximo exercício sugerido e catálogo.
4. **Exercício**: GIF de demonstração, cronômetro de 1 minuto e passo a passo.
5. **Feedback**: avaliação de 1 a 5 estrelas, categoria e mensagem para o autor.
6. **Configurações**: intervalo, sons, teste de alerta, edição do perfil, reinício dos exercícios do dia e opção de apagar os dados.

## Lógica de sugestão

Cada exercício do catálogo (`script.js`) tem:

- `objetivos`: quais objetivos do cadastro ele atende;
- `evitarSe`: em quais limitações físicas ele não deve ser sugerido.

Na montagem da sequência do dia:

1. ficam de fora os exercícios que não combinam com as limitações informadas;
2. os exercícios que atendem ao objetivo escolhido vêm primeiro;
3. dentro de cada grupo a ordem é sorteada;
4. o aplicativo guarda as ordens já usadas na semana, para que a mesma ordem não se repita, e tenta começar cada dia por um exercício diferente.

Dentro do dia, nenhum exercício se repete até que todos os sugeridos sejam feitos. A semana começa na segunda-feira. Quando o usuário muda o objetivo ou as limitações, a sequência é montada de novo, mantendo os exercícios já feitos no dia.

## Tecnologias

- HTML, CSS e JavaScript, sem frameworks e sem etapa de build.
- `localStorage` para salvar o perfil e o progresso no próprio aparelho.
- Service Worker e Web App Manifest para as notificações e para instalar na tela inicial do celular.
- Google Sheets (via Google Apps Script) para receber os feedbacks do grupo piloto.

## Estrutura

```
index.html       telas do aplicativo
style.css        estilos
script.js        dados dos exercícios e lógica do aplicativo
sw.js            service worker (notificações)
manifest.json    dados para instalar no celular
icons/           ícones do aplicativo
data/gif/        GIFs de demonstração dos exercícios
```

## Como executar

O site é estático e não precisa de instalação. Para testar no computador, sirva a pasta com qualquer servidor local, por exemplo:

```
python -m http.server 8000
```

e acesse `http://localhost:8000`. Abrir o `index.html` direto pelo explorador de arquivos funciona, mas as notificações e a instalação só funcionam com o endereço `http://localhost` ou com o site publicado (HTTPS).

## Publicação

Pode ser publicado no GitHub Pages ou em qualquer hospedagem de arquivos estáticos. Todos os caminhos são relativos, então o site funciona tanto na raiz do domínio quanto em um subcaminho.

## Links

- Protótipo em funcionamento: [https://iexisdeveloper.github.io/viva-ativo/]
- Repositório: [https://github.com/iexisdeveloper/viva-ativo]

## Créditos

- GIFs de demonstração dos exercícios: [fonte dos GIFs]

## Observação

As sugestões são de caráter geral e não substituem a orientação de um profissional de saúde.
