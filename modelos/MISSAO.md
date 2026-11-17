# Missão final — Grupo __

**Integrantes:**

| Fase | Responsáveis (pelo menos 2 fases por pessoa) |
| --- | --- |
| 1. Planejar | |
| 2. Caçar | |
| 3. Abrir o código | |
| 4. Automatizar | |
| 5. Relatar | |

---

## Fase 1 — Plano de teste

**Escopo:** o que vamos testar e o que fica de fora.

**Ambiente:** navegador e versão, sistema operacional.

**Riscos:** as 3 regras que mais podem dar prejuízo ao estacionamento, e por quê.

1.
2.
3.

**Casos de teste** (8 ou mais; pelo menos 3 de valor limite). Técnicas: VL valor limite · PE partição de equivalência · FL fluxo.

| ID | Regra | Técnica | Entrada (valores exatos) | Esperado (do requisito) | Obtido | Status | Issue |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT01 | | | | | | | |
| CT02 | | | | | | | |
| CT03 | | | | | | | |
| CT04 | | | | | | | |
| CT05 | | | | | | | |
| CT06 | | | | | | | |
| CT07 | | | | | | | |
| CT08 | | | | | | | |

## Fase 2 — Defeitos encontrados (caixa preta)

Um defeito por Issue. Anotem aqui o número de cada uma.

| Issue | Regra | Resumo | Severidade |
| --- | --- | --- | --- |
| # | | | |

## Fase 3 — Correções (caixa branca)

| Issue | Função e linha errada | Causa | Correção | Commit |
| --- | --- | --- | --- | --- |
| # | | | | `fix: … closes #` |

Defeitos encontrados **só lendo o código** (abram Issue para eles também):

## Fase 4 — Testes automatizados

`testes/testes.html` antes das correções: ___ de ___ · depois: ___ de ___

| Teste | Regra | Defeito que ele prova (ou regressão) |
| --- | --- | --- |
| | | |

## Fase 5 — Relatório final

| Métrica | Valor |
| --- | --- |
| Casos planejados / executados | |
| Passando antes das correções | |
| Passando depois das correções (reteste) | |
| Defeitos encontrados / corrigidos / abertos | |
| Testes automatizados passando | |

**Defeitos por severidade:** crítica __ · alta __ · média __ · baixa __

**Critério de saída** (nenhum defeito crítico ou alto aberto e todos os testes automatizados passando): atendido? Por quê?

**Recomendação:** o EstacionaAí pode entrar em produção?

**O que a missão mostrou que aprendemos na UC11:**
