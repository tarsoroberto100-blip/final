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

