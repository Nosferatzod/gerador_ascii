const DENSITY = '@%#*+=-:. ';

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const ascii = convertToAscii(img);
                document.getElementById('asciiOutput').innerText = ascii;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function convertToAscii(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 80;
    const height = (img.height * width) / img.width * 0.55;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height).data;

    let asciiStr = '';
    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const avg = (r + g + b) / 3;
        const charIndex = Math.floor((avg / 255) * (DENSITY.length - 1));
        asciiStr += DENSITY[charIndex];
        if ((i / 4 + 1) % width === 0) asciiStr += '\n';
    }

    return asciiStr;
}