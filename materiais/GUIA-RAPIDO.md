# Guia rápido — a UC11 em uma página

## Planejar
- **Plano de teste:** escopo, ambiente, riscos, casos de teste, critério de saída.
- **Teste baseado em risco:** primeiro o que tem mais chance de falhar e mais prejuízo.
- **Valor limite:** o número exato onde a regra muda, e um de cada lado (regra “até 15 min”: 14, 15 e 16).
- **Partição de equivalência:** um valor de cada grupo que o sistema trata igual.

## Caixa preta e caixa branca
- **Caixa preta:** testa pela tela, comparando com o requisito, sem olhar o código.
- **Caixa branca:** lê o código para achar caminhos, condições e defeitos que a tela esconde.

## Relatar
- **Issue:** título, regra violada, passos, dados exatos, esperado (do requisito), obtido, evidência, severidade. **Um defeito por Issue.**
- **Severidade:** o tamanho do estrago (crítica, alta, média, baixa). **Prioridade:** a ordem de correção.

## Depurar e corrigir
- **DevTools (F12) → Sources:** breakpoint para parar o código, *watch* para ver variáveis, *call stack* para ver quem chamou.
- **Correção rastreável:** um commit por defeito, `fix: <o que corrigiu> closes #N`. O `closes #N` fecha a Issue.

## Automatizar
- **Teste unitário:** confere uma função isolada. Padrão **preparar → agir → verificar**.
- No `testes/meus-testes.js`: `teste('nome', () => igual(obtido, esperado));`
- **Um teste por defeito:** ele falha antes da correção e passa depois.
- **Regressão:** testes do que já funcionava, para ver se a correção não quebrou nada.

## Fechar
- **Reteste:** repetir o caso que falhou, depois da correção. **Regressão:** repetir o que funcionava.
- **Relatório final:** números, defeitos por severidade, critério de saída e recomendação.
- **Taxa de aprovação** = passando ÷ executados.

## IA nos testes
- Receita do prompt: **Papel, Contexto, Tarefa, Formato, Critério**.
- A IA pode inventar (alucinação) e copiar o defeito do código para o esperado. Confira tudo no requisito. Nunca cole dados reais ou código de empresa.
