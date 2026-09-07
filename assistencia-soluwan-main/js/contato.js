/* ==========================================================================
   SOLUWAN ASSISTÊNCIA TÉCNICA
   Formulário de Contato - ENVIO AJAX
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const submitButton = document.getElementById("contact-submit");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const telefone = document.getElementById("telefone")?.value.trim();
    const assunto = document.getElementById("assunto")?.value;
    const mensagem = document.getElementById("mensagem")?.value.trim();

    hideFeedback();

    // ============================================================
    // VALIDAÇÕES
    // ============================================================

    if (!nome) {
      showFeedback("Por favor, informe seu nome completo.", "error");
      document.getElementById("nome")?.focus();
      return;
    }

    if (!email) {
      showFeedback("Por favor, informe seu e-mail.", "error");
      document.getElementById("email")?.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showFeedback("Por favor, informe um endereço de e-mail válido.", "error");
      document.getElementById("email")?.focus();
      return;
    }

    if (!telefone) {
      showFeedback("Por favor, informe seu telefone ou WhatsApp.", "error");
      document.getElementById("telefone")?.focus();
      return;
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 13) {
      showFeedback("Por favor, informe um telefone ou WhatsApp válido.", "error");
      document.getElementById("telefone")?.focus();
      return;
    }

    if (!assunto) {
      showFeedback("Por favor, selecione o assunto principal.", "error");
      document.getElementById("assunto")?.focus();
      return;
    }

    if (!mensagem) {
      showFeedback("Por favor, escreva uma mensagem.", "error");
      document.getElementById("mensagem")?.focus();
      return;
    }

    // ============================================================
    // BOTÃO
    // ============================================================

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "ENVIANDO...";
    }

    // ============================================================
    // DADOS
    // ============================================================

    const dados = {
      nome: nome,
      email: email,
      telefone: telefone,
      assunto: assunto,
      mensagem: mensagem,

      _subject: `Novo contato pelo site Soluwan - ${assunto}`,
      _template: "table",
      _captcha: "false"
    };

    try {

      // ============================================================
      // ENVIO PARA O FORMSUBMIT
      // ============================================================

      const response = await fetch(
        "https://formsubmit.co/ajax/suporte@soluwan.com.br",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(dados)
        }
      );

      const resultado = await response.json();

      console.log("Resposta FormSubmit:", resultado);

      if (!response.ok) {
        throw new Error(
          resultado.message || "Não foi possível enviar a mensagem."
        );
      }

      // ============================================================
      // SUCESSO
      // ============================================================

      showFeedback(
        "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.",
        "success"
      );

      contactForm.reset();

    } catch (error) {

      console.error("Erro ao enviar formulário:", error);

      showFeedback(
        "Não foi possível enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.",
        "error"
      );

    } finally {

      // ============================================================
      // RESTAURA O BOTÃO SEMPRE
      // ============================================================

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "ENVIAR MENSAGEM";
      }
    }
  });


  // ==============================================================
  // FEEDBACK
  // ==============================================================

  function showFeedback(message, type) {

    if (!formFeedback) return;

    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = "block";

    formFeedback.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }


  function hideFeedback() {

    if (!formFeedback) return;

    formFeedback.textContent = "";
    formFeedback.className = "form-feedback";
    formFeedback.style.display = "none";
  }
});