document.addEventListener("DOMContentLoaded", function() {

    const jumbotron = document.querySelector(".jumbotron");
    const content = document.getElementById("tabelSquad");
    const info = document.getElementById("moreInformation");
    const btnSave = document.getElementById("save");
    const urlParams = new URLSearchParams(window.location.search);
    const idClub = urlParams.get("id");
    const fromSaved = urlParams.get("saved");
    const goBackPage = document.getElementById("kembali");

    const renderClub = club => {

        const logoClub = club.crestUrl.replace(/^http:\/\//i, 'https://');

        jumbotron.innerHTML = `
                            <div class="container">
                                <div class="row">
                                    <div class="col s12 center-align">
                                        <img class="mediumImg" src="${logoClub}" alt="${club.shortName}">
                                        <h3>${club.shortName}</h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 center-align">
                                        <button><a href="${club.website}">Official Link</a></button>
                                    </div>
                                </div>
                            </div>`;

                content.innerHTML = `
                                <div class="card mediumSB">
                                    <table class="striped">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Kebangsaan</th>
                                                <th>Tgl Lahir</th>
                                                <th>Posisi</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody class="listPemain"></tbody>
                                    </table>
                                </div>    `;
                          
                const listPemain = document.querySelector(".listPemain");
                
                club.squad.forEach(dataPemain => {
                        
                        if (dataPemain.position === null) dataPemain.position = "-";

                    listPemain.innerHTML += `
                            <tr>
                                <td>${dataPemain.name}</td>
                                <td>${dataPemain.nationality}</td>
                                <td>${dataPemain.dateOfBirth.substr(0,10)}</td>
                                <td>${dataPemain.position}</td>
                                <td>${dataPemain.role}</td>
                            </tr>`;
                        });
                 
                info.innerHTML = `
                            <div class="card">
                                <table class="highlight">                              
                                        <tr>
                                            <th>Tahun Berdiri</th>
                                            <td>${club.founded}</td>
                                        </tr>    
                                        <tr>
                                            <th>Stadion</th>
                                            <td>${club.venue}</td>
                                        </tr>    
                                        <tr>
                                            <th>Alamat</th>
                                            <td>${club.address}</td>
                                        </tr>    
                                        <tr>
                                            <th>Email</th>
                                            <td>${club.email}</td>
                                        </tr>    
                                        <tr>
                                            <th>Phone</th>
                                            <td>${club.phone}</td>
                                        </tr>    
                                </table>
                            </div>`;
    }

    if (fromSaved) {
        btnSave.style.display = "none";
        const idParam = parseInt(idClub);
        getSavedClubById(idParam).then(resolve => {
            renderClub(resolve);
        })

    } else {
        btnSave.addEventListener("click", _ => {
            console.log("BTN Save Diklik");
            getDataInfoClub(idClub)
                .then(resolve => {
                    saveForLater(resolve);
                })
        });
        
        getDataInfoClub(idClub).then(resolve => {
            console.log(resolve);
            renderClub(resolve);
        })
    }

    goBackPage.addEventListener("click", function() {
        window.history.back();
    })


})
