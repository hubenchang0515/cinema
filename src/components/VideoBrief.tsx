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
            cover={<Image lazy src={props.image} style={{height:'50vh'}} fit='cover' key={props.image} loading={<Loading loading/>} fallback='/404.webp' />}
            footer={
                <Paragraph>
                    <Text strong>简介</Text>
                    <Paragraph ellipsis={{row: 10, expandable:true, collapsible:true}}>
                        <Text copyable>{props.brief}</Text>
                        <Paragraph> <Text strong>演员</Text> </Paragraph>
                        <Paragraph> <Text copyable theme='secondary'>{props.actor}</Text> </Paragraph>
                    </Paragraph>
                </Paragraph>
            }
        >
        </Card>
    )
}