"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const whatsappNumber = "+5491125118650"; // Reemplaza con tu número de WhatsApp
  const whatsappMsg = "Hola, me gustaría hacer una consulta sobre sus servicios de plomería.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  useEffect(() => {
    const sectionIds = ['servicios', 'proceso', 'testimonios', 'contacto'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe when user is at the very top (hero)
    const handleScroll = () => {
      if (window.scrollY < 300) setActiveSection('inicio');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* TopAppBar for Mobile / Desktop */}
      <header className="fixed top-0 w-full z-50 bg-white/80 md:bg-[#f8f9fb]/70 backdrop-blur-md shadow-sm md:shadow-none transition-transform duration-300 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsDrawerOpen(true)} className="md:hidden text-blue-900 transition-transform scale-95 active:opacity-80 p-2 rounded-full hover:bg-slate-50">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu</span>
          </button>
          <span className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tighter font-headline uppercase md:normal-case">Precisión Hidráulica</span>
        </div>
        <div className="hidden md:flex items-center space-gap gap-8">
          {[
            { id: 'servicios', label: 'Servicios' },
            { id: 'proceso', label: 'Proceso' },
            { id: 'testimonios', label: 'Testimonios' },
            { id: 'contacto', label: 'Contacto' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`pb-1 font-bold tracking-tight transition-all duration-300 border-b-2 ${activeSection === item.id
                  ? 'text-[#1565C0] border-[#1565C0]'
                  : 'text-slate-600 border-transparent hover:text-[#1565C0]'
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold tracking-tight hover:opacity-80 transition-opacity scale-95 active:scale-100"
        >
          Contactar por WhatsApp
        </a>
      </header>

      {/* Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 md:hidden" onClick={() => setIsDrawerOpen(false)}></div>
      )}
      <aside className={`fixed inset-y-0 left-0 z-[70] bg-slate-50 dark:bg-slate-900 w-80 shadow-2xl flex flex-col py-8 px-4 transition-transform duration-300 ease-in-out md:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-2 mb-8">
          <span className="text-blue-900 font-bold font-headline text-xl">Menú</span>
          <button onClick={() => setIsDrawerOpen(false)} className="text-slate-500"><span className="material-symbols-outlined">close</span></button>
        </div>
        <nav className="space-y-2">
          {[
            { id: 'inicio', href: '#', icon: 'home', label: 'Inicio' },
            { id: 'servicios', href: '#servicios', icon: 'plumbing', label: 'Servicios' },
            { id: 'proceso', href: '#proceso', icon: 'engineering', label: 'Proceso' },
            { id: 'contacto', href: '#contacto', icon: 'info', label: 'Contacto' },
          ].map((item) => (
            <a
              key={item.id}
              className={`flex items-center gap-4 py-3 px-4 mx-2 rounded-lg transition-all duration-300 ${activeSection === item.id
                  ? 'bg-blue-900 text-white dark:bg-blue-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              href={item.href}
              onClick={() => setIsDrawerOpen(false)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-headline font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="pt-20">
        {/*  Hero Section (Responsive: Mobile from the new HTML, merged with Desktop) */}
        <section className="relative px-6 pt-12 pb-24 md:min-h-[921px] overflow-hidden flex flex-col md:flex-row items-center justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -mr-20 -mt-20 md:hidden"></div>
          <div className="absolute inset-0 hidden md:block z-0 bg-[#001b3d]">
            <img src="/hero_desktop_plumbing.png" alt="Fontanería profesional" className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001b3d] via-[#001b3d]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h1 className="font-headline text-5xl md:text-7xl leading-[1.1] font-extrabold tracking-tight text-primary md:text-on-primary-container mb-6 text-center md:text-left">
                Ingeniería y <br className="md:hidden" />
                <span className="text-blue-500 md:text-white">Excelencia</span> <br className="md:hidden" />Hidráulica
              </h1>
              <p className="text-on-surface-variant md:text-on-primary-container/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-body text-center md:text-left px-2 md:px-0">
                Soluciones de plomería premium definidas por precisión técnica y maestría arquitectónica. Desde reparaciones de emergencia hasta instalaciones a medida.
              </p>
              <div className="flex flex-wrap gap-3 px-2 md:px-0 justify-center md:justify-start w-full">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] md:bg-white text-white md:text-primary px-5 py-3.5 rounded-xl md:rounded-lg font-bold shadow-lg shadow-[#25D366]/25 md:shadow-primary/20 hover:shadow-xl active:scale-95 transition-all text-sm sm:text-base"
                >
                  <svg className="md:hidden flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                  <span>Cotizar por WhatsApp</span>
                </a>

              </div>
            </div>

            <div className="mt-16 md:mt-0 relative md:col-span-5 md:block">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl md:hidden">
                <img alt="Ingeniería Hidráulica" className="w-full h-full object-cover" src="/hero_mobile_plumbing.png" />
              </div>

              <div className="absolute -bottom-6 -left-4 md:relative md:bottom-0 md:left-0 bg-surface-container-lowest md:bg-surface-container-lowest/10 md:backdrop-blur-xl p-4 md:p-8 rounded-2xl md:rounded-xl shadow-xl md:shadow-2xl flex md:flex-col items-center md:items-start gap-3 md:gap-6 border md:border-white/10">
                <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <p className="text-sm md:text-base font-bold text-primary md:text-white font-headline">Ingenieros Certificados</p>
                  <p className="text-[10px] md:text-sm text-slate-500 md:text-white/70 uppercase md:normal-case tracking-widest md:tracking-normal">Licencia #4920</p>
                </div>
                <div className="hidden md:block space-y-4 w-full mt-4">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-fixed-dim w-full"></div>
                  </div>
                  <p className="text-white font-medium italic">"La precisión no es una opción; es nuestro estándar."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="bg-surface-container px-6 py-20 rounded-t-[3rem] md:rounded-none scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-primary font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase block">Nuestras Especialidades</span>
                <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 md:text-on-surface tracking-tight">El Flujo de la Innovación</h2>
              </div>
              <p className="text-secondary max-w-xs text-left md:text-right italic">
                Utilizamos diagnósticos de grado industrial para garantizar la integridad estructural a largo plazo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] md:rounded-xl shadow-sm md:border-b-4 border-primary hover:bg-primary group transition-all duration-500">
                <div className="w-14 h-14 bg-blue-50 md:bg-transparent rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:text-white">
                  <span className="material-symbols-outlined text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>plumbing</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-900 md:text-on-surface font-headline group-hover:text-white transition-colors">Reparación de Tuberías</h3>
                <p className="text-on-surface-variant md:text-secondary text-sm md:text-base leading-relaxed mb-6 md:mb-0 group-hover:text-white/80 transition-colors">Soluciones de ingeniería de precisión para fugas estructurales y degradación de materiales. Usamos detección por sonar para reparaciones no invasivas.</p>

              </div>

              <div className="bg-surface-container-lowest p-8 rounded-[2rem] md:rounded-xl shadow-sm md:border-b-4 border-primary hover:bg-primary group transition-all duration-500">
                <div className="w-14 h-14 bg-blue-50 md:bg-transparent rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:text-white">
                  <span className="material-symbols-outlined text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>hot_tub</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-900 md:text-on-surface font-headline group-hover:text-white transition-colors">Instalación de Calentadores</h3>
                <p className="text-on-surface-variant md:text-secondary text-sm md:text-base leading-relaxed mb-6 md:mb-0 group-hover:text-white/80 transition-colors">Diseñamos sistemas térmicos de alta eficiencia para un rendimiento constante y un menor consumo de energía.</p>

              </div>

              <div className="bg-surface-container-lowest p-8 rounded-[2rem] md:rounded-xl shadow-sm md:border-b-4 border-primary hover:bg-primary group transition-all duration-500">
                <div className="w-14 h-14 bg-blue-50 md:bg-transparent rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:text-white">
                  <span className="material-symbols-outlined text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>leak_add</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-blue-900 md:text-on-surface font-headline group-hover:text-white transition-colors">Detección de Fugas</h3>
                <p className="text-on-surface-variant md:text-secondary text-sm md:text-base leading-relaxed mb-6 md:mb-0 group-hover:text-white/80 transition-colors">Sensores acústicos y cámaras térmicas localizan vulnerabilidades ocultas antes de que comprometan su propiedad.</p>

              </div>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section id="proceso" className="py-24 px-6 md:bg-surface-container-low scroll-mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-16 items-center">

            {/* Image side */}
            <div className="relative">
              <div className="aspect-[4/3] md:aspect-square rounded-[2.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                <img alt="Mantenimiento de infraestructura" className="w-full h-full object-cover" src="/feature_maintenance.png" />
              </div>

              {/* 24/7 Badge - positioned to overlap bottom-right cleanly without getting cut off */}
              <div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 bg-tertiary-container p-6 md:p-8 rounded-2xl md:rounded-[1.5rem] shadow-xl z-10">
                <p className="text-on-tertiary-container font-headline font-extrabold text-3xl md:text-4xl text-center">24/7</p>
                <p className="text-on-tertiary-container text-xs md:text-sm font-bold uppercase tracking-widest text-center mt-1">Respuesta<br className="md:hidden" /> Rápida</p>
              </div>
            </div>

            {/* Text side */}
            <div className="space-y-8 mt-12 md:mt-0">
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-blue-900 md:text-on-surface">La Ciencia del Mantenimiento</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">No solo reparamos, aplicamos principios de ingeniería hidráulica para asegurar que su sistema funcione con la máxima eficiencia energética y durabilidad prolongada.</p>

              <div className="space-y-6">
                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 md:bg-surface-container-lowest rounded-2xl md:rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg md:text-xl text-blue-900 md:text-on-surface mb-1">Diagnósticos Avanzados</h4>
                    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">Utilizamos inspecciones con cámaras endoscópicas para diagnosticar problemas internos sin dañar la propiedad.</p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 md:bg-surface-container-lowest rounded-2xl md:rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>handyman</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg md:text-xl text-blue-900 md:text-on-surface mb-1">Respeto Arquitectónico</h4>
                    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">Nuestros técnicos tratan su espacio como una galería, asegurando un ambiente de trabajo estéril y sin desorden.</p>
                  </div>
                </div>
              </div>

              <a href="#pasos-proceso" className="inline-flex w-full md:w-auto bg-primary text-on-primary px-6 py-3.5 rounded-xl md:rounded-lg font-bold shadow-lg hover:shadow-primary/20 transition-all text-sm sm:text-base mt-4 items-center justify-center">
                Conoce Nuestro Proceso
              </a>
            </div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section id="pasos-proceso" className="py-20 px-6 bg-white dark:bg-slate-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">Metodología de Trabajo</span>
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-blue-900 dark:text-white mt-2">Nuestra Ruta a la Solución</h2>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-12 -mx-6 px-6 md:grid md:grid-cols-4 md:gap-12 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              {[
                { step: '01', title: 'Diagnóstico Digital', desc: 'Escaneo con cámaras térmicas y sensores acústicos para localizar el origen exacto.', icon: 'biotech' },
                { step: '02', title: 'Planificación', desc: 'Diseñamos la intervención menos invasiva respetando la estética de su hogar.', icon: 'architecture' },
                { step: '03', title: 'Intervención Técnica', desc: 'Ejecución con herramientas de precisión y materiales de grado industrial.', icon: 'construction' },
                { step: '04', title: 'Validación Final', desc: 'Pruebas de presión y sellado para garantizar la integridad del sistema.', icon: 'verified' },
              ].map((item, idx) => (
                <div key={idx} className="min-w-[80vw] snap-center md:min-w-0 md:w-auto relative">
                  <div className="relative z-10 bg-slate-50 dark:bg-slate-800 p-8 rounded-[2.5rem] md:rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-50 dark:border-slate-700">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      </div>
                      <span className="text-4xl font-black text-slate-200 dark:text-slate-700 font-headline leading-none">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-4 font-headline tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-body">{item.desc}</p>

                    {/* Visual flow indicator for mobile (Integrated) */}
                    {idx < 3 && (
                      <div className="md:hidden mt-auto pt-6 flex items-center gap-2 text-primary/40 font-bold text-[10px] uppercase tracking-widest">
                        <span>Siguiente Paso</span>
                        <div className="h-[1px] flex-grow bg-slate-200 dark:bg-slate-700"></div>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </div>
                    )}
                  </div>

                  {/* Desktop Arrow Indicator */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 translate-x-1/2 -translate-y-1/2 z-10 text-primary/20">
                      <span className="material-symbols-outlined text-4xl">arrow_forward</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeSection === 'proceso' ? 'bg-primary' : 'bg-slate-200'} ${i === 0 ? 'w-8 bg-primary' : 'w-2 opacity-30'}`}></div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonios" className="bg-surface-container-low md:bg-surface px-6 py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-blue-900 md:text-on-surface md:tracking-tight mb-4 md:mb-16">Confianza de Nuestros Clientes</h2>
              <div className="h-1 w-12 bg-primary mx-auto rounded-full md:hidden"></div>
            </div>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
              <div className="min-w-[85vw] snap-center md:min-w-0 md:w-auto bg-surface-container-lowest p-6 md:p-10 rounded-2xl md:rounded-xl shadow-sm md:shadow-[0_4px_40px_rgba(25,28,30,0.04)] flex flex-col">
                <div className="flex gap-1 text-tertiary md:text-primary mb-3 md:mb-6">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="italic text-on-surface-variant md:text-on-surface md:text-lg leading-relaxed mb-4 md:mb-8 font-body">"Su enfoque para la ruptura de una tubería fue más bien un procedimiento quirúrgico. Limpio, eficiente y tecnológicamente superior a cualquier técnico que haya contratado."</p>
                <div className="md:flex md:items-center md:gap-4 mt-auto">
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-primary-fixed items-center justify-center font-bold text-on-primary-fixed">AM</div>
                  <p className="font-bold text-blue-900 md:text-on-surface text-sm md:tracking-tight">— Arq. Ricardo Méndez</p>
                </div>
              </div>

              <div className="min-w-[85vw] snap-center md:min-w-0 md:w-auto bg-surface-container-lowest p-6 md:p-10 rounded-2xl md:rounded-xl shadow-sm md:shadow-[0_4px_40px_rgba(25,28,30,0.04)] md:transform md:translate-y-8 flex flex-col">
                <div className="flex gap-1 text-tertiary md:text-primary mb-3 md:mb-6">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="italic text-on-surface-variant md:text-on-surface md:text-lg leading-relaxed mb-4 md:mb-8 font-body">"Reemplazaron todo nuestro sistema de agua comercial durante el fin de semana. Sin tiempo de inactividad para el personal. Profesionales absolutos."</p>
                <div className="md:flex md:items-center md:gap-4 mt-auto">
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-tertiary-fixed items-center justify-center font-bold text-on-tertiary-fixed">SL</div>
                  <p className="font-bold text-blue-900 md:text-on-surface text-sm md:tracking-tight">— Sarah Lancaster</p>
                </div>
              </div>

              <div className="min-w-[85vw] snap-center md:min-w-0 md:w-auto bg-surface-container-lowest p-6 md:p-10 rounded-2xl md:rounded-xl shadow-sm md:shadow-[0_4px_40px_rgba(25,28,30,0.04)] flex flex-col">
                <div className="flex gap-1 text-tertiary md:text-primary mb-3 md:mb-6">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <p className="italic text-on-surface-variant md:text-on-surface md:text-lg leading-relaxed mb-4 md:mb-8 font-body">"Fuga de emergencia a las 3 AM. Llegaron en 20 minutos y para el amanecer ya habían presurizado y arreglado el sistema. Un servicio verdaderamente confiable."</p>
                <div className="md:flex md:items-center md:gap-4 mt-auto">
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-secondary-fixed items-center justify-center font-bold text-on-secondary-fixed">EC</div>
                  <p className="font-bold text-blue-900 md:text-on-surface text-sm md:tracking-tight">— Elena Castellanos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer (Responsive) */}
      <footer id="contacto" className="block bg-slate-100 dark:bg-slate-950 w-full border-t border-slate-200 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20 pb-32 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <h3 className="font-headline text-4xl font-extrabold text-slate-800 dark:text-slate-200 mb-8 tracking-tighter">Iniciar Consulta</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md text-lg">Habla con un ingeniero principal sobre los requisitos de tu sistema o situación de emergencia.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Línea Directa</p>
                    <p className="text-xl font-headline font-bold text-slate-800 dark:text-slate-100">(555) 012-9900</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sede Central</p>
                    <p className="text-xl font-headline font-bold text-slate-800 dark:text-slate-100">882 Flow Dr, Tech City, ST</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-xl shadow-xl flex flex-col justify-center space-y-5">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" fill="#25D366"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                </div>
                <div className="min-w-0">
                  <h4 className="font-headline text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-200">¿Ayuda inmediata?</h4>
                  <p className="text-slate-400 text-xs sm:text-sm">Respondemos en menos de 5 min</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 sm:p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-lg flex-shrink-0">schedule</span>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">Horario de Atención</p>
                  <p className="text-[11px] sm:text-xs text-slate-400">Lun–Sáb 7–21h · Emergencias 24/7</p>
                </div>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 px-3 rounded-xl hover:bg-[#22c55e] active:scale-[0.98] transition-all text-xs sm:text-sm shadow-lg shadow-[#25D366]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="currentColor" className="flex-shrink-0"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 gap-6">
            <p className="font-['Inter'] text-sm text-slate-500 dark:text-slate-400">© 2024 Precisión Hidráulica. Excelencia en Plomería.</p>
            <div className="flex gap-8">
              <a className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium underline-offset-4 hover:underline transition-all duration-300" href="#">Privacidad</a>
              <a className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium underline-offset-4 hover:underline transition-all duration-300" href="#">Términos</a>
              <a className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium underline-offset-4 hover:underline transition-all duration-300" href="#">Contacto</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FAB (Mobile Emergency Support) */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-24 right-6 z-[45] bg-[#25D366] text-white flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl active:scale-90 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
        <span className="font-bold text-sm tracking-wide">Emergencia</span>
      </a>

      {/* Floating WhatsApp for Desktop */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hidden md:flex fixed bottom-8 right-8 bg-[#25D366] text-white w-16 h-16 rounded-full shadow-2xl items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" fill="currentColor"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
        <span className="absolute right-full mr-4 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Soporte de Emergencia</span>
      </a>

      {/* BottomNavBar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-3xl">
        {[
          { id: 'inicio', href: '#', icon: 'home', label: 'Inicio' },
          { id: 'servicios', href: '#servicios', icon: 'plumbing', label: 'Servicios' },
          { id: 'proceso', href: '#proceso', icon: 'engineering', label: 'Proceso' },
          { id: 'contacto', href: '#contacto', icon: 'call', label: 'Contacto' },
        ].map((item) => (
          <a
            key={item.id}
            className={`flex flex-col items-center justify-center rounded-2xl px-4 py-1.5 transition-all duration-300 ${activeSection === item.id
                ? 'bg-blue-50 text-blue-800'
                : 'text-slate-400 hover:text-blue-700'
              }`}
            style={{ WebkitTapHighlightColor: "transparent" }}
            href={item.href}
          >
            <span className="material-symbols-outlined" style={activeSection === item.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span className="font-['Inter'] text-[11px] font-semibold mt-1">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
