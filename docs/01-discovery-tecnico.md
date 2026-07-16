# Discovery técnico — Livro do Aluno Interativo

## 1. Objetivo

Transformar o livro do aluno em uma experiência de leitura, escuta e prática oral dentro da plataforma.

O aluno deve conseguir:

1. abrir o livro;
2. selecionar uma frase;
3. ouvir um áudio de referência;
4. gravar a própria voz;
5. receber um feedback baseado no texto reconhecido;
6. repetir a tentativa;
7. manter o progresso salvo.

## 2. Definição correta das ferramentas de áudio

### TTS — Text-to-Speech

Responsável por transformar o texto do livro em áudio de referência.

```text
Texto do livro → TTS → áudio que o aluno escuta
```

Também será possível usar gravações humanas já existentes.

### Whisper / Speech-to-Text

Responsável por transformar a gravação do aluno em texto.

```text
Voz do aluno → Whisper → texto reconhecido
```

O sistema compara o texto reconhecido com a frase original.

### Limitação importante

Whisper não deve ser apresentado como avaliador definitivo de pronúncia. Ele mede, na prática, se a fala foi reconhecida como o texto esperado.

Uma avaliação real de pronúncia, fonemas, fluência, entonação e prosódia exige uma solução especializada, como um serviço de Pronunciation Assessment.

## 3. Fluxo do administrador

1. Cadastrar o livro.
2. Informar título, idioma, nível, curso e descrição.
3. Enviar o PDF.
4. O sistema verifica se o PDF possui texto selecionável.
5. Se possuir texto, realiza extração direta.
6. Se for escaneado, utiliza OCR.
7. Estrutura o conteúdo por capítulo, página, bloco e frase.
8. O administrador revisa o texto extraído.
9. Define quais frases serão interativas e praticáveis.
10. Escolhe a origem do áudio:
    - TTS;
    - gravação humana.
11. Testa a prévia do livro.
12. Corrige texto, áudio ou posicionamento quando necessário.
13. Define o público do livro.
14. Publica.

## 4. Fluxo do aluno

1. Acessar a biblioteca.
2. Selecionar o livro.
3. Retomar a última página ou iniciar a leitura.
4. Selecionar uma frase.
5. Ouvir a referência.
6. Decidir se deseja praticar.
7. Autorizar o microfone.
8. Gravar uma tentativa curta.
9. O sistema normaliza o arquivo de áudio.
10. Whisper transcreve a tentativa.
11. O sistema normaliza os textos:
    - caixa baixa;
    - remoção de pontuação;
    - tratamento de espaços;
    - tratamento de contrações;
    - possíveis variações configuradas.
12. Compara a frase original com o texto reconhecido.
13. Exibe palavras correspondentes, ausentes, inseridas ou diferentes.
14. Permite nova tentativa.
15. Registra progresso e histórico.

## 5. Fluxo do professor e coordenação

O painel poderá apresentar:

- livros acessados;
- página atual;
- percentual de leitura;
- quantidade de frases ouvidas;
- quantidade de frases praticadas;
- média de tentativas por frase;
- frases com maior dificuldade de reconhecimento;
- último acesso;
- histórico de transcrições, conforme regra de privacidade.

O professor poderá recomendar uma nova prática em frases específicas.

## 6. Arquitetura proposta

### Front-end

- React;
- TypeScript;
- React Router;
- TanStack Query;
- React Hook Form;
- Zod;
- PDF.js ou react-pdf;
- MediaRecorder API;
- getUserMedia;
- HTMLAudioElement;
- Web Audio API, quando necessário;
- @xyflow/react apenas para a apresentação do fluxograma.

### Back-end

- Node.js;
- TypeScript;
- Express, caso seja o padrão atual, ou Fastify;
- Zod para validação;
- arquitetura em serviços por domínio;
- adaptadores separados para TTS e Speech-to-Text.

### Banco

- MySQL 8;
- Prisma, Sequelize ou ORM já utilizado pelo sistema;
- migrations versionadas.

### Processamento

- Redis;
- BullMQ;
- FFmpeg;
- worker separado da API;
- OCR apenas quando o PDF não possuir texto.

### Storage

- Cloudflare R2;
- Amazon S3;
- DigitalOcean Spaces;
- outro storage compatível com S3.

## 7. Estrutura lógica dos módulos

```text
books
├── pages
│   └── segments
│       └── reference audio
├── assignments
├── processing jobs
└── student progress
    └── practice attempts
        ├── recording
        ├── transcription
        └── word results
```

## 8. Regra de comparação do MVP

A primeira versão não deve gerar uma nota de pronúncia enganosa.

O feedback pode usar:

- correspondência exata por palavra;
- similaridade textual;
- distância de Levenshtein;
- alinhamento entre palavras;
- limite configurável por nível ou exercício.

Exemplo:

```text
Frase: I would like a glass of water
Reconhecido: I would like glass water

Correto: I would like / glass / water
Ausente: a / of
```

## 9. Escopo do MVP

- cadastro e publicação de livro;
- upload de PDF;
- extração de texto;
- seleção manual de frases;
- áudio de referência por TTS ou upload;
- player por frase;
- gravação do aluno;
- transcrição;
- comparação textual;
- feedback por palavra;
- novas tentativas;
- progresso;
- painel básico de acompanhamento.

## 10. Fora do MVP

- nota fonética precisa;
- avaliação de sotaque;
- avaliação de prosódia;
- conversação livre;
- gamificação avançada;
- recomendação automática por IA;
- correção gramatical de respostas abertas;
- funcionamento offline completo.

## 11. Privacidade e segurança

- solicitar consentimento para o microfone;
- informar quando a gravação iniciar e terminar;
- limitar duração e tamanho do áudio;
- validar MIME type e extensão;
- usar URLs assinadas para upload e reprodução;
- remover gravações após a transcrição, caso não exista necessidade pedagógica de armazená-las;
- definir política de retenção;
- impedir que alunos acessem arquivos de outros usuários;
- registrar erros e tentativas sem expor chaves de fornecedores no front-end.

## 12. Versionamento Git

Branch sugerida:

```bash
feature/livro-aluno-interativo
```

Início do dia:

```bash
git checkout master
git pull origin master
git checkout feature/livro-aluno-interativo
git merge master
```

Final do dia:

```bash
git add <arquivos-da-feature>
git commit -m "feat: progresso no livro interativo"
git checkout master
git pull origin master
git checkout feature/livro-aluno-interativo
git merge master
```

## 13. Validações pendentes

- versão e implementação usada pelo Bavuso no projeto de Nova York;
- provedor de TTS;
- existência de áudios humanos nos livros;
- qualidade e tipo dos PDFs;
- política de armazenamento das gravações;
- regra de similaridade do MVP;
- necessidade de avaliação fonética real;
- estrutura atual do banco e ORM;
- storage utilizado pela plataforma;
- suporte mobile obrigatório na primeira versão.

## 14. Referências técnicas

- OpenAI Audio API: https://platform.openai.com/docs/api-reference/audio
- OpenAI GPT-4o Transcribe: https://developers.openai.com/api/docs/models/gpt-4o-transcribe
- OpenAI Whisper: https://developers.openai.com/api/docs/models/whisper-1
- Azure Pronunciation Assessment: https://learn.microsoft.com/azure/ai-services/speech-service/how-to-pronunciation-assessment
