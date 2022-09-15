window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 2500;
    canvas.height = 1400;

    class Mandrake {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.image = document.querySelector('#mandrake');
            this.spriteWidth = 256;
            this.spriteHeight = 256;

            // this.width = this.spriteWidth;
            // this.height = this.spriteHeight;

            this.scale = 2;
            this.x = this.canvasWidth / 2 - this.spriteWidth * this.scale / 2;
            this.y = this.canvasHeight / 2 - this.spriteHeight * this.scale / 2;
            this.minFrame = 0;
            this.maxFrame = 355;

            this.frame = 0;
            this.frameX = 3;
            this.frameY = 0;
        }

        draw(context) {
            context.drawImage( // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                this.image,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.spriteWidth * this.scale,
                this.spriteHeight * this.scale,
            );
        }

        update() {
            // if (this.frameX < 17) this.frameX++
            // else this.frameX = 0;

            this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
            /* if (this.frame < this.maxFrame) this.frame++;
            else this.frame = this.minFrame; */

            this.frameX = this.frame % 18; // 각행의 수평 프레임 수로 나눠 나머지를 반환
            this.frameY = Math.floor(this.frame / 18); // Math.floor(내림), round(반올림), ceil(올림)
        }
        setAnimation(newMinFrame, newMaxFrame) {
            this.minFrame = newMinFrame;
            this.maxFrame = newMaxFrame;
            this.frame = this.minFrame;
        }
    }

    const mandrake = new Mandrake(canvas.width, canvas.height);
    console.log(mandrake.__proto__);
    console.log(Mandrake.prototype);
    console.log(mandrake.constructor);

    // new 연산자

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  //canvas의 뿌려진 부분 초기화  
        mandrake.draw(ctx);
        mandrake.update();
        requestAnimationFrame(animate);
        //requestAnimationFrame(반복할 함수)
        // - 백그라운드 동작 및 비활성화시 중지(성능 최적화)
        // - 최대 1ms(1/1000s)로 제한되며 1초에 60번 동작
        // - 다수의 애니메이션에도 각각 타이머 값을 생성 및 참조하지 않고 내부의 동일한 타이머 참조 
    }
    animate();


    //애니메이션 버튼
    const all = document.querySelector('#all')
    all.addEventListener('click', function () {
        mandrake.setAnimation(0, 355);
    });

    const grow = document.querySelector('#grow')
    grow.addEventListener('click', function () {
        mandrake.setAnimation(0, 75);
    });

    const wink = document.querySelector('#wink')
    wink.addEventListener('click', function () {
        mandrake.setAnimation(76, 112);
    });

    const float = document.querySelector('#float')
    float.addEventListener('click', function () {
        mandrake.setAnimation(113, 262);
    });

    const hide = document.querySelector('#hide')
    hide.addEventListener('click', function () {
        mandrake.setAnimation(263, 355);
    });
})
