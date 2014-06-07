function View() {
    var self = this;

    this.loaded_images = {};

    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas.width = 500;
    this.canvas.height = 220;

    this.context = this.canvas.getContext("2d");

    var logo = this.load_image("logo");
    this.draw_image(logo, self.canvas.width/2 - 200/2, 0, 200, 200);
}

View.prototype.load_image = function(src) {
    if(src in this.loaded_images) {
        return this.loaded_images[src];
    }

    console.log("Loading " + src);

    var image = new Image();
    image.src = "assets/img/" + src + ".png";
    this.loaded_images[src] = image;

    return image;
};

View.prototype.draw_image = function(image, x, y, w, h) {
    var self = this;

    if(image instanceof Image) {
        w = w || image.width;
        h = h || image.height;

        this.context.drawImage(image, x, y, w, h);
    } else {
        image = this.load_image(image);
        // Wait for loading
        image.onload = function() {
            w = w || this.width;
            h = h || this.height;

            self.context.drawImage(this, x, y, w, h);
        };
    }
};

View.prototype.print_health_bars = function(characters) {

    var offsets = [10, 290];

    for(var index in offsets) {
        this.context.fillStyle = 'gray';
        this.context.fillRect(offsets[index], 10, 200, 20);
        this.context.fillStyle = 'red';
        this.context.fillRect(offsets[index] + 2, 12, 196, 16);
        this.context.fillStyle = 'green';

        var x_health_bar = offsets[index] + 2;
        var x_name = offsets[index] + 10;

        if(index == 1) {
            x_health_bar += (196 - 196 * characters[index].health/100);
            x_name = offsets[index] + 196 - this.context.measureText(characters[index].name).width - 10;
        }

        this.context.fillRect(x_health_bar, 12, 196 * characters[index].health/100, 16);
        this.context.fillStyle = 'yellow';
        this.context.font = "16px sans-serif";
        this.context.fillText(characters[index].name, x_name, 25);
    }
}
