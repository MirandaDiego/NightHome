import { Request, Response, NextFunction } from "express"
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../models/Girls";


dotenv.config(); //para ter acesso as variaveis de ambiente

export const Auth = {
    private: async(req: Request, res: Response, next: NextFunction) => {
        let sucess = false; 


        //Fazer verificação de auth
        if(req.headers.authorization){

            const [autyType, token] = req.headers.authorization.split(' ')
            if(autyType === 'Bearer'){
                try{
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );
                    sucess = true;

                }catch(err){
                    
                }
               
            }
          
        /*    let hash:string = req.headers.authorization.substring(6); //BASIC -> pega depois de BASIC espaço
            // Para ver se esta pegando a msg codificada: console.log("HASH", hash)
            let decoded: string = Buffer.from(hash, 'base64').toString(); //decodificando
            let data:string[] = decoded.split(':');
            
            if(data.length === 2){
                let hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                });
                if(hasUser){
                    sucess = true
                }
            } */
        
        } 

        if(sucess){
            next()
        }else{
            res.status(403); // not authorized
            res.json({error: 'Não autorizado'})
        }
    }
}