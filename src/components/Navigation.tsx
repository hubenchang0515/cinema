import 'tdesign-react/es/style/index.css';
import { Menu } from 'tdesign-react';
import { HomeIcon } from 'tdesign-icons-react';
import SearchBox from './SearchBox';

export interface NavigationProps {
    onSearch: (text:string)=>void
}

export default function Navigation(props:NavigationProps) {
    const { HeadMenu, MenuItem } = Menu;
    return (
            <HeadMenu operations={<SearchBox onSearch={props.onSearch}/>}>
                <MenuItem value={'none'} icon={<HomeIcon />} content="首页" href='/'>
                </MenuItem> 
            </HeadMenu>
        )
}