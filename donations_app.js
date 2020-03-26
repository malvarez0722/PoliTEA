const politicians = require('./RestAPI/server')
const uri = "mongodb+srv://megan:123@clustertest-wsnll.mongodb.net/test?retryWrites=true&w=majority"
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('https');


////////////////////////////////////////////////////////////////////////////////
// Connect to MongoDB database
////////////////////////////////////////////////////////////////////////////////

function connectDb(callback) {
  console.log('start connectdb')

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', () => console.log("Connected!"), function() {
  //       if (callback) callback()
  //       else console.log('get crp not a function')
  //   })

  db.once('open', function() {
      console.log('Connected')
      if (callback) callback()
  })
}

////////////////////////////////////////////////////////////////////////////////
// get array of crp_ids in database
////////////////////////////////////////////////////////////////////////////////
var crp_array = []

function getCrp(callback) {
  // crp_array = []
  console.log('start getCrp')

  politicians.find({}, 'crp_id', function (err, docs) {
    if (err) return err

    docs.forEach(docs => {
        if (docs.crp_id!=null)
          crp_array.push(docs.crp_id)
    })
    console.log('array is ' + crp_array)
    if (callback) callback()
    // else console.log("callback error in getCrp")
    // console.log('array is ' + crp_array)
  })

}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Retrieve contribution data from OpenSecrets API and update database
////////////////////////////////////////////////////////////////////////////////
function populateDonors() {
  // crp_array = ['N00028152', 'N00035451', 'badid']
  console.log('In populateDonors, array is ' + crp_array)
  var method = 'candContrib'
  var year = '2020'
  var cid
  var url

  for(var i = 0; i < crp_array.length; i++) {
      cid = crp_array[i]
      console.log('cid is '+ cid)
      url = `https://www.opensecrets.org/api/?method=${method}&year=${year}&cid=${cid}&output=json&apikey=52f80155d9bb4bd043b2ef5c7e05e9cc`
      console.log('get ' + url)
      https.get(url, (res) => {
        console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        if(res.statusCode=='200') {
            let result = '';
            res.on('data', (d) => {
              // process.stdout.write(d);
              result += d;
            });

            res.on('end', () =>  {
              result = JSON.parse(result)
              result = JSON.stringify(result)
              result = result.replace(/@/g, "_")
              result = JSON.parse(result)
              // console.log(result)

              let cid = result.response.contributors._attributes.cid
              var cycle = result.response.contributors._attributes.cycle
              // console.log(cid)
              console.log('cycle is ' + cycle)
              console.log('cid is ' + cid)

              result.response.contributors.contributor.forEach(contributor => {
                  // console.log(contributor)
                  console.log('cid in for each loop ' + cid)

                  politicians.updateMany(
                    {'crp_id': cid},
                    {
                      "$push": {
                        "donors": {
                          "year": cycle,
                          "org_name": contributor._attributes.org_name,
                          "total": contributor._attributes.total,
                          "pacs": contributor._attributes.pacs,
                          "indivs": contributor._attributes.indivs
                        }, $sort: {"total":-1}
                      }
                    }, function() {
                        politicians.find({'crp_id': cid}, 'last_name donors', function (err, docs) {
                          if (err) return err
                          console.log('docs is ' + docs)
                        })
                    })
              }) // finished updating remote database
          }) //finished retrieving and updating data for current crp_id
      } //end of if statment (status code is 200)
      }).on('error', (e) => {
        console.error('GET error: ' + e);
      });
  } //end of for loop to update every crp_id
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// connectDb(getCrp(populateDonors()))
// getCrp()
connectDb(populateDonors())
// populateDonors()


// const contributionSchema = new mongoose.Schema({
//     crp_id: String,
//     cycle: String,
//     contributors: [{
//       org_name: String,
//       total: String,
//       pacs: String,
//       indivs: String
//     }]
// });
//
// const Contributions = mongoose.model('Contributions', contributionSchema);

// let c = new Contributions({
//     crp_id: 'N0001',
//     cycle: '2020',
//     contributors: [{org_name: "FB", total: '1', pacs: '2', indivs: '3'}, {org_name: 'Google', total: '4', pacs: '5', indivs: '6'}]
// })
// c.save();
//
// politicians.updateOne({crp_id: 'N0001'}, {
//     net_worth: '4',
// }, function(err, numberAffected, rawResponse) {
//     console.log(err);
// })

// var query = politicians.findOne({'crp_id': 'N0003'})
// query.select('donors')
//
// query.exec(function (err, person) {
//   if (err) console.log('error is ' + err);
//   console.log(person);
// });


// politicians.updateOne({last_name: 'Amash'}, {
//     first_name: 'Test',
// }, function(err, numberAffected, rawResponse) {
//     console.log(err);
// })


// var query = politicians.findOne({'crp_id': cid})
// query.select('donors')
//
// query.exec(function (err, person) {
//   if (err) console.log('error is ' + err);
//   console.log(person);
// });

// var query = politicians.find({'last_name': 'Amash'})
// // query.select('donors')
//
// query.exec(function (err, person) {
//   if (err) console.log('error is ' + err);
//   console.log(person);
// });


// var query = politicians.find({id: 'A000374'})
// query.select('donors')
//
// query.exec(function (err, person) {
//   if (err) console.log('error is ' + err);
//   console.log(person);
// });



// var query = politicians.find({})
// query.select('crp_id')
//
// query.exec(function (err, person) {
//   if (err) console.log('error is ' + err);
//   console.log(person);
// });

//
// politicians.find({}, 'crp_id', function (err, person) {
//   if (err) return err;
//
//   console.log(person);
// });
