
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { ThemeContext } from 'ThemeContext';

const data = [
    {   
        id: 1,
        title: 'PRT - BNB LP',
        logo: '/images/new/Group74.png',
        text_bottom: 'PRT - BNBLP STAKED'
    },
    {   
        id: 2,
        title: 'PRT - BUSD LP',
        logo: '/images/new/Group74.png',
        text_bottom: 'PRT-BUSDLP STAKED'
    },
    {   
        id: 3,
        title: 'BUSD - BNB LP',
        logo: '/images/new/Group73.png',
        text_bottom: 'BUSD-BNBLP STAKED'
    }
]

const FarmHeader = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 13px;

    h2 {
        font-size: 40px;
        font-family: 'Tajawal', sans-serif;
        font-weight: bold;
        color: ${(props) => props.color === 'true' ? '#fff' : '#110F37'}
    }
    
    p {
        font-family: 'Tajawal', sans-serif;
        font-size: 16px;
        color: ${(props) => props.color === 'true' ? '#ABAADD' : '#4B4A84'}
    }
`

const FarmTabs = styled.div`
    margin: 0 auto;
    width: fit-content;
    margin-top: 39px;
    margin-bottom: 37px;
    border-radius: 39px;
    font-family: 'Tajawal', sans-serif;
    border: 1px solid transparent;
    background: ${props => props.color === 'true' ? 'linear-gradient(#110F34,#110F34) padding-box,linear-gradient(180deg, #1D1EF5 5.3%, #F31AB5 122.3%) border-box;' : 
    'linear-gradient(#ececff,#ececff) padding-box,linear-gradient(180deg, #1D1EF5 5.3%, #F31AB5 122.3%) border-box;'};
    box-shadow: 0px 4px 31px rgba(186, 19, 88, 0.25);
