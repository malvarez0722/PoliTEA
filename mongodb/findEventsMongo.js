// function main(oArgs){
var mongoose = require('mongoose');
const uri = "mongodb+srv://neeti:fundofun@cluster0-iqc07.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log("CONNECTION ERROR"));

console.log('DB Connected!'); 

const Schema = mongoose.Schema;
const Event = new Schema({
  url: String,
  id: String,
  city_name: String,
  country_name: String,
  region_name: String,
  start_time: String,
  description: String,
  title: String,
  venue_address: String,
  stop_time: String,
  venue_name: String
  
});

var event = mongoose.model('event', Event);
var oArgs = {
  'city_name': 'Chicago'
};
event.find(oArgs , (err, result) => {
  if (err) {
      localStorage.setItem("eventObj", "ERROR FINDING");
      console.log(err);
  } else {
      console.log(result);
      var sendobj = JSON.stringify(result);
      localStorage.setItem("eventObj", "hey" );
      mongoose.connection.close()

  }
});

// }
// var oArgs = {
//   'city_name': 'Chicago'
// };
// main(oArgs);

