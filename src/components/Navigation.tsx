import 'tdesign-react/es/style/index.css';
import { Button, Menu, Space } from 'tdesign-react';
import { HomeIcon, LogoGithubFilledIcon } from 'tdesign-icons-react';
import SearchBox from './SearchBox';

export interface NavigationProps {
    onSearch: (text:string)=>void
}

export default function Navigation(props:NavigationProps) {
    const { HeadMenu, MenuItem } = Menu;
    return (
            <HeadMenu operations={
                <Space align='center'>
                    <Button icon={<LogoGithubFilledIcon/>} size="large" variant="text" shape="square" href='https://github.com/hubenchang0515/cinema'/>
                    <SearchBox onSearch={props.onSearch}/>
                </Space>
            }>
                <MenuItem value={'none'} icon={<HomeIcon />} content="首页" href='/'>
                </MenuItem> 
            </HeadMenu>
        )
}