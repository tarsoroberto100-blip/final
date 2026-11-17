// EstacionaAí — tela

let movimento = [];
const $ = id => document.getElementById(id);

function mensagem(texto, tipo) {
  $('mensagem').textContent = texto;
  $('mensagem').className = 'mensagem ' + tipo;
}

function lerFormulario() {
  return {
    placa: $('placa').value.trim().toUpperCase(),
    placaDigitada: $('placa').value,
    tipo: $('tipo').value,
    entrada: $('entrada').value.trim(),
    saida: $('saida').value.trim(),
    mensalista: $('mensalista').checked
  };
}

function calcular() {
  const d = lerFormulario();
  if (!validarPlaca(d.placaDigitada)) { mensagem('Placa inválida. Use o padrão ABC-1234 ou ABC1D23.', 'erro'); return null; }
  if (lerHorario(d.entrada) === null || lerHorario(d.saida) === null) { mensagem('Horário inválido. Use HH:MM, de 00:00 a 23:59.', 'erro'); return null; }
  const minutos = calcularPermanencia(d.entrada, d.saida);
  if (minutos === 0) { mensagem('O horário de saída é igual ao de entrada.', 'erro'); return null; }
  d.minutos = minutos;
  d.valor = calcularValor(d.placa, minutos, d.tipo, d.mensalista);
  return d;
}

$('btn-calcular').addEventListener('click', () => {
  const d = calcular();
  if (!d) { $('valor').textContent = ''; return; }
  mensagem('', '');
  $('valor').textContent = 'Permanência ' + formatarPermanencia(d.minutos) + ' · Valor: ' + formatarReais(d.valor);
});

$('form-saida').addEventListener('submit', ev => {
  ev.preventDefault();
  const d = calcular();
  if (!d) return;
  movimento.push(d);
  desenhar();
  mensagem('Saída registrada: ' + d.placa + ' · ' + formatarReais(d.valor), 'ok');
  $('valor').textContent = '';
  $('form-saida').reset();
});

function desenhar() {
  const lista = $('lista');
  lista.innerHTML = '';
  $('vazio').style.display = movimento.length ? 'none' : 'block';
  let total = 0;
  movimento.forEach(d => {
    total += d.valor;
    const tr = document.createElement('tr');
    [d.placa, d.tipo === 'moto' ? 'Moto' : 'Carro', d.entrada, d.saida, formatarPermanencia(d.minutos), d.mensalista ? 'Mensalista' : formatarReais(d.valor)].forEach(t => {
      const td = document.createElement('td'); td.textContent = t; tr.appendChild(td);
    });
    lista.appendChild(tr);
  });
  $('total').textContent = formatarReais(total);
}

desenhar();
