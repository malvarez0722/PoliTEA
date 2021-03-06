const politicians = require('../model/post_model');
const events = require('../model/event_model');
const bills = require('../model/bills_model');
const committees = require('../model/committees_model');

// const model = require('../model/post_model');

exports.showIndex = (req, res, next) => {
       res.send('ruunning node api');
}

/////////////////////// Aidan ///////////////////////////////////////

/* exports.showAllBills = (req, res, next) => {

  //bills.find({published: true}, {sort: {'date': -1}, limit: 5}, function(err, docs) {
  bills.find(function(err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Bills not found')
    }

    let billsArray = [];

    docs.forEach((bill) => {

      billsArray.push({
          number: bill.number,
          title: bill.title,
          short_title: bill.short_title,
          introduced_date: bill.introduced_date,
          sponsor_title: bill.sponsor_title,
          sponsor_id: bill.sponsor_id,
          sponsor_name: bill.sponsor_name,
          sponsor_state: bill.sponsor_state,
          sponsor_party: bill.sponsor_party,
          primary_subject: bill.primary_subject,
          summary: bill.summary,
          congressdotgov_url: bill.congressdotgov_url
        });
    })

    res.status(200).json(billsArray)
  })//.limit(20);
} */

exports.showAllBills = (req, res, next) => {

  //bills.find({published: true}, {sort: {'date': -1}, limit: 5}, function(err, docs) {
  bills.find(function(err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Bills not found')
    }

    let billsArray = [];

    docs.forEach((bill) => {

      billsArray.push({
          number: bill.number,
          title: bill.title,
          short_title: bill.short_title,
          introduced_date: bill.introduced_date,
          sponsor_title: bill.sponsor_title,
          sponsor_id: bill.sponsor_id,
          sponsor_name: bill.sponsor_name,
          sponsor_state: bill.sponsor_state,
          sponsor_party: bill.sponsor_party,
          primary_subject: bill.primary_subject,
          summary: bill.summary,
          congressdotgov_url: bill.congressdotgov_url
        });
    })

    res.status(200).json(billsArray)
  //}).limit(20);
  })
}


exports.showBillsByTopic = (req, res, next) => {

  let billsArray = [];


  bills.find({primary_subject: req.params.id},  function (err, docs) {
      if (err || docs.length==0) {
        return res.status(404).send('Bills not found')
      }


    docs.forEach((bill) => {
      billsArray.push({
          number: bill.number,
          title: bill.title,
          bill_id: bill.bill_id,
          short_title: bill.short_title,
          introduced_date: bill.introduced_date,
          sponsor_title: bill.sponsor_title,
          sponsor_id: bill.sponsor_id,
          sponsor_name: bill.sponsor_name,
          sponsor_state: bill.sponsor_state,
          sponsor_party: bill.sponsor_party,
          primary_subject: bill.primary_subject,
          summary: bill.summary,
          congressdotgov_url: bill.congressdotgov_url
        });
    })

    res.status(200).json(billsArray)
  })
}


exports.showBillByID = (req, res, next) => {
  // bills.find({"bill_id": {$regex:"^${req.params.bill_id"}},  function (err, docs) {
    
  bills.find({bill_id: req.params.id},  function (err, docs) {
    console.log("THIS IS ID: "+ req.params.id)

      if (err || docs.length==0) {
        return res.status(404).send('Bill not found' + req.params.id)
      }
    res.status(200).json(docs)
  })
}

exports.showBillByKeyword = (req, res, next) => {
  // bills.find({"bill_id": {$regex:"^${req.params.bill_id"}},  function (err, docs) {
    
  bills.find({ $text: { $search:  "test"} },  function (err, docs) {
    console.log("THIS IS ID: "+ req.params.id)

      if (err || docs.length==0) {
        return res.status(404).send('Bill not found' + req.params.id)
      }
    res.status(200).json(docs)
  })
}




/////////////////////// Manolo ///////////////////////////////////////

exports.showVotes = (req, res, next) => {
  politicians.find({"id": req.params.id}, 'votes',  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('votes not found')
    }
    res.status(200).json(docs)
  })
}

exports.showBillTotal = (req, res, next) => {
  politicians.find({"id": req.params.id}, 'votes.total',  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('bill total not found')
    }
    res.status(200).json(docs)
  })
}

