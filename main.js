/* global Html5Qrcode */
// main.js
let html5QrCode;

// Робимо функції глобальними, щоб вони працювали з onclick в HTML
window.openModal = function() {
    document.getElementById("overlay").classList.add("active");
};

window.closeModal = function() {
    document.getElementById("overlay").classList.remove("active");
};

window.openScanner = function() {
    const overlay = document.getElementById("scannerOverlay");
    if (overlay) overlay.classList.add("active");
    
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCode.start(
        { facingMode: "environment" }, 
        config, 
        (decodedText) => {
            window.location.href = decodedText;
            window.closeScanner();
        }
    ).catch(() => {
        // Прибрали err, просто виводимо повідомлення в консоль
        console.error("Scanner error occurred");
    });
};

window.closeScanner = function() {
    const overlay = document.getElementById("scannerOverlay");
    if (overlay) overlay.classList.remove("active");
    
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode = null;
        }).catch(() => {
            // Прибрали err тут теж
            console.log("Error stopping the scanner");
        });
    }
};

window.onclick = function(event) {
    const modalCreate = document.getElementById("overlay");
    const modalScanner = document.getElementById("scannerOverlay");
    if (event.target === modalCreate) window.closeModal();
    if (event.target === modalScanner) window.closeScanner();
};

console.log("Vite Production Build Loaded Successfully");