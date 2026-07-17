# Cola da apresentação — Livro do Aluno Interativo

> Documento para ficar aberto durante a reunião. Não precisa ler tudo. Use o sumário e procure a pergunta feita.

## Resumo em uma frase

O projeto transforma o livro em uma experiência de **leitura, escuta e prática oral**: o aluno ouve uma frase de referência, grava a própria voz, o Whisper transcreve e o sistema compara o texto reconhecido com a frase esperada para fornecer feedback.

## Fluxo em 15 segundos

```text
Admin envia o PDF
        ↓
Sistema extrai e estrutura o texto
        ↓
Admin revisa as frases praticáveis
        ↓
TTS ou gravação humana gera o áudio de referência
        ↓
Aluno escuta e grava a própria voz
        ↓
Whisper transforma a fala em texto
        ↓
Sistema compara os textos e mostra o feedback
        ↓
Progresso e tentativas são registrados
```

## Abertura sugerida

> A proposta não é somente colocar um PDF dentro da plataforma. É transformar cada frase relevante em uma atividade interativa. O aluno consegue ler, ouvir a pronúncia de referência, praticar a própria fala e receber um retorno imediato sem sair do livro.

## Problema que estamos resolvendo

- O livro atual é passivo.
- A prática oral depende do professor ou de outra ferramenta.
- Não existe feedback imediato durante o estudo individual.
- O professor não possui dados sobre quais frases geram mais dificuldade.
- O aluno não possui histórico de tentativas ou evolução por conteúdo.

## Proposta de valor

### Para o aluno

- Estuda leitura, escuta e fala no mesmo lugar.
- Repete quantas vezes precisar.
- Recebe feedback imediato e objetivo.
- Retoma o livro de onde parou.
- Consegue identificar palavras não reconhecidas.

### Para o professor e coordenação

- Enxerga participação e progresso.
- Identifica frases com maior índice de dificuldade.
- Detecta alunos que não estão praticando.
- Pode direcionar a aula com base em dados reais.
- Reduz parte da correção repetitiva de exercícios básicos.

### Para a empresa

- Cria um diferencial no produto.
- Aumenta o valor do material já existente.
- Centraliza a experiência dentro da plataforma.
- Permite evoluções futuras sem reconstruir o livro.

---

# Papel de cada tecnologia

## TTS — Text-to-Speech

**O que faz:** transforma texto em áudio.

```text
Texto da frase → áudio de referência
```

Exemplo: o sistema recebe `How are you today?` e gera o áudio que o aluno escutará.

**Resposta curta:**

> O TTS cria a voz de referência do livro. Ele faz o caminho de texto para áudio.

## Whisper — Speech-to-Text

**O que faz:** transforma áudio falado em texto.

```text
Gravação do aluno → texto reconhecido
```

**Resposta curta:**

> O Whisper entra depois que o aluno grava a voz. Ele converte a fala em texto para que o sistema consiga comparar com a frase original.

## Comparador textual

O comparador recebe:

- frase esperada;
- transcrição retornada pelo Whisper.

Depois pode aplicar:

- normalização de letras maiúsculas e minúsculas;
- remoção de pontuação;
- tratamento de contrações;
- alinhamento de palavras;
- distância de edição;
- Word Error Rate — WER;
- percentual configurável de correspondência.

Exemplo:

```text
Esperado:  I would like a glass of water
Reconhecido: I would like glass water

Corretas: I would like glass water
Ausentes: a, of
```

## Avaliação fonética especializada

O Whisper **não deve ser apresentado como avaliador definitivo de pronúncia**.

Ele consegue dizer se a fala foi reconhecida como o texto esperado, mas não mede com precisão:

- posição da língua;
- qualidade de um fonema;
- entonação;
- prosódia;
- sotaque;
- fluência detalhada.

**Resposta curta:**

> No MVP vamos medir inteligibilidade e correspondência textual. Uma nota fonética real deve ser uma segunda fase com um serviço especializado.

---

# Escopo do MVP

## Entra no MVP

