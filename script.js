// Efecto de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Animación del hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de elementos al hacer scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.service-card, .why-us-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Aplicar animación cuando el elemento entra en vista
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-us-card, .contact-item').forEach(el => {
    animateOnScroll.observe(el);
});

// Retraso escalonado para las tarjetas de servicios
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Formulario de contacto
const appointmentForm = document.getElementById('appointmentForm');
const serviceSelect = document.getElementById('service');
const otherServiceGroup = document.getElementById('otherServiceGroup');

// Pre-seleccionar servicio cuando viene de ofertas o servicios
document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const serviceValue = this.getAttribute('data-service');
        if (serviceValue) {
            // Buscar si el servicio existe en el select o usar "otro"
            let found = false;
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].value.toLowerCase() === serviceValue.toLowerCase()) {
                    serviceSelect.value = serviceSelect.options[i].value;
                    found = true;
                    break;
                }
            }
            if (!found) {
                serviceSelect.value = 'otro';
                otherServiceGroup.style.display = 'block';
                document.getElementById('otherService').value = serviceValue;
            }
        }
    });
});

// También pre-seleccionar desde las tarjetas de servicios
document.querySelectorAll('.service-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const serviceTitle = this.parentElement.querySelector('h3').textContent;
        if (serviceTitle) {
            let found = false;
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].text.toLowerCase().includes(serviceTitle.toLowerCase())) {
                    serviceSelect.value = serviceSelect.options[i].value;
                    found = true;
                    break;
                }
            }
            if (!found) {
                serviceSelect.value = 'otro';
                otherServiceGroup.style.display = 'block';
                document.getElementById('otherService').value = serviceTitle;
            }
        }
    });
});

// Mostrar campo de texto cuando seleccione "otro"
serviceSelect.addEventListener('change', function() {
    if (this.value === 'otro') {
        otherServiceGroup.style.display = 'block';
    } else {
        otherServiceGroup.style.display = 'none';
    }
});

appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const otherService = document.getElementById('otherService').value;
    const message = document.getElementById('message').value;
    
    // Determinar el servicio seleccionado
    let serviceText = service;
    if (service === 'otro' && otherService) {
        serviceText = `Otro: ${otherService}`;
    }
    
    // Construir el mensaje de WhatsApp
    const whatsappMessage = `Hola, mi nombre es ${name}.%0A`;
    const whatsappMessage2 = `Teléfono: ${phone}%0A`;
    const whatsappMessage3 = `Servicio de interés: ${serviceText}%0A`;
    const whatsappMessage4 = message ? `Mensaje: ${message}%0A` : '';
    
    const fullMessage = whatsappMessage + whatsappMessage2 + whatsappMessage3 + whatsappMessage4;
    
    // Número de teléfono del salón (sin espacios ni guiones)
    const phoneNumber = '17875326642';
    
    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, '_blank');
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por tu solicitud! Serás redirigido a WhatsApp para completar la reservación.');
    
    // Limpiar el formulario
    appointmentForm.reset();
    otherServiceGroup.style.display = 'none';
});

// Efecto parallax suave para el hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Animación del logo
const logo = document.querySelector('.logo');
logo.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
});

logo.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Lazy loading para imágenes (si se agregan más adelante)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Validación de formulario en tiempo real
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#22c55e';
        } else if (this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#d4a574';
    });
});

console.log('BQ Salón - Página web cargada correctamente');
