const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const alphabetRu = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const defaultKey = "DEF"
const defaultKeyRu = "СТАНДАРТ"
const specSymbols = "!@#$%^&*()[]{}/''"
const biasEn = 97;
const lettersCount = 26;

let buttEncrypt = document.getElementById("butt_encrypt");
buttEncrypt.onclick = function() {
    let text = document.getElementById("text_to_encrypt").value;
    let key = document.getElementById("key_encrypt").value == null ? defaultKey : document.getElementById("key_encrypt").value;
    if(!isValidEn(text) || !isValidEn(key)) {
        alert("Допустимы только буквы латинского алфавита");
        return;
    }
    let crypt_text = encrypt(text, key);
    document.getElementById("text_to_decrypt").value = crypt_text;
    alert(crypt_text);
}

let buttDecrypt = document.getElementById("butt_decrypt");
buttDecrypt.onclick = function() {
    let text = document.getElementById("text_to_decrypt").value;
    let key = document.getElementById("key_decrypt").value == null ? defaultKey : document.getElementById("key_decrypt").value;
    if(!isValidEn(text) || !isValidEn(key)) {
        alert("Допустимы только буквы латинского алфавита");
        return;
    }
    let crypt_text = decrypt(text, key);
    alert(crypt_text);
}

function encrypt(text, key) {
    let result = "";
    let keyLen = key.length;

    for(let i = 0; i < text.length; i++) {
        result += String.fromCharCode((((text.charCodeAt(i) + key.charCodeAt(i % keyLen)) - 2 * biasEn) % lettersCount) + biasEn);
    }

    return result;
}

function decrypt(text, key) {
    let result = "";
    let keyLen = key.length;

    for(let i = 0; i < text.length; i++) {
        result += String.fromCharCode((((text.charCodeAt(i) - key.charCodeAt(i % keyLen)) + lettersCount) % lettersCount) + biasEn);
    }

    return result;
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

function isValidEn(text) {
    return /^[a-zA-Z]+$/.test(text)
}