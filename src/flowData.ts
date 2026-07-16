import { MarkerType, type Edge, type Node } from '@xyflow/react';

export type FlowKind = 'start' | 'process' | 'decision' | 'end';
export type FlowTone = 'admin' | 'system' | 'student' | 'teacher' | 'audio';

export type FlowNodeData = {
  title: string;
  description?: string;
  kind: FlowKind;
  tone: FlowTone;
};

export type DiagramNode = Node<FlowNodeData, 'flowNode'>;
export type DiagramKey = 'overview' | 'admin' | 'student' | 'teacher';

export type Diagram = {
  title: string;
  subtitle: string;
  nodes: DiagramNode[];
  edges: Edge[];
};

const node = (
  id: string,
  x: number,
  y: number,
  title: string,
  description: string,
  kind: FlowKind = 'process',
  tone: FlowTone = 'system',
): DiagramNode => ({
  id,
  type: 'flowNode',
  position: { x, y },
  data: { title, description, kind, tone },
});

const edge = (
  id: string,
  source: string,
  target: string,
  label?: string,
  sourceHandle = 'bottom',
  targetHandle = 'top',
): Edge => ({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  label,
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
  style: { strokeWidth: 2, stroke: '#64748b' },
  labelStyle: { fill: '#334155', fontWeight: 800, fontSize: 12 },
  labelBgStyle: { fill: '#ffffff', fillOpacity: 0.96 },
  labelBgPadding: [7, 4],
  labelBgBorderRadius: 6,
});

const overviewDiagram: Diagram = {
  title: 'Visão geral do Livro Interativo',
  subtitle: 'Do PDF ao áudio de referência, prática de fala, transcrição e acompanhamento pedagógico.',
  nodes: [
    node('o-start', 400, 0, 'Início', 'Administrador acessa o painel.', 'start', 'admin'),
    node('o-book', 400, 140, 'Cadastrar livro', 'Título, idioma, nível, curso e público.', 'process', 'admin'),
    node('o-pdf', 400, 280, 'Enviar PDF', 'Arquivo original é validado e armazenado.', 'process', 'admin'),
    node('o-extract', 400, 420, 'Extrair e estruturar texto', 'Páginas, capítulos, frases e exercícios.', 'process', 'system'),
    node('o-review', 400, 560, 'Revisar conteúdo', 'Admin corrige texto e define frases praticáveis.', 'process', 'admin'),
    node('o-audio-source', 400, 710, 'Como gerar o áudio?', 'Escolher TTS ou áudio humano existente.', 'decision', 'audio'),
    node('o-tts', 160, 900, 'Gerar voz por TTS', 'Texto vira áudio de referência por frase.', 'process', 'audio'),
    node('o-upload-audio', 650, 900, 'Enviar áudio humano', 'Áudio é normalizado e associado ao trecho.', 'process', 'admin'),
    node('o-ready', 400, 1080, 'Conteúdo aprovado?', 'Testa texto, áudio e associação das frases.', 'decision', 'admin'),
    node('o-fix', 720, 1080, 'Corrigir conteúdo', 'Retorna à revisão ou regeneração do áudio.', 'process', 'admin'),
    node('o-publish', 400, 1270, 'Publicar livro', 'Liberação por aluno, turma ou curso.', 'process', 'admin'),
    node('o-open', 400, 1410, 'Aluno abre o livro', 'Retoma a página e o progresso anterior.', 'process', 'student'),
    node('o-listen', 400, 1550, 'Ouvir frase de referência', 'Aluno toca o áudio correto.', 'process', 'student'),
    node('o-practice', 400, 1700, 'Deseja praticar?', 'Pode continuar lendo ou gravar a própria voz.', 'decision', 'student'),
    node('o-continue', 720, 1700, 'Continuar leitura', 'Avança ou seleciona outra frase.', 'process', 'student'),
    node('o-record', 400, 1890, 'Gravar voz do aluno', 'Microfone captura uma tentativa curta.', 'process', 'student'),
    node('o-whisper', 400, 2030, 'Transcrever com Whisper', 'Áudio do aluno é convertido em texto.', 'process', 'audio'),
    node('o-compare', 400, 2170, 'Comparar com a frase', 'Normaliza texto e identifica diferenças.', 'process', 'system'),
    node('o-match', 400, 2320, 'Correspondência suficiente?', 'Avalia se a fala foi reconhecida como o texto esperado.', 'decision', 'system'),
    node('o-feedback', 720, 2320, 'Mostrar diferenças', 'Palavras ausentes, extras ou diferentes.', 'process', 'student'),
    node('o-success', 400, 2510, 'Marcar como praticada', 'Salva tentativa e progresso.', 'process', 'system'),
    node('o-dashboard', 700, 2510, 'Atualizar acompanhamento', 'Professor vê uso e dificuldades recorrentes.', 'process', 'teacher'),
    node('o-end', 400, 2670, 'Fim', 'Leitura e prática registradas.', 'end', 'student'),
  ],
  edges: [
    edge('oe1', 'o-start', 'o-book'),
    edge('oe2', 'o-book', 'o-pdf'),
    edge('oe3', 'o-pdf', 'o-extract'),
    edge('oe4', 'o-extract', 'o-review'),
    edge('oe5', 'o-review', 'o-audio-source'),
    edge('oe6', 'o-audio-source', 'o-tts', 'TTS', 'left', 'top'),
    edge('oe7', 'o-audio-source', 'o-upload-audio', 'Humano', 'right', 'top'),
    edge('oe8', 'o-tts', 'o-ready', undefined, 'bottom', 'left'),
    edge('oe9', 'o-upload-audio', 'o-ready', undefined, 'bottom', 'right'),
    edge('oe10', 'o-ready', 'o-publish', 'Sim'),
    edge('oe11', 'o-ready', 'o-fix', 'Não', 'right', 'left'),
    edge('oe12', 'o-fix', 'o-review', 'Revisar', 'left', 'right'),
    edge('oe13', 'o-publish', 'o-open'),
    edge('oe14', 'o-open', 'o-listen'),
    edge('oe15', 'o-listen', 'o-practice'),
    edge('oe16', 'o-practice', 'o-record', 'Sim'),
    edge('oe17', 'o-practice', 'o-continue', 'Não', 'right', 'left'),
    edge('oe18', 'o-continue', 'o-listen', 'Outra frase', 'left', 'right'),
    edge('oe19', 'o-record', 'o-whisper'),
    edge('oe20', 'o-whisper', 'o-compare'),
    edge('oe21', 'o-compare', 'o-match'),
    edge('oe22', 'o-match', 'o-success', 'Sim'),
    edge('oe23', 'o-match', 'o-feedback', 'Não', 'right', 'left'),
    edge('oe24', 'o-feedback', 'o-record', 'Tentar novamente', 'left', 'right'),
    edge('oe25', 'o-success', 'o-dashboard', 'Dados', 'right', 'left'),
    edge('oe26', 'o-success', 'o-end'),
  ],
};

