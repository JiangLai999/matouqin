/**
 * Gene Atlas: Morin Khuur v2
 * Scroll animations, navigation behavior, Lenis smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    optimizeMobileExperience();
    reorderPageSections();
    initLenis();
    initGSAP();
    initNavbarScroll();
    initHeroAnimation();
    initSectionAnimations();
    initBarChartAnimation();
    initDashboardCounter();
    initHeritageAnimation();
    initSideNavigation();
    initBackToTop();
    initInteractiveElements();
    initFoldingAnimation();
    initCraftTabs();
    initToolCraftLinkage();
    initHistoryModule();
    initInstrumentTypes();
    initPerformanceFingering();
    initHashNavigation();
    initMobileNav();
});

function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const panel = document.getElementById('mobileNavPanel');
    if (!toggle || !panel) return;

    function setOpen(open) {
        toggle.classList.toggle('is-open', open);
        panel.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        document.body.classList.toggle('mobile-nav-open', open);
    }

    toggle.addEventListener('click', function() {
        setOpen(!panel.classList.contains('is-open'));
    });

    panel.querySelectorAll('.mobile-nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            setOpen(false);
        });
    });

    document.addEventListener('click', function(e) {
        if (!panel.classList.contains('is-open')) return;
        if (panel.contains(e.target) || toggle.contains(e.target)) return;
        setOpen(false);
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) setOpen(false);
    });
}

function initHashNavigation() {
    let lastHandledHash = '';

    function scrollToHashTarget(force) {
        const hash = window.location.hash;
        if (!hash) return;
        if (!force && hash === lastHandledHash) return;

        const target = document.querySelector(hash);
        if (!target) return;

        lastHandledHash = hash;
        const options = { offset: -100, duration: 1.1 };

        if (typeof lenis !== 'undefined' && lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(target, options);
        } else {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
            window.scrollBy(0, -100);
        }
    }

    window.addEventListener('load', () => setTimeout(() => scrollToHashTarget(true), 350));
    window.addEventListener('pageshow', () => setTimeout(() => scrollToHashTarget(true), 350));
    window.addEventListener('hashchange', () => setTimeout(() => scrollToHashTarget(true), 50));
    setTimeout(() => scrollToHashTarget(true), 250);
}

function optimizeMobileExperience() {
    const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobileViewport) return;

    document.querySelectorAll('img').forEach((img, index) => {
        if (index > 3) {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        }
    });
}

function reorderPageSections() {
    const main = document.querySelector('main');
    if (!main) return;

    const order = [
        'hero',
        'dashboard',
        'anatomy',
        'history',
        'craftsmanship',
        'instrument-types',
        'patterns',
        'culture',
        'music-classification',
        'performance',
        'heritage',
        'application',
        'epilogue'
    ];

    order.forEach((id) => {
        const section = document.getElementById(id);
        if (section) main.appendChild(section);
    });
}

// ==================== Lenis Smooth Scroll ====================
let lenis;

function initLenis() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        lenis = {
            scrollTo(target, options) {
                const offset = options && typeof options.offset === 'number' ? options.offset : 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset + offset;
                window.scrollTo({ top, behavior: 'smooth' });
            },
            on() {},
            raf() {}
        };
        return;
    }

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

// ==================== GSAP Init ====================
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);
}

// ==================== Navbar Scroll Effect ====================
function initNavbarScroll() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { offset: -80, duration: 1.2 });
            }
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstSection = document.querySelector('.content-section');
            if (firstSection) {
                lenis.scrollTo(firstSection, { offset: -80, duration: 1.5 });
            }
        });
    }
}

// ==================== Hero Entrance Animation ====================
function initHeroAnimation() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-meta span', {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.4')
    .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    }, '-=1.2');
}

// ==================== Section Scroll Animations ====================
function initSectionAnimations() {
    const sections = document.querySelectorAll('.content-section:not(#heritage)');

    sections.forEach(section => {
        // Section icon
        const icon = section.querySelector('.section-icon');
        if (icon) {
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        // Left column content
        const left = section.querySelector('.section-left');
        if (left) {
            gsap.from(left.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        // Right column content
        const right = section.querySelector('.section-right');
        if (right) {
            gsap.from(right, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Divider lines
        const dividers = section.querySelectorAll('.divider');
        dividers.forEach(div => {
            gsap.from(div, {
                scrollTrigger: {
                    trigger: div,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    });

    // Craft grid cards stagger
    const craftCards = document.querySelectorAll('.craft-card');
    if (craftCards.length) {
        gsap.from(craftCards, {
            scrollTrigger: {
                trigger: '.craft-grid',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out'
        });
    }

    // History chart tags
    const tags = document.querySelectorAll('.history-chart-wrapper .inst-tag');
    if (tags.length) {
        gsap.from(tags, {
            scrollTrigger: {
                trigger: '.history-chart-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 15,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// ==================== Bar Chart Growing Animation ====================
function initBarChartAnimation() {
    const bars = document.querySelectorAll('.bar-chart .bar:not(.music-bar)');
    if (!bars.length) return;

    bars.forEach(bar => {
        const targetHeight = bar.style.height;
        bar.style.height = '0%';

        gsap.to(bar, {
            scrollTrigger: {
                trigger: '.bar-chart',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            height: targetHeight,
            duration: 0.8,
            ease: 'power2.out',
            delay: Array.from(bars).indexOf(bar) * 0.04
        });
    });
}

// ==================== History Module ====================
function initHistoryModule() {
    const historySection = document.querySelector('#history');
    if (!historySection) return;

    var totalActs = 5;
    var currentAct = 0;
    var actContainer = historySection.querySelector('.act-container');
    var acts = actContainer ? actContainer.querySelectorAll('.act') : [];
    var steps = historySection.querySelectorAll('.progress-step');
    var fill = document.getElementById('progressFill');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var counter = document.getElementById('actCounter');
    var slideImg = document.getElementById('historySlideImg');
    var lightbox = document.getElementById('historyLightbox');
    var lightboxImg = document.getElementById('historyLightboxImg');
    var chartTitleZh = document.getElementById('chartTitleZh');
    var chartTitleEn = document.getElementById('chartTitleEn');
    var chartStageBadge = document.getElementById('chartStageBadge');
    var chartFooterNote = document.getElementById('chartFooterNote');
    var zoomBtn = document.getElementById('historyZoomBtn');
    var overviewBtn = document.getElementById('historyOverviewBtn');

    var slideImages = [
        'assets/history/history-xiqin.jpeg',
        'assets/history/history-huobusi.jpeg',
        'assets/history/history-mawei.jpeg',
        'assets/history/history-chaoer.jpeg',
        'assets/history/history-modern.jpeg'
    ];

    var slideTitles = [
        { zh: '唐代 · 奚琴', en: 'Xiqin — Tang Dynasty' },
        { zh: '元蒙时期 · 火不思', en: 'Huobusi — Yuan & Mongol Period' },
        { zh: '宋代 · 马尾胡琴', en: 'Mawei Huqin — Song Dynasty' },
        { zh: '元代 · 潮尔', en: 'Chaor — Yuan Dynasty' },
        { zh: '20世纪50年代 · 现代马头琴', en: 'Modern Morin Khuur — 1950s to Present' }
    ];

    var slideSources = [
        '宋代陈《乐书》',
        '元代宫廷乐器图谱',
        '宋代乐器图谱',
        '清代《皇朝礼器图式》',
        '中国非物质文化遗产网'
    ];

    function goToAct(index) {
        if (index < 0 || index >= totalActs) return;

        acts.forEach(function(act) {
            act.classList.remove('visible');
        });

        var target = actContainer.querySelector('[data-act="' + index + '"]');
        if (target) {
            target.style.animation = 'none';
            target.offsetHeight;
            target.style.animation = '';
            target.classList.add('visible');
        }

        steps.forEach(function(step, i) {
            step.classList.remove('active', 'completed');
            if (i < index) step.classList.add('completed');
            if (i === index) step.classList.add('active');
        });

        if (fill) {
            fill.style.width = ((index / (totalActs - 1)) * 100) + '%';
        }

        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === totalActs - 1;
        if (counter) counter.textContent = (index + 1) + ' / ' + totalActs;
        if (chartTitleZh && slideTitles[index]) chartTitleZh.textContent = slideTitles[index].zh;
        if (chartTitleEn && slideTitles[index]) chartTitleEn.textContent = slideTitles[index].en;
        if (chartStageBadge) chartStageBadge.textContent = ('0' + (index + 1)).slice(-2) + ' / 05';

        if (slideImg && slideImages[index]) {
            var placeholder = document.getElementById('imgPlaceholder');

            slideImg.classList.add('loading');
            slideImg.style.opacity = '0';
            slideImg.style.transform = 'scale(0.98)';

            if (placeholder) placeholder.classList.remove('hidden');

            setTimeout(function() {
                slideImg.src = slideImages[index];
                slideImg.alt = slideTitles[index] ? slideTitles[index].zh : '历史阶段图像';
                slideImg.onload = function() {
                    slideImg.classList.remove('loading');
                    slideImg.style.opacity = '1';
                    slideImg.style.transform = 'scale(1)';
                    if (placeholder) placeholder.classList.add('hidden');
                };
                slideImg.onerror = function() {
                    slideImg.classList.remove('loading');
                    slideImg.style.opacity = '1';
                    slideImg.style.transform = 'scale(1)';
                    if (placeholder) placeholder.classList.add('hidden');
                };
            }, 150);

            if (chartFooterNote && slideSources[index]) {
                chartFooterNote.textContent = slideSources[index];
            }
        }

        currentAct = index;
    }

    steps.forEach(function(step, i) {
        step.addEventListener('click', function() { goToAct(i); });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', function() { goToAct(currentAct - 1); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() { goToAct(currentAct + 1); });
    }

    historySection.querySelectorAll('.branch-toggle').forEach(function(btn) {
        btn.addEventListener('click', function() {
            btn.classList.toggle('open');
            var list = btn.nextElementSibling;
            if (list) list.classList.toggle('open');
        });
    });

    if (slideImg) {
        slideImg.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s ease';
        slideImg.style.cursor = 'pointer';
        slideImg.addEventListener('click', function() {
            if (lightbox && lightboxImg) {
                lightboxImg.src = slideImg.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (zoomBtn) {
        zoomBtn.addEventListener('click', function() {
            if (lightbox && lightboxImg && slideImg) {
                lightboxImg.src = slideImg.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (overviewBtn) {
        overviewBtn.addEventListener('click', function() {
            if (lightbox && lightboxImg) {
                lightboxImg.src = 'assets/history/history-slide1.png';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('close-btn')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Touch swipe support for mobile
    var touchStartX = 0;
    var touchEndX = 0;
    var actContainerEl = actContainer;

    if (actContainerEl) {
        actContainerEl.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        actContainerEl.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToAct(currentAct + 1);
                } else {
                    goToAct(currentAct - 1);
                }
            }
        }, { passive: true });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') goToAct(currentAct + 1);
        if (e.key === 'ArrowLeft') goToAct(currentAct - 1);
        if (e.key === '1') goToAct(0);
        if (e.key === '2') goToAct(1);
        if (e.key === '3') goToAct(2);
        if (e.key === '4') goToAct(3);
        if (e.key === '5') goToAct(4);
        if (e.key === 'Escape') {
            if (lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    goToAct(0);
}

// ==================== Dashboard Card Animation ====================
function initDashboardCounter() {
    const cards = document.querySelectorAll('.dashboard-card');
    if (!cards.length) return;

    gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, delay: 0.3, ease: 'power2.out' }
    );
}

// ==================== Heritage Section Animation ====================
function initHeritageAnimation() {
    const heritageSection = document.querySelector('#heritage');
    if (!heritageSection) return;

    // Left column
    const left = heritageSection.querySelector('.section-left');
    if (left) {
        gsap.from(left.children, {
            scrollTrigger: {
                trigger: heritageSection,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Heritage generations stagger
    const gens = heritageSection.querySelectorAll('.heritage-gen');
    gsap.from(gens, {
        scrollTrigger: {
            trigger: '.heritage-tree',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out'
    });

    // Connectors
    const connectors = heritageSection.querySelectorAll('.heritage-connector');
    gsap.from(connectors, {
        scrollTrigger: {
            trigger: '.heritage-tree',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        scaleY: 0,
        transformOrigin: 'top center',
        stagger: 0.15,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3
    });
}

// ==================== Side Navigation ====================
function initSideNavigation() {
    const sideLinks = document.querySelectorAll('.side-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (!sideLinks.length || !sections.length) return;
    
    // Smooth scroll for side navigation
    sideLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                lenis.scrollTo(target, { offset: -80, duration: 1.2 });
            }
        });
    });
    
    // Update active state on scroll
    function updateActiveSection() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                sideLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial call
}

// ==================== Back to Top Button ====================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, { duration: 1.5 });
    });
}

// ==================== Interactive Elements ====================
function initInteractiveElements() {
    // Bar chart tooltips with detailed information
    const bars = document.querySelectorAll('.bar');
    const songData = {
        '万马奔腾': { importance: 100, description: '蒙古族经典马头琴曲，描绘万马奔腾的壮观景象' },
        '鸿雁': { importance: 90, description: '表达思乡之情的经典曲目' },
        '苏和的白马': { importance: 85, description: '讲述白马与主人的故事' },
        '诺恩吉雅': { importance: 80, description: '蒙古族传统民歌改编' },
        '达古拉': { importance: 95, description: '表达对爱人的思念之情' },
        '梦中的额吉': { importance: 70, description: '表达对母亲的思念' },
        '黑骏马': { importance: 75, description: '根据同名小说改编' },
        '嘎达梅林': { importance: 80, description: '歌颂蒙古族英雄嘎达梅林' },
        '美丽草原我的家': { importance: 60, description: '赞美草原美景' },
        '回想曲': { importance: 85, description: '回忆往事的经典曲目' },
        '鄂尔多斯': { importance: 65, description: '鄂尔多斯地区传统音乐' },
        '百鸟归巢': { importance: 75, description: '描绘百鸟归巢的景象' },
        '乌兰巴托的夜': { importance: 50, description: '蒙古国首都乌兰巴托的夜晚' },
        '十二生肖': { importance: 40, description: '以十二生肖为主题的曲目' },
        '安代舞曲': { importance: 60, description: '蒙古族传统舞蹈音乐' },
        '初升的太阳': { importance: 70, description: '描绘日出美景' },
        '成吉思汗的两匹骏马': { importance: 45, description: '讲述成吉思汗的故事' },
        '白音特拉': { importance: 30, description: '传统蒙古族音乐' }
    };
    
    bars.forEach(bar => {
        const songName = bar.querySelector('span')?.textContent;
        if (songName && songData[songName]) {
            // Create detailed tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'bar-tooltip';
            tooltip.innerHTML = `
                <strong>${songName}</strong>
                <div>重要性: ${songData[songName].importance}%</div>
                <div class="tooltip-desc">${songData[songName].description}</div>
            `;
            bar.appendChild(tooltip);
            
            // Click to toggle active state
            bar.addEventListener('click', () => {
                // Remove active from all other bars
                bars.forEach(b => {
                    if (b !== bar) b.classList.remove('active');
                });
                // Toggle active on clicked bar
                bar.classList.toggle('active');
            });
            
            // Add hover animation (only if not active)
            bar.addEventListener('mouseenter', () => {
                if (!bar.classList.contains('active')) {
                    gsap.to(bar, {
                        backgroundColor: '#C48E3C',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            bar.addEventListener('mouseleave', () => {
                if (!bar.classList.contains('active')) {
                    gsap.to(bar, {
                        backgroundColor: '#9CA3AF',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        }
    });
    
    // Craft cards with detailed step information
    const craftSteps = [
        { step: 1, title: '选取板材', desc: '选择优质五角枫木作为琴身材料' },
        { step: 2, title: '绘制形状', desc: '根据设计图纸在板材上绘制琴身轮廓' },
        { step: 3, title: '切割板材', desc: '使用锯子精确切割琴身形状' },
        { step: 4, title: '打磨边缘', desc: '用砂纸打磨琴身边缘至光滑' },
        { step: 5, title: '固定装饰', desc: '安装琴头装饰和雕刻细节' },
        { step: 6, title: '深入雕刻马头', desc: '精细雕刻马头造型' },
        { step: 7, title: '制作调音背板', desc: '制作并安装调音背板' },
        { step: 8, title: '固定背板', desc: '将背板牢固地固定在琴身上' },
        { step: 9, title: '背板上漆', desc: '为背板涂上保护漆' },
        { step: 10, title: '琴杆找平', desc: '确保琴杆平直无弯曲' },
        { step: 11, title: '琴身上弦', desc: '安装琴弦并调整张力' },
        { step: 12, title: '马头琴调音', desc: '最终调音和音质测试' }
    ];
    
    const craftCards = document.querySelectorAll('.craft-card');
    craftCards.forEach((card, index) => {
        if (craftSteps[index]) {
            // Add click to expand functionality
            card.addEventListener('click', () => {
                // Remove expanded class from all cards
                craftCards.forEach(c => c.classList.remove('expanded'));
                // Add expanded class to clicked card
                card.classList.add('expanded');
                
                // Create expanded content if not exists
                if (!card.querySelector('.craft-expanded')) {
                    const expanded = document.createElement('div');
                    expanded.className = 'craft-expanded';
                    expanded.innerHTML = `
                        <h4>${craftSteps[index].title}</h4>
                        <p>${craftSteps[index].desc}</p>
                        <div class="craft-step-number">步骤 ${craftSteps[index].step}/12</div>
                    `;
                    card.appendChild(expanded);
                }
                
                // Animate expansion
                gsap.to(card.querySelector('.craft-expanded'), {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
            
            // Add double-click to collapse
            card.addEventListener('dblclick', () => {
                const expanded = card.querySelector('.craft-expanded');
                if (expanded) {
                    gsap.to(expanded, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            card.classList.remove('expanded');
                        }
                    });
                }
            });
        }
    });
    
        // Culture circle - radial chart interaction
    const cultureCircle = document.querySelector('.culture-circle');
    if (cultureCircle) {
        const svg = cultureCircle.querySelector('.circle-svg');
        const arcs = svg.querySelectorAll('.arc');
        const curves = svg.querySelectorAll('.curve');
        const dots = svg.querySelectorAll('.dot');
        const labels = cultureCircle.querySelectorAll('.circle-labels .label');
        const detailPanel = cultureCircle.querySelector('.detail-panel');
        const detailTitle = detailPanel.querySelector('.detail-title');
        const detailDesc = detailPanel.querySelector('.detail-desc');
        const detailClose = detailPanel.querySelector('.detail-close');
        const tooltip = cultureCircle.querySelector('.tooltip');
        const legendItems = cultureCircle.querySelectorAll('.legend-item');

        const groupInfo = {
            spirit: { title: '精神主题', desc: '马头琴音乐承载的蒙古族精神内核：自由与辽阔、悲壮与抗争、乡愁与思念、忠诚与坚守。' },
            school: { title: '演奏流派', desc: '四大演奏流派：呼伦贝尔、鄂尔多斯、锡林郭勒、科尔沁，各有独特的演奏风格与传承。' },
            song:  { title: '代表曲目', desc: '经典马头琴曲目：英雄马、潮尔、阿斯儒、请恩吉雅、八骏之韵等，承载草原的记忆。' },
            craft: { title: '制作工艺', desc: '马头琴制作技艺，百余道工序，从选材到调音，凝聚匠人智慧。代表作有草原连着北京、赞歌等。' }
        };

        const groupNames = { spirit: '精神主题', school: '演奏流派', song: '代表曲目', craft: '制作工艺' };

        let activeGroup = null;

        // Highlight + dim
        function highlightGroup(group) {
            activeGroup = group;
            [arcs, curves, dots].forEach(els => els.forEach(el => {
                el.classList.toggle('highlighted', el.dataset.group === group);
                el.classList.toggle('dimmed', el.dataset.group !== group);
            }));
            labels.forEach(el => {
                el.classList.toggle('highlighted', el.dataset.group === group);
                el.classList.toggle('dimmed', el.dataset.group !== group);
            });
            legendItems.forEach(el => el.classList.toggle('active', el.dataset.group === group));
        }

        function clearHighlight() {
            activeGroup = null;
            [arcs, curves, dots, labels].forEach(els => els.forEach(el => {
                el.classList.remove('highlighted', 'dimmed');
            }));
            legendItems.forEach(el => el.classList.remove('active'));
        }

        // Tooltip
        function showTooltip(e, text) {
            tooltip.textContent = text;
            tooltip.style.display = 'block';
            const rect = cultureCircle.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
            tooltip.style.top = (e.clientY - rect.top - 28) + 'px';
        }
        function moveTooltip(e) {
            const rect = cultureCircle.getBoundingClientRect();
            tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
            tooltip.style.top = (e.clientY - rect.top - 28) + 'px';
        }
        function hideTooltip() {
            tooltip.style.display = 'none';
        }

        // Detail panel
        function showDetail(group) {
            const info = groupInfo[group];
            if (info) {
                detailTitle.textContent = info.title;
                detailDesc.textContent = info.desc;
                detailPanel.style.display = 'block';
            }
        }
        function hideDetail() {
            detailPanel.style.display = 'none';
        }

        // Bind arcs / curves / dots
        [arcs, curves, dots].forEach(els => els.forEach(el => {
            const name = groupNames[el.dataset.group] || '';
            el.addEventListener('mouseenter', e => { highlightGroup(el.dataset.group); showTooltip(e, name); });
            el.addEventListener('mousemove', moveTooltip);
            el.addEventListener('mouseleave', () => { clearHighlight(); hideTooltip(); });
            el.addEventListener('click', () => showDetail(el.dataset.group));
        }));

        // Bind labels
        labels.forEach(label => {
            const name = groupNames[label.dataset.group] || '';
            label.addEventListener('mouseenter', () => highlightGroup(label.dataset.group));
            label.addEventListener('mouseleave', clearHighlight);
            label.addEventListener('click', () => showDetail(label.dataset.group));
        });

        // Bind legend items
        legendItems.forEach(item => {
            item.addEventListener('mouseenter', () => highlightGroup(item.dataset.group));
            item.addEventListener('mouseleave', () => { if (!detailPanel.style.display || detailPanel.style.display === 'none') clearHighlight(); });
            item.addEventListener('click', () => {
                highlightGroup(item.dataset.group);
                showDetail(item.dataset.group);
            });
        });

        // Close detail
        detailClose.addEventListener('click', e => { e.stopPropagation(); hideDetail(); clearHighlight(); });
        document.addEventListener('click', e => {
            if (detailPanel.style.display === 'block' && !cultureCircle.contains(e.target)) {
                hideDetail(); clearHighlight();
            }
        });

        // Center hub
        const centerHub = svg.querySelector('.center-hub');
        centerHub.addEventListener('click', () => {
            gsap.to(arcs, { strokeWidth: 28, duration: 0.3, stagger: 0.03, yoyo: true, repeat: 1, ease: 'power2.out' });
            ['spirit','school','song','craft'].forEach((g, i) => setTimeout(() => { highlightGroup(g); showDetail(g); }, i * 700));
            setTimeout(() => { hideDetail(); clearHighlight(); }, 2800);
        });
        centerHub.addEventListener('mouseenter', e => showTooltip(e, '点击探索全部'));
        centerHub.addEventListener('mouseleave', hideTooltip);
    }
// Performance section interactive elements
    const performanceElements = document.querySelectorAll('.performance-posture, .performance-detail, .fingering-section');
    performanceElements.forEach(el => {
        el.addEventListener('click', () => {
            // Add pulse animation
            gsap.to(el, {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
            
            // Show detailed information
            const sectionTitle = el.querySelector('span, h4, p')?.textContent || '演奏技巧';
            let detailPanel = el.querySelector('.performance-detail-panel');
            if (!detailPanel) {
                detailPanel = document.createElement('div');
                detailPanel.className = 'performance-detail-panel';
                
                let content = '';
                if (el.classList.contains('performance-posture')) {
                    content = `
                        <h4>演奏姿势</h4>
                        <p>马头琴演奏通常采取坐姿，将琴箱夹于两腿中间，琴杆偏向左侧。</p>
                        <ul>
                            <li>坐姿要端正，身体放松</li>
                            <li>琴箱稳定夹在两腿之间</li>
                            <li>琴杆自然偏向左侧约45度</li>
                        </ul>
                    `;
                } else if (el.classList.contains('performance-detail')) {
                    content = `
                        <h4>演奏细节</h4>
                        <p>左手虎口稍张开，拇指微扶琴杆，用食指、中指的指甲顶弦。</p>
                        <ul>
                            <li>左手虎口张开约2-3厘米</li>
                            <li>拇指轻轻扶住琴杆</li>
                            <li>食指和中指用指甲顶弦</li>
                            <li>无名指和小指指尖顶弦</li>
                        </ul>
                    `;
                } else if (el.classList.contains('fingering-section')) {
                    content = `
                        <h4>指法技巧</h4>
                        <p>马头琴的指法分为三个把位，每个把位有不同的音域和表现力。</p>
                        <ul>
                            <li>第一把位：基础把位，最常用于低音区</li>
                            <li>第二把位：中音区的常用把位</li>
                            <li>第三把位：高音区的转换把位</li>
                        </ul>
                    `;
                }
                
                detailPanel.innerHTML = content;
                el.appendChild(detailPanel);
            }
            
            // Animate panel appearance
            gsap.fromTo(detailPanel,
                { opacity: 0, height: 0 },
                { opacity: 1, height: 'auto', duration: 0.4, ease: 'power2.out' }
            );
        });
    });
    
    // Section highlight on scroll
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            gsap.to(section, {
                backgroundColor: 'rgba(196, 142, 60, 0.03)',
                duration: 0.3
            });
        });
        
        section.addEventListener('mouseleave', () => {
            gsap.to(section, {
                backgroundColor: 'transparent',
                duration: 0.3
            });
        });
    });
}

// ==================== Heritage Organic Tree (方案C v2) ====================
function initHeritageTree() {
    var container = document.querySelector('.heritage-tree-container');
    if (!container) return;

    // Click to expand/collapse cards
    container.querySelectorAll('.heritage-tree-card').forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            container.querySelectorAll('.heritage-tree-card.expanded').forEach(function(c) {
                if (c !== card) c.classList.remove('expanded');
            });
            card.classList.toggle('expanded');
        });
    });

    // If GSAP not available, show everything immediately
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded, showing tree immediately');
        container.querySelectorAll('.tree-branch').forEach(function(b) {
            b.style.strokeDashoffset = '0';
        });
        container.querySelectorAll('.tree-node-group, .heritage-tree-card, .tree-leaf, .tree-blossom').forEach(function(el) {
            el.classList.add('visible');
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Collect elements by order
    var orderGroups = {};
    container.querySelectorAll('[data-order]').forEach(function(el) {
        var order = parseInt(el.getAttribute('data-order'));
        if (!orderGroups[order]) orderGroups[order] = [];
        orderGroups[order].push(el);
    });

    var orders = Object.keys(orderGroups).map(Number).sort(function(a, b) { return a - b; });

    // Master timeline
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
        }
    });

    orders.forEach(function(order) {
        var elements = orderGroups[order];

        elements.forEach(function(el) {
            if (el.classList.contains('tree-branch')) {
                // Draw branch with strokeDashoffset
                var len;
                try { len = el.getTotalLength(); } catch(e) { len = 1000; }
                tl.fromTo(el,
                    { strokeDasharray: len, strokeDashoffset: len },
                    { strokeDashoffset: 0, duration: order <= 1 ? 1.0 : 0.6, ease: 'power2.inOut' },
                    order <= 1 ? '+=0' : '-=0.4'
                );
            } else if (el.classList.contains('tree-node-group')) {
                // Pop in node
                tl.to(el, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.35,
                    ease: 'back.out(2)',
                    onStart: function() { el.classList.add('visible'); }
                }, '-=0.15');
            } else if (el.classList.contains('heritage-tree-card')) {
                // Slide in card
                tl.to(el, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'back.out(1.5)',
                    onStart: function() { el.classList.add('visible'); }
                }, '-=0.2');
            } else if (el.classList.contains('tree-leaf') || el.classList.contains('tree-blossom')) {
                // Fade and scale in leaves
                tl.to(el, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onStart: function() { el.classList.add('visible'); }
                }, '-=0.3');
            }
        });
    });
}

// ==================== Folding Panels (3D 展开) ====================
function initFoldingAnimation() {
    var section = document.querySelector('.folding-section');
    var panels = document.querySelectorAll('.folding-panel');
    if (!section || panels.length === 0) return;

    // Skip 3D animation on small screens — show panels immediately
    if (window.innerWidth <= 1200) {
        panels.forEach(function(panel) {
            panel.style.transform = 'none';
            panel.style.opacity = '1';
            panel.style.filter = 'grayscale(20%)';
        });
        return;
    }

    // ---- 初始：90° 折叠态 ----
    panels.forEach(function(panel, i) {
        var isEven = i % 2 === 0;
        var dir = isEven ? -90 : 90;
        panel.style.transform = 'perspective(2000px) rotateY(' + dir + 'deg)';
        panel.style.transformOrigin = isEven ? 'left center' : 'right center';
        panel.style.transformStyle = 'preserve-3d';
        panel.style.backfaceVisibility = 'hidden';
        panel.style.opacity = '0.3';
    });

    // ---- 逐张 CSS 过渡展开 ----
    function unfoldPanels() {
        panels.forEach(function(panel, i) {
            panel.style.transition = 'transform 1.3s cubic-bezier(0.16, 1, 0.3, 1) ' +
                                     (i * 100) + 'ms, opacity 0.8s ease ' + (i * 100) + 'ms';
            panel.style.transform = 'perspective(2000px) rotateY(0deg)';
            panel.style.opacity = '1';
        });
    }

    var fired = false;

    function checkAndUnfold() {
        if (fired) return;
        var r = section.getBoundingClientRect();
        // 区域顶部滚入视口 85% 时触发展开
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
            fired = true;
            unfoldPanels();
        }
    }

    // ---- 方式1：直接锚点跳转 ----
    var rect0 = section.getBoundingClientRect();
    if (rect0.top < window.innerHeight && rect0.bottom > 0) {
        fired = true;
        setTimeout(unfoldPanels, 350);
        return;
    }

    // ---- 方式2：Lenis 平滑滚动回调 ----
    if (typeof lenis !== 'undefined' && lenis && typeof lenis.on === 'function') {
        lenis.on('scroll', checkAndUnfold);
    }

    // ---- 方式3：原生 scroll 事件兜底 ----
    var ticking = false;
    function onScroll() {
        if (fired || ticking) return;
        ticking = true;
        requestAnimationFrame(function() {
            ticking = false;
            checkAndUnfold();
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- 方式4：轮询兜底（前 10 秒，每 250ms 检测一次） ----
    var pollCount = 0;
    var pollTimer = setInterval(function() {
        pollCount++;
        if (fired || pollCount > 40) {
            clearInterval(pollTimer);
            return;
        }
        checkAndUnfold();
    }, 250);
}

// ==================== Craft Tabs (Materials & Tools) ====================
function initCraftTabs() {
    document.querySelectorAll('.craft-tab-bar').forEach(tabBar => {
        const group = tabBar.dataset.group;
        tabBar.querySelectorAll('.craft-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Update buttons
                tabBar.querySelectorAll('.craft-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Update content panels
                const targetTab = tab.dataset.tab;
                document.querySelectorAll(`.craft-tab-content[data-group="${group}"]`).forEach(panel => {
                    panel.classList.remove('active');
                });
                document.querySelector(`.craft-tab-content[data-group="${group}"][data-tab="${targetTab}"]`).classList.add('active');
            });
        });
    });
}

// ==================== Tool → Craft Step Linkage ====================
function initToolCraftLinkage() {
    // Build a map: step number → craft-card element
    const stepToCard = {};
    document.querySelectorAll('.craft-card').forEach(card => {
        const label = card.querySelector('.craft-label');
        if (!label) return;
        // Extract step number from label like "1. 选取板材"
        const match = label.textContent.match(/^(\d+)\./);
        if (match) {
            stepToCard[parseInt(match[1])] = card;
        }
    });

    // Attach mouse events to each tool card
    document.querySelectorAll('.craft-item-card[data-steps]').forEach(toolCard => {
        const stepsAttr = toolCard.dataset.steps;
        const stepNumbers = stepsAttr.split(',').map(s => parseInt(s.trim()));

        toolCard.addEventListener('mouseenter', () => {
            // Dim all craft cards first
            document.querySelectorAll('.craft-card').forEach(c => {
                c.classList.remove('highlighted');
                c.classList.add('dimmed');
            });
            // Highlight matching ones
            stepNumbers.forEach(n => {
                if (stepToCard[n]) {
                    stepToCard[n].classList.remove('dimmed');
                    stepToCard[n].classList.add('highlighted');
                }
            });
            // Mark tool card as highlighted
            toolCard.setAttribute('data-highlighted', 'true');
        });

        toolCard.addEventListener('mouseleave', () => {
            // Remove all highlight/dim
            document.querySelectorAll('.craft-card').forEach(c => {
                c.classList.remove('highlighted', 'dimmed');
            });
            toolCard.removeAttribute('data-highlighted');
        });
    });
}

// ==================== Instrument Types Interaction ====================
function initInstrumentTypes() {
    const section = document.querySelector('#instrument-types');
    if (!section) return;

    const figures = section.querySelectorAll('.instrument-shape-strip figure[data-instrument]');
    const items = section.querySelectorAll('.instrument-kind-item[data-instrument]');
    const stageImg = section.querySelector('.instrument-kind-stage img');
    const detailTitle = section.querySelector('.instrument-kind-detail h3');
    const detailList = section.querySelector('.instrument-kind-detail dl');
    const detailPanel = section.querySelector('.instrument-kind-detail');
    const zoomButton = section.querySelector('.instrument-stage-zoom');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    if (!figures.length || !items.length || !stageImg || !detailTitle || !detailList || !detailPanel) return;

    const itemMap = {};
    items.forEach(item => {
        itemMap[item.dataset.instrument] = item;
    });

    function setActive(instrumentKey) {
        const item = itemMap[instrumentKey];
        if (!item) return;

        const activeIndex = Array.from(items).findIndex(i => i.dataset.instrument === instrumentKey);
        const stageNumber = String(activeIndex + 1).padStart(2, '0');

        figures.forEach(figure => {
            figure.classList.toggle('active', figure.dataset.instrument === instrumentKey);
        });

        items.forEach(listItem => {
            listItem.classList.toggle('active', listItem.dataset.instrument === instrumentKey);
        });

        const stageWrap = section.querySelector('.instrument-kind-stage');
        stageWrap.dataset.stageNumber = stageNumber;

        stageImg.src = item.dataset.image;
        stageImg.alt = `${item.dataset.title}主图`;
        detailTitle.textContent = item.dataset.title;

        detailList.innerHTML = `
            <dt>流派地域：</dt><dd>${item.dataset.region || ''}</dd>
            <dt>形制分类：</dt><dd>${item.dataset.category || ''}</dd>
            <dt>材质构成：</dt><dd>${item.dataset.material || ''}</dd>
            <dt>琴头样子：</dt><dd>${item.dataset.head || ''}</dd>
            <dt>主要花纹：</dt><dd>${item.dataset.pattern || ''}</dd>
            <dt>花纹寓意：</dt><dd>${item.dataset.meaning || ''}</dd>
            <dt>主要颜色：</dt><dd>${item.dataset.color || ''}</dd>
        `;

        stageWrap.classList.remove('is-switching');
        void stageWrap.offsetWidth;
        stageWrap.classList.add('is-switching');

        detailPanel.classList.remove('is-switching');
        void detailPanel.offsetWidth;
        detailPanel.classList.add('is-switching');

        const activeItem = itemMap[instrumentKey];
        if (activeItem) {
            activeItem.classList.remove('is-entering');
            void activeItem.offsetWidth;
            activeItem.classList.add('is-entering');
        }
    }

    figures.forEach(figure => {
        figure.addEventListener('click', () => setActive(figure.dataset.instrument));
    });

    items.forEach(item => {
        item.addEventListener('click', () => setActive(item.dataset.instrument));
    });

    const openStageModal = () => {
        if (!imageModal || !modalImage) return;
        modalImage.src = stageImg.src;
        modalImage.alt = stageImg.alt;
        imageModal.classList.add('active');
    };

    stageImg.addEventListener('click', openStageModal);
    if (zoomButton) {
        zoomButton.addEventListener('click', openStageModal);
    }

    const initial = section.querySelector('.instrument-kind-item.active')?.dataset.instrument || figures[0].dataset.instrument;
    setActive(initial);
}

// ==================== Performance Fingering Interaction ====================
function initPerformanceFingering() {
    const panel = document.getElementById('fingeringPanel');
    if (!panel) return;

    const tabs = panel.querySelectorAll('.fingering-tab');
    const image = document.getElementById('fingeringChartImage');
    const hotspotLayer = document.getElementById('fingeringHotspotLayer');
    const title = document.getElementById('fingeringTitle');
    const desc = document.getElementById('fingeringDesc');
    const notationA = document.getElementById('fingeringNotationA');
    const notationD = document.getElementById('fingeringNotationD');
    const noteGrid = document.getElementById('fingeringNoteGrid');
    if (!tabs.length || !image || !hotspotLayer || !title || !desc || !notationA || !notationD || !noteGrid) return;

    const positions = {
        '1': {
            title: '第一把位（A调）',
            image: 'assets/performance/fingering-main.jpg',
            desc: '基础把位，最常用于低音区与初学阶段，强调手型稳定、空弦控制与左右手配合。',
            notationA: 'A弦：A（空弦）→ B（1）→ C#（2）→ D（3）→ E（4）',
            notationD: 'D弦：D（空弦）→ E（1）→ F#（2）→ G（3）→ A（4）',
            notes: [
                { label: 'A弦 空弦', note: 'A4', freq: 440.00, x: 62, y: 84 },
                { label: 'A弦 1指', note: 'B4', freq: 493.88, x: 62, y: 70 },
                { label: 'A弦 2指', note: 'C#5', freq: 554.37, x: 62, y: 58 },
                { label: 'A弦 3指', note: 'D5', freq: 587.33, x: 62, y: 46 },
                { label: 'A弦 4指', note: 'E5', freq: 659.25, x: 62, y: 34 },
                { label: 'D弦 空弦', note: 'D4', freq: 293.66, x: 38, y: 84 },
                { label: 'D弦 1指', note: 'E4', freq: 329.63, x: 38, y: 70 },
                { label: 'D弦 2指', note: 'F#4', freq: 369.99, x: 38, y: 58 },
                { label: 'D弦 3指', note: 'G4', freq: 392.00, x: 38, y: 46 },
                { label: 'D弦 4指', note: 'A4', freq: 440.00, x: 38, y: 34 }
            ]
        },
        '2': {
            title: '第二把位（G调）',
            image: 'assets/performance/fingering-main.jpg',
            desc: '中音区常用把位，音位整体上移，更适合旋律展开与句法连接。',
            notationA: 'A弦：G（1）→ A（2）→ B（3）→ C（4）→ D（空弦）',
            notationD: 'D弦：C（1）→ D（2）→ E（3）→ F#（4）→ G（空弦）',
            notes: [
                { label: 'A弦 1指', note: 'G4', freq: 392.00, x: 62, y: 76 },
                { label: 'A弦 2指', note: 'A4', freq: 440.00, x: 62, y: 64 },
                { label: 'A弦 3指', note: 'B4', freq: 493.88, x: 62, y: 52 },
                { label: 'A弦 4指', note: 'C5', freq: 523.25, x: 62, y: 40 },
                { label: 'A弦 空弦对照', note: 'D5', freq: 587.33, x: 62, y: 28 },
                { label: 'D弦 1指', note: 'C4', freq: 261.63, x: 38, y: 76 },
                { label: 'D弦 2指', note: 'D4', freq: 293.66, x: 38, y: 64 },
                { label: 'D弦 3指', note: 'E4', freq: 329.63, x: 38, y: 52 },
                { label: 'D弦 4指', note: 'F#4', freq: 369.99, x: 38, y: 40 },
                { label: 'D弦 空弦对照', note: 'G4', freq: 392.00, x: 38, y: 28 }
            ]
        },
        '3': {
            title: '第三把位（D调）',
            image: 'assets/performance/fingering-main.jpg',
            desc: '高音区转换把位，适合抒情旋律和高音延展，需要更稳定的指尖控制。',
            notationA: 'A弦：D（1）→ E（2）→ F#（3）→ G（4）→ A（空弦对照）',
            notationD: 'D弦：G（1）→ A（2）→ B（3）→ C#（4）→ D（空弦对照）',
            notes: [
                { label: 'A弦 1指', note: 'D5', freq: 587.33, x: 62, y: 72 },
                { label: 'A弦 2指', note: 'E5', freq: 659.25, x: 62, y: 60 },
                { label: 'A弦 3指', note: 'F#5', freq: 739.99, x: 62, y: 48 },
                { label: 'A弦 4指', note: 'G5', freq: 783.99, x: 62, y: 36 },
                { label: 'A弦 空弦对照', note: 'A5', freq: 880.00, x: 62, y: 24 },
                { label: 'D弦 1指', note: 'G4', freq: 392.00, x: 38, y: 72 },
                { label: 'D弦 2指', note: 'A4', freq: 440.00, x: 38, y: 60 },
                { label: 'D弦 3指', note: 'B4', freq: 493.88, x: 38, y: 48 },
                { label: 'D弦 4指', note: 'C#5', freq: 554.37, x: 38, y: 36 },
                { label: 'D弦 空弦对照', note: 'D5', freq: 587.33, x: 38, y: 24 }
            ]
        }
    };

    let audioContext;
    function playTone(freq, btn) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContext) audioContext = new AudioCtx();
        const now = audioContext.currentTime;

        const master = audioContext.createGain();
        const body = audioContext.createBiquadFilter();
        const air = audioContext.createBiquadFilter();
        const vibrato = audioContext.createOscillator();
        const vibratoGain = audioContext.createGain();

        const oscA = audioContext.createOscillator();
        const oscB = audioContext.createOscillator();
        const oscC = audioContext.createOscillator();

        const gainA = audioContext.createGain();
        const gainB = audioContext.createGain();
        const gainC = audioContext.createGain();

        const waveA = audioContext.createPeriodicWave(
            new Float32Array([0, 1.0, 0.42, 0.18, 0.08, 0.04]),
            new Float32Array([0, 0.0, 0.15, 0.07, 0.03, 0.01])
        );
        const waveB = audioContext.createPeriodicWave(
            new Float32Array([0, 0.55, 0.18, 0.07, 0.03]),
            new Float32Array([0, 0.0, 0.08, 0.03, 0.01])
        );

        oscA.setPeriodicWave(waveA);
        oscB.setPeriodicWave(waveB);
        oscC.type = 'triangle';

        oscA.frequency.value = freq;
        oscB.frequency.value = freq * 2;
        oscC.frequency.value = freq * 0.5;

        gainA.gain.value = 0.68;
        gainB.gain.value = 0.18;
        gainC.gain.value = 0.12;

        body.type = 'bandpass';
        body.frequency.value = Math.min(Math.max(freq * 2.2, 420), 1800);
        body.Q.value = 0.9;

        air.type = 'lowpass';
        air.frequency.value = 2400;
        air.Q.value = 0.6;

        vibrato.type = 'sine';
        vibrato.frequency.value = 5.2;
        vibratoGain.gain.value = 4.5;
        vibrato.connect(vibratoGain);
        vibratoGain.connect(oscA.frequency);

        master.gain.setValueAtTime(0.0001, now);
        master.gain.linearRampToValueAtTime(0.2, now + 0.045);
        master.gain.linearRampToValueAtTime(0.15, now + 0.2);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);

        oscA.connect(gainA);
        oscB.connect(gainB);
        oscC.connect(gainC);
        gainA.connect(body);
        gainB.connect(body);
        gainC.connect(body);
        body.connect(air);
        air.connect(master);
        master.connect(audioContext.destination);

        const bufferSize = audioContext.sampleRate * 1.4;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.06));
        }
        const noise = audioContext.createBufferSource();
        const noiseFilter = audioContext.createBiquadFilter();
        const noiseGain = audioContext.createGain();
        noise.buffer = noiseBuffer;
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1400;
        noiseFilter.Q.value = 1.4;
        noiseGain.gain.setValueAtTime(0.09, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(master);

        vibrato.start(now);
        oscA.start(now);
        oscB.start(now);
        oscC.start(now);
        noise.start(now);

        vibrato.stop(now + 1.35);
        oscA.stop(now + 1.35);
        oscB.stop(now + 1.35);
        oscC.stop(now + 1.35);
        noise.stop(now + 0.18);
        if (btn) {
            btn.classList.add('is-playing');
            window.setTimeout(() => btn.classList.remove('is-playing'), 460);
        }
    }

    function renderNotes(notes) {
        noteGrid.innerHTML = '';
        hotspotLayer.innerHTML = '';
        notes.forEach(item => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'fingering-note-btn';
            btn.innerHTML = `<strong>${item.label}</strong><span>${item.note}</span>`;
            btn.addEventListener('click', () => playTone(item.freq, btn));
            noteGrid.appendChild(btn);

            const hotspot = document.createElement('button');
            hotspot.type = 'button';
            hotspot.className = 'fingering-hotspot';
            hotspot.dataset.note = item.note;
            hotspot.style.left = `${item.x}%`;
            hotspot.style.top = `${item.y}%`;
            hotspot.setAttribute('aria-label', `${item.label} ${item.note}`);
            hotspot.addEventListener('click', () => playTone(item.freq, hotspot));
            hotspotLayer.appendChild(hotspot);
        });
    }

    function setPosition(key) {
        const data = positions[key];
        if (!data) return;
        tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.position === key));
        image.src = data.image;
        image.alt = `${data.title}指法示意图`;
        title.textContent = data.title;
        desc.textContent = data.desc;
        notationA.textContent = data.notationA;
        notationD.textContent = data.notationD;
        renderNotes(data.notes);
        const stage = document.getElementById('fingeringStage');
        stage.classList.remove('is-switching');
        void stage.offsetWidth;
        stage.classList.add('is-switching');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => setPosition(tab.dataset.position));
    });

    setPosition('1');
}
