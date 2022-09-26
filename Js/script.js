window.onload = function () {
    let body = document.getElementsByTagName("body")[0];
    let main = document.getElementById("main");
    url = "https://rafaelescalfoni.github.io/desenv_web/filmes.json";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let filmesSeries = JSON.parse(this.responseText);
            for (filmeSerie of filmesSeries)
            {
                main.appendChild(montaDiv(filmeSerie, filmesSeries));
            }
        body.appendChild(main);
        }
    }
    xhttp.open("GET", url);
    xhttp.send();
}

function montaDiv (filmes, filmesSeries){
    let divFilme = document.createElement("div");
    divFilme.classList.add("filme");

    let titulo = document.createElement("h2");
    let tituloText = document.createTextNode(filmes.titulo);
    titulo.appendChild(tituloText);
    divFilme.appendChild(titulo);

    let figura = document.createElement("img");
    figura.src = filmes.figura;
    divFilme.appendChild(figura);

    let classificacao = document.createElement("div");
    classificacao.classList.add("classificacao");
    if (filmes.classificacao>0)
    {
    let classificacaoTexto = document.createTextNode(filmes.classificacao);
    classificacao.appendChild(classificacaoTexto);
    }
    else{
        let classificacaoTexto = document.createTextNode("Livre");
        classificacao.appendChild(classificacaoTexto);
    }

    if(filmes.classificacao == 18)
    {
        classificacao.style.backgroundColor = '#000000';
    }
    else if(filmes.classificacao == 16)
    {
        classificacao.style.backgroundColor = '#ff0000';
    }
    else if(filmes.classificacao == 14)
    {
        classificacao.style.backgroundColor = '#ffa500';
    }
    else if(filmes.classificacao == 12)
    {
        classificacao.style.backgroundColor = '#e6e600';
    }
    else if(filmes.classificacao == 10)
    {
        classificacao.style.backgroundColor = '#0099ff';
    }
    else{
        classificacao.style.backgroundColor = '#33cc33';
    }
    divFilme.appendChild(classificacao);


    let generos = document.createElement("p");
    let i = 0;
    for (genero of filmes.generos)
    {
        if(i == filmes.generos.length - 1)
        {
            let gen = document.createTextNode(`${genero}.`);
            generos.appendChild(gen);
        }
        else{
        let gen = document.createTextNode(`${genero}, `);
        generos.appendChild(gen);
        }
        i++;
    }
    divFilme.appendChild(generos);

    let elenco = document.createElement("p");
     i = 0;
    for (ator of filmes.elenco)
    {
        if (i == 0)
        {
        let at = document.createTextNode(`Elenco: ${ator}, `);
        elenco.appendChild(at);
        }
        else if(i == filmes.elenco.length - 1)
        {
            let at = document.createTextNode(`${ator}.`);
            elenco.appendChild(at);
        }
        else{
        let at = document.createTextNode(`${ator}, `);
        elenco.appendChild(at);
        }
        i++;
    }
    divFilme.appendChild(elenco);

    let resumo = document.createElement("p");
    let resumoText = document.createTextNode(filmes.resumo);
    resumo.appendChild(resumoText);
    divFilme.appendChild(resumo);

    let opinioes = document.createElement("div");
    opinioes.classList.add("opinioes");
    let opinioesTitulo = document.createElement("h3");
    let opinioesTituloTexto = document.createTextNode("Opiniões");
    opinioesTitulo.appendChild(opinioesTituloTexto);
    opinioes.appendChild(opinioesTitulo);
    for (opiniao of filmes.opinioes){
        if (opiniao.rating == 5)
        {
            let stars = document.createElement("img");
            stars.src = "./Img/5estrelas.png";
            opinioes.appendChild(stars);
        }
        else if (opiniao.rating == 4)
        {
            let stars = document.createElement("img");
            stars.src = "./Img/4estrelas.png";
            opinioes.appendChild(stars);
        }
        else
        {
            let stars = document.createElement("img");
            stars.src = "./Img/3estrelas.png";
            opinioes.appendChild(stars);
        }
        let descricao = document.createElement("p");
        let descricaoTexto = document.createTextNode(opiniao.descricao);
        descricao.appendChild(descricaoTexto);
        opinioes.appendChild(descricao);
    }
    divFilme.appendChild(opinioes);

    let semelhantes = document.createElement("div");
    semelhantes.classList.add("semelhantes");
    let semelhantesTitulo = document.createElement("h3");
    if(filmes.titulosSemelhantes.length==0){
        let semelhantesTituloTexto = document.createTextNode("Não há títulos semelhantes");
        semelhantesTitulo.appendChild(semelhantesTituloTexto);
        semelhantes.appendChild(semelhantesTitulo);   
    }
    else{
    let semelhantesTituloTexto = document.createTextNode("Títulos semelhantes");
    semelhantesTitulo.appendChild(semelhantesTituloTexto);
    semelhantes.appendChild(semelhantesTitulo);
    for(titulo of filmes.titulosSemelhantes){
        let tituloFoto = document.createElement("img");
        tituloFoto.src = filmesSeries[titulo-1].figura;
        console.log(filmesSeries[titulo-1]);
        semelhantes.appendChild(tituloFoto);
    }
    }
    divFilme.appendChild(semelhantes);
    return (divFilme);
}
