import 'tdesign-react/es/style/index.css';
import { Input, Button } from 'tdesign-react';
import { SearchIcon } from 'tdesign-icons-react';
import { useState } from 'react';

export interface SearchBoxProps {
    onSearch: (text:string)=>void
}

export default function SearchBox(props:SearchBoxProps) {
    const [text, setText] = useState('');
    return (
        <Input 
            placeholder='搜索' 
            borderless 
            onChange={(v) => {setText(v)}}
            onEnter={(v) => {props.onSearch(v)}}
            suffix={
                <Button 
                    shape="circle" 
                    variant='text' 
                    icon={<SearchIcon/>}
                    onClick={() => {props.onSearch(text)}}
                />
            }
        />
    )
}