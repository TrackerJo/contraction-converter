import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import contractions from './contractions.json'

function App() {
  const [oldText, setOldText] = useState<string>("")


  const convertToMla = (text: string) => {
    let textDiv = document.createElement('div')

    // Split the text into an array of strings
    const textArray = text.split(' ')
    let newText = ''
    textArray.forEach(word => {

      if(!word.includes("'") && !word.includes("’") && !word.includes("’") ){
        console.log('no apostrophe', word)
        newText += word + ' '
      } else {
        if(word.includes("’")){
          word = word.replace("’", "'")
        }
        let removedPunctuation = removePunctuation(word, false)
        const firstChar = removedPunctuation.punctuation
        word = removedPunctuation.newWord
        console.log('word', word)
        console.log('firstChar', firstChar)
        removedPunctuation = removePunctuation(word, true)
        const lastChar = removedPunctuation.punctuation
        word = removedPunctuation.newWord
        console.log('word', word)
        console.log('lastChar', lastChar)
        //Check if the word is a contraction
        const contraction = contractions[word]
        if(contraction){
          newText += "<span>" + firstChar + contraction[0] + lastChar +  '</span> '
        } else {
          newText += firstChar + word + lastChar + ' '
        }
      }


    });
    console.log(newText)
    textDiv.innerHTML = newText
    document.getElementById('newText')!.innerHTML = newText;

  }

  const removePunctuation = (word: string, reversed: boolean) => {
    let reachedFirstChar = false
    let punctuation = ''
    let newWord = ''
    let i = reversed ? word.length - 1 : 0
    while (i >= 0 && i < word.length) {
      
      if ((word[i] === '.' || word[i] === ',' || word[i] === '!' || word[i] === '?' || word[i] === ';' || word[i] === ':' || word[i] === ')' || word[i] === ']' || word[i] === '}' || word[i] === '"' || word[i] === "'") && !reachedFirstChar) {
        punctuation += word[i]
        
      } else {
        reachedFirstChar = true
        newWord += word[i]
        
      }
      i = reversed ? i - 1 : i + 1

      
    }
    punctuation = reversed ? punctuation.split('').reverse().join('') : punctuation
    newWord = reversed ? newWord.split('').reverse().join('') : newWord
    
    return {newWord, punctuation}
  }


  const copyConvertedText =async () => {
    const textArea = document.getElementById('newText') as HTMLDivElement

    await navigator.clipboard.writeText(textArea.textContent as string);
  }

  return (
    <>
      <h1>Contractions Remover</h1>
      <div className='TextFields'>
        <textarea name="oldText" id="oldText" cols={80} rows={30} placeholder='Enter Text Here' onChange={(e) => {setOldText(e.target.value); convertToMla(e.target.value)}} value={oldText}></textarea>
        <div className={oldText.length == 0 ? "hidden" : "newText"} id="newText"></div>
      </div>
      
      <br />
      <button onClick={() => {copyConvertedText()}}>Copy Converted Text</button>
    </>
  )
}

export default App
