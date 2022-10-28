window.onload = function() {
  let srcurl = document.getElementById("srcurl");
  let canvas = document.getElementById("c");
  let ctx = canvas.getContext("2d");

  const download = () => {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('c').toDataURL()
    link.click();
  }

  const processImage = () => {
    let source_url = srcurl.value;

    let imgload = () => {
      // resize the canvas to jellybean size
      canvas.width = source_image.width;
      canvas.height = source_image.height;

      // draw the jellybeans on the canvas
      ctx.drawImage(source_image, 0, 0);

      AlphaImage.attach(canvas);
      AlphaImage.draw(bubble, -10, 0, canvas.width + 20, 150);

      canvas.removeEventListener('click', download);
      canvas.addEventListener("click", download);
    }

    let source_image = new Image();
    source_image.onload = imgload;
    source_image.crossOrigin = "Anonymous";
    source_image.src = source_url;
  }

  let bubble = new Image();
  bubble.onload = () => {
    srcurl.addEventListener("change", processImage);
  };
  
  bubble.crossOrigin = "Anonymous";
  bubble.src = './bubblemin.png';
};