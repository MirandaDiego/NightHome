import { Request, Response } from "express";
import { Sede, Classe, Puta, Puteiro, User } from '../models/Girls';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();


export const home = (req:Request, res:Response)=>{
    res.render('pages/home');
   
}
export const cadastroUser = (req:Request, res:Response)=>{
    res.render('pages/comeco')
}
export const page = (req:Request, res:Response)=>{
    res.render('pages/page',{
       
        banner: {
            title: 'Damas da noite',
            background: 'menu.jpeg'
        }
    })
}
export const ok = (req:Request, res:Response)=>{
    res.render('pages/cadastro')
}

export const register = async(req:Request, res:Response)=>{

    if(req.body.nome && req.body.email && req.body.password){

        let { nome, email, password } = req.body;
        let hasUser = await User.findOne({where: { email }})
        if(!hasUser) {
            let newUser = await User.create({ nome, email, password})
            
           res.render('pages/cadastro');
        }else{
            res.json({ error: 'E-mail já existe'})
        }
    }
    //res.json({error: "E-mail e/ou senha não enviados"})
}


export const login = async (req:Request, res:Response)=>{
    console.log(req.body)
    if(req.body.email && req.body.password){
        let email: string = req.body.email;
        let password:string = req.body.password;

        let user = await User.findOne({
            where: { email, password}
        });
   
        if(user){
            const token =JWT.sign(
                { id: user.id, email: user.email},
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '1h'}
            );
               res.render('pages/administrador')
                //res.json(token)
            
           
            
            return;
        }
    }
    res.json({status:false});
}

export const ADM = (req:Request, res:Response)=>{
    res.render('pages/administrador')

}
export const entrar = (req:Request, res:Response)=>{
    res.render('pages/comeco2')
}















//--------------
export const puteiros = async(req: Request, res:Response)=>{
    const list = await Puteiro.findAll()
    res.json({list})
}
export const registroPuteiro = async(req:Request, res:Response)=>{
    if(req.body.id_sede){
        let newPuteiro = await Puteiro.create({
            id_sede: req.body.id_sede,
            aberto: req.body.aberto,
            id_puta: req.body.id_puta
        })
        newPuteiro.save()
        res.status(201).json({ item: newPuteiro})
    }else{
        res.json({error: 'Casa noturna não cadastrada.'})
    }
};
export const editPuteiro = async(req:Request, res:Response)=>{
    const id = req.params.id
    let puteiro = await Puteiro.findByPk(id);
    if(puteiro){
        if(req.body.id_sede){
            puteiro.id_sede = req.body.id_sede;
        }
        if(req.body.aberto){
            puteiro.aberto = req.body.aberto;
        }
        if(req.body.id_puta){
            puteiro.id_puta = req.body.id_puta;
        }
    }else{
        res.json({error: 'Casa noturna não encontrada.'})
    }

};
export const deletPuteiro = async(req: Request, res: Response)=>{
    let id = req.params.id;
    await Puteiro.destroy({where: {id}})
    res.json({})
}

export const sedes = async(req: Request, res:Response)=>{
    const list = await Sede.findAll();
    res.json({list})
}
export const registroSede = async(req:Request, res:Response)=>{
    if(req.body.bairro){
        let newSede = await Sede.create({
            bairro: req.body.bairro
        })
        newSede.save();
        res.status(201).json({ item: newSede})
    }else{
        res.json({error: 'sede não cadastrada!'})
    }
}
export const deletSede = async(req:Request, res:Response)=>{
    let id = req.params.id
    await Sede.destroy({where: {id}})
    res.json({})
}

export const classes =async (req:Request, res:Response) => {
    
    const list = await Classe.findAll()
    res.json({list})
}



export const putas = async (req:Request, res:Response)=>{
    let list = Puta.getAttributes()
    res.render('pages/damas',{
       
        banner: {
            title: 'Damas da noite',
            background: 'menu.jpeg'
        },
        list
    }
    )
}




export const puta = async (req:Request, res:Response)=>{
   
}
export const registroPuta =async(req:Request, res:Response)=>{
    if(req.body.nome){
        let newPuta = await Puta.create({
            nome: req.body.nome,
            idade: req.body.idade,
            id_classe: req.body.classe
        })
        newPuta.save();
    }else{
        res.json({error:"Dama não cadastrada"})
    }
}
export const deletPuta = async(req:Request, res:Response)=>{
    let id = req.params.id
    await Puta.destroy({where:{id}});
    res.json({})
}

