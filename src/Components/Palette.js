import React from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { palette } from '../myPalettes';

const del = <i className='fa-sharp fa-solid fa-trash'></i>
const brush = <i className='fa-solid fa-brush'></i>
const paletteIcon = <i className='fa-solid fa-palette'></i>

function Palette() {

  const {id} = useParams()
  const initialPalette = palette.find(pal => pal.name === id)

  const [myPalette, setMyPalette] = React.useState(initialPalette);
  const [toRgb, setToRgb] = React.useState('hex');

  const toggleToRgb = (e) => {
    if (e.target.value === 'rgb') {
      setToRgb('rgb')
    } else {
      setToRgb('hex')
    }
  }

  const convertToRgb = (hex) => {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgb(${r}, ${g}, ${b})`
  }

  const handleColorChange = (color) => {

  }

  const createColor = () => {

  }

  const deleteColor = (index) => {
    const newColors = [...myPalette.colors]
    newColors.splice(index, 1)
    setMyPalette({...myPalette, colors: newColors})
  }

  const clear = () => {
    setMyPalette({...myPalette, colors: []})
  }

  return (
    <PaletteStyled>
    <div className='header-items'>
      <div className='link-con'>
        <Link to={'/'}>&larr;&nbsp; Back</Link>
      </div>
      <div className='select-type'>
        <select value={toRgb} onChange={toggleToRgb}>
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
        </select>
      </div>
      <div className='right'>
        <button className='btn-icon'>
          {paletteIcon}
        </button>
        <button className='btn-icon' onClick={clear}>{brush}</button>
      </div>
    </div>
      <div className='colors'>
        {myPalette.colors.map((color, index) => {
          return <div key={index} style={{background: color}} className='full-color'>
            <h4>
              {toRgb === 'hex' ? color : convertToRgb(color)}
            </h4>
            <button className='btn-icon' onClick={() => {
              deleteColor(index);
            }}>{del}</button>
          </div>
        })}
      </div>
    </PaletteStyled>
  )
}

const PaletteStyled = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;

  .btn-icon {
    outline: none;
    cursor: pointer;
    font-size: 1.5rem;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem 1rem;
    border-radius: 7px;
    color: white;
    background: #A855F7;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #0D0B33;
    }
  }

  .header-items {
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    background-color: #FFF;

    .link-con {
      a {
        text-decoration: none;
        font-family: inherit;
        font-size: inherit;
        color: #000;
        font-weight: 500;
        width: 50%;
      }
    } 

    select {
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        outline: none;
        color: #FFF;
        background-color: #000;
        cursor: pointer;
      }

      .right {
        display: flex;
        align-items: center;
        gap: .8rem;
        button:last-child {
          background-color: red;
        }
      }
  }

  .colors {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    height: 94vh;

    .full-color {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      h4 {
        font-size: 1.2rem;
        color: #FFF;
        text-transform: uppercase;
        font-weight: 700;
        text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
        pointer-events: none;
      }

      button {
        position: absolute;
        right: 0;
        bottom: 0px;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding: .3rem .4rem;
        font-size: 1.1rem;
        color: #FFF;
        background: transparent;
        filter: drop-shadow(0 3px 0.3rem rgba(0, 0, 0, 0.4));
      }
    }
  }
`;

export default Palette