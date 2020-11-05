const base_url = "https://api.football-data.org/v2";
    
    const getDataKlasemen = idLiga => {
        return new Promise((resolve, reject) => {
            if ("caches" in window) {
                caches.match(`${base_url}/competitions/${idLiga}/standings`)
                    .then(response => {
                        if (response) {
                            return response.json()
                            .then(responseJson => {
                                resolve(responseJson.standings[0].table);
                                console.log("hasil request ke cache......")
                            })
                        }
                    })
                    .catch(err => {
                        reject(console.log("cache tidak ditemukan ", err));
                    })
            }


            fetch(`${base_url}/competitions/${idLiga}/standings`, {
                headers: {
                    "X-Auth-Token" : "dbddf147c91640cb93f6d642409caf49"
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    resolve(responseJson.standings[0].table);
                })
                .catch(err => {
                    reject(console.log(`Error :  ${err}`));
                });
        });
    }

    const getDataHasilTanding = idLiga => {
        return new Promise((resolve, reject) => {
            if ("caches" in window) {
                caches.match(`${base_url}/competitions/${idLiga}/matches?status=FINISHED`)
                    .then(response => {
                        if (response) {
                            return response.json()
                                .then(responseJson => {
                                    resolve(responseJson.matches);
                                })
                        }
                    })
                    .catch(err => {
                        reject(console.log("cache tidak ditemukan ", err));
                    })
            }


            fetch(`${base_url}/competitions/${idLiga}/matches?status=FINISHED`, {
                headers: {
                    "X-Auth-Token" : "dbddf147c91640cb93f6d642409caf49"
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(responseJson => {
                    resolve(responseJson.matches);
                })
                .catch(err => {
                    reject(console.log(`Error :  ${err}`));
                })
        });
    }

    const getDataJadwalTanding = idLiga => {
        return new Promise ((resolve, reject) => {
            if ("caches" in window) {
                caches.match(`${base_url}/competitions/${idLiga}/matches?status=SCHEDULED`)
                    .then(response => {
                        if (response) {
                            return response.json()
                                .then(responseJson => {
                                    resolve(responseJson.matches);
                                })
                        }
                    })
                    .catch(err => {
                        reject(console.log("cache tidak ditemukan ", err));
                    })
            }


            fetch(`${base_url}/competitions/${idLiga}/matches?status=SCHEDULED`, {
                headers: {
                    "X-Auth-Token" : "dbddf147c91640cb93f6d642409caf49"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                resolve(responseJson.matches);
            })
            .catch(err => {
                reject(console.log(`Error :  ${err}`));
            });
        })
    }


    const getDataInfoClub = idClub => {
        return new Promise((resolve, reject) => {
            if ("caches" in window) {
                caches.match(`${base_url}/teams/${idClub}`)
                    .then(response => {
                        if (response) {
                            return response.json()
                                .then(responseJson => {
                                    resolve(responseJson);
                                })
                        }
                    })
                    .catch(err => {
                        reject(console.log("cache tidak ditemukan ", err));
                    })
            }


            fetch(`${base_url}/teams/${idClub}`, {
                headers: {
                    "X-Auth-Token" : "dbddf147c91640cb93f6d642409caf49"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                resolve(responseJson);
            })
            .catch(err => {
                reject(console.log(`Error :  ${err}`));
            });
        })
    }