document.addEventListener("DOMContentLoaded", () => {
    const projectSection = document.querySelector(".tab#project");
    const projectItems = document.querySelectorAll(".tab#project .item");

    function showProjects() {
        // Verifica se a seção está visível na tela
        const sectionPosition = projectSection.getBoundingClientRect().top;
        if (sectionPosition < window.innerHeight * 0.55) {
            projectSection.classList.add("ativo");

            // Anima os itens um a um com atraso progressivo
            projectItems.forEach((item, index) => {
                if (!item.classList.contains("ativo")) { // Evita animações repetidas
                    setTimeout(() => {
                        item.classList.add("ativo");
                    }, index * 100); // Atraso aumenta 1 segundo a cada item
                }
            });

            // Remove o evento de scroll para evitar chamadas desnecessárias
            window.removeEventListener("scroll", showProjects);
        }
    }

    // Adiciona o evento de scroll
    window.addEventListener("scroll", showProjects);

    // Chama a função imediatamente para verificar se já está visível ao carregar
    showProjects();
});