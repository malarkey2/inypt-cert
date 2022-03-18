import express from "express";
import crypto from 'crypto';

const app = express();

import {readFileSync, unlink} from 'fs';
import { writeFile } from 'fs/promises';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded());
app.use(express.json());



const arrParticipants = ["Mehul Borad", 
"Abhiram Cherukupalli", 
"Tanay Mehta", 
"Badal Panchani", 
"Soumendu Jana", 
"Muhammed Yaseen Nivas", 
"Aadarsh Agarwal ", 
"Aditya Yalavatti", 
"Ananya Kedia", 
"Shrestha Sharan", 
"Aradhya Jain", 
"Aradhya Jain", 
"Ansh Gupta", 
"Nishantak Panigrahi", 
"Md.Rehan", 
"Laksh Sharma", 
"Arpit Chhabra"
]

const arrTopTen = ["Laksh Sharma", 
"Adarsh Agarwal", 
"Aradhya Jain", 
"Abhiram Cherukupalli", 
"Ansh Gupta", 
"Ananya Kedia", 
"Dwitimaya Sahoo", 
"Arpit Chhabra", 
"Soumendu Jana", 
"Ahitangani Das"
]

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.get('/merit-cert', function(req, res){
    res.sendFile(__dirname + '/merit.html');
})

app.get('/part-cert', function(req, res){
    res.sendFile(__dirname + '/participation.html');
})

app.get('/not-found', function(req, res){
    res.sendFile(__dirname + '/not-found.html');
})

app.use('/get-merit-cert', function(req, res){

    console.log(req.body.full_name)
    const nameAdd = req.body.full_name;
    
    if(!arrTopTen.includes(nameAdd)){
        res.redirect("/not-found")
    }
    createPdf();
    async function createPdf() {
    
        try {
    
          const pdfDoc = await PDFDocument.load(readFileSync("./merit-cert.pdf"));
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
          
          // Get the first page of the document
          const pages = pdfDoc.getPages()
          const firstPage = pages[0]
          
          // Get the width and height of the first page
          const { width, height } = firstPage.getSize()
          
          // Draw a string of text diagonally across the first page
          firstPage.drawText(nameAdd, {
            x: 230,
            y: 340,
            size: 36,
            font: helveticaFont,
            color: rgb(0,0,0)
          })

          //Random file generation
          
          var token = crypto.randomBytes(8).toString('hex');
          
          let fileName = nameAdd.replace(/ /g,'')+token;
          console.log(fileName)

          // Serialize the PDFDocument to bytes (a Uint8Array)
          const pdfBytes = await pdfDoc.save()
          await writeFile(__dirname + "/downloads/" + fileName + ".pdf", pdfBytes);

         
          res.download(__dirname + "/downloads/" + fileName+ ".pdf", "Certificate-InYPT", function(err) {
            if (err) {
              console.log(err); // Check error if you want
            }
            // unlink(__dirname + "/downloads/" + fileName+ ".pdf", function(){
            //     console.log("File was deleted") // Callback
            // });
          
          });
           
        

        } catch (err) {
          console.log(err);
        }
      }
  });

  app.use('/get-part-cert', function(req, res){

    console.log(req.body.full_name)
    const nameAdd = req.body.full_name;
    
    if(!arrParticipants.includes(nameAdd)){
        res.redirect("/not-found")
    }
    createPdf();
    async function createPdf() {
    
        try {
    
          const pdfDoc = await PDFDocument.load(readFileSync("./part-cert.pdf"));
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
          
          // Get the first page of the document
          const pages = pdfDoc.getPages()
          const firstPage = pages[0]
          
          // Get the width and height of the first page
          const { width, height } = firstPage.getSize()
          
          // Draw a string of text diagonally across the first page
          firstPage.drawText(nameAdd, {
            x: 230,
            y: 340,
            size: 36,
            font: helveticaFont,
            color: rgb(1,1,1)
          })

          //Random file generation
          
          var token = crypto.randomBytes(8).toString('hex');
          
          let fileName = nameAdd.replace(/ /g,'')+token;
          console.log(fileName)

          // Serialize the PDFDocument to bytes (a Uint8Array)
          const pdfBytes = await pdfDoc.save()
          await writeFile(__dirname + "/downloads/" + fileName + ".pdf", pdfBytes);

         
          res.download(__dirname + "/downloads/" + fileName+ ".pdf", "Certificate-InYPT", function(err) {
            if (err) {
              console.log(err); // Check error if you want
            }
            // unlink(__dirname + "/downloads/" + fileName+ ".pdf", function(){
            //     console.log("File was deleted") // Callback
            // });
          
          });
           
        

        } catch (err) {
          console.log(err);
        }
      }

   
  });

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
