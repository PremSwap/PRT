import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    href: 'http://exchange.premswap.com/'
    // initialOpenState: true,
    // items: [
    //   {
    //     label: 'Exchange',
    //     href: 'https://exchange.richlabswap.com/swap',
    //   },
    //   {
    //     label: 'Liquidity',
    //     href: 'https://exchange.richlabswap.com/pool',
    //   },
    // ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'pool',
  },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: 'https://pancakeswap.finance/lottery',
  // },
  {
    label: 'Yield Aggregator',
    icon: 'NftIcon',
    href: 'https://richlabexchange.com/auction',
  },
  // {
  //   label: 'RichLabExchange',
  //   icon: 'IfoIcon',
  //   href: 'https://richlabexchange.com'
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: 'https://pancakeswap.finance/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: 'https://pancakeswap.finance/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: 'https://pancakeswap.finance/profile',
  //     },
  //   ],
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    href: 'http://info.premswap.com/'
    // items: [
    //   {
    //     label: 'Overview',
    //     href: 'https://info.richlabswap.com/home',
    //   },
    //   {
    //     label: 'Tokens',
    //     href: 'https://info.richlabswap.com/tokens',
    //   },
    //   {
    //     label: 'Pairs',
    //     href: 'https://info.richlabswap.com/pairs',
    //   },
    //   {
    //     label: 'Accounts',
    //     href: 'https://info.richlabswap.com/accounts',
    //   },
    // ],
  },
  {
    label: 'Audit by Certik',
    icon: 'IfoIcon',
    href: 'https://pancakeswap.finance/ifo',
  },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     {
  //       label: 'Voting',
  //       href: 'https://voting.pancakeswap.finance',
  //     },
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/pancakeswap',
  //     },
  //     {
  //       label: 'Docs',
  //       href: 'https://docs.pancakeswap.finance',
  //     },
  //     {
  //       label: 'Blog',
  //       href: 'https://pancakeswap.medium.com',
  //     },
  //   ],
  // },
]

export default config

