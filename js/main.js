/**
 * Gene Atlas: Morin Khuur v2
 * Scroll animations, navigation behavior, Lenis smooth scroll
 */

document.addEventListener('DOMContentLoaded', () => {
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
});

// ==================== Lenis Smooth Scroll ====================
let lenis;

function initLenis() {
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

    // Instrument tags in history map
    const tags = document.querySelectorAll('.instrument-tag');
    if (tags.length) {
        gsap.from(tags, {
            scrollTrigger: {
                trigger: '.history-map',
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
    const bars = document.querySelectorAll('.bar');
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
            
            // Add hover animation
            bar.addEventListener('mouseenter', () => {
                gsap.to(bar, {
                    backgroundColor: '#C48E3C',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            bar.addEventListener('mouseleave', () => {
                gsap.to(bar, {
                    backgroundColor: '#9CA3AF',
                    duration: 0.3,
                    ease: 'power2.out'
                });
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

// ==================== Folding Panels ====================
function initFoldingAnimation() {
    var section = document.querySelector('.folding-section');
    var panels = document.querySelectorAll('.folding-panel');
    if (!section || panels.length === 0) return;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        panels.forEach(function(p) { p.style.opacity = '1'; p.style.transform = 'none'; });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    panels.forEach(function(panel) {
        gsap.fromTo(panel,
            { y: 80, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 45%',
                    scrub: 0.8
                },
                y: 0,
                opacity: 1,
                ease: 'power2.out'
            }
        );
    });
}