1. Cadastro do livro.
2. Upload do PDF.
3. Extração de texto ou OCR quando necessário.
4. Separação por páginas e frases.
5. Revisão administrativa das frases.
6. Áudio de referência por TTS ou upload humano.
7. Player de áudio por frase.
8. Gravação curta pelo navegador.
9. Transcrição por Whisper.
10. Comparação textual.
11. Feedback por palavra.
12. Novas tentativas.
13. Registro de progresso.
14. Painel básico para professor e coordenação.

## Não entra inicialmente

- Nota fonética precisa.
- Correção de sotaque.
- Conversação livre com IA.
- Avaliação gramatical de fala livre.
- Gamificação avançada.
- Ranking entre alunos.
- Relatórios pedagógicos complexos.
- Correção automática de todos os tipos de exercício do PDF.

## Por que limitar o MVP?

> O prazo é curto. O objetivo é entregar um ciclo completo e validável: ouvir, gravar, transcrever, comparar e salvar. Depois disso, evoluímos qualidade, relatórios e avaliação fonética.

---

# Perguntas prováveis do Tech Lead

## 1. Por que React e TypeScript?

> O projeto tem bastante estado de interface: página atual, frase selecionada, áudio tocando, gravação, processamento e feedback. React facilita a composição desses componentes e TypeScript reduz erros entre front-end, API e banco.

## 2. Por que React Router?

> Para separar os fluxos administrativos e do aluno em rotas claras, como biblioteca, leitor, editor do livro e acompanhamento.

Exemplo:

```text
/admin/books
/admin/books/:bookId/editor
/student/books
/student/books/:bookId/read
/teacher/books/:bookId/report
```

## 3. O PDF será exibido diretamente?

> A recomendação é manter a aparência da página, mas transformar o conteúdo relevante em dados estruturados. O PDF pode ser renderizado com PDF.js e receber uma camada interativa por cima.

## 4. E se o PDF for escaneado?

> Primeiro verificamos se existe texto selecionável. Caso não exista, o arquivo entra em OCR. O resultado precisa passar por revisão administrativa, porque OCR pode errar palavras e posições.

## 5. Como uma frase será posicionada na página?

> Cada segmento terá coordenadas relativas à página: posição X, Y, largura e altura. Valores percentuais permitem manter o posicionamento mesmo com responsividade e zoom.

## 6. O processo será totalmente automático?

> Não no MVP. A proposta é semiautomática: o sistema extrai e sugere, mas o admin revisa texto, área e áudio antes da publicação. Isso reduz erros pedagógicos e retrabalho.

## 7. Por que usar fila e Redis?

> PDF, OCR, geração de áudio e transcrição são operações demoradas. Elas não devem bloquear a requisição HTTP. A API cria um job, um worker processa e o front acompanha o status.

## 8. Por que BullMQ?

> É uma solução consolidada no ecossistema Node para jobs, tentativas automáticas, status, atraso, concorrência e reprocessamento usando Redis.

## 9. O que acontece se o Whisper ou o TTS falhar?

> O job fica com status de erro, registra a mensagem e permite nova tentativa. A interface não deve perder o arquivo original nem obrigar o admin ou aluno a começar tudo novamente.

## 10. Como evitar dependência de um único fornecedor?

> TTS e Speech-to-Text devem ficar atrás de interfaces de serviço. O restante da aplicação conhece apenas métodos como `generateSpeech` e `transcribeAudio`. Assim podemos trocar fornecedor sem alterar o domínio do livro.

Exemplo conceitual:

```ts
interface SpeechToTextProvider {
  transcribe(file: Buffer, language: string): Promise<TranscriptResult>;
}

interface TextToSpeechProvider {
  generate(text: string, voice: string): Promise<AudioResult>;
}
```

## 11. Como será a comparação das frases?

> Primeiro normalizamos os dois textos. Depois alinhamos as palavras e calculamos correspondência. A regra precisa ser configurável por nível e tipo de exercício, evitando exigir 100% em todos os casos.

## 12. Qual algoritmo de comparação?

> Para o MVP podemos combinar alinhamento por tokens, distância de Levenshtein e Word Error Rate. A resposta visual deve mostrar palavras corretas, ausentes, inseridas e substituídas.

## 13. Qual será o limite de aprovação?

> Deve ser uma decisão pedagógica, não apenas técnica. Podemos começar com um valor configurável, por exemplo 80%, mas o coordenador precisa validar se isso faz sentido por nível e atividade.

