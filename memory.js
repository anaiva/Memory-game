const bojeSve = ["crimson", "darkgreen", "blue", "orange", "yellow", "gray", "aqua", "violet", "lawngreen"];
let n;
let niz = [];
let stil = "";
let boje = [];
let polja = document.querySelectorAll("section > div");
polja = [...polja];


console.log(polja);


const startTime = new Date().getTime();

let klasa;
let aktivnoPolje = "";
let izabranaPolja = [];

const brojParova = niz.length / 2;
let brojacUparenih = 0;
let brojacKlikova = 0;

const klikFunkcija = function () {

    aktivnoPolje = this;
    if (aktivnoPolje == izabranaPolja[0]) return;
    aktivnoPolje.classList.remove("hidden"); //prikazi polje kada kliknem na njega
    if (izabranaPolja.length === 0) {
        console.log("Izabrano jedno polje");
        izabranaPolja[0] = aktivnoPolje; // otvoreno polje ubacujem u niz od 2 elementa 
        brojacKlikova++;
        return;
    } else {
        console.log("Dva polja");
        niz.forEach(card => card.removeEventListener("click", klikFunkcija))
        console.log(niz);
        izabranaPolja[1] = aktivnoPolje; // drugo otvoreno polje ubacujemo u niz

        setTimeout(function () {

            if (izabranaPolja[0].className === izabranaPolja[1].className) {
                console.log("Pogodjen par!")
                izabranaPolja.forEach(card => card.classList.add("pogodjen"))
                // izabranaPolja.forEach(card => card.classList.add("off"))
                brojacUparenih++;
                console.log(brojacUparenih);
                niz = niz.filter(card => card.classList.contains("hidden")); // da li treba da se upise niz a ne polja / izbacuje iz niza pronadjene tj. vraca niz bez onih sa klasom off a to su pogodjeni

                if (brojacUparenih === n / 2) {

                    // niz = niz.forEach(card => card.classList.add("off")) //?niz je prazan ali zasto nije off
                    polja.forEach(card => card.classList.add("off"));
                    console.log(niz);


                    function on() {
                        document.getElementById("overlay").style.display = "block";
                        const endTime = new Date().getTime();
                        const gameTime = (endTime - startTime) / 1000

                        setTimeout(function () {
                            document.getElementById("text").innerHTML = "Broj poteza: " + brojacKlikova + '<br />' + " Vreme igre: " + gameTime + " sec"
                        }, 1500);
                        setTimeout(function ( ){location.reload();},4000);


                    }
                    on()
                    prozorKraj.onclick = function offf() { location.reload() };
                }
            } else {
                console.log("Promasaj")
                izabranaPolja.forEach(card => card.classList.add("promasaj"))
                izabranaPolja.forEach(card => card.classList.remove("promasaj"))
                izabranaPolja.forEach(card => card.classList.add("hidden"))
                // izabranaPolja.forEach(card => card.classList.remove("promasaj"))
            }
            aktivnoPolje = ""; // reset
            izabranaPolja.length = 0; //prazan niz
            niz.forEach(card => card.addEventListener("click", klikFunkcija))

        }, 1000)
    }
};


//iskljucuje prikaz pocetne strane i pocinje da prikazuje tablu
function funkcijaStart() {
    let pocetak = document.getElementById("pocetnaStrana");
    let w = "";
    let sekcija = document.getElementById("sirina");
    let prozorKraj = document.getElementById("overlay");
    prozorKraj.style.display = "none";

    polja.forEach(card => card.classList.add("start")); //tabla sa poljima je u startu sakrivena

    let klasa = document.getElementById("velicina").value; //sta je izabrano

    if (klasa == "S") {
        n = 6;
        stil = "S";
        w = "32%";
        sekcija.style.width = "60%";
        sekcija.style.marginTop = "10%"
    } else if (klasa == "M") {
        n = 12;
        stil = "M";
        w = "24%";
        sekcija.style.width = "70%";
        sekcija.style.marginTop = "2%";
    } else if (klasa == "L") {
        n = 18;
        stil = "L";
        w = "15%";
        sekcija.style.width = "90%";
        sekcija.style.marginTop = "1%";
        sekcija.style.marginLeft = "6%";
    }

    if (pocetak.style.display === "none") {

        pocetak.style.display = "block"; //prikazi pocetnu
    } else {
        pocetak.style.display = "none"; // sakriva dugme
        for (var i = 0; i < n; i++) {
            niz[i] = polja[i];
            console.log(niz[i]);

            for (let j = n; j < polja.length; j++) {
                polja[j].classList.add("sakrij");

            }
        }
        let l = n / 2;
        for (let i = 0; i < l; i++) { //boje koje se dodele nizu u zavisnosti od velicine table
            boje[i] = bojeSve[i];
        }
        boje = boje.concat(boje); //duplo boje za izabranu velicinu table
        niz.forEach(card => card.classList.remove("start")); //prikazi polja za igru, uklanja klasu         
        pocetak.style.display = "none"; //sakriva pocetnu stranicu


        // inicijalna funkcija, startuje igru
        const init = function () {
            //dodadvanje boje u polja
            niz.forEach(card => { //za svako izabrano polje dodeli boju
                const pozicijaBoje = Math.floor(Math.random() * boje.length);
                card.classList.add(boje[pozicijaBoje]); //dodeljuje poziciju
                // dodeljuje klasu boje
                boje.splice(pozicijaBoje, 1);
            })

            setTimeout(function () {
                niz.forEach(card => {
                    card.classList.add("hidden") //svaka karta je na pocetku sakrivena
                    card.style.width = w;
                    card.addEventListener("click", klikFunkcija) // veza sa klik funkciojom
                })
            }, 1) //2000 (-1?)
        };
        init()
    }
}




