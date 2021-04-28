import { ThemeContext } from 'contexts/ThemeContext'
import React, { useContext } from 'react'
import styled from 'styled-components'

const AlertContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    overflow : auto;
    z-index: 30; 
    display: flex;
    justify-content: center;
    align-items: center;
`
const AlertContent = styled.div`
    background-color: ${props => props.color};
    width: 100%;
    max-width: 640px;
    border-radius: 12px;
    padding: 55px 20px;
    margin: 0 auto;
    min-height: 300px;

    .fa-arrow-alt-circle-up {
        display: block;
        width: fit-content;
        margin: 0 auto;
        margin-bottom: 5px;
    }
    .fa-arrow-alt-circle-up::before {
        color: #cf18a1;
        font-size: 60px;
    }
`

const AlertTitle = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
    color: ${props => props.color };
    font-weight: bold;
    text-align: center;
`
const AlertBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    align-items: center;

`
const AlertLink = styled.a`
    color: #000;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0;
    background: -webkit-linear-gradient(45deg, #1D1EF5 5.3%, #F31AB5 122.3%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	opacity: 0.9;

    .fa-caret-square-right::before {
        background: -webkit-linear-gradient(45deg, #1D1EF5 5.3%, #F31AB5 122.3%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        opacity: 0.9;
    }
`

const Button = styled.button`
    align-items: center;
    border: 0;
    background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
    box-shadow: 0px 4px 31px rgba(186, 19, 88, 0.25);
    border-radius: 39px;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 0.03em;
    line-height: 1;
    opacity: 1;
    outline: 0;
    transition: background-color 0.2s;
    height: 48px;
    padding: 0 24px;
    color: white;
    width: 100%;
    max-width: 320px;
    height: 48px;
    padding: 16px;
    margin-top: 25px;
`

const Alert = (props) => {
    
    const { title, link, handleAlert } = props;
    
    const theme = useContext(ThemeContext);
    return (
        <AlertContainer>
            <AlertContent color={theme.isDark ? '#e6e6e6' : '#17163A' }>
                <AlertTitle color={theme.isDark ? '#000' : 'white' }>{title}</AlertTitle>
                <i className="far fa-arrow-alt-circle-up" />
                <AlertBody>
                    {link ? <AlertLink href={link} target='_blank'>View on BscScan <i className="far fa-caret-square-right"/></AlertLink> : ''}
                    <Button onClick={handleAlert}>Close</Button>
                </AlertBody>
            </AlertContent>
        </AlertContainer>
    )
}

export default Alert
