import React, { useState, useEffect } from "react";
import * as categoryService from "../services/categoryService";
import * as noticeService from "../services/noticeService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const NoticePage = () => {
  const [categories, setCategories] = useState([]);
  const [notice, setNotice] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    // active: true,
  });
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  useEffect(() => {
    loadCategory();
    loadNotice();
  }, []);

  const loadNotice = async () => {
    try {
      const res = await noticeService.getNotice(id, token);
      setNotice(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategory = async () => {
    try {
      const res = await categoryService.getAllCategories(token);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await noticeService.updateNotice(notice, id, token);
      //navigate()
    } catch (err) {
      console.log(err);
    }
  };

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
          title
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name="title"
          type="text"
          value={notice.title}
          onChange={handleChange}
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
          description
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          name="description"
          type="text"
          value={notice.description}
          onChange={handleChange}
        />
      </div>
    </div>
    {/* price */}
    <div className="w-full flex-1 mb-6 md:mb-0">
      <label
        className="block uppercase text-gray-700 text-xs font-bold mb-2"
        htmlFor="price"
      >
        price
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        name="price"
        type="text"
        value={notice.price}
        onChange={handleChange}
      />
    </div>

    {/* category */}
    <div className="w-full flex-1 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="category"
      >
        category
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
      Atnaijinti skelbima
    </button>
  </form>
  )
}

export default NoticePage