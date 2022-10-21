const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ., ".split("");
const alphabetRu = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const defaultKey = "DEF"
const defaultKeyRu = "СТАНДАРТ"

let buttEncrypt = document.getElementById("butt_encrypt");
buttEncrypt.onclick = function() {
    let text = document.getElementById("text_to_encrypt").value;
    let key = document.getElementById("key_encrypt").value == null ? defaultKey : document.getElementById("key_encrypt").value;
    let crypt_text = encryption(text.toUpperCase(), key.toUpperCase());
    document.getElementById("text_to_decrypt").value = crypt_text;
    alert(crypt_text);
}

let buttDecrypt = document.getElementById("butt_decrypt");
buttDecrypt.onclick = function() {
    let text = document.getElementById("text_to_decrypt").value;
    let key = document.getElementById("key_decrypt").value;
    let crypt_text = decryption(text.toUpperCase(), key.toUpperCase());
    alert(crypt_text);
}

function encryption(text, key) {
    let result = "";
    let temp_key = key.split("");
    let k = 0;
    while(temp_key.length < text.length) {
        temp_key.push(key[k]);
        k++;
        if(k > key.length-1)
            k = 0;
    }
    
    for(let i = 0; i < text.length; i++) {
        let index = (alphabet.indexOf(text[i]) + alphabet.indexOf(temp_key[i]))%alphabet.length;
        result += alphabet[index];
    }

    return result;
}

function decryption(text, key) {
    let result = "";
    let temp_key = key.split("");
    let k = 0;
    while(temp_key.length < text.length) {
        temp_key.push(key[k]);
        k++;
        if(k > key.length-1)
            k = 0;
    }

    for(let i = 0; i < text.length; i++) {
        let index = (alphabet.length - (alphabet.indexOf(temp_key[i]) - alphabet.indexOf(text[i]))) % alphabet.length;
        result += alphabet[index];
    }
    return result;
}

function vizhenerSquare() {
    let square = [];
    for (var i = 0; i < alphabet.length; i++) {
        square[i] = alphabet.slice(i).concat(alphabet.slice(0, i));
    }
    return square;
}

function printArr(array) {
    let s = "";
    array.forEach(element => {
        s += element;
    });
    return s;
}