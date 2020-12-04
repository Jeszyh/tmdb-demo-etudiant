document.addEventListener("DOMContentLoaded", function () {
    let connexion = new MovieDB();


    if(document.location.pathname.search("fiche-film.html") > 0){
        let params = (new URL(document.location)).searchParams;

        connexion.requeteInfoFilm(params.get("id"));
    }
    else{
        connexion.requeteDernierFilm();
    }

});



class MovieDB {
    constructor(){
        console.log("Constructor");

        this.APIKey = "e7d2a5eac929dcbce97abe28987b411b";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3/";

        this.imgPath = "https://image.tmdb.org/t/p/";

        //this.largeurAffiche= ["w92" "w154" "w185" "w342" "w500" "w780"];
        //this.largeurTeteAffiche = ["w45" "w185"];
        //this.largeurToileFond= ["w300" "w780" "w1280"];

        this.totalFilm = 9;
    }

    requeteDernierFilm(){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=e7d2a5eac929dcbce97abe28987b411b&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "movie/now_playing?api_key=" + this.APIKey + "&language=" + this.lang + "&page=1");

        requete.send();
    }

    retourRequeteDernierFilm(e){
        console.log("Retour dernier Film");

        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;
        console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){
        for (let i = 0; i < this.totalFilm; i++) {
            //console.log(data[i].title);
            //console.log(data[i].overview);

            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = data[i].title;

            unArticle.querySelector(".description").innerHTML = data[i].overview || "Pas de description disponible";

            let src = this.imgPath + "w185" + data[i].poster_path;
            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            unArticle.querySelector("a").setAttribute("href","fiche-film.html?id=" + data[i].id);

            document.querySelector(".liste-films").appendChild(unArticle);

        }

    }


    requeteInfoFilm(movieId){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));

        //initialise la requete pour recup le film avec le id
        requete.open("GET", this.baseURL + "movie/"+ movieId + "?api_key=" + this.APIKey + "&language=" + this.lang);
        //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US


        requete.send();
    }

    retourRequeteInfoFilm(e){
        console.log("Retour dernier Film");

        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText);
        //console.log(data);

        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){

        document.querySelector("h1").innerHTML = data.title;
        document.querySelector(".description").innerHTML = data.overview || "Pas de description";
        let src = this.imgPath + "w1280" + data.backdrop_path;
        let uneImage = document.querySelector(".affiche");
        uneImage.setAttribute("src", src);
        uneImage.setAttribute("alt", data.title);
        //document.querySelector("p.revenu").innerHTML = data.revenue

        this.requeteActeur(data.id);

        /*for (let i = 0; i < this.totalFilm; i++) {
            //console.log(data[i].title);
            //console.log(data[i].overview);

            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = data[i].title;

            unArticle.querySelector(".description").innerHTML = data[i].overview || "Pas de description disponible";

            let src = this.imgPath + "w185" + data[i].poster_path;
            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            unArticle.querySelector("a").setAttribute("href","fiche-film.html?id=" + data[i].id);

            document.querySelector(".liste-films").appendChild(unArticle);

        }*/

    }

    requeteActeur(moveId){
        //Get Credits

        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourrequeteActeur.bind(this));

        //initialise la requete pour recup le film avec le id
        requete.open("GET", this.baseURL + "movie/"+ movieId + "/credits?api_key=" + this.APIKey + "&language=" + this.lang);
        //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US


        requete.send();

    }
    retourrequeteActeur(e){
        console.log("Retour dernier Film");

        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText);
        //console.log(data);

        this.afficheActeur(data);
    }
    afficheActeur(data){

    }




}