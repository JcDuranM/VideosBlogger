//<![CDATA[
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("videoJcDuranM");
    const playBtn = document.getElementById("playJcDuranM");
    const progreso = document.getElementById("progresoJcDuranM");
    const volumen = document.getElementById("volumenJcDuranM");
    const iconoVolumen = document.getElementById("iconoVolumenJcDuranM");
    const tiempo = document.getElementById("tiempoJcDuranM");
    const pantallaCompleta = document.getElementById("pantallaCompletaJcDuranM");

    if (localStorage.getItem("videoTimeJcDuranM")) {
        video.currentTime = parseFloat(localStorage.getItem("videoTimeJcDuranM"));
    }

    const togglePlay = () => {
        if (video.paused) {
            video.play();
            playBtn.textContent = "⏸";
        } else {
            video.pause();
            playBtn.textContent = "▶";
        }
    };

    const actualizarTiempo = () => {
        const minutos = Math.floor(video.currentTime / 60).toString().padStart(2, "0");
        const segundos = Math.floor(video.currentTime % 60).toString().padStart(2, "0");
        const duracionMin = Math.floor(video.duration / 60).toString().padStart(2, "0");
        const duracionSeg = Math.floor(video.duration % 60).toString().padStart(2, "0");
        tiempo.textContent = `${minutos}:${segundos} / ${duracionMin}:${duracionSeg}`;
    };

    const togglePantallaCompleta = () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    };

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case " ":
            case "Enter":
                togglePlay();
                break;
            case "ArrowRight":
                video.currentTime += 10;
                break;
            case "ArrowLeft":
                video.currentTime -= 10;
                break;
            case "ArrowUp":
                video.volume = Math.min(1, video.volume + 0.1);
                break;
            case "ArrowDown":
                video.volume = Math.max(0, video.volume - 0.1);
                break;
            case "m":
                video.muted = !video.muted;
                break;
        }
    });

    let controlsTimeout;
    video.onmousemove = () => {
        clearTimeout(controlsTimeout);
        document.querySelector(".controlesJcDuranM").style.opacity = 1;
        controlsTimeout = setTimeout(() => {
            document.querySelector(".controlesJcDuranM").style.opacity = 0;
        }, 3000);
    };

    video.ontimeupdate = () => {
        progreso.value = (video.currentTime / video.duration) * 100;
        actualizarTiempo();
        localStorage.setItem("videoTimeJcDuranM", video.currentTime);
    };

    progreso.oninput = () => {
        video.currentTime = (progreso.value / 100) * video.duration;
    };

    volumen.oninput = () => {
        video.volume = volumen.value;
        iconoVolumen.textContent = video.volume === 0 ? "🔇" : video.volume < 0.5 ? "🔉" : "🔊";
    };

    video.onclick = togglePlay;
    playBtn.onclick = togglePlay;
    pantallaCompleta.onclick = togglePantallaCompleta;
});

(function() {
    const shortcode = /<video2>(.*?)<\/video2>/g;
    const elementos = document.querySelectorAll(".video-container");
    let urlVideo;

    elementos.forEach(function(el) {
        el.innerHTML = el.innerHTML.replace(shortcode, function(match, videoUrl) {
            urlVideo = videoUrl;
            return `<video id="videoJcDuranM" src="${urlVideo}" controls></video>`;
        });
    });
})();
//]]>
