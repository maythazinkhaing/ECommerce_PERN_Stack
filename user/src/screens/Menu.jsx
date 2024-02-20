import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { MenuCard, Loading } from "../components/index";
import { getProducts } from "../util/productAPI";

function Menu() {
  const [header, setHeader] = useState("MENU");
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products : " + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  //console.log(products);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="menu_header">
            <h3> {header} </h3>
          </div>
          {/* CATEGORY */}
          <div className=" flex justify-end">
            <div className="flex flex-col md:flex-row gap-8 text-xs capitalize border rounded-md px-4 py-2 group relative cursor-pointer">
              <h3 className="flex  items-center gap-1 ">
                Category
                <span>
                  <FaAngleDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </h3>
              <div className="nav_sub_dropdown py-8 lg:-left-6 -left-11">
                <div className=" hidden w-[150px] rounded-md bg-white border px-2  text-black group-hover:block">
                  <ul className="space-y-2 py-2 ">
                    <li>Cake</li>
                    <li>About us</li>
                    <li>Privacy policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* END CATEGORY */}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-cols-[minmax(0,1fr)] gap-x-4 gap-y-6 w-full my-4 ">
            {products?.map((product) => {
              return <MenuCard data={product} key={product.product_id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;
