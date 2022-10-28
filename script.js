window.onload = function() {
  const download = function(){
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('c').toDataURL()
    link.click();
  }

  document.getElementById("srcurl").addEventListener("change", function() {
    let srcurl = this.value;

    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");

    var jellybeans = new Image();
    jellybeans.onload = start;
    jellybeans.crossOrigin = "Anonymous";
    jellybeans.src = srcurl;
    var sun = new Image();
    sun.onload = start;
    sun.crossOrigin = "Anonymous";
    sun.src = './bubblemin.png';
    var imageCount = 2;

    function start(){

      // wait for all images to load
      if(--imageCount>0){return;}

      // resize the canvas to jellybean size
      canvas.width=jellybeans.width;
      canvas.height=jellybeans.height;

      // draw the jellybeans on the canvas
      ctx.drawImage(jellybeans,0,0);

      AlphaImage.attach(canvas);
      AlphaImage.draw(sun, -10, 0, canvas.width + 20, 150);

      canvas.addEventListener("click", download);
    }
  });
};