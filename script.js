/* -------------------------------------------------------------
   NeuroV8 Quantum Sensing & Metrology Logic
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. Navigation Menu & Scroll Transitions
    // ---------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    // Header background opacity on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active section nav link update
        updateActiveLink();
    });
    
    // Mobile menu toggle
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && mobileNav) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });
    
    // Active navigation state highlight based on viewport position
    const sections = document.querySelectorAll('section');
    function updateActiveLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ---------------------------------------------------------
    // 2. Scroll Reveal Engine
    // ---------------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // ---------------------------------------------------------
    // 3. Interactive Technology Cards Expansion
    // ---------------------------------------------------------
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        const summary = item.querySelector('.tech-item-summary');
        const details = item.querySelector('.tech-item-details');
        
        summary.addEventListener('click', () => {
            const isExpanded = item.classList.contains('expanded');
            
            // Collapse all other tech items first
            techItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('.tech-item-details').style.maxHeight = '0px';
                }
            });
            
            if (isExpanded) {
                item.classList.remove('expanded');
                details.style.maxHeight = '0px';
            } else {
                item.classList.add('expanded');
                details.style.maxHeight = details.scrollHeight + 'px';
                
                // Initialize canvas animation inside the clicked item
                const techId = item.getAttribute('data-tech-id');
                initTechCanvas(techId);
            }
        });
    });

    // ---------------------------------------------------------
    // 4. Testimonial Carousel
    // ---------------------------------------------------------
    const carousel = document.getElementById('testimonial-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const dots = Array.from(carousel.querySelectorAll('.dot'));
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        
        let currentIndex = 0;
        let autoplayTimer = null;
        
        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
            
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        };
        
        const slideNext = () => {
            let nextIndex = (currentIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        };
        
        const slidePrev = () => {
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(prevIndex);
        };
        
        const startAutoplay = () => {
            autoplayTimer = setInterval(slideNext, 8000);
        };
        
        const resetAutoplay = () => {
            clearInterval(autoplayTimer);
            startAutoplay();
        };
        
        nextBtn.addEventListener('click', () => {
            slideNext();
            resetAutoplay();
        });
        
        prevBtn.addEventListener('click', () => {
            slidePrev();
            resetAutoplay();
        });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateCarousel(i);
                resetAutoplay();
            });
        });
        
        startAutoplay();
    }

    // ---------------------------------------------------------
    // 5. FAQ Accordion Logic
    // ---------------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-body').style.maxHeight = '0px';
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
                body.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // ---------------------------------------------------------
    // 6. Contact Form & Feedback Handling
    // ---------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-message');
    
    if (contactForm && successMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (name && email) {
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMsg.classList.add('active');
                }, 400);
            }
        });
    }

    // ---------------------------------------------------------
    // 7. Hero Canvas - 3D Diamond Lattice & Magnetic Flux Lines
    // ---------------------------------------------------------
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let width = heroCanvas.width = heroCanvas.offsetWidth;
        let height = heroCanvas.height = heroCanvas.offsetHeight;
        
        let angle = 0;
        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;
        
        // Define a 3D Diamond Lattice coordinate set (representing the NV sensor matrix)
        const latticePoints = [
            // Outer boundaries of fcc crystal unit cell
            { x: -80, y: -80, z: -80, type: 'C' },
            { x: 80, y: -80, z: -80, type: 'C' },
            { x: 80, y: 80, z: -80, type: 'C' },
            { x: -80, y: 80, z: -80, type: 'C' },
            { x: -80, y: -80, z: 80, type: 'C' },
            { x: 80, y: -80, z: 80, type: 'C' },
            { x: 80, y: 80, z: 80, type: 'C' },
            { x: -80, y: 80, z: 80, type: 'C' },
            
            // Face-centers
            { x: 0, y: -80, z: 0, type: 'C' },
            { x: 0, y: 80, z: 0, type: 'C' },
            { x: -80, y: 0, z: 0, type: 'C' },
            { x: 80, y: 0, z: 0, type: 'C' },
            { x: 0, y: 0, z: -80, type: 'C' },
            { x: 0, y: 0, z: 80, type: 'C' },
            
            // Nitrogen Vacancy Center defect points
            { x: -20, y: -20, z: -20, type: 'V' }, // Vacancy spot
            { x: 20, y: 20, z: 20, type: 'N' }     // Doped Nitrogen atom
        ];
        
        window.addEventListener('resize', () => {
            width = heroCanvas.width = heroCanvas.offsetWidth;
            height = heroCanvas.height = heroCanvas.offsetHeight;
        });
        
        window.addEventListener('mousemove', (e) => {
            targetMouseX = e.clientX - window.innerWidth / 2;
            targetMouseY = e.clientY - window.innerHeight / 2;
        });
        
        const projectPoint = (pt, rotX, rotY) => {
            // Apply rotations
            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);
            
            // Y-Rotation
            let x1 = pt.x * cosY - pt.z * sinY;
            let z1 = pt.z * cosY + pt.x * sinY;
            
            // X-Rotation
            let y2 = pt.y * cosX - z1 * sinX;
            let z2 = z1 * cosX + pt.y * sinX;
            
            // Projection calculations
            const focal = 450;
            const distScale = focal / (z2 + 350);
            
            const px = (x1 * distScale) + width / 2 + (mouseX * 0.15);
            const py = (y2 * distScale) + height / 2 + (mouseY * 0.15);
            
            return { px, py, scale: distScale, type: pt.type, x3d: x1, y3d: y2, z3d: z2 };
        };
        
        const drawHeroLattice = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Mouse smoothing
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;
            
            angle += 0.003;
            const rotX = angle * 0.6;
            const rotY = angle;
            
            const projected = latticePoints.map(pt => projectPoint(pt, rotX, rotY));
            
            // 1. Draw Concentric Magnetic Flux Orbits (representing the Metrology fields)
            const center = projectPoint({ x: 0, y: 0, z: 0 }, rotX, rotY);
            const fluxCount = 5;
            
            for (let i = 1; i <= fluxCount; i++) {
                const rx = 100 * i * center.scale;
                const ry = 40 * i * center.scale;
                const orbitAngle = Math.sin(angle * 0.3) * 0.15;
                
                ctx.strokeStyle = `rgba(0, 230, 118, ${0.14 - (i * 0.02)})`; // laser green gradient orbits
                ctx.lineWidth = 1 + (i * 0.2);
                ctx.save();
                ctx.translate(center.px, center.py);
                ctx.rotate(orbitAngle + (i * 0.35));
                ctx.beginPath();
                ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
            
            // 2. Draw Lattice Bonds
            ctx.strokeStyle = 'rgba(11, 31, 58, 0.05)';
            ctx.lineWidth = 0.8;
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dist = Math.hypot(latticePoints[i].x - latticePoints[j].x, latticePoints[i].y - latticePoints[j].y, latticePoints[i].z - latticePoints[j].z);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(projected[i].px, projected[i].py);
                        ctx.lineTo(projected[j].px, projected[j].py);
                        ctx.stroke();
                    }
                }
            }
            
            // 3. Draw Atoms
            projected.forEach(pt => {
                let size = 4.5 * pt.scale;
                let color = 'rgba(11, 31, 58, 0.12)';
                
                if (pt.type === 'N') {
                    // Doped Nitrogen Center
                    color = '#00E676'; // laser green
                    size = 7.5 * pt.scale;
                    
                    // Add outer glow ring
                    ctx.strokeStyle = 'rgba(0, 230, 118, 0.25)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(pt.px, pt.py, size * 2.2, 0, Math.PI * 2);
                    ctx.stroke();
                } else if (pt.type === 'V') {
                    // Vacancy center
                    color = '#2962FF'; // electric blue
                    size = 4 * pt.scale;
                }
                
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(drawHeroLattice);
        };
        
        drawHeroLattice();
    }

    // ---------------------------------------------------------
    // 8. Dynamic Technology Waveforms (Canvas Previews)
    // ---------------------------------------------------------
    const activeCanvases = {};
    let animationFrameIds = {};
    
    const initTechCanvas = (techId) => {
        const canvas = document.getElementById(`canvas-${techId}`);
        if (!canvas || activeCanvases[techId]) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        activeCanvases[techId] = true;
        let tick = 0;
        
        const draw = () => {
            if (!activeCanvases[techId]) return;
            
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            tick++;
            
            if (techId === 'quantum') {
                // Spinning atomic spin vector arrow
                const cx = w / 2;
                const cy = h / 2;
                const radius = 25;
                
                // Outer ring
                ctx.strokeStyle = 'rgba(11, 31, 58, 0.08)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.stroke();
                
                // Spin vector arrow rotating up and down
                const angle = Math.sin(tick * 0.05) * Math.PI * 0.45 - (Math.PI / 2);
                const tipX = cx + Math.cos(angle) * radius;
                const tipY = cy + Math.sin(angle) * radius;
                
                ctx.strokeStyle = '#00E676';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(tipX, tipY);
                ctx.stroke();
                
                // Arrow tip head
                ctx.fillStyle = '#00E676';
                ctx.beginPath();
                ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
                ctx.fill();
            } 
            else if (techId === 'odmr') {
                // Optical Detection of Magnetic Resonance spectrum dip
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(11, 31, 58, 0.15)';
                ctx.lineWidth = 1;
                ctx.moveTo(0, h * 0.25);
                ctx.lineTo(w, h * 0.25);
                ctx.stroke();
                
                // Real-time Zeeman splitting resonance dips
                ctx.beginPath();
                ctx.strokeStyle = '#2962FF';
                ctx.lineWidth = 1.8;
                
                const splitWidth = 12 + Math.sin(tick * 0.06) * 6; // Magnetic field intensity changes splitting distance
                
                for (let x = 0; x < w; x++) {
                    const centerPoint = w / 2;
                    let dip = 0;
                    
                    // Double Lorentzian dip curves representing Zeeman splitting
                    const dipL1 = 30 / (1 + Math.pow((x - (centerPoint - splitWidth)) / 10, 2));
                    const dipL2 = 30 / (1 + Math.pow((x - (centerPoint + splitWidth)) / 10, 2));
                    dip = Math.max(dipL1, dipL2);
                    
                    const y = (h * 0.3) + dip;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                
                // 2.87 GHz center labeling representation
                ctx.fillStyle = 'rgba(11, 31, 58, 0.4)';
                ctx.font = '9px Inter';
                ctx.fillText('2.87 GHz Center Frequency', w * 0.05, h * 0.85);
            }
            else if (techId === 'cancellation') {
                // Subtractive noise cancellation waves
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(11, 31, 58, 0.08)';
                ctx.lineWidth = 1;
                
                // 1. Raw messy ambient signal
                for (let x = 0; x < w; x++) {
                    const noise = (Math.sin((x + tick) * 0.15) * 8) + (Math.sin(tick * 0.5 + x) * 12);
                    const y = (h * 0.35) + noise;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                
                // 2. Cleaned signal output below
                ctx.beginPath();
                ctx.strokeStyle = '#00E676';
                ctx.lineWidth = 1.6;
                for (let x = 0; x < w; x++) {
                    const y = (h * 0.7) + (Math.sin((x + tick * 2) * 0.08) * 12);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            else if (techId === 'readout') {
                // Light excitation ray sweeps and photodetector particle counts
                const laserX = w / 2;
                ctx.strokeStyle = 'rgba(0, 230, 118, 0.18)';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(laserX, 0);
                ctx.lineTo(laserX, h - 30);
                ctx.stroke();
                
                // Photons bouncing off
                const photonCount = 5;
                for (let i = 0; i < photonCount; i++) {
                    const py = ((tick * 1.5 + (i * 35)) % (h - 40)) + 10;
                    const px = laserX + Math.sin(py * 0.06 + i) * 20;
                    
                    ctx.fillStyle = '#00BCD4';
                    ctx.beginPath();
                    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                // Receiver base plate
                ctx.fillStyle = '#0B1F3A';
                ctx.fillRect(laserX - 25, h - 25, 50, 6);
            }
            else if (techId === 'calibration') {
                // Calibration grids adjusting and centering dots
                const gridSpacing = 20;
                ctx.strokeStyle = 'rgba(11, 31, 58, 0.03)';
                ctx.lineWidth = 0.5;
                
                // Draw local grid lines
                for (let x = 0; x < w; x += gridSpacing) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, h);
                    ctx.stroke();
                }
                for (let y = 0; y < h; y += gridSpacing) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(w, y);
                    ctx.stroke();
                }
                
                // Centering indicator box
                const cx = w / 2;
                const cy = h / 2;
                const offset = Math.sin(tick * 0.04) * 8;
                
                ctx.strokeStyle = '#2962FF';
                ctx.strokeRect(cx - 15, cy - 15, 30, 30);
                
                ctx.fillStyle = '#00E676';
                ctx.beginPath();
                ctx.arc(cx + offset, cy - offset * 0.5, 4, 0, Math.PI * 2);
                ctx.fill();
            }
            else if (techId === 'tensor-ai') {
                // Contracting tensor network flow paths
                const nodePoints = [
                    { x: w * 0.25, y: h * 0.25 },
                    { x: w * 0.25, y: h * 0.75 },
                    { x: w * 0.5, y: h * 0.5 },
                    { x: w * 0.75, y: h * 0.25 },
                    { x: w * 0.75, y: h * 0.75 }
                ];
                
                // Draw connecting tensor lines
                ctx.strokeStyle = 'rgba(11, 31, 58, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodePoints[0].x, nodePoints[0].y);
                ctx.lineTo(nodePoints[2].x, nodePoints[2].y);
                ctx.lineTo(nodePoints[1].x, nodePoints[1].y);
                ctx.moveTo(nodePoints[3].x, nodePoints[3].y);
                ctx.lineTo(nodePoints[2].x, nodePoints[2].y);
                ctx.lineTo(nodePoints[4].x, nodePoints[4].y);
                ctx.stroke();
                
                // Pulsing signals along paths
                nodePoints.forEach((pt, index) => {
                    const pulse = 3 + Math.sin(tick * 0.08 + index) * 1.5;
                    ctx.fillStyle = index === 2 ? '#00E676' : '#2962FF';
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, pulse, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            else if (techId === 'edge') {
                // Rising deterministic clock pulses
                ctx.beginPath();
                ctx.strokeStyle = '#0B1F3A';
                ctx.lineWidth = 1.2;
                
                let cx = 0;
                ctx.moveTo(0, h * 0.65);
                while (cx < w) {
                    const step = 20;
                    const toggle = Math.sin((cx + tick * 3) * 0.09) > 0;
                    const cy = toggle ? h * 0.35 : h * 0.65;
                    ctx.lineTo(cx, cy);
                    ctx.lineTo(cx + step, cy);
                    cx += step;
                }
                ctx.stroke();
            }
            else if (techId === 'nanofab') {
                // Chemical Vapor Deposition layer lattice growth
                const cols = 7;
                const rows = 4;
                const dx = w / (cols + 1);
                const dy = h / (rows + 1);
                
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const px = dx * (c + 1);
                        const py = dy * (r + 1);
                        
                        // Slowly grow/reveal layers from bottom to top
                        const threshold = (rows - r) * 18 - 8;
                        const visible = (tick % 90) > threshold;
                        
                        if (visible) {
                            ctx.fillStyle = 'rgba(0, 230, 118, 0.45)';
                            ctx.beginPath();
                            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                }
            }
            
            animationFrameIds[techId] = requestAnimationFrame(draw);
        };
        
        draw();
    };

    // ---------------------------------------------------------
    // 9. Interactive Research Foundation (Network & Details)
    // ---------------------------------------------------------
    const researchCanvas = document.getElementById('research-network-canvas');
    if (researchCanvas) {
        const ctx = researchCanvas.getContext('2d');
        let w = researchCanvas.width = researchCanvas.offsetWidth;
        let h = researchCanvas.height = researchCanvas.offsetHeight;
        
        const nodes = [];
        const nodeCount = 45;
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 2 + 1
            });
        }
        
        window.addEventListener('resize', () => {
            w = researchCanvas.width = researchCanvas.offsetWidth;
            h = researchCanvas.height = researchCanvas.offsetHeight;
        });
        
        const nodesElements = document.querySelectorAll('.research-node');
        const descBox = document.getElementById('node-description-box');
        
        nodesElements.forEach(nodeElem => {
            nodeElem.addEventListener('mouseenter', () => {
                nodesElements.forEach(n => n.classList.remove('active'));
                nodeElem.classList.add('active');
                
                const text = nodeElem.getAttribute('data-desc');
                descBox.innerHTML = `<p>${text}</p>`;
            });
        });
        
        const drawNetwork = () => {
            ctx.clearRect(0, 0, w, h);
            
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                if (node.x < 0 || node.x > w) node.vx *= -1;
                if (node.y < 0 || node.y > h) node.vy *= -1;
                
                ctx.fillStyle = 'rgba(11, 31, 58, 0.12)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (dist < 100) {
                        const alpha = (1 - (dist / 100)) * 0.08;
                        ctx.strokeStyle = `rgba(11, 31, 58, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(drawNetwork);
        };
        
        drawNetwork();
    }

    // ---------------------------------------------------------
    // 10. Future Vision NV-Diamond Canvas
    // ---------------------------------------------------------
    const quantumCanvas = document.getElementById('quantum-sensor-canvas');
    if (quantumCanvas) {
        const ctx = quantumCanvas.getContext('2d');
        let w = quantumCanvas.width = quantumCanvas.offsetWidth;
        let h = quantumCanvas.height = quantumCanvas.offsetHeight;
        
        window.addEventListener('resize', () => {
            w = quantumCanvas.width = quantumCanvas.offsetWidth;
            h = quantumCanvas.height = quantumCanvas.offsetHeight;
        });
        
        let latticeAngle = 0;
        
        const points = [
            { x: -50, y: -50, z: -50, type: 'C' },
            { x: 50, y: -50, z: -50, type: 'C' },
            { x: 50, y: 50, z: -50, type: 'C' },
            { x: -50, y: 50, z: -50, type: 'C' },
            { x: -50, y: -50, z: 50, type: 'C' },
            { x: 50, y: -50, z: 50, type: 'C' },
            { x: 50, y: 50, z: 50, type: 'C' },
            { x: -50, y: 50, z: 50, type: 'C' },
            { x: 0, y: 0, z: 0, type: 'V' },
            { x: 20, y: 20, z: 20, type: 'N' }
        ];
        
        const drawLattice = () => {
            ctx.clearRect(0, 0, w, h);
            latticeAngle += 0.006;
            
            const projected = points.map(pt => {
                const cosY = Math.cos(latticeAngle);
                const sinY = Math.sin(latticeAngle);
                const cosX = Math.cos(latticeAngle * 0.5);
                const sinX = Math.sin(latticeAngle * 0.5);
                
                let x1 = pt.x * cosY - pt.z * sinY;
                let z1 = pt.z * cosY + pt.x * sinY;
                let y2 = pt.y * cosX - z1 * sinX;
                let z2 = z1 * cosX + pt.y * sinX;
                
                const focal = 320;
                const scale = focal / (z2 + 250);
                const px = (x1 * scale) + w / 2;
                const py = (y2 * scale) + h / 2;
                
                return { px, py, scale, type: pt.type };
            });
            
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y, points[i].z - points[j].z);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(projected[i].px, projected[i].py);
                        ctx.lineTo(projected[j].px, projected[j].py);
                        ctx.stroke();
                    }
                }
            }
            
            const vacancy = projected[8];
            const radiusOsc = 40 + Math.sin(latticeAngle * 5) * 15;
            
            ctx.strokeStyle = 'rgba(0, 230, 118, 0.28)'; // Laser Green waves
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(vacancy.px, vacancy.py, radiusOsc * vacancy.scale, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.strokeStyle = 'rgba(0, 188, 212, 0.12)';
            ctx.beginPath();
            ctx.arc(vacancy.px, vacancy.py, (radiusOsc + 20) * vacancy.scale, 0, Math.PI * 2);
            ctx.stroke();
            
            projected.forEach(pt => {
                let size = 6 * pt.scale;
                let color = 'rgba(255, 255, 255, 0.6)';
                
                if (pt.type === 'N') {
                    color = '#00E676'; // laser green
                    size = 9 * pt.scale;
                } else if (pt.type === 'V') {
                    color = '#2962FF';
                    size = 5 * pt.scale;
                }
                
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(drawLattice);
        };
        
        drawLattice();
    }

    // ---------------------------------------------------------
    // 11. Contact Form Side Canvas Graphic
    // ---------------------------------------------------------
    const contactCanvas = document.getElementById('contact-mesh-canvas');
    if (contactCanvas) {
        const ctx = contactCanvas.getContext('2d');
        let w = contactCanvas.width = contactCanvas.offsetWidth;
        let h = contactCanvas.height = contactCanvas.offsetHeight;
        
        window.addEventListener('resize', () => {
            w = contactCanvas.width = contactCanvas.offsetWidth;
            h = contactCanvas.height = contactCanvas.offsetHeight;
        });
        
        const nodes = [];
        const count = 30;
        
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            });
        }
        
        const drawMesh = () => {
            ctx.clearRect(0, 0, w, h);
            
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
                
                ctx.fillStyle = 'rgba(41, 98, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
                    if (dist < 80) {
                        const alpha = (1 - (dist / 80)) * 0.12;
                        ctx.strokeStyle = `rgba(0, 188, 212, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(drawMesh);
        };
        
        drawMesh();
    }
});
