import { useMemo, useState } from 'react';
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Node,
  NodeProps,
  Position,
  ReactFlow,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type FlowKind = 'start' | 'process' | 'decision' | 'end';
type FlowTone = 'admin' | 'system' | 'student' | 'teacher';

type FlowNodeData = {
  title: string;
  description?: string;
  kind: FlowKind;
  tone: FlowTone;
};

type DiagramNode = Node<FlowNodeData, 'flowNode'>;
type DiagramKey = 'overview' | 'admin' | 'student' | 'teacher';

type Diagram = {
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
  labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95 },
  labelBgPadding: [7, 4],
  labelBgBorderRadius: 6,
});

const overviewDiagram: Diagram = {
  title: 'Visão geral do Livro Interativo',
  subtitle: 'Fluxo completo entre administrador, processamento interno, aluno e acompanhamento pedagógico.',
  nodes: [
    node('o-start', 390, 10, 'Início', 'Administrador acessa o painel.', 'start', 'admin'),
    node('o-create', 390, 140, 'Cadastrar livro', 'Título, idioma, nível, curso e público.', 'process', 'admin'),
    node('o-upload', 390, 280, 'Enviar PDF e áudios', 'Arquivos são validados e enviados ao storage.', 'process', 'admin'),
    node('o-process', 390, 420, 'Processar conteúdo', 'PDF vira páginas e o Whisper transcreve os áudios.', 'process', 'system'),
    node('o-ok', 390, 570, 'Processamento concluído?', 'Valida páginas, textos, áudios e timestamps.', 'decision', 'system'),
    node('o-error', 720, 570, 'Corrigir e reprocessar', 'Exibe o erro e permite substituir arquivos.', 'process', 'admin'),
    node('o-map', 390, 760, 'Mapear interações', 'Admin liga frases e regiões aos áudios.', 'process', 'admin'),
    node('o-approved', 390, 910, 'Livro aprovado?', 'Revisão visual e teste de todos os trechos.', 'decision', 'admin'),
    node('o-review', 720, 910, 'Revisar conteúdo', 'Corrige áreas, áudio, texto ou configuração.', 'process', 'admin'),
    node('o-publish', 390, 1100, 'Publicar livro', 'Liberação por aluno, turma, curso ou geral.', 'process', 'admin'),
    node('o-library', 390, 1240, 'Aluno acessa a biblioteca', 'Visualiza somente os livros liberados.', 'process', 'student'),
    node('o-interact', 390, 1380, 'Ler e interagir', 'Navega, toca frases e ouve os áudios.', 'process', 'student'),
    node('o-progress', 390, 1520, 'Salvar progresso', 'Página atual, percentual e interações.', 'process', 'system'),
    node('o-report', 720, 1520, 'Acompanhar resultados', 'Professor consulta progresso e engajamento.', 'process', 'teacher'),
    node('o-end', 390, 1680, 'Fim', 'Livro disponível e acompanhado.', 'end', 'student'),
  ],
  edges: [
    edge('oe1', 'o-start', 'o-create'),
    edge('oe2', 'o-create', 'o-upload'),
    edge('oe3', 'o-upload', 'o-process'),
    edge('oe4', 'o-process', 'o-ok'),
    edge('oe5', 'o-ok', 'o-map', 'Sim'),
    edge('oe6', 'o-ok', 'o-error', 'Não', 'right', 'left'),
    edge('oe7', 'o-error', 'o-upload', 'Reenviar', 'left', 'right'),
    edge('oe8', 'o-map', 'o-approved'),
    edge('oe9', 'o-approved', 'o-publish', 'Sim'),
    edge('oe10', 'o-approved', 'o-review', 'Não', 'right', 'left'),
    edge('oe11', 'o-review', 'o-map', 'Corrigir', 'left', 'right'),
    edge('oe12', 'o-publish', 'o-library'),
    edge('oe13', 'o-library', 'o-interact'),
    edge('oe14', 'o-interact', 'o-progress'),
    edge('oe15', 'o-progress', 'o-report', 'Dados', 'right', 'left'),
    edge('oe16', 'o-progress', 'o-end'),
  ],
};

