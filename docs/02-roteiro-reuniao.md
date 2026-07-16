# Roteiro para a reunião — Livro do Aluno Interativo

## Objetivo da apresentação

Obter aprovação do fluxo funcional, definir o escopo do MVP e sair da reunião com as decisões técnicas necessárias para iniciar o desenvolvimento.

## Duração sugerida

Entre 10 e 15 minutos.

## 1. Abertura — 1 minuto

> A proposta é transformar o livro em uma ferramenta ativa de aprendizagem. O aluno não apenas lê: ele escuta a frase correta, grava a própria voz, recebe um feedback e pode tentar novamente.

## 2. Problema atual — 1 minuto

- o livro é passivo;
- não existe prática oral integrada;
- o professor não sabe quais frases geram maior dificuldade;
- o aluno precisa sair da plataforma para praticar áudio;
- não existe histórico de tentativa ou progresso por frase.

## 3. Solução proposta — 2 minutos

Apresentar o fluxo principal:

```text
PDF
↓
Texto estruturado
↓
Áudio de referência por TTS ou gravação humana
↓
Aluno escuta
↓
Aluno grava
↓
Whisper transcreve
↓
Sistema compara com a frase original
↓
Feedback e nova tentativa
```

## 4. Explicar o papel das ferramentas — 2 minutos

### TTS

Transforma o texto do livro em áudio de referência.

### Whisper

Transforma a voz do aluno em texto para verificar se a fala foi reconhecida como a frase esperada.

### Comparador textual

Aponta palavras correspondentes, ausentes, inseridas ou diferentes.

### Avaliação de pronúncia especializada

É uma possível segunda fase. Deve ser usada se a empresa realmente precisar de pontuação fonética, fluência, prosódia e entonação.

## 5. Mostrar os quatro fluxogramas — 3 minutos

1. Visão geral.
2. Administrador.
3. Aluno.
4. Professor/coordenação.

Focar principalmente no fluxo do aluno:

```text
Ouvir → Praticar → Gravar → Transcrever → Comparar → Feedback → Tentar novamente
```

## 6. Explicar o MVP — 2 minutos

### Entrará no MVP

- cadastro do livro;
- PDF e páginas;
- frases interativas;
- áudio por TTS ou upload;
- player;
- gravação;
- Whisper;
- comparação textual;
- feedback por palavra;
- progresso;
- painel básico.

### Não entrará no MVP

- nota fonética precisa;
- correção de sotaque;
- conversação aberta;
- gamificação avançada;
- IA generativa para aulas completas;
- avaliação gramatical de fala livre.

## 7. Decisões que precisam sair da reunião — 3 minutos

### Conteúdo

1. Os livros têm texto selecionável ou são escaneados?
2. Já existem áudios humanos?
3. Quais frases devem ser praticáveis?
4. O admin fará revisão manual?

### Áudio

1. Qual TTS será utilizado?
2. Qual versão do Whisper foi usada no projeto de Nova York?
3. O objetivo é reconhecimento textual ou avaliação real de pronúncia?
4. Qual duração máxima de uma tentativa?

### Dados e privacidade

1. As gravações serão salvas?
2. Por quanto tempo?
3. O professor poderá ouvir as gravações?
4. O aluno poderá apagar seu histórico?

### Produto

1. Mobile será obrigatório no MVP?
2. Como o livro será liberado: turma, curso ou aluno?
3. Qual regra marca uma frase como concluída?
4. Quantas tentativas devem aparecer no painel?

## 8. Ideias de valor para sugerir

### Modo sombra

O áudio toca em pequenos trechos e o aluno repete logo depois, imitando ritmo e entonação.

### Velocidade de reprodução

Permitir 0,75x, 1x e 1,25x.

### Comparação visual

Destacar:

- verde: palavra reconhecida;
- amarelo: palavra parecida;
- vermelho: palavra ausente ou diferente.

### Frases difíceis

O painel mostra frases que exigem mais tentativas na turma.

### Repetição espaçada

O sistema recomenda novamente frases em que o aluno teve dificuldade.

### Áudio humano como conteúdo premium

O sistema pode usar TTS inicialmente e permitir substituição posterior por gravações de professores ou nativos.

### Modo privacidade

A gravação é enviada, transcrita e apagada automaticamente, mantendo apenas o resultado textual e as métricas.

## 9. Frase final sugerida

> A arquitetura mantém o TTS, a transcrição e a avaliação desacoplados. Assim, conseguimos entregar um MVP funcional até o final do mês e trocar ou evoluir os provedores depois, sem reconstruir o livro inteiro.

## 10. Resultado esperado

Ao final da reunião, registrar por escrito:

- escopo aprovado;
- provedor de TTS;
- modelo de transcrição;
- necessidade ou não de avaliação fonética;
- política das gravações;
- formato dos PDFs;
- público do livro;
- responsáveis pelas validações;
- data da primeira demonstração.
