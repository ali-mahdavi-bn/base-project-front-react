import { Carousel } from 'antd';

interface BannerItem {
  id?: number;
  alt?: string;
  path?: string;
}

const HomeBanner = () => {
  const banners: BannerItem[] = [
    {
      path: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/ce4b36b324c533239b61956b9b83b3a70d483d7e_1732720629.gif?x-oss-process=image',
    },{
      path: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/b860850c1ca21eb3b525b242e50246fa992c5bb3_1730286974.jpg?x-oss-process=image/quality,q_95',
    },{
      path: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/5d09ceff55bbd68a6aec9d9fe501db61f96d1747_1733034728.jpg?x-oss-process=image/quality,q_95',
    },
  ];
  return (
    <div>
      <Carousel autoplay rtl dots>
        {banners.map((item, index) => (
          <img alt={item.alt} src={item.path} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeBanner;
