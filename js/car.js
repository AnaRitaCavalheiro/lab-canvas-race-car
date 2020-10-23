class Car {
    constructor() {
        this.x = 220;
        this.y = 520;
        this.width = 50;
        this.height = 80;
        this.imagSrc = './image/car.png';
    }
    drawCar() { //passes an actual image and not just the src
        const carIma = new Image();
        carIma = this.imagSrc;
        Ctx.drawImg(carIma, this.x, this.y, this.width, this.height); //ctx already exists in the first fiel so it's already loaded
    }

    moveCar() { //coordenites mean we are just cleaning the car
        ctx.clearRect(this.x, this.y, this.width, this.height);
        switch (keyCode) { 
            //move to the left
            case 37:
                if(this.x > 20) { //making sure the car doesn's go off road
                    this.x -= 10;
                }
            break;
            //move to the right
            case 39:
                if(this.x < 430) {
                 this.x += 10;   
                }
            break;    
        }
    }
}