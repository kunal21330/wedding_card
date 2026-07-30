const weddingDate = new Date('2027-02-14T19:30:00+05:30');
const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };

function updateCountdown() {
  let remaining = Math.max(0, weddingDate - new Date());
  Object.entries(units).forEach(([name, duration]) => {
    const value = Math.floor(remaining / duration);
    remaining %= duration;
    document.getElementById(name).textContent = String(value).padStart(name === 'days' ? 3 : 2, '0');
  });
}
updateCountdown(); setInterval(updateCountdown, 1000);

let audioContext, masterGain, musicTimer, musicOn = false;
const melody = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
function chime(note, when) { const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(); oscillator.type = 'sine'; oscillator.frequency.value = note; gain.gain.setValueAtTime(0, when); gain.gain.linearRampToValueAtTime(.038, when + .08); gain.gain.exponentialRampToValueAtTime(.001, when + 1.9); oscillator.connect(gain).connect(masterGain); oscillator.start(when); oscillator.stop(when + 2); }
function playPhrase() { if (!musicOn) return; const start = audioContext.currentTime + .05; melody.forEach((note, index) => chime(note, start + index * .48)); musicTimer = setTimeout(playPhrase, melody.length * 480 + 700); }
function setMusic(shouldPlay) { if (!audioContext) { audioContext = new (window.AudioContext || window.webkitAudioContext)(); masterGain = audioContext.createGain(); masterGain.gain.value = .8; masterGain.connect(audioContext.destination); } musicOn = shouldPlay; const toggle = document.getElementById('music-toggle'); toggle.classList.toggle('playing', musicOn); toggle.setAttribute('aria-pressed', String(musicOn)); toggle.setAttribute('aria-label', musicOn ? 'Pause background music' : 'Play background music'); if (musicOn) { audioContext.resume(); playPhrase(); } else clearTimeout(musicTimer); }
document.getElementById('open-invitation').addEventListener('click', () => { document.body.classList.add('invitation-open'); setMusic(true); });
document.getElementById('music-toggle').addEventListener('click', () => setMusic(!musicOn));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('copy-button').addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  document.getElementById('copy-button').textContent = 'Link copied!';
  setTimeout(() => document.getElementById('copy-button').textContent = 'Copy link', 2000);
});
document.getElementById('share-button').addEventListener('click', async () => {
  if (navigator.share) await navigator.share({ title: 'Vishal weds Pari', text: 'Join us in celebrating Vishal & Pari!', url: location.href });
  else document.getElementById('copy-button').click();
});
