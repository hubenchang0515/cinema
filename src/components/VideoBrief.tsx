import 'tdesign-react/es/style/index.css';
import { Typography, Loading, Card, Image } from 'tdesign-react';

export interface VideoBriefProps {
    title:string;
    actor:string;
    brief:string;
    image:string;
}

export default function VideoBrief(props:VideoBriefProps) {
    const { Title, Text, Paragraph } = Typography;
    return (
        <Card
            bordered={false}
            style={{width: '100%'}}
            title={props.title}
            cover={<Image lazy src={props.image} style={{height:'50vh'}} fit='cover' key={props.image} loading={<Loading loading/>} fallback='/404.webp' alt='cover'/>}
            footer={
                <Paragraph>
                    <Paragraph>
                        <Text strong>简介</Text>
                        <Text ellipsis={{expandable:true, collapsible:true}}>{props.brief}</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text strong>演员</Text>
                        <Text theme='secondary' ellipsis={{expandable:true, collapsible:true}}>{props.actor}</Text>
                    </Paragraph>
                </Paragraph>
            }
        >
        </Card>
    )
}