## 14. O aluno pode enganar o sistema reproduzindo o áudio no microfone?

> Tecnicamente é possível. No MVP o objetivo é prática, não prova ou certificação. Caso vire avaliação formal, serão necessárias regras adicionais de integridade.

## 15. Como será a gravação no navegador?

> Com `getUserMedia` para permissão do microfone e `MediaRecorder` para capturar uma tentativa curta. O back-end normaliza o formato com FFmpeg antes da transcrição quando necessário.

## 16. Funciona no celular?

> Sim, mas exige validação nos navegadores-alvo, principalmente permissões de microfone, formato gerado pelo MediaRecorder e comportamento no Safari/iOS. Mobile deve fazer parte dos testes desde o começo se for obrigatório no MVP.

## 17. Como lidar com ruído e microfone ruim?

> Limite de duração, orientação visual, detecção de silêncio, normalização e possibilidade de tentar novamente. Também precisamos evitar dizer que um erro de reconhecimento significa necessariamente pronúncia ruim.

## 18. Como lidar com sotaques?

> O reconhecimento pode aceitar diferentes sotaques. O feedback será de inteligibilidade textual, não de eliminação de sotaque. Isso precisa estar claro na interface e na comunicação pedagógica.

## 19. Onde os arquivos ficarão?

> PDFs, páginas e áudios de referência podem ficar em Cloudflare R2 ou storage compatível com S3. Gravações dos alunos podem ser temporárias e apagadas após a transcrição, dependendo da decisão de privacidade.

## 20. Por que não salvar tudo no banco?

> O banco guarda metadados, URLs, duração e status. Arquivos binários pesados devem ficar em object storage para reduzir carga, custo e dificuldade de backup do banco relacional.

## 21. Como será a segurança dos arquivos?

> Upload validado por tipo, tamanho e assinatura real do arquivo. Acesso por URL assinada ou rota autenticada, sem expor arquivos privados diretamente.

## 22. Como evitar upload malicioso?

- Limite de tamanho.
- Verificação de MIME real.
- Extensões permitidas.
- Nome interno gerado pelo sistema.
- Processamento isolado.
- Antivírus, caso a infraestrutura permita.
- Nunca executar conteúdo enviado.

## 23. Como fica a LGPD?

> Voz é dado pessoal. Precisamos definir finalidade, prazo de retenção, acesso e exclusão. Minha recomendação para o MVP é transcrever e apagar a gravação, mantendo somente resultado textual e métricas, salvo se houver necessidade pedagógica formal de armazená-la.

## 24. Como será o banco?

Principais entidades:

```text
student_books
student_book_pages
student_book_segments
student_book_segment_audios
student_book_assignments
student_book_progress
student_practice_attempts
student_recordings
student_transcriptions
student_practice_word_results
student_book_processing_jobs
```

## 25. Por que separar tentativa, gravação e transcrição?

> Porque possuem ciclos de vida diferentes. A gravação pode ser apagada, enquanto tentativa, resultado e transcrição podem continuar existindo para relatório e auditoria.

## 26. Como evitar duplicação de áudio TTS?

> Podemos gerar uma chave pelo texto, idioma, voz e velocidade. Se já existir um áudio igual, reutilizamos em vez de gerar novamente.

## 27. Como controlar custo?

- Gerar TTS apenas na publicação ou quando o texto mudar.
- Reutilizar áudio por hash.
- Limitar duração de gravações.
- Não retranscrever a mesma tentativa.
- Guardar métricas de consumo por livro e usuário.
- Configurar limites por aluno.

## 28. Como controlar latência?

> Tentativas curtas, upload compacto, processamento assíncrono e feedback de estado. Para frases curtas, a expectativa é uma resposta rápida, mas o front precisa mostrar “processando” e tratar timeout.

## 29. Como escalar?

> API sem estado, object storage para arquivos, banco relacional para dados e workers escaláveis para processamento. Podemos aumentar a quantidade de workers sem alterar o front-end.

## 30. Quais endpoints seriam necessários?

Exemplos:

