let panier = JSON.parse(localStorage.getItem("panier")) || [];


const articlesCommande = document.getElementById("articlesCommande");

const prixArticles = document.getElementById("prixArticles");
const prixLivraison = document.getElementById("prixLivraison");
const totalCommande = document.getElementById("totalCommande");


const ville = document.getElementById("ville");
const commune = document.getElementById("commune");


let totalProduits = 0;
let livraison = 0;




// AFFICHER LES ARTICLES

function afficherArticles(){


    articlesCommande.innerHTML = "";

    totalProduits = 0;



    panier.forEach(article=>{


        totalProduits += Number(article.prix) * Number(article.quantite || 1);



        articlesCommande.innerHTML += `


        <div class="articleCommande">


            <img src="${article.image}">


            <div>

                <h3>${article.nom}</h3>


                <p>
                Taille : ${article.taille}
                </p>


                <p>
                Prix :
                ${Number(article.prix).toLocaleString("fr-FR")} FCFA
                </p>


            </div>


        </div>


        `;


    });



    calculerTotal();

}





// CALCUL LIVRAISON COMMUNE ABIDJAN

commune.addEventListener("change",()=>{


    let choix = commune.value;



    if(
        choix === "Adjamé" ||
        choix === "Attécoubé"
    ){

        livraison = 1000;

    }



    else if(
        choix === "Cocody" ||
        choix === "Plateau" ||
        choix === "Marcory" ||
        choix === "Treichville"
    ){

        livraison = 1500;

    }



    else if(
        choix === "Abobo" ||
        choix === "Yopougon" ||
        choix === "Koumassi" ||
        choix === "Port-Bouët" ||
        choix === "Bingerville" ||
        choix === "Songon"
    ){

        livraison = 2000;

    }



    else{

        livraison = 0;

    }



    calculerTotal();


});







// AUTRES VILLES COTE D'IVOIRE


ville.addEventListener("change",()=>{


    if(ville.value !== "Abidjan" && ville.value !== ""){


        livraison = 5000;


    }



    else if(ville.value === "Abidjan"){


        livraison = 0;


    }



    calculerTotal();


});







// AFFICHAGE DES SOMMES AUTOMATIQUE


function calculerTotal(){


    let total = Number(totalProduits) + Number(livraison);



    prixArticles.textContent =
    Number(totalProduits).toLocaleString("fr-FR");



    prixLivraison.textContent =
    Number(livraison).toLocaleString("fr-FR");



    totalCommande.textContent =
    Number(total).toLocaleString("fr-FR");


}







// CONFIRMER LA COMMANDE


document.getElementById("confirmerCommande").onclick=function(){



    let nom = document.getElementById("nom").value;

    let telephone = document.getElementById("telephone").value;

    let adresse = document.getElementById("adresse").value;




    if(
        nom === "" ||
        telephone === "" ||
        adresse === "" ||
        ville.value === ""
    ){


        alert("Veuillez remplir toutes les informations");


        return;


    }







    let commande = {


        client: nom,


        telephone: telephone,


        ville: ville.value,


        commune: commune.value,


        adresse: adresse,


        articles: panier,


        prixArticles: totalProduits,


        livraison: livraison,


        total: Number(totalProduits) + Number(livraison),



        statut:
        "Votre commande est en cours, attente de validation ⏳",



        date:
        new Date().toLocaleString("fr-FR")


    };








    let historique =
    JSON.parse(localStorage.getItem("commandes")) || [];





    historique.push(commande);





    localStorage.setItem(
        "commandes",
        JSON.stringify(historique)
    );






    alert(
    "Votre commande a été envoyée ✅"
    );





    localStorage.removeItem("panier");





    window.location.href="historique.html";



};







afficherArticles();
