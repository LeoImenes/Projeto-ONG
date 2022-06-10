var btn = document.querySelector("input")

btn.addEventListener("click", ()=>{
    CriaPDF()
})
function CriaPDF() {
    
    var conteudo = document.getElementById('pdf').innerHTML;
    var style = "<style>";
    style = style + "body{width: 100%;height: 100%;display: flex;justify-content:center;background-color: #0045b4;overflow: hidden;margin:0;padding:0;border: 2px solid #000;}";
    style = style + "#pdf{display: flex;align-items: center;flex-direction: column;width: 80%;height: 100vh;background-color:#fff;}";
    style = style + ".cabecalho{display: flex;align-items: center;justify-content: space-between;width: 90%;height: 20%;border-bottom: 2px solid #000;}";
    style = style + ".info {height: 50%;display: flex;justify-content: center;flex-direction: column;align-items: flex-end;padding: 10px;}";
    style = style + "#logo {width: 150px;height: 150px;padding: 10px;}";
    style = style + ".info>p{font-Size: 20px;margin:0;}";
    style = style + ".subtitulo{display: grid;grid-template-columns: 1fr 1fr;align-items: center;width: 90%;height: 15%;border-bottom: 2px solid #000;}";
    style = style + ".pessoas>h2,.data>h2{font-Size:25px;}";
    style = style + ".pessoas{padding: 10px;}";
    style = style + ".data{height: 100%;display: flex;justify-content: center;flex-direction: column;align-items: flex-end;padding: 10px;}";
    style = style + ".encaminhamento{width: 90%;height:55%;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html>');
    // win.document.write('<title>Empregados</title>');   // <title> CABEÇALHO DO PDF.
    // win.document.write(style);                      // INCLUI UM ESTILO NA TAB HEAD
    // win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(style); 
    win.document.write(conteudo);                   // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                           // FECHA A JANELA
    win.print();                                       // IMPRIME O CONTEUDO
}