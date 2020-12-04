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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbm5leGlvbiA9IG5ldyBNb3ZpZURCKCk7XHJcblxyXG5cclxuICAgIGlmKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNlYXJjaChcImZpY2hlLWZpbG0uaHRtbFwiKSA+IDApe1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSAobmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikpLnNlYXJjaFBhcmFtcztcclxuXHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjb25uZXhpb24ucmVxdWV0ZURlcm5pZXJGaWxtKCk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuY2xhc3MgTW92aWVEQiB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uc3RydWN0b3JcIik7XHJcblxyXG4gICAgICAgIHRoaXMuQVBJS2V5ID0gXCJlN2QyYTVlYWM5MjlkY2JjZTk3YWJlMjg5ODdiNDExYlwiO1xyXG5cclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcblxyXG4gICAgICAgIHRoaXMuYmFzZVVSTCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9cIjtcclxuXHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIjtcclxuXHJcbiAgICAgICAgLy90aGlzLmxhcmdldXJBZmZpY2hlPSBbXCJ3OTJcIiBcIncxNTRcIiBcIncxODVcIiBcInczNDJcIiBcInc1MDBcIiBcInc3ODBcIl07XHJcbiAgICAgICAgLy90aGlzLmxhcmdldXJUZXRlQWZmaWNoZSA9IFtcInc0NVwiIFwidzE4NVwiXTtcclxuICAgICAgICAvL3RoaXMubGFyZ2V1clRvaWxlRm9uZD0gW1widzMwMFwiIFwidzc4MFwiIFwidzEyODBcIl07XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxGaWxtID0gOTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlRGVybmllckZpbG0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PWU3ZDJhNWVhYzkyOWRjYmNlOTdhYmUyODk4N2I0MTFiJmxhbmd1YWdlPWZyLUNBJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCJtb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PVwiICsgdGhpcy5BUElLZXkgKyBcIiZsYW5ndWFnZT1cIiArIHRoaXMubGFuZyArIFwiJnBhZ2U9MVwiKTtcclxuXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZURlcm5pZXJGaWxtKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGRlcm5pZXIgRmlsbVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZURlcm5pZXJGaWxtKGRhdGEpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJQYXMgZGUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YVtpXS50aXRsZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RlLWZpbG1zXCIpLmFwcGVuZENoaWxkKHVuQXJ0aWNsZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlSW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8vaW5pdGlhbGlzZSBsYSByZXF1ZXRlIHBvdXIgcmVjdXAgbGUgZmlsbSBhdmVjIGxlIGlkXHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVSTCArIFwibW92aWUvXCIrIG1vdmllSWQgKyBcIj9hcGlfa2V5PVwiICsgdGhpcy5BUElLZXkgKyBcIiZsYW5ndWFnZT1cIiArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgLy9odHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL3ttb3ZpZV9pZH0/YXBpX2tleT08PGFwaV9rZXk+PiZsYW5ndWFnZT1lbi1VU1xyXG5cclxuXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZUluZm9GaWxtKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGRlcm5pZXIgRmlsbVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlSW5mb0ZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZUluZm9GaWxtKGRhdGEpe1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGEub3ZlcnZpZXcgfHwgXCJQYXMgZGUgZGVzY3JpcHRpb25cIjtcclxuICAgICAgICBsZXQgc3JjID0gdGhpcy5pbWdQYXRoICsgXCJ3MTI4MFwiICsgZGF0YS5iYWNrZHJvcF9wYXRoO1xyXG4gICAgICAgIGxldCB1bmVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWZmaWNoZVwiKTtcclxuICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YS50aXRsZSk7XHJcbiAgICAgICAgLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwicC5yZXZlbnVcIikuaW5uZXJIVE1MID0gZGF0YS5yZXZlbnVlXHJcblxyXG4gICAgICAgIHRoaXMucmVxdWV0ZUFjdGV1cihkYXRhLmlkKTtcclxuXHJcbiAgICAgICAgLypmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxGaWxtOyBpKyspIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhW2ldLm92ZXJ2aWV3KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bkFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBsYXRlPmFydGljbGUuZmlsbVwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiUGFzIGRlIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpLnNldEF0dHJpYnV0ZShcImhyZWZcIixcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG5cclxuICAgICAgICB9Ki9cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWV0ZUFjdGV1cihtb3ZlSWQpe1xyXG4gICAgICAgIC8vR2V0IENyZWRpdHNcclxuXHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VycmVxdWV0ZUFjdGV1ci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy9pbml0aWFsaXNlIGxhIHJlcXVldGUgcG91ciByZWN1cCBsZSBmaWxtIGF2ZWMgbGUgaWRcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCJtb3ZpZS9cIisgbW92aWVJZCArIFwiL2NyZWRpdHM/YXBpX2tleT1cIiArIHRoaXMuQVBJS2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcpO1xyXG4gICAgICAgIC8vaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS97bW92aWVfaWR9P2FwaV9rZXk9PDxhcGlfa2V5Pj4mbGFuZ3VhZ2U9ZW4tVVNcclxuXHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG5cclxuICAgIH1cclxuICAgIHJldG91cnJlcXVldGVBY3RldXIoZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXRvdXIgZGVybmllciBGaWxtXCIpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmFmZmljaGVBY3RldXIoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBhZmZpY2hlQWN0ZXVyKGRhdGEpe1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn0iXSwiZmlsZSI6InNjcmlwdC5qcyJ9
