const dbPromise = idb.open("Goals-Football", 1, upgradeDB => {
    const detilClubsObjectStore = upgradeDB.createObjectStore("detilClubs", {keyPath: "id"});
    detilClubsObjectStore.createIndex("name", "name", {unique: true});
});

const saveForLater = clubInfo => {
    dbPromise
        .then(db => {
            const tx = db.transaction("detilClubs", "readwrite");
            const store = tx.objectStore("detilClubs");
            console.log(clubInfo);
            store.add(clubInfo);
            return tx.complete;
        })
        .then(_ => {
            M.toast({html:`<p><strong>saved successfully</strong></br>Check saved page</p>`, classes:`rounded blue`});
        })
        .catch( _ => {
            M.toast({html:`<p><strong>Failed to save</strong></p>`, classes:`rounded blue`});
        })
}

const getDataClubsFromDB = _ => {
    return new Promise(resolve => {
        dbPromise
            .then(db => {
                const tx = db.transaction("detilClubs", "readonly");
                const store = tx.objectStore("detilClubs");
                return store.getAll();
            })
            .then(clubs => {
                resolve(clubs);
            });
    });
}

const getSavedClubById = id => {
    return new Promise (resolve => {
        dbPromise
            .then(db => {
                const tx = db.transaction("detilClubs", "readonly");
                const store = tx.objectStore("detilClubs");
                return store.get(id);
            })
            .then(club => {
                resolve(club);
            })
    });
}

const deleteById = id => {
    dbPromise
        .then(db => {
            const tx = db.transaction("detilClubs", "readwrite");
            const store = tx.objectStore("detilClubs");
            store.delete(id);
            return tx.complete;
        })
        .then(_ => {
            M.toast({html:`<p><strong>Deleted successfully</strong></p>`, classes:`rounded blue`});
            location.reload();
        })
        .catch( _ => {
            M.toast({html:`<p><strong>Failed to delete</strong></p>`, classes:`rounded blue`});
        })
}