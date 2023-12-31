import { useEffect } from "react";

import { URL_PRODUCT } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/method.enum";
import { useDataContext } from "../../../shared/hooks/useDataContext";
import { useRequests } from "../../../shared/hooks/useRequests";
import { ProductType } from "../../../shared/types/ProductType";

import type { ColumnsType } from "antd/es/table";
import Table from "../../../shared/components/table/Table";
import CategoryColumn from "../components/CategoryColumn";
import TooltipImage from "../components/TooltipImage";

const columns: ColumnsType<ProductType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (_, product) => <TooltipImage product={product} />,
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Categoria",
    dataIndex: "category",
    key: "category",
    render: (_, product) => <CategoryColumn category={product.category} />,
  },
  {
    title: "Preço",
    dataIndex: "price",
    key: "price",
  },
];

const Product = () => {
  const { products, setProducts } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  return <Table columns={columns} dataSource={products} />;
};

export default Product;
