/* ==========================================================================
   SOLUWAN ASSISTÊNCIA TÉCNICA (GRUPO ENGEFER)
   Arquivo JavaScript Principal & Utilitários Globais (main.js)
   ========================================================================== */

// 1. CONFIGURAÇÃO CENTRALIZADA DE ATENDIMENTO WHATSAPP
// Substitua o número abaixo pelo número real de WhatsApp quando disponível.
const WHATSAPP_NUMBER = "5521964051803"; // Formato: Código do País (55) + DDD + Número
const WHATSAPP_DEFAULT_MSG = "Olá! Vim pelo site da Assistência Técnica Soluwan e gostaria de obter informações sobre um atendimento.";

/**
 * Retorna a URL formatada e codificada para abertura do WhatsApp.
 * @param {string} customMessage - Mensagem opcional personalizada
 * @returns {string} Link pronto wa.me
 */
function getWhatsAppUrl(customMessage) {
  const message = customMessage || WHATSAPP_DEFAULT_MSG;
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
}

/**
 * Injeta automaticamente o Botão Flutuante de WhatsApp em todas as páginas
 */
function renderWhatsAppButton() {
  // Evita duplicar se o elemento já existir no HTML
  if (document.getElementById('whatsapp-float-component')) return;

  const container = document.createElement('div');
  container.id = 'whatsapp-float-component';
  container.className = 'whatsapp-float-container';

  const link = document.createElement('a');
  link.className = 'whatsapp-float-btn';
  link.href = getWhatsAppUrl();
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Falar com atendimento pelo WhatsApp');
  link.setAttribute('title', 'Atendimento via WhatsApp');

  link.innerHTML = `
    <div class="whatsapp-float-icon">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.005 4.995A9.94 9.94 0 0 0 12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.436 5.178L2 22l4.957-1.3A9.935 9.935 0 0 0 12 22c5.523 0 10-4.477 10-10 0-2.67-1.04-5.18-2.995-7.005zM12 20.18a8.13 8.13 0 0 1-4.148-1.132l-.297-.176-3.08.808.822-3.002-.194-.308A8.134 8.134 0 0 1 3.82 12C3.82 7.489 7.489 3.82 12 3.82c2.186 0 4.241.852 5.787 2.398s2.398 3.601 2.398 5.787c0 4.511-3.669 8.175-8.185 8.175zm4.484-6.131c-.246-.123-1.455-.718-1.68-.8-.226-.082-.391-.123-.555.123s-.637.8-.781.964c-.144.164-.287.185-.533.062s-1.04-.383-1.982-1.223c-.733-.654-1.227-1.462-1.371-1.708-.144-.246-.015-.379.108-.502.111-.11.246-.287.37-.431.123-.144.164-.246.246-.41.082-.164.041-.308-.021-.431s-.555-1.338-.76-1.831c-.2-.48-.403-.414-.555-.422l-.472-.008c-.164 0-.431.062-.656.308s-.863.843-.863 2.056.883 2.381 1.006 2.545c.123.164 1.738 2.654 4.212 3.722.589.254 1.048.406 1.406.52.59.188 1.128.161 1.552.098.473-.07 1.455-.595 1.66-1.17.205-.575.205-1.067.144-1.17-.062-.103-.226-.164-.472-.287z"/>
      </svg>
    </div>
    <span class="whatsapp-float-text">Fale com nosso atendimento</span>
  `;

  container.appendChild(link);
  document.body.appendChild(container);
}

/**
 * Atualiza o ano corrente nos rodapés
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Inicializa o Carrossel Infinito Contínuo de Marcas Parceiras
 * - Transição automática a cada 1 segundo (1000ms)
 * - Navegação manual com setas esquerda/direita
 * - Loop infinito imperceptível sem sobressaltos
 * - Pausa ao passar o mouse (hover)
 */
function initBrandsCarousel() {
  const container = document.getElementById('brands-carousel-container');
  const track = document.getElementById('brands-carousel-track');
  const prevBtn = document.getElementById('brands-prev-btn');
  const nextBtn = document.getElementById('brands-next-btn');

  if (!container || !track) return;

  const items = track.querySelectorAll('.brand-item');
  const totalOriginal = 4; // Número de marcas originais
  let currentIndex = 0;
  let autoPlayTimer = null;
  let isTransitioning = false;

  function getStepWidth() {
    if (items.length === 0) return 0;
    const itemWidth = items[0].getBoundingClientRect().width;
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 24;
    return itemWidth + gap;
  }

  function moveToIndex(index, animated = true) {
    const stepWidth = getStepWidth();
    if (animated) {
      track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${index * stepWidth}px)`;
    currentIndex = index;
  }

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    moveToIndex(currentIndex, true);

    setTimeout(() => {
      isTransitioning = false;
      // Se tiver atingido o conjunto duplicado equivalente, reseta silenciosamente
      if (currentIndex >= totalOriginal) {
        currentIndex = currentIndex % totalOriginal;
        moveToIndex(currentIndex, false);
      }
    }, 400);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex <= 0) {
      currentIndex = totalOriginal;
      moveToIndex(currentIndex, false);
      // Força reflow do DOM para aplicar o reset sem animação antes de deslizar
      void track.offsetHeight;
    }

    currentIndex--;
    moveToIndex(currentIndex, true);

    setTimeout(() => {
      isTransitioning = false;
    }, 400);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 1000);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // Controles Manuais
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  // Pausa ao passar o mouse
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Recalcula largura na mudança de tamanho da janela
  window.addEventListener('resize', () => {
    moveToIndex(currentIndex, false);
  });

  // Inicia o carrossel automático a cada 1s
  startAutoPlay();
}

// Inicialização Global no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  renderWhatsAppButton();
  updateCopyrightYear();
  initBrandsCarousel();
});

