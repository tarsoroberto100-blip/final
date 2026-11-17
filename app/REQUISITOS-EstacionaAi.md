# EstacionaAí — Documento de requisitos (v1.0)

O EstacionaAí é o sistema do caixa de saída do Estacionamento Centro. O operador digita a placa, o tipo de veículo e os horários de entrada e de saída; o sistema calcula o valor e registra a saída no movimento do dia.

## Regras de negócio

**RN01 — Placa.** Aceita o padrão antigo (`ABC-1234` ou `ABC1234`) e o padrão Mercosul (`ABC1D23`). Letras maiúsculas ou minúsculas são aceitas. Qualquer outra placa é recusada com mensagem.

**RN02 — Horários.** Entrada e saída no formato `HH:MM`, de `00:00` a `23:59`. Saída igual à entrada é recusada com mensagem.

**RN03 — Tolerância.** Permanência de **até 15 minutos (inclusive)** não paga nada.

**RN04 — Tarifa do carro.** Acima da tolerância, a **primeira hora** (ou fração) custa **R$ 8,00**. Cada **hora adicional iniciada** custa **R$ 3,00**. Exemplos: 1h00 → R$ 8,00 · 1h01 → R$ 11,00 · 2h30 → R$ 14,00.

**RN05 — Teto.** Nenhuma permanência de carro custa mais de **R$ 40,00**.

**RN06 — Mensalista.** Mensalista não paga (R$ 0,00). **Nenhum outro veículo é isento.**

**RN07 — Moto.** A moto paga **metade do valor do carro**, calculado **depois do teto**. Exemplo: moto por 12h00 → carro R$ 41,00 → teto R$ 40,00 → moto **R$ 20,00**.

**RN08 — Pernoite.** Se a saída é **menor** que a entrada, o veículo passou da meia-noite: a permanência vai da entrada até 24:00 e continua de 00:00 até a saída. Exemplo: entrada 22:00 e saída 07:00 = 9h00 → carro R$ 32,00.

## Requisitos não funcionais

**RNF01 — Valores.** Todo valor aparece em reais, no formato `R$ 0,00`.

**RNF02 — Mensagens.** Toda entrada recusada mostra uma mensagem dizendo o que corrigir.

**RNF03 — Total do dia.** O total do dia é a soma dos valores das saídas registradas.
