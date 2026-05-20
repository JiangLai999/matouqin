window.addEventListener('DOMContentLoaded', function() {
    var soundItems = document.querySelectorAll('.sound-item');
    var currentAudio = null;
    var currentItem = null;

    soundItems.forEach(function(item) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            var soundName = item.dataset.sound;
            if (!soundName) return;

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentItem) currentItem.classList.remove('playing');
            }

            var audio = new Audio();
            audio.preload = 'auto';
            audio.src = 'assets/performance/sounds/' + soundName + '.mp3';

            audio.addEventListener('canplay', function() {
                audio.play().then(function() {
                    item.classList.add('playing');
                    currentAudio = audio;
                    currentItem = item;
                }).catch(function(err) {
                    console.warn('[sound] play failed:', err);
                    item.classList.add('playing');
                    setTimeout(function() { item.classList.remove('playing'); }, 400);
                });
            }, { once: true });

            audio.addEventListener('ended', function() {
                item.classList.remove('playing');
                currentAudio = null;
                currentItem = null;
            });

            audio.addEventListener('error', function(e) {
                console.warn('[sound] load error:', e);
                item.classList.add('playing');
                setTimeout(function() { item.classList.remove('playing'); }, 400);
            });

            audio.load();
        });
    });
});