const adminDiagram: Diagram = {
  title: 'Fluxo do administrador',
  subtitle: 'Do cadastro inicial até a publicação do livro para os alunos.',
  nodes: [
    node('a-start', 380, 10, 'Início', 'Admin entra em Livros Interativos.', 'start', 'admin'),
    node('a-create', 380, 140, 'Criar novo livro', 'Informa título, idioma, nível, curso e descrição.', 'process', 'admin'),
    node('a-valid', 380, 290, 'Dados válidos?', 'Verifica campos obrigatórios e permissões.', 'decision', 'admin'),
    node('a-fix', 700, 290, 'Corrigir cadastro', 'Destaca os campos inválidos.', 'process', 'admin'),
    node('a-pdf', 380, 480, 'Enviar PDF', 'Valida formato, tamanho e integridade.', 'process', 'admin'),
    node('a-pdfvalid', 380, 630, 'PDF aceito?', 'O arquivo pode ser processado?', 'decision', 'system'),
    node('a-replace', 700, 630, 'Substituir arquivo', 'Admin envia outro PDF.', 'process', 'admin'),
    node('a-processpdf', 380, 820, 'Gerar páginas', 'Worker converte páginas e cria previews.', 'process', 'system'),
    node('a-audio', 380, 960, 'Enviar áudios', 'Áudio por frase, página, diálogo ou capítulo.', 'process', 'admin'),
    node('a-whisper', 380, 1100, 'Transcrever áudio', 'Whisper retorna texto e timestamps.', 'process', 'system'),
    node('a-map', 380, 1240, 'Mapear áreas interativas', 'Liga trechos da página aos segmentos de áudio.', 'process', 'admin'),
    node('a-preview', 380, 1380, 'Visualizar prévia', 'Testa navegação, hover, toque e reprodução.', 'process', 'admin'),
    node('a-approved', 380, 1530, 'Tudo correto?', 'Revisão final antes da publicação.', 'decision', 'admin'),
    node('a-review', 700, 1530, 'Editar conteúdo', 'Retorna ao mapeamento e corrige.', 'process', 'admin'),
    node('a-assign', 380, 1720, 'Definir público', 'Aluno, turma, curso ou acesso global.', 'process', 'admin'),
    node('a-publish', 380, 1860, 'Publicar', 'O livro fica disponível na biblioteca.', 'process', 'admin'),
    node('a-end', 380, 2000, 'Concluído', 'Livro publicado com sucesso.', 'end', 'admin'),
  ],
  edges: [
    edge('ae1', 'a-start', 'a-create'),
    edge('ae2', 'a-create', 'a-valid'),
    edge('ae3', 'a-valid', 'a-pdf', 'Sim'),
    edge('ae4', 'a-valid', 'a-fix', 'Não', 'right', 'left'),
    edge('ae5', 'a-fix', 'a-create', 'Corrigir', 'left', 'right'),
    edge('ae6', 'a-pdf', 'a-pdfvalid'),
    edge('ae7', 'a-pdfvalid', 'a-processpdf', 'Sim'),
    edge('ae8', 'a-pdfvalid', 'a-replace', 'Não', 'right', 'left'),
    edge('ae9', 'a-replace', 'a-pdf', 'Reenviar', 'left', 'right'),
    edge('ae10', 'a-processpdf', 'a-audio'),
    edge('ae11', 'a-audio', 'a-whisper'),
    edge('ae12', 'a-whisper', 'a-map'),
    edge('ae13', 'a-map', 'a-preview'),
    edge('ae14', 'a-preview', 'a-approved'),
    edge('ae15', 'a-approved', 'a-assign', 'Sim'),
    edge('ae16', 'a-approved', 'a-review', 'Não', 'right', 'left'),
    edge('ae17', 'a-review', 'a-map', 'Revisar', 'left', 'right'),
    edge('ae18', 'a-assign', 'a-publish'),
    edge('ae19', 'a-publish', 'a-end'),
  ],
};

