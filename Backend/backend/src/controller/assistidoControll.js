

const { con } = require('../database/Connection')
const assistidoModelo = require('../model/assistidoModel')


const getAll = (req,res) => {

    let string = `select * from assistidos`

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

    let string = `select * from assistidos where id_assistido = ${req.params.id_assistido}`

    con.query(string, (err, result) => {

        if(err == null){
            res.json(result[0])
        }
        else{
            res.status(400).json({err: err.message})
        }
        
    })

}

const buscarAssistidoNomeCompleto = (req,res) => {

    let  nome_completo = req.params.nome_completo
    let stringNomeCompleto = `select * from assistidos where nome_completo = '${nome_completo}';`

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
    let stringCPF = `select * from assistidos where cpf = '${cpf}'`

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
        let stringRG = `select * from assistidos where rg = '${req.params.rg}'`

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
    let nome_social
    let rg 
    let cpf 
    let naturalidade
    let cartao_cidadao
    let cartao_sus
    let foto_antes 
    let foto_depois

   
   
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
        foto_antes = null
    }
    else{
        foto_antes = req.body.foto
    }
    if(req.body.foto_depois === undefined){
        foto_depois = null
    }
    else{
        foto_depois = req.body.foto_depois
    }


    let string = `insert into assistidos(id_funcionario, nome_completo, nome_social, rg,
        cpf, data_nascimento, estado_civil, naturalidade, sexo, cartao_cidadao, cartao_sus, foto_antes, foto_depois)
        values ?;`

    let values = [
        [
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
            foto_antes,
            foto_depois

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

            // console.log(id_gerado)
        }
        else{
            res.status(400).json({err: err.message})
        }
    })

}



const updateAssistido = (req,res) => {

    let id_assistido = req.body.id_assistido
    let id_funcionario = req.body.id_funcionario
    let nome_completo = req.body.nome_completo
    let nome_social = req.body.nome_social
    let rg = req.body.rg
    let cpf = req.body.cpf
    let antecedente_criminal = req.body.antecedente_criminal



}


