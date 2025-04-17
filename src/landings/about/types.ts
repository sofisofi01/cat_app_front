import { ImageProps } from '@/components/Image/types' 

export  type AboutPageProps = {
    title: string;
    caption: string;
    items: {
        id: string;
        title: string;
        text: string;
    }[];
    image: ImageProps;
}