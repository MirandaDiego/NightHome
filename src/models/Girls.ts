import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../instances/pg';
import { BIGINT } from 'sequelize';


export interface UserInstance extends Model{
    id:number,
    nome:string,
    email:string,
    password:string
}

export interface SedeInstance extends Model{
    id:number,
    bairro: string
}
export interface ClasseInstance extends Model{
    id:number,
    classe: string,
    preco: number,
    horas:number
}
export interface PutaInstance extends Model{
    id:number,
    nome:string,
    idade:number,
    id_classe:number
}
export interface PuteiroInstance extends Model{
    id:number,
    id_sede:number,
    aberto:boolean,
    id_puta:number
}


export const Sede = sequelize.define<SedeInstance>('Sede', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    bairro:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'sede',
    timestamps: false
});

export const Classe = sequelize.define<ClasseInstance>('Classe', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    classe:{
        type: DataTypes.STRING
    },
    preco:{
        type: DataTypes.REAL
    },
    horas:{
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'classe',
    timestamps: false
});
export const Puta = sequelize.define<PutaInstance>('Puta', {
    id:{
        primaryKey: true,
        autoIncrement:true,
        type: DataTypes.INTEGER
    },
    nome:{
        type: DataTypes.STRING
    },
    idade:{
        type: DataTypes.INTEGER
    },
    id_classe:{
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'puta',
    timestamps: false
});
export const Puteiro = sequelize.define<PuteiroInstance>('Puteiro', {
    id:{
        primaryKey: true,
        autoIncrement:true,
        type: DataTypes.INTEGER
    },
    id_sede:{
        type: DataTypes.BIGINT
    },
    aberto:{
        type: DataTypes.BOOLEAN
    },
    id_puta:{
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'puteiro',
    timestamps: false
})


export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome:{
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
})