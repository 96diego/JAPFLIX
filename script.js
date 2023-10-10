let cuerpo;
let peliculas;
const url = "https://japceibal.github.io/japflix_api/movies-data.json";
const btnBuscar = document.getElementById("btnBuscar");
const ulLista= document.getElementById("lista");
const titulo = document.getElementById("offcanvasTopLabel");
const divBody = document.getElementById("divBody")
const ulDesplegable = document.getElementById("ulDesplegable")
document.addEventListener("DOMContentLoaded",async()=>
{
    
    
   try 
   {
    const promesa = await fetch(url);
    peliculas = await promesa.json();
   }
   catch(error){console.error(error);};
   
   btnBuscar.addEventListener("click",() => 
   {
    let txtInput = document.getElementById("inputBuscar").value;
    

        if (txtInput == "") {
         alert("ingrese algo en el campo de busqueda");
        } else {
          cuerpo = peliculas.filter(
            (pelicula) =>
            pelicula.title.toLowerCase().includes(txtInput.toLowerCase()) ||
            pelicula.overview.toLowerCase().includes(txtInput.toLowerCase())||
            pelicula.tagline.toLowerCase().includes(txtInput.toLowerCase())||
            pelicula.genres.forEach(genero => {
                genero.name.toLowerCase().includes(txtInput.toLowerCase())
            })  
          );
        }
        cuerpo.forEach((peli)=>
        {
            const listItem = document.createElement("div")
            listItem.id = peli.id
            listItem.innerHTML+=`
                                <li data-bs-toggle="offcanvas" href="#offcanvasTop" role="button" aria-controls="offcanvasTop">
                                <h5 style="color: white">${peli.title}</h5>
                                <p style="color: grey ; font-style: italic ;    ">${peli.tagline}
                                <span style="float: right"> 
                                    <span class="fa fa-star ${peli.vote_average >= 1 && "checked"}"></span>
                                    <span class="fa fa-star ${peli.vote_average >= 3 && "checked"}"></span>
                                    <span class="fa fa-star ${peli.vote_average >= 5 && "checked"}"></span>
                                    <span class="fa fa-star ${peli.vote_average >= 7 && "checked"}"></span>
                                    <span class="fa fa-star ${peli.vote_average >= 9 && "checked"}"></span> 
                                </span>
                                </p>
                                 </li>
                                `;
            ulLista.appendChild(listItem);
            listItem.addEventListener("click", descripcion)
            function descripcion ()
            {
            let peliculaDeseada = peliculas.find(elemento => elemento.id==peli.id)
            titulo.innerHTML= peliculaDeseada.title
            divBody.innerHTML+=`<p>${peliculaDeseada.overview}</p>
                                `;
            peliculaDeseada.genres.forEach(nombre=>
                {
                    divBody.innerHTML+=nombre.name+" ";
                });
                ulDesplegable.innerHTML="";
                ulDesplegable.innerHTML+= `
                                            <li><p class="dropdown-item" href="#">Year: ${peli.release_date}</p></li>
                                            <li><p class="dropdown-item" href="#">Runtime: ${peli.runtime} mins</p></li>
                                            <li><p class="dropdown-item" href="#">Budget: $${peli.budget}</p></li>
                                            <li><p class="dropdown-item" href="#">Revenue: $${peli.revenue}</p></li>
                                         `;
            };
            
        });
   });
});







