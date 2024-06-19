import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import * as categoryService from "../services/categoryService";
import * as noticeService from "../services/noticeService";
import { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const Card = ({notice, loadNotices}) => {
  const [category, setCategory] = useState("");
  const id = notice._id;
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const categoryId = notice.category[0];

  const loadCategory = async () => {
    try {
      const res = await categoryService.getCategory(categoryId, token);
      setCategory(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotice = async () => {
    try {
      const res = await noticeService.deleteNotice(id, token);
      toast.success("Istrinta")
      loadNotices()
    } catch (err) {
      toast.error(err.message)
    }
  };

  const blockNotice = async () => {
    const activeStatus = {active : false}
    try {
      const res = await noticeService.blockNotice(activeStatus, id, token);
      toast.success("Uzblokuota")
      loadNotices()
    } catch (err) {
      toast.error(err.message)
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);
  
  return (
    <div
    className={`rounded-md p-4 bg-gradient-to-r from-amber-500 via-purple-500 to-lime-500`}
  >
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        {currentUser.data.role === "admin" ? (
          <Link to={`/notice/${id}`}>
            <h2 className="text-lg font-bold text-gray-700 hover:text-violet-600">
              {notice.title}
            </h2>
          </Link>
        ) : (
          <h2 className="text-lg font-bold text-gray-700 hover:text-violet-600">
            {notice.title}
          </h2>
        )}
        {currentUser.data.role === "admin" && (
          <>
          <FaTrash onClick={deleteNotice} />
          <MdBlock onClick={() => {blockNotice()}}/>
          </>
        )}
        <FaRegStar />
      </div>
      <p className="text-gray-700 flex items-center gap-1">
      Description: {notice.description}
      </p>
      <p className="text-gray-700 flex items-center gap-1">
      Price: {notice.price}
      </p>
      <p className="text-gray-700 flex items-center gap-1">
      Category: {category?.title}
      </p>
    </div>
  </div>
  )
}

export default Card