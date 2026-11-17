// EstacionaAí — testes automatizados
//
// Cada teste segue o padrão: preparar → agir → verificar.
//   teste('o que o teste confere', () => {
//     const minutos = 60;                                              // preparar
//     const valor = calcularValor('ABC1D23', minutos, 'carro', false); // agir
//     return igual(valor, 8);                                          // verificar (esperado do REQUISITO)
//   });
//
// Funções disponíveis (app/js/regras.js):
//   validarPlaca(placa)                              → true ou false
//   lerHorario('08:30')                               → minutos desde 00:00 (ou null)
//   calcularPermanencia('08:00', '09:30')            → minutos
//   calcularValor(placa, minutos, tipo, mensalista)  → valor em reais (tipo: 'carro' ou 'moto')
//
// Os 3 testes abaixo são exemplos. Escrevam os de vocês embaixo deles.

teste('RN04 — carro por 1h00 paga R$ 8,00', () => {
  return igual(calcularValor('ABC1D23', 60, 'carro', false), 8);
});

teste('RN01 — placa antiga com hífen é aceita', () => {
  return igual(validarPlaca('ABC-1234'), true);
});

teste('RN06 — mensalista não paga', () => {
  return igual(calcularValor('ABC1D23', 300, 'carro', true), 0);
});

// ===== Testes do grupo (um por defeito corrigido, e outros de regressão) =====

// --- Um teste por defeito corrigido (falhavam antes, passam depois) ---

teste('RN01 — placa Mercosul em minúsculas é aceita (abc1d23)', () => {
  return igual(validarPlaca('abc1d23'), true);
});

teste('RN08 — pernoite 22:00 → 07:00 dura 540 min (9h00)', () => {
  return igual(calcularPermanencia('22:00', '07:00'), 540);
});

teste('RN08 — pernoite 22:00 → 07:00 de carro paga R$ 32,00', () => {
  const minutos = calcularPermanencia('22:00', '07:00');
  return igual(calcularValor('ABC1D23', minutos, 'carro', false), 32);
});

teste('RN03 — tolerância: 15 min (inclusive) não paga', () => {
  return igual(calcularValor('ABC1D23', 15, 'carro', false), 0);
});

teste('RN04 — 1h01 de carro paga R$ 11,00 (hora adicional iniciada)', () => {
  return igual(calcularValor('ABC1D23', 61, 'carro', false), 11);
});

teste('RN04 — 2h30 de carro paga R$ 14,00', () => {
  return igual(calcularValor('ABC1D23', 150, 'carro', false), 14);
});

teste('RN07 — moto por 12h00 paga R$ 20,00 (teto antes da metade)', () => {
  return igual(calcularValor('ABC1D23', 720, 'moto', false), 20);
});

teste('RN06 — placa iniciada por TST não é isenta (carro 2h00 = R$ 11,00)', () => {
  return igual(calcularValor('TST1234', 120, 'carro', false), 11);
});

teste('RN06 — placa TST em moto não é isenta (moto 2h00 = R$ 5,50)', () => {
  return igual(calcularValor('TST1D23', 120, 'moto', false), 5.5);
});

// --- Regressão (já funcionava; não pode quebrar) ---

teste('RN01 — placa antiga sem hífen é aceita', () => igual(validarPlaca('ABC1234'), true));
teste('RN01 — placa antiga em minúsculas é aceita', () => igual(validarPlaca('abc-1234'), true));
teste('RN01 — placa Mercosul maiúscula é aceita', () => igual(validarPlaca('ABC1D23'), true));
teste('RN01 — placa com 2 letras é recusada', () => igual(validarPlaca('AB-12345'), false));
teste('RN01 — placa Mercosul com letra no lugar errado é recusada', () => igual(validarPlaca('ABC12D3'), false));
teste('RN01 — placa vazia é recusada', () => igual(validarPlaca(''), false));

teste('RN02 — 23:59 é horário válido (1439 min)', () => igual(lerHorario('23:59'), 1439));
teste('RN02 — 24:00 é recusado', () => igual(lerHorario('24:00'), null));
teste('RN02 — 12:60 é recusado', () => igual(lerHorario('12:60'), null));
teste('RN02 — formato sem zero à esquerda (8:30) é recusado', () => igual(lerHorario('8:30'), null));
teste('RN02 — saída igual à entrada dá permanência 0', () => igual(calcularPermanencia('10:00', '10:00'), 0));

teste('RN03 — 14 min não paga', () => igual(calcularValor('ABC1D23', 14, 'carro', false), 0));
teste('RN03 — 16 min paga a primeira hora (R$ 8,00)', () => igual(calcularValor('ABC1D23', 16, 'carro', false), 8));
teste('RN04 — 2h00 de carro paga R$ 11,00', () => igual(calcularValor('ABC1D23', 120, 'carro', false), 11));
teste('RN05 — carro por 12h00 paga o teto de R$ 40,00', () => igual(calcularValor('ABC1D23', 720, 'carro', false), 40));
teste('RN05 — carro por 11h00 paga R$ 38,00 (abaixo do teto)', () => igual(calcularValor('ABC1D23', 660, 'carro', false), 38));
teste('RN06 — mensalista de moto também não paga', () => igual(calcularValor('ABC1D23', 300, 'moto', true), 0));
teste('RN07 — moto por 1h00 paga R$ 4,00', () => igual(calcularValor('ABC1D23', 60, 'moto', false), 4));
teste('RN07 — moto por 1h01 paga R$ 5,50', () => igual(calcularValor('ABC1D23', 61, 'moto', false), 5.5));
teste('RN08 — 23:59 → 00:00 dura 1 min', () => igual(calcularPermanencia('23:59', '00:00'), 1));
teste('RN08 — saída maior que a entrada não é pernoite (08:00 → 09:30 = 90 min)', () => igual(calcularPermanencia('08:00', '09:30'), 90));
teste('RNF01 — valor formatado em reais (5,5 → R$ 5,50)', () => igual(formatarReais(5.5), 'R$ 5,50'));
teste('RNF01 — zero formatado como R$ 0,00', () => igual(formatarReais(0), 'R$ 0,00'));