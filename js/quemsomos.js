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