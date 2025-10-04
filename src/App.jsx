// App.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Zap, DollarSign, Lightbulb, Github, Mail, Phone, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import './App.css';
import demoImage from './assets/pelota.png'; // Ajusta la ruta según la ubicación del archivo

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

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
    { nombre: 'Martín Vergara', rol: 'Líder e idea', avatar: 'https://placehold.co/120x120/6366f1/white?text=MV' },
    { nombre: 'Carlos Rodríguez', rol: 'Programación', avatar: 'https://placehold.co/120x120/8b5cf6/white?text=CR' },
    { nombre: 'Tomás Molinari', rol: 'Testing y experimentación', avatar: 'https://placehold.co/120x120/06b6d4/white?text=TM' },
    { nombre: 'Santiago Anzolabehere', rol: 'Materiales y disponibilidad', avatar: 'https://placehold.co/120x120/10b931/white?text=SA' },
    { nombre: 'Joaquín Iglesias', rol: 'Armado de textos', avatar: 'https://placehold.co/120x120/10b181/white?text=JI' },
    { nombre: 'Brian Paz', rol: 'Armado de maqueta', avatar: 'https://placehold.co/120x120/f16366/white?text=BP' },
    { nombre: 'Santiago Martínez', rol: 'Armado de maqueta', avatar: 'https://placehold.co/120x120/66f136/white?text=SM' }
  ];

  const materiales = [
    { item: 'Aro de metal', precio: '$15.00' },
    { item: 'Sensor infrarrojo', precio: '$8.50' },
    { item: 'Display 7 segmentos', precio: '$12.00' },
    { item: 'Arduino Uno', precio: '$25.00' },
    { item: 'Madera para base', precio: '$20.00' },
    { item: 'Cables y conectores', precio: '$10.00' },
    { item: 'Fuente de alimentación', precio: '$18.00' }
  ];

  const totalCostos = materiales.reduce((total, item) => {
    const precio = parseFloat(item.precio.replace('$', ''));
    return total + precio;
  }, 0);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
          >
            Física en Acción
          </motion.div>
          
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
            Un aro, una pelota, un display de 7 segmentos: física en acción
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
              El jugador tira la pelota → pasa por el aro → sensor detecta → se suma un punto en el display de 7 segmentos.
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
                <div className="feature-item">
                  <div className="feature-icon blue">
                    <Zap className="icon" />
                  </div>
                  <div>
                    <h3 className="feature-title">Movimiento Parabólico</h3>
                    <p className="feature-desc">La pelota sigue una trayectoria parabólica al ser lanzada, permitiendo calcular su trayectoria y velocidad.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon green">
                    <Users className="icon" />
                  </div>
                  <div>
                    <h3 className="feature-title">Detección de Paso</h3>
                    <p className="feature-desc">Sensores infrarrojos detectan el paso de la pelota a través del aro con precisión milimétrica.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon purple">
                    <DollarSign className="icon" />
                  </div>
                  <div>
                    <h3 className="feature-title">Conteo Digital</h3>
                    <p className="feature-desc">El sistema registra cada acierto y lo muestra en tiempo real en el display de 7 segmentos.</p>
                  </div>
                </div>
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
              Un grupo apasionado por la física, la tecnología y la innovación educativa.
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
                whileHover={{ y: -10 }}
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
                <div key={index} className="cost-item">
                  <span className="cost-name">{material.item}</span>
                  <span className="cost-price">{material.precio}</span>
                </div>
              ))}
            </div>
            
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-amount">${totalCostos.toFixed(2)}</span>
            </div>
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
                <li>Cada vez que la pelota entra en el aro y presiona el cartón, se sumará 1 punto en la pantalla del micro:bit/Arduino.</li>
                <li>La pelota debe caer dentro del aro. Si rebota fuera, no suma punto.</li>
                <li>El jugador debe tirar la pelota desde una distancia establecida (puede marcarse en el piso con cinta).</li>
                <li>Gana el jugador que consiga más puntos en un número de intentos o en un tiempo límite (según lo que se acuerde antes de empezar).</li>
              </ol>
            </div>

            <div className="manual-section">
              <h3 className="manual-subtitle">Cómo jugar</h3>
              <ol className="manual-list">
                <li>Encender el sistema y verificar que la pantalla muestre el marcador en 0.</li>
                <li>El jugador se coloca detrás de la línea de tiro.</li>
                <li>Lanza la pelota hacia el aro:
                  <ul className="manual-sublist">
                    <li>Si entra, el cartón con aluminio se presiona y el circuito suma 1 punto automáticamente.</li>
                    <li>Si falla, no se suma punto y el jugador puede intentar de nuevo.</li>
                  </ul>
                </li>
                <li>Continúa el turno hasta completar la cantidad de tiros o el tiempo establecido.</li>
                <li>Al final, se compara el puntaje de cada jugador en la pantalla.</li>
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
            <Lightbulb className="idea-icon" />
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
        <div className="container">
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
            <p className="copyright">© 2025 Proyecto de Física, 1°4. Ningún derecho reservado.</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Github className="icon" />
              </a>
              <a href="#" className="social-link">
                <Mail className="icon" />
              </a>
              <a href="#" className="social-link">
                <Phone className="icon" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;