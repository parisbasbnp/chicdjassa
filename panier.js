const listePanier = document.getElementById("listePanier");
const totalAffiche = document.getElementById("total");
const boutonCommander = document.getElementById("commander");


let panier = JSON.parse(localStorage.getItem("panier")) || [];

const nombrePanier = document.getElementById("nombrePanier");

if(nombrePanier){

    nombrePanier.textContent = panier.length;

}



function afficherPanier(){

    listePanier.innerHTML = "";

    let total = 0;


    if(panier.length === 0){

        listePanier.innerHTML = `
        
        <h2 style="text-align:center;">
        Votre panier est vide 🛒
        </h2>
        
        `;

        totalAffiche.textContent = 0;

        return;
    }



    panier.forEach((article,index)=>{


        total += Number(article.prix) * Number(article.quantite);



        listePanier.innerHTML += `


        <div class="carte-produit">


            <img src="${article.image}">


            <h3>${article.nom}</h3>


            <p>
            Taille : ${article.taille}
            </p>


            <p>
            ${article.prix.toLocaleString("fr-FR")} FCFA
            </p>


            <button onclick="supprimerArticle(${index})">

            ❌ Supprimer

            </button>


        </div>


        `;


    });



    totalAffiche.textContent =
    total.toLocaleString("fr-FR");


}



function supprimerArticle(index){

    panier.splice(index,1);

    localStorage.setItem(
        "panier",
        JSON.stringify(panier)
    );

    afficherPanier();

    mettreAJourCompteur();

}




boutonCommander.onclick = function(){


    if(panier.length === 0){

        alert("Votre panier est vide");

        return;

    }


    window.location.href="commande.html";


};


function mettreAJourCompteur(){

    let panierActuel = JSON.parse(localStorage.getItem("panier")) || [];

    let compteur = document.getElementById("nombrePanier");

    if(compteur){

        compteur.textContent = panierActuel.length;

    }

}



afficherPanier();
