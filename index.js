const express=require("express")
const hbs=require("hbs")
const path=require("path")
const bodyparser=require("body-parser")
const encoder=bodyparser.urlencoded()
const nodemailer=require("nodemailer")
const app=express()
const transporter=nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
tls:true,
auth:{
    user:"kunalmassy131@gmail.com",
   pass:"vlkrkugaxxkrhoci" 
}
})
app.set("view engine","hbs")
app.use(express.static("public"))
hbs.registerPartials(path.join(__dirname,"views/partials"))
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/service",(req,res)=>{
    res.render("service")
})
app.get("/contact",(req,res)=>{
    res.render("contact",{show:false})
})
app.post("/contact",encoder,(req,res)=>{
    let mailOptions={
        from:"kunalmassy131@gmail.com",
        to:"req.body.email",
        subject:"confirmation:Industro",
        text:`
        Hello${req.body.name}
        your query Recieved!!!
        Our team will contact you soon!!!
        Team Industro
        `
    }
transporter.sendMail(mailOptions,(error)=>{
    console.log(error)
})
mailOptions={
    from:"kunalmassy131@gmail.com",
    to:"kunalmassy131@gmail.com",
    subject:"confirmation:Industro",
    html:`
    <table>
    <tbody>
    <tr>
    <th>Name</th>
    <td>${req.body.name}</td>
    </tr>
    <tr>
    <th>Email</th>
    <td>${req.body.email}</td>
    </tr>

    <tr>
    <th>Phone</th>
    <td>${req.body.phone}</td>

    </tr><th>Name</th>
    <td>${req.body.subject}</td>
    </tr>
    <th>Message</th>
    <td>${req.body.message}</td>
    </tr>
    </tbody>
    </table>
    `
}
transporter.sendMail(mailOptions,(error)=>{
console.log(error)
})
    res.render("contact",{show:true})
})

app.get("/feature",(req,res)=>{
    res.render("feature")
})
app.get("/team",(req,res)=>{
    res.render("team")
})
app.get("/testimonial",(req,res)=>{
    res.render("testimonial")
})
app.get("/*",(req,res)=>{
    res.render("404")
})



app.listen(8000,()=>console.log("Server is Running at http://localhost:8000" ))