const updateFotoAssistido = (req,res) => {

    let foto = req.body.foto
    let id_assistido = req.body.id_assistido
    let string = `update assistidos set foto = '${foto}' where id_assistido = ${id_assistido}`

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

    let string = `update assistidos set foto_depois = '${foto_depois}' where id_assistido = ${id_assistido}`

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

// novos métodos de requisição











// CRUD SAÚDE


// POST SAÚDE  

const postSaude = (req,res) => {

    let id_assistido = req.body.id_assistido
    let comorbidades = req.body.comorbidades

    if(id_assistido !== undefined && comorbidades.length !== 0){

        let string
        let values = []

        console.log("values ",  values)

       comorbidades.forEach((item,index) => {

          values.push(comorbidades[index].value)

       })


       values.forEach((item,index) => {

        string = `insert into saude (id_assistido,id_comorbidade,data_de_registro) values (${id_assistido}, ${values[index]}, curdate())`
        console.log(string)

        con.query(string, (err,result) => {

           /* if(err === null){

                //res.status(200).json({result}).end()

            }else{
                res.status(400).json({err: err.message}).end()
            }*/
        })

       })

       res.status(200).end()
        

    }
    else{
        res.status(400).json({"err": "informe os campos de id_assistido e comorbidades"})
    }


   

}

// GET SAÚDE POR ID_FUNCIONARIO

const getSaudeID = (req,res) => {

    let id_assistido = req.params.id_assistido
    let string = `select * from vw_saude02 where id_assistido = ${id_assistido}`

    if(id_assistido !== undefined){

        con.query(string, (err,result) => {

            if(err === null){
                res.status(200).json(result).end()
            }else{
                res.status(400).json({err: err.message})
            }
        })


    }
    else{
        res.status(400).json({"err": "informe o id_assistido"})
    }
}

// GET SAÚDE (LISTAR TODOS)

const getAssistSaude = (req,res) => {

    let string = `select * from vw_saude;`


    con.query(string, (err,result) => {
        if(err == null){
            res.status(200).json(result).end()
        }
        else{
            res.status(400).json({err: err.message})
        }
    })

}


const updateSaude = (req,res) => {

    let string = `update saude set id_comorbidade = ${req.body.id_comorbidade}, data_de_registro = CURDATE() where id_saude = ${req.body.id_saude}`

    if(req.body.id_saude !== undefined && req.body.id_comorbidade !== undefined){


        con.query(string, (err,result) => {

            if(err === null){

                // res.status(200).json(result)

                let id_saude = req.body.id_saude

                let stringBusca = `select * from vw_saude02 where id_saude = ${id_saude}`

                con.query(stringBusca, (err02, result02) => {

                    if(err02 === null){

                        res.status(200).json(result02)

                    }
                    else{
                        res.status(400).json({err: err.message})
                    }
                })


            }
            else{
                res.status(400).json({err: err.message})
            }

        })

    }

    else{
        res.status(400).json({"err": "informe a comorbidade e o id_saude"})
    }

}

const getComorbidades= (req,res) => {

    let string = `select * from comorbidades;`


    con.query(string, (err,result) => {
        if(err == null){
            res.status(200).json(result).end()
        }
        else{
            res.status(400).json({err: err.message})
        }
    })

}




// CRUD FAMILIAR 

// POST 

const postFamiliar = (req,res) => {

    let nome_completo = req.body.nome_completo
    let rg = req.body.rg
    let telefone = req.body.telefone
    let email = req.body.email
    let endereco = req.body.endereco
    let id_assistido = req.body.id_assistido
    let parentesco = req.body.parentesco

    let stringFamiliares = `insert into familiares (nome_completo, rg, telefone, email, endereco) values ('${nome_completo}', '${rg}', '${telefone}',
        '${email}','${endereco}')`

       if(nome_completo !== undefined){


        con.query(stringFamiliares,(err,result) => {

            if(err === null){

                let id_familiar = result.insertId

                let queries = [
                    `insert into familiarassistido (id_assistido,id_familiar, data_cadastro) values (${id_assistido}, ${id_familiar}, curdate())`,
                    `insert into familiarassistido (id_assistido,id_familiar,parentesco,data_cadastro) values (${id_assistido}, ${id_familiar}, '${parentesco}', curdate())`
                ]


                function retString(paren){

                    if(paren === undefined){
                        return queries[0]
                    }

                    return queries[1]
                }


                let stringAssisFam = retString(parentesco)

                con.query(stringAssisFam, (err02,result02) => {
                    if(err02 === null){

                        let id_assisFam = result02.insertId
                        let stringResult = `select * from vw_familiar02 where id_familiar = ${id_familiar}`

                        con.query(stringResult, (err03,result03) => {

                            if(err03 === null){
                                res.status(200).json(result03)
                            }
                            else{
                                res.status(400).json({err03: err03.message}).end()
                            }
                        })


                    }else{
                        res.status(400).json({err02: err02.message}).end()
                    }
                })


            }else{
                res.status(400).json({err: err.message}).end()
            }
        })

       }
       else{

        res.status(400).json({"err": "informe pelo menos o campo 'nome_completo'"}).end()

       }
}

const postRelacionamentoFamiliar = (req,res) => {

    let id_assistido = req.body.id_assistido
    let rg_familiar = req.body.rg
    let parentesco

    let par = !(parentesco === undefined)?parentesco = null:parentesco = req.body.parentesco

    let string = `insert into familiarassistido (data_cadastro,id_assistido,id_familiar,parentesco)values (curdate(),${id_assistido}, 
    (select id_familiar from familiares where rg = '${rg_familiar}'),'${par}')`

    if(id_assistido !== undefined && rg_familiar !== undefined){

        con.query(string,(err,result) => {

            if(err === null){

                res.status(200).json(result).end()

            }
            else{
                res.status(400).json({err: err.message}).end()
            }
        })

    }else{
        res.status(400).json({"err": "Informe os campos de id_assistido e rg"}).end()
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
    updateFotoDepoisAssistido,
    getAssistSaude,
    getSaudeID,
    postSaude,
    updateSaude,
    getComorbidades,
    postFamiliar,
    postRelacionamentoFamiliar
}