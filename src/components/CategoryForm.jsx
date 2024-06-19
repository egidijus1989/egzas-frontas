import { toast } from "react-toastify";
import * as categoryService from "../services/categoryService";
import { useSelector } from "react-redux";

const CategoryForm = () => {
    const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      title: formData.get("title"),
    };
    try {
      await categoryService.createCategory(data, token);
      form.reset();
      toast.success("Category added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form
      className="w-full max-w-lg flex flex-col gap-5 px-3"
      onSubmit={handleSubmit}
    >
      {/* Title */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            Kategorija
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="title"
            name="title"
            type="text"
            required
            placeholder="Kategorijos pavadinimas"
          />
        </div>
      </div>
      {/* SUBMIT BUTTON */}
      <button
        className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
      from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
                    disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
      >
        Prideti kategorija
      </button>
    </form>
  )
}

export default CategoryForm