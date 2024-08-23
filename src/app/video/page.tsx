'use client'
import 'tdesign-react/es/style/index.css';
import { Suspense, Fragment, useEffect, useRef, useState } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { useSearchParams  } from 'next/navigation';
import { Request } from '@/utils/Request';
import { CONFIG } from '@/config';
import EpisodeSelector, { type EpisodeOption } from '@/components/EpisodeSelector';
import VideoBrief from '@/components/VideoBrief';
import Navigation from '@/components/Navigation';

function Video() {
    // 获取参数
    const params = useSearchParams();
    const id = parseInt(params.get('id') as string);
    const episode = parseInt(params.get('episode') as string);

    // 切换当前集
    const changeEpisode = (v:number) => {
        const _params = new URLSearchParams(params.toString())
        _params.set('episode', `${v}`);
        window.history.pushState(null, '', `?${_params.toString()}`);
    }

    if (!episode) {
        changeEpisode(episode||1);
    }

    const [m3u8, setM3u8] = useState('');
    const player = useRef<Player>();

    // 获取数据
    const [title, setTitle] = useState('');
    const [actor, setActor] = useState('');
    const [brief, setBrief] = useState('');
    const [image, setImage] = useState('');
    const [episodes, setEpisodes] = useState<EpisodeOption[]>([]);

    // 启动时请求数据
    useEffect(() => {
        const fetchData = async (host:string, id:number) => {
            const url = new URL(host);
            url.searchParams.set('ac', 'detail');
            url.searchParams.set('ids', `${id}`);
    
            const data = await Request.GET(url.toString());
            if (!data || !data.list || !data.list.length) {
                return;
            }
    
            setTitle(data.list[0].vod_name);
            setActor(data.list[0].vod_actor);
            setBrief(data.list[0].vod_content.replace(/<.*?>/ig, ''));
            setImage(data.list[0].vod_pic);
            
            const items = data.list[0].vod_play_url.split('#');
            const episodes:EpisodeOption[] = [];
            for (const index in items) {
                const pair = items[index].split('$');
                episodes.push({
                    name: pair[0],
                    url: pair[1],
                })
            }
            // episodes.sort((a,b) => a.name.localeCompare(b.name));
            setEpisodes(episodes);
        };

        fetchData(CONFIG.HOST, id)
    },[id]);

    // 当前集发生切换
    useEffect(() => {
        if (episodes.length > episode - 1) {
            setM3u8(episodes[episode-1].url);
        }
    }, [episode, episodes])

    // 播放链接发生变换
    useEffect(() => {
        if (m3u8) {
            const src = {type:'application/x-mpegURL', src:m3u8}
            if (player.current) {
                player.current?.src(src);
                player.current?.play();
            } else {
                player.current = videojs('player', {src:src}, ()=> {
                    player.current?.src(src);
                    player.current?.play();
                });
            }
        }
    }, [m3u8]);

    const briefWidth = '15vw';

    return (
        <Fragment>
            <div style={{width:'100%', minHeight: '95vh', display:'flex', flexDirection: 'column', gap:16}}>
                <Navigation onSearch={(text) => {window.location.assign(`/search?text=${text}&page=1`);}}/>
                <div style={{width:'100%', display:'flex', flexGrow:1, gap:16}}>
                    <div style={{ width: `calc(100% - ${briefWidth} - 16px)`, display:'flex', flexDirection:'column', gap:16}}>
                        <div style={{height:'calc(100vh - 300px)'}}>
                            <video
                                id='player'
                                controls
                                className='video-js'
                                preload="auto"
                                muted={false}
                                style={{height: '100%', width: '100%'}}
                            >
                            </video>
                        </div>
                        <EpisodeSelector current={episode} options={episodes} onChanged={changeEpisode}></EpisodeSelector>
                        <div style={{flexGrow:1}}></div>
                    </div>
                    <div style={{height: '100%', width: `${briefWidth}`, flexShrink: 0}}>
                        <VideoBrief title={title} actor={actor} brief={brief} image={image}/>
                        <div style={{flexGrow:1}}></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default function VideoPage() {
    return (
        <Suspense>
            <Video></Video>
        </Suspense>
    )
}