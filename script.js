// script.js - Lógica do painel em JS puro

function atualizarHoraData() {
  const hora = document.getElementById('hora-atual');
  const data = document.getElementById('data-atual');
  if (!hora || !data) return;

  const agora = new Date();
  // Hora
  hora.textContent = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  // Data
  data.textContent = agora.toLocaleDateString('pt-BR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}
setInterval(atualizarHoraData, 1000);
atualizarHoraData();

// Lista de pacientes de exemplo para adicionar
const pacientesExemplo = [
  {
    nome: 'NOVO PACIENTE',
    avatar: 'NP',
    tipo: 'normal',
    gradiente: 'background: linear-gradient(135deg, var(--primary), var(--accent));',
    detalhes: '#24 · Dr. Souza · Consultório 4 · 3 min',
    badge: '<span class="badge badge-normal">NORMAL</span>',
    pos: 'Posição: '
  },
  {
    nome: 'PRIORIDADE TESTE',
    avatar: 'PT',
    tipo: 'prioridade',
    gradiente: 'background: linear-gradient(135deg, var(--accent), var(--accent-dark));',
    detalhes: '#25 · Dr. Silva · Consultório 1 · 2 min',
    badge: '<span class="badge badge-prioridade">PRIORIDADE</span>',
    pos: 'Posição: '
  },
  {
    nome: 'RETORNO TESTE',
    avatar: 'RT',
    tipo: 'retorno',
    gradiente: 'background: linear-gradient(135deg, var(--accent), var(--muted));',
    detalhes: '#26 · Dr. Costa · Consultório 2 · 1 min',
    badge: '<span class="badge badge-retorno">RETORNO</span>',
    pos: 'Posição: '
  }
];
let pacienteId = 4;

function atualizarContadorFila() {
  const lista = document.getElementById('fila-lista');
  const contador = document.getElementById('fila-quantidade');
  if (contador) {
    const total = lista.querySelectorAll('.fila-item').length;
    contador.textContent = total + (total === 1 ? ' paciente' : ' pacientes');
  }
}

function adicionarPacienteFila() {
  const lista = document.getElementById('fila-lista');
  // Alterna entre exemplos
  const exemplo = pacientesExemplo[(pacienteId-1) % pacientesExemplo.length];
  const div = document.createElement('div');
  div.className = `fila-item ${exemplo.tipo} anim-enter`;
  div.id = `paciente-${pacienteId}`;
  div.innerHTML = `
    <div class="avatar-fila" style="${exemplo.gradiente}">${exemplo.avatar}</div>
    <div class="fila-info">
      <div class="fila-nome">${exemplo.nome}</div>
      <div class="fila-detalhes">${exemplo.detalhes}</div>
    </div>
    ${exemplo.badge}
    <span class="fila-pos">Posição: ${lista.children.length + 1}</span>
  `;
  lista.appendChild(div);
  setTimeout(() => {
    div.classList.remove('anim-enter');
  }, 500);
  pacienteId++;
  atualizarContadorFila();
}

function removerPacienteFila() {
  const lista = document.getElementById('fila-lista');
  const primeiro = lista.querySelector('.fila-item');
  if (!primeiro) return;
  primeiro.classList.add('anim-exit');
  setTimeout(() => {
    if (primeiro.parentNode) primeiro.parentNode.removeChild(primeiro);
    atualizarContadorFila();
    // Atualiza posições
    const itens = lista.querySelectorAll('.fila-item');
    itens.forEach((item, idx) => {
      const pos = item.querySelector('.fila-pos');
      if (pos) pos.textContent = 'Posição: ' + (idx + 1);
    });
  }, 500);
}

// Lista de avisos de exemplo para adicionar
const avisosExemplo = [
  {
    tipo: 'urgente',
    icone: '<i class="fa-solid fa-circle-exclamation"></i>',
    titulo: 'Aviso Urgente',
    badge: '<span class="badge badge-urgente">URGENTE</span>',
    msg: 'Este é um aviso urgente de teste.',
    hora: '15:00'
  },
  {
    tipo: 'info',
    icone: '<i class="fa-solid fa-circle-info"></i>',
    titulo: 'Aviso Informativo',
    badge: '<span class="badge badge-info">INFO</span>',
    msg: 'Este é um aviso informativo de teste.',
    hora: '15:01'
  },
  {
    tipo: 'atencao',
    icone: '<i class="fa-solid fa-triangle-exclamation"></i>',
    titulo: 'Aviso de Atenção',
    badge: '<span class="badge badge-atencao">ATENÇÃO</span>',
    msg: 'Este é um aviso de atenção de teste.',
    hora: '15:02'
  }
];
let avisoId = 4;

function adicionarAviso() {
  const lista = document.getElementById('avisos-lista');
  // Antes do bloco de emergência
  const emergencia = lista.querySelector('.aviso-emergencia');
  const exemplo = avisosExemplo[(avisoId-1) % avisosExemplo.length];
  const div = document.createElement('div');
  div.className = `aviso-item ${exemplo.tipo} anim-enter`;
  div.id = `aviso-${avisoId}`;
  div.innerHTML = `
    <div class="aviso-topo">
      <span class="aviso-titulo">${exemplo.icone} ${exemplo.titulo}</span>
      ${exemplo.badge}
    </div>
    <div class="aviso-msg">${exemplo.msg}</div>
    <div class="aviso-hora"><i class=\"fa-regular fa-clock\"></i> ${exemplo.hora}</div>
  `;
  lista.insertBefore(div, emergencia);
  setTimeout(() => {
    div.classList.remove('anim-enter');
  }, 500);
  avisoId++;
}

function removerAviso() {
  const lista = document.getElementById('avisos-lista');
  // Não remove o bloco de emergência
  const primeiro = lista.querySelector('.aviso-item');
  if (!primeiro) return;
  primeiro.classList.add('anim-exit');
  setTimeout(() => {
    if (primeiro.parentNode) primeiro.parentNode.removeChild(primeiro);
  }, 500);
}

function chamarNovoPaciente() {
  const card = document.querySelector('.paciente-card-destaque');
  if (!card) return;
  card.classList.add('paciente-pulse');
  setTimeout(() => {
    card.classList.remove('paciente-pulse');
  }, 3000);
} 

// Lista de médicos de exemplo para adicionar
const medicosExemplo = [
  {
    tipo: 'ocupado',
    avatar: 'MG',
    gradiente: 'background: linear-gradient(135deg, var(--accent), var(--accent-dark));',
    nome: 'Dr. Magno <i class="fa-solid fa-triangle-exclamation"></i>',
    detalhes: 'Clínico Geral · Consultório 4',
    atendendo: 'Atendendo: Paciente Teste',
    proximo: 'Próxima: Maria',
    badge: '<span class="badge badge-ocupado">OCUPADO</span>',
    status: '<span class="medico-status"><i class=\"fa-regular fa-clock\"></i> Em atendimento</span>'
  },
  {
    tipo: 'disponivel',
    avatar: 'AL',
    gradiente: 'background: linear-gradient(135deg, var(--primary), var(--accent));',
    nome: 'Dr. Alex <i class="fa-regular fa-circle-check"></i>',
    detalhes: 'Cardiologista · Consultório 5',
    atendendo: '',
    proximo: 'Próximo: João',
    badge: '<span class="badge badge-disponivel">DISPONÍVEL</span>',
    status: ''
  },
  {
    tipo: 'intervalo',
    avatar: 'CA',
    gradiente: 'background: linear-gradient(135deg, var(--muted), #fff);',
    nome: 'Dra. Carla <i class="fa-solid fa-mug-saucer"></i>',
    detalhes: 'Pediatra · Consultório 6',
    atendendo: '',
    proximo: '',
    badge: '<span class="badge badge-intervalo">INTERVALO</span>',
    status: ''
  }
];
let medicoId = 4;

function adicionarMedico() {
  const lista = document.getElementById('medicos-lista');
  const exemplo = medicosExemplo[(medicoId-1) % medicosExemplo.length];
  const div = document.createElement('div');
  div.className = `medico-item ${exemplo.tipo} anim-enter`;
  div.id = `medico-${medicoId}`;
  div.innerHTML = `
    <div class="avatar-medico" style="${exemplo.gradiente}">${exemplo.avatar}</div>
    <div class="medico-info">
      <div class="medico-nome">${exemplo.nome}</div>
      <div class="medico-detalhes">${exemplo.detalhes}</div>
      ${exemplo.atendendo ? `<div class=\"medico-atendendo\">${exemplo.atendendo}</div>` : ''}
      ${exemplo.proximo ? `<div class=\"medico-proximo\">${exemplo.proximo}</div>` : ''}
    </div>
    ${exemplo.badge}
    ${exemplo.status}
  `;
  lista.appendChild(div);
  setTimeout(() => {
    div.classList.remove('anim-enter');
  }, 500);
  medicoId++;
}

function removerMedico() {
  const lista = document.getElementById('medicos-lista');
  const primeiro = lista.querySelector('.medico-item');
  if (!primeiro) return;
  primeiro.classList.add('anim-exit');
  setTimeout(() => {
    if (primeiro.parentNode) primeiro.parentNode.removeChild(primeiro);
  }, 500);
} 