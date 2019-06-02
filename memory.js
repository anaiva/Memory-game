
    let pocetak = document.getElementById("pocetnaStrana");
    let polja = document.querySelectorAll("div");
    polja = [...polja];

    console.log(polja);

    var n;

    var klasa = "S";
    var izabranaPolja = []



    //iskljucuje prikaz pocetne strane i pocinje da prikazuje tablu

    if (pocetak.style.display === "none") {

        pocetak.style.display = "block";
    } else {
        pocetak.style.display = "none";
        if (klasa == "S") {
            n = 6;
        } else if (klasa == "M") {
            n = 12;
        }
        else if (klasa == "L") {
            n = 18;
        }
        for (var i = 0; i < n; i++) {

            izabranaPolja[i] = polja[i];
            console.log(niz[i]);
            izabranaPolja[i].classList.add(klasa);
            for (let j = n; j < polja.length; j++) {
                polja[j].classList.add("sakrij");
            }

            pocetak.classList.add("sakrij");
            polja.forEach(card => card.classList.remove("start"));
            // document.getElementById("pocetna").style.display = "none"; -->
            // document.getElementById("velicina").style.display = "none"; -->
            init()
        }
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


