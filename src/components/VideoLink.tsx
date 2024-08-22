import 'tdesign-react/es/style/index.css';
import { Loading, Link, Card, Image, Comment } from 'tdesign-react';

export interface VideoLinkProps {
    title:string;
    remarks:string;
    image:string;
    url:string;
}

export default function VideoLink(props:VideoLinkProps) {
    return (
        <Link href={props.url} style={{width: '100%', height: '100%'}} theme="primary" hover='color'>
            <Card 
                bordered={false}
                hoverShadow 
                style={{ height:'100%', width: '100%' }}
                cover={<Image lazy src={props.image} style={{height:'40vh'}} fit='cover' key={props.image} loading={<Loading loading/>} fallback='/404.webp' />}
                footer={<Comment author={props.title} content={props.remarks}/>}
            >
            </Card>
        </Link>
    )
}