import React from "react"
import './App.css';
import Auth from './components/auth';
import { db, auth } from "./config/firebase";
import { 
  getDocs, 
  collection, 
  addDoc, 
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = React.useState([])
  const moviesCollectionRef = collection(db,  "movies")

  //New movie State: 
  const [newMovieTitle, setNewMovieTitle] = React.useState("")
  const [newBudget, setNewBudget] = React.useState(0)
  const [isWatched, setIsWatched] = React.useState(false)

  //Update movie Title:
  const [updatedTitle, setUpdatedTitle] = React.useState("")


  async function getMoviesList(){
    try{
      const data = await getDocs (moviesCollectionRef);
      // Filter the data based on the logged-in user's ID
      const filteredData = data.docs.filter((doc) => doc.data().userId === auth.currentUser.uid).map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setMovieList(filteredData)
    } catch (err){
      console.error(err)
    }
  }
  
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        getMoviesList();
      } else {
        // User is signed out.
        setMovieList([]);
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  async function onSubmitMovie(){
    try{
      await addDoc(moviesCollectionRef, {
        Budget: newBudget,
        Title: newMovieTitle, 
        isWatched: isWatched,
        userId: auth.currentUser.uid,
      })

      getMoviesList()
    } catch (err) {
      console.error(err)
    } 
  }

  async function deleteMovie(id){
    try{
      const movieDoc = doc(db, "movies", id)
      await  deleteDoc(movieDoc)
      getMoviesList()
    } catch (err) {
      console.error(err)
    } 
  }
  async function updateMovieTitle(id){
    try{
      const movieDoc = doc(db, "movies", id)
      await  updateDoc(movieDoc, {Title: updatedTitle})
      getMoviesList()
    } catch (err) {
      console.error(err)
    } 
  }

  
  const render1 = movieList.map((item)=> 
  <div>
    <h1 style={{color: item.isWatched ? "green" : "red"}}>{item.Title}</h1>
    <p> Film Budget: ${item.Budget}</p>
    <button onClick = {()=> deleteMovie(item.id)}>Delete Movie</button>
    <input placeholder= "Title Change..." onChange={(e)=> setUpdatedTitle(e.target.value)}/>
    <button onClick={()=> updateMovieTitle(item.id)}>Update</button>
  </div>
  )

  return (
    <div className="App">
      <Auth/>
      <div 
        style={{margin:"20px"}}>
        <input 
         placeholder="Movie title" 
         onChange={(e)=> setNewMovieTitle(e.target.value)}
        />
        <input 
         type = "number" 
         placeholder="Budget" 
         onChange={(e)=> setNewBudget(Number(e.target.value))}
        />
        <input 
         type="checkbox"
         checked= {isWatched}
         onChange={(e)=> setIsWatched(e.target.checked)}
        />
        <label> Watched? </label>
        <button
          onClick = {onSubmitMovie}
        >
         Submit Movie
        </button>
      </div>
      {render1}
    </div>
  );
}

export default App;
