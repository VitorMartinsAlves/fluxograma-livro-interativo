import { useMemo } from 'react';
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import './database-diagram.css';

type FieldKey = 'PK' | 'FK' | 'UQ';
type TableGroup = 'content' | 'delivery' | 'practice' | 'processing';

type TableField = {
  name: string;
  type: string;
  key?: FieldKey;
  nullable?: boolean;
};

type TableNodeData = {
  name: string;
  description: string;
  group: TableGroup;
  fields: TableField[];
};

type TableNode = Node<TableNodeData, 'tableNode'>;

const table = (
  id: string,
  x: number,
  y: number,
  name: string,
  description: string,
  group: TableGroup,
  fields: TableField[],
): TableNode => ({
  id,
  type: 'tableNode',
  position: { x, y },
  data: { name, description, group, fields },
});

const relation = (
  id: string,
  source: string,
  target: string,
  label: string,
  sourceHandle = 'right',
  targetHandle = 'left',
): Edge => ({
  id,
  source,
  target,
  sourceHandle,
  targetHandle,
  label,
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
  style: { stroke: '#7890ad', strokeWidth: 1.7 },
  labelStyle: { fill: '#29405e', fontSize: 11, fontWeight: 800 },
  labelBgStyle: { fill: '#ffffff', fillOpacity: 0.96, stroke: '#d7e1ec' },
  labelBgPadding: [7, 4],
  labelBgBorderRadius: 6,
});