`

const FarmContent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0 10px;
    align-items: center;
    .item {
        min-width: 295px;
        min-height: 492px;
        padding-left: 29px;
        padding-right: 29px;
        margin-bottom: 15px;
        background-color: ${props => props.color === 'true' ? '#110F37' : '#fff'}
    }
    .item-top {
        display: flex;
        padding-top: 38px;
        .group-icon {
            margin-right: 20px;
        }
        .title {
            .title-main {
                font-size: 22px;
                line-height: 26px;
                font-weight: bold;
            }
            .wrap-core {
                display: flex;
                align-items: center;
                & > span {
                    background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
                    border-radius: 39px;
                    padding: 6px 7px 0;
                    line-height: 19px;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    font-family: 'Tajawal', sans-serif;
                }
                .core {
                    display: flex;
                    font-size: 16px;
                    line-height: 19px;
                    padding: 2px;
                    align-items: center;
                    justify-content: space-around;
                    border-radius: 39px;
                    width: 71px;
                    margin-right: 10px;
                    background: ${props => props.color === 'true' ? 'linear-gradient(#110F37,#110F37) padding-box,linear-gradient(180deg, #1D1EF5 5.3%, #F31AB5 122.3%) border-box;' : 
                    'linear-gradient(#fff,#fff) padding-box,linear-gradient(180deg, #1D1EF5 5.3%, #F31AB5 122.3%) border-box;'};
                }
            }
        }
    }
    .item-main {
        margin-top: 50px;
        & > p:last-child {
            font-weight: bold;
            text-align: left;
            margin-bottom: 15px;
            color: ${(props) => props.color === 'true' ? '#fff' : '#0b0b26'}
        }
        .flex {
            font-size: 16px;
            line-height: 19px;
            & > p:first-child {
                width: 40%;
                padding-top: 8px;
            }
            & > div {
                text-align: right;
                width: 60%;
                font-weight: bold;
                font-size: 22px;
                font-family: 'Tajawal', sans-serif;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: ${(props) => props.color === 'true' ? '#fff' : '#0b0b26'};
                img {
                    height: 16px;
                    margin-right: 10px;
                }
                p {
                    padding-top: 8px;
                    font-weight: bold;
                    color: ${(props) => props.color === 'true' ? '#fff' : '#0b0b26'};
                }
            }
            & > p:last-child {
                width: 60%;
                padding-top: 8px;
                text-align: right;
                font-weight: bold;
                color: ${(props) => props.color === 'true' ? '#fff' : '#0b0b26'};
            }
        }
        .harvest {
            display: flex;
            margin-top: 15px;
            margin-bottom: 15px;
            padding-left: 10px;
            align-items: center;
            justify-content: space-between;
            button {
                height: 66px;
                max-width: 170px;
                padding: 0 45px;
                border-radius: 9px;
                border: none;
                outline: none;
                cursor: pointer;
                color: ${(props) => props.color === 'true' ? '#abaadd' : '#414076'};
                background-color: ${props => props.color === 'true' ? '#0b0b26' : '#ececff'};
            }
        }
    }
    .item-bottom {
        & > p {
            margin: 20px 0;
            line-height: 19px;
            font-size: 16px;
            background: -webkit-linear-gradient(272deg, #1D1EF5 5.3%, #F31AB5 122.3%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
    ${({ theme }) => theme.mediaQueries.lg} {
        justify-content: center;
        flex-direction: row;
        .item {
            max-width: 350px;
            width: 33%;
            min-width: unset;
        }
        .item:not(.item:first-child) {
            margin-left: 20px;
        }
    }
`
const NewFarms = () => {
    const theme = useContext(ThemeContext)
    const [activeState, setActiveState] = useState(true)
    const tag1Classes = `tab-link ${ activeState ? 'tabActive' : 'tabInactive'}`
    const tag2Classes = `tab-link ${ !activeState ? 'tabActive' : 'tabInactive'}`
    function openTag(tagState) {  
        setActiveState(tagState)
    }
    
    return (
        <>
            <FarmHeader color={(theme.isDark).toString()}>
                <h2>Stake LP tokens to earn PRT</h2>
                <p>Every time you stake and unstake LP tokens, the contract will automatically give PRT rewards for you</p>
                <p>Reward are calculated per Block</p>
                <FarmTabs color={(theme.isDark).toString()}>
                    <button className={tag1Classes} type='button' onClick={() => openTag(true)}>Active</button>
                    <button className={tag2Classes} type='button' onClick={() => openTag(false)}>Inactive</button>
                </FarmTabs>
                <FarmContent color={(theme.isDark).toString()}>
                    {
                        data.map((e) => {
                            const { id } = e;
                            return (<div className="item" key={id}>
                            <div className="item-top">
                                <div className="group-icon">
                                    <img src={e.logo} alt=""/>
                                </div>
                                <div className="title">
                                    <p className="title-main">
                                        {e.title}
                                    </p>
                                    <div className="wrap-core">
                                        <p className="core">
                                            <img src="/images/new/Core.png" alt=""/>
                                            <span>Core</span>
                                        </p>
                                        <span>25x</span>
                                    </div>
                                </div>
                            </div>
                            <div className="item-main">
                                <div className="flex">
                                    <p>APY</p>
                                    <div>
                                        <img src="/images/new/calc.png" alt=""/>
                                        <p className="pt">
                                        1988.98%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <p>EARN</p>
                                    <p>PRT</p>
                                </div>
                                <div className="normal">
                                    <p>PRT EARNED</p>
                                    <div className="harvest">
                                        <p>0</p>
                                        <button type="button">Harvest</button>
                                    </div>
                                </div>
                                <p>{e.text_bottom}</p>
                            </div>
                            <div className="item-bottom">
                                <button type="button" className="styleButton">Unlock Wallet</button>
                                <p>Detail <img src="/images/new/DownArrow.svg" alt=""/></p>
                            </div>
                        </div>)
                    })}
                </FarmContent>
            </FarmHeader>
        </>
    )
}

export default NewFarms;