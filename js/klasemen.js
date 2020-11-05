        function renderDataKlasemen(idLiga="2021") {

            const klasemen = document.getElementById("klasemen");
            klasemen.innerHTML = `
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
                        </div>   `;

            getDataKlasemen(idLiga)
                .then(response => {
                    klasemen.innerHTML = `
                    <div class="row">
                        <div class="col s4 unvisibleSB" id="top1"></div>
                        <div class="col s8 mediumSB" id="tabel-klasemen"></div>
                    </div>`;
        
                    console.log(response);
                    const top1 = document.getElementById("top1");
                    const logoClub = response[0].team.crestUrl.replace(/^http:\/\//i, 'https://');
                    
                    top1.innerHTML = `
                              
                                <div class="row valign-wrapper">
                                    <div class="col s12 center-align">
                                        <h4>Top 1 club</h4>
                                        <a href="./infoClub.html?id=${response[0].team.id}"><img class="responsive-img" src="${logoClub}"/></a>
                                        <p><b>${response[0].team.name}</b></p>
                                        <p><strong>Poin :${response[0].points}</strong></p>
                                        <p>${response[0].form}</p>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col s12">
                                        <table>
                                                <tr>
                                                    <th>Main</th>
                                                    <td class="center-align">${response[0].playedGames}</td>
                                                </tr>    
                                                <tr>
                                                    <th>Menang</th>
                                                    <td class="center-align">${response[0].won}</td>
                                                </tr>
                                                <tr>
                                                    <th>Kalah</th>
                                                    <td class="center-align">${response[0].lost}</td>
                                                </tr>
                                                <tr>
                                                    <th>Seri</th>
                                                    <td class="center-align">${response[0].draw}</td>
                                                </tr>
                                                <tr>
                                                    <th>GM</th>
                                                    <td class="center-align">${response[0].goalsFor}</td>
                                                </tr>
                                                <tr>
                                                    <th>GA</th>
                                                    <td class="center-align">${response[0].goalsAgainst}</td>
                                                </tr>
                                                <tr>
                                                    <th>SG</th>
                                                    <td class="center-align">${response[0].goalDifference}</td>
                                                </tr>
                                        </table>
                                    </div>    
                                </div>   
                                `;
        
                    const tabelKlasemen = document.getElementById("tabel-klasemen");
                    tabelKlasemen.innerHTML = `
                                                <table class="striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Pos</th>
                                                            <th>klub</th>
                                                            <th>Main</th>
                                                            <th>M</th>
                                                            <th>K</th>
                                                            <th>S</th>
                                                            <th>Poin</th>
                                                            <th>GM</th>
                                                            <th>GK</th>
                                                            <th>SG</th>
                                                            <th>Form</th>
                                                        </tr>
                                                        </thead>
                                            
                                                    <tbody id="tabel-dataList"></tbody>
                                                </table>`;
        
                  const listKlasemen = document.getElementById("tabel-dataList");
                  for (i=1 ; i<response.length; i++ ) {
                      let logoClub = response[i].team.crestUrl.replace(/^http:\/\//i, 'https://');
                    listKlasemen.innerHTML += `
                                            <tr>
                                                <td>${response[i].position}</td>
                                                <td><a class="valign-wrapper" href="./infoClub.html?id=${response[i].team.id}"> <img class="small-img" src="${logoClub}"/> &nbsp; ${response[i].team.name}</a></td>
                                                <td>${response[i].playedGames}</td>
                                                <td>${response[i].won}</td>
                                                <td>${response[i].lost}</td>
                                                <td>${response[i].draw}</td>
                                                <td>${response[i].points}</td>
                                                <td>${response[i].goalsFor}</td>
                                                <td>${response[i].goalsAgainst}</td>
                                                <td>${response[i].goalDifference}</td>
                                                <td>${response[i].form}</td>
                                            </tr>`;
                  }                            
                    
                })
                .catch(err => {
                    document.querySelector(".loader").style.display = "none";
                    console.error(`Error : ${err}`);
                });
    
        }
