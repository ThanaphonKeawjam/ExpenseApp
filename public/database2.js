firebase.database().ref('expenses').once('value', (snapshot) => {
    const value = snapshot.val();
    const ye = Object.values(value);

    for(let it1 of ye){
        let mo = Object.values(it1);
        for(let it2 of mo){
            let item = Object.values(it2);
            for(var i=0; i<item.length; i++){
                document.getElementById('tb').innerHTML += `<tr><td>${item[i].date}</td>
                <td>${item[i].description}</td>
                <td>${item[i].amount}</td>
                </tr>`;
            }
        }
    }

});