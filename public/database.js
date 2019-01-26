let date;
let description;
let amount;
let month;
let year;

function addExpense(){
    date = document.getElementById('date').value;
    description = document.getElementById('description').value;
    amount = document.getElementById('amount').value;
    const sp = date.split('-');
    year = sp[0];
    month = sp[1];

    if(amount !== '' || description !== '' || date != ''){
        firebase.database().ref(`expenses/${year}/${month}`).push({
            date: date,
            description: description,
            amount: amount,
        }).then(() => {
            updateMonthly();
            alert('Add Success');
            location.reload();
        });
    }else{
        alert('please do not empty the fill');
    }
}

function updateMonthly(){
    
}

function clearMonthly(){
    let str = '';
    
    for(let i=1; i<13; i++){
        
        if(i > 9) str = i;
        else str = '0' + i;

        firebase.database().ref(`monthly/${str}`).set({
            amount: '0'
        });

        str = '';
    }
}

let loca = window.location.href;

if(loca.includes('index')){
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
}