```text
POST   /books
POST   /books/:id/pdf
POST   /books/:id/process
GET    /books/:id/pages
POST   /segments/:id/audio
POST   /segments/:id/attempts
GET    /attempts/:id
GET    /students/:id/books/:bookId/progress
GET    /teachers/classes/:classId/books/:bookId/report
```

## 31. Como será o acompanhamento do processamento?

> Cada job possui status como `pending`, `processing`, `completed` ou `failed`. O front pode consultar periodicamente ou receber atualizações via WebSocket/SSE em uma evolução futura.

## 32. Como testar?

- Testes unitários da normalização e comparação.
- Testes de integração da API e banco.
- Testes com arquivos PDF reais.
- Testes de gravação em navegadores diferentes.
- Testes com sotaques, ruído e velocidades de fala.
- Teste manual pedagógico antes da publicação.

## 33. Como monitorar?

- Tempo de processamento por job.
- Taxa de erro por provedor.
- Custo médio por transcrição e TTS.
- Percentual de tentativas com timeout.
- Quantidade de reprocessamentos.
- Frases com falhas anormais de reconhecimento.

## 34. Como o Git será organizado?

> Uma branch da feature criada a partir da branch principal. Todos os dias ela recebe as atualizações da principal para reduzir conflitos. Commits pequenos e separados por responsabilidade.

## 35. É viável entregar até o final do mês?

> É viável se o MVP permanecer restrito e algumas decisões forem tomadas na reunião: formato dos PDFs, fornecedor de áudio, política das gravações e critério de correspondência. Avaliação fonética avançada deve ficar fora.

## 36. Qual é o maior risco técnico?

> Variabilidade do conteúdo e da captura de voz: PDFs escaneados, textos extraídos incorretamente, microfones ruins e falsos negativos na transcrição. Por isso a revisão administrativa e o feedback sem linguagem punitiva são importantes.

## 37. Por que não usar somente o navegador para reconhecimento de voz?

> APIs nativas de reconhecimento possuem diferenças de suporte, comportamento e controle entre navegadores. Um serviço no back-end oferece resultado mais previsível, auditável e desacoplado do dispositivo.

---

# Perguntas prováveis do coordenador dos professores

## 1. Isso realmente avalia pronúncia?

> No MVP, não de forma fonética. Ele verifica se a fala foi compreendida como a frase esperada. Isso já é útil para prática de inteligibilidade, mas não substitui avaliação detalhada do professor.

## 2. O aluno pode receber um resultado injusto?

> Sim, um reconhecimento pode falhar por ruído, microfone ou sotaque. Por isso o feedback não deve dizer “você pronunciou errado”. Deve dizer “não conseguimos reconhecer estas palavras” e sempre permitir nova tentativa.

## 3. Como evitar frustrar o aluno?

- Não exigir perfeição em todas as frases.
- Mostrar progresso parcial.
- Permitir ouvir novamente em velocidade reduzida.
- Oferecer várias tentativas.
- Usar mensagens neutras.
- Diferenciar erro técnico de dificuldade pedagógica.

Mensagem recomendada:

> Algumas palavras não foram reconhecidas. Ouça novamente e tente repetir mais perto do microfone.

Mensagem a evitar:

> Sua pronúncia está errada.

## 4. O professor será substituído?

> Não. A ferramenta cuida de repetição e feedback inicial. O professor continua responsável por correções mais profundas, contexto, entonação, conversação e decisões pedagógicas.

## 5. Quais frases devem ser interativas?

> Não necessariamente todas. Recomendo priorizar frases-modelo, diálogos, vocabulário-alvo e estruturas importantes da unidade. Essa curadoria precisa ser feita com o time pedagógico.

## 6. Quem revisará o conteúdo extraído?

> O sistema ajuda na extração, mas a publicação precisa de aprovação humana. A coordenação deve definir quem valida texto, tradução, áudio e frases praticáveis.

## 7. O áudio será natural?

> Podemos começar com TTS de boa qualidade e permitir substituição por gravações humanas. O modelo híbrido reduz custo inicial sem impedir conteúdo premium depois.

## 8. Podemos usar diferentes vozes e sotaques?

> Sim. O áudio pode ter idioma, voz, velocidade e variante configuráveis. A coordenação deve decidir quais referências deseja ensinar.

