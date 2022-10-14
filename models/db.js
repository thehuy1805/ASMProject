const mongoose = require('mongoose');
//const url = "mongodb://localhost:27017/EmployeeDB";
//const url = "mongodb+srv://tmtuan:**************@cluster0.zfovn.mongodb.net/test"
const url = "mongodb+srv://my:admin@123@cluster0.e0p10pr.mongodb.net/test"
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("MongoDB Connection Succeeded"); } else {
        console.log("An Error Occured");
    }
})

require('./employee.model');
