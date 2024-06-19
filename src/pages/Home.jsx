import React, { useEffect, useState } from "react";

import * as noticeService from "../services/noticeService";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { Label, TextInput } from "flowbite-react";

const Home = () => {
  const [noticies, setNoticies] = useState([]);
  const [search, setSearch] = useState("")
  console.log(search)

  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const loadnotices = async () => {
    try {
      const res = await noticeService.getAllNotices(token);
      setNoticies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadnotices();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value)
  };

  return (
    <div className="w-full px-10 min-h-[40vh] max-w-7xl mx-auto">
      <p className="text-5xl font-bold text-center my-10">Skelbimai</p>
      <div className=" w-full text-5xl font-bold text-center my-10 max-w-24 mx-auto">
        <div className="mb-2">
          <Label htmlFor="small" value="Paieska" />
        </div>
        <TextInput id="small" type="text" sizing="sm" value={search} onChange={handleChange}/>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {noticies.filter((notice) => {return notice.active === true}).map((notice) => (
          <Card key={notice._id} notice={notice} loadNotices={loadnotices}/>
        ))}
      </div>
      {noticies?.length === 0 && (
        <p className="text-2xl font-bold text-center w-full">
          Skelbimu nerasta
        </p>
      )}
    </div>
  )
}

export default Home