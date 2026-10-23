const sportsData = [
  {
    id: 'futsal',
    name: 'Futsal Profesional',
    icon: '⚽',
    desc: 'Cancha reglamentaria con superficie de alta calidad y excelente rebote.',
    price: 'Completo: $80.000'
  },
  {
    id: 'basquet',
    name: 'Básquet Oficial',
    icon: '🏀',
    desc: 'Piso flotante profesional, aros rebatibles y marcación oficial.',
    price: 'Completo $80k | Parcial $40k'
  },
  {
    id: 'voley',
    name: 'Vóley Reglamentario',
    icon: '🏐',
    desc: 'Espacio óptimo con altura libre superior y red profesional ajustable.',
    price: 'Completo $80k | Parcial $40k'
  }
];

function renderSports() {
  const container = document.getElementById('sports-grid-container');
  if (!container) return;

  container.innerHTML = sportsData.map(sport => `
    <div class="sport-card">
      <div>
        <div class="sport-icon">${sport.icon}</div>
        <h4>${sport.name}</h4>
        <p>${sport.desc}</p>
      </div>
      <div class="sport-meta">
        <span class="sport-price">${sport.price}</span>
        <button class="btn-select-sport" onclick="selectSportFromCard('${sport.name}')">Reservar</button>
      </div>
    </div>
  `).join('');
}

function selectSportFromCard(sportName) {
  const select = document.getElementById('res-sport');
  if (select) {
    select.value = sportName;
    document.querySelector('.reservation-card').scrollIntoView({ behavior: 'smooth' });
  }
}

function selectModality(modalityName) {
  const selectMod = document.getElementById('res-modality');
  if (selectMod) {
    selectMod.value = modalityName;
    document.querySelector('.reservation-card').scrollIntoView({ behavior: 'smooth' });
  }
}

function generateReservation(event) {
  event.preventDefault();

  const sport = document.getElementById('res-sport').value;
  const court = document.getElementById('res-court').value;
  const modality = document.getElementById('res-modality').value;
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const name = document.getElementById('res-name').value.trim();

  if (!date || !name) {
    alert('Por favor complete todos los campos obligatorios.');
    return;
  }

  // Formatear mensaje para WhatsApp institucional
  let message = `🏟️ *SOLICITUD DE TURNO - ARENA PARANÁ SPORT*\n`;
  message += `📍 _Ubicación: Juan Morath 10, Paraná_\n\n`;
  message += `⚽ *Disciplina:* ${sport}\n`;
  message += `🏟️ *Cancha:* ${court}\n`;
  message += `💳 *Modalidad:* ${modality}\n`;
  message += `📅 *Fecha:* ${date}\n`;
  message += `⏰ *Horario:* ${time}\n`;
  message += `👤 *Responsable:* ${name}\n\n`;
  message += `_Solicito confirmación de disponibilidad para concretar la reserva._`;

  const phoneNumber = '5493436131681'; 
  const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  window.open(waUrl, '_blank');
}

// Inicialización
renderSports();

const dateInput = document.getElementById('res-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  dateInput.min = today;
}