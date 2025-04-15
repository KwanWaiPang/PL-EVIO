window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES;
var START_INTERP_FRAMES;

function initializeInterpolationPlugin(maxFrames, startIndex) {
    NUM_INTERP_FRAMES = maxFrames; // 设置最大图像数目
    START_INTERP_FRAMES = startIndex; // 传递开始索引
}

var interp_images = [];
function preloadInterpolationImages() {
    for (var i = START_INTERP_FRAMES; i < NUM_INTERP_FRAMES; i++) {
        // 生成每张图片的路径
        var eventPath = INTERP_BASE + '/Event/event (' + (i + 1) + ').jpg';
        var imagePath = INTERP_BASE + '/Image/image (' + (i + 1) + ').jpg';
        var linePath = INTERP_BASE + '/Line/line (' + (i + 1) + ').jpg';

        // 创建每张图片的Image对象
        var eventImage = new Image();
        eventImage.src = eventPath;
        eventImage.onerror = function() { console.error('Failed to load', eventPath); };

        var imageImage = new Image();
        imageImage.src = imagePath;
        imageImage.onerror = function() { console.error('Failed to load', imagePath); };

        var lineImage = new Image();
        lineImage.src = linePath;
        lineImage.onerror = function() { console.error('Failed to load', linePath); };

        // 将图片添加到数组中
        interp_images[i] = { event: eventImage, image: imageImage, line: lineImage };
    }
}

function setInterpolationImage(i) {
    var images = interp_images[i];
    var wrapper = $('#interpolation-image-wrapper');
    wrapper.empty(); // 清空当前内容

     // 添加类名以便于CSS控制宽度
     $(images.event).addClass('event');
     $(images.image).addClass('image');
     $(images.line).addClass('line');

    // 按顺序添加三张图片到wrapper
    wrapper.append(images.event);
    wrapper.append(images.image);
    wrapper.append(images.line);
}

$(document).ready(function() {
    var maxFrames = parseInt($('#interpolation-slider').data('max-frames'));
    var startIndex = parseInt($('#interpolation-slider').data('start-index'));

    initializeInterpolationPlugin(maxFrames, startIndex); // 设置最大帧数和起始索引

     // Check for click events on the navbar burger icon
     $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
        setInterpolationImage(this.value);
    });

    setInterpolationImage(startIndex);
    $('#interpolation-slider').prop('min', startIndex);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();
});
