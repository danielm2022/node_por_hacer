
const fs = require('fs');


let listadorPorHacer = [];

const guardarDB  = () => {
    let data = JSON.stringify(listadorPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se puedo guardar', err); 
    })
}

const cargarDB = () => {
    try {
        listadorPorHacer = require('../db/data.json');
    } catch (error) {
        listadorPorHacer = [];
    }
    
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadorPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadorPorHacer;
}

const actualizar = (descripcion, completado = true ) => {
    cargarDB();
    let index = listadorPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    
    if (index >= 0){
        listadorPorHacer[index].completado = completado;
        guardarDB;
        return true;
    }else{
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadorPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadorPorHacer.length  === nuevoListado.length) {
        return false;
    } else {
        listadorPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}