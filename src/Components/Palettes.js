import React, { useEffect, useState } from 'react';
import { palette } from '../myPalettes';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import chroma from 'chroma-js';

function Palettes() {

  const [myPalettes, setMyPalettes] = useState(palette);
  const [paletteName, setPaletteName] = useState('');
  const [lsPalettes, setLsPalettes] = useState([])

  // ad initial palettes to ls
  useEffect(() => {
    myPalettes.forEach((pal, index) => {
      const savedPalette = localStorage.getItem(`myPalette-${pal.name}`)
      if (!savedPalette) {
        localStorage.setItem(`myPalette-${pal.name}`, JSON.stringify(pal))
      }
    })
  },[myPalettes])

  useEffect(() => {
    const palettes = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('myPalette-')) {
        const savedPalette = localStorage.getItem(key)
        if (savedPalette) {
          palettes.push(JSON.parse(savedPalette))
        }
      }
    }

    palettes.sort((a, b) => {
      return a.createdAt - b.createdAt
    })

    setLsPalettes(palettes)
  }, [])

  const generateRandomColors = () => {
    const colors = []

    while(colors.length < 10) {
      const color = chroma.random().hex();
      if (chroma.valid(color)) {
        colors.push(color)
      }
    }

    return colors;
  }



  const addPalette = () => {
    const newPalette = {
      id: new Date().getTime(),
      name: slugify(paletteName),
      createdAt: new Date().getTime(),
      colors: generateRandomColors()
    }

    // check if it exist in ls
    const key = `myPalette-${newPalette.name}`;
    const savedPalette = localStorage.getItem(key);
    if (savedPalette) {
      return 
    }

    // add to ls if palette don't exist
    localStorage.setItem(key, JSON.stringify(newPalette));
    // add new Palette to ls
    setLsPalettes([...lsPalettes, newPalette])

    setMyPalettes([...myPalettes, newPalette])

    setPaletteName('')
  }

  return (
    <PalettesStyled>
      <div className='add-palette'>
        <div className='input-control'>
          <input type="text" placeholder="Create Palette..." value={paletteName} onChange={(e) => {
            setPaletteName(e.target.value)
          }} />
          <button onClick={() => {
            addPalette()
          }}>+</button>
        </div>
      </div>
      <div className='palettes'>
        {
          lsPalettes.map((pal, index) => {
            return <Link to={`/palette/${pal.name}`} key={pal.name}>
              <div key={index} className='palette'>
                {pal.colors.map((col, i) => {
                  return <div key={i} className='color' style={{backgroundColor: col}}>
                  </div>
                })}
              </div>
              <p>{pal.name}</p>
            </Link>
          })
        }
      </div>
    </PalettesStyled>
  )
}

const PalettesStyled = styled.div`
  position: relative;
  z-index: 5;
  .add-palette {
    padding-left: 18rem;
    padding-right: 18rem;
    padding-top: 4rem;
    padding-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 0 auto;
    transition: all .3s ease;
    @media screen and (max-width: 1670px) {
      width: 70%;
    }
    @media screen and (max-width: 1320px) {
      width: 90%;
    }
    @media screen and (max-width: 970px) {
      width: 100%;
      padding-left: 10rem;
      padding-right: 10rem;
    }
    @media screen and (max-width: 600px) {
      width: 100%;
      padding-left: 4rem;
      padding-right: 4rem;
      padding-top: 2rem;
      padding-bottom: 1.5rem;
    }
    input, button {
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
    }
    .input-control {
      position: relative;
      width: 100%;
      box-shadow: 1px 4px 15px rgba(0, 0, 0, 0.12);
      input {
        width: 100%;
        padding: .5rem 1rem;
        border-radius: 7px;
        &::placeholder {
          color: #7263F3;
          opacity: 0.3;
        }
      }
      button {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 2px 1rem;
        cursor: pointer;
        font-size: 2rem;
        height: 100%;
        border-radius: 7px;
        background-color: #7263F3;
        color: white;
        transition: all .3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: #5A4ED1;
        }
      }
    }
  }
  .palettes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 25px;
    padding: 2rem 18rem;
    transition: all .3s ease;
    @media screen and (max-width: 1432px) {
      padding: 2rem 10rem;
    }
    @media screen and (max-width: 1164px) {
      padding: 2rem 5rem;
    }
    @media screen and (max-width: 600px) {
      padding: 1rem 2rem;
    }
    a {
      text-decoration: none;
      display: inline-block;
      padding: 1rem;
      background-color: white;
      border-radius: 7px;
      box-shadow: 1px 3px 20px rgba(0, 0, 0, 0.2);
    }
    p {
      font-size: 1.5rem;
      padding-top: .5rem;
      display: inline-block;
      background: linear-gradient(90deg, #7263F3 20%, #F56692  50%, #6FCF97 60%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .palette {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      width: 100%;
      height: 250px;
      .color {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default Palettes