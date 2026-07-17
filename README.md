# Livro do Aluno Interativo

Projeto React + TypeScript para apresentar o fluxo funcional e técnico do Livro do Aluno Interativo.

A proposta revisada transforma o livro em uma experiência de:

```text
leitura → escuta → gravação → transcrição → comparação → feedback
```

## Papel de cada tecnologia de áudio

- **TTS:** transforma o texto do livro em áudio de referência;
- **Whisper / Speech-to-Text:** transforma a voz do aluno em texto;
- **comparador textual:** compara o texto reconhecido com a frase original;
- **avaliação fonética especializada:** evolução futura para nota de pronúncia, fluência e prosódia.

## Conteúdo da página

- fluxograma geral;
- fluxo do administrador;
- fluxo do aluno;
- fluxo do professor e coordenação;
- tecnologias recomendadas;
- escopo do MVP e da fase 2;
- estrutura revisada do banco;
- argumentos e perguntas para a reunião.

## Documentação

- [Cola completa da apresentação](README-APRESENTACAO.md)
- [Discovery técnico](docs/01-discovery-tecnico.md)
- [Roteiro para a reunião](docs/02-roteiro-reuniao.md)
- [Banco de dados MySQL](docs/03-database.sql)

## Tecnologias da apresentação

- React;
- TypeScript;
- Vite;
- React Router;
- @xyflow/react;
- CSS responsivo.

## Executar localmente

Depois de atualizar o repositório, instale novamente as dependências:

```bash
npm install
npm run dev
```

Caso o pacote de fluxograma não esteja instalado:

```bash
npm install @xyflow/react
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Diretriz do MVP

O MVP verifica se a fala do aluno foi reconhecida como a frase esperada. A similaridade textual não deve ser apresentada como uma nota fonética definitiva de pronúncia.
