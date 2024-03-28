const express = require("express");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const connectToDb = require("./models/db");
const Company = require('./models/companymodule')
const nodemailer = require('nodemailer');
const User = require('./models/usermodule')
const Website = require('./models/websitemodule')
const fetchUser = require('./models/middleware/auth')
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'arielle72@ethereal.email',
    pass: '2W2tsErBGg9ewqHvwP'
  }
});

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(4000, () => {
  console.log("connected to server")
})

app.post('/dns', async (req, res) => {
  try {
    const { CompanyName, Position, Image } = req.body;

    // Create a new instance of the UserModel
    const user = new Company({
      CompanyName: CompanyName,
      Position: Position,
      Image: Image,
      User:req.user.id
    });

    const savedUser = await user.save();

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)
app.get('/show', async (req, res) => {

  const user1 = await Company.find();
  // {User:req.user.id}
  res.send(user1);

})
app.get('/show/:id', async (req, res) => {

  const ans = req.params.id;
  const user1 = await Company.find({ CompanyName: ans });
  res.send(user1);

})
app.get('/filter/:id/:order_id', async (req, res) => {
  try {
    const ans = req.params.id;
    const order = req.params.order_id
    const sortQuery = {};
    sortQuery[ans] = parseInt(order);
    const user1 = await Company.find().sort(sortQuery);
    res.json(user1);
  }

  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }
})


app.delete('/show/:id', async (req, res) => {

  try {
    const item = req.params.id;
    console.log(item)
    await Company.findByIdAndDelete(item);
    res.json({ message: 'User deleted successfully', result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)
app.delete('/show', async (req, res) => {

  try {
    await Company.deleteMany({});
    res.json({ message: 'User deleted successfully', result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)

app.post('/send-email', async (req, res) => {
  try {

    const data = req.body.data;

    const mailOptions = {
      from: 'pujarsudarshan@gmail.com',
      to: 'pujarsudarshan@gmail.com',
      subject: 'Data from your application',
      text: data,

    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Remove the temporary file
    // fs.unlinkSync(tempFilePath);

    res.json({ message: 'Email sent successfully', data: 'email check madu' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/update', async (req, res) => {

  try {
    const { name, position, image, status, date } = req.body;

    const id = req.query.id;

    const result = await Company.findByIdAndUpdate(id, { $set: { CompanyName: name, Position: position, Image: image, Status: status, Date: date } })


    res.json({ message: 'User added successfully', user: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)

app.post('/signin', async (req, res) => {
  try {
    
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const secpassword = bcrypt.hashSync(password, salt);

    const user = new User({
      Name: name,
      Email: email,
      Password: secpassword
    });
    const payload = {
      user: {
        id: user.id
      }
    };
    
    const savedUser = await user.save();
    const jwt_secretkey = "sudarshan"; 

    const data = jwt.sign(payload, jwt_secretkey);

    res.json(data);

    // res.redirect("/home");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }
  
})
app.post('/login', async (req, res) => {
  try {
    const jwt_secretkey = "sudarshan"; 
    const { email, password } = req.body;

    
    const user = await User.findOne({ Email: email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const data = jwt.sign(payload, jwt_secretkey);
   
    res.json(data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

})
app.post('/website', async (req, res) => {
  try {
    const { WebsiteName, Image } = req.body;

    // Create a new instance of the UserModel
    const user = new Website({
      WebsiteName: WebsiteName,
      Image: Image
    });

    const savedUser = await user.save();

   res.json(savedUser)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)
app.get('/website', async (req, res) => {
  try {

    const savedUser = await Website.find();

    res.json(savedUser)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)
app.get('/showWebsite/:id', async (req, res) => {
  try {
    const name = req.params.id;
    const savedUser = await Company.find({Website:name});

    res.json(savedUser)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)
app.put('/showWebsite', async (req, res) => {
  try {
    const {updateIndex,value} = req.body;
    const savedUser = await Company.findByIdAndUpdate(updateIndex,{$set: {Website:value}});

    res.json(savedUser)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'bere kelsa nodko' });
  }

}
)
connectToDb();