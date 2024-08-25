'use client';

import { Request } from '@/utils/Request';
import { Suspense, Fragment, useEffect, useState } from 'react';

import 'tdesign-react/es/style/index.css';
import { Space, Loading, Row, Col, Pagination } from 'tdesign-react';
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

function Search() {
    const params = useSearchParams();
    const api = parseInt(params.get('api') as string)||1;
    const text = params.get('text')??'';
    const page = parseInt(params.get('page') as string)||1;

    // 修改页
    const changePage = (v:number) => {
        const _params = new URLSearchParams(params.toString())
        _params.set('page', `${v || 1}`);
        window.history.pushState(null, '', `?${_params.toString()}`);
    }

    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchVideos = async (api:string, text:string, page:number=1) => {
            setLoading(true);
            const url = new URL(api);
            url.searchParams.set('ac', 'detail');
            url.searchParams.set('wd', text);
            url.searchParams.set('pg', `${page || 1}`);
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
        fetchVideos(CONFIG.API[api-1], text, page)
    }, [text, page, api]);


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
                <Navigation onSearch={(text) => {window.location.assign(`/search?api=${api}&text=${text}&page=1`);}}/>

                <Row gutter={[16, 16]}>
                    {
                        videos.map((video, index) => {
                            return (
                                <Col key={index} xl={{span: 2}} lg={{span: 3}} md={{span:4}} sm={{span:6}} xs={{span:12}}>
                                    <VideoLink url={`/video?api=${api}&id=${video.id}`} title={video.name} remarks={video.remarks} image={video.image} />
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


export default function SearchPage() {
    return (
        <Suspense>
            <Search></Search>
        </Suspense>
    )
}