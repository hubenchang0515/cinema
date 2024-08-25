'use client';

import 'tdesign-react/es/style/index.css';
import { Space, Tag, Card, Tabs } from 'tdesign-react';
import { splitArray } from '@/utils/utils';
import TabPanel from 'tdesign-react/es/tabs/TabPanel';
import { useEffect, useState } from 'react';

export interface EpisodeOption {
    name: string;
    url: string;
}

export interface EpisodeSelectorProps {
    current: number; // 
    options: EpisodeOption[];
    onChanged: (current:number) => void;
}

export default function Episodes(props:EpisodeSelectorProps) {
    const tabSize = 50;
    const [tab, setTab] = useState(Math.floor((props.current-1)/tabSize));
    const { CheckTag } = Tag;

    useEffect(() => {
        setTab(Math.floor((props.current-1)/tabSize));
    }, [props]);

    return(
        <Card title='选集'>
            <Tabs placement='top' value={tab} onChange={(v) => {setTab(v as number)}}>
                {
                    splitArray(props.options, tabSize).map((group, i) => {
                        return (
                            <TabPanel key={i} label={i*tabSize+1} value={i}>
                                <Space breakLine style={{marginTop:16}}>
                                {
                                    group.map((option, j) => {
                                        return (
                                            <CheckTag key={j} checked={props.current === i*tabSize + j + 1} style={{width:'100%'}} onClick={() => {props.onChanged(i*tabSize + j + 1)}}>
                                                {option.name}
                                            </CheckTag>
                                        )
                                    })
                                }
                                </Space>
                            </TabPanel>
                        )
                    })
                }
            </Tabs>
        </Card>
    );
}