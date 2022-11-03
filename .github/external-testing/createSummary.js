module.exports = async ({core}, data) => {
  
    const keys = Object.keys(data);
    keys.forEach(async a =>{
      if(a.includes("Summary")){
        const suiteName = a.split("_")[1];
        const browser = a.split("_")[2];
        await convertToArray({core}, data[a], suiteName, browser);
      }
    });
    
    if(data.Reference)
      await convertToArray({core}, data.Reference, null, null);
    
    await core.summary.write();
  }
  
  async function convertToArray({core}, data, suiteName, browser){
    if(!data)
       return;
    
    data = data.replaceAll('[', '');
    data = data.replaceAll('"', '');
    const array = data.split("],");
    for (i=0;i<array.length;i++) { 
      array[i] = array[i].replaceAll("]]", "");
      array[i] = array[i].split(",");
    }
    
     const header = suiteName ? `${browser} - ${suiteName}` : "References";
      
    await core.summary
    .addHeading(header, 3)
    .addTable(array);
  }