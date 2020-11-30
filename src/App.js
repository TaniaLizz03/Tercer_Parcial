import { useState, useEffect } from 'react'
import { db } from './firebase.js'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [author, setAuthor] = useState('')
  const [edito, setEdito] = useState('')
  const [clasif, setClasif] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')

  const getTodos = async () => {
    const data = await db.collection('todos').get()
    const resultado = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setTodos(resultado)
    console.log(resultado)
  }


  useEffect(() => {
    getTodos()
  }, [])

  const agregarTodo = async (e) => {
    e.preventDefault()
    if (!todo.trim()) {
      console.log('campo vacio')
      return
    }
    if (!author.trim()) {
      console.log('campo vacio')
      return
    }
    if (!edito.trim()) {
      console.log('campo vacio')
      return
    }
    if (!clasif.trim()) {
      console.log('campo vacio')
      return
    }

    const firebaseTodo = await db.collection('todos').add({
      name: todo,
      aut: author,
      edi: edito,
      clas: clasif,
    })

    const nuevoTodoObject = {
      name: todo,
      aut: author,
      edi: edito,
      clas: clasif,
    }

    setTodos([...todos, { id: firebaseTodo.id, ...nuevoTodoObject }])
    setTodo('')
    setAuthor('')
    setEdito('')
    setClasif('')

  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTodo(item.name)
    setAuthor(item.aut)
    setEdito(item.edi)
    setClasif(item.clas)
    setId(item.id)
  }


  const editarTodo = async (e) => {
    e.preventDefault()
    await db.collection('todos').doc(id).update({
      name: todo,
      aut: author,
      edi: edito,
      clas: clasif,
    })
    const arregloEditado = todos.map(item => (
      item.id === id ? { id: item.id, name: todo } : item,
      item.id === id ? { id: item.id, aut: author } : item,
      item.id === id ? { id: item.id, edi: edito } : item,
      item.id === id ? { id: item.id, clas: clasif } : item
    ))
    setTodos(arregloEditado)
    setModoEdicion(false)
    setId('')
    setTodo('')
    setAuthor('')
    setEdito('')
    setClasif('')

  }


  const eliminarTodo = async (id) => {
    await db.collection('todos').doc(id).delete()
    const filtro = todos.filter(item => item.id !== id)
    setTodos(filtro)
  }


  return (
    <div className="container">
      <h1>Biblioteca de Libros</h1>
      <h2>
        {
          modoEdicion ? 'Editar Libro' : 'Agregar Libro'
        }
      </h2>
      <form onSubmit={modoEdicion ? editarTodo : agregarTodo}>
        <div className="form-group">
          <label>Titulo</label>
          <input type="text" className="form-control" value={todo} onChange={e => setTodo(e.target.value)} placeholder="Ej. Resident Evil, la conspiracion umbrella" />
          <label>Autor</label>
          <input type="text" className="form-control" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Ej. S.D.Perry" />
          <label>Editorial</label>
          <input type="text" className="form-control" value={edito} onChange={e => setEdito(e.target.value)} placeholder="Ej. Titunmas" />
          <label>Clasificacion</label>
          <input type="text" className="form-control" value={clasif} onChange={e => setClasif(e.target.value)} placeholder="Ej. Horror" />
        </div>
        <button type="submit" className="btn btn-primary">{modoEdicion ? 'Editar' : 'Agregar'}</button>
      </form>

      <ul className="list-group">
        {
          todos.map(item => (
            <li className="list-group-item" key={item.id}>
              <span>Titulo: {item.name} ||
                  Autor: {item.aut} ||
                  Editorial: {item.edi} ||
                  Clasificacion: {item.clas} ||
                  ID: {item.id}</span>
              <button
                className="btn btn-danger btn-sm float-right"
                onClick={() => eliminarTodo(item.id)}
              >Eliminar</button>
              <button className="btn btn-warning btn-sm float-right mr-2"
                onClick={() => activarEdicion(item)}>Editar</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
