const allPlayer = () => {

    document.getElementById('player-container').innerHTML = '';
    const searchValue = document.getElementById('search-box').value;
    document.getElementById('search-box').value = '';
    
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`; 

 

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.player === null){
    const parent = document.getElementById('player-container');
            
           
            const p = document.createElement('p');
            p.innerText = "not available";
            p.classList.add('text-danger');
            parent.appendChild(p);
             
        }else{
    
        showPlayerDetails(data.player);
    }
});
};

const showPlayerDetails = (players) => {
    const parent = document.getElementById('player-container');

    for(let player of players){
        const div = document.createElement('div');
    
        div.innerHTML = `
        <div class="card border p-5 mt-3">
        <div class="pro-pic">
            <img class="img-fluid w-50" src="${player.strThumb}" alt="Image Not Available">
        </div>
        <h2> Name: ${player.strPlayer} </h2>
        <h5> Country: ${player.strNationality} </h5>
        <p></p>
        <div class="all-btn">
            <button onclick="deleteMe(event)" class="btn btn-danger">Delete</button>
            <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
        </div>
    
    </div>
        `;    
        parent.appendChild(div);
    }
}
const details = (id) => {

    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => setDetails(data.players[0]));
}

const setDetails = (info) => {

    console.log(info);
    document.getElementById('detail-container').innerHTML = `
    <div class="card border p-5">
    <div class="pro-pic">
        <img class="img-fluid w-50" src="${info.strThumb}" alt="image not available">
    </div>
    <h2> Name: ${info.strPlayer} </h2>
    <h5> Country: ${info.strNationality} </h5>
    <h5> Gender: ${info.strGender} </h5>
    <h5> Team: ${info.strTeam} </h5>
    <p>Description: ${info.strDescriptionEN} </p>
    </div>
    `;
}

const deleteMe = (event) => {
    (event.target.parentNode.parentNode).style.display = 'none';
}