const nodes: TableNode[] = [
  table('books', 30, 350, 'student_books', 'Raiz do conteúdo interativo.', 'content', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'title', type: 'VARCHAR(255)' },
    { name: 'language_code', type: 'VARCHAR(20)' },
    { name: 'level', type: 'VARCHAR(50)', nullable: true },
    { name: 'course_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'class_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'status', type: 'ENUM' },
    { name: 'created_by', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'published_at', type: 'DATETIME', nullable: true },
  ]),
  table('files', 30, 0, 'student_book_files', 'Arquivos físicos do livro.', 'content', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK' },
    { name: 'file_type', type: 'ENUM' },
    { name: 'original_name', type: 'VARCHAR(255)', nullable: true },
    { name: 'mime_type', type: 'VARCHAR(100)', nullable: true },
    { name: 'file_url', type: 'TEXT' },
    { name: 'storage_path', type: 'TEXT', nullable: true },
    { name: 'size_bytes', type: 'BIGINT', nullable: true },
  ]),
  table('pages', 30, 720, 'student_book_pages', 'Páginas processadas e renderizadas.', 'content', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK' },
    { name: 'page_number', type: 'INT', key: 'UQ' },
    { name: 'image_url', type: 'TEXT', nullable: true },
    { name: 'extracted_text', type: 'LONGTEXT', nullable: true },
    { name: 'extraction_method', type: 'ENUM', nullable: true },
    { name: 'processing_status', type: 'ENUM' },
  ]),
  table('assignments', 30, 1030, 'student_book_assignments', 'Liberação do livro por público.', 'delivery', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK' },
    { name: 'assignment_type', type: 'ENUM' },
    { name: 'reference_id', type: 'BIGINT', nullable: true },
    { name: 'available_from', type: 'DATETIME', nullable: true },
    { name: 'available_until', type: 'DATETIME', nullable: true },
    { name: 'is_active', type: 'BOOLEAN' },
  ]),
  table('segments', 430, 300, 'student_book_segments', 'Frases e áreas interativas.', 'content', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK' },
    { name: 'page_id', type: 'BIGINT', key: 'FK' },
    { name: 'parent_segment_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'segment_type', type: 'ENUM' },
    { name: 'text_content', type: 'TEXT' },
    { name: 'normalized_text', type: 'TEXT', nullable: true },
    { name: 'position_x / y', type: 'DECIMAL', nullable: true },
    { name: 'width / height', type: 'DECIMAL', nullable: true },
    { name: 'is_listenable', type: 'BOOLEAN' },
    { name: 'is_practicable', type: 'BOOLEAN' },
  ]),
  table('audios', 850, 0, 'student_book_segment_audios', 'Áudio de referência TTS ou humano.', 'delivery', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'segment_id', type: 'BIGINT', key: 'FK' },
    { name: 'source_type', type: 'ENUM' },
    { name: 'provider', type: 'VARCHAR(100)', nullable: true },
    { name: 'model_name', type: 'VARCHAR(100)', nullable: true },
    { name: 'voice_name', type: 'VARCHAR(100)', nullable: true },
    { name: 'file_url', type: 'TEXT' },
    { name: 'duration_seconds', type: 'DECIMAL', nullable: true },
    { name: 'status', type: 'ENUM' },
  ]),
  table('progress', 850, 390, 'student_book_progress', 'Estado de leitura e prática do aluno.', 'delivery', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK' },
    { name: 'student_id', type: 'BIGINT', key: 'FK' },
    { name: 'current_page_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'current_segment_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'progress_percentage', type: 'DECIMAL' },
    { name: 'listened_segments_count', type: 'INT' },
    { name: 'practiced_segments_count', type: 'INT' },
    { name: 'status', type: 'ENUM' },
    { name: 'last_accessed_at', type: 'DATETIME', nullable: true },
  ]),
  table('recordings', 850, 810, 'student_recordings', 'Gravações realizadas pelo aluno.', 'practice', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'student_id', type: 'BIGINT', key: 'FK' },
    { name: 'segment_id', type: 'BIGINT', key: 'FK' },
    { name: 'file_url', type: 'TEXT', nullable: true },
    { name: 'mime_type', type: 'VARCHAR(100)', nullable: true },
    { name: 'duration_seconds', type: 'DECIMAL', nullable: true },
    { name: 'retention_status', type: 'ENUM' },
    { name: 'delete_after', type: 'DATETIME', nullable: true },
  ]),
  table('attempts', 1270, 280, 'student_practice_attempts', 'Núcleo da avaliação de cada tentativa.', 'practice', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'student_id', type: 'BIGINT', key: 'FK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK' },
    { name: 'segment_id', type: 'BIGINT', key: 'FK' },
    { name: 'recording_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'attempt_number', type: 'INT', key: 'UQ' },
    { name: 'expected_text', type: 'TEXT' },
    { name: 'recognized_text', type: 'TEXT', nullable: true },
    { name: 'similarity_score', type: 'DECIMAL', nullable: true },
    { name: 'required_score', type: 'DECIMAL', nullable: true },
    { name: 'result', type: 'ENUM' },
  ]),
  table('transcriptions', 1690, 0, 'student_transcriptions', 'Resposta produzida pelo Whisper/STT.', 'practice', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'attempt_id', type: 'BIGINT', key: 'FK', key: 'UQ' },
    { name: 'provider', type: 'VARCHAR(100)' },
    { name: 'model_name', type: 'VARCHAR(100)' },
    { name: 'language_code', type: 'VARCHAR(20)', nullable: true },
    { name: 'transcription_text', type: 'TEXT' },
    { name: 'confidence_score', type: 'DECIMAL', nullable: true },
    { name: 'raw_response', type: 'JSON', nullable: true },
  ]),
  table('wordResults', 1690, 390, 'student_practice_word_results', 'Diferenças identificadas por palavra.', 'practice', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'attempt_id', type: 'BIGINT', key: 'FK' },
    { name: 'word_order', type: 'INT' },
    { name: 'expected_word', type: 'VARCHAR(255)', nullable: true },
    { name: 'recognized_word', type: 'VARCHAR(255)', nullable: true },
    { name: 'result_type', type: 'ENUM' },
    { name: 'similarity_score', type: 'DECIMAL', nullable: true },
  ]),
  table('jobs', 1690, 760, 'student_book_processing_jobs', 'Fila e auditoria dos processamentos.', 'processing', [
    { name: 'id', type: 'BIGINT', key: 'PK' },
    { name: 'book_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'segment_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'attempt_id', type: 'BIGINT', key: 'FK', nullable: true },
    { name: 'job_type', type: 'ENUM' },
    { name: 'status', type: 'ENUM' },
    { name: 'provider', type: 'VARCHAR(100)', nullable: true },
    { name: 'retry_count', type: 'INT' },
    { name: 'error_message', type: 'TEXT', nullable: true },
  ]),
];