## 9. É possível diminuir a velocidade do áudio?

> Sim. Podemos oferecer 0,75x, 1x e 1,25x no player sem precisar gerar novos arquivos em todos os casos.

## 10. O aluno poderá ouvir palavra por palavra?

> Pode ser uma evolução. No MVP é mais seguro trabalhar com frases ou blocos curtos. Depois podemos adicionar áudio por palavra quando houver benefício pedagógico.

## 11. Como será calculado o progresso?

Possibilidades:

- páginas visualizadas;
- frases escutadas;
- frases praticadas;
- frases com correspondência suficiente;
- conclusão de unidades.

> A regra deve ser definida pela coordenação. Minha sugestão é separar progresso de leitura e progresso de prática.

## 12. Quantas tentativas serão permitidas?

> Tecnicamente pode ser ilimitado, mas podemos registrar somente as últimas ou melhores tentativas no painel. A coordenação deve decidir o comportamento pedagógico.

## 13. O professor verá a gravação do aluno?

> É possível, mas aumenta responsabilidade de privacidade e armazenamento. Para o MVP recomendo mostrar transcrição e métricas, apagando o áudio após o processamento. O acesso ao áudio deve existir somente se houver justificativa pedagógica clara.

## 14. Quais dados o painel mostrará?

MVP:

- último acesso;
- página atual;
- frases praticadas;
- quantidade de tentativas;
- percentual de correspondência;
- palavras com dificuldade recorrente;
- frases mais difíceis da turma.

## 15. O sistema consegue identificar que o aluno leu sem entender?

> Não diretamente. Ele verifica interação e fala reconhecida, não compreensão semântica. Exercícios de interpretação devem ser tratados separadamente.

## 16. Isso serve para todos os níveis?

> Sim, mas o critério muda. Iniciantes podem praticar palavras e frases curtas. Níveis avançados podem trabalhar blocos maiores. Limite de correspondência e tipo de conteúdo devem ser configuráveis.

## 17. Como tratar variações válidas?

> Podemos permitir respostas alternativas cadastradas pelo professor. Isso é importante para contrações, variantes regionais e respostas com mais de uma forma correta.

Exemplo:

```text
Forma principal: I am fine
Alternativa válida: I'm fine
```

## 18. Como trabalhar entonação?

> TTS fornece referência, mas o MVP não pontua entonação. O modo sombra pode ajudar: o aluno escuta um trecho curto e repete logo depois, imitando ritmo e melodia.

## 19. Podemos recomendar frases para revisão?

> Sim. Uma segunda fase pode usar repetição espaçada e recomendar frases com mais erros ou que não são praticadas há algum tempo.

## 20. Como saber se a ferramenta deu resultado pedagógico?

Métricas possíveis:

- aumento de frases praticadas por aluno;
- redução de tentativas por frase ao longo do tempo;
- evolução da correspondência textual;
- frequência de uso;
- percepção do aluno e professor;
- desempenho em atividades orais conduzidas pelo professor.

## 21. O aluno deve ver um percentual?

> Pode ver, mas precisamos evitar que pareça uma nota oficial de pronúncia. Uma alternativa é mostrar estados como “reconhecido”, “quase lá” e “tente novamente”, acompanhados das palavras.

## 22. Como tratar crianças ou alunos inseguros?

> Feedback positivo, sem comparação pública, sem ranking por pronúncia e com possibilidade de repetir em privado. A interface deve valorizar tentativa e evolução.

## 23. O conteúdo pode ter tradução?

> Sim. Tradução, dica e áudio podem ser atributos opcionais do segmento. A decisão depende da metodologia adotada no curso.

## 24. O professor pode escolher quais atividades liberar?

> Sim. O vínculo pode ser por curso, turma, aluno, unidade ou período de disponibilidade.

## 25. O livro pode ser alterado depois de publicado?

> Sim, mas o ideal é versionar. Mudanças em texto ou áudio não devem apagar o histórico antigo sem controle. Para o MVP podemos permitir edição com registro de atualização; versionamento completo pode ser uma evolução.

---

# Perguntas de produto e gestão

## Quanto custará?

