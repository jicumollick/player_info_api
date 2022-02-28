

const allPlayer = () => {
    const searchValue = document.getElementById('search-box').value;
    
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`; 

    fetch(url)
    .then(res => res.json())
    .then(data => showPlayerDetails(data.player));
};

const showPlayerDetails = (players) => {
    const parent = document.getElementById('player-container');

    for(let player of players){
        const div = document.createElement('div');
    
        div.innerHTML = `
        <div class="card border p-5">
        <div class="pro-pic">
            <img class="img-fluid w-50" src="${player.strThumb}" alt="">
        </div>
        <h2> Name: ${player.strPlayer} </h2>
        <h5> Country: ${player.strNationality} </h5>
        <p></p>
        <div class="all-btn">
            <button class="btn btn-danger">Delete</button>
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

    document.getElementById('detail-container').innerHTML = `
    <div class="card border p-5">
    <div class="pro-pic">
        <img class="img-fluid w-50" src="${info.strThumb}" alt="">
    </div>
    <h2> Name: ${info.strPlayer} </h2>
    <h5> Country: ${info.strNationality} </h5>
    <p></p>

    </div>
    
    `;




}
