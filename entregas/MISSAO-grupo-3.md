# Missão final — Grupo 3

**Integrantes:** (Tarso, kayk, jefferson, tiago)

| Fase | Responsáveis (pelo menos 2 fases por pessoa) |
| --- | --- |
| 1. Planejar | (tarso) |
| 2. Caçar | (tarso e kayk) |
| 3. Abrir o código | (kayk e jefferson) |
| 4. Automatizar | (jefferson e tiago) |
| 5. Relatar | (tiago) |

---

## Fase 1 — Plano de teste

**Escopo:** regras de negócio RN01 a RN08 e RNF01 a RNF03 do EstacionaAí v1.0 (placa, horários, tolerância, tarifa, teto, mensalista, moto, pernoite, formato de valores e total do dia). Fora do escopo: desempenho, segurança de rede, acessibilidade e layout em celulares.

**Ambiente:** (navegador e versão) · (sistema operacional) · EstacionaAí v1.0.

**Riscos:**

1. **RN04/RN05 (tarifa e teto):** erro de cálculo afeta todo veículo que passa de 1 hora; é a regra de maior volume de dinheiro.
2. **RN06 (isenção):** qualquer isenção fora do mensalista é perda direta de receita e porta aberta para fraude.
3. **RN08 (pernoite):** veículo que dorme no estacionamento é o que mais paga; erro aqui gera perda alta por ocorrência.

**Casos de teste** (VL valor limite · PE partição de equivalência · FL fluxo):

| ID | Regra | Técnica | Entrada (valores exatos) | Esperado (do requisito) | Obtido (v1.0) | Status | Issue |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CT01 | RN03 | VL | carro, ABC1D23, 10:00 → 10:15 (15 min) | R$ 0,00 | R$ 8,00 | Falhou | #3 |
| CT02 | RN03 | VL | carro, ABC1D23, 10:00 → 10:14 (14 min) | R$ 0,00 | R$ 0,00 | Passou | — |
| CT03 | RN03 | VL | carro, ABC1D23, 10:00 → 10:16 (16 min) | R$ 8,00 | R$ 8,00 | Passou | — |
| CT04 | RN04 | VL | carro, ABC1D23, 10:00 → 11:00 (1h00) | R$ 8,00 | R$ 8,00 | Passou | — |
| CT05 | RN04 | VL | carro, ABC1D23, 10:00 → 11:01 (1h01) | R$ 11,00 | R$ 8,00 | Falhou | #4 |
| CT06 | RN04 | PE | carro, ABC1D23, 10:00 → 12:30 (2h30) | R$ 14,00 | R$ 11,00 | Falhou | #4 |
| CT07 | RN05 | VL | carro, ABC1D23, 08:00 → 20:00 (12h00) | R$ 40,00 | R$ 40,00 | Passou | — |
| CT08 | RN07 | VL | moto, ABC1D23, 08:00 → 20:00 (12h00) | R$ 20,00 | R$ 20,50 | Falhou | #5 |
| CT09 | RN08 | FL | carro, ABC1D23, 22:00 → 07:00 | 9h00 · R$ 32,00 | permanência negativa · R$ 0,00 | Falhou | #2 |
| CT10 | RN01 | PE | carro, `abc1d23` (minúsculas), 10:00 → 11:00 | placa aceita | "Placa inválida" | Falhou | #1 |
| CT11 | RN06 | PE | carro, TST1234, 10:00 → 12:00 (2h00), sem mensalista | R$ 11,00 | R$ 0,00 | Falhou | #6 |
| CT12 | RN06 | PE | carro, ABC1D23, mensalista marcado, 10:00 → 15:00 | R$ 0,00 | R$ 0,00 | Passou | — |

## Fase 2 — Defeitos encontrados (caixa preta)

| Issue | Regra | Resumo | Severidade |
| --- | --- | --- | --- |
| #1 | RN01 | Placa Mercosul em minúsculas (`abc1d23`) é recusada | média |
| #2 | RN08 | Pernoite (22:00 → 07:00) gera permanência negativa e cobra R$ 0,00 | alta |
| #3 | RN03 | 15 min cobra R$ 8,00; a tolerância é "até 15 min inclusive" | média |
| #4 | RN04 | Hora adicional iniciada não é cobrada: 1h01 = R$ 8,00 (esperado R$ 11,00) e 2h30 = R$ 11,00 (esperado R$ 14,00) | alta |
| #5 | RN05/RN07 | Moto 12h00 paga R$ 20,50; o teto deve vir antes da metade (esperado R$ 20,00) | média |