> O custo depende de páginas, caracteres gerados por TTS, duração das gravações e número de tentativas. Antes de fechar fornecedor, precisamos estimar usuários ativos, frases por livro e práticas médias por aluno.

Dados necessários para estimativa:

- quantidade de alunos ativos;
- quantidade de livros;
- quantidade média de frases interativas;
- duração média de cada tentativa;
- tentativas médias por aluno/dia;
- necessidade de armazenar gravações;
- fornecedor escolhido.

## Como fazer um piloto?

Sugestão:

1. Escolher uma unidade pequena.
2. Selecionar entre 20 e 50 frases.
3. Usar uma turma de teste.
4. Medir uso, falhas e percepção.
5. Validar feedback com professores.
6. Ajustar o limite de correspondência.
7. Expandir para outros livros.

## Qual seria a primeira demonstração funcional?

Uma única página com:

- frase destacada;
- botão de ouvir;
- botão de gravar;
- envio da gravação;
- transcrição;
- comparação por palavra;
- nova tentativa.

> Essa vertical demonstra o valor principal antes de construir todo o painel administrativo.

## O que precisa ser decidido na reunião?

### Obrigatório

1. O objetivo é inteligibilidade textual ou avaliação fonética?
2. Os PDFs são digitais ou escaneados?
3. Já existem áudios humanos?
4. Qual implementação do Whisper foi usada pelo Bavuso?
5. Qual fornecedor de TTS será considerado?
6. Gravações serão armazenadas ou apagadas?
7. Mobile é obrigatório no MVP?
8. Qual livro/unidade será o piloto?
9. Quem valida o conteúdo pedagógico?
10. Qual critério define uma tentativa bem-sucedida?

### Bom definir

- vozes e sotaques de referência;
- limite de tentativas;
- duração máxima da gravação;
- progresso por leitura ou prática;
- dados disponíveis para professores;
- necessidade de tradução e dicas;
- prazo da primeira demonstração.

---

# Riscos e respostas

## Risco: o Whisper reconhecer mesmo com pronúncia imperfeita

> Isso pode acontecer porque ele é tolerante a sotaques e ruído. Por isso o resultado é inteligibilidade textual, não nota fonética.

## Risco: o Whisper não reconhecer uma fala aceitável

> Nova tentativa, mensagens neutras e possibilidade de o professor revisar padrões de falha. Não devemos punir o aluno por um único resultado.

## Risco: OCR gerar texto errado

> Revisão obrigatória antes da publicação.

## Risco: custo crescer com muitas tentativas

> Limites configuráveis, métricas de consumo, arquivos curtos e provedores desacoplados.

## Risco: prazo ficar inviável

> Evitar incluir avaliação fonética, conversação livre, gamificação e automação total no MVP.

## Risco: conflito com mudanças da equipe

> Branch dedicada, atualização diária com a principal, commits pequenos e integração frequente.

## Risco: gravações gerarem problema de privacidade

> Processamento temporário e exclusão automática, salvo decisão formal diferente.

---

# Ideias para causar boa impressão na reunião

## 1. Modo sombra — Shadowing

O áudio toca uma frase curta e, logo depois, o aluno repete. Ajuda ritmo, memória e entonação.

## 2. Frases difíceis da turma

Painel mostra frases com maior quantidade média de tentativas.

## 3. Repetição espaçada

Frases com dificuldade retornam em sessões futuras.

## 4. Velocidade de áudio

0,75x, 1x e 1,25x.

## 5. Modo privacidade

Transcreve e apaga a gravação, mantendo somente métricas.

## 6. Áudio híbrido

TTS no lançamento e substituição gradual por professores ou nativos.

## 7. Alternativas válidas

Professor cadastra mais de uma resposta aceitável.

## 8. Teste antes de escalar

Piloto com uma unidade, poucas frases e uma turma.

## 9. Métrica pedagógica, não somente técnica

Não medir somente acerto do Whisper. Medir prática, repetição, evolução e percepção dos professores.

## 10. Arquitetura desacoplada

Mostrar que TTS, Whisper e futura avaliação fonética podem ser trocados separadamente.

---

# Frases prontas para situações difíceis

## Quando perguntarem algo ainda não definido