const adminDiagram: Diagram = {
  title: 'Fluxo do administrador',
  subtitle: 'Cadastro, extração do PDF, geração de áudio, revisão e publicação.',
  nodes: [
    node('a-start', 400, 0, 'Início', 'Admin entra em Livros Interativos.', 'start', 'admin'),
    node('a-create', 400, 140, 'Criar livro', 'Define metadados, curso e nível.', 'process', 'admin'),
    node('a-pdf', 400, 280, 'Enviar PDF', 'Valida formato, tamanho e integridade.', 'process', 'admin'),
    node('a-digital', 400, 430, 'PDF possui texto?', 'Decide entre extração direta e OCR.', 'decision', 'system'),
    node('a-extract', 170, 620, 'Extrair texto', 'Lê texto e posição dos elementos.', 'process', 'system'),
    node('a-ocr', 650, 620, 'Executar OCR', 'Reconhece texto de páginas escaneadas.', 'process', 'system'),
    node('a-structure', 400, 800, 'Estruturar conteúdo', 'Capítulos, páginas, frases e exercícios.', 'process', 'system'),
    node('a-review', 400, 940, 'Revisar texto', 'Admin corrige e escolhe frases praticáveis.', 'process', 'admin'),
    node('a-source', 400, 1090, 'Fonte do áudio?', 'TTS ou gravação humana.', 'decision', 'audio'),
    node('a-tts', 170, 1280, 'Gerar áudio por TTS', 'Um arquivo por frase ou bloco curto.', 'process', 'audio'),
    node('a-human', 650, 1280, 'Enviar gravações', 'Normaliza e associa os arquivos.', 'process', 'admin'),
    node('a-preview', 400, 1460, 'Visualizar prévia', 'Testa página, texto, player e prática.', 'process', 'admin'),
    node('a-approved', 400, 1610, 'Tudo correto?', 'Revisão final do conteúdo.', 'decision', 'admin'),
    node('a-fix', 720, 1610, 'Editar e reprocessar', 'Corrige texto, áudio ou associação.', 'process', 'admin'),
    node('a-audience', 400, 1800, 'Definir público', 'Aluno, turma, curso ou acesso global.', 'process', 'admin'),
    node('a-publish', 400, 1940, 'Publicar', 'Disponibiliza o livro na biblioteca.', 'process', 'admin'),
    node('a-end', 400, 2080, 'Concluído', 'Livro pronto para leitura e prática.', 'end', 'admin'),
  ],
  edges: [
    edge('ae1', 'a-start', 'a-create'), edge('ae2', 'a-create', 'a-pdf'), edge('ae3', 'a-pdf', 'a-digital'),
    edge('ae4', 'a-digital', 'a-extract', 'Sim', 'left', 'top'), edge('ae5', 'a-digital', 'a-ocr', 'Não', 'right', 'top'),
    edge('ae6', 'a-extract', 'a-structure', undefined, 'bottom', 'left'), edge('ae7', 'a-ocr', 'a-structure', undefined, 'bottom', 'right'),
    edge('ae8', 'a-structure', 'a-review'), edge('ae9', 'a-review', 'a-source'),
    edge('ae10', 'a-source', 'a-tts', 'TTS', 'left', 'top'), edge('ae11', 'a-source', 'a-human', 'Humano', 'right', 'top'),
    edge('ae12', 'a-tts', 'a-preview', undefined, 'bottom', 'left'), edge('ae13', 'a-human', 'a-preview', undefined, 'bottom', 'right'),
    edge('ae14', 'a-preview', 'a-approved'), edge('ae15', 'a-approved', 'a-audience', 'Sim'),
    edge('ae16', 'a-approved', 'a-fix', 'Não', 'right', 'left'), edge('ae17', 'a-fix', 'a-review', 'Revisar', 'left', 'right'),
    edge('ae18', 'a-audience', 'a-publish'), edge('ae19', 'a-publish', 'a-end'),
  ],
};

