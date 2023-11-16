import Animal from '../models/Animal.js';
import AnimalList from '../models/AnimalList.js';
const animalList = new AnimalList();
export const getAnimals = (req, res) => {
    const animals = animalList.getAnimals();
    const { type } = req.query;
    if (type) {
        const filterAnimals = animals.filter((animal) => animal.type == type);
        if (!filterAnimals.length) {
            return res.status(404).send({ message: "Não há animais com esse tipo" });
        }
        filterAnimals.forEach((animal) => {
            if (animal.status == true) {
                animal.status = "Vacinado";
            } else {
                animal.status = "Não vacinado";
            }
        });
        return res.status(200).send({ message: `Numero de animais cadastrados é ${filterAnimals.length}`, data: filterAnimals });
    }
    console.log(type)
    if (!animals.length) {
        return res.status(200).send({ message: "Não há animais cadastrados" });
    }
    return res.status(200).send({ message: `Numero de animais cadastrados é ${animals.length}`, data: animals });
};
export const getAnimalById = (req, res) => {
    const { id } = req.params;
    const animal = animalList.getAnimalById(id);
    if (!animal) {
        return res.status(404).send({ message: "Animal não encontrado" });
    }
    return res.status(200).send({ message: "Animal encontrado com sucesso", data: animal });
}
export const createAnimal = (req, res) => {
    const { name, age, type, color, status, image } = req.body;
    let error = "erro no dado:";

    let count = 0;
    if (name.length < 3 || name.length > 50) {
        error += " Nome inválido."
        count++
    }
    if (typeof age != 'number' || age == "") {
        if (age < 0 || Number.isInteger(age) == false) {
            error += " Idade inválida."
            error.push("Idade inválida.")
            count++
        }
    }
    if (type.length > 30 || type == "") {
        error += " Tipo inválido."
        count++
    }
    if (color.length > 20 || color == "") {
        error += " Cor inválida."
        count++
    }
    if (image.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        error += " Imagem inválida."
        count++
    }
    if (typeof status != 'boolean') {
        error += " Vacinacao invalida."
        count++
    }
    const animalNovo = new Animal(name, age, type, color, status, image)

    if (count == 0) {
        animalList.addAnimal(animalNovo)
        res.status(200).send({ message: "Animal criado com sucesso", origem: "controllers", data: animalNovo })
    } else {
        res.status(400).send({ message: error, status: "Not Found" })
    }
}

export const deleteAnimal = (req, res) => {
    const { id } = req.params;
    const animal = animalList.getAnimalById(id);
    if (!animal) {
        return res.status(404).send({ message: "Animal não encontrado" });
    }
    animalList.deleteAnimal(id);
    return res.status(200).send({ message: "Animal deletado com sucesso" });
}
export const updateAnimal = (req, res) => {
    const { id } = req.params;
    const { name, age, type, color, status, image } = req.body;
    const AnimailById = animalList.getAnimalById(id)
    if (!AnimailById) {
        return res.status(404).send({ message: "Animal não encontrado" })
    }
    let error = "erro no dado:";
    let count = 0;
    if (name.length < 3 || name.length > 50) {
        error += " Nome inválido."
        count++
    }
    if (typeof age != 'number' || age == "") {
        if (age < 0 || Number.isInteger(age) == false) {
            error += " Idade inválida."
            count++
        }
    }
    if (type.length > 30 || type == "") {
        error += " Tipo inválido."
        count++
    }
    if (color.length > 20 || color == "") {
        error += " Cor inválida."
        count++
    }
    if (image.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        error += " Imagem inválida."
        count++
    }
    if (typeof status != 'boolean' || status == "") {
        error += " Vacinacao invalida."
        count++
    }
    const updateAnimal = animalList.updateAnimal(id, name, age, type, color, status, image)
    return res.status(200).send({
        message: "Animal atualizado com sucesso",
        data: updateAnimal
    })
}
