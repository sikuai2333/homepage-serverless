// 高级动画效果

// 粒子背景效果
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particlesArray = [];
        this.numberOfParticles = 100;
        this.mousePosition = {
            x: null,
            y: null,
            radius: 150
        };

        this.init();
    }

    init() {
        // 设置画布
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);

        // 设置画布大小
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // 鼠标交互
        window.addEventListener('mousemove', (event) => {
            this.mousePosition.x = event.x;
            this.mousePosition.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            this.mousePosition.x = null;
            this.mousePosition.y = null;
        });

        // 创建粒子
        this.createParticles();

        // 开始动画
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // 重新创建粒子以适应新的画布大小
        this.createParticles();
    }

    createParticles() {
        this.particlesArray = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            const size = Math.random() * 5 + 1;
            const x = Math.random() * (this.canvas.width - size * 2) + size;
            const y = Math.random() * (this.canvas.height - size * 2) + size;
            const directionX = (Math.random() * 2) - 1;
            const directionY = (Math.random() * 2) - 1;
            const color = `rgba(0, 120, 212, ${Math.random() * 0.5 + 0.2})`;

            this.particlesArray.push(new Particle(x, y, directionX, directionY, size, color, this));
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
        }

        this.connect();
    }

    connect() {
        const maxDistance = 150;
        for (let a = 0; a < this.particlesArray.length; a++) {
            for (let b = a; b < this.particlesArray.length; b++) {
                const dx = this.particlesArray[a].x - this.particlesArray[b].x;
                const dy = this.particlesArray[a].y - this.particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    this.ctx.strokeStyle = `rgba(0, 120, 212, ${opacity * 0.5})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
                    this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color, parent) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.parent = parent;
        this.speedFactor = Math.random() * 0.5 + 0.2;
    }

    draw() {
        this.parent.ctx.beginPath();
        this.parent.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.parent.ctx.fillStyle = this.color;
        this.parent.ctx.fill();
    }

    update() {
        // 边界检测
        if (this.x > this.parent.canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > this.parent.canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // 鼠标交互
        if (this.parent.mousePosition.x != null && this.parent.mousePosition.y != null) {
            const dx = this.x - this.parent.mousePosition.x;
            const dy = this.y - this.parent.mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.parent.mousePosition.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (this.parent.mousePosition.radius - distance) / this.parent.mousePosition.radius;
                const directionX = forceDirectionX * force * this.size * 0.5;
                const directionY = forceDirectionY * force * this.size * 0.5;

                this.x += directionX;
                this.y += directionY;
            }
        }

        // 移动粒子
        this.x += this.directionX * this.speedFactor;
        this.y += this.directionY * this.speedFactor;

        // 绘制粒子
        this.draw();
    }
}

// 3D卡片效果
class Card3DEffect {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    handleMouseEnter(card) {
        card.style.transition = 'transform 0.1s ease';
    }

    handleMouseLeave(card) {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// 视差滚动效果
class ParallaxEffect {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop - window.innerHeight && 
                scrollTop <= sectionTop + sectionHeight) {
                
                const speed = section.getAttribute('data-parallax-speed') || 0.2;
                const yPos = (scrollTop - sectionTop) * speed;
                
                section.style.backgroundPositionY = `${yPos}px`;
                
                // 为子元素添加视差效果
                const parallaxElements = section.querySelectorAll('[data-parallax]');
                parallaxElements.forEach(element => {
                    const elementSpeed = element.getAttribute('data-parallax') || 0.4;
                    const elementYPos = (scrollTop - sectionTop) * elementSpeed;
                    element.style.transform = `translateY(${elementYPos}px)`;
                });
            }
        });
    }
}

// 文字动画效果
class TextAnimation {
    constructor() {
        this.animatedTexts = document.querySelectorAll('.animated-text');
        this.init();
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateText(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.animatedTexts.forEach(text => {
            // 准备文本
            this.prepareText(text);
            // 观察元素
            observer.observe(text);
        });
    }

    prepareText(element) {
        const text = element.textContent;
        element.textContent = '';
        
        // 为每个字符创建span
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `opacity 0.5s ease, transform 0.5s ease ${i * 0.03}s`;
            element.appendChild(span);
        }
    }

    animateText(element) {
        const spans = element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }
}

// 滚动触发动画
class ScrollAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-animate');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// 初始化所有动画
document.addEventListener('DOMContentLoaded', function() {
    // 添加粒子背景
    new ParticleBackground();
    
    // 添加3D卡片效果
    new Card3DEffect('.project-card');
    
    // 添加视差滚动效果
    new ParallaxEffect();
    
    // 添加文字动画效果
    new TextAnimation();
    
    // 添加滚动触发动画
    new ScrollAnimation();
    
    // 为各部分添加视差属性
    document.querySelectorAll('section').forEach(section => {
        section.setAttribute('data-parallax-speed', '0.2');
    });
    
    // 为标题添加动画类
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animated-text');
    });
    
    // 为项目卡片、技能条和其他元素添加滚动动画类
    document.querySelectorAll('.project-card, .skill-item, .about-details .detail-item').forEach(element => {
        element.classList.add('scroll-animate');
    });
});