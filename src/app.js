const dotenv = require("dotenv");
const express= require("express");
const app = express();
const hbs = require("hbs");
const PORT =process.env.PORT || 3000;
dotenv.config({path:'../config.env'});
require("./db/conn")
const user= require("./models/usermessage");
const path = require("path");
//setting the path
const static_path= path.join(__dirname, "../public");
const template_path= path.join(__dirname,"../template/views")
const partial_path= path.join(__dirname,"../template/partials");

//middleware
app.use("/css", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.static(static_path));
app.set("views", template_path)
hbs.registerPartials(partial_path);
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");

//routing
app.get("/", (req, res) => {
    res.render("index");
   
});

app.get("/contact", (req, res) => {
    res.render("contact");

});
app.post("/contact",async(req,res)=>{
    try{
  
        const userData = new user(req.body);
        await userData.save();
        // res.status(201).render("index");
         res.redirect("/contact?success=true");
        



    }
    catch(error){
        res.status(500).send(error);
    }

});


app.listen(PORT, () => {
    console.log(`Server is running at port no. ${PORT}`);
})