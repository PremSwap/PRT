import React, { useEffect, lazy, useState, useContext } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ETH_PRICE, TOKEN_DATA } from 'apollo/queries'
import { client } from 'apollo/client'
import { Button, ResetCSS } from '@pancakeswap-libs/uikit'
import "./css/change.css"
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPriceList, useFetchProfile, useFetchPublicData } from 'state/hooks'
import { ThemeContext } from 'contexts/ThemeContext'
import Claim from 'views/Home/components/Claim'
import NewFarms from 'views/NewFarms/NewFarms'
import useGetDocumentTitlePrice from './hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import GlobalCheckBullHiccupClaimStatus from './views/Collectibles/components/GlobalCheckBullHiccupClaimStatus'
import history from './routerHistory'



// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const Profile = lazy(() => import('./views/Profile'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const attributes = {
    logo: {
      display: 'flex',
      alignItems: 'center',
      height: '64px',
      marginLeft: '16px',
      marginBottom: '24px'
    },
    text: {
      fontSize: '25px',
      marginLeft: '10px',
      fontWeight: 'bold',
      fontFamily: `'Tajawal', sans-serif`,
      paddingTop: `8px`
    },
    price: {
      display: 'flex',
      alignItems: 'center',
      width: '130px',
      height: '40px',
      borderRadius: '5px',
      justifyContent: 'center',
    },
    priceText: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.5',
      marginLeft: '10px',
      color: '#fff'
    },
    addressButton: {
      background: 'linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%)',
      boxShadow: '0px 4px 31px rgba(186, 19, 88, 0.25)',
      borderRadius: '39px',
      color: '#ffffff'
    },
    bodyTagDarkTheme: {
      backgroundImage: `url('/images/new/themeDark.png')`,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'bottom',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      scrollBehavior: 'smooth',
    },
    bodyTagLightTheme: {
      backgroundImage: `url('/images/new/themeLight.png')`,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    }
}
const listNewIcon = [
  "/images/new/home.svg",
  "/images/new/trade2x.svg",
  "/images/new/farm.svg",
  "/images/new/pool.svg",
  "/images/new/yield.svg",
  "/images/new/info.svg",
  "/images/new/audit.svg",
]

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released

  const [toggleMenu, setToggleMenu] = useState(false);
  const [priceUSD, setPriceUSD] = useState(0);
  const theme = useContext(ThemeContext);
  
  /** call api get price */
  useEffect(() => {
    async function fetchData() {
      try {
        const ethPrice = await client.query({
          query: ETH_PRICE(),
          fetchPolicy: 'cache-first',
        })
        const result = await client.query({
          query: TOKEN_DATA('0x141b68f1e1f0d730dee3012c081212dc65140d7b'),
          fetchPolicy: 'cache-first',
        })
        const tempEth = ethPrice?.data?.bundles[0].ethPrice;
        const tempDerived = result?.data?.tokens[0].derivedETH;
        const price = tempDerived * tempEth;

        setPriceUSD(price);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  },[priceUSD])

  /** change logo and icons in sidebar */
  useEffect(() => {  
    const img = document.createElement('img');
    const text = document.createElement('span');
    img.src = "/images/new/new-logo.png";
    img.width = 40;
    img.height = 40;

    text.innerHTML = 'PremSwap';
    Object.keys(attributes.text).forEach((key) => {
      text.style[key] = attributes.text[key]; 
    })

    const sideBar = document.getElementsByTagName('div')[8];
    if(sideBar) {
      const menu = sideBar.children[0];
      const listSVG = [];
      const listMenu = document.getElementsByTagName('a');
      
      for (let index = 2; index < listMenu.length; index++) {
        const element = listMenu[index];
        if(index < 9){
          listSVG.push(element); 
        }  
      }
      
      for (let index = 0; index < listSVG.length; index++) {
        const element = listSVG[index];
        element.id = `menu${index}`;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.dataset.src = listNewIcon[index];
        svg.classList.add('svgClass');
        if(index === 3 || index === 4 || index === 6){
          element.classList.add('disableClass');
        }
        element.replaceChild(svg,element.firstChild);
      }

      
      // logo
      const logo = document.createElement('p');
      logo.id = "logo-lg";
      if(document.getElementById('logo-lg')) {
          return;
      }
      Object.keys(attributes.logo).forEach((key) => {
        logo.style[key] = attributes.logo[key];
      })
      logo.appendChild(img);
      logo.appendChild(text);

      if(window.innerWidth >= 968) {
        sideBar.style.zIndex = '22';
        sideBar.style.paddingTop = '0';
        menu.insertBefore(logo,menu.firstChild);
        logo.nextElementSibling.setAttribute('style','margin-top: 15px');
      }
    }
  },[])
  /** handle history path change */
  useEffect(() => {
    const iconHome = document.getElementById('menu0');
    if(history.location.pathname !== '/') {     
      iconHome.classList.remove('active');
      iconHome.classList.add('inActive');
    }else {
      iconHome.classList.add('active');
      iconHome.classList.remove('inActive');
    }    
    history.listen((location) => { 
      if(location.pathname !== '/') {     
        iconHome.classList.remove('active');
        iconHome.classList.add('inActive');
      }else {
        iconHome.classList.add('active');
        iconHome.classList.remove('inActive');
      } 
    })  
  }, [])

  useEffect(() => {
    console.warn = () => null;
    /* change icon and name page */
    const list = document.getElementsByTagName('a')[0];
    const length = list.children.length;

    for (let i = 0; i < length; i++) {
      if (list.contains(list.children[0])) {
        list.removeChild(list.children[0]);
      }
    }
    const img = document.createElement('img');
    const text = document.createElement('span');
    img.src = "/images/new/new-logo.png";
    img.width = 40;
    img.height = 40;

    text.innerHTML = 'PremSwap';
    text.classList.add('nameLogo');
    Object.keys(attributes.text).forEach((key) => {
      text.style[key] = attributes.text[key]; 
    })

    list.appendChild(img);
    list.appendChild(text);
    
    /** hide profile icon */
    const profileIcon = document.getElementsByTagName('div')[5];

    const addressButton = document.getElementsByTagName('div')[4];
    addressButton.style.display = 'flex';
    const claimButton = document.getElementById("refButton");
    claimButton.style.paddingRight = '7px';
    addressButton.insertBefore(claimButton, addressButton.firstChild);
    profileIcon.style.display = 'none';
    /** change icon telegram and twitter */
    const toggleElement = document.getElementsByTagName('button')[0];
    if(window.innerWidth >= 968) {
      toggleElement.style.display = 'none';
      list.style.marginLeft = '24px';
    }
    toggleElement.onclick = function () {
      const temp = !toggleMenu;
      setToggleMenu(temp);
    }

    const domMenu = document.getElementsByTagName('div')[8];
    setTimeout(() => {
      const isToggleMenu = window.getComputedStyle(domMenu).width === '0px' || window.getComputedStyle(domMenu).width === '56px';
      if (!isToggleMenu) {
        const groupSocial = document.getElementsByTagName('div')[27];
        
        /* change price  */
        const img2 = document.createElement('img');
        img2.src = "/images/new/new-logo.png";
        img2.width = 20;
        img2.height = 20;
        const price = document.querySelectorAll('div')[25];    
        const anchor = document.createElement('a');
        Object.keys(attributes.price).forEach((key) => {
          anchor.style[key] = attributes.price[key]; 
        })
        anchor.href = 'https://info.premswap.com';

        const priceText = document.createElement('span');
        priceText.innerHTML = `$ 0`;
        Object.keys(attributes.priceText).forEach((key) => {
          priceText.style[key] = attributes.priceText[key]; 
        })

        anchor.appendChild(img2);
        anchor.appendChild(priceText);
        if(price) {
          price.classList.add('dark');
          price.removeChild(price.children[0]);
          price.insertBefore(anchor, price.firstChild);
        }

        const twitter = document.getElementsByTagName('div')[26].children[1];
          
        if (twitter) {
          twitter.setAttribute('href', 'https://twitter.com/PremSwap');
        }

        if(document.getElementById('telegram')) {
          return;
        }
        
        const telegram = document.createElement('a');
        telegram.href = 'https://t.me/PremSwapOffcial';
        telegram.id = 'telegram';

        if(localStorage.getItem('IS_DARK') === 'true') {
          priceText.style.color = '#fff';
        }else {
          priceText.style.color = '#29274B';
        }
        telegram.innerHTML = '<i class="fab fa-telegram telegram"></i>';
        telegram.setAttribute('style', 'margin-left: 15px; display: flex; align-items: center; padding-top: 2px; color: #ABAADD');
        groupSocial.replaceChild(telegram, groupSocial.firstChild);
        groupSocial.style.flexDirection = 'row-reverse';

        // bottom menu icons
        const iconDark = document.getElementsByTagName('svg')[11];
        const iconLang = document.getElementsByTagName('svg')[12];
        if(iconDark && iconLang) {
          iconDark.id = 'iconDark';
          iconDark.classList.add('iconDarkTheme');   
          iconLang.id = 'iconLang';
          iconLang.classList.add('iconLang');
        }
      }
    }, 300)

  }, [toggleMenu,priceUSD])

  /** change theme */
  useEffect(() => {
    const bodyTag = document.getElementsByTagName('body')[0];
    const addressButton = document.getElementsByTagName('button')[2];
    const nav = document.getElementsByTagName('nav')[0];
    const logoHeader = document.getElementsByTagName('a')[0];
    const h2 = document.getElementsByTagName('h2');
    const price = document.querySelectorAll('div')[25]; 
    const logoSideBar = document.getElementById('logo-lg');
    const iconDark = document.getElementById('iconDark');
    const iconLang = document.getElementById('iconLang');

    if(addressButton) {
      Object.keys(attributes.addressButton).forEach((key) => {
        addressButton.style[key] = attributes.addressButton[key]; 
      })
    }

    if(iconDark) {
      iconDark.classList.add('iconDarkTheme');
    }

    if(theme.isDark) {
      Object.keys(attributes.bodyTagDarkTheme).forEach((key) => {
        bodyTag.style[key] = attributes.bodyTagDarkTheme[key]; 
      })
      nav.style.background = '#161337';
      logoHeader.style.color = '#fff';
      if(price){
        price.classList.remove('light');
        price.classList.add('dark');
      }
      if(logoSideBar){
        logoSideBar.style.color = '#fff';
      }
      if(h2[0] && h2[1]) {
        h2[0].style.webkitTextFillColor = '#fff';
        h2[1].style.webkitTextFillColor = '#fff';
      }
      if(iconLang){
        iconLang.classList.add('iconLangDark');
        iconLang.classList.remove('iconLang');
        iconLang.nextElementSibling.setAttribute('style','color:#fff');
      }
    }else {
      Object.keys(attributes.bodyTagLightTheme).forEach((key) => {
        bodyTag.style[key] = attributes.bodyTagLightTheme[key]; 
      })
      nav.style.background = '#e6e6e6';
      logoHeader.style.color = '#000';
      if(price){
        price.classList.remove('dark');
        price.classList.add('light');
      }
      if(logoSideBar){
        logoSideBar.style.color = '#110f37';
      }
      if(h2[0] && h2[1]) {
        h2[0].style.webkitTextFillColor = 'transparent';
        h2[1].style.webkitTextFillColor = 'transparent';
      }
      if(iconLang){
        iconLang.classList.add('iconLang');
        iconLang.classList.remove('iconLangDark');
        iconLang.nextElementSibling.setAttribute('style','color:#29274B');
      }
    }
  },[theme.isDark])
  
  useEagerConnect()
  useFetchPublicData()
  useFetchProfile()
  useFetchPriceList()
  useGetDocumentTitlePrice()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <NewFarms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route>
            <Route path="/collectibles">
              <Collectibles />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            {/* Redirect */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <GlobalCheckBullHiccupClaimStatus />
      <p id="refButton">
        <Button height="32px">Referral link</Button>
      </p>
    </Router>
  )
}

export default React.memo(App)

