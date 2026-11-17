# Missão final — UC11

Último dia da UC11. Vocês vão fazer, num app que ninguém viu, **tudo o que aprenderam**: planejar, testar, relatar, abrir o código, corrigir, automatizar e fechar com um relatório.

**O app:** EstacionaAí, o caixa de saída de um estacionamento (`app/index.html`). As regras estão em `app/REQUISITOS-EstacionaAi.md`. **Ele tem defeitos.** Quantos e onde, é com vocês.

## O que tem neste repositório

```
missao-final/
├── README.md                       ← este arquivo
├── app/                            ← o EstacionaAí (abra o index.html no navegador)
│   ├── REQUISITOS-EstacionaAi.md   ← de onde sai TODO resultado esperado
│   └── js/regras.js  js/app.js
├── testes/
│   ├── testes.html                 ← o executor de testes (abra no navegador)
│   └── meus-testes.js              ← onde vocês escrevem os testes
├── modelos/MISSAO.md               ← o registro da missão (copie para entregas/)
├── materiais/GUIA-RAPIDO.md        ← a UC11 inteira em uma página
├── .github/ISSUE_TEMPLATE/         ← o modelo de Issue
└── entregas/
```

## Antes de começar (5 min)

1. Um integrante: **Use this template** → `missao-final-grupo-N`, público. **Settings → Collaborators:** adicionar o grupo.
2. **Issues → Labels:** criar `crítica`, `alta`, `média` e `baixa`.
3. Copiar `modelos/MISSAO.md` para `entregas/MISSAO-grupo-N.md`.
4. Dividir as fases: **cada integrante é responsável por pelo menos 2 fases** e escreve o nome dele no registro. É assim que o professor avalia cada um.

## As 5 fases

| Fase | Tempo | O que fazer | Pronto quando | Indicador |
| --- | --- | --- | --- | --- |
| **1. Planejar** | 15 min | Ler os requisitos e escrever o plano no registro: riscos e **8 casos de teste ou mais**, com pelo menos **3 de valor limite** e o esperado tirado do requisito. | 8 casos com valores exatos | 1 |
| **2. Caçar** | 20 min | Executar o plano no `app/index.html` (caixa preta) e abrir **uma Issue por defeito** com o modelo **Relato de defeito**. | Issues completas, com print e label | 5 e 2 |
| **3. Abrir o código** | 20 min | Para cada Issue, achar a causa no `app/js/regras.js` (caixa branca) e corrigir. **Um commit por defeito:** `fix: <o que corrigiu> closes #N`. Ler o código também pode revelar defeitos que a tela esconde. | Issues fechadas pelos commits | 4 e 3 |
| **4. Automatizar** | 15 min | Escrever em `testes/meus-testes.js` **um teste por defeito corrigido** e testes de regressão. Abrir `testes/testes.html`: tudo passando. | Todos os testes passando | 6 |
| **5. Relatar** | 5 min | Fechar o registro com o relatório final: números, defeitos por severidade, critério de saída e recomendação. Commit e push. | Registro completo no repositório | 2 |

Dica de organização: as fases 2 e 3 podem andar juntas. Enquanto um caça e abre Issues, outro já abre o código.

## O placar

| Ação | Pontos |
| --- | --- |
| Issue completa (regra, passos, dados exatos, esperado do requisito, obtido, print, label) de um defeito real | **+1** |
| Defeito corrigido com commit `fix: … closes #N` | **+1** |
| Teste automatizado que prova a correção (falhava antes, passa depois) | **+1** |
| Issue de algo que **não** é defeito (o app faz o que o requisito diz) | **−1** |

O professor confere no repositório de cada grupo no fim da fase 5.

## Regras

- O esperado vem **sempre do requisito**, nunca do que a tela mostra.
- **Um defeito, uma Issue. Um defeito, um commit.**
- Pode usar IA, como nas aulas 24 e 26: com a receita do prompt e conferindo tudo. Quem assina é o grupo.
- Não vale olhar o repositório de outro grupo.

## Entrega

`entregas/MISSAO-grupo-N.md` completo, as Issues, os commits `fix: … closes #N` e os testes em `testes/meus-testes.js`. Último push até o fim da fase 5.
