
import { Pool, Client, PoolClient } from "pg";
export var getAllStudents = async function(pool:Pool){
    type Resp = {
        data? : any,
        error :boolean,
        message  : string
    }
    return new Promise((resolve, reject) => {
        let resp : Resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        pool.query('SELECT name,email,phone,avatar,enrollnumber,dateofadmission FROM "student" ', (error, results) => {
           
            if(!error && !results.rows[0])
            {
                resp = {
                    error: true,
                    message: "No student available"
                }
                reject(resp)
                return;
            }
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else {

                 var student_list = []
                for(let i=0;i<results.rows.length;i++)
                {
                   const res_obj = {
                            name :  results.rows[i].name,
                            email :  results.rows[i].email,
                            phone :  results.rows[i].phone,
                            avatar :  results.rows[i].avatar,
                            enrollnumber :  results.rows[i].enrollnumber,
                            dateofadmission :  results.rows[i].dateofadmission
                    }
                   
                    student_list.push(res_obj)
                }
                
                resp = {   
                    data : student_list,
                    error: false,
                    message: "Student list fetched"
                }
            }

            resolve(resp)
        })
    });
}


type User = {
    name : string,
    phone : string,
    email : string,
    enrollNumber? :string,
    dateOfAdmission : string
}

export var addStudent = async function(pool:Pool,user:User){
    console.log(user)
    const  avatarNumber : number = Math.floor(Math.random() * 10);
    const avatarURL : string = `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${avatarNumber}.png`

    type Resp = {
        data? : any,
        error :boolean,
        message  : string
    }
    return new Promise((resolve, reject) => {
        let resp : Resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        pool.query("INSERT INTO student (Name, Email, Phone,Enrollnumber,DateOfAdmission,avatar) VALUES ($1, $2, $3, $4,$5,$6)",[user.name,user.email,user.phone,user.enrollNumber,user.dateOfAdmission,avatarURL], (error, results) => {
           
           
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else{
                resp = {   
                    data : results.rows[0],
                    error: false,
                    message: "Student added successfully"
                }
            }

            resolve(resp)
        })
    });
}

export var editStudent = async function(pool:Pool,user:User){
    console.log(user)

    type Resp = {
        data? : any,
        error :boolean,
        message  : string
    }
    return new Promise((resolve, reject) => {
        let resp : Resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        pool.query("UPDATE student SET  name = $1, email = $2,dateofadmission =$3 where phone = $4",[user.name,user.email,user.dateOfAdmission,user.phone], (error, results) => {
           
           
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else{
                resp = {   
                    data : results.rows[0],
                    error: false,
                    message: "Student edited successfully"
                }
            }

            resolve(resp)
        })
    });
}

export var deleteStudent = async function(pool:Pool,name:string){
    console.log(name)
    type Resp = {
        data? : any,
        error :boolean,
        message  : string
    }
    return new Promise((resolve, reject) => {
        let resp : Resp = {
            data: undefined,
            error: true,
            message: "Something went wrong"
        }

        pool.query('DELETE FROM student  WHERE name=$1',[name], (error, results) => {
           
           
            if (error) {
                resp = {
                    error: true,
                    message: error.message
                }
                reject(resp)
            } else{
                resp = {   
                    data : results,
                    error: false,
                    message: "Student deleted successfully"
                }
            }

            resolve(resp)
        })
    });
}