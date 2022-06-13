const { con } = require('../database/Connection')

const modeloFuncionario = require('../model/funcionarioModel')

//***** - FUNCIONARIO - *****//

// MÉTODO CADASTRAR FUNCIONARIO 
const postFuncionario = (req, res) => {
    let foto = (req.body.foto === undefined) ? "" : req.body.foto
    let status = (req.body.data_demissao === undefined) ? 1 : 0
    let string = `insert into funcionarios(foto,matricula,nome_completo,rg,cpf,data_nascimento,estado_civil,cargo,sexo,data_admissao,email,senha,status) values ?;`
    let values = [
        [
            foto,
            req.body.matricula,
            req.body.nome_completo,
            req.body.rg,
            req.body.cpf,
            req.body.data_nascimento,
            req.body.estado_civil,
            req.body.cargo,
            req.body.sexo,
            req.body.data_admissao,
            req.body.email,
            req.body.senha,
            status
        ]
    ]
    con.query(string, [values], (err, result) => {
        if (err == null) {
            res.status(200).json({...req.body, id: result.insertId, "status": status }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

//MÉTODO CONSULTAR TODOS FUNCIONARIOS
const getAll = (req, res) => {
    let string = 'select * from funcionarios'
    con.query(string, (err, result) => {
        result.forEach((item, index) => {
            delete item.senha
                // delete item.foto
        });
        res.json(result).end()
    })
}

//MÉTODO CONSULTAR FUNCIONARIO PELA MATRICULA
const getMatricula = (req, res) => {
    let string = 'select * from funcionarios where matricula =' + req.params.matricula_funcionario;
    con.query(string, (err, result) => {
        if (err === null) {
            if (result.length == 0) {
                res.status(404).end()
            } else {
                result.forEach((item, index) => {
                    delete item.senha
                    delete item.status
                });
                res.json(result).end()
            }
        } else {
            res.status(404).json({ err: err.message }).end()
        }
    })
}

// MÉTODO ATUALIZAR DADOS CADASTRAIS DO FUNCIONARIO
const updateFuncionario = async(req, res) => {
    let matricula = req.body.matricula;
    let cargo = req.body.cargo;
    let matricula_funcionario = req.body.matricula_funcionario;
    let data_demissao = req.body.data_demissao;
    let status = (data_demissao == undefined) ? 1 : 0;
    let verificacao = false;
    let auth = await getAuthorization(matricula)
        .then((auth) => {
            if (auth == "OK") {
                let string = [
                    `update funcionarios set data_demissao = "${data_demissao}", status = ${status} where matricula = "${matricula_funcionario}"`,
                    `update funcionarios set cargo = "${cargo}" where matricula = "${matricula_funcionario}"`,
                    `update funcionarios set cargo = "${cargo}", data_demissao = "${data_demissao}", status = "${status}" where matricula = "${matricula_funcionario}"`
                ]

                function busca() {
                    if (data_demissao !== undefined && cargo === undefined) {
                        return string[0]
                    } else if (data_demissao === undefined && cargo !== undefined) {
                        return string[1]
                    } else if (data_demissao !== undefined && cargo !== undefined) {
                        return string[2]
                    } else if (cargo !== undefined && email === undefined && senha === undefined) {
                        return string[1]
                    } else if (cargo == undefined && email !== undefined && senha == undefined) {
                        return string[2]
                    } else if (cargo == undefined && email == undefined && senha !== undefined) {
                        return string[3]
                    } else {
                        return string[4]
                    }
                }
                let resultado = busca();
                // console.log(resultado)
                con.query(resultado, (err, result) => {
                    if (err == null) {
                        res.status(200).json({...req.body }).end();
                    } else {
                        res.status(400).json({ err: err.message }).end();
                    }
                })
            } else if (auth == "NOK") {
                res.status(401).json({ err: "nao autorizado" }).end();
            } else {
                res.status(404).json({ err: auth }).end();
            }
        })
        .catch(err => {
            res.status(404).json({ err: err }).end();
        })

}

// MÉTODO ATUALIZAR TODAS AS INFORMAÇÕES DO FUNCIONARIO
const updateDadosFuncionario = (req, res) => {
    // console.log(req.body)
    let matricula = req.body.matricula;
    let nome_completo = req.body.nome_completo;
    let rg = req.body.rg;
    let cpf = req.body.cpf;
    let data_nascimento = req.body.data_nascimento;
    let estado_civil = req.body.estado_civil;
    let sexo = req.body.sexo;
    let foto = req.body.foto;
    let query = `UPDATE funcionarios SET nome_completo="${nome_completo}",rg="${rg}",cpf="${cpf}",data_nascimento="${data_nascimento}",estado_civil="${estado_civil}",sexo="${sexo}",foto="${foto}" WHERE matricula="${matricula}";`;
    con.query(query, (err, result) => {
        if (err == null) {
            res.status(200).json({...req.body }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
            // console.log(err)
        }
    })
};

// MÉTOD ATUALIZAR FOTO DO FUNCIONARIO
const updateFotoFuncionario = (req, res) => {
    let cpf = req.body.cpf;
    let foto = req.body.foto;
    let string = `update funcionarios set foto = '${foto}' where cpf = '${cpf}';`
    con.query(string, (err, result) => {
        if (err == null) {
            res.status(200).json({...req.body }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

// MÉTODO DELETAR FUNCIONARIO (NÃO USAR)
const deletarFuncionario = (req, res) => {
    // console.log(req.params)
    let string = `delete from funcionarios where matricula = "${req.params.matricula}";`
    con.query(string, (err, result) => {
        if (err == null) {
            res.status(200).json({ "Funcionário Excluido: ": req.params }).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

//  MÉTODO LOGIN
const login = (req, res) => {
    if (req.body.email !== undefined && req.body.senha !== undefined) {
        let string = `select * from funcionarios where email = '${req.body.email}' and senha = '${req.body.senha}' and status = 1;`
        con.query(string, (err, result) => {
            if (err === null) {
                if (result.length == 0) {
                    res.status(400).end();
                } else {
                    result.forEach((item, index) => {
                        delete item.senha
                        delete item.status
                        delete item.rg
                        delete item.cpf
                        delete item.data_nascimento
                        delete item.sexo
                        delete item.data_admissao
                        delete item.data_demissao
                        delete item.email
                        delete item.estado_civil
                    });
                    res.json(result[0]).end();
                }

            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else {
        res.status(400).json({ err: `'envie os campos 'email' e 'senha'` }).end();
    }
}

// MÉTODO RESET SENHA FUNCIONARIOS PELO CPF
const resetSenha = (req, res) => {
    let email = req.body.email;
    let cpf = req.body.cpf;
    let nova_senha = req.body.nova_senha;
    if (email !== undefined && cpf !== undefined && nova_senha !== undefined) {
        let string = `update funcionarios set senha = "${nova_senha}" where email = "${email}" and cpf = "${cpf}";`
        con.query(string, (err, result) => {
            if (err === null) {
                if (result.affectedRows === 0) {
                    res.status(401).json({ "err": "Não foi possível alterar a senha" }).end();
                } else {
                    res.status(200).json({ "Mensagem: ": "Senha alterada com sucesso" }).end();
                }
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else {
        res.status(400).json({ "err": "informe os campos email, cpf e nova_senha" }).end();
    }
}

// NOVOS MÉTODO DE REQUISIÇÃO ASSINCRONA
const asynqQuery = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) reject(err);
            // console.log(result)
            resolve(result);
        });
    })
}

// METODO QUE VEREFICA SE O USUARIO TEM PERMISSÃO PARA EXECUTAR DETERMINADA AÇÃO
async function getAuthorization(matricula) {
    return new Promise((resolve, reject) => {
        let string = `select cargo from funcionarios where matricula = "${matricula}";`
        console.log(string)
        con.query(string, (err, result) => {
            if (err === null) {
                console.log(result[0].cargo)
                if (result[0].cargo == "Diretor" || result[0].cargo == "Assistente Social") {
                    resolve("OK");
                } else {
                    resolve("NOK");
                }
            } else {
                reject(err.message);
            }
        });
    });
}

// ***** - ASSISTENCIAS - ****//

// MÉTODO FAZER ASSISTÊNCIA AOS ASSISTIDOS
async function executarQuery(string) {
    return new Promise((resolve, reject) => {
        con.query(string, (err, result) => {
            if (err === null) {
                resolve(result).end();
            } else {
                reject(err).end();
            }
        })
    })
}

// MÉTODO FAZER ASSISTÊNCIA PARA UM OU VARIOS ASSISTIDOS
const postmultAssis = (req, res) => {
    console.log(req.body)
    let id_funcionario = req.body.id_funcionario;
    let assistidos = req.body.assistidos;
    let strinAssistencia;
    let itens = req.body.itens;
    let index = 0;
    let comerro = false;

    let stringSolicitacao;

    if (id_funcionario !== undefined && assistidos.length !== undefined && itens.length > 0) {
        assistidos.forEach(item => {
            var idtoStr = JSON.stringify(item);
            var assistidos = idtoStr.substring(idtoStr.indexOf(":") + 1, idtoStr.lastIndexOf("}"));
            var query = `insert into assistencias (id_assistido, id_funcionario, data_registro) values(${assistidos}, ${id_funcionario}, curdate());`
            strinAssistencia = query;
            try {
                console.log(strinAssistencia)
                con.beginTransaction()
                con.query(strinAssistencia, async(err, result) => {
                    if (err === null) {
                        let id_assistencia = result.insertId
                        itens.forEach(async(item, index) => {
                            stringSolicitacao = `insert into solicitacao (id_assistencia, id_item) values(${id_assistencia}, ${itens[index].id_item})`
                            console.log(stringSolicitacao)
                            asynqQuery(stringSolicitacao)
                                .then(() => {
                                    if (index + 1 === itens.length) {
                                        con.commit()
                                        res.end(JSON.stringify(req.body))
                                        comerro = true
                                    }
                                }).catch((err) => {
                                    con.rollback()
                                    res.status(400).json({ err: err.message })
                                    comerro = true
                                })
                        })
                    } else {
                        res.status(400).json({ err: err.message })
                    }
                })
            } catch (err) {
                con.rollback()
                res.status(400).json({ err: err.message })
            }
        })
    } else {
        res.status(400).json({ "err": "Informe os campos 'id_funcionario', 'id_assistido','itens'" })
    }
}

// MÉTODO CONSULTAR TODAS AS ASSISTÊNCIAS PRESTADAS
const getAllAssistencias = (req, res) => {
    let string = `select * from vw_assistencia order by data_registro`
    con.query(string, (err, result) => {
        if (err === null) {
            res.status(200).json(result).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

// MÉTODO CONSULTAR ASSISTENCIAS PRESTADAS POR ID
const getAssistenciasID = (req, res) => {
    let id_funcionario = req.body.id_funcionario;
    let id_assistido = req.body.id_assistido;
    if (id_funcionario !== undefined && id_assistido !== undefined) {
        let string = `select * from vw_assistencia where id_funcionario = ${id_funcionario} and id_assistido = ${id_assistido}`
        con.query(string, (err, result) => {
            if (err === null) {
                res.status(200).json(result).end();
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else if ((id_funcionario === undefined) && (id_assistido !== undefined)) {
        let string = `select * from vw_assistencia where id_assistido = ${id_assistido}`
        con.query(string, (err, result) => {
            if (err === null) {
                res.status(200).json(result).end();
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else if ((id_funcionario !== undefined) && (id_assistido === undefined)) {
        let string = `select * from vw_assistencia where id_funcionario = ${id_funcionario}`
        con.query(string, (err, result) => {
            if (err === null) {
                res.status(200).json(result).end();
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else {
        res.status(400).json({ err: err.message }).end();
    }
}

// ***** - FINANCEIRO - *****//

// MÉTODO LANÇAR FINANCEIRO
const postFinanca = (req, res) => {
    let id_funcionario = req.body.id_funcionario;
    let tipo = req.body.tipo;
    let descricao = req.body.descricao;
    let valor = req.body.valor;
    if (id_funcionario !== undefined && tipo !== undefined && descricao !== undefined && valor !== undefined) {
        let string = `insert into financeiro (id_funcionario,tipo,descricao,valor,data_lancamento) values (${id_funcionario}, "${tipo}", "${descricao}", ${valor}, curdate());`
        con.query(string, (err, result) => {
            if (err === null) {
                res.status(200).json(req.body).end();
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else {
        res.status(400).json({ "err": "informe os campos 'id_funcionario', 'tipo', 'descricao', 'valor'" }).end();
    }
}

// MÉTODO CONSULTAR TODOS LANÇAMENTOS FINANCEIRO
const getAllFinancas = (req, res) => {
    let string = `select * from financeiro`
    con.query(string, (err, result) => {
        if (err === null) {
            res.status(200).json(result).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

// MÉTODO CONSULTAR LANÇAMENTOS FINANCEIRO POR ID
const getIDFinanca = (req, res) => {
    let id_financa = req.params.id_financa;
    if (id_financa !== undefined) {
        let string = `select * from financeiro where id_lancamento = ${id_financa}`
        con.query(string, (err, result) => {
            if (err === null) {
                res.status(200).json(result).end();
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else {
        res.status(400).json({ "err": "informe o id da financa" }).end();
    }
}

// MÉTODO ATUALIZAR LANÇAMENTO FINANCEIRO
const updateFinanca = (req, res) => {
    let id_lancamento = req.body.id_lancamento;
    let tipo = req.body.tipo;
    let descricao = req.body.descricao;
    let valor = req.body.valor;
    if (tipo !== undefined && descricao !== undefined && valor !== undefined) {
        let string = `update financeiro set tipo = "${tipo}", descricao = "${descricao}", valor = ${valor} where id_lancamento = ${id_lancamento}`
        con.query(string, (err, result) => {
            if (err === null) {
                res.status(200).json(result).end();
            } else {
                res.status(400).json({ err: err.message }).end();
            }
        })
    } else {
        res.status(400).json({ "err": "informe os campos 'tipo', 'descricao', 'valor'" }).end();
    }
}

const getItensAssistencia = (req, res) => {
    let string = `select * from itens order by (tipo)`
    con.query(string, (err, result) => {
        if (err === null) {
            res.status(200).json(result).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

// FUNÇÃO ENCAMINHAMENTO DO ASSISTIDO
const encaminhamento = (req, res) => {
    let id_funcionario = req.body.id_funcionario;
    let id_assistido = req.body.id_assistido;
    let encaminhamento = req.body.encaminhamento;
    let query = `insert into encaminhamentos (id_funcionario, id_assistido, encaminhamento,data_registro) values (${id_funcionario},${id_assistido}, "${encaminhamento}",curdate());`
    con.query(query, (err, result) => {
        console.log(result)
        if (err === null) {
            query = 'SELECT * FROM encaminhamentos WHERE id_encaminhamento = ' + result.insertId;
            con.query(query, (err, result) => {
                let retorno = result[0];
                res.status(200).json(retorno).end();
            })
        } else {
            res.status(400).json({ "Erro:": err.message }).end();
        }
    })
};

const getAllnomes = (req, res) => {
    let string = `select nome_completo, id_assistido from assistidos where nome_completo LIKE '%${req.query.busca}%'`
    con.query(string, (err, result) => {
        if (err == null) {
            res.json(result).end();
        } else {
            res.status(400).json({ err: err.message }).end();
        }
    })
}

module.exports = {
    postFuncionario,
    getAll,
    getMatricula,
    updateFuncionario,
    updateDadosFuncionario,
    updateFotoFuncionario,
    deletarFuncionario,
    login,
    resetSenha,
    getAuthorization,
    getAllAssistencias,
    getAssistenciasID,
    postFinanca,
    getAllFinancas,
    getIDFinanca,
    updateFinanca,
    postmultAssis,
    getItensAssistencia,
    encaminhamento,
    getAllnomes
}