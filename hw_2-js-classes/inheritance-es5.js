function Car (name,model,year,color,maxSpeed){
    this.name = name,
    this.model = model,
    this.year = year,
    this.color = color,
    this.maxSpeed = maxSpeed,
    this.fuelCapacity = 60,
    this.fuelConsumption = 10

}

Car.prototype.getFullName = function(){
    return console.log(`${this.name} ${this.model}`);
};

Car.prototype.getAge = function(){
    let date = new Date();
    let yearActuele = date.getFullYear();
    return console.log(yearActuele - this.year + ' ' + 'лет машине')
}

Car.prototype.changeColor = function(newColor = this.color){
    if(this.color != newColor){
        return console.log(`Авто уже покрашено в ${this.color} цвет`)
    }else{
        return console.log(`Авто было покрашено в ${newColor}`) 
    }
}

Car.prototype.calculateWay = function(kilometrs,fuel = this.fuelCapacity){
    let fuelForTravel = kilometrs / this.fuelConsumption;
    let start;
    if(fuel < 10){
        console.log('Слишком мало топлива,нужно заправиться');
        return start = false;
    } 
    else if (fuel < fuelForTravel){
        fuelForTravel -= fuel;
        console.log(`Нужно будет заправить ${fuelForTravel} литра топлива для вашей поездки`);
        return start = false;
    }
    else if (start){
        let averageSpeed = 70; //km
        let travelTime = kilometrs / averageSpeed
        console.log(`Топлива достаточно, среднее время в пути ${travelTime.toFixed()} часов`)
    }
}

// First vehicule
function Bmw (wheelRadius, ...rest){
    this._super.call(this, rest)
    this.wheelRadius = wheelRadius;
}
Bmw.prototype = Object.create(Car.prototype);
Bmw.prototype.constructor = Bmw;
Bmw.prototype._super = Car;

Bmw.prototype.getInfoBmw = function(){
    return `${this.name}-${this.model},${this.wheelRadius} Размер колес` 
}

// Second vehicule


function Audi (voiceControl, ...rest){
    this._super.call(this, rest)
    this.voiceControl = voiceControl;
}
Audi.prototype = Object.create(Car.prototype);
Audi.prototype.constructor = Audi;
Audi.prototype._super = Car;

Audi.prototype.getInfoAudi = function(){
    return `${this.name}-${this.model} с ${this.voiceControl}` 
}

// Third vehicule 

function Tesla (autoPilot, ...rest){
    this._super.call(this, rest)
    this.autoPilot = autoPilot;
}
Tesla.prototype = Object.create(Car.prototype);
Tesla.prototype.constructor = Tesla;
Tesla.prototype._super = Car;

Tesla.prototype.getInfoTesla = function(){
    return `${this.name} model ${this.model} с ${this.autoPilot} очень крута` 
}


let bmw = new Bmw(17,'bmw',320,2015,'black')
bmw.changeColor()
bmw.calculateWay(330,32)
let audi = new Audi('голосовое управление','audi','A3',2012,'white');
audi.getInfoAudi()
audi.calculateWay(250,20)
let tesla = new Tesla('авто пилотом','Tesla','s',2018,'blue')
console.log(tesla.getInfoTesla())
