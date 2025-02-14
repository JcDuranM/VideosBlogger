//<![CDATA[
 document.addEventListener("DOMContentLoaded", () => {
    let video = document.getElementById("videoJcDuranM"),
        playBtn = document.getElementById("playJcDuranM"),
        progreso = document.getElementById("progresoJcDuranM"),
        volumen = document.getElementById("volumenJcDuranM"),
        iconoVolumen = document.getElementById("iconoVolumenJcDuranM"),
        tiempo = document.getElementById("tiempoJcDuranM"),
        pantallaCompleta = document.getElementById("pantallaCompletaJcDuranM");

    if(localStorage.getItem("videoTimeJcDuranM")) {
        video.currentTime = localStorage.getItem("videoTimeJcDuranM");
    }

    const togglePlay = () => (video.paused ? video.play() : video.pause(), playBtn.textContent = video.paused ? "▶" : "⏸");
    
    const actualizarTiempo = () => {
        let minutos = Math.floor(video.currentTime / 60).toString().padStart(2, "0"),
            segundos = Math.floor(video.currentTime % 60).toString().padStart(2, "0"),
            duracionMin = Math.floor(video.duration / 60).toString().padStart(2, "0"),
            duracionSeg = Math.floor(video.duration % 60).toString().padStart(2, "0");
        tiempo.textContent = `${minutos}:${segundos} / ${duracionMin}:${duracionSeg}`;
    };

    const togglePantallaCompleta = () => {
        if (!document.fullscreenElement) video.requestFullscreen();
        else document.exitFullscreen();
    };

    document.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "Enter") togglePlay();
        if (event.key === "ArrowRight") video.currentTime += 10;
        if (event.key === "ArrowLeft") video.currentTime -= 10;
        if (event.key === "ArrowUp") video.volume = Math.min(1, video.volume + 0.1);
        if (event.key === "ArrowDown") video.volume = Math.max(0, video.volume - 0.1);
        if (event.key === "m") video.muted = !video.muted;
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

    progreso.oninput = () => (video.currentTime = (progreso.value / 100) * video.duration);

    volumen.oninput = () => {
        video.volume = volumen.value;
        iconoVolumen.textContent = video.volume == 0 ? "🔇" : video.volume < 0.5 ? "🔉" : "🔊";
    };

    video.onclick = playBtn.onclick = togglePlay;
    
    pantallaCompleta.onclick = togglePantallaCompleta;
  });
 (function() {
    var shortcode = /<video2>(.*?)<\/video2>/g;
    var elementos = document.querySelectorAll(".video-container"); // Selección de contenedor específico
    var urlVideo;

    elementos.forEach(function(el) {
      el.innerHTML = el.innerHTML.replace(shortcode, function(match, videoUrl) {
        urlVideo = videoUrl;

        return `
 
                <video id="videoJcDuranM" src="${urlVideo}" controls></video> 
         
        `;
      });
    });
  })();
//]]>