const edges: Edge[] = [
  relation('r1', 'books', 'files', '1:N', 'top', 'bottom'),
  relation('r2', 'books', 'pages', '1:N', 'bottom', 'top'),
  relation('r3', 'books', 'assignments', '1:N', 'bottom', 'top'),
  relation('r4', 'books', 'segments', '1:N'),
  relation('r5', 'pages', 'segments', '1:N'),
  relation('r6', 'segments', 'segments', 'pai:filhos', 'bottom', 'top'),
  relation('r7', 'segments', 'audios', '1:N'),
  relation('r8', 'books', 'progress', '1:N'),
  relation('r9', 'pages', 'progress', 'página atual'),
  relation('r10', 'segments', 'progress', 'segmento atual'),
  relation('r11', 'segments', 'recordings', '1:N'),
  relation('r12', 'books', 'attempts', '1:N'),
  relation('r13', 'segments', 'attempts', '1:N'),
  relation('r14', 'recordings', 'attempts', '1:0..1'),
  relation('r15', 'attempts', 'transcriptions', '1:1'),
  relation('r16', 'attempts', 'wordResults', '1:N'),
  relation('r17', 'books', 'jobs', '1:N'),
  relation('r18', 'segments', 'jobs', '1:N'),
  relation('r19', 'attempts', 'jobs', '1:N'),
];

function TableNodeCard({ data }: NodeProps<TableNode>) {
  return (
    <article className={`db-model-node db-model-node--${data.group}`}>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />

      <header>
        <span>{data.group}</span>
        <strong>{data.name}</strong>
        <small>{data.description}</small>
      </header>

      <div className="db-model-fields">
        {data.fields.map((field) => (
          <div className="db-model-field" key={`${data.name}-${field.name}`}>
            <span className="db-model-field-name">
              {field.key && <b className={`db-key db-key--${field.key.toLowerCase()}`}>{field.key}</b>}
              {field.name}
            </span>
            <code>{field.type}{field.nullable ? '?' : ''}</code>
          </div>
        ))}
      </div>

      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
    </article>
  );
}

export function DatabaseDiagram() {
  const nodeTypes = useMemo(() => ({ tableNode: TableNodeCard }), []);

  return (
    <div className="db-model-shell">
      <div className="db-model-toolbar">
        <div>
          <strong>Modelo lógico proposto</strong>
          <span>MySQL 8 · chaves e cardinalidades principais</span>
        </div>
        <div className="db-model-legend">
          <span><i className="db-dot db-dot--content" />Conteúdo</span>
          <span><i className="db-dot db-dot--delivery" />Distribuição</span>
          <span><i className="db-dot db-dot--practice" />Prática</span>
          <span><i className="db-dot db-dot--processing" />Processamento</span>
        </div>
      </div>

      <div className="db-model-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.08, maxZoom: 0.68 }}
          minZoom={0.22}
          maxZoom={1.4}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnScroll
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={26} size={1.1} color="#dbe5ef" />
          <MiniMap pannable zoomable nodeColor="#2f6f9f" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="db-model-notes">
        <span><b>PK</b> chave primária</span>
        <span><b>FK</b> chave estrangeira</span>
        <span><b>UQ</b> restrição única</span>
        <span><strong>1:N</strong> um registro possui vários relacionados</span>
      </div>
    </div>
  );
}
