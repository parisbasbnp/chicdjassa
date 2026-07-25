const listeCommandesAdmin = document.getElementById("listeCommandesAdmin");


let commandes = JSON.parse(localStorage.getItem("commandes")) || [];




function afficherCommandes(){


    listeCommandesAdmin.innerHTML = "";



    if(commandes.length === 0){


        listeCommandesAdmin.innerHTML = `

        <div class="commande-admin">

        <h2>
        Aucune commande 📦
        </h2>

        </div>

        `;

        return;

    }






    commandes.forEach((commande,index)=>{



        let articles = "";



        commande.articles.forEach(article=>{


            articles += `


            <div class="article-admin">


                <img src="${article.image}">


                <div>


                    <h3>
                    ${article.nom}
                    </h3>


                    <p>
                    Taille : ${article.taille}
                    </p>


                    <p>
                    ${Number(article.prix).toLocaleString("fr-FR")} FCFA
                    </p>


                </div>


            </div>


            `;


        });







        listeCommandesAdmin.innerHTML += `


        <div class="commande-admin">


            <h2>
            Commande #${index + 1}
            </h2>




            ${articles}






            <p>
            👤 Client :
            ${commande.client}
            </p>



            <p>
            📞 Téléphone :
            ${commande.telephone}
            </p>



            <p>
            🏙️ Ville :
            ${commande.ville || ""}
            </p>



            <p>
            📍 Commune :
            ${commande.commune || ""}
            </p>



            <p>
            🏠 Adresse :
            ${commande.adresse || ""}
            </p>



            <p>
            💰 Total :
            ${Number(commande.total).toLocaleString("fr-FR")} FCFA
            </p>





            <div class="statut-admin">

            ${commande.statut || "Commande reçue"}

            </div>





            <button class="accepter" onclick="accepterCommande(${index})">

            ✅ Accepter la commande

            </button>
            
            <button class="imprimer" onclick="imprimerRecu(${index})">
            
            🧾 Imprimer le reçu
            
            </button>

            <button class="indisponible" onclick="produitIndisponible(${index})">
            
            ❌ Produit non disponible
            
            </button>




        </div>



        `;



    });



}








function accepterCommande(index){



    commandes[index].statut = 
    "Votre commande a été acceptée ✅ Nos équipes vous appelleront sur le numéro suivant : "
    + commandes[index].telephone
    + " pour la livraison 🚚";



    localStorage.setItem(
        "commandes",
        JSON.stringify(commandes)
    );



    alert("Commande acceptée ✅");



    afficherCommandes();


}






afficherCommandes();

function produitIndisponible(index){


    commandes[index].statut =
    "Désolé, un ou plusieurs produits de votre commande ne sont plus disponibles ❌";


    localStorage.setItem(
        "commandes",
        JSON.stringify(commandes)
    );


    alert("Commande mise en produit non disponible ❌");

    afficherCommandes();

}

function imprimerRecu(index){


    let commande = commandes[index];


    let articles = "";


    commande.articles.forEach(article=>{
    
    let prixArticle = Number(article.prix) || 0;


        articles += `

        <div class="article">

            <h3>${article.nom}</h3>

            <p>
            Taille : ${article.taille}
            </p>

            <p>
            Prix :
            ${prixArticle.toLocaleString("fr-FR")} FCFA
            </p>

        </div>

        `;


    });




    let recu = `

<html>

<head>

<title>Reçu CHIC DJASSA</title>


<style>


body{

font-family:Arial,sans-serif;

background:#f5f5f5;

padding:20px;

}



.recu{

width:380px;

margin:auto;

background:white;

padding:25px;

border-radius:25px;

box-shadow:0 10px 30px rgba(0,0,0,0.2);

border:4px solid #ff0080;

}



.logo{

text-align:center;

font-size:32px;

font-weight:900;


background:linear-gradient(
90deg,
#ff0080,
#ff8c00,
#00c3ff,
#8c00ff
);


-webkit-background-clip:text;

color:transparent;

}



.titre{

text-align:center;

color:#ff0080;

font-size:20px;

}



.info{

background:#fff3e0;

padding:15px;

border-radius:15px;

margin-top:15px;

}



.article{

background:#fce4ec;

padding:10px;

border-radius:15px;

margin-top:10px;

}



.total{

margin-top:20px;

padding:15px;

border-radius:15px;

background:#111;

color:white;

font-size:20px;

font-weight:bold;

}



.footer{

text-align:center;

margin-top:20px;

font-weight:bold;

color:#ff0080;

}



hr{

border:none;

border-top:2px dashed #ff0080;

}


</style>


</head>



<body>



<div class="recu">


<div class="logo">

CHIC DJASSA

</div>



<div class="titre">

🧾 Reçu de livraison

</div>



<hr>



<div class="info">


<p>
<b>Commande :</b> #${index + 1}
</p>


<p>
<b>Client :</b> ${commande.client}
</p>


<p>
<b>Téléphone :</b> ${commande.telephone}
</p>


<p>
<b>Commune :</b> ${commande.commune}
</p>


<p>
<b>Adresse :</b> ${commande.adresse}
</p>


</div>




<h3>
🛒 Articles
</h3>



${articles}




<div class="info">


<p>

Prix des articles :
<b>
${Number(commande.prixArticles || 0).toLocaleString("fr-FR")} FCFA
</b>

</p>



<p>

🚚 Livraison :
<b>
${Number(commande.livraison || 0).toLocaleString("fr-FR")} FCFA
</b>

</p>


</div>





<div class="total">


TOTAL :
${Number(commande.total).toLocaleString("fr-FR")} FCFA


</div>




<p>

Date :
${commande.date}

</p>



<div class="footer">

Merci pour votre confiance ❤️

</div>



</div>



</body>


</html>


`;



let fenetre = window.open("","","width=500,height=700");


fenetre.document.write(recu);


fenetre.document.close();


fenetre.print();


}
