module.exports = async ({core}, data) => {
  if(data.Reference)
      convertToArray({core}, data.Reference, null, null);

  let keys = Object.keys(data);
  keys.forEach(a =>{
    if(a.includes("Summary")){
      const suiteName = a.split("_")[1];
      const browser = a.split("_")[2];
      convertToArray({core}, data[a], suiteName, browser);
      const linkData = a.replaceAll("Summary", "Links");
      addLinks({core}, data[linkData]);
    }
  });
  
  await core.summary.write();
  
  if(data.Status != 'success')
    core.setFailed();
}

function addLinks({core}, data){
  console.log(data);
  if(!data)
     return;
  data = data.replaceAll('[', '');
  data = data.replaceAll('"', '');
  const array = data.split("],");
  for (i=0;i<array.length;i++) { 
    array[i] = array[i].replaceAll("]]", "");
    array[i] = array[i].split(",");
  }
    
  for (i=0;i<array.length;i++) { 
      core.summary.addLink(array[i][0], array[i][1]);
  }
  
}

function convertToArray({core}, data, suiteName, browser){
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
    
  core.summary.addHeading(header,3).addTable(array);
}
