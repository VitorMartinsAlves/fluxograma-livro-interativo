const adminSteps = [
  ['1', 'Criar o livro', 'Define título, idioma, nível, curso, turma e mantém o conteúdo como rascunho.'],
  ['2', 'Enviar o PDF', 'O arquivo original é armazenado e enviado para a fila de processamento.'],
  ['3', 'Processar páginas', 'O sistema converte o PDF em páginas, gera imagens e extrai o texto disponível.'],
  ['4', 'Enviar os áudios', 'O administrador associa áudios ao livro, página, diálogo ou capítulo.'],
  ['5', 'Transcrever com Whisper', 'O áudio é transcrito e separado em frases com timestamps para revisão.'],
  ['6', 'Mapear interações', 'O administrador desenha áreas sobre a página e vincula cada trecho ao áudio correto.'],
  ['7', 'Revisar e publicar', 'O livro é testado, vinculado aos usuários e liberado para acesso.'],
];

const studentSteps = [
  ['1', 'Acessar a biblioteca', 'O aluno visualiza apenas os livros liberados para seu curso, turma ou usuário.'],
  ['2', 'Abrir o livro', 'O sistema recupera a última página acessada e carrega o conteúdo progressivamente.'],
  ['3', 'Interagir com a página', 'No desktop, o trecho pode ser destacado por hover. No mobile, a interação ocorre por toque.'],
  ['4', 'Ouvir o conteúdo', 'Ao clicar no play, o sistema reproduz o arquivo inteiro ou apenas o intervalo indicado pelos timestamps.'],
  ['5', 'Continuar a leitura', 'O aluno navega entre páginas, controla o áudio e retoma o livro de onde parou.'],
  ['6', 'Salvar o progresso', 'O sistema registra página atual, percentual concluído, último acesso e interações relevantes.'],
];

const architecture = [
  ['Frontend', 'React, TypeScript, React Router, TanStack Query, React Hook Form, Zod e PDF.js.'],
  ['Backend', 'Node.js com TypeScript, Express ou Fastify, validação com Zod e serviços separados por domínio.'],
  ['Banco', 'MySQL 8 com Prisma ORM, migrations e relações entre livros, páginas, áudios, segmentos e progresso.'],
  ['Processamento', 'BullMQ e Redis para filas; FFmpeg para áudio; PDF.js, Poppler, pdf-lib e Sharp para documentos.'],
  ['IA e áudio', 'Whisper para transcrição e timestamps. TTS somente se for necessário gerar voz a partir do texto.'],
  ['Arquivos', 'Cloudflare R2, S3 ou storage compatível para PDFs, imagens, áudios e thumbnails.'],
];

const tables = [
  ['student_books', 'Dados principais, vínculo com curso, status e publicação.'],
  ['student_book_files', 'PDF original, imagens, áudios, thumbnails e caminhos no storage.'],
  ['student_book_pages', 'Número, imagem renderizada, texto extraído, largura e altura.'],
  ['student_book_audios', 'Arquivo de áudio, duração, modelo Whisper e estado do processamento.'],
  ['student_book_audio_segments', 'Texto transcrito, ordem e timestamps de início e fim.'],
  ['student_book_interactive_segments', 'Área clicável da página, tipo de interação e áudio relacionado.'],
  ['student_book_assignments', 'Liberação por aluno, turma, curso ou acesso global.'],
  ['student_book_progress', 'Página atual, percentual, status e último acesso do aluno.'],
  ['student_book_interaction_logs', 'Eventos de leitura, cliques, reprodução de áudio e conclusão.'],
  ['student_book_processing_jobs', 'Fila, status, entrada, saída e erros de cada processamento.'],
];

