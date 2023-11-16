import {v4 as uuidv4} from 'uuid';
export default class Animal {
    constructor(name,age,type,color,status,image){
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.type = type;
        this.color = color;
        this.status = status;
        this.image = image;
    }
}