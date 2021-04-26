const mysql=require('mysql');
let instance=null;

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test",
    port:"3306"
});

class DbService 
{
    static getDbServiceInstance() 
    {
        return instance ? instance : new DbService();
    }

    async insert(title,category,content) 
    {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO demo (title,Category,discription) VALUES (?,?,?);";

                con.query(query, [title,category,content] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    else
                    {
                        resolve(result.insertId);
                    } 
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM demo order by Id DESC;";

                con.query(query, (err, results) => {
                    if (err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve(results);
                    }
                    
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM demo where Id=?;";

                con.query(query,[id], (err, results) => {
                    if (err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve(results);
                    }
                    
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getByCategory(category) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM demo where Category=?;";
                
                con.query(query,[category], (err, results) => {
                    if (err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve(results);
                    }
                    
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, title,content) {
        try 
        { 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE demo SET title = ?, discription = ? WHERE Id = ?";
    
                con.query(query, [title,content, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            //console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteRowById(id) {
        try 
        {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM demo WHERE id = ?";
    
                con.query(query, [id] , (err, result) => {
                    if (err)
                    {
                        reject(new Error(err.message));
                    }
                    else
                    {
                        resolve(result.affectedRows);
                    }
                    
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = DbService;