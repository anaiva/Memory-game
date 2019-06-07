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

const klikFunkcija = function () { //zasto ne uklanja hidden?

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
                izabranaPolja.forEach(card => card.classList.add("off"))
                brojacUparenih++;
                console.log(brojacUparenih);
                niz = niz.filter(card => !card.classList.contains("off")); // da li treba da se upise niz a ne polja / izbacuje iz niza pronadjene tj. vraca niz bez onih sa klasom off a to su pogodjeni

                if (brojacUparenih === n / 2) {

                    // niz = niz.forEach(card => card.classList.add("off")) //?niz je prazan ali zasto nije off
                    polja.forEach(card => card.classList.add("off"));
                    console.log(niz);
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Bravo! Vreme igre je: ${gameTime} sekundi ${brojacKlikova}`);

                    // setTimeout(function() { alert(`Bravo! Vreme igre je: ${gameTime} sekundi`); }, 2);

                    location.reload();
                    funkcijaStart();
                }
            } else {
                console.log("Promasaj")
                izabranaPolja.forEach(card => card.classList.add("hidden"))
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
    polja.forEach(card => card.classList.add("start")); //tabla sa poljima je u startu sakrivena
    //var x = document.getElementById("pocetnaStrana"); //za sakrivanje/otkrivanje pocetne strane
    var klasa = document.getElementById("velicina").value //sta je izabrano

    if (klasa == "S") {
        n = 6;
        w = "32%";
        sekcija.style.width = "70%";
        sekcija.style.marginTop = "10%"
    } else if (klasa == "M") {
        n = 12;
        w = "24%";
        sekcija.style.width = "80%";
        sekcija.style.marginTop = "2%";
    } else if (klasa == "L") {
        n = 18;
        w = "15%";
        sekcija.style.width = "95%";
        sekcija.style.marginTop = "1%";
        sekcija.style.marginLeft = "6%";
    }

    function izgledTable(a) {

        if (a == 6) {
            stil = "S"
        } else if (a == 12) {
            stil = "M"
        } else {
            stil = "L"
        }
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
        // document.getElementById("velicina").style.display = "none"; //iskljucujem/sakrivam prikaz pocetne strane tj izbornih polja  

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



// for (var i = 0; i < n; i++) {

//     izabranaPolja[i] = polja[i];
//     console.log(niz[i]);
//     izabranaPolja[i].classList.add(klasa);
//     for (let j = n; j < polja.length; j++) {
//         polja[j].classList.add("sakrij");
//     }

//     pocetak.classList.add("sakrij");
//     polja.forEach(card => card.classList.remove("start"));
// document.getElementById("pocetna").style.display = "none"; -->
// document.getElementById("velicina").style.display = "none"; -->
//     init()
// }
// function myFunction() {
//     // na sta uticem
//     polja.forEach(card => card.classList.add("pocetak"))

//     var x = document.getElementById("pocetna");
//     if (x.style.display === "none") {

//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//         polja.forEach(card => card.classList.remove("pocetak"));
//         document.getElementById("pocetna").style.display = "none"; //isto kao x.style.display ... ?
//         document.getElementById("velicina").style.display = "none";
//         init()
//     }


// }