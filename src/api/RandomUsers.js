export async function getCardsInfo (numeroTarjetas){
    try{
        let response = await fetch(
          "https://randomuser.me/api/?results=" + numeroTarjetas )
        let json = await response.json();
        return json.results 
      } 
      catch (error) {
          console.log(error)
      }
}