const studentDiagram: Diagram = {
  title: 'Fluxo do aluno',
  subtitle: 'Leitura guiada, escuta, gravação, Whisper, comparação e progresso.',
  nodes: [
    node('s-start', 400, 0, 'Início', 'Aluno entra na plataforma.', 'start', 'student'),
    node('s-library', 400, 140, 'Abrir biblioteca', 'Lista livros liberados e progresso.', 'process', 'student'),
    node('s-book', 400, 280, 'Selecionar livro', 'Abre na última página ou no início.', 'process', 'student'),
    node('s-phrase', 400, 420, 'Selecionar frase', 'Trecho interativo fica destacado.', 'process', 'student'),
    node('s-listen', 400, 560, 'Ouvir referência', 'Reproduz pronúncia correta.', 'process', 'audio'),
    node('s-practice', 400, 710, 'Praticar agora?', 'Aluno escolhe entre gravar ou seguir lendo.', 'decision', 'student'),
    node('s-next', 720, 710, 'Continuar leitura', 'Navega para outra frase ou página.', 'process', 'student'),
    node('s-mic', 400, 900, 'Microfone permitido?', 'Solicita permissão no navegador.', 'decision', 'system'),
    node('s-help', 720, 900, 'Orientar permissão', 'Mostra como habilitar e permite continuar.', 'process', 'student'),
    node('s-record', 400, 1090, 'Gravar tentativa', 'Captura a fala do aluno.', 'process', 'student'),
    node('s-process', 400, 1230, 'Preparar áudio', 'Normaliza formato, volume e duração.', 'process', 'system'),
    node('s-whisper', 400, 1370, 'Whisper transcreve', 'Voz vira texto reconhecido.', 'process', 'audio'),
    node('s-compare', 400, 1510, 'Comparar textos', 'Ignora caixa, pontuação e pequenas variações.', 'process', 'system'),
    node('s-match', 400, 1660, 'Atingiu o limite?', 'Compara palavras reconhecidas com a frase.', 'decision', 'system'),
    node('s-feedback', 720, 1660, 'Exibir feedback', 'Mostra diferenças sem afirmar nota fonética.', 'process', 'student'),
    node('s-retry', 720, 1810, 'Tentar novamente?', 'Aluno decide repetir ou seguir.', 'decision', 'student'),
    node('s-success', 400, 1850, 'Registrar prática', 'Salva tentativa bem-sucedida e progresso.', 'process', 'system'),
    node('s-save', 400, 1990, 'Salvar progresso', 'Página, frase, tentativas e último acesso.', 'process', 'system'),
    node('s-end', 400, 2130, 'Fim', 'Aluno continua quando desejar.', 'end', 'student'),
  ],
  edges: [
    edge('se1', 's-start', 's-library'), edge('se2', 's-library', 's-book'), edge('se3', 's-book', 's-phrase'), edge('se4', 's-phrase', 's-listen'),
    edge('se5', 's-listen', 's-practice'), edge('se6', 's-practice', 's-mic', 'Sim'), edge('se7', 's-practice', 's-next', 'Não', 'right', 'left'),
    edge('se8', 's-next', 's-phrase', 'Outra frase', 'left', 'right'), edge('se9', 's-mic', 's-record', 'Sim'),
    edge('se10', 's-mic', 's-help', 'Não', 'right', 'left'), edge('se11', 's-help', 's-next', 'Continuar', 'left', 'right'),
    edge('se12', 's-record', 's-process'), edge('se13', 's-process', 's-whisper'), edge('se14', 's-whisper', 's-compare'), edge('se15', 's-compare', 's-match'),
    edge('se16', 's-match', 's-success', 'Sim'), edge('se17', 's-match', 's-feedback', 'Não', 'right', 'left'),
    edge('se18', 's-feedback', 's-retry'), edge('se19', 's-retry', 's-record', 'Sim', 'left', 'right'), edge('se20', 's-retry', 's-save', 'Não', 'left', 'right'),
    edge('se21', 's-success', 's-save'), edge('se22', 's-save', 's-end'),
  ],
};

