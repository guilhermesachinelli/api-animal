export default class AnimalList {
    constructor() {
        this.animals = [];
    }
    addAnimal(animal) {
        this.animals.push(animal);
    }
    getAnimals() {
        return this.animals;
    }
    getAnimalById(id) {
        return this.animals.find((animal) => animal.id == id);
    }
    deleteAnimal(id) {
        this.animals = this.animals.filter((animal) => animal.id !== id);
    }
    updateAnimal(id, name, age, type, color, status, image) {
        const animal = this.getAnimalById(id);
        if (!animal) {
            return null;
        }
        animal.name = name;
        animal.age = age;
        animal.type = type;
        animal.color = color;
        animal.status = status;
        animal.image = image;
    }
}