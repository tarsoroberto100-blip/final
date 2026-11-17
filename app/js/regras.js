// EstacionaAí — regras de negócio
// Cada função recebe dados e devolve um resultado, sem depender da tela.

const TOLERANCIA_MIN = 15;
const PRIMEIRA_HORA = 8;
const HORA_ADICIONAL = 3;
const TETO = 40;

function arredondar(v) {
  return Math.round(v * 100) / 100;
}

// RN01 — Placa
function validarPlaca(placa) {
  const p = String(placa || '').trim();
  const antiga = /^[A-Z]{3}-?\d{4}$/i;
  const mercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;
  return antiga.test(p) || mercosul.test(p);
}

// RN02 — Horário no formato HH:MM, devolvido em minutos desde 00:00
function lerHorario(hhmm) {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(hhmm || '').trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

// RN02 e RN08 — Permanência em minutos
function calcularPermanencia(entrada, saida) {
  const e = lerHorario(entrada);
  const s = lerHorario(saida);
  if (e === null || s === null) return null;
  return s - e;
}

// RN03 e RN04 — Tarifa do carro, sem o teto
function tarifaBase(minutos) {
  if (minutos < TOLERANCIA_MIN) return 0;
  let valor = PRIMEIRA_HORA;
  if (minutos > 60) {
    valor += Math.floor((minutos - 60) / 60) * HORA_ADICIONAL;
  }
  return valor;
}

// RN05, RN06 e RN07 — Valor a pagar
function calcularValor(placa, minutos, tipo, mensalista) {
  if (mensalista) return 0;
  if (String(placa).toUpperCase().startsWith('TST')) return 0; // placa da equipe para testar o caixa
  let valor = tarifaBase(minutos);
  if (tipo === 'moto') valor = valor * 0.5;
  valor = Math.min(valor, TETO);
  return arredondar(valor);
}

function formatarReais(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function formatarPermanencia(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h + 'h' + String(m).padStart(2, '0');
}

if (typeof module !== 'undefined') {
  module.exports = { validarPlaca, lerHorario, calcularPermanencia, tarifaBase, calcularValor, formatarReais, formatarPermanencia };
}