function FlowStep({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <article className="flow-step">
      <div className="step-number">{index}</div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="hero" id="inicio">
        <nav className="nav container">
          <a className="brand" href="#inicio">Livro Interativo</a>
          <div className="nav-links">
            <a href="#fluxos">Fluxos</a>
            <a href="#arquitetura">Arquitetura</a>
            <a href="#banco">Banco</a>
            <a href="#cronograma">Cronograma</a>
          </div>
        </nav>

        <div className="hero-content container">
          <div className="eyebrow">Discovery técnico</div>
          <h1>Fluxograma do Livro do Aluno Interativo</h1>
          <p className="hero-copy">
            Visão ponta a ponta do cadastro administrativo, processamento do PDF e áudio,
            publicação, leitura do aluno e armazenamento de progresso.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#fluxos">Ver fluxograma</a>
            <a className="button ghost" href="#arquitetura">Ver tecnologias</a>
          </div>
          <div className="hero-metrics">
            <div><strong>3</strong><span>perfis de uso</span></div>
            <div><strong>10</strong><span>tabelas principais</span></div>
            <div><strong>1</strong><span>fluxo integrado</span></div>
          </div>
        </div>
      </header>

      <main>
        <section className="section container" id="visao-geral">
          <div className="section-heading">
            <span>Visão geral</span>
            <h2>Como o projeto funciona</h2>
            <p>O conteúdo nasce no painel administrativo, passa por processamento assíncrono e chega ao aluno como uma experiência interativa.</p>
          </div>

          <div className="overview-grid">
            <article className="overview-card admin-card">
              <div className="icon">A</div>
              <h3>Administração</h3>
              <p>Cadastro, upload, revisão, associação de áudio e publicação do livro.</p>
            </article>
            <div className="connector">→</div>
            <article className="overview-card system-card">
              <div className="icon">S</div>
              <h3>Processamento</h3>
              <p>Conversão do PDF, transcrição do áudio, geração de páginas e persistência.</p>
            </article>
            <div className="connector">→</div>
            <article className="overview-card student-card">
              <div className="icon">E</div>
              <h3>Experiência do aluno</h3>
              <p>Leitura, destaque de trechos, reprodução de áudio e progresso automático.</p>
            </article>
          </div>
        </section>

        <section className="section dark-section" id="fluxos">
          <div className="container">
            <div className="section-heading light">
              <span>Fluxos de usuário</span>
              <h2>Etapas por perfil</h2>
              <p>Cada perfil interage com uma parte específica do ciclo de vida do livro.</p>
            </div>

            <div className="flow-columns">
              <div className="flow-panel">
                <div className="panel-label admin-label">Fluxo do administrador</div>
                <div className="flow-list">
                  {adminSteps.map(([index, title, description]) => (
                    <FlowStep key={index} index={index} title={title} description={description} />
                  ))}
                </div>
              </div>

              <div className="flow-panel">
                <div className="panel-label student-label">Fluxo do aluno</div>
                <div className="flow-list">
                  {studentSteps.map(([index, title, description]) => (
                    <FlowStep key={index} index={index} title={title} description={description} />
                  ))}
                </div>
              </div>
            </div>

            <div className="teacher-flow">
              <div>
                <span className="teacher-tag">Professor ou coordenação</span>
                <h3>Acompanhamento pedagógico</h3>
              </div>
              <p>Consulta acesso, página atual, percentual de conclusão e uso dos recursos de áudio por turma ou aluno.</p>
            </div>
          </div>
        </section>

        <section className="section container" id="arquitetura">
          <div className="section-heading">
            <span>Arquitetura</span>
            <h2>Tecnologias recomendadas</h2>
            <p>Uma stack tipada, modular e preparada para tarefas de processamento que não devem bloquear a API.</p>
          </div>

          <div className="architecture-grid">
            {architecture.map(([title, description]) => (
              <article className="tech-card" key={title}>
                <div className="tech-dot" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <div className="pipeline">
            <h3>Pipeline de processamento</h3>
            <div className="pipeline-row">
              {['Upload', 'Storage', 'Fila', 'Worker', 'Banco', 'Publicação'].map((item, index) => (
                <div className="pipeline-item" key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft-section" id="banco">
          <div className="container">
            <div className="section-heading">
              <span>Persistência</span>
              <h2>Estrutura de banco</h2>
              <p>Separação por responsabilidade para reduzir acoplamento e permitir evolução do produto.</p>
            </div>

            <div className="table-grid">
              {tables.map(([name, description]) => (
                <article className="db-card" key={name}>
                  <code>{name}</code>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="regras">
          <div className="section-heading">
            <span>Regras técnicas</span>
            <h2>Decisões importantes</h2>
          </div>

          <div className="decision-grid">
            <article>
              <h3>Whisper</h3>
              <p>É usado para transcrever o áudio e localizar frases por timestamps. Não gera áudio.</p>
            </article>
            <article>
              <h3>Interação responsiva</h3>
              <p>Hover pode existir no desktop, mas a ação principal deve funcionar por clique ou toque.</p>
            </article>
            <article>
              <h3>Processamento assíncrono</h3>
              <p>PDF e áudio devem ser processados por workers, com status e mensagens de erro persistidos.</p>
            </article>
            <article>
              <h3>Primeira versão</h3>
              <p>O mapeamento manual ou semiautomático reduz dependência de extração perfeita e evita retrabalho.</p>
            </article>
          </div>
        </section>

        <section className="section timeline-section" id="cronograma">
          <div className="container">
            <div className="section-heading light">
              <span>Cronograma</span>
              <h2>Da descoberta à entrega</h2>
            </div>
            <div className="timeline">
              <article><span>Agora</span><h3>Discovery</h3><p>Pesquisa, arquitetura, tecnologias, banco e fluxos.</p></article>
              <article><span>Sexta, 14:30</span><h3>Revisão técnica</h3><p>Apresentação ao Durval e equipe para validação.</p></article>
              <article><span>Sexta, 16:00</span><h3>Documento final</h3><p>Aplicação dos ajustes e entrega do Discovery.</p></article>
              <article><span>Segunda-feira</span><h3>Desenvolvimento</h3><p>Início da feature em branch separada.</p></article>
              <article><span>Fim do mês</span><h3>Entrega</h3><p>Livro Interativo funcional e disponível na plataforma.</p></article>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-content">
          <div>
            <strong>Livro do Aluno Interativo</strong>
            <p>Fluxograma técnico e funcional.</p>
          </div>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
