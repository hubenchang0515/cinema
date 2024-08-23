'use client';

import { Request } from '@/utils/Request';
import { Suspense, Fragment, useEffect, useState } from 'react';

import 'tdesign-react/es/style/index.css';
import { Space, Loading, Tabs, Row, Col, Pagination } from 'tdesign-react';
import { CONFIG } from '@/config';
import { useSearchParams } from 'next/navigation';
import VideoLink from '@/components/VideoLink';
import Navigation from '@/components/Navigation';

export interface TypeItem {
    id: number;
    name: string;
}

export interface VideoItem {
    id: number;
    name: string;
    image: string;
    types: string;
    remarks: string;
}

function Home() {
    const params = useSearchParams();
    const type = parseInt(params.get('type') as string);
    const page = parseInt(params.get('page') as string);

    // 修改类型
    const changeType = (v:number) => {
        const _params = new URLSearchParams(params.toString())
        _params.set('type', `${v || 0}`);
        _params.set('page', `1`);
        window.history.pushState(null, '', `?${_params.toString()}`);
    }

    // 修改页
    const changePage = (v:number) => {
        const _params = new URLSearchParams(params.toString())
        _params.set('page', `${v || 1}`);
        window.history.pushState(null, '', `?${_params.toString()}`);
    }
    
    const { TabPanel } = Tabs;

    const [loading, setLoading] = useState(false);
    const [types, setTypes] = useState<TypeItem[]>([]);
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    const fetchTypes = async (host:string) => {
        const url = new URL(host);
        url.searchParams.set('ac', 'list');
        const data = await Request.GET(url.toString());
        const types:TypeItem[] = [];
        for (const type of data.class) {
            if (CONFIG.TYPE_FILTER && CONFIG.TYPE_FILTER.includes(type.type_name)) {
                continue;
            }
            types.push({
                id: type.type_id,
                name: type.type_name,
            })
        }
        setTypes(types);
    }

    const fetchVideos = async (host:string, type:number=0, page:number=1) => {
        setLoading(true);
        const url = new URL(host);
        url.searchParams.set('ac', 'detail');
        url.searchParams.set('pg', `${page || 1}`);
        if (type) {
            url.searchParams.set('t', `${type}`);
        }
        const data = await Request.GET(url.toString());
        setPageSize(data.limit);
        setTotal(data.total);
        const videos:VideoItem[] = [];
        for (const video of data.list) {
            videos.push({
                id: video.vod_id,
                name: video.vod_name,
                image: video.vod_pic,
                types: video.vod_class,
                remarks: video.vod_remarks,
            })
        }
        setVideos(videos);
        setLoading(false);
    }

    useEffect(() => {
        fetchTypes(CONFIG.HOST);
    }, []);

    useEffect(() => {
        fetchVideos(CONFIG.HOST, type as number, page);
    }, [type, page]);

    return (
        <Fragment>
            <Loading 
                indicator
                loading={loading}
                fullscreen
                preventScrollThrough
                showOverlay
            />
            <Space
                direction="vertical"
                style={{width:'100%'}}
            >
                <Navigation onSearch={(text) => {window.location.assign(`/search?text=${text}&page=1`);}}/>
                
                <Tabs value={type} onChange={(v) => changeType(v as number)}>
                    {
                        types.map((type, index) => {
                            return (
                                <TabPanel key={index} value={type.id} label={type.name}/>
                            );
                        })
                    }
                </Tabs>

                <Row gutter={[16, 16]}>
                    {
                        videos.map((video, index) => {
                            return (
                                <Col key={index} xl={{span: 2}} lg={{span: 3}} md={{span:4}} sm={{span:6}} xs={{span:12}}>
                                    <VideoLink url={`/video?id=${video.id}`} title={video.name} remarks={video.remarks} image={video.image} />
                                </Col>
                            );
                        })
                    }
                </Row>

                <Pagination
                    total={total}
                    current={page||1}
                    pageSize={pageSize}
                    showPageSize={false}
                    onChange={(pageInfo) => changePage(pageInfo.current)}
                />
            </Space>
        </Fragment>
    );
}

export default function HomePage() {
    return (
        <Suspense>
            <Home></Home>
        </Suspense>
    )
}