import { useMemo, useState } from 'react';
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './revision.css';
import {
  diagramTabs,
  diagrams,
  type DiagramKey,
  type DiagramNode,
  type FlowNodeData,
} from './flowData';
import {
  databaseTables,
  laterScope,
  meetingPitch,
  meetingQuestions,
  mvpScope,
  technologies,
} from './projectData';

const processSteps = [
  ['01', 'PDF', 'Upload e validação'],
  ['02', 'Texto', 'Extração e revisão'],
  ['03', 'TTS', 'Áudio de referência'],
  ['04', 'Prática', 'Gravação do aluno'],
  ['05', 'Whisper', 'Fala convertida em texto'],
  ['06', 'Feedback', 'Comparação e progresso'],
];

function FlowNode({ data }: NodeProps<DiagramNode>) {
  const decision = data.kind === 'decision';

  return (
    <div className={`li-node li-node--${data.kind} li-node--${data.tone}`}>
      <Handle type="target" position={Position.Top} id="top" className="li-handle" />
      <Handle type="target" position={Position.Left} id="left" className="li-handle" />

      {decision ? (
        <div className="li-decision-shape">
          <div className="li-decision-content">
            <strong>{data.title}</strong>
            <span>{data.description}</span>
          </div>
        </div>
      ) : (
        <div className="li-node-content">
          <strong>{data.title}</strong>
          <span>{data.description}</span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} id="bottom" className="li-handle" />
      <Handle type="source" position={Position.Right} id="right" className="li-handle" />
    </div>
  );
}

function App() {
  const [activeDiagram, setActiveDiagram] = useState<DiagramKey>('overview');
  const current = diagrams[activeDiagram];
  const nodeTypes = useMemo(() => ({ flowNode: FlowNode }), []);

  return (
    <main className="li-page">
      <header className="li-hero" id="inicio">
        <nav className="li-nav">
          <a href="#inicio" className="li-brand">
            <span className="li-brand-mark">L</span>
            <span>
              Livro Interativo
              <small>Discovery técnico</small>
            </span>
          </a>
          <div className="li-nav-links">
            <a href="#fluxograma">Fluxograma</a>
            <a href="#tecnologias">Tecnologias</a>
            <a href="#banco">Banco</a>
            <a href="#reuniao">Reunião</a>
          </div>
        </nav>

        <div className="li-hero-grid">
          <div className="li-hero-copy">
            <span className="li-kicker"><i /> Proposta revisada para o MVP</span>
            <h1>Do PDF à prática oral, dentro do mesmo livro.</h1>
            <p>
              O aluno lê, escuta a pronúncia de referência, grava a própria voz e recebe
              um feedback imediato com base na transcrição feita pelo Whisper.
            </p>

            <div className="li-hero-actions">
              <a href="#fluxograma" className="li-button li-button--primary">Explorar fluxos</a>
              <a href="#reuniao" className="li-button li-button--ghost">Ver roteiro da reunião</a>
            </div>

            <div className="li-hero-metrics">
              <div><strong>4</strong><span>fluxos por perfil</span></div>
              <div><strong>11</strong><span>tabelas propostas</span></div>
              <div><strong>MVP</strong><span>entrega até o fim do mês</span></div>
            </div>
          </div>

          <div className="li-product-preview" aria-label="Exemplo da experiência do aluno">
            <div className="li-preview-topbar">
              <div className="li-window-dots"><span /><span /><span /></div>
              <span>Experiência do aluno</span>
              <span className="li-live-badge">Interativo</span>
            </div>

            <div className="li-preview-book">
              <div className="li-page-number">Unit 03 · Conversation</div>
              <span className="li-preview-label">Frase selecionada</span>
              <blockquote>“How are you feeling today?”</blockquote>

              <div className="li-waveform" aria-hidden="true">
                {[18, 34, 52, 30, 66, 44, 74, 38, 58, 26, 48, 70, 36, 54, 24, 42, 62, 32].map((height, index) => (
                  <span key={`${height}-${index}`} style={{ height }} />
                ))}
              </div>

              <div className="li-preview-actions">
                <button type="button" className="li-audio-button"><span>▶</span> Ouvir referência</button>
                <button type="button" className="li-practice-button"><span>●</span> Praticar frase</button>
              </div>
            </div>

            <div className="li-preview-result">
              <div className="li-result-icon">✓</div>
              <div>
                <span>Whisper reconheceu</span>
                <strong>How are you feeling today?</strong>
              </div>
              <b>100%</b>
            </div>
          </div>
        </div>
      </header>

      <section className="li-process-strip" aria-label="Etapas principais do produto">
        {processSteps.map(([number, title, description], index) => (
          <article key={number}>
            <span>{number}</span>
            <div><strong>{title}</strong><small>{description}</small></div>
            {index < processSteps.length - 1 && <i>→</i>}
          </article>
        ))}
      </section>

      <section className="li-section li-section--flow" id="fluxograma">
        <div className="li-section-intro">
          <div className="li-section-heading">
            <span>Fluxograma funcional</span>
            <h2>Um fluxo claro para cada responsabilidade.</h2>
            <p>Apresente o ciclo completo ou abra cada perfil separadamente durante a reunião.</p>
          </div>
          <div className="li-section-stat">
            <strong>{current.nodes.length}</strong>
            <span>etapas no fluxo selecionado</span>
          </div>
        </div>

        <div className="li-tabs" role="tablist" aria-label="Selecionar fluxograma">
          {diagramTabs.map((tab, index) => (
            <button
              key={tab.key}
              type="button"
              className={activeDiagram === tab.key ? 'li-tab is-active' : 'li-tab'}
              onClick={() => setActiveDiagram(tab.key)}
            >
              <span className="li-tab-number">0{index + 1}</span>
              <span className="li-tab-copy">
                <strong>{tab.label}</strong>
                <small>{tab.description}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="li-diagram-card">
          <div className="li-diagram-header">
            <div>
              <span>Fluxograma selecionado</span>
              <h3>{current.title}</h3>
              <p>{current.subtitle}</p>
            </div>
            <div className="li-diagram-tip">
              <span>↔</span>
              Arraste para navegar pelo fluxo
            </div>
          </div>

          <div className="li-diagram-canvas">
            <ReactFlow
              key={activeDiagram}
              nodes={current.nodes}
              edges={current.edges}
              nodeTypes={nodeTypes}
              defaultViewport={{ x: 210, y: 34, zoom: 0.68 }}
              minZoom={0.2}
              maxZoom={1.45}
              nodesConnectable={false}
              nodesDraggable={false}
              elementsSelectable
              panOnScroll
              proOptions={{ hideAttribution: true }}
            >
              <Background gap={28} size={1.15} color="#d7e1ee" />
              <MiniMap
                pannable
                zoomable
                nodeColor={(diagramNode) => {
                  const tone = (diagramNode.data as FlowNodeData).tone;
                  if (tone === 'admin') return '#7c3aed';
                  if (tone === 'student') return '#059669';
                  if (tone === 'teacher') return '#ea580c';
                  if (tone === 'audio') return '#db2777';
                  return '#0284c7';
                }}
              />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>

        <div className="li-legend">
          <span><i className="li-color li-color--admin" />Administrador</span>
          <span><i className="li-color li-color--system" />Sistema</span>
          <span><i className="li-color li-color--audio" />Áudio e IA</span>
          <span><i className="li-color li-color--student" />Aluno</span>
          <span><i className="li-color li-color--teacher" />Professor</span>
        </div>
      </section>

      <section className="li-section li-section--tech" id="tecnologias">
        <div className="li-section-intro">
          <div className="li-section-heading">
            <span>Arquitetura proposta</span>
            <h2>Tecnologia com responsabilidade bem definida.</h2>
            <p>Os serviços de áudio ficam desacoplados para que o provedor possa ser trocado sem reconstruir o produto.</p>
          </div>
          <div className="li-architecture-badge">
            <span>Arquitetura</span>
            <strong>Modular e evolutiva</strong>
          </div>
        </div>

        <div className="li-tech-grid">
          {technologies.map((technology, index) => (
            <article className="li-tech-card" key={technology.layer}>
              <div className="li-tech-card-top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i />
              </div>
              <h3>{technology.layer}</h3>
              <p>{technology.purpose}</p>
              <div className="li-tech-tags">
                {technology.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="li-section li-section--scope">
        <div className="li-section-heading">
          <span>Escopo recomendado</span>
          <h2>Entregar valor agora, evoluir a precisão depois.</h2>
          <p>O MVP valida inteligibilidade e correspondência textual. Avaliação fonética real fica em uma fase especializada.</p>
        </div>

        <div className="li-scope-grid">
          <article className="li-scope-card li-scope-card--mvp">
            <div className="li-scope-header">
              <div><span>Entrega inicial</span><h3>MVP até o final do mês</h3></div>
              <b>01</b>
            </div>
            <ul>{mvpScope.map((item) => <li key={item}><i>✓</i><span>{item}</span></li>)}</ul>
          </article>

          <article className="li-scope-card li-scope-card--later">
            <div className="li-scope-header">
              <div><span>Evolução</span><h3>Fase 2</h3></div>
              <b>02</b>
            </div>
            <ul>{laterScope.map((item) => <li key={item}><i>+</i><span>{item}</span></li>)}</ul>
          </article>
        </div>
      </section>

      <section className="li-section li-section--database" id="banco">
        <div className="li-section-intro li-section-intro--light">
          <div className="li-section-heading li-section-heading--light">
            <span>Persistência</span>
            <h2>Banco preparado para conteúdo, prática e progresso.</h2>
            <p>A estrutura separa livro, áudio, gravação, transcrição e resultado para facilitar manutenção e relatórios.</p>
          </div>
          <div className="li-db-count"><strong>{databaseTables.length}</strong><span>tabelas principais</span></div>
        </div>

        <div className="li-db-grid">
          {databaseTables.map(([table, description], index) => (
            <article className="li-db-card" key={table}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><code>{table}</code><p>{description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="li-section li-section--meeting" id="reuniao">
        <div className="li-section-heading">
          <span>Apresentação de amanhã</span>
          <h2>Conduza a reunião como uma decisão de produto.</h2>
          <p>Comece pelo problema pedagógico, apresente o fluxo do aluno e finalize com as decisões que destravam o desenvolvimento.</p>
        </div>

        <div className="li-pitch-grid">
          {meetingPitch.map((item, index) => (
            <article className="li-pitch-card" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="li-meeting-grid">
          <div className="li-question-card">
            <div className="li-question-heading">
              <span>Decisões necessárias</span>
              <h3>Perguntas para levar à equipe</h3>
            </div>
            <ol>{meetingQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
          </div>

          <aside className="li-recommendation">
            <span>Recomendação central</span>
            <h3>Não venda similaridade textual como nota de pronúncia.</h3>
            <p>
              No MVP, o Whisper mede se a fala foi reconhecida. Para fluência, fonemas e prosódia,
              a proposta deve prever um serviço especializado em uma segunda fase.
            </p>
            <a href="#fluxograma">Voltar ao fluxograma ↑</a>
          </aside>
        </div>
      </section>

      <footer className="li-footer">
        <div>
          <strong>Livro do Aluno Interativo</strong>
          <span>Discovery funcional e técnico</span>
        </div>
        <span>React · TypeScript · React Flow</span>
      </footer>
    </main>
  );
}

export default App;
