export const technologies = [
  {
    layer: 'Front-end',
    items: ['React', 'TypeScript', 'React Router', '@xyflow/react', 'TanStack Query', 'React Hook Form', 'Zod'],
    purpose: 'Interface do aluno, painel administrativo, formulários, navegação e fluxogramas.',
  },
  {
    layer: 'Livro e PDF',
    items: ['PDF.js / pdfjs-dist', 'react-pdf', 'OCR opcional'],
    purpose: 'Renderização do livro, extração de texto e tratamento de PDFs escaneados.',
  },
  {
    layer: 'Áudio no navegador',
    items: ['HTMLAudioElement', 'MediaRecorder API', 'getUserMedia', 'Web Audio API'],
    purpose: 'Reprodução da referência e captura da tentativa do aluno.',
  },
  {
    layer: 'Back-end',
    items: ['Node.js', 'TypeScript', 'Express ou Fastify', 'Zod'],
    purpose: 'API, regras de acesso, processamento e integração com os provedores de áudio.',
  },
  {
    layer: 'Banco de dados',
    items: ['MySQL 8', 'Prisma ou ORM atual', 'Migrations'],
    purpose: 'Livros, páginas, frases, áudios, tentativas, transcrições e progresso.',
  },
  {
    layer: 'Processamento',
    items: ['BullMQ', 'Redis', 'FFmpeg', 'Sharp'],
    purpose: 'Filas, normalização de áudio, conversões e tarefas pesadas fora da requisição HTTP.',
  },
  {
    layer: 'Inteligência de áudio',
    items: ['TTS', 'Whisper / Speech-to-Text', 'Comparação textual'],
    purpose: 'Gerar voz de referência, transcrever a fala do aluno e comparar com a frase esperada.',
  },
  {
    layer: 'Arquivos e infraestrutura',
    items: ['Cloudflare R2 ou S3', 'Docker', 'Jenkins', 'Git'],
    purpose: 'Armazenamento, deploy, versionamento e operação do sistema.',
  },
];

export const mvpScope = [
  'Admin cadastra livro e envia PDF.',
  'Sistema extrai ou recebe o texto das frases.',
  'Admin revisa e seleciona frases interativas.',
  'Áudio de referência é enviado ou gerado por TTS.',
  'Aluno ouve a frase e grava uma tentativa.',
  'Whisper transcreve a voz do aluno.',
  'Sistema compara a transcrição com a frase original.',
  'Feedback mostra palavras correspondentes, ausentes e diferentes.',
  'Progresso e tentativas são registrados.',
];

export const laterScope = [
  'Avaliação fonética especializada com pontuação de pronúncia.',
  'Feedback por fonema, fluência, entonação e prosódia.',
  'Modo de conversação livre com IA.',
  'Gamificação, sequência diária e conquistas.',
  'Recomendação automática de frases com maior dificuldade.',
  'Relatórios pedagógicos avançados e comparativos por turma.',
];

export const databaseTables = [
  ['student_books', 'Metadados, status, idioma, nível e publicação.'],
  ['student_book_files', 'PDF original, imagens, thumbnails e arquivos armazenados.'],
  ['student_book_pages', 'Páginas renderizadas, dimensões e texto extraído.'],
  ['student_book_segments', 'Frases, blocos e posições interativas na página.'],
  ['student_book_segment_audios', 'Áudio de referência, origem TTS/humana e duração.'],
  ['student_book_assignments', 'Liberação por aluno, turma, curso ou acesso geral.'],
  ['student_book_progress', 'Página atual, percentual e último acesso.'],
  ['student_practice_attempts', 'Tentativas, status, similaridade e data.'],
  ['student_recordings', 'Arquivo temporário ou persistido da gravação.'],
  ['student_transcriptions', 'Texto retornado pelo Whisper e metadados do modelo.'],
  ['student_practice_word_results', 'Diferenças por palavra: correta, ausente, inserida ou diferente.'],
  ['student_book_processing_jobs', 'Jobs de PDF, OCR, TTS, áudio e transcrição.'],
];

export const meetingQuestions = [
  'O objetivo é apenas verificar se a frase foi reconhecida ou dar uma nota real de pronúncia?',
  'Os livros já possuem áudios humanos ou o sistema deverá gerar tudo por TTS?',
  'O PDF contém texto selecionável ou existem livros escaneados que exigirão OCR?',
  'Qual modelo/implementação foi usado pelo Bavuso no projeto de Nova York?',
  'As gravações dos alunos serão apagadas após a transcrição ou armazenadas?',
  'Qual limite de tentativas e qual regra definirá uma correspondência suficiente?',
  'O professor verá o áudio gravado ou somente métricas e transcrições?',
  'O MVP precisa funcionar em celular desde a primeira entrega?',
];

export const meetingPitch = [
  {
    title: 'Problema',
    text: 'O livro atual é passivo. O aluno lê, mas não possui um ciclo integrado de escuta, repetição e feedback.',
  },
  {
    title: 'Proposta',
    text: 'Transformar cada frase relevante em uma unidade interativa: ouvir, gravar, transcrever, comparar e tentar novamente.',
  },
  {
    title: 'Papel do Whisper',
    text: 'Converter a voz do aluno em texto para verificar inteligibilidade e correspondência com a frase original.',
  },
  {
    title: 'Limite técnico',
    text: 'Whisper não deve ser apresentado como avaliador fonético. Nota real de pronúncia exige serviço especializado.',
  },
  {
    title: 'Entrega segura',
    text: 'Começar com um MVP semiautomático, validável e com provedores de áudio desacoplados para evolução futura.',
  },
];
