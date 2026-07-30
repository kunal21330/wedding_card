/* ==========================================================================
   VISHAL WEDS PARI — DIGITAL INVITATION LOGIC
   5-6s Romantic Bollywood Intro, Parallax Semi-Circle Photo Arc, Audio & Events
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. COUNTDOWN TIMER
  const weddingDate = new Date('2027-02-14T19:30:00+05:30');
  const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };

  function updateCountdown() {
    let remaining = Math.max(0, weddingDate - new Date());
    Object.entries(units).forEach(([name, duration]) => {
      const value = Math.floor(remaining / duration);
      remaining %= duration;
      const el = document.getElementById(name);
      if (el) {
        el.textContent = String(value).padStart(name === 'days' ? 3 : 2, '0');
      }
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // 2. WEB AUDIO API SYNTHESIZER (5-6 Sec Romantic Bollywood Tune + Ambient)
  let audioCtx, masterGain, musicPlaying = false, musicTimer;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.55;
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize Wax Crack Sound
  function playCrackSound() {
    const ctx = initAudio();
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(3, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    noise.start(now);
  }

  // 5-6 SECOND ROMANTIC BOLLYWOOD TUNE INTRO (Raga Yaman / Pahadi Romantic Melody)
  // Notes: E4, F#4, G#4, B4, C#5, B4, G#4, F#4, E4
  const bollywoodMelody = [
    { freq: 329.63, dur: 0.6, delay: 0.0 },   // E4
    { freq: 369.99, dur: 0.6, delay: 0.65 },  // F#4
    { freq: 415.30, dur: 0.7, delay: 1.3 },   // G#4
    { freq: 493.88, dur: 0.8, delay: 2.05 },  // B4 (Soaring)
    { freq: 554.37, dur: 0.9, delay: 2.9 },   // C#5 (Peak emotion)
    { freq: 493.88, dur: 0.6, delay: 3.85 },  // B4
    { freq: 415.30, dur: 0.6, delay: 4.5 },   // G#4
    { freq: 369.99, dur: 0.6, delay: 5.1 },   // F#4
    { freq: 329.63, dur: 1.0, delay: 5.7 }    // E4 (Resolve)
  ];

  function playBollywoodIntro() {
    const ctx = initAudio();
    const now = ctx.currentTime;

    // Background Warm Chord Pad
    [164.81, 246.94, 329.63].forEach((f) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.04, now + 1.0);
      g.gain.linearRampToValueAtTime(0.001, now + 6.2);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + 6.3);
    });

    // Flute / Sitar Style Lead Melody
    bollywoodMelody.forEach((item) => {
      const startTime = now + item.delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // Flute/Sitar harmonic
      osc.frequency.setValueAtTime(item.freq, startTime);
      
      // Meend (glide effect)
      osc.frequency.exponentialRampToValueAtTime(item.freq * 1.01, startTime + item.dur);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.09, startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.dur);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + item.dur + 0.05);
    });

    // Schedule ambient background loop after 6.2 seconds
    musicTimer = setTimeout(() => {
      if (musicPlaying) playAmbientLoop();
    }, 6200);
  }

  // Soft Background Ambient Loop
  const ambientNotes = [261.63, 329.63, 392.00, 440.00, 523.25];
  function playAmbientLoop() {
    if (!musicPlaying) return;
    const ctx = initAudio();
    const now = ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const freq = ambientNotes[Math.floor(Math.random() * ambientNotes.length)];
      const startTime = now + i * 0.8;
      const duration = 1.4;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.04, startTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
    }

    musicTimer = setTimeout(playAmbientLoop, 4500);
  }

  function toggleMusic(play) {
    musicPlaying = play;
    const btn = document.getElementById('music-toggle');
    if (btn) {
      btn.classList.toggle('playing', play);
      btn.setAttribute('aria-pressed', String(play));
    }
    clearTimeout(musicTimer);
    if (play) {
      initAudio();
      playBollywoodIntro();
    }
  }

  const musicBtn = document.getElementById('music-toggle');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => toggleMusic(!musicPlaying));
  }


  // 3. ENVELOPE OPENING
  const entryScreen = document.getElementById('entry-screen');
  const waxSealContainer = document.getElementById('wax-seal-container');
  const siteShell = document.getElementById('site-shell');
  let isOpening = false;

  function openInvitation() {
    if (isOpening) return;
    isOpening = true;

    playCrackSound();
    entryScreen.classList.add('opening');

    setTimeout(() => {
      siteShell.classList.add('visible');
    }, 700);

    setTimeout(() => {
      entryScreen.classList.add('opened');
      toggleMusic(true); // Plays 5-6s Bollywood romantic intro
    }, 1300);
  }

  if (waxSealContainer) {
    waxSealContainer.addEventListener('click', openInvitation);
    
    let startY = 0;
    waxSealContainer.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    waxSealContainer.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      if (startY - endY > 25 || Math.abs(startY - endY) < 10) {
        openInvitation();
      }
    });

    waxSealContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        openInvitation();
      }
    });
  }


  // 4. PARALLAX SEMI-CIRCLE PHOTO ARC ENGINE
  const arcPhotos = document.querySelectorAll('.arc-photo');
  const arcViewport = document.getElementById('semi-circle-viewport');

  function updateArcParallax() {
    if (!arcViewport) return;
    const rect = arcViewport.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Progress of viewport through screen (0 to 1)
    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
    const scrollFactor = Math.max(-0.5, Math.min(0.5, progress - 0.5));

    arcPhotos.forEach((photo) => {
      const baseAngle = parseFloat(photo.getAttribute('data-angle')) || 0;
      const depth = parseFloat(photo.getAttribute('data-depth')) || 0.1;

      // Calculate dynamic angle and Y offset on scroll
      const currentAngle = baseAngle + scrollFactor * 25 * (baseAngle / 45 || 1);
      const translateY = Math.abs(currentAngle) * 1.8 + scrollFactor * depth * 120;
      const scale = 1 + (0.15 - Math.abs(currentAngle) * 0.002);

      photo.style.transform = `
        translateX(-50%) 
        rotate(${currentAngle}deg) 
        translateY(-${160 + translateY}px) 
        rotate(${-currentAngle}deg) 
        scale(${Math.max(0.85, scale)})
      `;
    });
  }

  window.addEventListener('scroll', updateArcParallax, { passive: true });
  window.addEventListener('resize', updateArcParallax);
  updateArcParallax();


  // 5. CANVAS AMBIENT PETALS & DUST
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 2,
      speedY: Math.random() * 0.7 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#D4AF37' : '#F4D0D8'
    }));

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.4;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }


  // 6. PHOTO LIGHTBOX
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;

  function showLightbox(index) {
    currentGalleryIndex = index;
    const item = arcPhotos[index];
    if (!item) return;

    const img = item.querySelector('img');
    const label = item.querySelector('.photo-label');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = label ? label.textContent : '';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
  }

  function hideLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
  }

  arcPhotos.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + arcPhotos.length) % arcPhotos.length;
    showLightbox(currentGalleryIndex);
  });
  if (lightboxNext) lightboxNext.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % arcPhotos.length;
    showLightbox(currentGalleryIndex);
  });

  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });


  // 7. ADD TO CALENDAR GENERATOR
  const eventData = {
    mehendi: {
      title: "Vishal & Pari — Mehendi Ceremony",
      start: "20270212T160000",
      end: "20270212T200000",
      location: "The Palace Lawns & Royal Ballroom, Jaipur, Rajasthan",
      details: "Join us for Henna, folk music, and celebration!"
    },
    sangeet: {
      title: "Vishal & Pari — Sangeet & Cocktail",
      start: "20270213T190000",
      end: "20270213T235900",
      location: "The Palace Lawns & Royal Ballroom, Jaipur, Rajasthan",
      details: "An evening of dance performances and music!"
    },
    wedding: {
      title: "Vishal weds Pari — Wedding Ceremony (Phere)",
      start: "20270214T183000",
      end: "20270214T233000",
      location: "The Palace Lawns & Royal Ballroom, Jaipur, Rajasthan",
      details: "Baraat at 6:30 PM, Phere at 7:30 PM followed by Dinner."
    },
    reception: {
      title: "Vishal & Pari — Wedding Reception",
      start: "20270215T200000",
      end: "20270215T235900",
      location: "The Palace Lawns & Royal Ballroom, Jaipur, Rajasthan",
      details: "Formal Reception Banquet for Vishal & Pari."
    }
  };

  document.querySelectorAll('.cal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-event');
      const ev = eventData[type];
      if (!ev) return;

      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vishal and Pari Wedding Invitation//EN
BEGIN:VEVENT
SUMMARY:${ev.title}
DTSTART;TZID=Asia/Kolkata:${ev.start}
DTEND;TZID=Asia/Kolkata:${ev.end}
LOCATION:${ev.location}
DESCRIPTION:${ev.details}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `${type}-vishal-pari.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });


  // 8. SOCIAL SHARING & LINK COPY
  const waShareBtn = document.getElementById('wa-share-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');

  if (waShareBtn) {
    waShareBtn.addEventListener('click', () => {
      const shareText = `*Vishal weds Pari* 💍\n\nTogether with our families, we joyfully invite you to celebrate our wedding in Jaipur on February 14, 2027!\n\nView the invitation details here: ${window.location.href}`;
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(waUrl, '_blank');
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span>Copied!</span> ✅';
        setTimeout(() => copyLinkBtn.innerHTML = originalText, 2000);
      } catch (err) {
        alert('Invitation link: ' + window.location.href);
      }
    });
  }


  // 9. INTERSECTION OBSERVER
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});
