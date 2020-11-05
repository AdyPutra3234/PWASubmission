const getSavedDetilClubs = _ => {
    const saved = document.getElementById("detilClubs");
    
    getDataClubsFromDB().then(clubs => {
        console.log(clubs);

        clubs.forEach(club => {
            let logoClub = club.crestUrl.replace(/^http:\/\//i, 'https://');

            saved.innerHTML += `
                            <div class="col s12 m4" id="saveCard">
                                <div class="card grey lighten-5">
                                    <div class="card-image wrapper">
                                    <img class="responsive-img logo" src="${logoClub}">
                                    <a class="btn-floating halfway-fab red waves-effect waves-light" ><i class="material-icons small hapus" data-id="${club.id}">delete</i></a>    
                                    </div>
                                    <div class="card-content center-align">
                                    <span class="card-title">${club.shortName}</span>
                                    <button><a href="./infoClub.html?id=${club.id}&saved=true">Detil Club</a></button>
                                    </div>
                                </div>
                            </div>`;
        })

        const hapus = document.querySelectorAll(".hapus");
        hapus.forEach(btnDelete => {

            btnDelete.addEventListener("click", function(event) {
                let idKey = event.target.getAttribute("data-id");
                console.log(idKey);
                const idKeyToInt = parseInt(idKey);
                deleteById(idKeyToInt);
                console.log("BTN hapus diclick");
            })
        })
    });

}