const studentDiagram: Diagram = {
  title: 'Fluxo do aluno',
  subtitle: 'Acesso ao livro, interação com frases, reprodução de áudio e progresso automático.',
  nodes: [
    node('s-start', 380, 10, 'Início', 'Aluno entra na plataforma.', 'start', 'student'),
    node('s-login', 380, 140, 'Autenticar', 'Sistema identifica aluno, curso e turma.', 'process', 'student'),
    node('s-access', 380, 290, 'Possui livros liberados?', 'Consulta as regras de acesso.', 'decision', 'system'),
    node('s-empty', 700, 290, 'Biblioteca vazia', 'Exibe mensagem de que não há livros.', 'end', 'student'),
    node('s-library', 380, 480, 'Abrir biblioteca', 'Lista livros disponíveis e progresso.', 'process', 'student'),
    node('s-book', 380, 620, 'Selecionar livro', 'Aluno escolhe o conteúdo desejado.', 'process', 'student'),
    node('s-progress', 380, 770, 'Existe progresso salvo?', 'Verifica a última página acessada.', 'decision', 'system'),
    node('s-resume', 700, 770, 'Retomar leitura', 'Abre na última página visualizada.', 'process', 'student'),
    node('s-first', 380, 960, 'Abrir primeira página', 'Carrega o início do livro.', 'process', 'student'),
    node('s-page', 380, 1100, 'Visualizar página', 'Renderiza imagem, texto e áreas interativas.', 'process', 'student'),
    node('s-interactive', 380, 1250, 'Trecho interativo?', 'Detecta clique, toque ou hover.', 'decision', 'student'),
    node('s-next', 700, 1250, 'Navegar pela página', 'Aluno pode avançar ou voltar.', 'process', 'student'),
    node('s-play', 380, 1440, 'Reproduzir áudio', 'Toca o arquivo ou intervalo por timestamp.', 'process', 'student'),
    node('s-save', 380, 1580, 'Salvar interação', 'Registra página, trecho e último acesso.', 'process', 'system'),
    node('s-last', 380, 1730, 'Última página?', 'Verifica se o livro foi concluído.', 'decision', 'system'),
    node('s-continue', 700, 1730, 'Próxima página', 'Atualiza a navegação e continua.', 'process', 'student'),
    node('s-complete', 380, 1920, 'Marcar como concluído', 'Salva 100% e data de conclusão.', 'process', 'system'),
    node('s-end', 380, 2060, 'Fim', 'Aluno concluiu o livro.', 'end', 'student'),
  ],
  edges: [
    edge('se1', 's-start', 's-login'),
    edge('se2', 's-login', 's-access'),
    edge('se3', 's-access', 's-library', 'Sim'),
    edge('se4', 's-access', 's-empty', 'Não', 'right', 'left'),
    edge('se5', 's-library', 's-book'),
    edge('se6', 's-book', 's-progress'),
    edge('se7', 's-progress', 's-first', 'Não'),
    edge('se8', 's-progress', 's-resume', 'Sim', 'right', 'left'),
    edge('se9', 's-resume', 's-page', undefined, 'left', 'right'),
    edge('se10', 's-first', 's-page'),
    edge('se11', 's-page', 's-interactive'),
    edge('se12', 's-interactive', 's-play', 'Sim'),
    edge('se13', 's-interactive', 's-next', 'Não', 'right', 'left'),
    edge('se14', 's-next', 's-page', 'Continuar', 'left', 'right'),
    edge('se15', 's-play', 's-save'),
    edge('se16', 's-save', 's-last'),
    edge('se17', 's-last', 's-complete', 'Sim'),
    edge('se18', 's-last', 's-continue', 'Não', 'right', 'left'),
    edge('se19', 's-continue', 's-page', undefined, 'left', 'right'),
    edge('se20', 's-complete', 's-end'),
  ],
};

const teacherDiagram: Diagram = {
  title: 'Fluxo do professor e coordenação',
  subtitle: 'Consulta de acesso, progresso e utilização dos recursos interativos.',
  nodes: [
    node('t-start', 380, 10, 'Início', 'Professor entra na plataforma.', 'start', 'teacher'),
    node('t-login', 380, 140, 'Autenticar', 'Sistema verifica o perfil e permissões.', 'process', 'teacher'),
    node('t-authorized', 380, 290, 'Possui permissão?', 'Valida acesso à turma ou ao curso.', 'decision', 'system'),
    node('t-denied', 700, 290, 'Acesso negado', 'Exibe mensagem e encerra o fluxo.', 'end', 'teacher'),
    node('t-dashboard', 380, 480, 'Abrir acompanhamento', 'Painel apresenta livros e turmas.', 'process', 'teacher'),
    node('t-filter', 380, 620, 'Selecionar filtros', 'Curso, turma, livro, aluno e período.', 'process', 'teacher'),
    node('t-data', 380, 770, 'Existem dados?', 'Verifica acessos e progressos registrados.', 'decision', 'system'),
    node('t-empty', 700, 770, 'Sem registros', 'Exibe estado vazio e permite trocar filtros.', 'process', 'teacher'),
    node('t-metrics', 380, 960, 'Visualizar métricas', 'Percentual, página atual e último acesso.', 'process', 'teacher'),
    node('t-detail', 380, 1100, 'Abrir detalhes do aluno', 'Mostra interações e áudios reproduzidos.', 'process', 'teacher'),
    node('t-export', 380, 1250, 'Deseja exportar?', 'Relatório opcional para acompanhamento.', 'decision', 'teacher'),
    node('t-report', 700, 1250, 'Gerar relatório', 'Exporta os dados filtrados.', 'process', 'teacher'),
    node('t-end', 380, 1440, 'Fim', 'Consulta finalizada.', 'end', 'teacher'),
  ],
  edges: [
    edge('te1', 't-start', 't-login'),
    edge('te2', 't-login', 't-authorized'),
    edge('te3', 't-authorized', 't-dashboard', 'Sim'),
    edge('te4', 't-authorized', 't-denied', 'Não', 'right', 'left'),
    edge('te5', 't-dashboard', 't-filter'),
    edge('te6', 't-filter', 't-data'),
    edge('te7', 't-data', 't-metrics', 'Sim'),
    edge('te8', 't-data', 't-empty', 'Não', 'right', 'left'),
    edge('te9', 't-empty', 't-filter', 'Trocar filtros', 'left', 'right'),
    edge('te10', 't-metrics', 't-detail'),
    edge('te11', 't-detail', 't-export'),
    edge('te12', 't-export', 't-end', 'Não'),
    edge('te13', 't-export', 't-report', 'Sim', 'right', 'left'),
    edge('te14', 't-report', 't-end', undefined, 'left', 'right'),
  ],
};

