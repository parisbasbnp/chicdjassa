const listeCommandes = document.getElementById("listeCommandes");


let commandes = JSON.parse(localStorage.getItem("commandes")) || [];




function afficherHistorique(){


    listeCommandes.innerHTML = "";



    if(commandes.length === 0){


        listeCommandes.innerHTML = `

        <div class="commande-card">

            <h2>
            Aucune commande trouvée 📦
            </h2>

            <p>
            Vous n'avez pas encore passé de commande.
            </p>

        </div>

        `;


        return;

    }






    commandes.forEach((commande,index)=>{


        let articles = "";



        commande.articles.forEach(article=>{


            articles += `


            <div class="article-historique">


                <img src="${article.image}">


                <div>


                    <h3>
                    ${article.nom}
                    </h3>


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







        listeCommandes.innerHTML += `


        <div class="commande-card">


            <h2>
            Commande #${index + 1}
            </h2>




            ${articles}






            <p>
            👤 Nom complet :
            ${commande.client}
            </p>



            <p>
            📞 Téléphone :
            ${commande.telephone}
            </p>




            <p>
            🏙️ Ville :
            ${commande.ville || "Non renseignée"}
            </p>




            <p>
            📍 Commune :
            ${commande.commune || "Non renseignée"}
            </p>




            <p>
            🏠 Adresse précise :
            ${commande.adresse || "Non renseignée"}
            </p>




            <p>
            💰 Prix des articles :
            ${Number(commande.prixArticles || 0).toLocaleString("fr-FR")} FCFA
            </p>




            <p>
            🚚 Prix livraison :
            ${Number(commande.livraison || 0).toLocaleString("fr-FR")} FCFA
            </p>





            <p>
            📅 Date :
            ${commande.date}
            </p>






            <div class="prix-total">


            Total :
            ${Number(commande.total).toLocaleString("fr-FR")}
            FCFA


            </div>







            <div class="statut">

            ${commande.statut || "Commande reçue ✅"}

            </div>





        </div>



        `;



    });



}





afficherHistorique();
