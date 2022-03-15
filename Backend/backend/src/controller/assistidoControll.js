

const { con } = require('../database/Connection')
const assistidoModelo = require('../model/assistidoModel')


const getAll = (req,res) => {

    let string = `select * from assistido`

    con.query(string, (err, result) => {

        if(err == null){
            res.json(result)
        }
        else{
            res.status(400).json({err: err.message})
        }
    })


}

const getID = (req, res) => {

    let string = `select * from assistido where id_assistido = ${req.params.id_assistido}`

    con.query(string, (err, result) => {

        if(err == null){
            res.json(result)
        }
        else{
            res.status(400).json({err: err.message})
        }
        
    })

}

const buscarAssistidoNomeCompleto = (req,res) => {

    let  nome_completo = req.params.nome_completo
    let stringNomeCompleto = `select * from assistido where nome_completo = '${nome_completo}';`

    con.query(stringNomeCompleto, (err, result) => {

        if(err === null){
            res.json(result)
        }
        else{
            res.status(400).json({err: err.message})
        }
    })

}

const buscarAssistidoCPF = (req,res) => {

    let cpf = req.params.cpf 
    let stringCPF = `select * from assistido where cpf = '${cpf}'`

    console.log(cpf)

    if(req.params.cpf !== undefined){
        con.query(stringCPF, (err,result) => {

            if(err === null){
                res.json(result)
            }else{
                res.status(400).json({err: err.message})
            }
            
        })
    }
    else{
        res.status(400).end().json({"err": "informe um cpf"})
    }

}

    const buscarAssistidoRG = (req,res) => {

        let rg = req.params.rg
        let stringRG = `select * from assistido where rg = '${req.params.rg}'`

        if(rg !== undefined){

            con.query(stringRG, (err,result) => {

                if(err === null){
                    res.json(result)
                }
                else{
                    res.status(404).end().json({err: err.message})
                }
            })
        }
        else{
            res.status(400).end().json({"err": "informe um rg"})
        }

    }