> Esse ponto depende de uma decisão de produto/pedagogia. Minha proposta técnica suporta as duas opções, mas preciso que a equipe defina qual comportamento será adotado no MVP.

## Quando pedirem algo grande para o MVP

> É possível evoluir para isso, mas incluir agora aumenta bastante o risco do prazo. Eu manteria no MVP o ciclo completo básico e deixaria essa capacidade como segunda fase.

## Quando perguntarem se você garante precisão

> Não é correto garantir precisão absoluta, porque há variação de microfone, ruído e sotaque. Podemos medir, testar com o público real e ajustar o comportamento para reduzir falsos resultados.

## Quando perguntarem por que não automatizar tudo

> Automação total parece mais rápida, mas um erro de texto ou áudio publicado afeta todos os alunos. No primeiro momento, o melhor equilíbrio é processamento automático com validação humana.

## Quando perguntarem se Whisper é suficiente

> Para reconhecimento textual, sim, ele atende ao núcleo do MVP. Para pontuação fonética e prosódia, precisamos de uma ferramenta especializada.

## Quando perguntarem qual tecnologia é definitiva

> A arquitetura evita tratar fornecedor como definitivo. O domínio permanece igual e os provedores podem ser substituídos conforme custo, qualidade e resultado do piloto.

## Quando questionarem o prazo

> O prazo depende de manter o escopo fechado e sair desta reunião com as decisões essenciais. A primeira entrega deve ser uma vertical funcional, não todo o ecossistema avançado.

---

# Ordem recomendada da apresentação

## 1. Abra pelo problema — 1 minuto

Não comece falando de bibliotecas.

> Hoje o livro entrega conteúdo, mas não cria um ciclo de prática oral nem devolve dados para o professor.

## 2. Mostre a experiência do aluno — 2 minutos

```text
Ler → ouvir → gravar → transcrever → comparar → tentar novamente
```

## 3. Mostre o fluxograma geral — 2 minutos

Explique os responsáveis pelas cores:

- administrador;
- sistema;
- áudio/IA;
- aluno;
- professor.

## 4. Abra o fluxo do aluno — 3 minutos

Este é o fluxo mais importante para produto e pedagogia.

## 5. Explique TTS × Whisper — 1 minuto

> TTS gera a referência. Whisper reconhece a tentativa.

## 6. Mostre MVP × fase futura — 2 minutos

Deixe explícito que nota fonética não está sendo prometida no MVP.

## 7. Mostre arquitetura e banco — 2 minutos

Para o tech lead, destaque:

- serviços desacoplados;
- processamento assíncrono;
- object storage;
- histórico separado de gravação;
- possibilidade de troca de fornecedores.

## 8. Termine pedindo decisões — 2 minutos

Não encerre somente com “é isso”.

> Para começar na segunda sem retrabalho, preciso sair daqui com estas decisões: objetivo da avaliação, formato dos PDFs, fonte dos áudios, retenção das gravações, piloto e responsável pela validação pedagógica.

---

# Checklist antes da reunião

- [ ] Abrir o site e testar todas as abas do fluxograma.
- [ ] Deixar este README aberto em outra aba.
- [ ] Confirmar internet e zoom do navegador.
- [ ] Separar um PDF de exemplo.
- [ ] Separar uma frase de exemplo.
- [ ] Confirmar com Bavuso a versão/implementação usada.
- [ ] Saber os nomes das tabelas e entidades principais.
- [ ] Saber explicar TTS × Whisper sem hesitar.
- [ ] Não prometer avaliação fonética precisa.
- [ ] Anotar todas as decisões tomadas.
- [ ] Definir responsável e prazo para cada pendência.

# Anotações durante a reunião

```text
Objetivo aprovado:

PDF escolhido para piloto:

Áudio: TTS / humano / híbrido:

Fornecedor de TTS:

Whisper/modelo:

Critério de correspondência:

Política das gravações:

Mobile obrigatório:

Responsável pela validação pedagógica:

Data da primeira demo:

Pendências:
```

# Encerramento sugerido

> A proposta mantém conteúdo, áudio, transcrição e avaliação desacoplados. Assim conseguimos entregar um MVP funcional dentro do prazo, validar com alunos e professores e evoluir depois sem reconstruir toda a solução.
