import { createElement, useEffect, useRef, useState } from 'react';
import VolumeSlider from './volumeSlider';
import './App.css';
import bird from './images/Bird.png'
import cat from './images/Cat 1.png'
import chicken from './images/Chicken (2).png'
import cow from './images/Cow.png'
import elephant from './images/Elephant.png'
import frog from './images/Frog.png'
import horse from'./images/Horse.png'
import lion from './images/Lion.png'
import monkey from './images/Monkey.png'
import penguin from './images/Penguin.png'
import pig from './images/Pig (2).png'
import pocketPurse from './images/Pocket Purse.png'
import bloop from './audio/Cartoon Accent.mp3'
import fail from './audio/Fail 2.mp3'
import cheering from './audio/Kids Cheering.mp3'
import singing from './audio/Lucy Lockey Game Audio.mp3'
import Title from './title';

let bloopSound = new Audio(bloop)
let failSound = new Audio(fail)
let cheeringSound = new Audio(cheering)
let singingSound = new Audio(singing)

const allSounds = [bloopSound, failSound, cheeringSound, singingSound]

function AnimalGame() {
  
  const title1 = useRef();
  let playing = true;
  let grid = [];
  let animals = [];
  let count = 0;

  const triggered = useRef(true)
  useEffect(() => {
    if(triggered.current){
      triggered.current = false;
      createGrid()
      placeAnimals()
      placePurse()
      setVolume(.5)
    }
  }, [])
  
  
  const animalImages = [
    bird,
    cat,
    chicken,
    cow,
    elephant,
    frog,
    horse,
    lion,
    monkey,
    pig,
    penguin
  ]

  const purse = pocketPurse
  

  function createGrid() {
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 7; j++) {
        let newDiv = document.createElement('div')
        newDiv.classList.add('grid');
        if(i % 2 === 0) newDiv.classList.add('offsetLeft');
        if(i % 2 !== 0) newDiv.classList.add('offsetRight');
        let container = document.getElementById('container')
        container.appendChild(newDiv)
        grid.push({position: [i,j], reference: newDiv, filled: false, clicked: false})
      }
    }
  }

  function placeAnimals() {
    animalImages.forEach(checkPlacement)
  }

  function checkPlacement(animal){
    let position = Math.floor(Math.random() * grid.length)
      let img = document.createElement('img')
      img.src = animal
      img.classList.add('imgSize')
  
      if(grid[position].filled ) {
        checkPlacement(animal)
        return
      }
      grid[position].filled = true;
      grid[position].reference.appendChild(img)
      animals.push(grid[position].reference)

      grid[position].reference.addEventListener('click', function handleClick(event) {
        if(playing){
          if(grid[position].clicked === false){
            grid[position].clicked = true
            count++
            console.log(count)
            if(grid[position].reference.children[1]){
              foundPurse()
            } else {
              didntFindPurse()
            }
            console.log(grid[position].reference.children[0])
            grid[position].reference.children[0].style.opacity = .2;
        
        }
      }
      });
  }

  function foundPurse(){
    document.getElementsByClassName('purseSize')[0].classList.toggle("is-active")
    stopAllSounds()
    bloopSound.play()
    endGame()
    setTimeout(function(){cheeringSound.play()},400)
  }

  function didntFindPurse() {
    bloopSound.play()
    setTimeout(function(){failSound.play()},500)
    if(count === 2){
      count = 0
      setTimeout(function(){singingSound.play()},4000)
    }
  }

  function placePurse() {
    let placement = Math.floor(Math.random() * animals.length)
    let img = document.createElement('img')
    img.src = purse
    img.classList.add('purseSize')
    img.classList.add('centered')
    animals[placement].append(img)
  }

  function endGame() {
    playing = false
    count = 0
    title1.current.changeTitle(playing)
    clearAllTimeouts()
  }

  function clearAllTimeouts() {
    let highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
    clearTimeout(i); 
    }
  }
  function deleteAnimalsAndPurseAndGrid(){
    grid.forEach(grid => {
      grid.filled = false
      grid.clicked = false
      console.log(grid.reference.children[1])
      if(grid.reference.children[1]) grid.reference.children[1].remove()
      if(grid.reference.children[0]) grid.reference.children[0].remove()
    })
  }
  
  function restartGame() {
      deleteAnimalsAndPurseAndGrid()
      animals = []
      count = 0
      console.log(count)
      stopAllSounds()
      placeAnimals()
      placePurse()
      playing = true
      title1.current.changeTitle(playing)
  }
 console.log(grid)

 function setVolume(volume) {
  if(volume){
    if(volume < 0.04){
      allSounds.forEach(sound => sound.volume = 0 )
      return
    }
    allSounds.forEach(sound => sound.volume = volume )
  }
}

function stopAllSounds() {
  allSounds.forEach(sound => {
     sound.pause()
     sound.currentTime = 0
  })
}

  return (
    <div className='centered'>
      <Title playing={playing} ref={title1}/>
      <h1 onClick={restartGame}>play again?</h1>
      <div id='container' className='centered'>
      </div>
      <VolumeSlider setVolume={setVolume}/>
    </div>
  );
 
}

export default AnimalGame;
