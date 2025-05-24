import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

export default function Page() {
    return (
    <ProductList data={sampleData.products} title="Newest Arrivals" limit={4} />
  );
}