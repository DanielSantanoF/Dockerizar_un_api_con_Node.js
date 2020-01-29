const _ = require('lodash')

const data = [{
    "id": "1",
    "country_code": "ES",
    "country_name": "Spain",
    "city_name": "Seville",
    "location": "37.38614,-5.99238",
    "monument_name": "Giralda",
    "monument_description": "The Giralda (Spanish: La Giralda) is the bell tower of Seville Cathedral in Seville, Spain. It was built as the minaret for the Great Mosque of Seville in al-Andalus, Moorish Spain, during the reign of the Almohad dynasty, with a Renaissance-style top added by the Catholics after the expulsion of the Muslims from the area. The Giralda was registered in 1987 as a World Heritage Site by UNESCO, along with the Alcázar and the General Archive of the Indies. The tower is 104.1m in height and remains one of the most important symbols of the city, as it has been since the Middle Ages.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sevilla_Cathedral_-_Giralda.jpg/390px-Sevilla_Cathedral_-_Giralda.jpg"
  },
  {
    "id": "2",
    "country_code": "ES",
    "country_name": "Spain",
    "city_name": "Granada",
    "location": "37.17695,-3.59001",
    "monument_name": "Alhambra",
    "monument_description": "The Alhambra is a palace and fortress complex located in Granada, Andalusia, Spain. It was originally constructed as a small fortress in AD 889 on the remains of Roman fortifications, and then largely ignored until its ruins were renovated and rebuilt in the mid-13th century by the Nasrid emir Mohammed ben Al-Ahmar of the Emirate of Granada.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg/330px-Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg"
  },
  {
    "id": "3",
    "country_code": "ES",
    "country_name": "Spain",
    "city_name": "Barcelona",
    "location": "41.403611,2.174444",
    "monument_name": "Basílica de la Sagrada Família",
    "monument_description": "The Basílica de la Sagrada Família, also known as the Sagrada Família, is a large unfinished Roman Catholic minor basilica in Barcelona, Catalonia, Spain. Designed by Catalan architect Antoni Gaudí (1852–1926), his work on the building is part of a UNESCO World Heritage Site. On 7 November 2010, Pope Benedict XVI consecrated the church and proclaimed it a minor basilica.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg/330px-%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg"
  },
  {
    "id": "4",
    "country_code": "ES",
    "country_name": "Spain",
    "city_name": "Córdoba",
    "location": "37.879194,-4.779722",
    "monument_name": "Mosque–Cathedral of Córdoba",
    "monument_description": "The Mosque–Cathedral of Córdoba (Spanish: Mezquita-Catedral de Córdoba), also known as the Great Mosque of Córdoba[3][2][4] (Spanish: Mezquita de Córdoba) and the Mezquita, whose ecclesiastical name is the Cathedral of Our Lady of the Assumption, is the Catholic cathedral of the Diocese of Córdoba dedicated to the Assumption of the Virgin Mary and located in the Spanish region of Andalusia. The structure is regarded as one of the most accomplished monuments of Moorish architecture.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Mezquita_de_C%C3%B3rdoba_desde_el_aire_%28C%C3%B3rdoba%2C_Espa%C3%B1a%29.jpg/330px-Mezquita_de_C%C3%B3rdoba_desde_el_aire_%28C%C3%B3rdoba%2C_Espa%C3%B1a%29.jpg"
  }
];

module.exports.getData = () => {
    return data;
};

module.exports.getOneDataById = (id) =>{
    let oneDataById = null;
    data.forEach(((element, index, array) =>{
        if(element.id == id){
            oneDataById = element;
        }
    }));
    return oneDataById;
};

module.exports.postData = (body) => {
    const dataLenght = data.length;
    let newLenght = data.push(body);
    return [dataLenght, newLenght, body];
};

module.exports.updateDataById = (body) => {
    let edited = false;
    data.forEach(((element, index, array) =>{
        if(element.id == body.id){
            array[index] = body;
            edited = true;
        }
    }));
    return [edited, body];
}

module.exports.deleteById = (id) => {
    let deleteDataById = null;
    data.forEach(((element, index, array) =>{
        if(element.id == id){
            deleteDataById = element;
            //array.splice(index, 1);
            data.splice(index, 1);
        }
    }));
    return deleteDataById;
}