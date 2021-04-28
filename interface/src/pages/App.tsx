import React, { Suspense, useContext, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { ThemeContext } from 'ThemeContext'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure } from './AddLiquidity/redirects'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import AddLiquidity from './AddLiquidity'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import Menu from '../components/Menu'
import useGetDocumentTitlePrice from '../hooks/useGetDocumentTitlePrice'
import NewFarms from './NewFarms/NewFarms'



const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: bottom 24px center;
  background-size: 90%;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: calc(100vh - 64px);
  }
`

const Marginer = styled.div`
  margin-top: 5rem;
`
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
    fontWeight: '700',
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

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6
  const [toggleMenu, setToggleMenu] = useState(false);
  const theme = useContext(ThemeContext);
  const credentials: Credentials = {
    token: apiKey,
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

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

    const sideBar = document.getElementsByTagName('div')[10];
    
    if(sideBar) {
      const menu = sideBar.children[0];
      const listSVG: HTMLAnchorElement[] = [];
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
        if(index === 4 || index === 6) {
          element.classList.add('disableClass');
        }
        element.replaceChild(svg,element.children[0]);
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
        if(logo.nextElementSibling) {
          logo.nextElementSibling.setAttribute('style','margin-top: 15px');
        }
      }
    }
  },[])

  /** handle history path change */
  useEffect(() => {
    const iconHome = document.getElementById('menu0');
    if(window.location.hash === '#/swap' && iconHome) {       
      iconHome.classList.remove('active');
      iconHome.classList.add('inActive');
    }  
    window.addEventListener('popstate', (event) => {
      if(window.location.hash === '#/swap' && iconHome) {       
        iconHome.classList.remove('active');
        iconHome.classList.add('inActive');
      }   
    });
  }, [])
  
  useEffect(() => {
    const storedLangCode = localStorage.getItem('pancakeSwapLanguage')
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
    /* change icon and name page */
    const list = document.getElementsByTagName('a')[0];
    const length = list.children.length;

    for (let i = 0; i < length; i++) {
      list.removeChild(list.children[0]);
    }
    const img = document.createElement('img');
    const img2 = document.createElement('img');
    const text = document.createElement('span');
    img.src = "/images/new/new-logo.png";
    img.width = 40;
    img.height = 40;
    img2.src = "/images/new/new-logo.png";
    img2.width = 20;
    img2.height = 20;

    text.innerHTML = 'PremSwap';
    text.classList.add('nameLogo');
    Object.keys(attributes.text).forEach((key) => {
      text.style[key] = attributes.text[key]; 
    })

    list.appendChild(img);
    list.appendChild(text);
    /** hide profile icon */
    document.getElementsByTagName('div')[8].style.display = 'none'; 
    /** change icon telegram and twitter */
    const toggleElement = document.getElementsByTagName('button')[0];
    if(window.innerWidth >= 968) {
      toggleElement.style.display = 'none';
      list.style.marginLeft = '24px';
    }
    toggleElement.onclick = () => {
      const temp = !toggleMenu;
      setToggleMenu(temp);
    }
    const telegram = document.createElement('a');
    telegram.href = 'https://t.me/RLEswap';

    const domMenu = document.getElementsByTagName('div')[10];
    setTimeout(() => {
      const isToggleMenu = window.getComputedStyle(domMenu).width === '0px' || window.getComputedStyle(domMenu).width === '56px';

      if (!isToggleMenu) {
        /* change price  */
        const price = document.querySelectorAll('div')[27]; 
        
        const anchor = document.createElement('a');
        Object.keys(attributes.price).forEach((key) => {
          anchor.style[key] = attributes.price[key]; 
        })
        anchor.href = 'https://info.richlabswap.com/token/0x141b68f1e1f0d730dee3012c081212dc65140d7b';

        const priceText = document.createElement('span');
        priceText.innerHTML = "$ 0";
        Object.keys(attributes.priceText).forEach((key) => {
          priceText.style[key] = attributes.priceText[key]; 
        })

        anchor.appendChild(img2);
        anchor.appendChild(priceText);
        if(price) {
          price.removeChild(price.children[0]);
          price.insertBefore(anchor, price.firstChild);
        }
        
        const groupSocial = document.getElementsByTagName('div')[29];
        const twitter = document.getElementsByTagName('div')[28].children[1];
        if (twitter) {
          twitter.setAttribute('href', 'https://twitter.com/Richlabexchange');
        }
        if (groupSocial.contains(groupSocial.children[0])) {         
          groupSocial.removeChild(groupSocial.children[0]);
        }

        if(localStorage.getItem('IS_DARK') === 'true') {
          priceText.style.color = '#fff';
        }else {
          priceText.style.color = '#29274B';
        }
        telegram.innerHTML = '<i class="fab fa-telegram telegram"></i>';
        telegram.setAttribute('style', 'margin-left: 15px; display: flex; align-items: center; padding-top:2px;  color: #ABAADD');
        groupSocial.insertBefore(telegram, groupSocial.firstChild);
        document.getElementsByTagName('div')[28].style.flexDirection = 'row-reverse';
      
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
    },300)
  }, [toggleMenu])

  /** change theme */
  useEffect(() => {
    const bodyTag = document.getElementsByTagName('body')[0];
    const addressButton = document.getElementsByTagName('button')[1];
    const nav = document.getElementsByTagName('nav')[0];
    const logoHeader = document.getElementsByTagName('a')[0];
    const h2 = document.getElementsByTagName('h2');
    const price = document.querySelectorAll('div')[27]; 
    
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
        if(iconLang.nextElementSibling) {
          iconLang.nextElementSibling.setAttribute('style','color:#fff');
        }
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
        if(iconLang.nextElementSibling) {
          iconLang.nextElementSibling.setAttribute('style','color:#29274B');
        }
      }
    }
  },[theme.isDark]) 

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch((error) => {
        setTranslations(['error'])
        console.error(error)
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  useGetDocumentTitlePrice()

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
              <Menu>
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/swap" component={Swap} />
                      <Route exact strict path="/find" component={PoolFinder} />
                      <Route exact strict path="/pool" component={Pool} />
                      <Route exact strict path="/farms" component={NewFarms} />
                      <Route exact path="/add" component={AddLiquidity} />
                      <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                      {/* Redirection: These old routes are still used in the code base */}
                      <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                      <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                      <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />

                      <Route component={RedirectPathToSwapOnly} />
                    </Switch>
                  </Web3ReactManager>
                  <Marginer />
                </BodyWrapper>
              </Menu>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}

