AlphaImage = window.AlphaImage || {};

AlphaImage = function () {
	let canvas;
	let ctx;

	attach = function(cv) {
		canvas = cv;
		ctx = cv.getContext("2d");
	}

	draw = function(...args) {
		ctx.globalCompositeOperation='destination-out';
	    ctx.drawImage(...args);
	    ctx.globalCompositeOperation='source-over';
	};

	return {
		attach,
		draw
	}

}();