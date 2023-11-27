const http = require('http');                                       
const fs = require('fs');                                           
const xml = require('fast-xml-parser');                             

const server = http.createServer((req, res) => {                    // Створення HTTP-сервера
    const xmlData = fs.readFileSync('data.xml', 'utf8');            // Читання вмісту 'data.xml'
    const parser = new xml.XMLParser();                             // Створення об'єкту парсера XML
    const obj = parser.parse(xmlData);                              // Розбір XML-даних у JavaScript-об'єкт
    let data = obj.auctions.auction;                                // Отримання під-елементів 'auction'

    if (!Array.isArray(data)) {                                     
        data = [data];                                              
    }

    const newObj = {
        data: {
            auction: data.map((item) => ({                          // Створення нового об'єкту з обраними властивостями
                StockCode: item.StockCode,
                ValCode: item.ValCode,
                Attraction: item.Attraction,
            })),
        },
    };

    const builder = new xml.XMLBuilder();                           // Створення об'єкту для побудови XML
    const xmlStr = builder.build(newObj);                           // Побудова XML з JavaScript-об'єкта
    res.writeHead(200, { 'Content-Type': 'application/xml' });      
    res.end(xmlStr);                                                
});

const host = "localhost";                                           
const port = 8000;                                                  

server.listen(port, () => {                                         
    console.log(`Server is running at http://${host}:${port}`);     // Виведення інформації про запуск сервера
});
