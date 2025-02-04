let items = document.querySelectorAll('.slider .list .item'); // Slides principais
let next = document.getElementById('next'); // Botão próximo
let prev = document.getElementById('prev'); // Botão anterior
let indicators = document.querySelectorAll('.carousel-indicators .indicator'); // Bolinhas (indicadores)

// Configuração inicial
let countItem = items.length;
let itemActive = 0;
let refreshInterval;

// Função para iniciar o slider automaticamente
function startAutoSlider() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        console.log("Auto slider acionado");
        next.click();
    }, 5000);
}

// Evento do botão "Próximo"
next.onclick = function () {
    console.log("Botão 'Próximo' clicado");
    itemActive = (itemActive + 1) % countItem;
    showSlider();
};

// Evento do botão "Anterior"
prev.onclick = function () {
    console.log("Botão 'Anterior' clicado");
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
};

// Função para exibir o slider
function showSlider() {
    console.log(`Exibindo slide ${itemActive + 1} de ${countItem}`);

    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let indicatorActiveOld = document.querySelector('.carousel-indicators .indicator.active');

    // Verifica se os elementos antigos existem antes de removê-los
    if (itemActiveOld) itemActiveOld.classList.remove('active');
    if (indicatorActiveOld) indicatorActiveOld.classList.remove('active');

    // Ativa o slide e a bolinha correspondentes
    items[itemActive].classList.add('active');
    indicators[itemActive].classList.add('active');

    startAutoSlider(); // Reinicia o temporizador do slider
}

// Evento de clique nos indicadores (bolinhas)
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        console.log(`Indicador ${index + 1} clicado`);
        itemActive = index;
        showSlider();
    });
});

// Inicia o slider automaticamente
startAutoSlider();


document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".sobre, .tab#project .item");

    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("ativo");
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
});


document.addEventListener("DOMContentLoaded", () => {
    let projectSection = document.querySelector(".tab#project");
    let projectItems = document.querySelectorAll(".tab#project .item");

    function showProjects() {
        // Verifica se a seção está visível na tela
        if (projectSection.getBoundingClientRect().top < window.innerHeight * 0.85) {
            projectSection.classList.add("ativo");

            // Anima os itens um a um com atraso progressivo
            projectItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("ativo");
                }, index * 1000); // Atraso aumenta 1 segundo a cada item
            });

            // Remove o evento de scroll para evitar chamadas desnecessárias
            window.removeEventListener("scroll", showProjects);
        }
    }

    window.addEventListener("scroll", showProjects);

    // Chama a função imediatamente para verificar se já está visível ao carregar
    showProjects();
});

document.addEventListener("DOMContentLoaded", () => {
    const contatoSection = document.querySelector(".contato");
    const contatoElements = [contatoSection.querySelector("h2"), contatoSection.querySelector("p"), ...contatoSection.querySelectorAll(".input-group input, textarea"), contatoSection.querySelector(".btn-enviar")];

    let hasAnimated = false;

    function animateContactSection() {
        if (hasAnimated) return; // Se a animação já ocorreu, não repete.

        const rect = contatoSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            hasAnimated = true;

            // Anima a seção de contato com uma transição suave
            contatoSection.style.opacity = 1;
            contatoSection.style.transform = "translateY(0)";

            // Anima os itens de forma sequencial
            contatoElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = 1;
                    el.style.transform = "translateY(0)";
                    el.style.transition = "all 0.6s ease-out"; // Aplica a transição aos itens
                }, index * 300); // Atraso de 300ms entre os itens
            });

            // Remove o evento após a animação para evitar chamadas repetidas
            window.removeEventListener("scroll", animateContactSection);
        }
    }

    window.addEventListener("scroll", animateContactSection);
    animateContactSection(); // Chama a animação caso os elementos já estejam visíveis ao carregar
});

document.addEventListener("DOMContentLoaded", () => {
    let contactSection = document.querySelector(".contact-section");
    let title = document.querySelector(".contact-section .header h2");
    let paragraph = document.querySelector(".contact-section .header p");

    const textoH2 = "Garanta o melhor para sua empresa ou condomínio!";
    const textoP = "Solicite uma proposta personalizada e aproveite nossas soluções.";
    let digitando = false;

    // Oculta o parágrafo no início
    paragraph.style.visibility = "hidden";

    function digitarTexto(elemento, texto, callback) {
        let index = 0;
        function digitar() {
            if (index < texto.length) {
                elemento.textContent += texto.charAt(index);
                index++;
                setTimeout(digitar, 30); // Velocidade da digitação
            } else if (callback) {
                setTimeout(callback, 500); // Espera 500ms antes de iniciar o próximo
            }
        }
        elemento.textContent = ""; // Limpa antes de iniciar a digitação
        digitar();
    }

    function iniciarDigitacao() {
        if (!digitando && contactSection.getBoundingClientRect().top < window.innerHeight * 0.85) {
            digitando = true;
            digitarTexto(title, textoH2, () => {
                paragraph.style.visibility = "visible"; // Torna o <p> visível
                digitarTexto(paragraph, textoP);
            });
            window.removeEventListener("scroll", iniciarDigitacao); // Remove o evento após ativação
        }
    }

    window.addEventListener("scroll", iniciarDigitacao);
    iniciarDigitacao(); // Verifica se já está visível ao carregar a página
});










