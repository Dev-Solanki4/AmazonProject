class Car{
    #brand;
    #model;
    speed=0;
    isTrunkOpen=false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        console.log(`${this.#brand} : ${this.#model},Speed:${this.speed} km/h, Trunk:${this.isTrunkOpen ? "Open" : "Closed"}`);
    }
    go(){
        if(!this.isTrunkOpen){
            this.speed +=5;
        }else{
            return;
        }
    }
    brake(){
        this.speed -=5;
    }
    openTrunk(){
        if(this.speed===0){
            this.isTrunkOpen = true;
        }else{
            return;
        }
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }
    getBrand(){
        return this.#brand;
    }
    getModel(){
        return this.#model;
    }

}

class RaceCar extends Car{
    acceleration=0;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    displayInfo(){
        console.log(`${super.getBrand()} : ${super.getModel()}, acceleration:${this.acceleration} km/h, Speed:${this.speed} km/h`);
    }

    go(){
        if(this.speed<=300){
            this.speed+=this.acceleration;
        }else{
            return;
        }
    }
    openTrunk(){return;}
    closeTrunk(){return;}
}



// Objects

const toyota = new Car({
    brand:'Toyota',
    model:'Corolla'
});
const tesla = new Car({
    brand:'Tesla',
    model:'model 3'
});

toyota.displayInfo();
tesla.displayInfo();

for(let i=0;i<10;i++){
    if(i%2===0){
        toyota.brake();
    }
    toyota.go();
}
for(let i=0;i<30;i++){
    if(i%2===0){
        tesla.brake();
    }
    tesla.go();
}

toyota.displayInfo();
tesla.displayInfo();

toyota.openTrunk();
toyota.go();
toyota.go();
toyota.go();
toyota.go();
toyota.displayInfo();

toyota.closeTrunk();
toyota.go();
toyota.go();
toyota.go();
toyota.go();
toyota.displayInfo();

toyota.speed=0;
toyota.openTrunk();
toyota.displayInfo();
toyota.go();
toyota.go();
toyota.go();
toyota.go();
toyota.go();
toyota.displayInfo();

const mclaren = new RaceCar({
    brand:'McLaren',
    model:'P1',
    acceleration:20
});
mclaren.displayInfo();
mclaren.go();
mclaren.go();
mclaren.go();
mclaren.go();
mclaren.go();
mclaren.go();
mclaren.brake();
mclaren.displayInfo();