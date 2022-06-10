var path = require('path');

const teste = (req, res) => {
    let id = req.params.id;

    var options = {
        root: path.join('imagens/')
    };
    
    let fileName = `${id}.jpg`;

    res.sendFile(fileName, options, (err)=> {
        if(err) {
            res.sendFile('casinha.jpg', options, (err)=> {
                if(err) {
                    res.end();
                }else {
                    console.log("FOI")
                }
            })
        }else {
            console.log("FOI")
        }
    });
}

module.exports = {
    teste,
}