const diagrams: Record<DiagramKey, Diagram> = {
  overview: overviewDiagram,
  admin: adminDiagram,
  student: studentDiagram,
  teacher: teacherDiagram,
};

const tabs: Array<{ key: DiagramKey; label: string; description: string }> = [
  { key: 'overview', label: 'Visão geral', description: 'Fluxo integrado' },
  { key: 'admin', label: 'Administrador', description: 'Cadastro e publicação' },
  { key: 'student', label: 'Aluno', description: 'Leitura e interação' },
  { key: 'teacher', label: 'Professor', description: 'Acompanhamento' },
];

function FlowNode({ data }: NodeProps<DiagramNode>) {
  const isDecision = data.kind === 'decision';

  return (
    <div className={`flow-node flow-node--${data.kind} flow-node--${data.tone}`}>
      <Handle type="target" position={Position.Top} id="top" className="flow-handle" />
      <Handle type="target" position={Position.Left} id="left" className="flow-handle" />

      {isDecision ? (
        <div className="decision-shape">
          <div className="decision-content">
            <strong>{data.title}</strong>
            <span>{data.description}</span>
          </div>
        </div>
      ) : (
        <div className="node-content">
          <strong>{data.title}</strong>
          <span>{data.description}</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} id="bottom" className="flow-handle" />
      <Handle type="source" position={Position.Right} id="right" className="flow-handle" />
    </div>
  );
}

function App() {
  const [activeDiagram, setActiveDiagram] = useState<DiagramKey>('overview');
  const current = diagrams[activeDiagram];
  const nodeTypes = useMemo(() => ({ flowNode: FlowNode }), []);

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <span className="eyebrow">Livro do Aluno Interativo</span>
          <h1>Fluxograma funcional por usuário</h1>
          <p>
            Visualização das decisões, etapas e retornos existentes nos fluxos do administrador,
            aluno, professor e processamento interno do sistema.
          </p>
        </div>
        <div className="header-badge">React + TypeScript</div>
      </header>

      <section className="diagram-section">
        <div className="diagram-tabs" role="tablist" aria-label="Selecionar fluxograma">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={activeDiagram === tab.key ? 'diagram-tab is-active' : 'diagram-tab'}
              onClick={() => setActiveDiagram(tab.key)}
            >
              <strong>{tab.label}</strong>
              <span>{tab.description}</span>
            </button>
          ))}
        </div>

        <div className="diagram-card">
          <div className="diagram-card__header">
            <div>
              <span>Fluxograma selecionado</span>
              <h2>{current.title}</h2>
              <p>{current.subtitle}</p>
            </div>
            <div className="diagram-help">Arraste, use o zoom ou clique nos controles</div>
          </div>

          <div className="diagram-canvas">
            <ReactFlow
              key={activeDiagram}
              nodes={current.nodes}
              edges={current.edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.12, maxZoom: 0.78 }}
              minZoom={0.22}
              maxZoom={1.4}
              nodesConnectable={false}
              elementsSelectable
              proOptions={{ hideAttribution: true }}
            >
              <Background gap={24} size={1.2} color="#d8e1ed" />
              <MiniMap
                pannable
                zoomable
                nodeColor={(diagramNode) => {
                  const tone = (diagramNode.data as FlowNodeData).tone;
                  if (tone === 'admin') return '#7c3aed';
                  if (tone === 'student') return '#059669';
                  if (tone === 'teacher') return '#ea580c';
                  return '#0284c7';
                }}
              />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>
      </section>

      <section className="legend-section">
        <div className="legend-card">
          <h2>Legenda</h2>
          <div className="legend-grid">
            <div><span className="legend-shape legend-shape--pill" />Início ou fim</div>
            <div><span className="legend-shape legend-shape--square" />Processo ou ação</div>
            <div><span className="legend-shape legend-shape--diamond" />Decisão</div>
            <div><span className="legend-line" />Direção do fluxo</div>
          </div>
        </div>

        <div className="legend-card">
          <h2>Perfis e responsabilidades</h2>
          <div className="tone-grid">
            <span className="tone tone--admin">Administrador</span>
            <span className="tone tone--system">Sistema</span>
            <span className="tone tone--student">Aluno</span>
            <span className="tone tone--teacher">Professor</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
