window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Mandrake {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.querySelector('#mandrake');
            this.spriteWitdth = 256;
            this.spriteHeight = 256;
            this.width = this.spriteWitdth;
            this.height = this.spriteHeight;
            this.scale = 2;
            this.x = this.canvasWidth / 2 - this.width * this.scale / 2;
            this.y = this.canvasHeight / 2 - this.height * this.scale / 2;
            this.minFrame = 0;
            this.maxFrame = 355;
            this.frame = 0;
            this.frameX = 3;
            this.frameY = 0;
        }
        draw(context) {
            context.drawImage(
                this.image,
                this.frameX * this.spriteWitdth,
                this.frameY * this.spriteHeight,
                this.spriteWitdth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width * this.scale,
                this.height * this.scale,
            );
        }
        update() {
            // if (this.frameX < 17) this.frameX++
            // else this.frameX = 0;

            this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
            /* if (this.frame < this.maxFrame) this.frame++;
            else this.frame = this.minFrame; */

            this.frameX = this.frame % 18; // 각행의 수평 프레임 수로 나눔
            this.frameY = Math.floor(this.frame / 18); // Math.floor(내림), round(반올림), ceil(올림)
        }
    }

    const mandrake = new Mandrake(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mandrake.draw(ctx);
        mandrake.update();
        requestAnimationFrame(animate);
    }
    animate();
})