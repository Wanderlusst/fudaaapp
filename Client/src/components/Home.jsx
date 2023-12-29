import React from "react";
import Categories from "../components/Categories";
import Delivery from "../components/Delivery";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Meals from "../components/Meals";
import NewsLetter from "../components/NewsLetter";
import TopNav from "../components/TopNav";
import TopPicks from "../components/TopPicks";

function Home() {

  return (
    <div>
      <div className="App">
        <TopNav />
        <Featured />
        <Delivery />
        <TopPicks />
        <Meals />
        <Categories />
        <NewsLetter />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