const postAssistido = (req,res) => {

    // Campos referentes a tabela de assistidos do banco de dados 
    let id_saude 
    let id_familiar
    let id_droga 
    let nome_social
    let rg 
    let cpf 
    let naturalidade
    let cartao_cidadao
    let cartao_sus
    let foto 
    let foto_depois
    let relatorio

    //Campos relacionados a tabela saúde do banco de dados
    let hiv 
    let hipertensao
    let diabetes
    let depressao
    let maconha 
    let cocaina 
    let crack 
    let ox 
    let alcool 


    if(req.body.id_saude === undefined){
        id_saude = null
    }
    else{
        id_saude = req.body.id_saude
    }

    if(req.body.id_familiar === undefined){
        id_familiar = null
    }
    else{
        id_familiar = req.body.id_familiar
    }

    if(req.body.id_droga === undefined){
        id_droga = null
    }
    else{
        id_droga = req.body.id_droga
    }

    if(req.body.nome_social === undefined){
        nome_social = null
    }
    else{
        nome_social = req.body.nome_social
    }

    if(req.body.rg === undefined){
        rg = null
    }
    else{
        rg = req.body.rg
    }

    if(req.body.cpf === undefined){
        cpf = null
    }
    else{
        cpf = req.body.cpf
    }

    if(req.body.naturalidade === undefined){
        naturalidade = null
    }
    else{
        naturalidade = req.body.naturalidade
    }

    if(req.body.cartao_cidadao === undefined){
        cartao_cidadao = null
    }
    else{
        cartao_cidadao = req.body.cartao_cidadao
    }

    if(req.body.cartao_sus === undefined){
        cartao_sus = null
    }
    else{
        cartao_sus = req.body.cartao_sus
    }

    if(req.body.foto === undefined){
        foto = null
    }
    else{
        foto = req.body.foto
    }
    if(req.body.foto_depois === undefined){
        foto_depois = null
    }
    else{
        foto_depois = req.body.foto_depois
    }

    if(req.body.relatorio === undefined){
        relatorio = null
    }
    else{
        relatorio = req.body.relatorio
    }


    // Preenchendo as variaveis referentes a saúde do assistido
    if(req.body.hiv === undefined){
        hiv = null
    }
    else{
        hiv = req.body.hiv
    }
    if(req.body.hipertensao === undefined){
        hipertensao = null
    }
    else{
        hipertensao = req.body.hipertensao
    }
    if(req.body.diabetes === undefined){
        diabetes = null
    }
    else{
        diabetes = req.body.diabetes
    }
    if(req.body.depressao === undefined){
        depressao = null
    }
    else{
        depressao = req.body.depressao
    }
    if(req.body.maconha === undefined){
        maconha = null
    }
    else{
        maconha = req.body.maconha
    }
    if(req.body.cocaina === undefined){
        cocaina = null
    }
    else{
        cocaina = req.body.cocaina
    }
    if(req.body.crack === undefined){
        crack = null
    }
    else{
        crack = req.body.crack
    }
    if(req.body.ox === undefined){
        ox = null
    }
    else{
        ox = req.body.ox
    }
    if(req.body.alcool === undefined){
        alcool = null
    }
    else{
        alcool = req.body.alcool
    }




    let string = `insert into assistido(id_saude, id_familiar, id_droga, id_funcionario, nome_completo, nome_social, rg,
        cpf, data_nascimento, estado_civil, naturalidade, sexo, cartao_cidadao, cartao_sus, foto, foto_depois, relatorio)
        values ?;`

    let stringSaude = `insert into saude (id_assistido, id_comorbidade) values = ?;`

    let values = [
        [

            id_saude,
            id_familiar,
            id_droga,
            req.body.id_funcionario,
            req.body.nome_completo,
            nome_social,
            rg,
            cpf,
            req.body.data_nascimento,
            req.body.estado_civil,
            naturalidade,
            req.body.sexo,
            cartao_cidadao,
            cartao_sus,
            foto,
            foto_depois,
            relatorio

        ]
        
    ]




    con.query(string, [values], (err,result) => {

        if(err == null){
            res.status(200).json({...req.body, id_assistido: result.insertId})
            let id_gerado = result.insertId

            // id_comorbidades 
            // 01 - HIV
            // 02 - Hipertensão
            // 03 - Diabetes
            // 04 - Depressão
            // 05 - Maconha
            // 06 - Cocaína 
            // 07 - Crack
            // 08 - OX
            // 09 - Álcool

            console.log(id_gerado)
        }
        else{
            res.status(400).json({err: err.message})
        }
    })

}


const updateFotoAssistido = (req,res) => {

    let foto = req.body.foto
    let id_assistido = req.body.id_assistido
    let string = `update assistido set foto = '${foto}' where id_assistido = ${id_assistido}`

    if(req.body.foto !== undefined && req.body.id_assistido !== undefined){

        con.query(string, (err,result) => {
            if(err === null){

                res.status(400).json({...req.body})

            }else{
                res.status(400).json({err: err.message})
            }
        })
    }
    else{
        res.json({"err": "Informe os campos de id e foto"})
    }
}

    

const updateFotoDepoisAssistido = (req, res) => {

    let foto_depois = req.body.foto_depois 
    let id_assistido = req.body.id_assistido

    let string = `update assistido set foto_depois = '${foto_depois}' where id_assistido = ${id_assistido}`

    if(req.body.id_assistido !== undefined && req.body.foto_depois !== undefined){

        con.query(string, (err, result) => {

            if(err === null){

                res.json({...req.body})

            }else{
                res.status(400).json({err: err.message})
            }
        })

    }else{
        res.status(400).json({"err": "informe os campos id e foto"})
    }


}



module.exports = {
    getAll,
    getID,
    buscarAssistidoNomeCompleto,
    buscarAssistidoCPF,
    buscarAssistidoRG,
    postAssistido,
    updateFotoAssistido,
    updateFotoDepoisAssistido
}