// App.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Zap, DollarSign, Lightbulb, Github, Mail, Phone, BookOpen, Goal, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';
import demoImage from './assets/basket.png';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [darkMode, setDarkMode] = useState(true);

    // (Opcional) Persistir preferencia en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    } else {
      // Por default está el modo oscuro
      setDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['inicio', 'funcionamiento', 'integrantes', 'costos', 'manual', 'curiosidades', 'por-que'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const integrantes = [
    { nombre: 'Tomás Molinari', rol: 'Testing y experimentación funcional', avatar: 'https://placehold.co/120x120/06b6d4/white?text=TM' },
    { nombre: 'Martín Vergara', rol: 'Coordinación y planificación del proyecto', avatar: 'https://placehold.co/120x120/6366f1/white?text=MV' },
    { nombre: 'Santiago Anzolabehere', rol: 'Gestión de materiales y presupuesto', avatar: 'https://placehold.co/120x120/10b931/white?text=SA' },
    { nombre: 'Brian Paz', rol: 'Diseño y construcción del prototipo', avatar: 'https://placehold.co/120x120/f16366/white?text=BP' },
    { nombre: 'Franco Díaz', rol: 'Diseño y construcción del prototipo', avatar: 'https://placehold.co/120x120/9d4edd/white?text=FD' },
    { nombre: 'Santiago Martínez', rol: 'Diseño y construcción del prototipo', avatar: 'https://placehold.co/120x120/66f136/white?text=SM' },
    { nombre: 'Paolo Conte', rol: 'Diseño y construcción del prototipo', avatar: 'https://placehold.co/120x120/f59e42/white?text=PC' },
    { nombre: 'Joaquín Iglesias', rol: 'Documentación y redacción técnica', avatar: 'https://placehold.co/120x120/10b181/white?text=JI' },
    { nombre: 'Carlos Rodríguez', rol: 'Programación y desarrollo', avatar: 'https://placehold.co/120x120/8b5cf6/white?text=CR' }
  ];


const integrantesReordenados = [
  integrantes[1], // Martín
  ...integrantes.slice(0, 1), // Tomás
  ...integrantes.slice(2)
];



  const materiales = [
    { item: 'Display de 7 segmentos', precio: '$210.00' },
    { item: 'Soldador de estaño', precio: '$370.00' },
    { item: 'Pinzas cocodrilo x10', precio: '$340.00' },
    { item: 'Pintura', precio: '$220.00' },
    { item: 'Cartón grueso', precio: '$30.00' },
    { item: 'Papel aluminio', precio: '$320.00' },
    { item: 'Alambre', precio: '$300.00' },
    { item: 'Trincheta', precio: '$80.00' },
    { item: 'Cinta', precio: '$130.00' },
    { item: 'Más herramientas', precio: '$200.00' }
  ];

  const totalCostos = materiales.reduce((total, item) => {
    const precio = parseFloat(item.precio.replace('$', ''));
    return total + precio;
  }, 0);

const curiosidades = [
  {
    titulo: "Lanzamiento rápido",
    texto: "Una pelota lanzada con fuerza alcanza hasta 5 m/s en el aire"
  },
  { 
    titulo: "Energía cinética", 
    texto: "Una pelota de 60g lanzada a 5 m/s tiene una energía cinética de 0.75 Joules" 
  },
  { 
    titulo: "Tiempo de vuelo", 
    texto: "Desde una altura de 2m, la pelota tarda 0.64 segundos en llegar al suelo" 
  },
  {
  titulo: "Pequeños errores",
  texto: "Un giro o inclinación mínima al lanzar la pelota cambia mucho su trayectoria y rebote"
  },
  {
    titulo: "Camino en el aire",
    texto: "Pequeñas variaciones en cómo la lanzás cambian mucho por dónde pasa la pelota"
  },
  {
    titulo: "Rebote divertido",
    texto: "La pelota puede rebotar varias veces antes de caer, dependiendo de su peso y del material del piso"
  },
  {
    titulo: "Hasta dónde llega",
    texto: "Después de un rebote, la pelota puede subir hasta la mitad de la altura desde la que cayó, dependiendo del material"
  },
  { 
    titulo: "Fuerza de impacto", 
    texto: "Cuando la pelota toca el sensor, ejerce una pequeña fuerza que activa el sistema." 
  },
];


  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            Física y Juego
          </motion.div>
          
          <div className="nav-controls">
            <motion.button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
            >
              {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
            </motion.button>
            
            <div className="nav-menu">
              {['Inicio', 'Funcionamiento', 'Integrantes', 'Costos', 'Manual de juego', 'Curiosidades', 'Idea'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(
                    item === 'Curiosidades' ? 'curiosidades' : 
                    item.toLowerCase() === 'idea' ? 'por-que' : 
                    item === 'Manual de juego' ? 'manual' : 
                    item.toLowerCase()
                  )}
                  className={`nav-link ${
                    activeSection === (
                      item === 'Curiosidades' ? 'curiosidades' : 
                      item.toLowerCase() === 'idea' ? 'por-que' : 
                      item === 'Manual de juego' ? 'manual' : 
                      item.toLowerCase()
                    ) ? 'active' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="container">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            El juego
            <br />
            <span className="highlight">llevado a la física</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Un aro, una pelota, un display de 7 segmentos: física en juego
          </motion.p>
          
          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src={demoImage}
              alt="Demostración del proyecto" 
              className="hero-image"
            />
          </motion.div>
          
          <motion.button
            onClick={() => scrollToSection('funcionamiento')}
            className="cta-button"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver funcionamiento
            <ChevronDown className="icon" />
          </motion.button>
        </div>
      </section>

      {/* Funcionamiento Section */}
      <section id="funcionamiento" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">¿Cómo funciona?</h2>
            <p className="section-subtitle">
              El jugador tira la pelota → pasa por el aro → cae la pelota sobre el sensor → se suma un punto en el display de 7 segmentos.
            </p>
          </motion.div>

          <div className="function-grid">
            <motion.div
              className="function-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://placehold.co/500x400/6366f1/white?text=Diagrama+del+Sistema" 
                alt="Diagrama del sistema" 
              />
            </motion.div>
            
            <motion.div
              className="function-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="feature-list">
                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="feature-icon blue">
                    <Zap className="icon" />
                  </div>
                  <div>
                    <h3 className="feature-title">Movimiento Parabólico</h3>
                    <p className="feature-desc">La pelota sigue una trayectoria parabólica al ser lanzada, permitiendo calcular su trayectoria y velocidad.</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="feature-icon green">
                    <Users className="icon" />
                  </div>
                  <div>
                    <h3 className="feature-title">Detección de Paso</h3>
                    <p className="feature-desc">Sensor en el punto de caída de la pelota detecta el punto con alta precisión.</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="feature-icon purple">
                    <DollarSign className="icon" />
                  </div>
                  <div>
                    <h3 className="feature-title">Conteo Digital</h3>
                    <p className="feature-desc">El sistema registra cada acierto y lo muestra en tiempo real en el display de 7 segmentos.</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrantes Section */}
      <section id="integrantes" className="section bg-light">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Nuestro Equipo</h2>
            <p className="section-subtitle">
              Un grupo apasionado por los juegos, la tecnología y la nota.
            </p>
          </motion.div>

          <div className="team-grid">
            {integrantes.map((integrante, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
              >
                <img 
                  src={integrante.avatar} 
                  alt={integrante.nombre}
                  className="team-avatar"
                />
                <h3 className="team-name">{integrante.nombre}</h3>
                <p className="team-role">{integrante.rol}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Costos Section */}
      <section id="costos" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Desglose de Costos</h2>
            <p className="section-subtitle">
              Inversión total para construir el prototipo funcional.
            </p>
          </motion.div>

          <motion.div
            className="costs-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="costs-list">
              {materiales.map((material, index) => (
                <motion.div 
                  key={index} 
                  className="cost-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="cost-name">{material.item}</span>
                  <span className="cost-price">{material.precio}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="total-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="total-label">Total</span>
              <span className="total-amount">${totalCostos.toFixed(2)}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Manual de Juego Section */}
      <section id="manual" className="section bg-light">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <BookOpen className="manual-icon" />
            <h2 className="section-title">Manual de Juego</h2>
            <p className="section-subtitle">
              Aro de Basketball Inteligente
            </p>
          </motion.div>

          <motion.div
            className="manual-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="manual-section">
              <h3 className="manual-subtitle">Objetivo del juego</h3>
              <p className="manual-text">
                Encestar la pelota en el aro la mayor cantidad de veces posible para acumular puntos.
              </p>
            </div>

            <div className="manual-section">
              <h3 className="manual-subtitle">Reglas básicas</h3>
              <ol className="manual-list">
                {[0, 1, 2, 3].map((index) => (
                  <motion.li
                    key={index}
                    className="manual-step"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {index === 0 && "Cada vez que la pelota entra en el aro y presiona el cartón, se sumará 1 punto en la pantalla del micro:bit/Arduino."}
                    {index === 1 && "La pelota debe caer dentro del aro. Si rebota fuera, no suma punto."}
                    {index === 2 && "El jugador debe tirar la pelota desde una distancia establecida (puede marcarse en el piso con cinta)."}
                    {index === 3 && "Gana el jugador que consiga más puntos en un número de intentos o en un tiempo límite (según lo que se acuerde antes de empezar)."}
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="manual-section">
              <h3 className="manual-subtitle">Cómo jugar</h3>
              <ol className="manual-list">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.li
                    key={index}
                    className="manual-step"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {index === 0 && "Encender el sistema y verificar que la pantalla muestre el marcador en 0."}
                    {index === 1 && "El jugador se coloca detrás de la línea de tiro."}
                    {index === 2 && "Lanza la pelota hacia el aro:"}
                    {index === 3 && "Continúa el turno hasta completar la cantidad de tiros o el tiempo establecido."}
                    {index === 4 && "Al final, se compara el puntaje de cada jugador en la pantalla."}
                  </motion.li>
                ))}
                <motion.ul
                  className="manual-sublist"
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <li>Si entra, el cartón con aluminio se presiona y el circuito suma 1 punto automáticamente.</li>
                  <li>Si falla, no se suma punto y el jugador puede intentar de nuevo.</li>
                </motion.ul>
              </ol>
            </div>

            <div className="manual-section">
              <h3 className="manual-subtitle">Variantes del juego</h3>
              <ul className="manual-list">
                <li><strong>Tiempo limitado:</strong> cada jugador tiene 1 minuto para encestar lo más posible.</li>
                <li><strong>Por turnos:</strong> cada jugador tira 5 o 10 veces, gana el que tenga más puntos.</li>
                <li><strong>Distancia progresiva:</strong> después de cada enceste, el jugador retrocede un paso para aumentar la dificultad.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curiosidades de Física Section */}
      <section id="curiosidades" className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Lightbulb className="curiosities-icon" />
            <h2 className="section-title">Curiosidades de Física</h2>
            <p className="section-subtitle">
              Datos interesantes sobre la física detrás del juego
            </p>
          </motion.div>

          <div className="curiosities-grid">
            {curiosidades.map((curiosidad, index) => (
              <motion.div
                key={index}
                className="curiosity-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.2, 
                    delay: index * 0.01
                  } 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
              >
                <h3 className="curiosity-title">{curiosidad.titulo}</h3>
                <p className="curiosity-text">{curiosidad.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué la idea Section */}
      <section id="por-que" className="section idea-section">
        <div className="container">
          <motion.div
            className="idea-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Goal className="idea-icon" />
            <h2 className="section-title">¿Por qué esta idea?</h2>
            <p className="idea-text">
              Queríamos crear un juego inteligente que combinara la diversión de los juegos tradicionales 
              con la tecnología moderna y los principios fundamentales de la física. Utilizando Arduino 
              como cerebro del sistema, logramos desarrollar un juego que no solo 
              entretiene, sino que también educa sobre conceptos físicos reales.
            </p>
            <p className="idea-text secondary">
              Este proyecto demuestra cómo la tecnología accesible puede transformar juegos simples 
              en herramientas educativas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="footer-grid">
            <div className="footer-info">
              <h3 className="footer-title">Proyecto de Física - Liceo IBO</h3>
              <p className="footer-desc">
                Juegos con física.
              </p>
            </div>
            
            <div className="footer-links">
              <h4 className="footer-subtitle">Navegación Rápida</h4>
              <div className="quick-links">
                {['Inicio', 'Funcionamiento', 'Integrantes', 'Costos', 'Manual de juego', 'Curiosidades', 'Idea'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(
                      item === 'Curiosidades' ? 'curiosidades' : 
                      item.toLowerCase() === 'idea' ? 'por-que' : 
                      item === 'Manual de juego' ? 'manual' : 
                      item.toLowerCase()
                    )}
                    className="footer-link"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          
          <div className="footer-bottom" style={{ justifyContent: 'center' }}>
  <p className="copyright">© 2025 Proyecto de Física 1°4. Ningún derecho reservado.</p>
  <div className="social-links" style={{ justifyContent: 'center' }}>
    <motion.a 
      href="https://github.com/ThaCharly/fisiquinha/" 
      className="social-link"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Github className="icon" />
    </motion.a>
  </div>
</div>

        </motion.div>
      </footer>
    </div>
  );
};

export default App;