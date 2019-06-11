//dodajem boje u niz
const bojeSve = ["crimson", "darkgreen", "blue", "orange", "yellow", "gray", "aqua", "violet", "lawngreen"];
let polja = document.querySelectorAll("section > div");
polja = [...polja];
let prozorKraj = document.getElementById("overlay");
let tabla = document.getElementById("tabla");

let brojKartica;
let niz = [];
let stil = "";
let boje = [];


let klasa;  //za dodelu klase u zavisnosti od izbora velicine table
let aktivnoPolje = "";//trenutno izabrano polje
let izabranaPolja = [];//dva izabrna polja smestam u niz

let brojacUparenih = 0;
let brojacZaPar = 0;
let startTime;


    //KLIK FUNKCIJA - za svako polje....
    const klikFunkcija = function () {

        aktivnoPolje = this;
        if (aktivnoPolje == izabranaPolja[0]) return;
        aktivnoPolje.classList.remove("hidden"); //prikazi polje kada kliknem na njega
        aktivnoPolje.classList.add("rotacija");

        if (izabranaPolja.length === 0) {
            izabranaPolja[0] = aktivnoPolje; // otvoreno polje ubacujem u niz od 2 elementa 
            brojacZaPar++;
            return;
        } else {
            niz.forEach(card => card.removeEventListener("click", klikFunkcija))  //za izabrano polje nije moguce kliknuti     
            aktivnoPolje.classList.add("rotacija");
            izabranaPolja[1] = aktivnoPolje; // drugo otvoreno polje ubacujemo u niz

            setTimeout(function () {
                if (izabranaPolja[0].className === izabranaPolja[1].className) {
                    brojacUparenih++;
                    //ostavlja klasu boje posto je pogodjen par             
                    niz = niz.filter(card => card.classList.contains("hidden"));
                    // provera da li su pogodjeni svi parovi
                    if (brojacUparenih === brojKartica / 2) {
                        polja.forEach(card => card.classList.add("off"));

                        // kraj - overlay
                        function on() {
                            prozorKraj.style.display = "block";
                            const endTime = new Date().getTime();
                            console.log(endTime);
                            const gameTime = (endTime - startTime) / 1000

                            setTimeout(function () {
                                document.getElementById("text").innerHTML =
                                    "Broj poteza: " + brojacZaPar + '<br />' + " Vreme igre: " + gameTime + " s" + '<br />' + '<br />' + "Nova igra"
                            }, 1200);
                            prozorKraj.onclick = function offf() { location.reload() };
                        }
                        on()
                    }
                } else {
                    izabranaPolja.forEach(card => card.classList.remove("rotacija"));
                    izabranaPolja.forEach(card => card.classList.add("hidden"));
                }
                aktivnoPolje = ""; // reset
                izabranaPolja.length = 0; //prazan niz
                niz.forEach(card => card.addEventListener("click", klikFunkcija));

            }, 1000)
        }
    };

    //POCETNA
    function funkcijaStart() {
        let pocetak = document.getElementById("pocetnaStrana");
        let sirinaPolja = ""; //sirina polja   
        prozorKraj.style.display = "none";
        let klasa = document.getElementById("velicina").value; //sta je izabrano

        //odredjivanje velicine table za igru i dodavanje stila
        if (klasa == "S") {
            brojKartica = 6;
            stil = "S";
            sirinaPolja = "32%";
            tabla.style.width = "60%";
            tabla.style.marginTop = "10%"

        } else if (klasa == "M") {
            brojKartica = 12;
            stil = "M";
            sirinaPolja = "23%";
            tabla.style.width = "70%";
            tabla.style.marginTop = "2%";

        } else if (klasa == "L") {
            brojKartica = 18;
            stil = "L";
            sirinaPolja = "15%";
            tabla.style.width = "96%";
            tabla.style.marginTop = "1%";
            tabla.style.marginLeft = "6%";

        }
        //otkrivanje table za igru
        if (pocetak.style.display === "none") {
            pocetak.style.display = "block"; //prikazi pocetnu

        } else {
            pocetak.style.display = "none";
            for (var i = 0; i < brojKartica; i++) {
                niz[i] = polja[i];
                console.log(niz[i]);
            }
            //broj boje koje se dodele nizu u zavisnosti od velicine table
            let brojBoja = brojKartica / 2;
            for (let i = 0; i < brojBoja; i++) {
                boje[i] = bojeSve[i];
            }
            boje = boje.concat(boje); //duplo boje za izabranu velicinu table
            //prikazi polja za igru, uklanja klasu

            niz.forEach(card => {
                card.classList.remove("start")
                card.style.width = sirinaPolja;
            });
            //sakriva pocetnu stranicu         
            pocetak.style.display = "none";


            // inicijalna funkcija, startuje igru
            const init = function () {
                //dodadvanje boje u polja - nasumicno
                niz.forEach(card => {
                    const pozicijaBoje = Math.floor(Math.random() * boje.length);
                    //dodeljuje poziciju
                    card.classList.add(boje[pozicijaBoje]);
                    // dodeljuje klasu boje
                    boje.splice(pozicijaBoje, 1);
                })
                setTimeout(function () {
                    niz.forEach(card => {
                        card.classList.add("hidden") //dodaje izgled pocetne table                    
                        // veza svakog polja sa klik funkciojom
                        card.addEventListener("click", klikFunkcija)
                    })
                }, -1)
            };
            startTime = new Date().getTime();               
            init()
        }
    }