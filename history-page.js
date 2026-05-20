/**
 * History Page — Narrative + Chart Synchronization
 */

let currentAct = 0;
const totalActs = 3;
const actLabels = ['第一幕 · 起源', '第二幕 · 演变', '第三幕 · 定型'];

// DOM refs
const chartIndicator = document.getElementById('chartActLabel');

function goToAct(index) {
    if (index < 0 || index >= totalActs) return;

    // Hide all acts
    document.querySelectorAll('.act').forEach(a => a.classList.remove('visible'));

    // Show target act
    const target = document.querySelector(`.act[data-act="${index}"]`);
    if (target) {
        target.style.animation = 'none';
        target.offsetHeight; // force reflow
        target.style.animation = '';
        target.classList.add('visible');
    }

    // Update progress bar
    document.querySelectorAll('.progress-step').forEach((step, i) => {
        step.classList.remove('active', 'completed');
        if (i < index) step.classList.add('completed');
        if (i === index) step.classList.add('active');
    });

    // Update progress line
    const fill = document.getElementById('progressFill');
    fill.style.width = `${(index / (totalActs - 1)) * 100}%`;

    // Update nav buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === totalActs - 1;
    document.getElementById('actCounter').textContent = `${index + 1} / ${totalActs}`;

    // Update chart
    updateChart(index);

    currentAct = index;
}

function updateChart(actIndex) {
    // Update chart indicator label (if exists)
    if (chartIndicator) {
        chartIndicator.textContent = actLabels[actIndex];
    }

    // Reset all elements
    document.querySelectorAll('.inst-tag:not(.dim-only)').forEach(tag => {
        tag.classList.remove('active');
    });
    document.querySelectorAll('.curve').forEach(curve => {
        curve.classList.remove('active');
    });
    document.querySelectorAll('.turn-marker').forEach(marker => {
        marker.classList.remove('active');
    });

    // Activate elements matching current act
    document.querySelectorAll(`.inst-tag[data-act="${actIndex}"]:not(.dim-only)`).forEach(tag => {
        tag.classList.add('active');
    });
    document.querySelectorAll(`.curve[data-act="${actIndex}"]`).forEach(curve => {
        curve.classList.add('active');
    });
    document.querySelectorAll(`.turn-marker[data-act="${actIndex}"]`).forEach(marker => {
        marker.classList.add('active');
    });

    // Keep previously viewed acts slightly visible (cumulative effect)
    for (let i = 0; i < actIndex; i++) {
        document.querySelectorAll(`.inst-tag[data-act="${i}"]:not(.dim-only)`).forEach(tag => {
            tag.style.opacity = '0.35';
        });
        document.querySelectorAll(`.curve[data-act="${i}"]`).forEach(curve => {
            curve.style.opacity = '0.2';
        });
    }
    // Reset opacity for elements not in previous acts
    for (let i = actIndex + 1; i < totalActs; i++) {
        document.querySelectorAll(`.inst-tag[data-act="${i}"]:not(.dim-only)`).forEach(tag => {
            tag.style.opacity = '';
        });
        document.querySelectorAll(`.curve[data-act="${i}"]`).forEach(curve => {
            curve.style.opacity = '';
        });
    }
}

function nextAct() { goToAct(currentAct + 1); }
function prevAct() { goToAct(currentAct - 1); }

function toggleBranch(btn) {
    btn.classList.toggle('open');
    const list = btn.nextElementSibling;
    list.classList.toggle('open');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextAct();
    if (e.key === 'ArrowLeft') prevAct();
});

// Initialize
goToAct(0);

// Lightbox for PPT image
function openHistoryLightbox(src) {
    const lightbox = document.getElementById('historyLightbox');
    const img = document.getElementById('historyLightboxImg');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHistoryLightbox() {
    const lightbox = document.getElementById('historyLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('historyLightbox')?.addEventListener('click', function(e) {
    if (e.target === this) closeHistoryLightbox();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeHistoryLightbox();
});
