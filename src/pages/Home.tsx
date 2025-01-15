import React from 'react';
import HomeBanner from '@/components/PageComponent/home/HomeBanner';
import { Button, Card, Divider, Empty, Rate, Tag } from 'antd';
import { Link } from 'umi';
import { ShoppingCartOutlined } from '@ant-design/icons';

const products = [
  { id: 1, name: 'محصول ۱', description: 'توضیحات محصول ۱' },
  { id: 2, name: 'محصول ۲', description: 'توضیحات محصول ۲' },
  { id: 3, name: 'محصول ۳', description: 'توضیحات محصول ۳' },
  { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
  { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
  // { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
  // { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
  // { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
  // { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
  // { id: 4, name: 'محصول ۴', description: 'توضیحات محصول ۴' },
];
const Home: React.FC = () => {
  return (
    <div>
      <section>
        <HomeBanner />
      </section>

      <section className="my-10">
        <Divider orientation="right">خدمات</Divider>
        <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full flex justify-center">
              <Empty description="هیچ محصولی یافت نشد" />
            </div>
          ) : (
            products.map((item: any) => (
              <Card
                hoverable
                className="product-card transition-all duration-300 hover:shadow-xl"
                cover={
                  <Link to={`/products/1`}>
                    <div className="relative group h-[250px] p-4 bg-white">
                      <img
                        alt="{product.title}"
                        src="https://dkstatics-public.digikala.com/digikala-adservice-banners/ce4b36b324c533239b61956b9b83b3a70d483d7e_1732720629.gif?x-oss-process=image"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      {/*{product.rating.count < 50 && (*/}
                      {/*  <Tag color="red" className="absolute top-2 right-2">*/}
                      {/*    Limited Stock*/}
                      {/*  </Tag>*/}
                      {/*)}*/}
                    </div>
                  </Link>
                }
                actions={[
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined size={16} />}
                    className="flex items-center justify-center mx-4"
                  >
                    Add to Cart
                  </Button>,
                ]}
              >
                <Link to={`/products/1`}>
                  <Card.Meta
                    title={
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium line-clamp-2">aaaaaaa</h3>
                        <span className="text-lg font-bold text-blue-600">12000</span>
                      </div>
                    }
                    description={
                      <div className="space-y-2 mt-2">
                        <p className="text-gray-500 line-clamp-2">dddddddd</p>
                        <div className="flex items-center space-x-2">
                          <Rate disabled defaultValue={3} className="text-sm" />
                          <span className="text-gray-500">(10)</span>
                        </div>
                        <Tag color="blue">ali mahdavi category</Tag>
                      </div>
                    }
                  />
                </Link>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
