require('dotenv').config()


/*llamo a la libreria express y la almaceno en la constante express*/
const express = require('express')
const app = express()
const { DBTest}= require('./database.js');

const helmet = require('helmet');
const morgan= require('morgan');


const posteoModel = require('./posteoModel.js');


const PUERTO = process.env.PUERTO

/*configuro EJS como motor de plantilla*/
app.set('view engine','ejs');

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('combined'));
app.use(express.json());



/*para que el servidor entienda lo que viene por imput*/
app.use(express.urlencoded({extended:true}));

/*designo la ruta principal*/
app.get('/', async function (req, res) {
  const Posteo=  await posteoModel.findAll();
  
  res.render('inicio',{ Posteo });
})

/*ruta para boton agregar*/
app.get('/agregar', function (req, res) {
  res.render('agregar')
})
 

app.post('/agregar', async function (req, res) {
  console.log(req.body)
  
  const {titulo, texto,imagen}= req.body
  
  try {
    const nuevoPost= await posteoModel.create({
      titulo: titulo,
      texto: texto,
      imagen:imagen,
  
    });
      
    if(nuevoPost){
      
      res.redirect('/');
    }else{
      res.send('no se pudo agregar el post')
    }
  } catch (error) {
    res.send('se produjo un error : '+ err)
  }
  

})
/*ruta para el boton eliminar*/
app.get('/eliminar/:id', async function (req, res) {
  const { id } = req.params;

 try{
  const eliminarPost= await posteoModel.destroy({
    where: { 
        id: id
     }
   })

   if(eliminarPost) {
        res.redirect('/');
}else{
       res.send('no se pudo eliminar el post')
}
} catch (err) {
  res.send('se produjo un error al eliminar el post: '+ err)
}
 
  })

/*ruta para editar post*/

app.get('/editar/:id',async function (req, res) {
  const{ id }= req.params;
  
  try{
    const post= await posteoModel.findOne({ 
      where:{ 
        id:id
      }
    })
     
    if(post){
      res.render('editar', {post:post });
     }else{
      res.send('no se pudo encontrar el post')
     }
   }catch (err) {
    res.send('se produjo un error al editar el post: '+ err)
  }
  
})

app.post('/editar/:id',async function (req, res) {
  const{ id }= req.params;
  const {titulo, texto,imagen}= req.body
  
  try{
    const postEditado= await posteoModel.update(
      { 
        titulo:titulo, 
        texto:texto,
        imagen:imagen
      },{
        where:{ 
          id:id
      }
    })
     
    if(postEditado){
      res.redirect('/');
     }else{
      res.send('no se pudo editar el post')
     }
   }catch (err) {
    res.send('se produjo un error al editar el post: '+ err)
  }
  
})

app.get('/', (req, res) => {
  res.send('Post guardado con éxito');
});



DBTest()

/*designo un puerto y levanto el servidor*/
app.listen(PUERTO, () => {
    console.log(`el servidor esta funcionando en el puerto${PUERTO}`)
})