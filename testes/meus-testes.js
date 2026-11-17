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