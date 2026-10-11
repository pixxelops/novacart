import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { createProduct, deleteProduct, getProducts, updateProduct, type ProductRequest } from "../../services/productService";
import { getCategories, type Category } from "../../services/categoryService";

export default function AdminProducts(){
    const [products,setProducts] = useState<Product[]>([]);

    const[loading, setLoading] = useState(true);

    const[error ,setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);


    const[form, setForm] = useState<ProductRequest>({
        name: "",
  description: "",
  brand: "",
  price: 0,
  stockQuantity: 0,
  discountPercentage: 0,
  categoryId: 0,
    })



    const fetchProducts = async() =>{
        try{
            setLoading(true);
            setError("");

            const data = await getProducts(
                0,
                50,
                "id",
                "desc"
            );
            setProducts(data.content);
        } catch (err) {
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void fetchProducts();
    }, []);


    useEffect(() => {
      const fetchCategories = async() => {
        try{
          const data = await getCategories();

          setCategories(data);

        }catch(err){
          console.error("Failed to fetch categories: ", err);
          setError("Failed to load categories");

        }
      };

      void fetchCategories();
    });


  const handleAddProduct = ()=> {
    setEditingProduct(null);

    setForm({
      name : "",
      description: "",
      brand:"",
      price:0,
      stockQuantity:0,
      discountPercentage:0,
      categoryId:0,
    })

    setShowForm(true);
  }

  const handleEditProduct =(product:Product) =>{
    setEditingProduct(product);

    setForm({
      name : product.name,
      description: product.description,
      brand : product.brand,
      price : product.price,
      stockQuantity : product.stockQuantity,
      discountPercentage: product.discountPercentage,
      categoryId : 0,
    });

    setShowForm(true);
  }


  const handleFormChange = (
    e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
      const {name, value} = e.target;


      setForm((current) => ({
        ...current,
        [name]:
        name === "price" || name === "stockQuantity" ||
         name === "discountPercentage" ||
         name === "categoryId"
         ? Number(value): value,
      }));
    };

    
  

    const handleDelete = async(productId: number) =>{
        const confirmed = window.confirm("Are you sure you want to delete this product?");

        if(!confirmed){
            return;
        }
        try{
            setError("");

            await deleteProduct(productId);

            setProducts((currentProducts) => 
            currentProducts.filter(
                (product) =>
                    product.id !== productId
            ))

            
        }
        catch(error){
            console.error("Failed to delete product:", error);
      setError("Failed to delete product.");
        }
    };


    const handleSubmit = async() =>{
      try{
        setError("");

        if(
           !form.name.trim() ||
      !form.description.trim() ||
      !form.brand.trim() ||
      form.categoryId <= 0 ||
      form.price < 0 ||
      form.stockQuantity < 0 ||
      form.discountPercentage < 0 ||
      form.discountPercentage > 100
        ){
          setError("Please enter valid product details and select a category.");
      return;
        }


        if(editingProduct){
          await updateProduct(editingProduct.id, form);
        }
        else{
          await createProduct(form);
        }

        setShowForm(false);
        setEditingProduct(null);
        await fetchProducts();
      }catch(error){
        console.error("Failed to save product: ", error);
        setError("Failed to save product. Please try again. ");

      }
    }


    if(loading){
        return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-gray-500">
          Loading products...
        </p>
      </main>
    );
  }


    return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">
            Admin Products
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your product catalogue.
          </p>
        </div>

        <button
  type="button"
  onClick={handleAddProduct}
  className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
>
  Add Product
</button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">

              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Brand
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">
                      <div className="font-semibold text-gray-950">
                        {product.name}
                      </div>

                      <div className="mt-1 text-sm text-gray-500">
                        #{product.id}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {product.brand}
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-medium text-gray-950">
                        ₹{product.price}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={
                          product.stockQuantity === 0
                            ? "font-semibold text-red-600"
                            : product.stockQuantity <= 5
                              ? "font-semibold text-orange-600"
                              : "text-gray-700"
                        }
                      >
                        {product.stockQuantity}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">

                      <button
  type="button"
  onClick={() => handleEditProduct(product)}
  className="mr-3 text-sm font-semibold text-gray-900 hover:underline"
>
  Edit
</button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="text-sm font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>
      )}


      {showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-950">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editingProduct
              ? "Update the product details."
              : "Add a new product to your catalogue."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleFormChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              placeholder="Enter brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleFormChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            >
              <option value={0}>Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>

            <input
              type="text"
              inputMode="decimal"
              name="price"
              min="0"
              value={form.price}
              onChange={handleFormChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Stock
            </label>

            <input
              type="text"
inputMode="numeric"
              name="stockQuantity"
              min="0"
              value={form.stockQuantity}
              onChange={handleFormChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Discount %
            </label>

            <input
              type="number"
              name="discountPercentage"
              min="0"
              max="100"
              value={form.discountPercentage}
              onChange={handleFormChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          {editingProduct ? "Update Product" : "Create Product"}
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );

    
}