const teacherDiagram: Diagram = {
  title: 'Fluxo do professor e coordenação',
  subtitle: 'Acompanhamento de leitura, escuta e prática sem transformar Whisper em nota de pronúncia.',
  nodes: [
    node('t-start', 400, 0, 'Início', 'Professor acessa o painel.', 'start', 'teacher'),
    node('t-filter', 400, 140, 'Selecionar filtros', 'Curso, turma, livro, aluno e período.', 'process', 'teacher'),
    node('t-data', 400, 290, 'Existem dados?', 'Consulta leitura e tentativas de prática.', 'decision', 'system'),
    node('t-empty', 720, 290, 'Sem registros', 'Troca filtros ou aguarda novas interações.', 'process', 'teacher'),
    node('t-overview', 400, 480, 'Ver visão geral', 'Progresso, páginas lidas e frases praticadas.', 'process', 'teacher'),
    node('t-difficulty', 400, 620, 'Identificar dificuldades', 'Frases com mais tentativas ou baixa correspondência.', 'process', 'teacher'),
    node('t-detail', 400, 760, 'Abrir aluno ou frase', 'Consulta histórico e texto reconhecido.', 'process', 'teacher'),
    node('t-action', 400, 910, 'Deseja intervir?', 'Pode recomendar revisão ou nova prática.', 'decision', 'teacher'),
    node('t-assign', 720, 910, 'Recomendar atividade', 'Direciona o aluno para frases específicas.', 'process', 'teacher'),
    node('t-export', 400, 1100, 'Exportar relatório?', 'Geração opcional de dados consolidados.', 'decision', 'teacher'),
    node('t-report', 720, 1100, 'Gerar relatório', 'Exporta resultados filtrados.', 'process', 'teacher'),
    node('t-end', 400, 1290, 'Fim', 'Acompanhamento concluído.', 'end', 'teacher'),
  ],
  edges: [
    edge('te1', 't-start', 't-filter'), edge('te2', 't-filter', 't-data'), edge('te3', 't-data', 't-overview', 'Sim'),
    edge('te4', 't-data', 't-empty', 'Não', 'right', 'left'), edge('te5', 't-empty', 't-filter', 'Trocar filtros', 'left', 'right'),
    edge('te6', 't-overview', 't-difficulty'), edge('te7', 't-difficulty', 't-detail'), edge('te8', 't-detail', 't-action'),
    edge('te9', 't-action', 't-export', 'Não'), edge('te10', 't-action', 't-assign', 'Sim', 'right', 'left'),
    edge('te11', 't-assign', 't-export', undefined, 'left', 'right'), edge('te12', 't-export', 't-end', 'Não'),
    edge('te13', 't-export', 't-report', 'Sim', 'right', 'left'), edge('te14', 't-report', 't-end', undefined, 'left', 'right'),
  ],
};

export const diagrams: Record<DiagramKey, Diagram> = {
  overview: overviewDiagram,
  admin: adminDiagram,
  student: studentDiagram,
  teacher: teacherDiagram,
};

export const diagramTabs: Array<{ key: DiagramKey; label: string; description: string }> = [
  { key: 'overview', label: 'Visão geral', description: 'Fluxo completo' },
  { key: 'admin', label: 'Administrador', description: 'Criação e publicação' },
  { key: 'student', label: 'Aluno', description: 'Escuta e prática' },
  { key: 'teacher', label: 'Professor', description: 'Acompanhamento' },
];
