// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Users, Zap, DollarSign, Lightbulb, Github, Mail, Phone, BookOpen, Sun, Moon, basketball } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [darkMode, setDarkMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});
  const [counterValues, setCounterValues] = useState({});
  const [showCuriosities, setShowCuriosities] = useState(false);
  
  const costRef = useRef(null);
  const curiositiesRef = useRef(null);

  // Efecto para el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['inicio', 'funcionamiento', 'integrantes', 'costos', 'manual', 'por-que'];
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
      
      // Verificar si estamos en la sección de costos
      if (costRef.current) {
        const rect = costRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          // Iniciar animación de contadores
          materiales.forEach((material, index) => {
            const precio = parseFloat(material.precio.replace('$', ''));
            setCounterValues(prev => ({ ...prev, [index]: 0 }));
            
            let current = 0;
            const increment = precio / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= precio) {
                setCounterValues(prev => ({ ...prev, [index]: precio }));
                clearInterval(timer);
              } else {
                setCounterValues(prev => ({ ...prev, [index]: current }));
              }
            }, 30);
          });
          
          // Total
          const total = materiales.reduce((sum, item) => {
            return sum + parseFloat(item.precio.replace('$', ''));
          }, 0);
          setCounterValues(prev => ({ ...prev, total: 0 }));
          
          let currentTotal = 0;
          const incrementTotal = total / 50;
          const timerTotal = setInterval(() => {
            currentTotal += incrementTotal;
            if (currentTotal >= total) {
              setCounterValues(prev => ({ ...prev, total }));
              clearInterval(timerTotal);
            } else {
              setCounterValues(prev => ({ ...prev, total: currentTotal }));
            }
          }, 30);
        }
      }
      
      // Verificar si estamos en la sección de curiosidades
      if (curiositiesRef.current) {
        const rect = curiositiesRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setShowCuriosities(true);
        }
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

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const integrantes = [
    { nombre: 'Martín Vergara', rol: 'Líder e idea', avatar: 'https://placehold.co/120x120/6366f1/white?text=MV' },
    { nombre: 'Carlos Rodríguez', rol: 'Programación', avatar: 'https://placehold.co/120x120/8b5cf6/white?text=CR' },
    { nombre: 'Tomás Molinari', rol: 'Testing y experimentación', avatar: 'https://placehold.co/120x120/06b6d4/white?text=TM' },
    { nombre: 'Santiago Anzolabehere', rol: 'Materiales y disponibilidad', avatar: 'https://placehold.co/120x120/10b931/white?text=SA' },
    { nombre: 'Joaquín Iglesias', rol: 'Armado de textos', avatar: 'https://placehold.co/120x120/10b181/white?text=JI' },
    { nombre: 'Brian Paz', rol: 'Armado de maqueta', avatar: 'https://placehold.co/120x120/f16366/white?text=BP' },
    { nombre: 'Santiago Martínez', rol: 'Armado de maqueta', avatar: 'https://placehold.co/120x120/66f136/white?text=SM' }
  ];

  const materiales = [
    { item: 'Pintura', precio: '$219.00' },
    { item: 'Carton Grueso', precio: '$10.00' },
    { item: 'Papel aluminio', precio: '$320.00' },
    { item: 'Alambre', precio: '$300.00' },
    { item: 'Trincheta', precio: '$80.00' },
    { item: 'Cinta', precio: '$130.00' },
    { item: 'Más herramientas', precio: '$100.00' }
  ];

  const totalCostos = materiales.reduce((total, item) => {
    const precio = parseFloat(item.precio.replace('$', ''));
    return total + precio;
  }, 0);

  const curiosidades = [
    { 
      titulo: "Parábola perfecta", 
      texto: "La trayectoria ideal para encestar es una parábola con ángulo de 45° y velocidad inicial de 7 m/s" 
    },
    { 
      titulo: "Fuerza de impacto", 
      texto: "Al caer en el sensor, la pelota ejerce una fuerza de aproximadamente 0.5N durante 0.1 segundos" 
    },
    { 
      titulo: "Energía cinética", 
      texto: "Una pelota de 60g lanzada a 5 m/s tiene una energía cinética de 0.75 Joules" 
    },
    { 
      titulo: "Tiempo de vuelo", 
      texto: "Desde una altura de 2m, la pelota tarda 0.64 segundos en llegar al suelo" 
    }
  ];

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Partículas de fondo */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            Física en Acción
          </motion.div>
          
          <div className="nav-controls">
            <motion.button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
            </motion.button>
            
            <div className="nav-menu">
              {['Inicio', 'Funcionamiento', 'Integrantes', 'Costos', 'Manual de juego', 'Idea'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'idea' ? 'por-que' : item === 'Manual de juego' ? 'manual' : item.toLowerCase())}
                  className={`nav-link ${
                    activeSection === (item.toLowerCase() === 'idea' ? 'por-que' : item === 'Manual de juego' ? 'manual' : item.toLowerCase())
                      ? 'active'
                      : ''
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
              src="https://placehold.co/600x400/6366f1/white?text=Demostraci%C3%B3n+del+proyecto" 
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
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)"
            }}
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
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: 5
                }}
                style={{ transformStyle: 'preserve-3d' }}
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
      <section id="costos" className="section" ref={costRef}>
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
                  <motion.span 
                    className="cost-price arcade-counter"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    ${counterValues[index] ? counterValues[index].toFixed(2) : '0.00'}
                  </motion.span>
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
              <motion.span 
                className="total-amount arcade-counter"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                ${counterValues.total ? counterValues.total.toFixed(2) : '0.00'}
              </motion.span>
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
                    onClick={() => toggleStep(`reglas-${index}`)}
                  >
                    <div className="step-content">
                      {index === 0 && "Cada vez que la pelota entra en el aro y presiona el cartón, se sumará 1 punto en la pantalla del micro:bit/Arduino."}
                      {index === 1 && "La pelota debe caer dentro del aro. Si rebota fuera, no suma punto."}
                      {index === 2 && "El jugador debe tirar la pelota desde una distancia establecida (puede marcarse en el piso con cinta)."}
                      {index === 3 && "Gana el jugador que consiga más puntos en un número de intentos o en un tiempo límite (según lo que se acuerde antes de empezar)."}
                    </div>
                    <AnimatePresence>
                      {completedSteps[`reglas-${index}`] && (
                        <motion.div
                          className="step-check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                    onClick={() => toggleStep(`jugar-${index}`)}
                  >
                    <div className="step-content">
                      {index === 0 && "Encender el sistema y verificar que la pantalla muestre el marcador en 0."}
                      {index === 1 && "El jugador se coloca detrás de la línea de tiro."}
                      {index === 2 && "Lanza la pelota hacia el aro:"}
                      {index === 3 && "Continúa el turno hasta completar la cantidad de tiros o el tiempo establecido."}
                      {index === 4 && "Al final, se compara el puntaje de cada jugador en la pantalla."}
                    </div>
                    <AnimatePresence>
                      {completedSteps[`jugar-${index}`] && (
                        <motion.div
                          className="step-check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
                {completedSteps['jugar-2'] && (
                  <motion.ul
                    className="manual-sublist"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <li>Si entra, el cartón con aluminio se presiona y el circuito suma 1 punto automáticamente.</li>
                    <li>Si falla, no se suma punto y el jugador puede intentar de nuevo.</li>
                  </motion.ul>
                )}
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

      {/* Curiosidades Section */}
      <section id="curiosidades" className="section" ref={curiositiesRef}>
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
                initial={{ opacity: 0, y: 30, rotate: Math.random() * 10 - 5 }}
                animate={showCuriosities ? { 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0,
                  transition: { 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  } 
                } : {}}
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
            <Basketball className="idea-icon" />
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
                {['Inicio', 'Funcionamiento', 'Integrantes', 'Costos', 'Manual de juego', 'Idea'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase() === 'idea' ? 'por-que' : item === 'Manual de juego' ? 'manual' : item.toLowerCase())}
                    className="footer-link"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">© 2025 Proyecto de Física 1°4. Ningún derecho reservado.</p>
            <div className="social-links">
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="icon" />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="icon" />
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ 
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)",
                  scale: 1.1
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="icon" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default App;