exports.showAllSenators = (req, res, next) => {

  let members = [];
  politicians.find({short_title: 'Sen.'},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Politician not found')
    }

    docs.forEach((senator) => {
      members.push({
        id: senator.id,
        title: senator.title,
        first_name: senator.first_name,
        middle_name: senator.middle_name,
        last_name: senator.last_name,
        gender: senator.gender,
        party: senator.party,
        date_of_birth: senator.date_of_birth,
        state: senator.state,
        district: senator.district,
        url: senator.url,
        twitter_account: senator.twitter_account,
        facebook_account: senator.facebook_account,
        youtube_account: senator.youtube_account,
        seniority: senator.seniority,
        next_election: senator.next_election,
        total_votes: senator.total_votes,
        missed_votes: senator.missed_votes,
        total_present: senator.total_present,
        last_updated: senator.last_updated,
        office: senator.office,
        phone: senator.phone,
        fax: senator.fax,
        missed_votes_pct: senator.missed_votes_pct,
        votes_with_party_pct: senator.votes_with_party_pct,
        votes_against_party_pct: senator.votes_against_party_pct
      });
    })

    res.status(200).json(members)
  })
}

exports.showAllCongressman = (req, res, next) => {

  let members = [];
  politicians.find({short_title: 'Rep.'},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Politician not found')
    }

    docs.forEach((congressman) => {
      members.push({
        id: congressman.id,
        title: congressman.title,
        first_name: congressman.first_name,
        middle_name: congressman.middle_name,
        last_name: congressman.last_name,
        gender: congressman.gender,
        party: congressman.party,
        date_of_birth: congressman.date_of_birth,
        state: congressman.state,
        district: congressman.district,
        url: congressman.url,
        twitter_account: congressman.twitter_account,
        facebook_account: congressman.facebook_account,
        youtube_account: congressman.youtube_account,
        seniority: congressman.seniority,
        next_election: congressman.next_election,
        total_votes: congressman.total_votes,
        missed_votes: congressman.missed_votes,
        total_present: congressman.total_present,
        last_updated: congressman.last_updated,
        office: congressman.office,
        phone: congressman.phone,
        fax: congressman.fax,
        missed_votes_pct: congressman.missed_votes_pct,
        votes_with_party_pct: congressman.votes_with_party_pct,
        votes_against_party_pct: congressman.votes_against_party_pct
      });
    })

    res.status(200).json(members)
  })
}

//////////////////// Megan //////////////////////////////////////

exports.showPolitician = (req, res, next) => {
  politicians.find({"id": req.params.id},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Politician not found')
    }
    res.status(200).json(docs)
  })
}

exports.showOnePolitician = (req, res, next) => {
  let name=(req.params.name).split(" ")
  politicians.find({"first_name": name[0],"last_name": name[(name.length)-1],"state": req.params.state},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Politician not found')
    }
    res.status(200).json(docs)
  })
}

exports.getOnePoliticanID = (req, res, next) => {
  let name=(req.params.name).split(" ")
  politicians.findOne({"first_name": name[0],"last_name": name[(name.length)-1],"state": req.params.state}, function (err, docs) {
    if (err  || docs==null ) {
      res.status(404).send('Politician not found')
      return;
    }else{
      res.status(200).send(docs.id)
    }
  })
}

exports.showDonors = (req, res, next) => {
  politicians.find({"id": req.params.id}, 'donors', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Donors for this politician not found')
    }
    res.status(200).json(docs)
  })
}

exports.showPoliticianIndustries = (req, res, next) => {
  politicians.find({"id": req.params.id}, 'industries', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Industries for this politician not found')
    }
    res.status(200).json(docs)
  })
}

exports.showFinances = (req, res, next) => {
  politicians.find({"id": req.params.id}, 'finances', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Finances for this politician not found')
    }
    res.status(200).json(docs)
  })
}

exports.showAssets = (req, res, next) => {
  politicians.find({"id": req.params.id}, 'assets', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Assets for this politician not found')
    }
    res.status(200).json(docs)
  })
}

exports.showIndustries = (req, res, next) => {
  var industries = []
  var json_result = []
  committees.find({}, '_attributes', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Information for committee not found')
    }
    docs.forEach(docs => {
      if(!industries.includes(docs._attributes.industry + ": " + docs._attributes.industry_code)) {
        industries.push(docs._attributes.industry + ": " + docs._attributes.industry_code)
        json_result.push({
          industry: docs._attributes.industry,
          industry_code: docs._attributes.industry_code
        })
      }
    })
    res.status(200).json(json_result)
  })
}

