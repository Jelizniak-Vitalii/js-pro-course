
async function Getdata(url){
    const response =await fetch(`https://jsonplaceholder.typicode.com/${url}`);
    const data = await response.json();
    return data
  }

export default Getdata;