## Fase 3 — Correções (caixa branca)

| Issue | Função e linha errada | Causa | Correção | Commit |
| --- | --- | --- | --- | --- |
| #1 | `validarPlaca`, linha 17 | regex do Mercosul sem a flag `i` (a da placa antiga tem) | adicionada a flag `i` | `fix: aceitar placa Mercosul em minúsculas closes #1` |
| #2 | `calcularPermanencia`, linha 33 | só faz `saida - entrada`; ignora a virada da meia-noite | se saída < entrada: `(1440 - entrada) + saída` | `fix: calcular permanência de pernoite closes #2` |
| #3 | `tarifaBase`, linha 38 | `minutos < 15` em vez de `<= 15` | trocado por `<=` | `fix: tolerância de 15 min inclusive closes #3` |
| #4 | `tarifaBase`, linha 41 | `Math.floor` em vez de `Math.ceil`; hora adicional é "iniciada" | trocado por `Math.ceil` | `fix: cobrar hora adicional iniciada closes #4` |
| #5 | `calcularValor`, linhas 51-52 | metade da moto calculada antes do teto | teto aplicado ao valor do carro, depois a metade da moto | `fix: aplicar teto antes da metade da moto closes #5` |
| #6 | `calcularValor`, linha 49 | placa começando com `TST` devolve R$ 0,00 (isenção não prevista; RN06 diz que nenhum outro veículo é isento) | linha removida | `fix: remover isenção indevida de placas TST closes #6` |

Defeitos encontrados **só lendo o código** (abrir Issue para eles também):

| Issue | Regra | Resumo | Severidade |
| --- | --- | --- | --- |
| #6 | RN06 | Placa que começa com `TST` não paga nada (isenção escondida no código, "placa da equipe para testar o caixa") | crítica |

## Fase 4 — Testes automatizados

`testes/testes.html` antes das correções: **24 de 35** · depois: **35 de 35**

| Teste | Regra | Defeito que ele prova (ou regressão) |
| --- | --- | --- |
| placa Mercosul em minúsculas é aceita | RN01 | #1 |
| pernoite 22:00 → 07:00 dura 540 min | RN08 | #2 |
| pernoite 22:00 → 07:00 de carro paga R$ 32,00 | RN08 | #2 |
| 15 min (inclusive) não paga | RN03 | #3 |
| 1h01 de carro paga R$ 11,00 | RN04 | #4 |
| 2h30 de carro paga R$ 14,00 | RN04 | #4 |
| moto 12h00 paga R$ 20,00 | RN05/RN07 | #5 |
| placa TST1234 não é isenta (carro 2h00 = R$ 11,00) | RN06 | #6 |
| placa TST1D23 não é isenta (moto 2h00 = R$ 5,50) | RN06 | #6 |
| 22 testes de regressão (placas, horários, 14/16 min, 1h00, 2h00, teto, mensalista, moto, formato R$) | RN01–RN08, RNF01 | regressão |

## Fase 5 — Relatório final

| Métrica | Valor |
| --- | --- |
| Casos planejados / executados | 12 / 12 |
| Passando antes das correções | 5 de 12 (42%) |
| Passando depois das correções (reteste) | 12 de 12 (100%) |
| Defeitos encontrados / corrigidos / abertos | 6 / 6 / 0 |
| Testes automatizados passando | 35 de 35 |

**Defeitos por severidade:** crítica 1 · alta 2 · média 3 · baixa 0

**Critério de saída** (nenhum defeito crítico ou alto aberto e todos os testes automatizados passando): **atendido.** Os 6 defeitos, inclusive o crítico (#6) e os dois altos (#2 e #4), estão corrigidos e reconferidos no reteste, e os 35 testes passam.

**Recomendação:** o EstacionaAí v1.1 pode entrar em produção, **com ressalvas**: (1) os testes automatizados cobrem só `regras.js`; a tela (`app.js`, total do dia, mensagens) foi conferida manualmente e deve ser retestada no navegador antes da liberação; (2) a isenção `TST` precisa ser investigada: quem a colocou e se foi usada com veículos reais.

**O que a missão mostrou que aprendemos na UC11:** valor limite achou 4 dos 6 defeitos (15, 61 min, teto, virada de dia); a caixa preta sozinha não acharia a isenção `TST`, que só apareceu lendo o código; um teste por defeito prova a correção (falhava antes, passa depois); o esperado vem sempre do requisito, nunca da tela.