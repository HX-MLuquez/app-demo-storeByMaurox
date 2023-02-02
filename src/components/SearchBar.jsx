import styles from './SearchBar.module.css'
import {useState} from 'react'

export default function SearchBar(props) {
    const [character,setCharacter]= useState("")
    function handleInput (event){
        setCharacter(event.target.value)
    }
    function onSearchOptimus(){
      props.onSearch(character)
      setCharacter("")
    }
    return (
       <div className={styles.search}>
          <input type='text' name='search' placeholder='type id'
          onChange={(e)=>handleInput(e)} value={character} />
       <button onClick={onSearchOptimus}>Search</button>
       </div>
    );
 }
 