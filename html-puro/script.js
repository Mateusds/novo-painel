document.addEventListener('DOMContentLoaded', function() {
  const avisos = document.getElementById('slide-avisos');
  const medicos = document.getElementById('slide-medicos');
  if (!avisos || !medicos) return;
  let current = 0;
  const slides = [avisos, medicos];
  slides[1].classList.add('hidden');
  setInterval(() => {
    slides[current].classList.add('hidden');
    current = (current + 1) % slides.length;
    slides[current].classList.remove('hidden');
  }, 5000);
}); 