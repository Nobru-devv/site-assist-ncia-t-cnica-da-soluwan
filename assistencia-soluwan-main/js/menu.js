/* ==========================================================================
   SOLUWAN ASSISTÊNCIA TÉCNICA (GRUPO ENGEFER)
   Arquivo de Gerenciamento de Menu e Navegação (menu.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && mainNav) {
    // Alterna o estado do menu mobile
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');

      // Animação das barras do hambúrguer
      toggleBtn.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link da navegação
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.classList.remove('active');
        }
      });
    });

    // Fecha o menu se o usuário clicar fora do menu
    document.addEventListener('click', (event) => {
      if (!mainNav.contains(event.target) && !toggleBtn.contains(event.target) && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.classList.remove('active');
      }
    });
  }

  // Destaca automaticamente o link da página ativa no menu
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
});
