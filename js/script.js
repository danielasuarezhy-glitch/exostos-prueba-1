// =========================================================
// EXOSTOS AMAYA M&M — INTERACCIONES
// =========================================================

document.addEventListener("DOMContentLoaded", () => {


    // =====================================================
    // MENÚ MÓVIL
    // =====================================================

    const botonMenu = document.querySelector(".menu-movil");
    const menu = document.querySelector(".menu");

    if (botonMenu && menu) {

        botonMenu.addEventListener("click", () => {

            const abierto = menu.classList.toggle("menu-abierto");

            botonMenu.textContent = abierto ? "✕" : "☰";

            botonMenu.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );

        });


        menu.querySelectorAll("a").forEach((enlace) => {

            enlace.addEventListener("click", () => {

                menu.classList.remove("menu-abierto");

                botonMenu.textContent = "☰";

                botonMenu.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

            });

        });

    }



    // =========================================================
// COMPARADOR ANTES / DESPUÉS
// =========================================================

const comparadores = document.querySelectorAll(".comparador");

comparadores.forEach((comparador) => {

    const antes =
        comparador.querySelector(".comparador-antes");

    const linea =
        comparador.querySelector(".comparador-linea");

    const imagenAntes =
        comparador.querySelector(".comparador-antes img");

    if (!antes || !linea || !imagenAntes) return;


    function ajustarImagen() {

        const ancho =
            comparador.getBoundingClientRect().width;

        const alto =
            comparador.getBoundingClientRect().height;

        imagenAntes.style.width = ancho + "px";
        imagenAntes.style.height = alto + "px";
    }


    function moverComparador(posicionX) {

        const rect =
            comparador.getBoundingClientRect();

        let porcentaje =
            ((posicionX - rect.left) / rect.width) * 100;

        porcentaje =
            Math.max(2, Math.min(98, porcentaje));

        antes.style.width =
            porcentaje + "%";

        linea.style.left =
            porcentaje + "%";
    }


    // Ajustar al cargar
    ajustarImagen();


    // Ajustar si cambia el tamaño de pantalla
    window.addEventListener(
        "resize",
        ajustarImagen
    );


    // Seguir el mouse
    comparador.addEventListener(
        "mousemove",
        (evento) => {

            moverComparador(
                evento.clientX
            );

        }
    );


    // Volver al centro
    comparador.addEventListener(
        "mouseleave",
        () => {

            antes.style.width = "50%";
            linea.style.left = "50%";

        }
    );


    // Celular
    comparador.addEventListener(
        "touchmove",
        (evento) => {

            if (
                evento.touches &&
                evento.touches.length > 0
            ) {

                moverComparador(
                    evento.touches[0].clientX
                );

            }

        },
        { passive: true }
    );

});


        // -------------------------------------------------
        // FUNCIÓN PARA MOVER LA LÍNEA
        // -------------------------------------------------

        function moverComparador(posicionX) {

            const rect =
                comparador.getBoundingClientRect();


            let porcentaje =
                ((posicionX - rect.left) / rect.width) * 100;


            porcentaje =
                Math.max(
                    2,
                    Math.min(98, porcentaje)
                );


            // Mueve la imagen ANTES

            antes.style.width =
                porcentaje + "%";


            // Mueve la línea amarilla

            linea.style.left =
                porcentaje + "%";

        }



        // -------------------------------------------------
        // MOUSE
        // La línea sigue automáticamente al mouse
        // -------------------------------------------------

        comparador.addEventListener(
            "mousemove",
            (evento) => {

                moverComparador(
                    evento.clientX
                );

            }
        );



        // -------------------------------------------------
        // CUANDO EL MOUSE SALE
        // Regresa al centro
        // -------------------------------------------------

        comparador.addEventListener(
            "mouseleave",
            () => {

                antes.style.width = "50%";

                linea.style.left = "50%";

            }
        );



        // -------------------------------------------------
        // CELULAR / TABLET
        // Permite moverlo con el dedo
        // -------------------------------------------------

        comparador.addEventListener(
            "touchmove",
            (evento) => {

                if (
                    evento.touches &&
                    evento.touches.length > 0
                ) {

                    moverComparador(
                        evento.touches[0].clientX
                    );

                }

            },
            {
                passive: true
            }
        );

    });



    // =====================================================
    // ANIMACIONES AL HACER SCROLL
    // =====================================================

    const elementosAnimados =
        document.querySelectorAll(
            ".servicio-card, " +
            ".paso, " +
            ".cifra, " +
            ".identidad-card, " +
            ".flota-card, " +
            ".cliente-logo"
        );


    if ("IntersectionObserver" in window) {

        const observador =
            new IntersectionObserver(
                (entradas) => {

                    entradas.forEach((entrada) => {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "visible"
                            );


                            observador.unobserve(
                                entrada.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elementosAnimados.forEach((elemento) => {

            observador.observe(elemento);

        });

    } else {

        elementosAnimados.forEach((elemento) => {

            elemento.classList.add("visible");

        });

    }



    // =====================================================
    // ACORDEÓN DE VALORES
    // =====================================================

    const valores =
        document.querySelectorAll(".valor-nuevo");


    valores.forEach((valor) => {

        valor.setAttribute(
            "aria-expanded",
            "false"
        );


        valor.addEventListener(
            "click",
            () => {

                const estabaAbierto =
                    valor.classList.contains("activo");


                // Cerrar todos

                valores.forEach((item) => {

                    item.classList.remove("activo");

                    item.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });


                // Abrir el seleccionado

                if (!estabaAbierto) {

                    valor.classList.add("activo");

                    valor.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });



   // =====================================================
// ACORDEÓN DE TECNOLOGÍA
// =====================================================

const pasosTecnologia =
    document.querySelectorAll(".tecnologia-paso");


pasosTecnologia.forEach((paso) => {

    paso.addEventListener("click", function () {

        const estabaAbierto =
            paso.classList.contains("activo");


        // Cerrar todas las tarjetas

        pasosTecnologia.forEach((item) => {

            item.classList.remove("activo");

        });


        // Abrir la seleccionada

        if (!estabaAbierto) {

            paso.classList.add("activo");

        }

    });

});



    // =====================================================
    // CENTRO DE CONTACTO + ASISTENTE
    // =====================================================

    const botonAsistente =
        document.querySelector(
            ".contacto-flotante .asistente"
        );


    const panelAsistente =
        document.querySelector(
            "#asistente-panel"
        );


    const botonCerrarAsistente =
        document.querySelector(
            ".asistente-cerrar"
        );


    const respuestaAsistente =
        document.querySelector(
            "#asistente-respuesta"
        );



    // -----------------------------------------------------
    // RESPUESTAS DEL ASISTENTE
    // -----------------------------------------------------

    const respuestas = {

        ubicacion: `
            <strong>📍 Estamos en Bosa, Bogotá.</strong>

            <p>
                Cra. 78A #65A-59 Sur,
                Bosa, Bogotá D.C.
            </p>

            <a
                class="respuesta-enlace"
                href="https://www.google.com/maps/search/?api=1&query=Cra.%2078A%20%2365A-59%20Sur%2C%20Bosa%2C%20Bogot%C3%A1"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver ubicación en Google Maps →
            </a>
        `,


        contacto: `
            <strong>
                📞 Estamos disponibles por WhatsApp.
            </strong>

            <p>
                WhatsApp / teléfono:
                <strong>
                    +57 310 588 9062
                </strong>
            </p>

            <p>
                Correo:
                <strong>
                    exostosamayamym@gmail.com
                </strong>
            </p>

            <a
                class="respuesta-enlace"
                href="https://wa.me/573105889062?text=Hola%20EXOSTOS%20AMAYA%20M%26M.%20Quisiera%20recibir%20informaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
            >
                Escribir por WhatsApp →
            </a>
        `,


        flotas: `
            <strong>
                🚛 Soluciones para diferentes operaciones.
            </strong>

            <p>
                Trabajamos con transporte intermunicipal,
                taxis y servicios privados,
                vehículos de emergencia,
                aseo, carga, construcción y maquinaria pesada,
                sector agrícola y generadores.
            </p>

            <a
                class="respuesta-enlace"
                href="#flotas"
            >
                Ver nuestras flotas →
            </a>
        `,


        servicios: `
            <strong>
                🔧 Soluciones en control de emisiones.
            </strong>

            <p>
                Entre nuestros servicios se encuentran
                la regeneración de DPF,
                regeneración y limpieza de catalizadores,
                limpieza y descontaminación,
                sustitución de cerámica,
                piezas de intercambio y
                mantenimiento de sistemas de escape.
            </p>

            <a
                class="respuesta-enlace"
                href="#servicios"
            >
                Ver servicios →
            </a>
        `,


        horarios: `
            <strong>
                🕐 Horarios de atención
            </strong>

            <p>
                Lunes a viernes:
                <strong>
                    8:00 a.m. – 5:00 p.m.
                </strong>
                <br>

                Sábados:
                <strong>
                    8:00 a.m. – 1:00 p.m.
                </strong>
            </p>

            <p>
                Fuera de este horario puedes
                dejarnos un mensaje por WhatsApp.
            </p>
        `,


        empresa: `
            <strong>
                🏢 EXOSTOS AMAYA M&amp;M
            </strong>

            <p>
                Somos una empresa especializada
                en soluciones técnicas para sistemas
                de escape y control de emisiones,
                con experiencia en servicios para
                diferentes tipos de vehículos y flotas.
            </p>

            <a
                class="respuesta-enlace"
                href="#nosotros"
            >
                Conocer más sobre nosotros →
            </a>
        `

    };



    // =====================================================
    // FUNCIONES DEL ASISTENTE
    // =====================================================

    function abrirAsistente() {

        if (!panelAsistente || !botonAsistente) {
            return;
        }


        panelAsistente.classList.add("abierto");

        panelAsistente.setAttribute(
            "aria-hidden",
            "false"
        );


        botonAsistente.setAttribute(
            "aria-expanded",
            "true"
        );

    }



    function cerrarAsistente() {

        if (!panelAsistente || !botonAsistente) {
            return;
        }


        panelAsistente.classList.remove("abierto");

        panelAsistente.setAttribute(
            "aria-hidden",
            "true"
        );


        botonAsistente.setAttribute(
            "aria-expanded",
            "false"
        );

    }



    // =====================================================
    // BOTÓN DEL ASISTENTE
    // =====================================================

    if (botonAsistente) {

        botonAsistente.addEventListener(
            "click",
            () => {

                const abierto =
                    panelAsistente &&
                    panelAsistente.classList.contains(
                        "abierto"
                    );


                if (abierto) {

                    cerrarAsistente();

                } else {

                    abrirAsistente();

                }

            }
        );

    }



    // =====================================================
    // BOTÓN CERRAR ASISTENTE
    // =====================================================

    if (botonCerrarAsistente) {

        botonCerrarAsistente.addEventListener(
            "click",
            cerrarAsistente
        );

    }



    // =====================================================
    // BOTONES DE PREGUNTAS
    // =====================================================

    document
        .querySelectorAll(".asistente-opciones button")
        .forEach((boton) => {

            boton.addEventListener(
                "click",
                () => {

                    const pregunta =
                        boton.dataset.pregunta;


                    if (
                        !respuestaAsistente ||
                        !respuestas[pregunta]
                    ) {
                        return;
                    }


                    respuestaAsistente.innerHTML =
                        respuestas[pregunta];


                    respuestaAsistente.hidden =
                        false;


                    respuestaAsistente.classList.remove(
                        "respuesta-entrada"
                    );


                    requestAnimationFrame(() => {

                        respuestaAsistente.classList.add(
                            "respuesta-entrada"
                        );

                    });

                }
            );

        });



    // =====================================================
    // CERRAR ASISTENTE CON ESC
    // =====================================================

    document.addEventListener(
        "keydown",
        (evento) => {

            if (evento.key === "Escape") {

                cerrarAsistente();

            }

        }
    );



    // =====================================================
    // CERRAR ASISTENTE AL HACER CLICK AFUERA
    // =====================================================

    document.addEventListener(
        "click",
        (evento) => {

            if (
                !panelAsistente ||
                !panelAsistente.classList.contains("abierto")
            ) {
                return;
            }


            if (
                panelAsistente.contains(evento.target) ||
                (
                    botonAsistente &&
                    botonAsistente.contains(evento.target)
                )
            ) {
                return;
            }


            cerrarAsistente();

        }
    );



   // =====================================================
// BOTÓN VOLVER ARRIBA
// =====================================================

const botonSubir = document.querySelector(
    ".boton-subir"
);


function actualizarBotonSubir() {

    if (!botonSubir) {
        return;
    }

    botonSubir.classList.toggle(
        "visible",
        window.scrollY > 500
    );

}


window.addEventListener(
    "scroll",
    actualizarBotonSubir,
    {
        passive: true
    }
);


if (botonSubir) {

    botonSubir.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}

actualizarBotonSubir();
    // =====================================================
    // AÑO AUTOMÁTICO
    // =====================================================

    const footer =
        document.querySelector(".footer");


    if (footer) {

        footer.innerHTML =
            footer.innerHTML.replace(
                /©\s*\d{4}/,
                "© " + new Date().getFullYear()
            );

    }

// =====================================================
// ACORDEÓN DE TECNOLOGÍA — ÚNICO
// =====================================================

document.querySelectorAll(".tecnologia-paso").forEach((paso) => {

    paso.addEventListener("click", function () {

        const estabaAbierto =
            this.classList.contains("activo");

        // Cerrar todos
        document.querySelectorAll(".tecnologia-paso").forEach((item) => {
            item.classList.remove("activo");
        });

        // Abrir el seleccionado
        if (!estabaAbierto) {
            this.classList.add("activo");
        }

    });

});