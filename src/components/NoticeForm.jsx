import { toast } from "react-toastify";
import * as categoryService from "../services/categoryService";
import * as noticeService from "../services/noticeService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const NoticeForm = () => {
    const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const [categories, setCategories] = useState([]);

  const importCategories = async () => {
    try {
      const res = await categoryService.getAllCategories(token);
      setCategories(res.data);

    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        category: formData.get("category"),
    };
    try {
      await noticeService.createNotice(data, token);
      form.reset();
      toast.success("Notice added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    importCategories();
  }, []);
  return (
    <form
    className="w-full max-w-lg flex flex-col gap-5 px-3"
    onSubmit={handleSubmit}
  >
    {/* title */}
    <div className="flex flex-wrap">
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="title"
          name="title"
          type="text"
          required
          placeholder="Skelbimo pavadinimas"
        />
      </div>
    </div>
    {/* description */}
    <div className="flex flex-wrap">
      <div className="w-full">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="description"
          name="description"
          type="text"
          required
          placeholder="Skelbimo aprasymas"
        />
      </div>
    </div>
    {/* price */}
    <div className="w-full flex-1 mb-6 md:mb-0">
      <label
        className="block uppercase text-gray-700 text-xs font-bold mb-2"
        htmlFor="price"
      >
        Price
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="price"
        name="price"
        type="number"
        placeholder="Skelbimo kaina"
      />
    </div>
    {/* category */}
    <div className="w-full flex-1 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="category"
      >
        Category
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="category"
          name="category"
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
    {/* SUBMIT BUTTON */}
    <button
      className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
              disabled:opacity-70 disabled:cursor-not-allowed"
      type="submit"
    >
      Prideti skelbima
    </button>
  </form>
  )
}

export default NoticeForm