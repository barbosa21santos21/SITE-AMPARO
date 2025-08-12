// Configurações globais
const CONFIG = {
    whatsappNumber: '5511999999999', // Número do WhatsApp da empresa (substituir pelo real)
    planos: {
        basico: 250,
        premium: 350
    },
    coberturas: {
        vidros: 50,
        terceiros: 75,
        roubo: 100,
        colisao: 125,
        fenomenos: 80
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initCalculadora();
    initAnimations();
});

// Menu mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do ícone hamburger
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }
}

// Scroll suave para âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Validação de formulários
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (validateForm(data)) {
                // Simular envio do formulário
                showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
            }
        });
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';
    
    // Remover mensagens de erro anteriores
    removeFieldError(field);
    
    // Validações específicas
    switch (fieldName) {
        case 'nome':
            if (value.length < 2) {
                isValid = false;
                message = 'Nome deve ter pelo menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Email inválido';
            }
            break;
            
        case 'telefone':
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Telefone inválido. Use o formato (11) 99999-9999';
            }
            break;
            
        case 'mensagem':
            if (value.length < 10) {
                isValid = false;
                message = 'Mensagem deve ter pelo menos 10 caracteres';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

// Validar formulário completo
function validateForm(data) {
    let isValid = true;
    
    for (const [key, value] of Object.entries(data)) {
        const field = document.querySelector(`[name="${key}"]`);
        if (field && !validateField(field)) {
            isValid = false;
        }
    }
    
    return isValid;
}

// Mostrar erro no campo
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Remover erro do campo
function removeFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Mostrar mensagem de sucesso
function showSuccessMessage(message) {
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-success';
    alertElement.textContent = message;
    alertElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(alertElement);
    
    setTimeout(() => {
        alertElement.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            alertElement.remove();
        }, 300);
    }, 3000);
}

// Calculadora de preço do seguro veicular
function initCalculadora() {
    const calculadora = document.querySelector('.calculadora');
    if (!calculadora) return;
    
    const planoRadios = calculadora.querySelectorAll('input[name="plano"]');
    const coberturaCheckboxes = calculadora.querySelectorAll('input[type="checkbox"]');
    const totalElement = calculadora.querySelector('.preco-valor');
    const cotacaoBtn = calculadora.querySelector('.btn-cotacao');
    
    // Atualizar preço quando plano ou cobertura mudar
    planoRadios.forEach(radio => {
        radio.addEventListener('change', updatePreco);
    });
    
    coberturaCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePreco);
    });
    
    // Botão de cotação
    if (cotacaoBtn) {
        cotacaoBtn.addEventListener('click', function() {
            const dadosCotacao = getDadosCotacao();
            enviarCotacaoWhatsApp(dadosCotacao);
        });
    }
    
    // Calcular preço inicial
    updatePreco();
    
    function updatePreco() {
        let total = 0;
        
        // Adicionar valor do plano base
        const planoSelecionado = calculadora.querySelector('input[name="plano"]:checked');
        if (planoSelecionado) {
            total += parseInt(planoSelecionado.value);
        }
        
        // Adicionar coberturas selecionadas
        const coberturasSelecionadas = calculadora.querySelectorAll('input[type="checkbox"]:checked');
        coberturasSelecionadas.forEach(checkbox => {
            total += parseInt(checkbox.value);
        });
        
        // Atualizar display do preço
        if (totalElement) {
            totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
        
        // Animação no preço
        if (totalElement) {
            totalElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                totalElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    function getDadosCotacao() {
        const planoSelecionado = calculadora.querySelector('input[name="plano"]:checked');
        const coberturasSelecionadas = calculadora.querySelectorAll('input[type="checkbox"]:checked');
        const total = totalElement.textContent;
        
        const dados = {
            plano: planoSelecionado ? planoSelecionado.dataset.nome : '',
            valorPlano: planoSelecionado ? planoSelecionado.value : 0,
            coberturas: [],
            total: total
        };
        
        coberturasSelecionadas.forEach(checkbox => {
            dados.coberturas.push({
                nome: checkbox.dataset.nome,
                valor: checkbox.value
            });
        });
        
        return dados;
    }
}

// Enviar cotação via WhatsApp
function enviarCotacaoWhatsApp(dados) {
    let mensagem = `🚗 *Solicitação de Cotação - Seguro Veicular App+*\n\n`;
    mensagem += `📋 *Plano Selecionado:* ${dados.plano}\n`;
    mensagem += `💰 *Valor do Plano:* R$ ${dados.valorPlano}\n\n`;
    
    if (dados.coberturas.length > 0) {
        mensagem += `🛡️ *Coberturas Adicionais:*\n`;
        dados.coberturas.forEach(cobertura => {
            mensagem += `• ${cobertura.nome}: R$ ${cobertura.valor}\n`;
        });
        mensagem += `\n`;
    }
    
    mensagem += `💵 *Valor Total:* ${dados.total}\n\n`;
    mensagem += `Gostaria de mais informações sobre esta cotação.`;
    
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

// Função genérica para WhatsApp
function abrirWhatsApp(mensagem, numero = CONFIG.whatsappNumber) {
    const whatsappUrl = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
}

// Animações ao scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .produto-card, .section h2');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Máscara para telefone
function mascaraTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    input.value = value;
}

// Aplicar máscara aos campos de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInputs = document.querySelectorAll('input[name="telefone"]');
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            mascaraTelefone(this);
        });
    });
});

// Funções específicas para botões de ação
function contatarSeguroFunerario(plano) {
    const mensagens = {
        essencial: `🏺 Olá! Tenho interesse no *Seguro Funerário Amparo+ Essencial* (R$ 24,90/mês). Gostaria de mais informações sobre cobertura e contratação.`,
        familia: `👨‍👩‍👧‍👦 Olá! Tenho interesse no *Seguro Funerário Amparo+ Família* (R$ 35,00/mês). Gostaria de mais informações sobre cobertura e contratação.`
    };
    
    abrirWhatsApp(mensagens[plano] || mensagens.essencial);
}

function interesseRevendedor() {
    const mensagem = `💼 Olá! Tenho interesse em me tornar um *Revendedor Amparo+*. Gostaria de saber mais sobre:\n\n• Processo de cadastro\n• Comissões e pagamentos\n• Material de apoio\n• Treinamentos disponíveis\n\nAguardo retorno!`;
    
    abrirWhatsApp(mensagem);
}

// Adicionar estilos CSS para animações via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-control.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .calculadora input[type="radio"] {
        accent-color: var(--primary-color);
    }
    
    .calculadora input[type="checkbox"] {
        accent-color: var(--primary-color);
    }
`;
document.head.appendChild(style);