exports.showContributorsByInd = (req, res, next) => {
  var members_cid = []
  var json_result = []
  committees.find({'_attributes.industry_code': req.params.id}, 'member', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Contributors for industry not found')
    }

    docs.forEach(doc => {
        members = doc.member
        members.forEach(member => {
          if(!members_cid.includes(member._attributes.cid)) {
            members_cid.push(member._attributes.cid);
            json_result.push({
              member_name: member._attributes.member_name,
              cid: member._attributes.cid,
              party: member._attributes.party,
              state: member._attributes.state,
              total: member._attributes.total,
              indivs: member._attributes.indivs,
              pacs: member._attributes.pacs
            })
          }
        })
    })
    res.status(200).json(json_result)

  })
}

exports.getIndCodeByIndName = (req, res, next) => {
  committees.find({'_attributes.industry': req.params.name}, '_attributes', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Industry code for industry not found')
    }
    res.status(200).json(docs[0]._attributes.industry_code)
  })
}

exports.showContributorsByIndComm = (req, res, next) => {
  committees.find({'_attributes.industry_code': req.params.id, '_attributes.committee_name':req.params.comm_id}, 'member', function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Contributors for industry in selected committee not found')
    }
    res.status(200).json(docs)
  })
}

exports.getPoliticianByCid = (req, res, next) => {
  let member = []
  politicians.find({"crp_id": req.params.cid},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Politician not found')
    }
    docs.forEach((congressman) => {
      member.push({
        id: congressman.id,
        title: congressman.title,
        first_name: congressman.first_name,
        middle_name: congressman.middle_name,
        last_name: congressman.last_name,
        gender: congressman.gender,
        party: congressman.party,
        date_of_birth: congressman.date_of_birth,
        state: congressman.state,
        district: congressman.district,
        url: congressman.url,
        twitter_account: congressman.twitter_account,
        facebook_account: congressman.facebook_account,
        youtube_account: congressman.youtube_account,
        seniority: congressman.seniority,
        next_election: congressman.next_election,
        total_votes: congressman.total_votes,
        missed_votes: congressman.missed_votes,
        total_present: congressman.total_present,
        last_updated: congressman.last_updated,
        office: congressman.office,
        phone: congressman.phone,
        fax: congressman.fax,
        missed_votes_pct: congressman.missed_votes_pct,
        votes_with_party_pct: congressman.votes_with_party_pct,
        votes_against_party_pct: congressman.votes_against_party_pct
      });
    })
    res.status(200).json(member)
  })
}

/////////////////////// Neeti ///////////////////////////////////////

exports.showEvent = (req, res, next) => {
  events.find({"_id": req.params.id},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('Event Not Found')
    }
    res.status(200).json(docs)
  })
}

exports.showZipCodeEvents = (req, res, next) => {
  events.find({"postal_code": req.params.id},  function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('No upcoming events found in zip code <strong>' + req.params.id + '</strong>')
    }
    res.status(200).json(docs)
  })
}

exports.showCityEvents = (req, res, next) => {
  let city = titleCase(req.params.id);
  events.find({"city_name": city}, function (err, docs) {
    if (err || docs.length==0) {
      return res.status(404).send('No upcoming events found in <strong>' + city + '</strong>');
    }
    res.status(200).json(docs)
  })
}

exports.showStateAbbrEvents = (req, res, next) => {
  let abbr = (req.params.id).toUpperCase();
  events.find({"region_abbr": abbr}, function (err, docs) {
      if (err || docs.length==0) {
        return res.status(404).send('No upcoming events found in <strong>' + abbr + '</strong>');
      }
      res.status(200).json(docs)
    })
  }

exports.showStateEvents = (req, res, next) => {
  let state = titleCase(req.params.id);
  let abbr = (req.params.id).toUpperCase();
  events.find({"region_name": state}, function (err, docs) {
    if (docs.length==0) {
      return res.status(303).send('Redirecting to showAbbr')
    } if (err){
      return res.status(404).send('No upcoming events found in <strong>' + state + '</strong>.')
    }
    res.status(200).json(docs)
  })
}

function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    sentence = sentence.join(" ");
 return sentence;
 }
