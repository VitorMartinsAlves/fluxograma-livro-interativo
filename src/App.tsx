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
          <a href="#inicio" className="li-brand">Livro Interativo</a>
          <div className="li-nav-links">
            <a href="#fluxograma">Fluxograma</a>
            <a href="#tecnologias">Tecnologias</a>
            <a href="#banco">Banco</a>
            <a href="#reuniao">Reunião</a>
          </div>
        </nav>

        <div className="li-hero-content">
          <span className="li-kicker">Discovery técnico revisado</span>
          <h1>Livro interativo com escuta, prática e feedback</h1>
          <p>
            O PDF é transformado em conteúdo estruturado e áudio de referência. O aluno escuta,
            grava a própria voz, o Whisper transcreve e o sistema compara com a frase original.
          </p>
          <div className="li-hero-actions">
            <a href="#fluxograma" className="li-button li-button--primary">Ver fluxograma</a>
            <a href="#reuniao" className="li-button li-button--ghost">Preparar reunião</a>
          </div>
          <div className="li-summary-row">
            <div><strong>TTS</strong><span>texto → áudio de referência</span></div>
            <div><strong>Whisper</strong><span>voz do aluno → texto</span></div>
            <div><strong>Comparador</strong><span>texto esperado × reconhecido</span></div>
          </div>
        </div>
      </header>

      <section className="li-section li-section--flow" id="fluxograma">
        <div className="li-section-heading">
          <span>Fluxograma funcional</span>
          <h2>Fluxos separados por usuário</h2>
          <p>Use as abas para apresentar o ciclo completo ou detalhar a responsabilidade de cada perfil.</p>
        </div>

        <div className="li-tabs" role="tablist" aria-label="Selecionar fluxograma">
          {diagramTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={activeDiagram === tab.key ? 'li-tab is-active' : 'li-tab'}
              onClick={() => setActiveDiagram(tab.key)}
            >
              <strong>{tab.label}</strong>
              <span>{tab.description}</span>
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
            <small>Arraste o fundo e use os controles de zoom.</small>
          </div>

          <div className="li-diagram-canvas">
            <ReactFlow
              key={activeDiagram}
              nodes={current.nodes}
              edges={current.edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.12, maxZoom: 0.78 }}
              minZoom={0.18}
              maxZoom={1.4}
              nodesConnectable={false}
              nodesDraggable={false}
              elementsSelectable
              proOptions={{ hideAttribution: true }}
            >
              <Background gap={24} size={1.2} color="#d5deea" />
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
          <span className="li-tone li-tone--admin">Administrador</span>
          <span className="li-tone li-tone--system">Sistema</span>
          <span className="li-tone li-tone--audio">Áudio/IA</span>
          <span className="li-tone li-tone--student">Aluno</span>
          <span className="li-tone li-tone--teacher">Professor</span>
        </div>
      </section>

      <section className="li-section li-section--soft" id="tecnologias">
        <div className="li-section-heading">
          <span>Arquitetura proposta</span>
          <h2>Tecnologias e responsabilidades</h2>
          <p>A arquitetura separa leitura, processamento, áudio e prática para permitir troca de provedores sem reescrever o produto.</p>
        </div>
        <div className="li-tech-grid">
          {technologies.map((technology) => (
            <article className="li-tech-card" key={technology.layer}>
              <span>{technology.layer}</span>
              <h3>{technology.items.join(' · ')}</h3>
              <p>{technology.purpose}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="li-section">
        <div className="li-section-heading">
          <span>Escopo recomendado</span>
          <h2>MVP primeiro, avaliação fonética depois</h2>
          <p>O MVP mede correspondência textual e inteligibilidade. Uma nota real de pronúncia deve ficar em uma fase especializada.</p>
        </div>
        <div className="li-scope-grid">
          <article className="li-scope-card li-scope-card--mvp">
            <span>Entrega inicial</span>
            <h3>MVP até o final do mês</h3>
            <ol>{mvpScope.map((item) => <li key={item}>{item}</li>)}</ol>
          </article>
          <article className="li-scope-card">
            <span>Evolução</span>
            <h3>Fase 2</h3>
            <ol>{laterScope.map((item) => <li key={item}>{item}</li>)}</ol>
          </article>
        </div>
      </section>

      <section className="li-section li-section--dark" id="banco">
        <div className="li-section-heading li-section-heading--light">
          <span>Persistência</span>
          <h2>Estrutura de banco revisada</h2>
          <p>Agora o banco contempla áudio de referência, gravação, transcrição, tentativa e resultado por palavra.</p>
        </div>
        <div className="li-db-grid">
          {databaseTables.map(([table, description]) => (
            <article className="li-db-card" key={table}>
              <code>{table}</code>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="li-section" id="reuniao">
        <div className="li-section-heading">
          <span>Apresentação de amanhã</span>
          <h2>Como defender a proposta</h2>
          <p>Comece pelo valor pedagógico, explique o papel de cada tecnologia e finalize com decisões que a equipe precisa tomar.</p>
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

        <div className="li-question-card">
          <div>
            <span>Decisões necessárias</span>
            <h3>Perguntas para levar à equipe</h3>
          </div>
          <ol>{meetingQuestions.map((question) => <li key={question}>{question}</li>)}</ol>
        </div>

        <div className="li-recommendation">
          <strong>Recomendação central</strong>
          <p>
            Apresente o Whisper como mecanismo de reconhecimento da fala do aluno, não como avaliador definitivo de pronúncia.
            Para o MVP, mostre feedback textual. Para uma futura nota fonética, proponha um serviço específico de avaliação.
          </p>
        </div>
      </section>

      <footer className="li-footer">
        <strong>Livro do Aluno Interativo</strong>
        <span>Discovery funcional e técnico</span>
      </footer>
    </main>
  );
}

export default App;
