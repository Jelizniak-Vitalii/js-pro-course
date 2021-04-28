import React,{useState} from 'react';
import './App.css';
import data from './emojiList.json';
import EmojiContainer from './components/EmojiContainer.jsx'
import './components/form.css'

function App() {
  const [inputValue, setInputValue] = useState('');

  const onFormSubmit = (ev)=>{
    ev.preventDefault();
  }
  const onInputChange = (ev) =>{
    setInputValue(ev.target.value)
  }
  const emojiList = data.filter((el) => el.title.includes(inputValue))
  return (
    <form onChange={onFormSubmit} className='form'>
      <input value={inputValue} onChange={onInputChange} className='form__input'></input>
      {inputValue !=='' ? <EmojiContainer emojiList={emojiList}/> : null}
    </form> 
    
  )

}

export default App;
