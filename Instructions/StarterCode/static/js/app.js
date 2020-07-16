function getPlots(id){
// Read samples.json and extract data
d3.json("samples.json").then(selectdata =>{
//get top 10 sample values and otu labels   
    var sampleValues = selectdata.samples[0].sample_values.slice(0,10).reverse();
    var labels = selectdata.samples[0].otu_labels.slice(0,10);
 //get the top 10 otu ids
    var OTU_top = (selectdata.samples[0].otu_ids.slice(0,10)).reverse();
    var OTU_id = OTU_top.map(d => "OTU" +d);
 //get the top 10 labels
    var labels = selectdata.samples[0].otu_labels.slice(0,10);
 // create trace  
    var trace1 ={
        x: sampleValues,
        y: OTU_id,
        text: labels,
        marker: {color:'red'},
        type: "bar",
        orientation: "h",
    };
 //Create the data array for our plot
    var data1 = [trace1];
 //Define plot layout
    var layout1 = {
        title: "Top 10 OTU",
        xaxis: { title: "Value" },
        yaxis: { title: "OTU_id"},
        margin:{
            l:100,
            r:90,
            t:90,
            b:40
        }
      };
 //create the bar plot
 Plotly.newPlot("bar", data1, layout1);
 //create bubble chart
    var trace2 = {
        x: selectdata.samples[0].otu_ids,
        y: selectdata.samples[0].sample_values,
        mode:"markers",
        marker:{
        size: selectdata.samples[0].sample_values,
        color: selectdata.samples[0].otu_ids
     },
     text: selectdata.samples[0].otu_labels
 };
    var layout2={
        xaxis:{title:"OTU_ID"},
        height:600,
        width:800
 };
 //Creat data variable
    var data2 =[trace2];
 //create bubble Plot
Plotly.newPlot("bubble", data2, layout2)
});
}
function getDemoInfo(id) {
// read the json file 
d3.json("samples.json").then((data)=> {
// put the metadata info 
    var metadata = data.metadata;
// filter metadata info by id
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
// select demographic panel to put data
    var demographicInfo = d3.select("#sample-metadata");    
// empty the demographic info panel each time before getting new id info
    demographicInfo.html("");
// select demographic data data for the id and append the info to the panel
Object.entries(result).forEach((key) => {   
    demographicInfo.append("h6").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
 });
}
// create the function for the change event
function optionChanged(id){
    getPlots(id);
    getDemoInfo(id);
}
// create the function for the initial data rendering
function init() {
// select dropdown menu 
    var dropdown = d3.select("#selDataset");
// read the json file 
d3.json("samples.json").then((data)=> {
// get the id data to the dropdwown menu
    data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value");
    });
// call the functions to display the data and the plots to the page
    getPlots(data.names[0]);
    getDemoInfo(data.names[0]);
    });
}
init();


  

  
 
  