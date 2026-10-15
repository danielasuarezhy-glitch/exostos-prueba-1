// =========================================================
// EXOSTOS AMAYA M&M — INTERACCIONES
// Todo el JavaScript de la página está en este archivo.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // MENÚ MÓVIL
    // =====================================================

    const botonMenu = document.querySelector(".menu-movil");
    const menu = document.querySelector(".menu");

    if (botonMenu && menu) {

        const cerrarMenu = () => {
            menu.classList.remove("menu-abierto");
            botonMenu.textContent = "☰";
            botonMenu.setAttribute("aria-label", "Abrir menú");
            botonMenu.setAttribute("aria-expanded", "false");
        };

        botonMenu.setAttribute("aria-expanded", "false");

        botonMenu.addEventListener("click", () => {
            const abierto = menu.classList.toggle("menu-abierto");
            botonMenu.textContent = abierto ? "✕" : "☰";
            botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
            botonMenu.setAttribute("aria-expanded", String(abierto));
        });

        menu.querySelectorAll("a").forEach((enlace) => {
            enlace.addEventListener("click", cerrarMenu);
        });

    }


    // =====================================================
    // COMPARADOR ANTES / DESPUÉS
    // =====================================================

    const comparadores = document.querySelectorAll(".comparador");

    comparadores.forEach((comparador) => {

        const antes = comparador.querySelector(".comparador-antes");
        const linea = comparador.querySelector(".comparador-linea");
        const imagenAntes = comparador.querySelector(".comparador-antes img");

        if (!antes || !linea || !imagenAntes) {
            return;
        }

        // =====================================================
        // ASEGURAR QUE LA IMAGEN ANTES TENGA EL MISMO TAMAÑO
        // QUE TODO EL COMPARADOR
        // =====================================================

        function ajustarImagenAntes() {

            const rect = comparador.getBoundingClientRect();

            if (!rect.width || !rect.height) {
                return;
            }

            antes.style.width = "100%";
            antes.style.height = "100%";

            imagenAntes.style.position = "absolute";
            imagenAntes.style.left = "0";
            imagenAntes.style.top = "0";
            imagenAntes.style.width = "100%";
            imagenAntes.style.height = "100%";
            imagenAntes.style.maxWidth = "none";
            imagenAntes.style.objectFit = "cover";
            imagenAntes.style.objectPosition = "center";
            imagenAntes.style.display = "block";
        }


        // =====================================================
        // MOVER COMPARADOR
        // =====================================================

        function moverComparador(posicionX) {

            const rect = comparador.getBoundingClientRect();

            if (!rect.width) {
                return;
            }

            let porcentaje =
                ((posicionX - rect.left) / rect.width) * 100;

            porcentaje = Math.max(
                2,
                Math.min(98, porcentaje)
            );

            // La imagen ANTES ocupa todo el comparador.
            // Solo se modifica el recorte visible.
            antes.style.clipPath =
                `inset(0 ${100 - porcentaje}% 0 0)`;

            // Mover línea y botón.
            linea.style.left = porcentaje + "%";
        }


        // =====================================================
        // POSICIÓN INICIAL
        // =====================================================

        ajustarImagenAntes();

        antes.style.clipPath =
            "inset(0 50% 0 0)";

        linea.style.left = "50%";

        window.addEventListener("resize", ajustarImagenAntes);


        // =====================================================
        // COMPUTADOR — MOUSE
        // =====================================================

        comparador.addEventListener(
            "mousemove",
            (evento) => {

                moverComparador(evento.clientX);

            }
        );


        // =====================================================
        // AL SALIR DEL COMPARADOR
        // =====================================================

        comparador.addEventListener(
            "mouseleave",
            () => {

                antes.style.clipPath =
                    "inset(0 50% 0 0)";

                linea.style.left = "50%";

            }
        );


        // =====================================================
        // CELULAR — GESTO HORIZONTAL
        // =====================================================

        let inicioX = 0;
        let inicioY = 0;
        let gestoHorizontal = false;


        comparador.addEventListener(
            "touchstart",
            (evento) => {

                if (
                    !evento.touches ||
                    evento.touches.length === 0
                ) {
                    return;
                }

                inicioX = evento.touches[0].clientX;
                inicioY = evento.touches[0].clientY;
                gestoHorizontal = false;

            },
            {
                passive: true
            }
        );


        comparador.addEventListener(
            "touchmove",
            (evento) => {

                if (
                    !evento.touches ||
                    evento.touches.length === 0
                ) {
                    return;
                }

                const actualX = evento.touches[0].clientX;
                const actualY = evento.touches[0].clientY;

                const diferenciaX =
                    Math.abs(actualX - inicioX);

                const diferenciaY =
                    Math.abs(actualY - inicioY);

                if (!gestoHorizontal) {

                    if (
                        diferenciaX > 10 &&
                        diferenciaX > diferenciaY
                    ) {

                        gestoHorizontal = true;

                    } else {

                        return;

                    }
                }

                moverComparador(actualX);

            },
            {
                passive: true
            }
        );


        comparador.addEventListener(
            "touchend",
            () => {

                gestoHorizontal = false;

            },
            {
                passive: true
            }
        );


        comparador.addEventListener(
            "touchcancel",
            () => {

                gestoHorizontal = false;

            },
            {
                passive: true
            }
        );

    });


    // =====================================================
    // ANIMACIONES AL HACER SCROLL
    // =====================================================

    const elementosAnimados = document.querySelectorAll(
        ".servicio-card, .cifra, .flota-card, .cliente-logo"
    );

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12 });

        elementosAnimados.forEach((elemento) => observador.observe(elemento));

    } else {

        elementosAnimados.forEach((elemento) => elemento.classList.add("visible"));

    }


    // =====================================================
    // ACORDEÓN DE VALORES
    // =====================================================

    const valores = document.querySelectorAll(".valor-nuevo");

    valores.forEach((valor) => {

        valor.setAttribute("aria-expanded", "false");

        valor.addEventListener("click", () => {

            const estabaAbierto = valor.classList.contains("activo");

            valores.forEach((item) => {
                item.classList.remove("activo");
                item.setAttribute("aria-expanded", "false");
            });

            if (!estabaAbierto) {
                valor.classList.add("activo");
                valor.setAttribute("aria-expanded", "true");
            }

        });

    });


    // =====================================================
    // ACORDEÓN DE TECNOLOGÍA
    // (antes había 3 copias de este código peleando entre sí)
    // =====================================================

    const pasosTecnologia = document.querySelectorAll(".tecnologia-paso");

    function cerrarPaso(paso) {
        paso.classList.remove("activo");
        paso.setAttribute("aria-expanded", "false");
        const texto = paso.querySelector(".tecnologia-descripcion");
        if (texto) {
            texto.style.maxHeight = "0px";
            texto.style.opacity = "0";
            texto.style.visibility = "hidden";
            texto.style.marginTop = "0px";
        }
    }

    function abrirPaso(paso) {
        paso.classList.add("activo");
        paso.setAttribute("aria-expanded", "true");
        const texto = paso.querySelector(".tecnologia-descripcion");
        if (texto) {
            texto.style.maxHeight = texto.scrollHeight + "px";
            texto.style.opacity = "1";
            texto.style.visibility = "visible";
            texto.style.marginTop = "18px";
        }
    }

    pasosTecnologia.forEach((paso) => {

        paso.setAttribute("aria-expanded", "false");

        paso.addEventListener("click", (evento) => {
            evento.preventDefault();
            const estabaAbierto = paso.classList.contains("activo");
            pasosTecnologia.forEach(cerrarPaso);
            if (!estabaAbierto) {
                abrirPaso(paso);
            }
        });

    });


    // =====================================================
    // ASISTENTE VIRTUAL
    // =====================================================

    const botonAsistente = document.getElementById("boton-asistente");
    const panelAsistente = document.getElementById("panel-asistente");
    const cerrarAsistenteBtn = document.getElementById("cerrar-asistente");
    const respuestaAsistente = document.getElementById("asistente-respuesta");

    const respuestas = {
        ubicacion: `
            <strong>📍 Estamos ubicados en:</strong>
            <p>Cra. 78A #65A-59 Sur, Bosa, Bogotá D.C.</p>
        `,

        contacto: `
            <strong>📞 ¿Cómo puedes contactarnos?</strong>
            <p>WhatsApp: <strong>+57 310 588 9062</strong></p>
            <p>Correo: <strong>exostosamayamym@gmail.com</strong></p>
        `,

        flotas: `
            <strong>🚛 Trabajamos con diferentes tipos de flota.</strong>
            <p>
                Transporte intermunicipal,
                vehículos de emergencia, taxis, servicios privados,
                aseo, carga, transporte público.
            </p>
        `,

        servicios: `
            <strong>🔧 Nuestros servicios</strong>
            <p>
                Regeneración de DPF, regeneración de catalizadores,
                mantenimiento de tanques de combustible, sustitución de cerámica,
                piezas de intercambio y mantenimiento de exostos.
            </p>
        `,

        horarios: `
            <strong>🕐 Horarios de atención</strong>
            <p>
                Lunes a viernes: <strong>8:00 a.m. – 5:00 p.m.</strong><br>
                Sábados: <strong>8:00 a.m. – 1:00 p.m.</strong>
            </p>
        `,

        empresa: `
            <strong>🏢 EXOSTOS AMAYA M&amp;M</strong>
            <p>
                Somos una empresa colombiana con más de 15 años de experiencia,
                especializada en soluciones técnicas para sistemas de escape
                y control de emisiones.
            </p>
        `
    };

    function abrirAsistente() {
        panelAsistente.classList.add("abierto");
        panelAsistente.setAttribute("aria-hidden", "false");
        botonAsistente.setAttribute("aria-expanded", "true");
    }

    function cerrarAsistente() {
        panelAsistente.classList.remove("abierto");
        panelAsistente.setAttribute("aria-hidden", "true");
        botonAsistente.setAttribute("aria-expanded", "false");
    }

    if (botonAsistente && panelAsistente) {

        botonAsistente.addEventListener("click", (evento) => {
            evento.stopPropagation();
            if (panelAsistente.classList.contains("abierto")) {
                cerrarAsistente();
            } else {
                abrirAsistente();
            }
        });

        if (cerrarAsistenteBtn) {
            cerrarAsistenteBtn.addEventListener("click", (evento) => {
                evento.stopPropagation();
                cerrarAsistente();
            });
        }

        document.querySelectorAll(".asistente-preguntas button").forEach((boton) => {
            boton.addEventListener("click", () => {
                const pregunta = boton.dataset.pregunta;
                if (!respuestas[pregunta] || !respuestaAsistente) {
                    return;
                }
                respuestaAsistente.innerHTML = respuestas[pregunta];
                respuestaAsistente.hidden = false;
            });
        });

        // Cerrar con la tecla Esc
        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && panelAsistente.classList.contains("abierto")) {
                cerrarAsistente();
            }
        });

        // Cerrar al hacer clic por fuera del panel
        document.addEventListener("click", (evento) => {
            if (
                panelAsistente.classList.contains("abierto") &&
                !panelAsistente.contains(evento.target) &&
                !botonAsistente.contains(evento.target)
            ) {
                cerrarAsistente();
            }
        });

    }


    // =====================================================
    // BOTÓN VOLVER ARRIBA
    // =====================================================

    const botonSubir = document.getElementById("boton-subir");

    if (botonSubir) {

        const actualizarBotonSubir = () => {
            botonSubir.classList.toggle("visible", window.scrollY > 500);
        };

        window.addEventListener("scroll", actualizarBotonSubir, { passive: true });

        botonSubir.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        actualizarBotonSubir();

    }


    // =====================================================
    // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    // =====================================================

    document.querySelectorAll(".footer p").forEach((parrafo) => {
        if (/©\s*\d{4}/.test(parrafo.textContent)) {
            parrafo.textContent = parrafo.textContent.replace(
                /©\s*\d{4}/,
                "© " + new Date().getFullYear()
            );
        }
    });

});
