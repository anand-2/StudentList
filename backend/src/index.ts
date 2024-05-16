import express,{Application,Request,Response} from "express";

import { Pool, Client } from "pg";
require("dotenv").config();
import { getAllStudents,deleteStudent,addStudent,editStudent } from "./queries";

const app:Application = express()
var cors = require('cors')

app.use(express.json());

app.use(express.urlencoded({
    extended: true
  }))
app.use(cors());

const port:number = 5000;
const pool = new Pool({
    //  user: "studentlist_pob9_user",
    // host: "dpg-cp28upa1hbls739cn150-a.oregon-postgres.render.com",    
    // database: "studentlist_pob9",
    // password: "16UYgQju4PEK3DPGwJuxhMV0DTvQ69qk",
    // port: parseInt(process.env.DB_PORT || '5432')
   
    connectionString: "postgres://studentlist_pob9_user:16UYgQju4PEK3DPGwJuxhMV0DTvQ69qk@dpg-cp28upa1hbls739cn150-a.oregon-postgres.render.com/studentlist_pob9?ssl=true"
})


app.get("/student", async (req: Request, res: Response) => {
    try {
        const data = await getAllStudents(pool);
        res.send(data);        
    } catch (error : any) {
        res.status(500).send(error.message);
    }
});


app.post("/addStudent", async (req: Request, res: Response) => {
        type User = {
            name : string,
            phone : string,
            email : string,
            dateOfAdmission : string
        }
       const user : User =  await req.body;

    try {
        const data = await addStudent(pool,user);
        res.send(data);        
    } catch (error : any) {
        res.status(500).send(error.message);
    }
});

app.post("/editStudent", async (req: Request, res: Response) => {
    type User = {
        name : string,
        phone : string,
        email : string,
        dateOfAdmission : string
    }
   const user : User =  await req.body;

try {
    const data = await editStudent(pool,user);
    res.send(data);        
} catch (error : any) {
    res.status(500).send(error.message);
}
});


app.post("/deleteStudent", async (req: Request, res: Response) => {
       const studentName =  await req.body.name;

    try {
        const data = await deleteStudent(pool,studentName);
        res.send(data);        
    } catch (error : any) {
        res.status(500).send(error.message);
    }
});



app.listen(port , ()=>{
    console.log(`Api started at port ${port}`)
})