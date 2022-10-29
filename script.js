window.onload = function() {
  let srcurl = document.getElementById("srcurl");
  let canvas = document.getElementById("c");
  let ctx = canvas.getContext("2d");
  let dragcontainer = document.getElementById("dragcontainer");
  let imagecontainer = document.getElementById("imagecontainer");
  let heightrange = document.getElementById("heightrange");
  let db = document.getElementById("download");
  let clb = document.getElementById("clear");
  let fileinput = document.getElementById("file");

  let allowedExtensions = ["jpg", "png", "gif", "jpeg"];

  let bubble = new Image();
  let source_image = new Image();

  let srctimeout;

  function SelectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  }

  const download = () => {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('c').toDataURL()
    link.click();
  }

  const clear = () => {
    dragcontainer.style.display = "flex";
    imagecontainer.style.display = "none";

    srcurl.value = "";
  }

  const drawCanvas = (source_image, height) => {
    canvas.width = source_image.width;
    canvas.height = source_image.height;

    ctx.drawImage(source_image, 0, 0);

    AlphaImage.attach(canvas);
    AlphaImage.draw(bubble, -10, 0, canvas.width + 20, height);
  }

  const changeRange = function () {
    drawCanvas(source_image, this.value);
  }

  const processFile = function (argument) {
    let image = this.files[0];
    var extension = image.name.substr(image.name.lastIndexOf(".") + 1);

    if (allowedExtensions.includes(extension)) {
      prepareCanvas(URL.createObjectURL(image));
    }
  }

  const prepareCanvas = (source_url) => {
    let imgload = () => {
      let nw =  canvas.width + 20;
      let bubbleHeigt = bubble.height * (nw/bubble.width);

      drawCanvas(source_image, bubbleHeigt);

      heightrange.max = source_image.height;
      heightrange.value = bubble.height * (nw/bubble.width);

      heightrange.removeEventListener("input", changeRange);
      heightrange.addEventListener("input", changeRange);

      dragcontainer.style.display = "none";
      imagecontainer.style.display = "flex";

      db.removeEventListener('click', download);
      db.addEventListener("click", download);

      clb.removeEventListener('click', clear);
      clb.addEventListener("click", clear);
    }

    source_image.onload = imgload;
    source_image.crossOrigin = "Anonymous";
    source_image.src = source_url;
  };

  const processImage = () => {
    clearTimeout(srctimeout);

    srctimeout = setTimeout(() => {
      let source_url = srcurl.value;

      prepareCanvas(source_url);
    }, 1500);
  }
  
  bubble.onload = () => {
    srcurl.addEventListener("input", processImage);
    fileinput.addEventListener("change", processFile);
  };
  
  bubble.crossOrigin = "Anonymous";
  bubble.src = './bubblemin.png';
  //bubble.src = 'https://i.imgur.com/BM65kzu.png';
};
