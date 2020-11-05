async function renderDataMatch(idLiga="2021") {
   
                const listPertandingan = document.getElementById("listPertandingan");
                const jadwalTanding = document.getElementById("jadwalPertandingan");
    
                listPertandingan.innerHTML = `
                                    <div class="loader">
                                        <div class="preloader-wrapper active">
                                            <div class="spinner-layer spinner-red-only">
                                            <div class="circle-clipper left">
                                                <div class="circle"></div>
                                            </div><div class="gap-patch">
                                                <div class="circle"></div>
                                            </div><div class="circle-clipper right">
                                                <div class="circle"></div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>   `;
    
                jadwalTanding.innerHTML = `
                                    <div class="loader">
                                        <div class="preloader-wrapper active">
                                            <div class="spinner-layer spinner-blue-only">
                                            <div class="circle-clipper left">
                                                <div class="circle"></div>
                                            </div><div class="gap-patch">
                                                <div class="circle"></div>
                                            </div><div class="circle-clipper right">
                                                <div class="circle"></div>
                                            </div>
                                            </div>
                                        </div>
                                    </div> `;     
                                    
            
            getDataHasilTanding(idLiga)
                    .then(response => {
                        
                        listPertandingan.innerHTML = "";
                        console.log(response);
                        
                        for (i = response.length-1 ; i >= 0; i--) {
                            listPertandingan.innerHTML += `
                                        <div class="card">
                                            <p>${response[i].utcDate.substr(0,10)}</p>
                                            <div class="row valign-wrapper">
                                                <div class="col s5 namaTim">${response[i].homeTeam.name}</div>
                                                <div class="col s1 score">${response[i].score.fullTime.homeTeam}</div>
                                                <div class="col s1 score">${response[i].score.fullTime.awayTeam}</div>
                                                <div class="col s5 right-align">${response[i].awayTeam.name}</div>
                                            </div>
                                        </div>`;
                    
                        }
        
                    })
                    .catch(_ => {
                        document.querySelector(".loader").style.display = "none";
                    })
            


            getDataJadwalTanding(idLiga)

                .then(response => {
                    
                    jadwalTanding.innerHTML = "";

                    response.forEach(data => {
                        jadwalTanding.innerHTML += `
                                    <div class="card">
                                        <p>${data.utcDate.substr(0,10)}</p>
                                        <div class="row valign-wrapper">
                                            <div class="col s5 namaTim">${data.homeTeam.name}</div>
                                            <div class="col s2 center-align">VS</div>
                                            <div class="col s5 right-align">${data.awayTeam.name}</div>
                                        </div>
                                    </div>`;
                    });
                })
                .catch(_ => {
                    document.querySelector(".loader").style.display = "none";
                })        

        }