const formatDate = (nasc) => {
    let dia = nasc.getDate();
    dia = (dia < 10) ? "0" + dia : dia;
    let mes = nasc.getMonth() + 1;
    mes = (mes < 10) ? "0" + mes : mes;
    let ano = nasc.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

const dataUS = (data) => {
    var dia = data.split("/")[0]
    var mes = data.split("/")[1]
    var ano = data.split("/")[2]

    return `${ano}-${mes}-${dia}`
}

module.exports = {
    formatBr: formatDate,
    formatUs: dataUS
};