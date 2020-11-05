document.addEventListener("DOMContentLoaded", function() {

    // Memuat Navigasi
    const loadNav = () => {
        fetch("nav.html")
            .then(response => {
                return response.text();
            })
            .then(responseText => {
                // Muat daftar Tautan
                document.querySelectorAll(".topnav, .sidenav").forEach(element => {
                    element.innerHTML = responseText;
                });

                // Event click untuk setiap menu
                document.querySelectorAll(".topnav, .sidenav").forEach(element => {
                    element.addEventListener("click", event => {
                        // close sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Load content Halaman yg di panggil
                        let page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
   
    // aktifkan  sidenav
    const elements = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elements);
    loadNav();

    // add class active saat tab menu diklik
    const tabM = document.querySelector(".tabs");
    M.Tabs.init(tabM);

    // Load page content
    const loadPage = page => {
        
       console.log("anda berada di : " + page);

       switch(page) {
           case "saved" : tabM.style.display = "none";
           break;
           default: tabM.style.display = "flex"; 
       }
        
       
       fetch(`pages/${page}.html`)
            .then(response => {
                return response.text();
            })
            .then(responseText => {
                document.getElementById("body-content").innerHTML = responseText;
                if (page == "klasemen") {
                    renderDataKlasemen();
                } 
                else if (page == "match") {
                   renderDataMatch();
                }
                else if (page == "saved") {
                    getSavedDetilClubs();
                }
            })
            .catch(_ => {
                document.getElementById("bodyContent").innerHTML = "<p> Upss... Halaman Tidak Ditemukan";
            });

    }

    let page = window.location.hash.substr(1);
    if (page == "") page = "klasemen";
    loadPage(page);


    // Jalankan sebuah fungsi ketika tab diklik

    const tabs = document.querySelectorAll(".tab a");

    tabs.forEach(tab => {
        tab.addEventListener("click", event => {

            let page = window.location.hash.substr(1); /** buat variabel page ulang karena jika pakai 
                                                        variabel page yg di atas dan dipanggil di block addeventListener
                                                        entah kenapa isi variabel nya "klasemen" terus , padahal sudah pindah ke halaman match*/
            if (page== "") page = "klasemen";

            const idLIga = event.target.getAttribute("data");
                
            if (page == "klasemen") {
                renderDataKlasemen(idLIga);
            } 
            else if (page == "match") {
                renderDataMatch(idLIga);
            }
            
        });
    });
    

})